import React from 'react';
import {Bouquet, Flower} from "../utils/types";
import {Image} from "react-bootstrap";
import {Bag, BagCheckFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import useCart from "../hooks/cartHook";

type BouquetCardProps = {
    bouquet: Bouquet
}

const BouquetCard = (props: BouquetCardProps) => {
    const {bouquet} = props
    const {isInBag, handleAddToCart, handleRemoveFromCart} = useCart(bouquet);
    return (
        <div className="card card-bouquet shadow" style={{width: 300}}>
            <Image src={bouquet.imageUri} className="card-img-top"/>
            <div className="card-body">
                <Link to={"/flower/" + bouquet.id} className="text-black">
                    <h5 className="card-title fw-bold">{bouquet.name}</h5>
                </Link>
                <p className="card-text">{bouquet.description}</p>
                <p className="card-text">
                    Flowers: {bouquet.flowers.map((flower: Flower) => {
                    return flower.name
                }).join(", ")}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-text pt-2 ">{bouquet.price}zł</h4>
                    {isInBag ?
                        <BagCheckFill size={24} onClick={handleRemoveFromCart}/>
                        :
                        <Bag size={24} onClick={handleAddToCart}/>}
                </div>
            </div>
        </div>)
};

export default BouquetCard;