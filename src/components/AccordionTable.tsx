import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode | ReactNode[];
  type?: string;
}

const AccordionTable = ({ children, type = "product" }: IProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      {type === "product" ? (
        <Box sx={{ width: "95%", display: "flex", padding: "8px 16px" }}>
          <Typography sx={{ width: 0.5, flexShrink: 0, fontWeight: 600 }}>
            Název Produktu
          </Typography>
          <Typography sx={{ width: 0.3, flexShrink: 0, fontWeight: 600 }}>
            Název Firmy
          </Typography>
          <Typography sx={{ width: 0.27, flexShrink: 0, fontWeight: 600 }}>
            Typ pojištění
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "95%", display: "flex", padding: "8px 16px" }}>
          <Typography sx={{ width: 0.3, flexShrink: 0, fontWeight: 600 }}>
            Jméno zákazníka
          </Typography>
          <Typography sx={{ width: 0.25, flexShrink: 0, fontWeight: 600 }}>
            Id objednávky
          </Typography>
          <Typography sx={{ width: 0.25, flexShrink: 0, fontWeight: 600 }}>
            Kategorie
          </Typography>
          <Typography sx={{ width: 0.27, flexShrink: 0, fontWeight: 600 }}>
            Datum
          </Typography>
        </Box>
      )}

      {children}
    </Box>
  );
};

export default AccordionTable;
