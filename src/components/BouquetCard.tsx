import React from 'react';
import {Bouquet, FlowerBouquet} from "../utils/types";
import {Image} from "react-bootstrap";
import {Bag, BagCheckFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import useCart from "../hooks/cartHook";

type BouquetCardProps = {
    bouquet: Bouquet
}

const BouquetCard = ({bouquet}: BouquetCardProps) => {

    const {isInBag, handleAddToCart, handleRemoveFromCart} = useCart(bouquet);
    const getFlowersQuantity = () => {
        return bouquet.flowers.map((flowerBouquet: FlowerBouquet) => {
            return flowerBouquet.flower.name + " x" + flowerBouquet.quantity
        }).join(", ")
    }
    return (
        <div className="card card-bouquet shadow " style={{width: 300}}>
            <div style={{width: 300, height: 300}}>
                <Image src={bouquet.imageUri} className="card-img-top scaled-image"/>
            </div>
            <div className="card-body d-flex flex-column">
                <Link to={"/flower/" + bouquet.id} className="text-black">
                    <h5 className="card-title fw-bold">{bouquet.name}</h5>
                </Link>
                <p className="card-text">{bouquet.description}</p>
                <p className="card-text">
                    Flowers: {getFlowersQuantity()} </p>
            </div>
            <div className="d-flex justify-content-between align-items-center px-4 py-1">
                <h4 className="card-text pt-2 ">{bouquet.price}zł</h4>
                {isInBag ?
                    <BagCheckFill size={24} onClick={handleRemoveFromCart}/>
                    :
                    <Bag size={24} onClick={handleAddToCart}/>}
            </div>
        </div>)
};

export default BouquetCard;