import React, {useEffect, useState} from "react";
import "../styles/css/CartPage.css"
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BouquetWithQuantity, CartPosition} from "../utils/types";
import {getCookie} from "../utils/cookiesManager";
import Loader from "../components/common/Loader";
import CartPositionCard from "../components/CartPositionCard";
import {findBouquet} from "../utils/bouquetUtils";

const CartPage = () => {
    const [bouquetsWithQuantity, setBouquetsWithQuantity] = useState<BouquetWithQuantity[]>([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [price, setPrice] = useState(0)


    useEffect(() => {
        if (getCookie('cart')) {
            fetchData(getCookie('cart').positions);
        } else {
            setIsLoading(false)
        }
    }, []);

    useEffect(() => {
        if (isDeleting) {
            setIsLoading(true)
            if (getCookie('cart')) {
                fetchData(getCookie('cart').positions);
            } else {
                setIsLoading(false)
            }
            setIsDeleting(false)
        }
    }, [isDeleting]);

    const fetchData = async (positions: CartPosition[]) => {
        const bouquetPromises = positions.map(async (cartPosition) => {
            const bouquet = await findBouquet(cartPosition.bouquetId);
            return {
                bouquet,
                quantity: cartPosition.quantity
            };
        });

        const bouquetsData = await Promise.all(bouquetPromises);

        setBouquetsWithQuantity(bouquetsData);
        setIsLoading(false);

        const sum = bouquetsData.reduce((acc, { bouquet, quantity }) => {
            return acc + bouquet.price * quantity;
        }, 0);

        setPrice(sum);
    };

    return (
        isLoading ? <Loader/> :
            <div className="d-flex flex-column cart-page align-items-center">
                {bouquetsWithQuantity.length === 0 ?
                    (
                        <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                            <h4 className="text-center fw-bold">Your cart is empty!</h4>
                            <Link to={"/"}>
                                <Button variant="outline-success rounded-4 fw-bold">Go Shopping</Button>
                            </Link>
                        </div>)
                    :
                    (
                        <div className="d-flex flex-column align-items-center my-4 gap-2">
                            {bouquetsWithQuantity.map((bouquetWithQuantity) => {
                                return <CartPositionCard bouquetWithQuantity={bouquetWithQuantity} setIsDeleting={setIsDeleting} setPrice={setPrice} price={price}/>
                            })}
                            <div>
                                <h2 className="text-success text-center fw-bold">{price} ZL</h2>
                                <Link to={"/create-order"}>
                                    <Button variant="success" className="rounded-4 fw-bold my-2">CREATE ORDER</Button>
                                </Link>
                            </div>
                        </div>)
                }
            </div>
    )
};

export default CartPage;


