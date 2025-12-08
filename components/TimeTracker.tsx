"use client"

import { formatTime } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

const TimeTracker = () => {

	const [isRunning, setisRunning] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const [reset, setReset] = useState(false);
	const holdTimeout = useRef<NodeJS.Timeout | null>(null);

	// Restore state if user reload the page
	useEffect (() => {
		const storedStartTime = localStorage.getItem('focusStart');

		if (storedStartTime) {
			setisRunning(true);
			const startTime = Number(storedStartTime);
			const diff = Math.floor((Date.now() - startTime) / 1000);
			if (diff >= 0) {
				setSeconds(diff);
				setisRunning(true);
			} else {
				localStorage.removeItem('focusStart');
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}
	}, []);

	// Timer
	useEffect(() => {
		let interval : number | null = null;

		if (isRunning) {
			interval = window.setInterval(() => {
			setSeconds((prev) => prev + 1);
			}, 1000);
		} else if (interval) {
			clearInterval(interval);
		};

		return () => {
			if (interval) clearInterval(interval);
		};
		
	},[isRunning]);


	// function for start the timer
	const startTimer = () => {
		if(!isRunning) {
			localStorage.setItem("focusStart", String(Date.now()));
        	setisRunning(true);
			setReset(false);
		}
	};

	// function for pause the timer
	const pauseTimer = () => {
		if(isRunning) {
			localStorage.removeItem("focusStart");
			setisRunning(false);
		}
	};

	//reset the timer
	const resetTimer = () => {
		setisRunning(false);
		localStorage.removeItem("focusStart");
		setSeconds(0);
		setReset(true)
	}

	// when user hold button time will reset
	const startHoldTimer = () => {
		holdTimeout.current = setTimeout(() => {
			if (isRunning) {
				resetTimer()
			}
		}, 1000);
	};

	const cancelHoldTimer = () => {
		if (holdTimeout.current) {
			clearTimeout(holdTimeout.current);
			holdTimeout.current = null;
		}
	};


  return (
	<div className='flex flex-col w-full justify-center items-center my-5'>
		<h1 className='text-3xl'>Time Tracker</h1>
		<p><span className='text-pretty '>FOCUSE</span> on your worke more than ever</p>
		<button className={`transition w-40 h-40 border-2 rounded-full my-5 ${reset ? 'text-red-800 animate-pulse' : 'animate-none'}`}
		onClick={() => (isRunning ? pauseTimer() : startTimer())}
		onDoubleClick={() => resetTimer()}
		onTouchStart={() => startHoldTimer()}
		onTouchEnd={() => cancelHoldTimer()}
		onTouchCancel={() => cancelHoldTimer()}
		>
			<h2 className='text-3xl'>{formatTime(seconds)}</h2>
		</button>
	</div>
  )
}

export default TimeTracker;