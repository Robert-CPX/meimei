'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createVRMAnimationClip, VRMAnimationLoaderPlugin, VRMLookAtQuaternionProxy } from '@pixiv/three-vrm-animation';
import { useMeimei } from '@/context/MeimeiProvider';
import { getRandomAnimation } from '@/lib/utils';

const Meimei = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const vrmRef = useRef<any>(null); // Should be replaced with the appropriate type
  const mainAnimationRef = useRef<THREE.AnimationAction | null>(null);
  const { emotion } = useMeimei();

  useEffect(() => {
    const animation = getRandomAnimation();
    console.log('Animation:', animation);
    loadAndPlayAnimation(animation);
  }, [emotion]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x99ddff);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    camera.position.set(0, 1, 1.3);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.9, 0);
    controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, 3);
    scene.add(directionalLight);

    const gltfLoader = new GLTFLoader();
    gltfLoader.register((parser) => new VRMLoaderPlugin(parser));
    gltfLoader.register((parser) => new VRMAnimationLoaderPlugin(parser));

    // Load background
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/emi/background.jpg', (texture) => {
      texture.minFilter = THREE.LinearFilter;
      scene.background = texture;
    });

    // Load VRM model
    const initVrmScene = async () => {
      const gltfVrm = await gltfLoader.loadAsync('/emi/emi.vrm');
      const vrm = gltfVrm.userData.vrm;
      vrmRef.current = vrm;

      VRMUtils.rotateVRM0(vrm);
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      VRMUtils.removeUnnecessaryJoints(vrm.scene);
      vrm.scene.traverse((obj: THREE.Object3D) => (obj.frustumCulled = false));
      const lookAtQuatProxy = new VRMLookAtQuaternionProxy(vrm.lookAt);
      lookAtQuatProxy.name = 'lookAtQuaternionProxy';
      vrm.scene.add(lookAtQuatProxy);
      const lookAtTarget = new THREE.Object3D();
      camera.add(lookAtTarget);
      vrm.lookAt.target = lookAtTarget;
      scene.add(vrm.scene);

      mixerRef.current = new THREE.AnimationMixer(vrm.scene);
      const clock = new THREE.Clock();

      // Load VRMA
      const gltfVrma = await gltfLoader.loadAsync('/emi/emotions/Intro.vrma');
      const vrmAnimation = gltfVrma.userData.vrmAnimations[0];
      let clip = createVRMAnimationClip(vrmAnimation, vrm);
      mainAnimationRef.current = mixerRef.current.clipAction(clip);
      mainAnimationRef.current.play();

      // Load Pencil
      gltfLoader.load('/emi/objects/Pencil.glb', (gltf) => {
        const pencil = gltf.scene;
        scene.add(pencil);
        const boneToAttachTo = vrm.humanoid.getNormalizedBoneNode('rightThumbDistal');
        boneToAttachTo.add(pencil);

        const relativeOffsetPosition = new THREE.Vector3(0, -0.02, 0.01);
        const relativeOffsetRotation = new THREE.Euler(Math.PI / 4, 0, 0, 'XYZ');
        pencil.rotation.setFromVector3(relativeOffsetRotation as any);
        pencil.position.copy(relativeOffsetPosition);
        boneToAttachTo.updateMatrixWorld(true);
      }, undefined, console.error);

      // Load Chair
      gltfLoader.load('/emi/objects/chair.glb', (gltf) => scene.add(gltf.scene), undefined, console.error);

      // Load Desk
      gltfLoader.load('/emi/objects/desk.glb', (gltf) => scene.add(gltf.scene), undefined, console.error);

      // Load Table Top Items
      gltfLoader.load('/emi/objects/table-top.glb', (gltf) => scene.add(gltf.scene), undefined, console.error);

      const animate = () => {
        requestAnimationFrame(animate);
        const deltaTime = clock.getDelta();
        mixerRef.current?.update(deltaTime);
        vrm.update(deltaTime);
        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(animate);
    };

    initVrmScene();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const loadAndPlayAnimation = async (filename: string) => {
    const basePath = '/emi/emotions/';
    const fullPath = basePath + filename;

    try {
      const gltfLoader = new GLTFLoader();
      const gltfVrma = await gltfLoader.loadAsync(fullPath);
      const vrmAnimation = gltfVrma.userData.vrmAnimations[0];
      const clip = createVRMAnimationClip(vrmAnimation, vrmRef.current);

      if (mainAnimationRef.current) {
        mainAnimationRef.current.stop();
      }

      if (!mixerRef.current) {
        throw new Error('mixerRef.current is not found.');
      }
      mainAnimationRef.current = mixerRef.current.clipAction(clip);
      mainAnimationRef.current.play();
    } catch (error) {
      console.error('Failed to load or play the animation:', error);
    }
  };

  return (
    <div ref={mountRef} />
  );
};

export default Meimei;
