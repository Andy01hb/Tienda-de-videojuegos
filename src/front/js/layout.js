import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { GameList } from "./pages/gamelist";
import { Demo } from "./pages/demo";
import GameDetails from "./pages/gamedetails";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import { Profile } from "./pages/profile";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import Wishlist from "./pages/wishlist";

import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
    return <BackendURL />;

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gamelist" element={<GameList />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/gamedetails/:theid" element={<GameDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
