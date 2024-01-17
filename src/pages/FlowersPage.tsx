import React, {useState} from 'react';
import {Flower} from "../utils/types";
import FlowerCard from "../components/FlowerCard";
import Loader from "../components/common/Loader";
import PaginationList from "../components/common/PaginationList";
import {Button} from "reactstrap";
import useDataHook from "../hooks/dataHook";
import {readAllFlowers} from "../utils/flowerUtils";
import {cleanBouquet, getCustomBouquet, isCustomBouquetEmpty} from "../utils/bouquetCreationManager";
import {toast} from "react-toastify";
import BouquetCreationModal from "./modals/BouquetCreationModal";
import {CheckCircle, XCircle} from "react-bootstrap-icons";

const FlowersPage = () => {

    const {
        data,
        isLoading,
        totalPages,
        totalElems,
        currentPage,
        currentSize,
        error,
    } = useDataHook({defaultSize: Math.floor((window.innerWidth) / 260) * 2, getFunction: readAllFlowers});

    const [isBouquetCreationStarted, setIsBouquetCreationStarted] = useState(false)
    const [flowersNumber, setFlowersNumber] = useState(getCustomBouquet().length)
    const handleDecrementFlowers = () => {
        setFlowersNumber(flowersNumber - 1)
    }
    const handleIncrementFlowers = () => {
        setFlowersNumber(flowersNumber + 1)
    }
    const handleCreateBouquet = () => {
        if (!isCustomBouquetEmpty()) {
            setIsBouquetCreationStarted(true)
        } else {
            toast.error("Please, add at least one flower!",
                {
                    style: {
                        backgroundColor: '#114f02',
                    }
                }
            )
        }
    }
    const handleClearBouquet = () => {
        if (!isCustomBouquetEmpty()) {
            cleanBouquet()
        }
    }

    return (error ?
        <div className="align-self-center alert alert-info  align-self-start ">
            <h5>{error}</h5>
            <Button className="w-100 btn-info">Go Back</Button>
        </div> : isLoading ? <Loader/> :
            <div className="d-flex gap-4 flex-wrap p-5 justify-content-center">
                {data.map((flower: Flower) => (
                    <FlowerCard key={flower.id} flower={flower} onAdd={handleIncrementFlowers}
                                onDelete={handleDecrementFlowers}/>
                ))}
                <PaginationList totalElems={totalElems} totalPages={totalPages} currentPage={currentPage}
                                currentSize={currentSize}/>
                {flowersNumber > 0 &&
                    <>
                        <Button style={{position: "fixed", bottom: 20, right: 20}}
                                className="btn-danger" onClick={handleClearBouquet}>
                            <XCircle size={24}/>
                        </Button>
                        <Button style={{position: "fixed", bottom: 65, right: 20}}
                                className="btn-success" onClick={handleCreateBouquet}>
                            <CheckCircle size={24}/>
                        </Button>
                    </>}
                {isBouquetCreationStarted &&
                    <BouquetCreationModal onSuccess={handleClearBouquet}/>}
            </div>)
};

export default FlowersPage;