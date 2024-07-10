'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

// Please use a folder for this entire wheel component
// Please put the CSS file in the same folder
import './Wheel.css';

// Please change the velocity of the wheel by the mouse wheel
const velocityForMouseWheel = 0.12;

// Please change the velocity of the wheel by the mouse down
const velocityForMouseDown = 2;

// You can change the inertia
const inertia = 0.96;

// You are able to use tailwind css in this component but css is needed to circle behavior
// Please chance size and colors in the CSS file

export const ContainerColorWeel = (): JSX.Element => {
    const wheelRef = useRef<HTMLDivElement>(null);

    // degrees to be rotated
    const [rotation, setRotation] = useState(0);

    // velocity of rotation
    const [velocity, setVelocity] = useState(0);

    // Controls if user is moving the wheel
    const isDragging = useRef(false);

    // Position of the mouse event
    const lastY = useRef(0);

    // Flag to track if an initial event has occurred
    const hasInitialEvent = useRef(false);


    const handleMouseWheel = (event: WheelEvent) => {
        event.preventDefault();
        // Change velocity by the user scroll (mouse wheel)
        const newVelocity = velocity + event.deltaY * velocityForMouseWheel;
        setVelocity(newVelocity);

        // Set the flag when an event occurs
        hasInitialEvent.current = true;
    };

    // Handle cursor events
    const handleMouseDown = (event: MouseEvent) => {
        isDragging.current = true;
        // Cursor movement
        lastY.current = event.clientY;

        // Set the flag when an event occurs
        hasInitialEvent.current = true;
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging.current) return;
        // Cursor movement
        const deltaY = event.clientY - lastY.current;
        lastY.current = event.clientY;
        const newVelocity = deltaY * velocityForMouseDown;

        // Change velocity by the user movement
        setVelocity(prev => prev + newVelocity);

        // Set the flag when an event occurs
        hasInitialEvent.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    // Handle touch events
    const handleTouchStart = (event: TouchEvent) => {
        isDragging.current = true;
        lastY.current = event.touches[0].clientY;

        // Set the flag when an event occurs
        hasInitialEvent.current = true;
    }

    const handleTouchMove = (event: TouchEvent) => {
        if (!isDragging.current) return;
        // Touch movement
        const deltaY = event.touches[0].clientY - lastY.current;
        lastY.current = event.touches[0].clientY;
        const newVelocity = deltaY * velocityForMouseDown;
        // Change velocity by the user movement
        setVelocity(prev => prev + newVelocity);

        // Set the flag when an event occurs
        hasInitialEvent.current = true;
    }

    const handleTouchEnd = () => {
        isDragging.current = false;
    }

    useEffect(() => {
        // Add event listeners for element
        const wheel = wheelRef.current;
        if (wheel) {
            wheel.addEventListener('wheel', handleMouseWheel);
            wheel.addEventListener('mousedown', handleMouseDown);
            wheel.addEventListener('touchstart', handleTouchStart);
        }
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            if (wheel) {
                wheel.removeEventListener('wheel', handleMouseWheel);
                wheel.removeEventListener('mousedown', handleMouseDown);
                wheel.removeEventListener('touchstart', handleTouchStart);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [velocity]);

    // Control animation behavior
    useAnimationFrame((time, delta) => {
        // Stops animation when velocity is too low
        if (!hasInitialEvent.current && Math.abs(velocity) < 0.1) {
            setVelocity(0);
            return;
        }

        // Calc for each frame of the animation
        const newRotation = rotation + velocity * (delta / 750);
        setRotation(newRotation);

        // Simulates inertia
        setVelocity(prev => prev * inertia);
    });

    useEffect(() => {
        // Change element rotation by degrees
        if (wheelRef.current) {
            wheelRef.current.style.transform = `rotate(${rotation}deg)`;
        }
    }, [rotation]);

    return (
        <div className="container-colour-picked-wheel flex justify-center">
            <motion.div
                className="colour-picked-wheel rounded-full"
                ref={wheelRef}>
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