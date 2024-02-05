import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { categoryIntToColor, categoryIntToName } from "../helpers/functions";
import { Box, Button, Chip, TextField } from "@mui/material";
import { EmptyFunction } from "../models/types";

interface IProps {
  isProduct?: boolean;
  id?: string;
  name?: string;
  companyName?: string;
  usersName?: string;
  yearlyPrice?: number;
  category?: number; // funguje i když není typu ProductCategory
  description?: string;
  date?: string;
  productId?: string;
  onButtonClick?: (id: string, email: string) => void | EmptyFunction;
}

const CustomAccordion = ({
  isProduct = true,
  id,
  name,
  companyName,
  usersName,
  yearlyPrice,
  category,
  description,
  date,
  productId,
  onButtonClick,
}: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  return (
    <Accordion
      expanded={open}
      onChange={() => setOpen(!open)}
      sx={{ width: "100%" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        {isProduct && (
          <Typography sx={{ width: 0.5, flexShrink: 0 }}>{name}</Typography>
        )}

        {companyName && (
          <Typography sx={{ width: 0.3, color: "text.secondary" }}>
            {companyName}
          </Typography>
        )}

        {usersName && (
          <Typography sx={{ width: 0.3, color: "text.secondary" }}>
            {usersName}
          </Typography>
        )}

        {id && (
          <Typography sx={{ width: 0.3, color: "text.secondary" }}>
            {id}
          </Typography>
        )}

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

        {date && (
          <Typography sx={{ width: 0.27, color: "text.secondary" }}>
            {date}
          </Typography>
        )}
      </AccordionSummary>

      <AccordionDetails>
        {isProduct ? (
          <>
            <Typography>{description}</Typography>
            <Button size="medium" variant="outlined" sx={{ marginTop: 2 }}>
              Objednat produkt
            </Button>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                padding: "24px 0",
                justifyContent: "space-between",
                width: "600px",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Jméno produktu</Typography>
              <Typography>{name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "24px 0",
                justifyContent: "space-between",
                width: "600px",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Cena za rok</Typography>
              <Typography>{yearlyPrice} Kč</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "24px 0",
                justifyContent: "space-between",
                width: "600px",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>ID produktu</Typography>
              <Typography>{productId}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "24px 0",
                justifyContent: "space-between",
                width: "500px",
              }}
            >
              <TextField
                type="email"
                placeholder="Zadejte email"
                label={"email"}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
              <Button
                size="medium"
                variant="contained"
                color="error"
                onClick={() =>
                  onButtonClick && onButtonClick(id as string, email)
                }
              >
                Zrušit objednávku
              </Button>
            </Box>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
