'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  createVRMAnimationClip,
  VRMAnimationLoaderPlugin,
  VRMLookAtQuaternionProxy,
} from '@pixiv/three-vrm-animation';

const Meimei = () => {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);
    camera.position.set(0, 1.3, 1);
    renderer.setClearColor(0x99ddff);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 5, 3);
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(30, 100);
    scene.add(gridHelper);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));
    loader.register((parser) => new VRMAnimationLoaderPlugin(parser));

    const loadModels = async () => {
      const gltfVrm = await loader.loadAsync("/vrm/emi.vrm");
      const vrm = gltfVrm.userData.vrm;
      VRMUtils.rotateVRM0(vrm);
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      VRMUtils.removeUnnecessaryJoints(vrm.scene);

      vrm.scene.traverse((obj) => {
        obj.frustumCulled = false;
      });

      const lookAtQuatProxy = new VRMLookAtQuaternionProxy(vrm.lookAt);
      lookAtQuatProxy.name = "lookAtQuaternionProxy";
      vrm.scene.add(lookAtQuatProxy);

      scene.add(vrm.scene);

      const gltfVrma = await loader.loadAsync("/vrm/vrma/greet1.vrma");
      const vrmAnimation = gltfVrma.userData.vrmAnimations[0];
      const clip = createVRMAnimationClip(vrmAnimation, vrm);
      const mixer = new THREE.AnimationMixer(vrm.scene);
      mixer.clipAction(clip).play();

      const clock = new THREE.Clock();

      const animate = () => {
        requestAnimationFrame(animate);
        const deltaTime = clock.getDelta();
        mixer.update(deltaTime);
        vrm.update(deltaTime);
        renderer.render(scene, camera);
      };

      animate();
    };

    loadModels();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      mount.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mount} />;
};

export default Meimei;
