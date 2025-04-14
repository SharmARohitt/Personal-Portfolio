
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

interface ThreeSceneProps {
  type?: 'home' | 'about' | 'projects' | 'contact';
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ type = 'home' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create scene based on type
    createSceneObjects(type);
    
    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Handle mouse move for interactive effects
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      if (!scene || !camera || !renderer) return;
      
      // Update animations
      updateAnimations();
      
      // Render
      renderer.render(scene, camera);
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
    };
  }, [type]);
  
  useEffect(() => {
    // Update scene colors based on theme
    if (!sceneRef.current) return;
    
    updateSceneColors();
  }, [theme]);
  
  const createSceneObjects = (type: string) => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current;
    
    // Clear existing objects
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x222244 : 0xffffff,
      theme === 'dark' ? 0.3 : 0.5
    );
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(
      theme === 'dark' ? 0x8888ff : 0xffffff,
      theme === 'dark' ? 0.8 : 0.7
    );
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);
    
    if (type === 'home') {
      // Create particle system for background
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2000;
      
      const posArray = new Float32Array(particlesCount * 3);
      const scaleArray = new Float32Array(particlesCount);
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = (Math.random() - 0.5) * 20;
        posArray[i + 2] = (Math.random() - 0.5) * 20;
        scaleArray[i / 3] = Math.random();
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: theme === 'dark' ? 0x8888ff : 0x0066ff,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      particlesRef.current = particles;
      
      // Add a floating avatar or symbolic object
      const geometry = new THREE.IcosahedronGeometry(1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: 0x6600ff,
        wireframe: true,
        emissive: 0x440088,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9,
      });
      
      const avatar = new THREE.Mesh(geometry, material);
      avatar.position.set(0, 0, 0);
      scene.add(avatar);
    } else if (type === 'about') {
      // Create neural network like connections for about page
      const neuralGeometry = new THREE.BufferGeometry();
      const particlesCount = 100;
      
      // Create nodes
      const posArray = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 15;
        posArray[i + 1] = (Math.random() - 0.5) * 15;
        posArray[i + 2] = (Math.random() - 0.5) * 15;
      }
      
      neuralGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const neuralMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: theme === 'dark' ? 0x00ffaa : 0x00aa66,
        transparent: true,
        opacity: 0.8,
      });
      
      const neuralPoints = new THREE.Points(neuralGeometry, neuralMaterial);
      scene.add(neuralPoints);
      
      // Create connections between close nodes
      const lines = new THREE.Group();
      scene.add(lines);
      
      // This will be dynamically updated in animation loop
    } else if (type === 'projects') {
      // Create grid of floating cubes for projects page
      const gridGroup = new THREE.Group();
      
      const size = 0.5;
      const gap = 2;
      const rows = 3;
      const cols = 3;
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const geometry = new THREE.BoxGeometry(size, size, size);
          const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(
              0.4 + i * 0.2,
              0.2 + j * 0.2,
              0.8
            ),
            transparent: true,
            opacity: 0.8,
          });
          
          const cube = new THREE.Mesh(geometry, material);
          cube.position.x = (j - cols / 2) * gap;
          cube.position.y = (i - rows / 2) * gap;
          cube.position.z = Math.random() * 2 - 1;
          
          // Store original position for animations
          (cube as any).userData = {
            originalX: cube.position.x,
            originalY: cube.position.y,
            originalZ: cube.position.z,
            phase: Math.random() * Math.PI * 2,
          };
          
          gridGroup.add(cube);
        }
      }
      
      scene.add(gridGroup);
    } else if (type === 'contact') {
      // Create galaxy effect for contact page
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 3000;
      
      const positions = new Float32Array(starsCount * 3);
      const colors = new Float32Array(starsCount * 3);
      
      const galaxy = new THREE.Object3D();
      
      for (let i = 0; i < starsCount; i++) {
        const i3 = i * 3;
        
        // Spiral pattern
        const radius = Math.random() * 10;
        const spinAngle = radius * 0.5;
        const branchAngle = (i % 3) * Math.PI * 2 / 3;
        
        positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
        positions[i3 + 1] = (Math.random() - 0.5) * 2;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;
        
        // Color
        const colorIndex = i % 3;
        if (colorIndex === 0) {
          // Blue
          colors[i3] = 0.2;
          colors[i3 + 1] = 0.5;
          colors[i3 + 2] = 1.0;
        } else if (colorIndex === 1) {
          // Purple
          colors[i3] = 0.6;
          colors[i3 + 1] = 0.2;
          colors[i3 + 2] = 1.0;
        } else {
          // Pink
          colors[i3] = 1.0;
          colors[i3 + 1] = 0.2;
          colors[i3 + 2] = 0.7;
        }
      }
      
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const starsMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });
      
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      galaxy.add(stars);
      
      scene.add(galaxy);
      
      // Add floating message icon
      const envelopeGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      const envelopeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00aaff,
        emissive: 0x0055aa,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9,
      });
      
      const envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
      envelope.position.set(0, 0, 0);
      scene.add(envelope);
    }
  };
  
  const updateSceneColors = () => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current;
    
    // Update ambient light
    scene.children.forEach((child) => {
      if (child instanceof THREE.AmbientLight) {
        child.color.set(theme === 'dark' ? 0x222244 : 0xffffff);
        child.intensity = theme === 'dark' ? 0.3 : 0.5;
      }
      
      if (child instanceof THREE.DirectionalLight) {
        child.color.set(theme === 'dark' ? 0x8888ff : 0xffffff);
        child.intensity = theme === 'dark' ? 0.8 : 0.7;
      }
      
      if (child instanceof THREE.Points) {
        const material = child.material as THREE.PointsMaterial;
        if (type === 'home') {
          material.color.set(theme === 'dark' ? 0x8888ff : 0x0066ff);
        } else if (type === 'about') {
          material.color.set(theme === 'dark' ? 0x00ffaa : 0x00aa66);
        }
      }
      
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshPhongMaterial;
        if (material.emissive) {
          material.emissiveIntensity = theme === 'dark' ? 0.5 : 0.3;
        }
      }
    });
  };
  
  const updateAnimations = () => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current;
    
    // Update based on type
    if (type === 'home') {
      // Rotate icosahedron avatar
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.IcosahedronGeometry) {
          child.rotation.x += 0.001;
          child.rotation.y += 0.002;
          
          // Float up and down
          child.position.y = Math.sin(Date.now() * 0.001) * 0.3;
          
          // Interaction with mouse
          child.rotation.x += mouseRef.current.y * 0.01;
          child.rotation.y += mouseRef.current.x * 0.01;
        }
      });
      
      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0005;
      }
    } else if (type === 'about') {
      // Rotate neural network
      scene.children.forEach((child) => {
        if (child instanceof THREE.Points) {
          child.rotation.x += 0.001;
          child.rotation.y += 0.001;
        }
      });
    } else if (type === 'projects') {
      // Animate grid cubes
      scene.children.forEach((child) => {
        if (child instanceof THREE.Group) {
          child.children.forEach((cube, i) => {
            if (cube instanceof THREE.Mesh) {
              const userData = (cube as any).userData;
              
              // Floating animation
              cube.position.y = userData.originalY + Math.sin(Date.now() * 0.001 + userData.phase) * 0.3;
              
              // Rotation
              cube.rotation.x += 0.01;
              cube.rotation.y += 0.01;
              
              // Scale on hover (using mouse position)
              const distX = Math.abs(userData.originalX - mouseRef.current.x * 5);
              const distY = Math.abs(userData.originalY - mouseRef.current.y * 5);
              const dist = Math.sqrt(distX * distX + distY * distY);
              
              if (dist < 2) {
                cube.scale.setScalar(1 + (2 - dist) * 0.2);
              } else {
                cube.scale.setScalar(1);
              }
            }
          });
        }
      });
    } else if (type === 'contact') {
      // Rotate galaxy
      scene.children.forEach((child) => {
        if (child instanceof THREE.Object3D && child.children[0] instanceof THREE.Points) {
          child.rotation.y += 0.0005;
        }
        
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusKnotGeometry) {
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
          
          // Float up and down
          child.position.y = Math.sin(Date.now() * 0.001) * 0.3;
        }
      });
    }
  };
  
  return <div ref={mountRef} className="canvas-container" />;
};

export default ThreeScene;
