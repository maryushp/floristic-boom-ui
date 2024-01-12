import React from 'react';
import {Bouquet, Flower} from "../types";
import {Image} from "react-bootstrap";
import {Cart} from "react-bootstrap-icons";

type BouquetCardProps = {
    bouquet: Bouquet
}

const BouquetCard = (props: BouquetCardProps) => {
    const {bouquet} = props
    return (
        <div className="card card-bouquet" style={{width:300}}>
            <Image src={bouquet.imageUri} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title fw-bold">{bouquet.name}</h5>
                <p className="card-text">{bouquet.description}</p>
            <p className="card-text">
                    Flowers: {bouquet.flowers.map((flower: Flower) => {
                    return flower.name
                }).join(", ") }</p>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-text pt-2 ">{bouquet.price}zł</h4>
                    <Cart size={24} color="green"/>
                </div>
            </div>
        </div>)
};

export default BouquetCard;