"use client"

import { formatTime } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

const TimeTracker = () => {

	const [isRunning, setisRunning] = useState(false);
    const [inputMinute, setInputMinute] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [reset, setReset] = useState(false);
	const holdTimeout = useRef<NodeJS.Timeout | null>(null);

	// Restore state if user reload the page
	useEffect (() => {
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
			// eslint-disable-next-line react-hooks/exhaustive-deps
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
	}, []);

	// Timer
	useEffect(() => {
		let interval : number | null = null;
        const totalSec : number | null = inputMinute * 60;

		if (isRunning) {
			interval = window.setInterval(() => {
                if (inputMinute) {
                    setSeconds(totalSec);
                    setSeconds((prev) => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            return 0;
                        }
                        return prev - 1;
                    });
                } else {
                    setSeconds((prev) => prev + 1);
                }
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
            if (inputMinute) {
                localStorage.setItem("focusEnd", String(Date.now() + (inputSeconds * 1000));
            }
        	setisRunning(true);
			setReset(false);
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
        <input
        type="number"
        min="1"
        placeholder="minutes"
        value={inputSec}
        disabled={isRunning}
        onChange={(e) => setInputSeconds(Number(e.target.value))}
        className={`border p-2 rounded w-full mt-4 ${isRunning ? "opacity-50 cursor-not-allowed" : ''}`}
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