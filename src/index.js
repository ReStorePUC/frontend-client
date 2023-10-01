import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Home from "views/home/Home";
import Profile from "views/profile/Profile.js";
import Register from "views/register/Register.js";
import Store from "views/store/Store.js";
import Product from "views/product/Product.js";
import Search from "views/search/Search.js";
import Checkout from "views/checkout/Checkout";
import Confirm from "views/confirm/Confirm";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/perfil" exact element={<Profile />} />
      <Route path="/cadastrar" exact element={<Register />} />
      <Route path="/loja/:id" element={<Store />} />
      <Route path="/produto/:id" element={<Product />} />
      <Route path="/busca" exact element={<Search />} />
      <Route path="/checkout" exact element={<Checkout />} />
      <Route path="/confirm" exact element={<Confirm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
