import { Box, Divider, Stack } from "@mui/material";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import { IndicatorMode } from "../types";

const Game: React.FC<{
  incScore: () => void;
}> = ({ incScore }) => {
  // Game message
  const [gameMessage, setGameMessage] = useState<string>("");

  // Indicator
  const [indicatorMode, setIndicatorMode] = useState<IndicatorMode>(IndicatorMode.Hidden);

  // Timer
  

 

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
