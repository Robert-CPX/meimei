'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { createVRMAnimationClip, VRMAnimationLoaderPlugin, VRMLookAtQuaternionProxy } from '@pixiv/three-vrm-animation';
import { useMeimei } from '@/context/MeimeiProvider';
import { getRandomAnimation } from '@/lib/utils';

const Meimei = () => {
  const mount = useRef<HTMLDivElement>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const vrmRef = useRef<any>(null); // Use a more specific type for your VRM model
  const gltfLoaderRef = useRef<GLTFLoader>(new GLTFLoader());  // Ref for GLTFLoader
  const { emotion } = useMeimei();

  useEffect(() => {
    const animation = getRandomAnimation();
    console.log('Animation:', animation);
    loadAndPlayAnimation(animation);
  }, [emotion]);

  useEffect(() => {
    const scene = new THREE.Scene();

    const loader = new THREE.TextureLoader();
    loader.load('emi/background.jpg', function (texture) {
      texture.minFilter = THREE.LinearFilter;
      scene.background = texture;
    });

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current?.appendChild(renderer.domElement);
    camera.position.set(0, 1.3, 1);
    renderer.setClearColor(0x99ddff);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.3, 0);
    controls.update();

    const light = new THREE.AmbientLight(0xffffff, 2); // soft white light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(0, 5, 3);
    scene.add(directionalLight);

    gltfLoaderRef.current.register((parser) => new VRMLoaderPlugin(parser));
    gltfLoaderRef.current.register((parser) => new VRMAnimationLoaderPlugin(parser));

    const init = async () => {
      const gltfVrm = await gltfLoaderRef.current.loadAsync('emi/emi.vrm');
      const vrm = gltfVrm.userData.vrm;
      vrmRef.current = vrm; // Store the VRM for future reference
      VRMUtils.rotateVRM0(vrm);
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      VRMUtils.removeUnnecessaryJoints(vrm.scene);
      vrm.scene.traverse((obj: THREE.Object3D) => obj.frustumCulled = false);
      const lookAtQuatProxy = new VRMLookAtQuaternionProxy(vrm.lookAt);
      lookAtQuatProxy.name = 'lookAtQuaternionProxy';
      vrm.scene.add(lookAtQuatProxy);
      const lookAtTarget = new THREE.Object3D();
      camera.add(lookAtTarget);
      scene.add(vrm.scene);
      vrm.lookAt.target = lookAtTarget;

      mixer.current = new THREE.AnimationMixer(vrm.scene);
      const clock = new THREE.Clock();

      // Load and play the intro animation immediately after the VRM is loaded
      const gltfVrma = await gltfLoaderRef.current.loadAsync('emi/emotions/Intro.vrma');
      const vrmAnimation = gltfVrma.userData.vrmAnimations[0];
      const introClip = createVRMAnimationClip(vrmAnimation, vrm);
      const action = mixer.current.clipAction(introClip);
      action.play();

      const animate = () => {
        requestAnimationFrame(animate);
        const deltaTime = clock.getDelta();
        mixer.current?.update(deltaTime);
        vrm.update(deltaTime);
        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mount.current?.removeChild(renderer.domElement);
    };
  }, []);

  const loadAndPlayAnimation = async (filename: string) => {
    const basePath = 'emi/emotions/';
    const fullPath = basePath + filename;

    try {
      const gltfVrma = await gltfLoaderRef.current.loadAsync(fullPath);
      const vrmAnimation = gltfVrma.userData.vrmAnimations[0];
      const clip = createVRMAnimationClip(vrmAnimation, vrmRef.current);

      if (mixer.current) {
        const action = mixer.current.clipAction(clip);
        action.play();
      }
    } catch (error) {
      console.error('Failed to load or play the animation:', error);
    }
  };

  return <div ref={mount} />;
};

export default Meimei;
