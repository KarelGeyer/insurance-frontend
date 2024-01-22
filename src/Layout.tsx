import Page from "./components/Page";
import Calculator from "./pages/Calculator";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Validator from "./helpers/Validator";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar";
import Product from "./pages/Product";
import Order from "./pages/Order";

const Layout = () => {
  const validator = new Validator();
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Page>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/calculator"
              element={<Calculator validator={validator} />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </Page>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Layout;
