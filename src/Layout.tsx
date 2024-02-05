import Page from "./components/Page";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Error from "./pages/Error";

const Layout = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Page>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Page>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Layout;
