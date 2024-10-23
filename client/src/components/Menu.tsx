import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { StartGameRequest, User } from "../types";
import axios from "axios";

const Menu: React.FC<{
  setUsername: (username: string) => void;
  setScore: (score: number) => void;
}> = ({ setUsername, setScore }) => {
  const [input, setInput] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleStart = async () => {
    if (!input || isPending) return;

    setIsPending(true);

    const requestData: StartGameRequest = { username: input };
    await axios
      .post(`${import.meta.env.VITE_SERVER_URL}/start-game`, requestData)
      .then((response) => {
        const resUser: User = response.data;
        setUsername(resUser.username);
        setScore(resUser.score);
      })
      .catch((error) => {
        alert(error.response.data.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "2rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        width: "50%",
        gap: 2,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          USER:
        </Typography>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            width: "100%",
            "& input": {
              fontSize: "1.5rem",
              padding: "1rem",
              borderRadius: "10px",
            },
          }}
        />
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleStart}
        disabled={!input || isPending}
        sx={{
          width: "100%",
          padding: "1rem",
          fontSize: "1.5rem",
          borderRadius: "10px",
        }}
      >
        {isPending ? "LOADING..." : "ENTER"}
      </Button>
    </Stack>
  );
};

export default Menu;
