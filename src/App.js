import logo from "./logo.svg"
import "./App.css"
import { useEffect, useRef, useState } from "react"

// Build a Stopwatch with Lap Functionality
// Display Time: Show the elapsed time in the format minutes:seconds:milliseconds.
// Start Button: Starts the stopwatch.
// Stop Button: Stops the stopwatch.
// Reset Button: Resets the stopwatch to 00:00:00 and stops it if running.
// Lap Button: Records the current elapsed time as a new lap.

function App() {
	const [timer, setTimer] = useState(0)
	const [start, setStart] = useState(false)
	const [stop, setStop] = useState(false)
	const [lapped, setLapped] = useState([])
	const timerRef = useRef()
	// const lapArr = []
	// let interval
	useEffect(() => {
		let interval
		if (start) {
			setStop(false)
			interval = setInterval(() => setTimer((prev) => (prev += 10)), 10)
		}

		if (stop) {
			clearInterval(interval)
		}
		return () => {
			clearInterval(interval)
		}
	}, [start, stop])
	const handleStart = () => {
		setStart(true)
	}
	const handleStop = () => {
		setStart(false)
		setStop(true)
	}
	const handleReset = () => {
		setTimer(0)
	}
	const handleLap = () => {
		console.log(timerRef.current.textContent)
		// if (stop) {
		const lappedTime = timerRef.current.textContent
		setLapped((prev) => [...prev, lappedTime])
		// }
	}
	console.log(lapped)
	return (
		<div className="app">
			<div ref={timerRef} className="time-wrap">
				<span className="mins time">
					{("0" + Math.floor((timer / 60000) % 60)).slice(-2)}
				</span>
				<span className="colon">::</span>
				<span className="secs time">
					{("0" + Math.floor((timer / 1000) % 60)).slice(-2)}
				</span>
				<span className="colon">::</span>
				<span className="ms time">
					{("0" + ((timer / 10) % 1000)).slice(-2)}
				</span>
			</div>
			<div className="btn-wrap">
				<button onClick={handleStart} className="startBtn btn">
					Start
				</button>
				<button onClick={handleStop} className="stopBtn btn">
					Stop
				</button>
				<button onClick={handleReset} className="resetBtn btn">
					Reset
				</button>
				<button onClick={handleLap} className="lapBtn btn">
					Lap
				</button>
			</div>

			{lapped && lapped.length !== 0 && (
				<div className="lapsed-time">
					<h2>Lapped Values</h2>
					<ol>
						{lapped.map((item, index) => (
							<li>{item}</li>
						))}
					</ol>
				</div>
			)}
		</div>
	)
}

export default App
