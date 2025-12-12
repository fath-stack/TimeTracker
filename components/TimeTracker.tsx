"use client"

import { formatTime } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

const TimeTracker = () => {

	const [isRunning, setisRunning] = useState(false);
    const [inputMinute, setInputMinute] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [reset, setReset] = useState(false);
	const holdTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

		if (isRunning) {

			if (seconds === 0 && inputMinute !== 0) {
				setSeconds(inputMinute * 60); // Convert minutes to seconds
      		}
			interval = setInterval(() => {
				if (inputMinute !== 0) {
					setSeconds((prev) => {
						if (prev <= 1) {
							clearInterval(interval!);
							return 0;
						}
						return prev - 1;
					});
				} else {
					setSeconds((prev) => prev + 1);
				}
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRunning, inputMinute]);


	// Restore state if user reload the page
	useEffect(() => {
    const storedEndTime = localStorage.getItem('focuseEnd');
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
		} else if (storedEndTime) {
			setisRunning(true);
			const endTime = Number(storedEndTime);
			const leftTime = Math.floor((endTime - Date.now()) / 1000);
			if (leftTime >= 0) {
				setSeconds(leftTime);
				setisRunning(true);
			} else {
				localStorage.removeItem('focusEnd');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	// function for start the timer
	const startTimer = () => {
		if(!isRunning) {
			setisRunning(true);
			setReset(false);
            if (inputMinute !== 0) {
                localStorage.setItem("focusEnd", String(Date.now() + (inputMinute * 1000)));
            } else {
				localStorage.setItem("focusStart", String(Date.now()));
			}
		}
	};

	// function for pause the timer
	const pauseTimer = () => {
		if(isRunning) {
			localStorage.removeItem("focusStart");
            localStorage.removeItem("focusEnd");
			setisRunning(false);
		}
	};

	//reset the timer
	const resetTimer = () => {
		setisRunning(false);
		localStorage.removeItem("focusStart");
        localStorage.removeItem("focusEnd");
		setSeconds(0);
        setInputMinute(0);
		setReset(true)
	}

	// when user hold button time will reset
	const startHoldTimer = () => {
		holdTimeout.current = setTimeout(() => {
			if (isRunning) {
				resetTimer();
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
		<p className='mb-5'><span className='text-pretty'>FOCUSE</span> on your worke more than ever</p>
		<label htmlFor="minutes">Minutes:</label>
        <input
        type="number"
		id='minutes'
        min="1"
		aria-label='Minutes'
        value={inputMinute}
        disabled={isRunning || seconds !== 0}
        onChange={(e) => setInputMinute(Number(e.target.value))}
        className={`border p-1 mx-1 rounded w-50 mt-4 ${(isRunning || seconds !== 0) ? "opacity-50 cursor-not-allowed" : ''}`}
        />
        
		<button className={`transition w-40 h-40 border-2 rounded-full my-5 ${reset ? 'text-red-800 animate-pulse' : 'animate-none'}`}
		onClick={() => (isRunning ? pauseTimer() : startTimer())}
		onDoubleClick={() => resetTimer()}
		onTouchStart={() => startHoldTimer()}
		onTouchEnd={() => cancelHoldTimer()}
		onTouchCancel={() => cancelHoldTimer()}
		>
			<h2 className='text-3xl select-none' >{formatTime(seconds)}</h2>
		</button>
	</div>
  )
}

export default TimeTracker;