'use client'
// npm install framer-motion
// -------------------------------------------------------------------------
// Please use a folder for this entire wheel component
// Please put the files in the same folder
import './Wheel.css';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';


// You are able to use tailwind css in this component but css is needed to circle behavior
// Please chance size in the CSS file
export const MyComponent = () => {
    const wheelRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [velocity, setVelocity] = useState(0);

    // @ts-ignore
    const handleWheel = (event) => {
        event.preventDefault();
        // Ajusta el factor de multiplicación según sea necesario
        const newVelocity = velocity + event.deltaY * 0.12;
        setVelocity(newVelocity);
    };

    useEffect(() => {
        const wheel = wheelRef.current;
        // @ts-ignore
        wheel.addEventListener('wheel', handleWheel);

        return () => {
            // @ts-ignore
            wheel.removeEventListener('wheel', handleWheel);
        };
    }, [velocity]);

    useAnimationFrame((time, delta) => {
        if (Math.abs(velocity) < 0.1) {
            setVelocity(0);
            return;
        }
        const newRotation = rotation + velocity * (delta / 750); // Ajuste de delta para 60 FPS (1000ms / 60 = 16.67ms)
        setRotation(newRotation);
        setVelocity(prev => prev * 0.96); // Reducir la velocidad gradualmente para simular inercia
    });

    useEffect(() => {
        if (wheelRef.current) {
            // @ts-ignore
            wheelRef.current.style.transform = `rotate(${rotation}deg)`;
        }
    }, [rotation]);

    return (
        <div className="container-colour-picked-wheel flex justify-center">
            <motion.div
                className="colour-picked-wheel rounded-full"
                ref={wheelRef}
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <div className="label label--1">red</div>
                <div className="label label--2">orange red</div>
                <div className="label label--3">orange yellow</div>
                <div className="label label--4">yellowy green</div>
                <div className="label label--5">aquamarine</div>
                <div className="label label--6">royal blue</div>
                <div className="label label--7">medium purple</div>
            </motion.div>
        </div>
    )
}