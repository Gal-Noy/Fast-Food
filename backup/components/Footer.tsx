import { Stack, Typography } from "@mui/material";

const Footer: React.FC<{ message?: string; variant?: "error" | "success" }> = ({ message, variant }) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "2rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        width: "100%",
        minHeight: "10vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: variant === "success" ? "green" : "red",
        }}
      >
        {message}
      </Typography>
    </Stack>
  );
};

export default Footer;
