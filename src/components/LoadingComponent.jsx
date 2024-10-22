import { useState, useEffect } from 'react'
import { Pen } from 'lucide-react'

function LoadingComponent() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length >= 3) return ''
        return prevDots + '.'
      })
    }, 500) // Change dot every 500ms

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center" style={{ height: "calc(100vh - 6rem)" }}>
      <div className="flex items-center space-x-2">
        <Pen className="w-6 h-6 text-blue-500" />
        <div className="w-16 text-blue-500 text-2xl font-bold">
          {dots}
        </div>
      </div>
    </div>
  )
}

export default LoadingComponent