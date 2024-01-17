import React, {useEffect, useState} from 'react';
import {Button, Input} from "reactstrap";
import "../../styles/css/Modal.css"
import {getCustomBouquet} from "../../utils/bouquetCreationManager";
import {Bouquet, BouquetCreationRequest, Color, FlowerBouquet, FlowerBouquetRequest} from "../../utils/types";
import FlowerBouquetCard from "../../components/FlowerBouquetCard";
import {FormSelect} from "react-bootstrap";
import _ from "lodash";
import {createBouquet} from "../../utils/bouquetUtils";
import {toast} from "react-toastify";
import {isAxiosError} from "axios";
import {addPosition} from "../../utils/cartManager";
import {
    AT_LEAST_ONE_FLOWER,
    AT_MOST_SIX_FLOWERS, BOUQUET_DESCRIPTION_10_255,
    BOUQUET_NAME_4_45,
    DESCRIPTION_REGEX,
    ITEM_NAME_REGEX
} from "../../utils/constants";

interface BouquetCreationModalProps {
    onSuccess: () => void;
}

const BouquetCreationModal = ({onSuccess}: BouquetCreationModalProps) => {
    const [flowers, setFlowers] = useState<FlowerBouquet[]>([])
    const [wrapperColor, setWrapperColor] = useState<Color>(Color.OLIVE)
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [description, setDescription] = useState('');
    const [validDescription, setValidDescription] = useState(false)
    const [error, setError] = useState("")
    const [isModified, setIsModified] = useState(false);
    const [success, setSuccess] = useState("")

    const handleInputChange = _.debounce((value: any, callback: React.Dispatch<React.SetStateAction<any>>) => {
        callback(value)
    }, 500, {trailing: false, leading: true})

    useEffect(() => {
        setValidName(ITEM_NAME_REGEX.test(name))
    }, [name]);
    useEffect(() => {
        setValidDescription(DESCRIPTION_REGEX.test(description))
    }, [description]);

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value as Color;
        setWrapperColor(selectedValue);
    };
    useEffect(() => {
        error &&
        toast.error(error, {style: {backgroundColor: "#114f02"}})
    }, [error]);
    const validate = () => {
        const errorList: string[] = []
        if (flowers.length < 1) {
            errorList.push(AT_LEAST_ONE_FLOWER)
        }
        if (flowers.length > 6) {
            errorList.push(AT_MOST_SIX_FLOWERS)
        }
        if (!validName) {
            errorList.push(BOUQUET_NAME_4_45)
        }
        if (!validDescription) {
            errorList.push(BOUQUET_DESCRIPTION_10_255)
        }
        if (errorList.length > 0) {
            errorList.map(message => toast.warning(message, {
                style: {
                    backgroundColor: '#114f02',
                }
            }))
            return false
        }
        return true
    }
    const submitForm = () => {
        const bouquet = getCustomBouquet()
        if (validate()) {
            const flowers: FlowerBouquetRequest[] = []
            bouquet.map(fl => flowers.push({
                flowerId: fl.flower.id,
                quantity: fl.quantity
            }))

            const bcr: BouquetCreationRequest = {
                name: name,
                description: description,
                wrapperColor: wrapperColor.toUpperCase(),
                positions: flowers
            }

            saveBouquet(bcr)
            onSuccess()
        }
    }

    const saveBouquet = async (bcr: BouquetCreationRequest) => {
        try {
            setError('');
            const result: Bouquet = await createBouquet(bcr);
            setSuccess(`Bouquet ${result.name} created!`)
            addPosition({bouquetId: result.id, quantity: 1})
        } catch (e) {
            if (isAxiosError(e) && e.response) setError(e.response.data.detail);
        }
    }

    useEffect(() => {
        setFlowers(getCustomBouquet())
    }, []);
    useEffect(() => {
        setFlowers(getCustomBouquet())
        setIsModified(false)
    }, [isModified]);
    const handleDelete = () => {
        setIsModified(true)
    };
    return (
        <>
            <div className="modal-overlay"/>
            <div className="modal-container w-50">

                <h3>Bouquet creation</h3>
                {success ? <div className="alert alert-success"><h4>{success}</h4></div> :

                    <div className="w-100 d-flex">
                        <div className="w-50">
                            {flowers?.map(bouquetPart => (
                                <FlowerBouquetCard onDelete={handleDelete} flowerBouquet={bouquetPart}
                                                   key={bouquetPart.flower.id}/>))}
                        </div>
                        <div className="w-50 d-flex justify-content-center">
                            <div className="p-3">
                                <h5> Wrapper Color</h5>
                                <FormSelect className="mt-3 text-center" size="sm" value={wrapperColor}
                                            onChange={handleColorChange} style={{
                                    backgroundColor: wrapperColor.toLowerCase(),
                                    color: (wrapperColor == Color.WHITE || wrapperColor == Color.YELLOW) ? "black" : "white"
                                }}>
                                    {Object.values(Color).map(color => (
                                        <option key={color} value={color}>
                                            {color}
                                        </option>
                                    ))}
                                </FormSelect>
                                <hr/>
                                <h5> Name</h5>
                                <Input
                                    id="nameInput"
                                    type="text"
                                    placeholder="Enter name"
                                    aria-label="Name"
                                    onChange={e => {
                                        handleInputChange(e.target.value, setName)
                                    }}/>
                                <hr/>
                                <h5> Description</h5>
                                <Input
                                    id="descriptionInput"
                                    type="text"
                                    placeholder="Enter description"
                                    aria-label="Description"
                                    onChange={e => {
                                        handleInputChange(e.target.value, setDescription)
                                    }}/>

                            </div>
                        </div>
                    </div>}
                <div className="d-flex flex-row flex-wrap justify-content-around w-100 pt-3">
                    <Button className="btn btn-danger" onClick={() => window.location.reload()}>Back</Button>
                    <Button className={`btn btn-success ${success && "d-none"}`}
                            onClick={submitForm}>Create</Button>
                </div>
            </div>
        </>
    );
};

export default BouquetCreationModal;