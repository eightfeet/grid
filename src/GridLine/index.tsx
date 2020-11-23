import React, { Ref, useEffect, useRef } from 'react';
import s from './style.module.scss';

export default function GridLine() {
    const canvas = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvasWidth = document.body.clientWidth;
        const canvasHeight = document.body.clientHeight;
        const c: any = canvas.current;
        c.width = document.body.clientWidth;
        c.height = document.body.clientHeight;
        var ctx = c.getContext('2d');
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgb(190, 190, 190)`;
        for (let index = 0; index < canvasHeight; index+=20) {
            ctx.moveTo(0, index);
            ctx.lineTo(canvasWidth, index);
        }
        ctx.stroke();

        return () => {};
    }, []);

    return (
        <canvas className={s.canvas} ref={canvas}>
            Your browser does not support the canvas element.
        </canvas>
    );
}
