"use client"
import Sobreloja from "@/sobreloja/page"
import { useState } from "react"
export default function Login(){
   
    return(
        <>
        <div id="area">
        <div className="flex flex-col justify-between w-full h-screen bg-[#16161d] md:flex-row">
            <div className="flex flex-col px-40 items-center justify-center w-1/1 p-16 bg-[#16161d]">
                <p className="text-4xl font-bold text-white ">Login</p>
                <form className="flex flex-col mt-8 space-y-8 z-40 border border-purple-300 px-10 py-10 rounded">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-lg font-bold text-white ">E-mail</label>
                        <input type="email" id="email" className="bg-[#1e1e24] py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-lg font-bold text-white ">Senha</label>
                        <input type="password" id="password" className="bg-[#1e1e24] py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
                    </div>
                    <button type="submit" className="flex flex-row items-center justify-center px-2 py-2 text-white bg-purple-400 rounded-lg shadow-lg hover:shadow-xl neon">Entrar</button>
                </form>
            </div>
            <img src="/chip.jpg" className="w-1/2 h-full object-cover" alt="login" />
        </div>
        <ul className="circles z-10">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        </div>
        </>
    )
}