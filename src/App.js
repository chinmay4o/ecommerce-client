import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
      
        <Container>
          <Switch>
            <Route exact path="/">
              <h1>Welcome to ProShop</h1>
              <HomeScreen />
            </Route>
            <Route path="/product/:id">
              <ProductScreen />
            </Route>

            <Route path="/cart/:id?">
              <CartScreen />
            </Route>

            <Route path="/login">
              <LoginScreen />
            </Route>

            <Route path="/register">
              <RegisterScreen />
            </Route>

            <Route path="/profile">
              <ProfileScreen />
            </Route>

            <Route path="/shipping">
              <ShippingScreen />
            </Route>

            <Route path="/payment">
              <PaymentScreen />
            </Route>

            <Route path="/placeorder">
              <PlaceOrderScreen />
            </Route>

            <Route path="/order/:id">
              <OrderScreen />
            </Route>
            
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
