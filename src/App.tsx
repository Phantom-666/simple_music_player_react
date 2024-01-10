import React, { useEffect, useState } from "react"
import music from "./sounds/test.mp3"

function App() {
  const [audio] = useState(new Audio(music))

  const [isPlaying, setIsPlaying] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setSeconds(audio.currentTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [audio, audio.currentTime, isPlaying])

  useEffect(() => {
    audio.addEventListener("ended", () => setIsPlaying(false))
    return () => {
      audio.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  const playFunc = () => {
    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    } else {
      setIsPlaying(true)
      audio.play()
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="center">
          <div className="row">
            <h2>Simple Music Player</h2>

            <img
              height={300}
              src="https://www.rewizor.ru/files/228949ojmf.jpg"
              alt=""
            />
            <br />
            <div className="row">
              <div className="col s4"></div>
              <input
                type="range"
                min="0"
                max={audio.duration ? audio.duration : 100}
                value={seconds}
                className="col s4"
                onChange={(e) => {
                  audio.currentTime = Number(e.target.value)
                }}
              />
            </div>
            <div className="row player-menu">
              <button className="btn" onClick={playFunc}>
                {isPlaying ? "Stop" : "Play"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
