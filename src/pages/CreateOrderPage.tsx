import React, {useEffect, useState} from "react";
import "../styles/css/CreateOrderPage.css"
import {Button} from "react-bootstrap";
import {Address, Bonus, BouquetWithQuantity, CartPosition, Delivery, DeliveryType, PaymentType} from "../utils/types";
import {getCookie} from "../utils/cookiesManager";
import {findBouquet} from "../utils/bouquetUtils";
import OrderPositionCard from "../components/OrderPositionCard";
import Loader from "../components/common/Loader";
import PaymentTypeCard from "../components/PaymentTypeCard";
import DeliveryTypeCard from "../components/DeliveryTypeCard";
import BonusComponent from "../components/BonusComponent";

const CreateOrderPage = () => {
    const [positions, setPositions] = useState<CartPosition[]>(getCookie('cart').positions)
    const [bouquetsWithQuantity, setBouquetsWithQuantity] = useState<BouquetWithQuantity[]>()
    const [price, setPrice] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    const [paymentType, setPaymentType] = useState<PaymentType>()
    const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType>()
    const [address, setAddress] = useState<Address>()

    const [bonus, setBonus] = useState<Bonus>()

    const [delivery, setDelivery] = useState<Delivery>()

    useEffect(() => {
        fetchBouquets();
        setIsLoading(false);
    }, []);

    const fetchBouquets = async () => {
        const bouquetPromises = positions.map(async (cartPosition) => {
            const bouquet = await findBouquet(cartPosition.bouquetId);
            return {
                bouquet,
                quantity: cartPosition.quantity
            };
        });
        const bouquetsData = await Promise.all(bouquetPromises);

        setBouquetsWithQuantity(bouquetsData);

        const sum = bouquetsData.reduce((acc, { bouquet, quantity }) => {
            return acc + bouquet.price * quantity;
        }, 0);

        setPrice(sum);
    };

    return (isLoading ? <Loader/> :
            <div className="order-page d-flex flex-column">
                <div className="d-flex flex-column align-items-center position-absolute confirmation-div">
                    {bonus ?
                        (<h2 className="text-success text-center fw-bold">
                            <del className="text-danger">
                                {selectedDeliveryType ? price + selectedDeliveryType.price : price} ZL
                            </del>
                            {' '}{selectedDeliveryType && ((price + selectedDeliveryType.price) * (1 - bonus.discount)).toFixed(2)} ZL
                        </h2>)
                        :
                        (<h2 className="text-success text-center fw-bold">{selectedDeliveryType ? price + selectedDeliveryType.price : price} ZL</h2>)
                    }
                    <Button variant="success" className="rounded-4 fw-bold px-4 py-2 fs-5">CONFIRM</Button>
                    {bonus ?
                        (<h2 className="text-success text-center fw-bold mt-3">Discount {bonus.discount * 100}%</h2>)
                        : (<></>)
                    }
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {bouquetsWithQuantity?.map((bouquetWithQuantity) => {
                        return <OrderPositionCard bouquet={bouquetWithQuantity.bouquet} quantity={bouquetWithQuantity.quantity}/>
                    })}
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-5 mt-5">
                    <DeliveryTypeCard setSelectedDeliveryType={setSelectedDeliveryType} setSelectedAddress={setAddress}/>
                    <PaymentTypeCard setPaymentType={setPaymentType}/>
                </div>
                <BonusComponent setBonus={setBonus}/>
            </div>
    )
};

export default CreateOrderPage;