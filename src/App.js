import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {/* <Route exact path="/">
              <h1>Welcome to ProShop</h1>
              <HomeScreen />
            </Route> */}
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />

            <Route path="/cart/:id?" element={<CartScreen />} />

            <Route path="/login" element={<LoginScreen />} />

            <Route path="/register" element={<RegisterScreen />} />

            <Route path="/profile" element={<ProfileScreen />} />

            <Route path="/shipping" element={<ShippingScreen />} />

            <Route path="/payment" element={<PaymentScreen />} />

            <Route path="/placeorder" element={<PlaceOrderScreen />} />

            <Route path="/order/:id" element={<OrderScreen />} />
          </Routes>
          <Footer />
        </Container>
      </main>
    </>
  );
};

export default App;
