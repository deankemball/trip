import { Dispatch, SetStateAction } from "react";
import useWindowDimensions from "../hooks/use-window-dimensions";
import { useTranslation } from "react-i18next";
import remap from "../utils/remap";
import useScreenOrientation from "../hooks/get-orientation";

interface TouchPadProps {
  currPosition: { x: number; y: number };
  setCurrPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  socket: WebSocket | null;
  nameEntered: boolean;
  currColor: number | null;
  firstTap: boolean;
}

const TouchPad = ({
  currPosition,
  setCurrPosition,
  socket,
  nameEntered,
  currColor,
  firstTap,
}: TouchPadProps) => {
  const { height, width } = useWindowDimensions();
  const isPortrait = useScreenOrientation();

  function onTouchStart(event: any) {
    socket?.send("touchStart");
    let x: number;
    let y: number;
    if (isPortrait) {
      x = remap(event.touches[0].clientX / width, 0.06, 0.94, 0, 1);
      y = remap(event.touches[0].clientY / height, 0.09, 0.853, 0, 1);
    } else {
      x = remap(event.touches[0].clientX / width, 0.028, 0.85, 0, 1);
      y = remap(event.touches[0].clientY / height, 0.2, 0.935, 0, 1);
    }
    setCurrPosition({
      x,
      y,
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
      onTouchStart={nameEntered && currColor ? onTouchStart : () => null}
      onTouchEnd={nameEntered && currColor ? onTouchEnd : () => null}
    >
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
      {firstTap ? (
        <p className="w-full leading-[24px] text-left">
          {t("instructions.touchpad.fourth")}
        </p>
      ) : null}
    </div>
  );
};

export default TouchPad;
