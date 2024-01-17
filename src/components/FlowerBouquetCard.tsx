import React, {useEffect, useState} from 'react';
import {FlowerBouquet} from "../utils/types";
import {Image} from "react-bootstrap";
import "../styles/css/Card.css"
import {DashCircle, PlusCircle} from "react-bootstrap-icons";
import {removeBouquetFlower, updateBouquetFlowerQuantity} from "../utils/bouquetCreationManager";
import ConfirmationModal from "../pages/modals/ConfirmationModal";

type FlowerBouquetCardProps = {
    flowerBouquet: FlowerBouquet,
    onDelete: () => void;
}

const FlowerBouquetCard = ({flowerBouquet, onDelete}: FlowerBouquetCardProps) => {
    const flower = flowerBouquet.flower
    const [quantity, setQuantity] = useState(flowerBouquet.quantity)
    const [isDeleting, setIsDeleting] = useState(false)
    useEffect(() => {
        updateBouquetFlowerQuantity(flower.id, quantity)
    }, [quantity]);
    const handleIncrementQuantity = () => {
        setQuantity(quantity + 1)
    }
    const handleDecrementQuantity = () => {
        quantity - 1 < 1 ? setIsDeleting(true) : setQuantity(quantity - 1)
    }

    return (

        <div className="d-flex p-2 border border-1 w-100 rounded-3 align-items-center justify-content-around">
            <div style={{width: 80, height: 80}}>
                <Image src={flower.imageUri} className="card-img-top scaled-image"/>
            </div>

            <h4>{flower.description}</h4>
            <div className="w-25 d-flex align-items-center justify-content-around">
                <DashCircle size={20} onClick={handleDecrementQuantity}/>
                <div className="mt-2">
                    <h4>{quantity}</h4>
                </div>
                <PlusCircle size={20} onClick={handleIncrementQuantity}/>


            </div>
            {isDeleting && <ConfirmationModal closeModal={setIsDeleting} action={() => {
                removeBouquetFlower(flower.id);
                setIsDeleting(false)
                onDelete()
            }} text={`Deleting flower ${flower.name}`}/>}
        </div>)
};

export default FlowerBouquetCard;