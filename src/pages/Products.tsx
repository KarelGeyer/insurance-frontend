import { useEffect, useState } from "react";
import { IProduct } from "../models/interfaces";
import { Box } from "@mui/material";
import CustomAccordion from "../components/Accordion";
import { useSelector } from "react-redux";
import { RootState } from "../state/redux/store";
import AccordionTable from "../components/AccordionTable";
import { categoryIntToName, filterTypeToAttribute } from "../helpers/functions";
import { SortType } from "../helpers/enums";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../helpers/axios/products";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { productsView, productTypeView, sortType, filterType, searchValue } =
    useSelector((state: RootState) => state.appSettings);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProductsList(data);
        setProducts(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    // axios
    //   .get("https://localhost:7089/api/Products/GetProducts")
    //   .then((res) => {
    //     console.log(res.data.data);
    //     return res.data.data;
    //   })
    //   .then((data) => {
    //     setProductsList(data);
    //     setProducts(data);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const sortedProducts = productsList
      .filter((product) => {
        if (productTypeView === "Všechny produkty") return true;
        return categoryIntToName(product.category) === productTypeView;
      })
      .filter((product) => {
        if (searchValue === "") return true;
        return product.name.toLowerCase().includes(searchValue!.toLowerCase());
      })
      .sort((productA, productB) => {
        const attr = filterTypeToAttribute(filterType);
        if (typeof productA[attr] == "string") {
          if (sortType === SortType.ASC) {
            return (productA[attr] as string).localeCompare(productB.name);
          }
          return (productB[attr] as string).localeCompare(productA.name);
        } else {
          if (sortType === SortType.ASC) {
            return (productA[attr] as number) - (productB[attr] as number);
          }
          return (productB[attr] as number) - (productA[attr] as number);
        }
      });

    setProducts(sortedProducts);
  }, [productsView, productTypeView, sortType, filterType, searchValue]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          {productsView === "card" ? (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </Box>
          ) : (
            <AccordionTable>
              {products.map((product) => {
                return (
                  <CustomAccordion
                    key={product.id}
                    name={product.name}
                    companyName={product.companyName}
                    description={product.description}
                    category={product.category}
                  ></CustomAccordion>

                  // <div key={product.id}>test</div> // vyhodí error protože není typu CustomAccordion
                );
              })}
            </AccordionTable>
          )}
        </>
      )}
    </>
  );
};

export default Products;
