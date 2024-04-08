import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [socket, setSocket] = useState(null);
  const [slider2, setSlider2] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_SOCKET_URL);
    setSocket(ws);
    ws.addEventListener("open", (event) => {
      console.log("websocket opened");
    });

    ws.addEventListener("message", (message) => {
      if (message.data === "ping") {
        ws.send("pong");
        return;
      }
      let data = JSON.parse(message.data);
      if ("slider2" in data) {
        let val = data["slider2"];
        setSlider2(val * 100);
      }
    });

    ws.addEventListener("error", (error) => {
      console.error("websocket closed");
    });

    ws.addEventListener("close", (event) => {
      console.log("websocket closed");
    });
  }, []);

  return (
    <div className="App">
      <h2>Slider to control TD</h2>
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
      <input readOnly type="range" id="fromTD" value={slider2} />
    </div>
  );
}

export default App;
