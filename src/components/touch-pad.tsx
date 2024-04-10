import { Dispatch, SetStateAction, useState } from 'react'
import useWindowDimensions from '../hooks/use-window-dimensions';
import { useTranslation } from 'react-i18next';

interface TouchPadProps {
  currPosition: {x: number, y: number}, 
  setCurrPosition: Dispatch<SetStateAction<{x: number, y: number}>>
  socket: WebSocket | null
}

const TouchPad = ({currPosition, setCurrPosition, socket}: TouchPadProps) => {
  const { height, width } = useWindowDimensions();
  

  function onTouchStart(event: any) {
    socket?.send("touchStart")
    setCurrPosition({x: event.touches[0].clientX / width, y: event.touches[0].clientY / height})
  }
  function onTouchEnd(event: any) {
    socket?.send("touchEnd")
  }

  // function onTouchMove(event: any) {
  //   setCurrPosition({x: event.touches[0].clientX / width, y: event.touches[0].clientY / height})
  // }

  const { t } = useTranslation();

  return (
    <div className='bg-white/20 border-2 border-white rounded-md h-[calc(100dvh-152px)] md:h-[calc(100dvh-48px)] w-full flex flex-col justify-center items-center text-xl p-8 select-none'
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    // onTouchMove={onTouchMove}
    >
      {/* <p>{`x: ${currPosition.x }`}</p>
      <p>{`y: ${currPosition.y}`}</p> */}
      <p className='w-56 leading-[24px] text-center'>{t("instructions.touchpad")}</p>
      </div>
  )
}

export default TouchPad