import { useEffect, useState } from "react"

function App() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { 
        const { clientX, clientY } = e
        setPosition({ x: clientX, y: clientY })
     }

    if (enabled) {
      window.addEventListener('pointermove', handleMouseMove);
    } else {
      setPosition({ x: 0, y: 0 });
    }

    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
    };
  }, [enabled]);
  
  return (
    <main>
      <div
      style={{
        position:'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity:0.8,
        pointerEvents: 'none',
        left:-20,
        top:-20,
        width: 40,
        height: 40,
        transform:`translate(${position.x}px, ${position.y}px)`,
      }}
      />
    <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Desactiva' : 'Activar'} Seguir Puntero</button>
    </main>
  )
}

export default App