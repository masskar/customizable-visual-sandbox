
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Text3D, Text } from '@react-three/drei';
import * as THREE from 'three';

const VSCodeWindow = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Simulate typing animation
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const [code, setCode] = React.useState("");
  const codeLines = [
    "function HelloWorld() {",
    "  return (",
    "    <div>",
    "      <h1>Hello, World!</h1>",
    "    </div>",
    "  );",
    "}"
  ];
  
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentLine = 0;
    let currentChar = 0;
    
    const typeNextChar = () => {
      if (currentLine < codeLines.length) {
        if (currentChar <= codeLines[currentLine].length) {
          setCode(prev => {
            const lines = prev.split('\n');
            while (lines.length <= currentLine) lines.push('');
            lines[currentLine] = codeLines[currentLine].substring(0, currentChar);
            return lines.join('\n');
          });
          
          setCursorPosition(currentChar);
          currentChar++;
        } else {
          currentChar = 0;
          currentLine++;
          setCode(prev => prev + '\n');
        }
        
        timeout = setTimeout(typeNextChar, Math.random() * 100 + 50);
      } else {
        setTimeout(() => {
          setCode("");
          currentLine = 0;
          currentChar = 0;
          timeout = setTimeout(typeNextChar, 1000);
        }, 2000);
      }
    };
    
    timeout = setTimeout(typeNextChar, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* VS Code Window */}
      <RoundedBox args={[5, 3, 0.1]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1e1e1e" />
      </RoundedBox>
      
      {/* Window Top Bar */}
      <RoundedBox args={[5, 0.4, 0.12]} radius={0.05} smoothness={4} position={[0, 1.3, 0.01]}>
        <meshStandardMaterial color="#252526" />
      </RoundedBox>
      
      {/* Window Buttons */}
      <mesh position={[-2.2, 1.3, 0.07]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ff5f57" />
      </mesh>
      <mesh position={[-1.9, 1.3, 0.07]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#febc2e" />
      </mesh>
      <mesh position={[-1.6, 1.3, 0.07]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#28c840" />
      </mesh>
      
      {/* Window Title */}
      <Text
        position={[0, 1.3, 0.07]}
        fontSize={0.2}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
      >
        App.tsx - My Project
      </Text>
      
      {/* Code Editor Area */}
      <RoundedBox args={[4.8, 2.5, 0.05]} radius={0.02} smoothness={4} position={[0, -0.05, 0.06]}>
        <meshStandardMaterial color="#1e1e1e" />
      </RoundedBox>
      
      {/* Line Numbers */}
      <Text
        position={[-2.2, 0, 0.12]}
        fontSize={0.12}
        color="#6a737d"
        anchorX="left"
        anchorY="middle"
        maxWidth={4}
        lineHeight={1.5}
      >
        {code.split('\n').map((_, i) => i + 1).join('\n')}
      </Text>
      
      {/* Code Text */}
      <Text
        position={[-1.9, 0, 0.12]}
        fontSize={0.12}
        color="#d4d4d4"
        anchorX="left"
        anchorY="middle"
        maxWidth={4}
        lineHeight={1.5}
      >
        {code}
      </Text>
      
      {/* Cursor - Blinking effect */}
      {(Math.floor(Date.now() / 500) % 2 === 0) && (
        <mesh
          position={[
            -1.9 + cursorPosition * 0.073,
            0 - (code.split('\n').length - 1) * 0.09,
            0.13
          ]}
        >
          <boxGeometry args={[0.01, 0.15, 0.01]} />
          <meshStandardMaterial color="#007acc" />
        </mesh>
      )}
    </group>
  );
};

const VSCodeAnimation: React.FC = () => {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <VSCodeWindow />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default VSCodeAnimation;
