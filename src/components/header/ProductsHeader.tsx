import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";
import {
  setFilterType,
  setProductTypeView,
  setProductsView,
  setSearchValue,
  setSortType,
} from "../../state/redux/reducers/appSettingsReducer";
import { ProductFilterType, ProductTypeViewType } from "../../models/types";
import { SortType } from "../../helpers/enums";

import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const ProductsHeader = () => {
  const dispatch = useDispatch();

  const [searchInputValue, setSearchInputValue] = useState("");

  const { productTypeView, sortType, filterType } = useSelector(
    (state: RootState) => state.appSettings
  );

  const onProductViewSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) return dispatch(setProductsView("table"));
    return dispatch(setProductsView("card"));
  };

  const onProductTypeViewSelect = (
    e: SelectChangeEvent<ProductTypeViewType>
  ) => {
    dispatch(setProductTypeView(e.target.value as ProductTypeViewType));
  };

  const onFilterTypeSelect = (e: SelectChangeEvent<ProductFilterType>) => {
    dispatch(setFilterType(e.target.value as ProductFilterType));
  };

  const onProductSortClick = () => {
    dispatch(
      setSortType(sortType === SortType.ASC ? SortType.DESC : SortType.ASC)
    );
  };

  const onSearchButtonClick = () => {
    dispatch(setSearchValue(searchInputValue));
    setSearchInputValue("");
  };

  const onCancelSearchButtonClick = () => {
    dispatch(setSearchValue(""));
    setSearchInputValue("");
  };
  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 0.5, justifyContent: "center" }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px 2px 0",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <input
            className="search-input"
            placeholder="Hledej produkty dle názvu"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={onSearchButtonClick}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={onCancelSearchButtonClick}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      </Box>
      <FormControl sx={{ width: 200, margin: "0 8px 0 16px" }} size="small">
        <InputLabel id="demo-simple-select-label">Filtruj dle:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Typ produktu"
          value={filterType}
          onChange={onFilterTypeSelect}
        >
          <MenuItem value={"Název produktu"}>Názvu Produktu</MenuItem>
          <MenuItem value={"Název firmy"}>Názvu Firmy</MenuItem>
          <MenuItem value={"Typ pojištění"}>Typu pojištění</MenuItem>
        </Select>
      </FormControl>
      <IconButton
        aria-label="sort"
        size="medium"
        sx={{ margin: "0 16px 0 8px" }}
        onClick={onProductSortClick}
      >
        {sortType === SortType.ASC && <SouthIcon fontSize="inherit" />}
        {sortType === SortType.DESC && <NorthIcon fontSize="inherit" />}
      </IconButton>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ backgroundColor: "#000" }}
      />
      <FormControl sx={{ width: 200, margin: "0 16px" }} size="small">
        <InputLabel id="demo-simple-select-label">Typ produktu</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Typ produktu"
          value={productTypeView}
          onChange={onProductTypeViewSelect}
        >
          <MenuItem value={"Penzijní připojištění"}>
            Penzijní připojištění
          </MenuItem>
          <MenuItem value={"Životní pojištění"}>Životní pojištění</MenuItem>
          <MenuItem value={"Pojištění nemovitosti"}>
            Pojištění nemovitosti
          </MenuItem>
          <MenuItem value={"Všechny produkty"}>Všechny produkty</MenuItem>
        </Select>
      </FormControl>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ backgroundColor: "#000" }}
      />
      <FormControlLabel
        control={
          <Switch
            aria-label="product-view"
            onChange={onProductViewSwitch}
            sx={{ margin: "0 16px" }}
          />
        }
        label="Typ zobrazení"
      />
    </>
  );
};

export default ProductsHeader;
