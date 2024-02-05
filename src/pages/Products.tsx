import { useEffect, useMemo, useState } from "react";
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
import Loading from "../components/Loading";

const Products = () => {
  // const [products, setProducts] = useState<IProduct[]>([])
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [number, setNumber] = useState<number>(0);

  const { productsView, productTypeView, sortType, filterType, searchValue } =
    useSelector((state: RootState) => state.appSettings);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProductsList(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    const filteredProducts = productsList
      .filter(
        (product) =>
          (productTypeView === "Všechny produkty" ||
            categoryIntToName(product.category) === productTypeView) &&
          (searchValue === "" ||
            product.name.toLowerCase().includes(searchValue!.toLowerCase()))
      )
      .sort((productA, productB) => {
        const attr = filterTypeToAttribute(filterType);
        const isAscending = sortType === SortType.ASC;
        if (typeof productA[attr] == "string") {
          return (
            isAscending
              ? (productA[attr] as string)
              : (productB[attr] as string)
          ).localeCompare(isAscending ? productB.name : productA.name);
        } else {
          return isAscending
            ? (productA[attr] as number) - (productB[attr] as number)
            : (productB[attr] as number) - (productA[attr] as number);
        }
      });

    for (let i = 0; i < 5000; i++) {
      console.log(i);
    }
    return filteredProducts;
  }, [
    productsList,
    productTypeView,
    sortType,
    filterType,
    searchValue,
    loading,
  ]);

  // useEffect(() => {
  //   const filteredProducts = productsList
  //     .filter(
  //       (product) =>
  //         (productTypeView === "Všechny produkty" ||
  //           categoryIntToName(product.category) === productTypeView) &&
  //         (searchValue === "" ||
  //           product.name.toLowerCase().includes(searchValue!.toLowerCase()))
  //     )
  //     .sort((productA, productB) => {
  //       const attr = filterTypeToAttribute(filterType);
  //       const isAscending = sortType === SortType.ASC;
  //       if (typeof productA[attr] == "string") {
  //         return (
  //           isAscending
  //             ? (productA[attr] as string)
  //             : (productB[attr] as string)
  //         ).localeCompare(isAscending ? productB.name : productA.name);
  //       } else {
  //         return isAscending
  //           ? (productA[attr] as number) - (productB[attr] as number)
  //           : (productB[attr] as number) - (productA[attr] as number);
  //       }
  //     });

  //   setProducts(filteredProducts);
  // }, [productsView, productTypeView, sortType, filterType, searchValue]);

  return (
    <>
      {loading ? (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Loading key={i} />
          ))}
        </>
      ) : (
        <>
          <button onClick={() => setNumber((prev) => prev + 1)}>click </button>
          <p>{number}</p>
          {productsView === "card" ? (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {filteredProducts.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </Box>
          ) : (
            <AccordionTable>
              {filteredProducts.map((product) => {
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
