import { Stack, Typography } from "@mui/material";
import theme from "../theme";

const Header: React.FC<{ username: string; score: number }> = ({ username, score }) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-evenly",
        padding: "2rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        {username ? username : "Catch The Star"}
      </Typography>
      {username && (
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: theme.palette.secondary.main,
          }}
        >
          Score: {score}
        </Typography>
      )}
    </Stack>
  );
};

export default Header;
