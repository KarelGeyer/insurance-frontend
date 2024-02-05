import { Typography, Button, Box } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >
      <Typography variant="h6">
        Gratulace! Vaše objednávka byla úspěšně vytvořena. Měl by Vám přijít
        potvrzovací email.
      </Typography>
      <Typography variant="h6">
        Zakrátko budete přesměrováni zpět na stránku s objednávkami.
      </Typography>
      <Box sx={{ marginTop: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/orders")}
        >
          Go back
        </Button>
      </Box>
    </Box>
  );
};

export default Success;
