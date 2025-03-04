"use client"

import React from "react"

export default function Navbar(){
    return(
        <div id="navbar" className="hidden fixed  justify-between items-center md:flex   w-full px-6 py-6 backdrop-blur-sm z-50">
            <h1 className="text-2xl font-bold text-purple-500 float-left neon">Persuasivo</h1>
            <ul className="flex justify-center gap-8">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <button className="float-right inline-block px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300">Login</button>
        </div>
        
    )
}