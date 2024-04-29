import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import TouchPad from "./components/touch-pad";
import ColorPalette from "./components/color-palette";
import "./i18n";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import NameForm from "./components/name-form";
import QuitForm from "./components/quit-form";

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
        // ws.send(JSON.stringify({ listen: true, name, color: currColor }));
        return;
      }
      if (message.data === "touchStart") return;
      if (message.data === "touchEnd") return;
      if (message.data.includes("color")) return;
      if (message.data.includes("position")) return;
      if (message.data === "kicked") {
        resetEverything();
      }
    });

    ws.addEventListener("error", (error) => {
      console.error("websocket closed");
    });

    ws.addEventListener("close", (event) => {
      console.log("websocket closed");
    });
  }, []);

  const [currPosition, setCurrPosition] = useState({ x: 0, y: 0 });
  const [currColor, setCurrColor] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [nameEntered, setNameEntered] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    socket?.send(
      JSON.stringify({
        name: name,
        position: [currColor, currPosition],
      })
    );
  }, [currPosition]);

  useEffect(() => {
    if (currColor !== null) {
      socket?.send(
        JSON.stringify({
          color: currColor,
          id,
        })
      );
    }
  }, [currColor]);

  function submitJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameEntered(true);
    const id = crypto.randomUUID();
    setId(id);
    socket?.send(
      JSON.stringify({
        joined: name,
        id,
      })
    );
  }

  function submitQuit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCurrColor(0);
    socket?.send(
      JSON.stringify({
        quit: name,
        id,
      })
    );
    setNameEntered(false);
    setId("");
    setCurrColor(null);
    setName("");
  }

  function resetEverything() {
    setNameEntered(false);
    setName("");
    setCurrColor(null);
    setId("");
  }

  return (
    <div className="text-white bg-black h-[100dvh-48px] w-screen flex items-center justify-center p-6 overscroll-none flex-col md:flex-row gap-2">
      <div className="flex flex-col gap-2 w-full">
        {nameEntered ? (
          <QuitForm
            socket={socket}
            name={name}
            id={id}
            submitQuit={submitQuit}
          />
        ) : (
          <NameForm
            nameEntered={nameEntered}
            setNameEntered={setNameEntered}
            name={name}
            setName={setName}
            setId={setId}
            socket={socket}
            submitName={submitJoin}
          />
        )}
        <TouchPad
          currPosition={currPosition}
          setCurrPosition={setCurrPosition}
          socket={socket}
          nameEntered={nameEntered}
          currColor={currColor}
        />
      </div>
      <ColorPalette
        currColor={currColor}
        setCurrColor={setCurrColor}
        nameEntered={nameEntered}
      />
    </div>
  );
}

export default App;
