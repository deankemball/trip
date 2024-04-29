import { Dispatch, SetStateAction } from "react";
import useWindowDimensions from "../hooks/use-window-dimensions";
import { useTranslation } from "react-i18next";

interface TouchPadProps {
  currPosition: { x: number; y: number };
  setCurrPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  socket: WebSocket | null;
  nameEntered: boolean;
  currColor: number | null;
}

const TouchPad = ({
  currPosition,
  setCurrPosition,
  socket,
  nameEntered,
  currColor,
}: TouchPadProps) => {
  const { height, width } = useWindowDimensions();

  function onTouchStart(event: any) {
    console.log("clicked");
    socket?.send("touchStart");
    setCurrPosition({
      x: event.touches[0].clientX / width,
      y: event.touches[0].clientY / height,
    });
  }
  function onTouchEnd(event: any) {
    socket?.send("touchEnd");
  }

  // function onTouchMove(event: any) {
  //   setCurrPosition({x: event.touches[0].clientX / width, y: event.touches[0].clientY / height})
  // }

  const { t } = useTranslation();

  return (
    <div
      className="bg-white/20 border-2 border-white rounded-md h-[calc(100dvh-208px)] md:h-[calc(100dvh-104px)] w-full flex flex-col justify-end items-center text-xl p-8 select-none z-50"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      // onTouchMove={onTouchMove}
    >
      {/* <p>{`x: ${currPosition.x }`}</p>
      <p>{`y: ${currPosition.y}`}</p> */}
      <p className="w-full leading-[24px] text-left">
        {t("instructions.touchpad.first")}
      </p>
      {nameEntered ? (
        <p className="w-full leading-[24px] text-left">
          {t("instructions.touchpad.second")}
        </p>
      ) : null}
      {currColor !== null ? (
        <p className="w-full leading-[24px] text-left">
          {t("instructions.touchpad.third")}
        </p>
      ) : null}
    </div>
  );
};

export default TouchPad;
