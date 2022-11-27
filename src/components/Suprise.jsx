import React from 'react'
import { useEffect, useState, useMemo } from 'react'
//this hook gets the current mouse position in the browser 
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clickCount, setClickCount] = useState(0)
  useEffect(() => {
    addCircle()

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY }) // update position
      //style the circle and update its position
      const circle = document.querySelector('.circle')
      circle.style.height = 100 + 'px'
      circle.style.width = circle.style.height
      circle.style.top = `${e.clientY - 50}px`
      circle.style.left = `${e.clientX - 50}px`
      circle.style.borderRadius = '50%'
      circle.style.position = 'absolute'
      circle.style.zIndex = '-1'
    }
    const handleClick = (e) => {
      document.querySelector('#loading').style.display = 'block'
      setTimeout(() => {
        const circle = document.querySelector('.circle')
      circle.animate([
        { transform: 'scale(0)' },
        { transform: 'scale(1)' },     
      ], {
        duration: 300,
        iterations: 1,
        easing: 'ease-in-out'
      })
      circle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
        document.querySelector('#welcome-txt').style.display = 'none'
        document.querySelector('#loading').style.display = 'none'
       
        setClickCount(clickCount => clickCount + 1)
      }, 500)
      console.log(clickCount)
      
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [clickCount])

  return position
}
function addCircle() {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  document.body.appendChild(circle)
}

export default function Suprise() {
  const { x, y } = useMousePosition()

  return (
    < >
      <div id="welcome-txt" className="flex items-center justify-center h-screen text-5xl text-center font-medium animate-pulse"
      >
        Click anywhere on the screen to see what happens!
      </div>
      <div id="loading" className="flex items-center justify-center h-screen text-5xl text-center font-medium animate-pulse" style={{display:'none'}}>
        Loading...
      </div>
    </>
  )
}
