import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createClient } from "@dojoengine/torii-client";

function App() {
  const [count, setCount] = useState(0);
  const [entities, setEntities] = useState();

  useEffect(() => {
    const doTorii = async () => {
      const torii = await createClient([], {
        rpcUrl: "http://localhost:5050",
        toriiUrl: "http://localhost:8080",
        relayUrl: "",
        worldAddress:
          "0x446f1f19ba951b59935df72974f8ba6060e5fbb411ca21d3e3e3812e3eb8df8",
      });

      torii.onEntityUpdated(
        ["0x54f58c4a92809851a5e76be80aeeb01a3cf35db8479d83468b4e7467703f666"],
        (entity) => {
          console.log(entity);
        }
      );

      const res = await torii.getEntities(10, 0);

      console.log("🚀 ~ file: App.tsx:30 ~ doTorii ~ res:", res);

      setEntities(res);
    };

    doTorii();
  }, [count]);

  if (!entities) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
