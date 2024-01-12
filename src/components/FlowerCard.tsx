import React from 'react';
import {Flower} from "../types";
import {Image} from "react-bootstrap";
import {PlusCircle} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import "../styles/css/Card.css"
type FlowerCardProps = {
    flower: Flower
}

const FlowerCard = (props: FlowerCardProps) => {
    const {flower} = props
    return (
        <div className="card card-flower shadow" style={{width: 300}}>

            <Image src={flower.imageUri} className="card-img-top"/>

            <div className="card-body">
                <Link to={"/flower/" + flower.id} className="text-black">
                    <h5 className="card-title fw-bold">{flower.name}</h5>
                    <p className="card-text">{flower.description}</p>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-text pt-2 ">{flower.price}zł</h4>
                    <PlusCircle size={24} color="green"/>
                </div>
            </div>

        </div>)
};

export default FlowerCard;