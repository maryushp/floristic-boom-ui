import React, {ChangeEvent, useState} from 'react';
import Form from "react-bootstrap/Form";
import {PaymentType} from "../utils/types";

type PaymentTypeCardProps = {
    setPaymentType: (paymentType: PaymentType) => void
}

const PaymentTypeCard = (props: PaymentTypeCardProps) => {
    const {setPaymentType} = props
    const [paymentType, changePaymentType] = useState<PaymentType>(PaymentType.ONLINE)

    const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist()
        setPaymentType(event.target.value as PaymentType)
        changePaymentType(event.target.value as PaymentType)
    }

    return (
        <div className="border border-success border-2 d-flex flex-column gap-3 rounded-4 p-4">
            <h4 className="text-center fw-bold text-capitalize">PAYMENT</h4>
            <Form className="fw-bold h5">
                <Form.Check
                    className="mt-3"
                    type="radio"
                    label="Bank Transfer"
                    name="paymentMethod"
                    id="transfer"
                    value={PaymentType.TRANSFER}
                    checked={paymentType === PaymentType.TRANSFER}
                    onChange={handlePaymentChange}
                />
                <Form.Check
                    className="mt-3"
                    type="radio"
                    label="In the shop/To the courier"
                    name="paymentMethod"
                    id="offline"
                    value={PaymentType.OFFLINE}
                    checked={paymentType === PaymentType.OFFLINE}
                    onChange={handlePaymentChange}
                />
                <Form.Check
                    className="mt-3"
                    type="radio"
                    label="Online"
                    name="paymentMethod"
                    id="online"
                    value={PaymentType.ONLINE}
                    checked={paymentType === PaymentType.ONLINE}
                    onChange={handlePaymentChange}
                />
            </Form>
        </div>
    );
};

export default PaymentTypeCard;