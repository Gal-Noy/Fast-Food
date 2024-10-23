import { Box, Divider, Stack } from "@mui/material";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import { IndicatorMode } from "../types";

const Game: React.FC<{
  incScore: () => void;
}> = ({ incScore }) => {
  const [gameMessage, setGameMessage] = useState<string>("");
  const [indicatorMode, setIndicatorMode] = useState<IndicatorMode>(IndicatorMode.Hidden);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  useEffect(() => {
    startNewRound();
  }, []);

  const clearPreviousTimeouts = () => {
    const id = setTimeout(() => {}, 0);
    for (let i = 0; i < id; i++) {
      clearTimeout(i);
    }
  };

  const startNewRound = () => {
    clearPreviousTimeouts();

    setIsWaiting(true);
    setIndicatorMode(IndicatorMode.Hidden);

    setTimeout(() => {
      setIsWaiting(false);
      setIndicatorMode(Math.random() > 0.5 ? IndicatorMode.Left : IndicatorMode.Right);

      setTimeout(() => {
        setIndicatorMode(IndicatorMode.Hidden);
        setGameMessage("Too Late");
        startNewRound();
      }, 1000);
    }, 2000 + Math.random() * 3000);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (isWaiting) {
      setGameMessage("Too Soon");
      return startNewRound();
    }
    const validKey = indicatorMode === IndicatorMode.Left ? "a" : "l";
    if (e.key === validKey) {
      setGameMessage("Success!");
      incScore();
    } else {
      setGameMessage("Wrong Key");
    }
    startNewRound();
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [indicatorMode, isWaiting]);

  return (
    <>
      <Stack
        sx={{
          flexDirection: "row",
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "2rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          width: "100%",
          height: "50vh",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "45%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {indicatorMode === IndicatorMode.Left && <h1>here</h1>}
        </Box>
        <Divider orientation="vertical" flexItem sx={{ borderWidth: "1.5px" }} />
        <Box
          sx={{
            height: "100%",
            width: "45%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {indicatorMode === IndicatorMode.Right && <h1>here</h1>}
        </Box>
      </Stack>
      <Footer message={gameMessage} variant={gameMessage === "Success!" ? "success" : "error"} />
    </>
  );
};

export default Game;
