import React from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Route, Routes} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CreateOrderPage from "./pages/CreateOrderPage";

function App() {
  return (
      <main>
          <Header/>
          <Routes>
              <Route element={<CartPage/>} path={"/cart"}/>
              <Route element={<CreateOrderPage/>} path={"/create-order"}/>
          </Routes>
          <Footer/>
      </main>
  );
}

export default App;