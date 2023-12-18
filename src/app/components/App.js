import axios from "axios";
import React, { useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

function App() {
  const [scrapedData, setData] = useState([]);
  const [newArray, setArray] = useState([]);
  const [ping, setPing] = useState([]);

  const Scene = () => {
    return (
      <OrbitControls
        enableRotate={true}
        enablePan={false}
        enableDamping={false}
        dampingFactor={0.1}
        rotateSpeed={0.0}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
      />
    );
  };

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/scrape/");
        if (!response || !response.data || !response.data[0]) {
          throw new Error("Invalid Response");
        }
        setData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    handleData();

    const arr = Array.from({ length: 28 }, () => ({
      top: Math.floor(Math.random() * window.innerWidth),
      left: Math.floor(Math.random() * window.innerHeight),
    }));

    setArray(arr);
  }, []); // Removed scrapedData and newArray dependencies from useEffect

  useEffect(() => {
    setPing(
      scrapedData.map((item, index) => ({
        item,
        ...newArray[index],
      }))
    );
  }, [scrapedData, newArray]);

  //   console.log(ping);

  return (
    <div
      style={{
        postion: "relative",
        width: "200vw",
        height: "230vh",
        backgroundColor: "pink",
      }}
    >
      {ping.map((item, index) => (
        <div
          style={{
            position: "absolute",
            top: item.top,
            left: item.left,
          }}
        >
          <h1>{item.item}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
