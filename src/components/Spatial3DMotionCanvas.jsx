import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Spatial3DMotionCanvas — MotionSites.ai & Awwwards Luxury 3D Motion Engine
 * Architecture:
 * - 3D Camera Fly-Through Choreography: Dynamic camera trajectory driven by scroll progress.
 * - Interactive Cursor Specular Tracking: Dynamic 3D PointLight following mouse/touch across metallic surfaces.
 * - Radiant 24K Gold & Blush Rose Gold Interlocking Wedding Rings with physical PBR materials.
 * - Flowing 3D Golden Spline Ribbon undulating through 3D space.
 * - Sacred Islamic Geometric Polyhedra (Octahedrons & Icosahedrons) with optical transmission & gold wireframes.
 * - 3D Volumetric Floating Petals & Golden Stardust with realistic tumbling physics.
 * - Frustum-aware responsive margin positioning (100% text-safe).
 */
export default function Spatial3DMotionCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 12);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Procedural Studio Softbox Environment Map for Specular Realism
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 512;
    envCanvas.height = 256;
    const envCtx = envCanvas.getContext('2d');
    
    // Warm champagne gradient base
    const grad = envCtx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, '#FFFDF9');
    grad.addColorStop(0.3, '#EEDBBA');
    grad.addColorStop(0.65, '#FFF9ED');
    grad.addColorStop(1, '#DAB879');
    envCtx.fillStyle = grad;
    envCtx.fillRect(0, 0, 512, 256);

    // Studio softbox highlights for gleaming specular reflection
    envCtx.fillStyle = '#FFFFFF';
    envCtx.beginPath();
    envCtx.ellipse(140, 70, 95, 50, 0.3, 0, Math.PI * 2);
    envCtx.fill();

    envCtx.beginPath();
    envCtx.ellipse(380, 180, 115, 60, -0.2, 0, Math.PI * 2);
    envCtx.fill();

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // 3. Dynamic Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff6e0, 3.4);
    keyLight.position.set(6, 12, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xeac985, 2.6);
    rimLight.position.set(-8, -6, 5);
    scene.add(rimLight);

    // Dynamic Cursor-Tracking PointLight (creates interactive specular flashes)
    const cursorLight = new THREE.PointLight(0xfff0d0, 4.2, 16);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // 4. Luxury Materials (24K Yellow Gold, Rose Gold, Optical Crystal)
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe194,
      metalness: 0.96,
      roughness: 0.1,
      envMapIntensity: 2.6,
    });

    const roseGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4c1b5,
      metalness: 0.94,
      roughness: 0.12,
      envMapIntensity: 2.4,
    });

    const crystalGoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffaee,
      metalness: 0.25,
      roughness: 0.08,
      transmission: 0.72,
      transparent: true,
      opacity: 0.88,
      envMapIntensity: 2.8,
    });

    const wireframeGoldMat = new THREE.MeshBasicMaterial({
      color: 0xd8b245,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    // 5. Object 1: Dual Interlocking 3D Gold Wedding Rings
    const ringsGroup = new THREE.Group();
    const ringRadius = 1.05;
    const ringTube = 0.09;
    const ringGeom = new THREE.TorusGeometry(ringRadius, ringTube, 36, 90);

    const ring1 = new THREE.Mesh(ringGeom, goldMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;

    const ring2 = new THREE.Mesh(ringGeom, roseGoldMaterial);
    ring2.position.x = ringRadius * 0.95;
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 5;

    ringsGroup.add(ring1);
    ringsGroup.add(ring2);
    scene.add(ringsGroup);

    // 6. Object 2: Flowing 3D Golden Spline Ribbon
    const splinePoints = [
      new THREE.Vector3(-4, 8, -3),
      new THREE.Vector3(-2, 4, 1),
      new THREE.Vector3(2.5, 0.5, -0.5),
      new THREE.Vector3(3.8, -4, 1.5),
      new THREE.Vector3(0.5, -8, -1),
      new THREE.Vector3(-3.5, -12, 0.5),
    ];
    const splineCurve = new THREE.CatmullRomCurve3(splinePoints);
    const ribbonGeom = new THREE.TubeGeometry(splineCurve, 100, 0.045, 12, false);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5d37e,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.65,
      emissive: 0x8a6a20,
      emissiveIntensity: 0.25,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
    scene.add(ribbonMesh);

    // 7. Object 3: Floating 3D Geometric Prisms (Islamic Sacred Polyhedra)
    const polyhedraGroup = new THREE.Group();
    const octaGeom = new THREE.OctahedronGeometry(0.7, 0);
    const icosaGeom = new THREE.IcosahedronGeometry(0.55, 0);

    // Faceted Crystal Gold Prism 1 (Top Left)
    const prism1 = new THREE.Mesh(octaGeom, crystalGoldMat);
    const prism1Wire = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), wireframeGoldMat);
    const prism1Group = new THREE.Group();
    prism1Group.add(prism1);
    prism1Group.add(prism1Wire);

    // Faceted Crystal Gold Prism 2 (Bottom Left)
    const prism2 = new THREE.Mesh(icosaGeom, crystalGoldMat);
    const prism2Wire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.64, 0), wireframeGoldMat);
    const prism2Group = new THREE.Group();
    prism2Group.add(prism2);
    prism2Group.add(prism2Wire);

    polyhedraGroup.add(prism1Group);
    polyhedraGroup.add(prism2Group);
    scene.add(polyhedraGroup);

    // 8. Object 4: Volumetric 3D Floating Petals & Golden Stardust Motes
    const particlesGroup = new THREE.Group();
    const petalCount = 36;
    const petalMeshes = [];

    // Curved Organic Petal Geometry
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.quadraticCurveTo(0.12, 0.2, 0, 0.35);
    petalShape.quadraticCurveTo(-0.12, 0.2, 0, 0);
    const petalGeom = new THREE.ShapeGeometry(petalShape);

    const petalMat1 = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.78,
    });

    const petalMat2 = new THREE.MeshStandardMaterial({
      color: 0xf9ded8,
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.72,
    });

    for (let i = 0; i < petalCount; i++) {
      const mat = i % 2 === 0 ? petalMat1 : petalMat2;
      const mesh = new THREE.Mesh(petalGeom, mat);
      const scale = Math.random() * 0.6 + 0.5;
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 6
      );
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      mesh.userData = {
        speedY: Math.random() * 0.012 + 0.006,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        wobbleSpeed: Math.random() * 1.5 + 0.8,
        initialX: mesh.position.x,
      };
      particlesGroup.add(mesh);
      petalMeshes.push(mesh);
    }

    // Golden Micro-Stardust
    const stardustGeom = new THREE.SphereGeometry(0.035, 12, 12);
    const stardustCount = 28;
    const stardustMeshes = [];
    for (let i = 0; i < stardustCount; i++) {
      const mesh = new THREE.Mesh(stardustGeom, goldMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 6
      );
      mesh.userData = {
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatOffset: Math.random() * Math.PI * 2,
        initialY: mesh.position.y,
      };
      particlesGroup.add(mesh);
      stardustMeshes.push(mesh);
    }
    scene.add(particlesGroup);

    // 9. Responsive Coordinates Function
    let worldHalfW = 6;
    const updateDimensionsAndPositions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const aspect = width / height;
      const isMob = width < 768;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Calculate world width at z=0 (camera at z=12, fov=45)
      const vFovHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      worldHalfW = (vFovHeight * aspect) / 2;

      if (isMob) {
        ringsGroup.position.set(Math.max(worldHalfW * 0.56, 1.15), 1.2, 0);
        ringsGroup.scale.set(0.58, 0.58, 0.58);

        prism1Group.position.set(-Math.max(worldHalfW * 0.64, 1.25), 2.4, -0.5);
        prism1Group.scale.set(0.65, 0.65, 0.65);

        prism2Group.position.set(-Math.max(worldHalfW * 0.60, 1.2), -3.0, 0.5);
        prism2Group.scale.set(0.6, 0.6, 0.6);

        ribbonMesh.scale.set(0.55, 0.8, 0.55);
      } else {
        ringsGroup.position.set(Math.min(worldHalfW * 0.70, 5.2), 1.0, 0);
        ringsGroup.scale.set(1.0, 1.0, 1.0);

        prism1Group.position.set(Math.max(-worldHalfW * 0.72, -5.2), 2.2, -1);
        prism1Group.scale.set(1.0, 1.0, 1.0);

        prism2Group.position.set(Math.max(-worldHalfW * 0.66, -4.8), -3.2, 1);
        prism2Group.scale.set(1.0, 1.0, 1.0);

        ribbonMesh.scale.set(1.0, 1.0, 1.0);
      }
    };

    updateDimensionsAndPositions();

    // 10. Scroll & Mouse Tracking
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        targetMouseX = (e.touches[0].clientX / width - 0.5) * 2;
        targetMouseY = (e.touches[0].clientY / height - 0.5) * 2;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', updateDimensionsAndPositions, { passive: true });

    // 11. 60FPS Cinematic Render Loop with Damped Interpolation
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth damped scroll progress
      scrollY += (targetScrollY - scrollY) * 0.08;
      const maxScroll = Math.max(document.body.scrollHeight - height, 1);
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Smooth damped mouse
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Update Cursor PointLight position in 3D space
      cursorLight.position.x = mouseX * worldHalfW * 0.9;
      cursorLight.position.y = -mouseY * 4.5;

      // Dynamic 3D Camera Fly-Through & Parallax
      const targetCamZ = 12 - Math.sin(scrollProgress * Math.PI) * 2.5;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.position.x = mouseX * 0.55;
      camera.position.y = -mouseY * 0.4 + Math.sin(elapsedTime * 0.5) * 0.08;
      camera.rotation.z = Math.sin(scrollProgress * Math.PI * 2) * 0.035;
      camera.lookAt(0, 0, 0);

      // --- Interlocking Rings 3D Motion (MotionSites.ai style) ---
      ringsGroup.rotation.y = elapsedTime * 0.22 + scrollProgress * Math.PI * 4;
      ringsGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15 + scrollProgress * Math.PI * 2;
      ringsGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.1;
      ringsGroup.position.y = 1.0 - scrollProgress * 3.6 + Math.sin(elapsedTime * 0.7) * 0.12;

      // --- Flowing 3D Golden Spline Ribbon Undulation ---
      ribbonMesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.2 + scrollProgress * 1.5;
      ribbonMesh.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

      // --- Geometric Prisms 3D Motion ---
      prism1Group.rotation.x = elapsedTime * 0.35 + scrollProgress * Math.PI * 2.8;
      prism1Group.rotation.y = elapsedTime * 0.4 + scrollProgress * Math.PI * 2.2;
      prism1Group.position.y = 2.4 - scrollProgress * 4.2 + Math.cos(elapsedTime * 0.6) * 0.15;

      prism2Group.rotation.x = -elapsedTime * 0.3 + scrollProgress * Math.PI * 2.4;
      prism2Group.rotation.z = elapsedTime * 0.35;
      prism2Group.position.y = -3.0 + scrollProgress * 5.0 + Math.sin(elapsedTime * 0.7) * 0.15;

      // --- 3D Falling Petals Dynamic Physics ---
      for (let i = 0; i < petalMeshes.length; i++) {
        const p = petalMeshes[i];
        p.position.y -= p.userData.speedY * (1 + scrollProgress * 1.5);
        p.rotation.x += p.userData.rotSpeedX;
        p.rotation.y += p.userData.rotSpeedY;
        p.position.x = p.userData.initialX + Math.sin(elapsedTime * p.userData.wobbleSpeed + i) * 0.4;

        // Wrap around vertically
        if (p.position.y < -9) {
          p.position.y = 9;
        }
      }

      // --- Floating Golden Stardust ---
      for (let i = 0; i < stardustMeshes.length; i++) {
        const s = stardustMeshes[i];
        s.position.y = s.userData.initialY + Math.sin(elapsedTime * 1.4 + s.userData.floatOffset) * 0.35 - scrollProgress * 2.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 12. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', updateDimensionsAndPositions);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      envTexture.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden" 
    />
  );
}
