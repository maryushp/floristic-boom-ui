import React from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import BouquetsPage from "./pages/BouquetsPage";
import FlowersPage from "./pages/FlowersPage";


function App() {
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route element={<CartPage/>} path={"/cart"}/>
                    <Route element={<CreateOrderPage/>} path={"/create-order"}/>
                    <Route path="/bouquets" element={<BouquetsPage/>}></Route>
                    <Route path="/flowers" element={<FlowersPage/>}></Route>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;