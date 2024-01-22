import { Box, Typography } from "@mui/material";
import { ReactElement, useEffect } from "react";
import CustomAccordion from "./Accordion";

interface IProps {
  children: ReactElement[];
}

const AccordionTable = ({ children }: IProps) => {
  const isValid = children[0].type === CustomAccordion;

  useEffect(() => {
    if (!isValid) {
      //   console.error(
      //     "AccordionTable component can only have CustomAccordion children"
      //   );
      throw new Error(
        "AccordionTable component can only have CustomAccordion children"
      );
    }
  });

  return (
    <Box sx={{ width: "100%" }}>
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
      {isValid && children}
    </Box>
  );
};

export default AccordionTable;
