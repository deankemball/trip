import React, { useEffect, useState } from 'react';

interface TouchProps {
    x: number,
    y:number,
    isEnded:boolean,
    onExitAnimationEnd: any
}

function Touch({
    x,
    y,
    isEnded = false,
    onExitAnimationEnd
}: TouchProps) {
    const initialClassName = isEnded ? 'touch' : 'touch touch-start';
    const [className, setClassName] = useState(initialClassName);
    const style = { top: y, left: x };

    useEffect(() => {
        let handle: number;
        if (className === 'touch touch-start') {
            handle = requestAnimationFrame(() => setClassName('touch'));
        } else if (className === 'touch' && isEnded) {
            handle = requestAnimationFrame(() => setClassName('touch touch-end'));
        }
        return () => cancelAnimationFrame(handle);
    });

    function onTransitionEnd(event: any) {
        if (className === 'touch touch-end') onExitAnimationEnd();
    }

    return (
        <div
            className={className}
            style={style}
            onTransitionEnd={onTransitionEnd}
        >
        </div>
    );
}

interface TouchPadProps {
    children: any
}

function TouchPad({ children }: TouchPadProps) {

    const [touches, setTouches] = useState<any[]>([]);
    
    useEffect(() => {
        console.log(touches)
    }, [touches]);

    function onTouchStart(changedTouches: { identifier: number, pageX?: number, pageY?: number }[]) {
        console.log(changedTouches)
        const newTouches = [];
        for (let i = 0; i < changedTouches.length; i++) {
            const { identifier, pageX, pageY } = changedTouches[i];
            newTouches.push({
                id: identifier,
                x: pageX,
                y: pageY,
                isEnded: false,
            });
        }
        setTouches([...touches, ...newTouches]);
    }

    function onTouchEnd( changedTouches: { identifier: number, pageX?: number, pageY?: number }[] ) {
        const endedTouchIds: any[] = [];
        for (let i = 0; i < changedTouches.length; i++) {
            const { identifier } = changedTouches[i];
            endedTouchIds.push(identifier);
        }
        setTouches(touches.map((touch) => {
            if (endedTouchIds.includes(touch.id)) {
                return ({
                    ...touch,
                    id: null,
                    isEnded: true,
                });
            }
            return touch;
        }));
    }

    function onMouseDown(event: { pageX: any; pageY: any; }) {
        const changedTouches = [{
            identifier: 0,
            pageX: event.pageX as number,
            pageY: event.pageY as number,
        }];
        onTouchStart( changedTouches );
    }

    function onMouseUp(event: any) {
        const changedTouches = [{
            identifier: 0,
        }];
        onTouchEnd( changedTouches );
    }

    function removeTouch(touch: never) {
        setTouches(touches.filter((t) => t !== touch));
    }

    return (
        <div
            className={'ripple-container'}
            //@ts-ignore
            onTouchStart={onTouchStart}
            //@ts-ignore¸
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {/* @ts-ignore */}
            {touches.map((touch, i) => <Touch {...touch} key={i} onExitAnimationEnd={() => removeTouch(touch)} />)}
            {children}
        </div>
    );
}

export default Touch;