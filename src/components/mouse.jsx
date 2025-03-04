"use client"
import React from "react";
import { useEffect } from "react";
export default function Mouse(){
    useEffect(() => {
        const cursor = document.getElementById('cursor');
        const cursorTrail = document.getElementById('cursor-trail');
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px';
             
        });

        document.addEventListener('mousemove', (e) => {
            cursorTrail.style.top = e.clientY + 'px';
            cursorTrail.style.left = e.clientX + 'px';
        });

        
    }, []);
    return(
        <div className="mouse">
            <div id="cursor" className="cursor absolute z-50 w-5 h-5 bg-white rounded-full shadow-lg before:absolute before:inset-0 before:bg-black before:rounded-full before:opacity-50 before:blur-sm before:duration-300 before:transition-all before:scale-0 hover:before:scale-[1.2] hover:before:opacity-100 before:hover:scale-[1.4] before:hover:opacity-100">
                <div className="cursor-waves"></div>
                <div className="cursor-blobs"></div>
            </div>
            <div id="cursor-trail" className="absolute  w-8 h-8 px-6 py-6 bg-transparent border border-white rounded-full"></div>

        </div>
    )
}