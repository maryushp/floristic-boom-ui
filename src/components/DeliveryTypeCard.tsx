import React, {ChangeEvent, useEffect, useState} from 'react';
import {Address, DeliveryType} from "../utils/types";
import Form from "react-bootstrap/Form";
import {readAllDeliveryTypes} from "../utils/deliveryUtils";
import Loader from "./common/Loader";
import {getUserFromStorage} from "../utils/userUtils";

type DeliveryTypeCardProps = {
    setSelectedDeliveryType: (deliveryType: DeliveryType) => void
    setSelectedAddress: (address: Address) => void
}

const DeliveryTypeCard = (props: DeliveryTypeCardProps) => {
    const {setSelectedDeliveryType, setSelectedAddress} = props
    const [isLoading, setIsLoading] = useState(true)
    const [deliveryTypes, setDeliveryTypes] = useState<DeliveryType[]>()
    const [deliveryType, setDeliveryType] = useState<DeliveryType>()
    const [addresses, setAddresses] = useState<Address[]>()

    useEffect(() => {
        setAddresses(getUserFromStorage()?.addresses)
        fetchDeliveryTypes();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        deliveryTypes?.map((deliveryType) => {
            if (deliveryType.name === "Courier") {
                setSelectedDeliveryType(deliveryType)
                setDeliveryType(deliveryType)
            }
        })
    }, [deliveryTypes]);

    useEffect(() => {
        if (addresses) {
            setSelectedAddress(addresses[0])
        }
    }, [addresses]);

    const fetchDeliveryTypes = async () =>  {
        const deliveryPromises = await readAllDeliveryTypes();
        setDeliveryTypes(deliveryPromises)
    }

    const handleDeliveryTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist()
        const id = event.target.value
        deliveryTypes?.map((deliveryType) => {
            if (deliveryType.id.toString() === id) {
                setSelectedDeliveryType(deliveryType)
                setDeliveryType(deliveryType)
            }
        })
    }

    const handleAddressChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedAddressId = parseInt(e.target.value)
        const selectedAddress = addresses?.find((address) => address.id === selectedAddressId)

        if (selectedAddress) {
            setSelectedAddress(selectedAddress)
        }
    };

    return ( isLoading ? <Loader/> :
            <div className="border border-success border-2 d-flex flex-column gap-3 rounded-4 p-4">
                <h4 className="text-center fw-bold text-capitalize">DELIVERY</h4>
                <Form className="fw-bold h5">
                    {deliveryTypes?.map((mappedDeliveryType) => {
                        return <Form.Check
                            className="mt-3"
                            type="radio"
                            label={`${mappedDeliveryType.name} ${mappedDeliveryType.price}zl`}
                            name="deliveryType"
                            id={mappedDeliveryType.id.toString()}
                            value={mappedDeliveryType.id}
                            checked={deliveryType == mappedDeliveryType}
                            onChange={handleDeliveryTypeChange}
                        />
                    })}
                </Form>
                {deliveryType?.name === "Courier" ?
                    (<Form.Select onChange={handleAddressChange} style={{fontWeight: "bold", fontSize: 20}}>
                        {addresses && addresses.map((address) => {
                            return <option
                                value={address.id.toString()}>{address.street} {address.house}
                            </option>
                        })}
                    </Form.Select>)
                    :
                    (<h4 className="fw-bold">Address: Flowery 31</h4>)
                }
            </div>
    );
};

export default DeliveryTypeCard;