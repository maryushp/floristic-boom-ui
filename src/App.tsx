import React from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";


function App() {
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App;