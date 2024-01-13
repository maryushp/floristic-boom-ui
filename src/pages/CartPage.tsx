import React, {useState} from "react";
import "../styles/css/CartPage.css"
import {Button, Image} from "react-bootstrap";
import {DashCircle, PlusCircle} from "react-bootstrap-icons";
import {Link, useNavigate} from "react-router-dom";

const CartPage = () => {
    const [bouquetsWithQuantity, setBouquetsWithQuantity] = useState([])
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()

    return (
        <div className="border-3 my-5 d-flex flex-column cart-page align-items-center">

            {bouquetsWithQuantity ?
                (
                    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                        <h4 className="text-center fw-bold">Your cart is empty!</h4>
                        <Button variant="outline-success rounded-4 fw-bold">Go Shopping</Button>
                    </div>)
                :
                (
                    <>
                        <div className="border border-2 border-success d-flex flex-wrap p-3 col-12 mb-4 rounded-4">
                            <div className="d-flex flex-column align-items-center col-3">
                                <Image src="logo_2.png" className="position-img"/>
                                <h4 className="text-black fw-bold">ROSES BOUQUET</h4>
                            </div>
                            <div className="w-50 col-3">
                                <h4 className="text-black text-center fw-bold my-4">Bouquet made from 101 roses. Roses are imported from Netherlands</h4>
                                <h4 className="text-black text-center fw-bold">120 ZL</h4>
                            </div>
                            <div className="align-self-center col-3 d-flex flex-wrap justify-content-center gap-5">
                                <div className="d-flex flex-wrap justify-content-center align-items-center">
                                    <DashCircle size={30} className="icon-buttons"/>
                                    <h3 className="text-black text-center fw-bold mx-4 mt-2">1</h3>
                                    <PlusCircle size={30} className="icon-buttons"/>
                                </div>
                                <Button variant="outline-danger" className="rounded-4 fw-bold">DELETE</Button>
                            </div>
                        </div>
                        <h2 className="text-success text-center fw-bold">240 ZL</h2>
                        <Link to={"/create-order"}>
                            <Button variant="success" className="rounded-4 fw-bold">CREATE ORDER</Button>
                        </Link>
                    </>)
            }

        </div>
    )
};

export default CartPage;


