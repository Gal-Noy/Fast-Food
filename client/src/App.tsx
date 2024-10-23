import { Stack } from "@mui/system";
import { useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Game from "./components/Game";
import { SubmitScoreRequest, User } from "./types";
import axios from "axios";

function App() {
  const [username, setUsername] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const incScore = async () => {
    const requestData: SubmitScoreRequest = { username };
    await axios
      .post(`${import.meta.env.VITE_SERVER_URL}/inc-score`, requestData)
      .then((response) => {
        const resUser: User = response.data;
        setScore(resUser.score);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        sx={{
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            width: "80%",
            padding: "2rem",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Header username={username} score={score} />
          {username ? <Game incScore={incScore} /> : <Menu setUsername={setUsername} setScore={setScore} />}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
