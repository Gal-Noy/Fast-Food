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

  const waitingTimeourRef = useRef<any | null>(null);
  const indicatorTimeoutRef = useRef<any | null>(null);

  useEffect(() => {
    startNewRound();
  }, []);

  const clearPreviousTimeouts = () => {
    if (waitingTimeourRef.current) {
      clearTimeout(waitingTimeourRef.current);
      waitingTimeourRef.current = null;
    }
    if (indicatorTimeoutRef.current) {
      clearTimeout(indicatorTimeoutRef.current);
      indicatorTimeoutRef.current = null;
    }
  };

  const startNewRound = () => {
    clearPreviousTimeouts();

    setIsWaiting(true);
    setIndicatorMode(IndicatorMode.Hidden);

    waitingTimeourRef.current = setTimeout(() => {
      setIsWaiting(false);
      setIndicatorMode(Math.random() > 0.5 ? IndicatorMode.Left : IndicatorMode.Right);

      indicatorTimeoutRef.current = setTimeout(() => {
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

  const FoodArea = ({ matchingMode }: { matchingMode: IndicatorMode }) => {
    const getRandomFood = () =>
      ["donut", "french-fries", "hotdog", "ice-cream", "pizza", "kebab", "noodles"][Math.floor(Math.random() * 7)];

    return (
      <Box
        sx={{
          height: "100%",
          width: "45%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {indicatorMode === matchingMode && (
          <Box
            sx={{
              position: "absolute",
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={`${getRandomFood()}.png`}
              alt="food"
              style={{ height: "100px" }}
            />
          </Box>
        )}
      </Box>
    );
  };

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
          height: "40vh",
        }}
      >
        <FoodArea matchingMode={IndicatorMode.Left} />
        <Divider orientation="vertical" flexItem sx={{ borderWidth: "1.5px" }} />
        <FoodArea matchingMode={IndicatorMode.Right} />
      </Stack>
      <Footer message={gameMessage} variant={gameMessage === "Success!" ? "success" : "error"} />
    </>
  );
};

export default Game;
