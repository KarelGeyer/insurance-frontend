import Typography from "@mui/material/Typography";

import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "800px",
        height: "300px",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "200px",
      }}
    >
      <Typography
        variant="h3"
        color="error"
        sx={{ width: 0.5, flexShrink: 0, fontWeight: 600, marginBottom: 2 }}
      >
        Něco se pokazilo
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "800px",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          color="error"
          sx={{ width: 0.5, flexShrink: 0, fontWeight: 600 }}
        >
          Moc se omlouváme, zkuste to prosím znovu.
        </Typography>
        <Typography variant="body2">
          Za 5 vteřin budete přesměrováni na hlavní stránku. Pokud ne tak
          klikněte na tlačítko níže.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: 0.5, flexShrink: 0, fontWeight: 600, marginTop: 2 }}
        onClick={() => navigate("/")}
      >
        Zpět na hlavní stránku
      </Button>
    </Box>
  );
};

export default Error;
