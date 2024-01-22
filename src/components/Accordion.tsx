import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { categoryIntToColor, categoryIntToName } from "../helpers/functions";
import { Button, Chip } from "@mui/material";

interface IProps {
  isProduct?: boolean;
  name?: string;
  companyName?: string;
  category?: number; // funguje i když není typu ProductCategory
  description?: string;
}

const CustomAccordion = ({
  isProduct = true,
  name,
  companyName,
  category,
  description,
}: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Accordion
      expanded={open}
      onChange={() => setOpen(!open)}
      sx={{ width: "100%" }}
    >
      {isProduct && (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: 0.5, flexShrink: 0 }}>{name}</Typography>
          <Typography sx={{ width: 0.3, color: "text.secondary" }}>
            {companyName}
          </Typography>
          {/*funguje i když není typu ProductCategory */}
          <Chip
            label={categoryIntToName(category!)}
            sx={{
              width: 0.2,
              marginRight: 10,
              backgroundColor: categoryIntToColor(category!),
              color: "white",
              fontWeight: "bold",
            }}
          />
        </AccordionSummary>
      )}

      <AccordionDetails>
        {isProduct && (
          <>
            <Typography>{description}</Typography>
            <Button size="medium" variant="outlined" sx={{ marginTop: 2 }}>
              Objednat produkt
            </Button>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
