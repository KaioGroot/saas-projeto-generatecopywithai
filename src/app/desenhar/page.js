'use client';
import React, { useEffect, useState } from 'react';

export default function Desenhar() {
    const [draw, setDraw] = useState(false);
    const [lines, setLines] = useState([]);
    //desenhar na tela com o canvas
    useEffect(() => {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();
    });

    useEffect(() => {
        //código para acionar o draw quando o mouse clicar
        document.addEventListener('mousedown', (e) => {
            setDraw(true);
            setLines([...lines, { x: e.clientX, y: e.clientY }]);
        });
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            setLines([...lines, { x: e.clientX, y: e.clientY }]);
        });
    });

    useEffect(() => {
        document.addEventListener('mouseup', () => {
            setDraw(false);
        });
    }, [draw]);

    const drawLine = (newLine) => {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.moveTo(lastLine.x, lastLine.y);
            ctx.lineTo(newLine.x, newLine.y);
            ctx.stroke();
        }
    };

    useEffect(() => {
        if (draw) {
            const handleMouseMove = (e) => {
                const newLine = { x: e.clientX, y: e.clientY };
                setLines([...lines, newLine]);
                drawLine(newLine);
            };
            document.addEventListener('mousemove', handleMouseMove);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, [draw, lines]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <canvas id="myCanvas" width={900} height="850"></canvas>
        </div>
    );
}
