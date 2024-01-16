import React, {useEffect, useState} from 'react';
import {Bouquet, BouquetWithQuantity, CartPosition} from "../utils/types";
import {Link} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import {DashCircle, PlusCircle} from "react-bootstrap-icons";
import {getCookie, setCookie} from "../utils/cookiesManager";

type CartPositionProps = {
    bouquetWithQuantity: BouquetWithQuantity
    setIsDeleting: (value: boolean) => void
    setPrice: (value: number) => void
    price: number
}

const CartPositionCard = (props: CartPositionProps) => {
    const {bouquetWithQuantity, setIsDeleting, setPrice, price} = props
    const [bouquet, setBouquet] = useState<Bouquet>(bouquetWithQuantity.bouquet)
    const [quantity, setQuantity] = useState(bouquetWithQuantity.quantity)


    useEffect(() => {
        if (quantity === 0) {
            updatePositionQuantity(bouquet.id, quantity)
            setIsDeleting(true)
        } else {
            updatePositionQuantity(bouquet.id, quantity)
        }
    }, [quantity]);

    const updatePositionQuantity = (id: number, quantity: number) => {
        let positions: CartPosition[] = getCookie('cart').positions
        positions = positions.filter((position) => {
            if (position.bouquetId === id) {
                if (quantity === 0) {
                    return false;
                }
            }
            return true;
        });

        positions = positions.map((position) =>
            position.bouquetId === id ? {...position, quantity: quantity} : position
        );

        console.log(positions)
        setCartPositionsToCookies(positions);
    };

    const setCartPositionsToCookies = (positions: CartPosition[]) => {
        setCookie("cart", JSON.stringify({positions}));
    };

    if (!bouquet) {
        return <h4 className="text-black text-center fw-bold">Loading...</h4>;
    }

    return (
        <div className="border border-1 border-success d-flex flex-wrap p-3 col-12 mb-4 rounded-4 align-items-center">
            <div className="d-flex flex-column align-items-center col-3">
                <Link to={`/flower/${bouquet.id}`} className="d-flex flex-column align-items-center gap-3">
                    <Image
                        src={bouquet.imageUri}
                        className="position-img"/>
                    <h4 className="text-black fw-bold">{bouquet.name}</h4>
                </Link>
            </div>
            <div className="w-50 col-3">
                <h4 className="text-black text-center fw-bold my-4">{bouquet.description}</h4>
                <h4 className="text-black text-center fw-bold">{bouquet.price * quantity} ZL ({bouquet.price} ZL * {quantity})</h4>
            </div>
            <div className="align-self-center col-3 d-flex flex-wrap justify-content-center gap-5">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    <DashCircle
                        size={30}
                        className="icon-buttons text-dark"
                        onClick={
                        () => {
                            setPrice(price - bouquet.price)
                            setQuantity(quantity - 1)}}/>
                    <h3 className="text-black text-center fw-bold mx-4 mt-2">{quantity}</h3>
                    <PlusCircle
                        size={30}
                        className="icon-buttons text-dark"
                        onClick={() => {
                            setPrice(price + bouquet.price)
                            setQuantity(quantity + 1)
                        }}/>
                </div>
                <Button
                    variant="outline-danger"
                    className="rounded-4 fw-bold"
                    onClick={() => setQuantity(0)}>
                    DELETE
                </Button>
            </div>
        </div>

    )
};

export default CartPositionCard;