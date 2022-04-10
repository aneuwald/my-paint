
import { useEffect, useRef, useState } from 'react'
import Menu from "./components/Menu"
import styled from 'styled-components'

function App() {

  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState(5)
  const [lineColor, setLineColor] = useState('black')
  const [lineOpacity, setLineOpacity] = useState(0.5)

  const [mousePosition, setMousePosition] = useState({ left: 0, top: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalAlpha = lineOpacity
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctxRef.current = ctx

  }, [lineColor, lineOpacity, lineWidth])

  useEffect(() => {
    canvasRef.current.addEventListener('mousemove', (e) => {
      setMousePosition({left: e.pageX, top: e.pageY});
  });
  }, [])

  const startDrawing = (e) => {
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setIsDrawing(true)
  }

  const endDrawing = () => {
    ctxRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = (e) => {
    if (!isDrawing)
      return
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctxRef.current.stroke()
  }

  const handleResetCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <AppContainer>
      <DrawArea>
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          resetCanvas={handleResetCanvas}
        />
        <Canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight - 65}
        />
      </DrawArea>
      <MouseCursor
        style={{ 
          left: mousePosition.left, 
          top: mousePosition.top,
          backgroundColor: lineColor,
          width: lineWidth + 'px',
          height: lineWidth + 'px',
          opacity: lineOpacity + 0.1
        }}
      />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: linear-gradient( 120deg, #fdfbfb 0%, #ebedee 100%);
`

const DrawArea = styled.div`
  max-width: 100vw;
  max-height: 100vw;
  position: relative; 
  background-color: white;
`

const Canvas = styled.canvas`
  cursor: none;
`

const MouseCursor = styled.div`
	position: absolute;
	z-index: 999;
  transform: translate(-50%, -50%);
	border-radius: 999px;
  pointer-events:none;
`