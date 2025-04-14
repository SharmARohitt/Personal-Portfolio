
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

const CursorTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Trail particles
    const trailCount = 50;
    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);
    const trailColors = new Float32Array(trailCount * 3);
    
    // Initialize positions off-screen
    for (let i = 0; i < trailCount * 3; i += 3) {
      trailPositions[i] = -100;
      trailPositions[i + 1] = -100;
      trailPositions[i + 2] = 0;
      
      // Gradient colors for trail
      const colorFactor = i / (trailCount * 3);
      
      if (theme === 'dark') {
        // Purple to pink gradient for dark theme
        trailColors[i] = 0.6 + (0.4 * colorFactor); // Red component
        trailColors[i + 1] = 0.2 * (1 - colorFactor); // Green component
        trailColors[i + 2] = 0.8 - (0.2 * colorFactor); // Blue component
      } else {
        // Cyan to blue gradient for light theme
        trailColors[i] = 0.1 * (1 - colorFactor); // Red component
        trailColors[i + 1] = 0.7 + (0.3 * colorFactor); // Green component
        trailColors[i + 2] = 1.0; // Blue component
      }
    }
    
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
    
    const trailMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    
    const trail = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trail);
    
    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let trailIndex = 0;
    const clock = new THREE.Clock();
    
    const animate = () => {
      const delta = clock.getDelta();
      
      // Update trail positions
      const positions = trailGeometry.attributes.position.array as Float32Array;
      
      // Calculate 3D position from mouse position
      const targetX = mousePosition.current.x * 5; // scaled to scene size
      const targetY = mousePosition.current.y * 3; // scaled to scene size
      
      // Add new point to trail at current mouse position
      positions[trailIndex * 3] = targetX;
      positions[trailIndex * 3 + 1] = targetY;
      positions[trailIndex * 3 + 2] = 0;
      
      // Update index for next point
      trailIndex = (trailIndex + 1) % trailCount;
      
      // Fade out older points
      for (let i = 0; i < trailCount; i++) {
        const idx = i * 3;
        const age = (trailIndex - i + trailCount) % trailCount / trailCount;
        
        // Move points slightly toward z-axis to create depth
        positions[idx + 2] -= delta * 0.5 * age;
      }
      
      trailGeometry.attributes.position.needsUpdate = true;
      
      // Render scene
      renderer.render(scene, camera);
      
      // Continue animation loop
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      trailGeometry.dispose();
      trailMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
    />
  );
};

export default CursorTrail;
