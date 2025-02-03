import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { GameList } from "./pages/gamelist";
import { Demo } from "./pages/demo";
import { GameDetails } from "./pages/gamedetails";
import { Profile } from "./pages/profile";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
    return <BackendURL />;
  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<GameList />} path="/gamelist" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<GameDetails />} path="/gamedetails/:theid" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<Checkout />} path="/checkout" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
