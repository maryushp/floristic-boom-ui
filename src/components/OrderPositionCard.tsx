import React from 'react';
import {Image} from "react-bootstrap";
import {Bouquet} from "../utils/types";
import {Link} from "react-router-dom";

type OrderPositionProps = {
    bouquet: Bouquet
    quantity: number
}

const OrderPositionCard = (props: OrderPositionProps) => {
    const {bouquet, quantity} = props

    return (
        <Link to={`/flower/${bouquet.id}`}>
            <div className="border border-success border-2 d-flex flex-column align-items-center gap-2 rounded-4 p-4">
                <Image src={bouquet.imageUri} className="position-img"/>
                <h4 className="text-black text-center fw-bold text-capitalize">{bouquet.name}</h4>
                <h5 className="text-black text-center fw-bold">Amount: {quantity}</h5>
            </div>
        </Link>
    );
};

export default OrderPositionCard;