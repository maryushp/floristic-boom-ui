import React from 'react';
import {Flower} from "../utils/types";
import {Image} from "react-bootstrap";
import {PlusCircle, XCircleFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import "../styles/css/Card.css"
import useBouquetManager from "../hooks/customBouquetHook";

type FlowerCardProps = {
    flower: Flower,
    onAdd: () => void,
    onDelete: () => void
}

const FlowerCard = ({flower, onAdd, onDelete}: FlowerCardProps) => {
    const {
        isInBouquet,
        handleAddToBouquet,
        handleRemoveFromBouquet
    } = useBouquetManager(flower);

    return (
        <div className="card card-flower shadow " style={{width: 250}}>
            <div style={{width: 249, height: 300}}>
                <Image src={flower.imageUri} className="card-img-top scaled-image"/>
            </div>

            <div className="card-body">
                <Link to={"/flower/" + flower.id} className="text-black">
                    <h5 className="card-title fw-bold">{flower.name}</h5>
                    <p className="card-text">{flower.description}</p>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-text pt-2 ">{flower.price}zł</h4>
                    {isInBouquet ?
                        <XCircleFill size={24} onClick={() => {
                            handleRemoveFromBouquet();
                            onDelete()
                        }} color="red"/> :
                        <PlusCircle size={24} onClick={() => {
                            handleAddToBouquet();
                            onAdd()
                        }} color="green"/>
                    }
                </div>
            </div>
        </div>)
};

export default FlowerCard;