import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { Invalidity } from "../../helpers/enums";
import { useDispatch } from "react-redux";
import { setProductsLifeInsuranceData } from "../../state/redux/reducers/productReducer";
import { ILifeInsuranceData } from "../../models/interfaces";

interface IProps {
  shouldSubmit: boolean;
}

const LifeInsuranceConfig = ({ shouldSubmit }: IProps) => {
  const dispatch = useDispatch();

  const [lifeInsuranceData, setLifeInsuranceData] =
    useState<ILifeInsuranceData>({
      death: 0,
      injuries: 0,
      diseases: 0,
      workIncapacity: 0,
      hospitalization: 0,
      hospitalizationLength: 0,
      invalidity: 0,
      invalidityLevel: Invalidity.NO_INVALIDITY,
      smoker: false,
      doesSport: false,
    });

  const updateLifeInsuranceData = (
    value: boolean | number | Invalidity,
    data: string
  ) => {
    setLifeInsuranceData({ ...lifeInsuranceData, [data]: value });
  };

  useLayoutEffect(() => {
    // useEffect způsobí, že input je na milivteřinu vykreslený špatně
    if (lifeInsuranceData.invalidity > 0) {
      if (lifeInsuranceData.invalidityLevel === Invalidity.NO_INVALIDITY)
        updateLifeInsuranceData(Invalidity.LEVEL_1, "invalidityLevel");
    } else {
      updateLifeInsuranceData(Invalidity.NO_INVALIDITY, "invalidityLevel");
    }
  }, [lifeInsuranceData.invalidity]);

  useEffect(() => {
    if (shouldSubmit) {
      dispatch(setProductsLifeInsuranceData(lifeInsuranceData));
    }
  }, [shouldSubmit]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Konfigurace produktu
      </Typography>

      <Box
        sx={{
          width: 600,
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Co chcete pokrýt?
        </Typography>
        <Box>
          <Box sx={{ display: "flex" }}>
            <FormGroup sx={{ m: 1 }}>
              <FormControl variant="outlined" sx={{ margin: "10px 0" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Pojištění smrti
                </InputLabel>
                <OutlinedInput
                  id="deatch-insurance-coverage"
                  type="number"
                  label="Pojištění smrti"
                  value={lifeInsuranceData.death}
                  onChange={(e) =>
                    updateLifeInsuranceData(parseInt(e.target.value), "death")
                  }
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ margin: "10px 0" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Pojištění úrazů
                </InputLabel>
                <OutlinedInput
                  id="injuries-insurance-coverage"
                  type="number"
                  label="Pojištění úrazů"
                  value={lifeInsuranceData.injuries}
                  onChange={(e) =>
                    updateLifeInsuranceData(
                      parseInt(e.target.value),
                      "injuries"
                    )
                  }
                />
              </FormControl>
            </FormGroup>

            <FormGroup sx={{ m: 1 }}>
              <FormControl variant="outlined" sx={{ margin: "10px 0" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Pojištění nemoci
                </InputLabel>
                <OutlinedInput
                  id="diseases-insurance-coverage"
                  type="number"
                  label="Pojištění nemoci"
                  value={lifeInsuranceData.diseases}
                  onChange={(e) =>
                    updateLifeInsuranceData(
                      parseInt(e.target.value),
                      "diseases"
                    )
                  }
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ margin: "10px 0" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Pojištění pracovní neschopnosti
                </InputLabel>
                <OutlinedInput
                  id="work-incapacity-insurance-coverage"
                  type="number"
                  label="Pojištění pracovní neschopnosti"
                  value={lifeInsuranceData.workIncapacity}
                  onChange={(e) =>
                    updateLifeInsuranceData(
                      parseInt(e.target.value),
                      "workIncapacity"
                    )
                  }
                />
              </FormControl>
            </FormGroup>

            <FormGroup sx={{ m: 1 }}>
              <FormControl variant="outlined" sx={{ margin: "10px 0" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Pojištění hospitalizace
                </InputLabel>
                <OutlinedInput
                  id="injuries-insurance-coverage"
                  type="number"
                  label="Pojištění hospitalizace"
                  value={lifeInsuranceData.hospitalization}
                  onChange={(e) =>
                    updateLifeInsuranceData(
                      parseInt(e.target.value),
                      "hospitalization"
                    )
                  }
                />
              </FormControl>

              <FormControl variant="outlined" sx={{ margin: "10px 0" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Pojištění Invalidity
                </InputLabel>
                <OutlinedInput
                  id="injuries-insurance-coverage"
                  type="number"
                  label="Pojištění Invalidity"
                  value={lifeInsuranceData.invalidity}
                  onChange={(e) =>
                    updateLifeInsuranceData(
                      parseInt(e.target.value),
                      "invalidity"
                    )
                  }
                />
              </FormControl>
            </FormGroup>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: 600,
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Dodatečné informace
        </Typography>
        <Box>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={lifeInsuranceData.smoker}
                      onChange={(e) =>
                        updateLifeInsuranceData(e.target.checked, "smoker")
                      }
                    />
                  }
                  label="Kuřák?"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={lifeInsuranceData.doesSport}
                      onChange={(e) =>
                        updateLifeInsuranceData(e.target.checked, "doesSport")
                      }
                    />
                  }
                  label="Sportovec?"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {lifeInsuranceData.invalidity > 0 && (
        <Box
          sx={{
            width: 600,
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Box sx={{ display: "flex" }}>
              <FormControl variant="standard">
                <InputLabel id="invalidity-level-input-label">
                  Stupeň invalidity
                </InputLabel>
                <Select
                  labelId="invalidity-level-input-label"
                  id="invalidity-level-input"
                  value={lifeInsuranceData.invalidityLevel}
                  label="Stupeň invalidity"
                  onChange={(e) => {
                    const { value } = (
                      e as unknown as React.ChangeEvent<HTMLInputElement>
                    ).target;
                    updateLifeInsuranceData(parseInt(value), "invalidityLevel");
                  }}
                >
                  {/* Ukazuje out-of-range warning (protože úvodní hodnota je 0)*/}
                  {/* pokud bude potřeba vyřešit, přidej navíc jeden menu item s hodnotou nula a pokud uživatel tento item vybere */}
                  {/* schovej tuto sekce a nastav checkbox invalidita na false */}
                  <MenuItem value={1}>Prvního stupně</MenuItem>
                  <MenuItem value={2}>Druhého stupně</MenuItem>
                  <MenuItem value={3}>Třetího stupně</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      )}

      {lifeInsuranceData.hospitalization > 0 && (
        <Box
          sx={{
            width: 600,
            m: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Box sx={{ display: "flex" }}>
              <FormControl variant="standard">
                <Typography variant="body2" gutterBottom>
                  Počet měsíců prac. neschopnosti
                </Typography>
                <Slider
                  aria-label="Always visible"
                  defaultValue={0}
                  valueLabelDisplay="on"
                  max={60}
                  min={0}
                  value={lifeInsuranceData.hospitalizationLength}
                  onChange={(e) => {
                    const { value } = (
                      e as unknown as React.ChangeEvent<HTMLInputElement>
                    ).target;
                    updateLifeInsuranceData(
                      parseInt(value),
                      "hospitalizationLength"
                    );
                  }}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LifeInsuranceConfig;
