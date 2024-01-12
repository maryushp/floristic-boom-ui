import React from 'react';
import {Bouquet, Flower} from "../types";
import {Image} from "react-bootstrap";
import {Cart, PlusCircle} from "react-bootstrap-icons";

type FlowerCardProps = {
    flower: Flower
}

const FlowerCard = (props: FlowerCardProps) => {
    const {flower} = props
    return (
        <div className="card card-flower" style={{width:300}}>
            <Image src={flower.imageUri} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title fw-bold">{flower.name}</h5>
                <p className="card-text">{flower.description}</p>

                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-text pt-2 ">{flower.price}zł</h4>
                    <PlusCircle size={24} color="green"/>
                </div>
            </div>
        </div>)
};

export default FlowerCard;