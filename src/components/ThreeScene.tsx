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
      // Create a futuristic cyber grid effect
      const gridGroup = new THREE.Group();
      scene.add(gridGroup);
      
      // 1. Create a dynamic grid plane
      const gridSize = 30;
      const gridDivisions = 30;
      const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
      
      // Create a custom shader material for the grid
      const gridMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(theme === 'dark' ? 0x2200ff : 0x0044ff) },
          color2: { value: new THREE.Color(theme === 'dark' ? 0xff00ff : 0x00ffff) },
          mousePosition: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader: `
          uniform float time;
          uniform vec2 mousePosition;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            
            // Calculate distance from mouse for interactive effect
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            float dist = distance(vec2(modelPosition.x, modelPosition.y), mousePosition * 15.0);
            
            // Create wave effect
            float elevation = sin(modelPosition.x * 0.5 + time * 0.5) * 
                            sin(modelPosition.y * 0.5 + time * 0.5) *
                            0.5;
                            
            // Add mouse interaction
            float mouseEffect = 0.0;
            if (dist < 5.0) {
              mouseEffect = (1.0 - dist / 5.0) * 2.0;
            }
            
            modelPosition.z += elevation + mouseEffect;
            vElevation = elevation + mouseEffect;
            
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            
            gl_Position = projectedPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float time;
          
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            // Create grid lines
            float gridLine = 0.0;
            float gridWidth = 0.02;
            
            // X grid lines
            if (mod(vUv.x * 30.0, 1.0) < gridWidth || mod(vUv.y * 30.0, 1.0) < gridWidth) {
              gridLine = 0.5 + sin(time * 2.0) * 0.5;
            }
            
            // Blend colors based on elevation and grid
            vec3 finalColor = mix(color1, color2, vElevation + 0.5) + gridLine;
            
            // Fade out at edges
            float strength = 1.0 - max(
              0.0, 
              3.0 * abs(vUv.x - 0.5) * abs(vUv.y - 0.5)
            );
            
            // Add pulse effect
            float pulse = 0.5 + 0.5 * sin(time * 3.0);
            strength *= mix(0.8, 1.0, pulse);
            
            gl_FragColor = vec4(finalColor, strength * 0.6);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);
      gridPlane.rotation.x = -Math.PI / 2; // Lay flat
      gridPlane.position.y = -5; // Position below
      gridGroup.add(gridPlane);
      
      // 2. Create floating data nodes
      const nodeCount = 50;
      const nodeGroup = new THREE.Group();
      
      for (let i = 0; i < nodeCount; i++) {
        // Randomize node types
        let geometry;
        const nodeType = Math.floor(Math.random() * 4);
        
        switch (nodeType) {
          case 0:
            geometry = new THREE.TetrahedronGeometry(0.2 * Math.random() + 0.1);
            break;
          case 1:
            geometry = new THREE.OctahedronGeometry(0.2 * Math.random() + 0.1);
            break;
          case 2:
            geometry = new THREE.DodecahedronGeometry(0.2 * Math.random() + 0.1);
            break;
          default:
            geometry = new THREE.IcosahedronGeometry(0.2 * Math.random() + 0.1);
        }
        
        // Create glowing materials
        const mainMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(
            Math.random() * 0.2 + 0.5,  // Red
            Math.random() * 0.8,        // Green
            Math.random() + 0.2         // Blue (higher to get more blues/purples)
          ),
          wireframe: Math.random() > 0.5,
          transparent: true,
          opacity: 0.8
        });
        
        const node = new THREE.Mesh(geometry, mainMaterial);
        
        // Position in a spherical formation
        const radius = 10;
        const phi = Math.random() * Math.PI * 2; // around
        const theta = Math.random() * Math.PI; // up/down
        
        node.position.x = radius * Math.sin(theta) * Math.cos(phi);
        node.position.y = radius * Math.sin(theta) * Math.sin(phi) - 2; // Offset Y
        node.position.z = radius * Math.cos(theta);
        
        // Store original position and other animation parameters
        node.userData = {
          originalPosition: node.position.clone(),
          phase: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.5,
          amplitude: 0.3 + Math.random() * 0.7,
          pulseSpeed: 0.1 + Math.random() * 0.3
        };
        
        nodeGroup.add(node);
      }
      
      scene.add(nodeGroup);
      
      // 3. Add flowing connection lines between close nodes
      const lineMaterial = new THREE.LineBasicMaterial({
        color: theme === 'dark' ? 0x00aaff : 0x0066aa,
        transparent: true,
        opacity: 0.3
      });
      
      const lineGroup = new THREE.Group();
      
      // Create some initial connections
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          // Connect only some nodes that are close to each other
          const node1 = nodeGroup.children[i];
          const node2 = nodeGroup.children[j];
          
          const distance = node1.position.distanceTo(node2.position);
          
          if (distance < 5 && Math.random() > 0.7) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              node1.position,
              node2.position
            ]);
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            lineGroup.add(line);
            
            // Store which nodes this line connects
            line.userData = {
              node1Index: i,
              node2Index: j
            };
          }
        }
      }
      
      scene.add(lineGroup);
      
      // 4. Add background nebula/galaxy effect
      const nebulaMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: `
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec2 resolution;
          varying vec2 vUv;
          
          // Noise functions
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }
          
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }
          
          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 2.0;
            
            for (int i = 0; i < 6; i++) {
              value += amplitude * noise(p * frequency);
              amplitude *= 0.5;
              frequency *= 2.0;
            }
            
            return value;
          }
          
          void main() {
            // Center coordinates
            vec2 uv = vUv - 0.5;
            uv.x *= resolution.x / resolution.y;
            
            // Nebula color calculation
            float t = time * 0.1;
            
            // Multiple layers of animated noise
            float noise1 = fbm(uv * 3.0 + vec2(t * 0.2, t * 0.1));
            float noise2 = fbm(uv * 5.0 - vec2(t * 0.15, t * 0.25));
            float noise3 = fbm(uv * 8.0 + vec2(t * 0.1, -t * 0.3));
            
            // Combine noise for intensity
            float intensity = noise1 * noise2 + noise3;
            intensity = smoothstep(0.1, 0.8, intensity);
            
            // Color mapping
            vec3 color1 = vec3(0.1, 0.2, 0.5); // Dark blue
            vec3 color2 = vec3(0.8, 0.1, 0.8); // Purple/magenta
            vec3 color3 = vec3(0.1, 0.7, 0.9); // Cyan
            
            vec3 finalColor = mix(
              mix(color1, color2, noise1),
              color3,
              noise3
            );
            
            // Fade by distance from center for nebula shape
            float dist = length(uv);
            float fade = smoothstep(1.0, 0.2, dist);
            
            // Add stars
            float stars = step(0.98, hash(uv * 500.0 + time));
            stars += step(0.995, hash(uv * 1000.0 - time * 0.5));
            
            finalColor += stars * vec3(1.0);
            
            gl_FragColor = vec4(finalColor, intensity * fade * 0.5);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide
      });
      
      const nebulaSphere = new THREE.Mesh(
        new THREE.SphereGeometry(20, 32, 32),
        nebulaMaterial
      );
      scene.add(nebulaSphere);
      
      // Store references for animation in userData
      scene.userData = {
        gridMaterial,
        nodeGroup,
        lineGroup,
        nebulaMaterial,
        startTime: Date.now()
      };
    } else if (type === 'contact') {
      // Keep existing contact page animation
      // ... keep existing code (galaxy effect for contact page)
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
      // Update projects page futuristic animations
      const userData = scene.userData;
      if (!userData) return;
      
      const time = (Date.now() - (userData.startTime || 0)) * 0.001; // time in seconds
      
      // 1. Update grid shader
      if (userData.gridMaterial) {
        userData.gridMaterial.uniforms.time.value = time;
        userData.gridMaterial.uniforms.mousePosition.value = new THREE.Vector2(
          mouseRef.current.x,
          mouseRef.current.y
        );
      }
      
      // 2. Update floating data nodes
      if (userData.nodeGroup) {
        userData.nodeGroup.children.forEach((node) => {
          const nodeData = node.userData;
          
          // Orbital movement with oscillation
          const phase = nodeData.phase + time * nodeData.speed;
          const amplitude = nodeData.amplitude;
          
          // Apply complex motion pattern
          node.position.x = nodeData.originalPosition.x + Math.sin(phase) * amplitude;
          node.position.y = nodeData.originalPosition.y + Math.cos(phase * 0.7) * amplitude;
          node.position.z = nodeData.originalPosition.z + Math.sin(phase * 1.3) * amplitude;
          
          // Rotation
          node.rotation.x += 0.01;
          node.rotation.y += 0.01;
          
          // Pulsing effect
          if (node.material) {
            node.material.opacity = 0.5 + 0.3 * Math.sin(time * nodeData.pulseSpeed);
          }
          
          // Mouse interaction - nodes move away from mouse
          const mouseRepulsion = 3;
          const mouseVec = new THREE.Vector3(
            mouseRef.current.x * 10, 
            mouseRef.current.y * 10, 
            0
          );
          
          const distance = mouseVec.distanceTo(node.position);
          if (distance < mouseRepulsion) {
            const repulsionStrength = (1 - distance / mouseRepulsion) * 0.1;
            const repulsionDir = new THREE.Vector3()
              .subVectors(node.position, mouseVec)
              .normalize();
            
            node.position.add(
              repulsionDir.multiplyScalar(repulsionStrength)
            );
          }
        });
      }
      
      // 3. Update connection lines between nodes
      if (userData.lineGroup && userData.nodeGroup) {
        userData.lineGroup.children.forEach((line) => {
          const lineData = line.userData;
          
          if (typeof lineData.node1Index === 'number' && 
              typeof lineData.node2Index === 'number') {
            
            const node1 = userData.nodeGroup.children[lineData.node1Index];
            const node2 = userData.nodeGroup.children[lineData.node2Index];
            
            if (node1 && node2) {
              // Update line geometry to match node positions
              const positions = line.geometry.attributes.position.array;
              
              positions[0] = node1.position.x;
              positions[1] = node1.position.y;
              positions[2] = node1.position.z;
              
              positions[3] = node2.position.x;
              positions[4] = node2.position.y;
              positions[5] = node2.position.z;
              
              line.geometry.attributes.position.needsUpdate = true;
            }
          }
        });
      }
      
      // 4. Update nebula background
      if (userData.nebulaMaterial) {
        userData.nebulaMaterial.uniforms.time.value = time;
      }
    } else if (type === 'contact') {
      // Keep existing contact page animations
      // ... keep existing code (contact page animations)
    }
  };
  
  return <div ref={mountRef} className="canvas-container" />;
};

export default ThreeScene;
