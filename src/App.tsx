import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import TouchPad from "./components/touch-pad";
import ColorPalette from "./components/color-palette";
import "./i18n";
import { useTranslation } from "react-i18next";


function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_SOCKET_URL!!);
    setSocket(ws);
    ws.addEventListener("open", (event) => {
      console.log("websocket opened");
    });

    ws.addEventListener("message", (message) => {
      if (message.data === "ping") {
        ws.send("pong");
        return;
      }
      if(message.data === 'touchStart') return
      if(message.data === 'touchEnd') return
      if(message.data.includes('color')) return
      if(message.data.includes('position')) return
      // let data = JSON.parse(message.data);
      // if ("slider2" in data) {
      //   let val = data["slider2"];
      //   setSlider2(val * 100);
      // }
    });

    ws.addEventListener("error", (error) => {
      console.error("websocket closed");
    });

    ws.addEventListener("close", (event) => {
      console.log("websocket closed");
    });
  }, []);

  const [currPosition, setCurrPosition] = useState({x: 0, y: 0})
  const [currColor, setCurrColor] = useState(0)

  const { t } = useTranslation();

  useEffect(() => {
    socket?.send(JSON.stringify({
      position: [currColor, currPosition]
    }))
  }, [currPosition]);

  useEffect(() => {
    socket?.send(JSON.stringify({
      color: currColor
    }))
  }, [currColor]);

  return (
    <div className="text-white bg-black h-[100dvh-48px] w-screen flex items-center justify-center p-6 overscroll-none flex-col md:flex-row gap-2">
      {/* <h2>Slider to control TD</h2>
      <input
        type="range"
        id="toTD"
        onChange={(event) =>
          socket.send(
            JSON.stringify({
              slider1: event.target.value / 100,
            })
          )
        }
      />
      <h2>Slider controlled by TD</h2>
      <input readOnly type="range" id="fromTD" value={slider2} /> */}
    <TouchPad currPosition={currPosition} setCurrPosition={setCurrPosition} socket={socket} />
    <ColorPalette currColor={currColor} setCurrColor={setCurrColor} />
    </div>
  );
}

export default App;
