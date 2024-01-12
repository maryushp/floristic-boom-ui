import React from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Route, Routes} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import Home from "./pages/Home";

function App() {
    return (
        <main>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route element={<CartPage/>} path={"/cart"}/>
                    <Route element={<CreateOrderPage/>} path={"/create-order"}/>
                </Routes>
            </main>
            <Footer/>
        </main>
    );
}

export default App;