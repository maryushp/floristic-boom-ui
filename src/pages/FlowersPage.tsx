import React, {useState} from 'react';
import {Color, Filter, Flower, Occasion} from "../utils/types";
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
import OccasionForm from "../components/filters/OccasionForm";
import PriceForm from "../components/filters/PriceForm";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import ColorSelect from "../components/filters/ColorForm";

const FlowersPage = () => {
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search);
    const color = queryParams.get("color");
    let [currentColor, setCurrentColor] = useState(color ? Color[color.toUpperCase() as keyof typeof Color] || Color.PINK : null);
    const priceMin = queryParams.get("priceMin");
    let [currentPriceMin, setCurrentPriceMin] = useState(priceMin ? parseFloat(priceMin) : null);
    const priceMax = queryParams.get("priceMax");
    let [currentPriceMax, setCurrentPriceMax] = useState(priceMax ? parseFloat(priceMax) : null);
    const occasion = queryParams.get("occasion");
    let [currentOccasion, setCurrentOccasion] = useState(occasion && priceMax == null && priceMin == null && color == null ? Occasion[occasion.toUpperCase() as keyof typeof Occasion] || Occasion.BIRTHDAY : null);

    const createFilter = () => {
        return {
            color: currentColor,
            occasion: currentOccasion,
            priceMax: currentPriceMax,
            priceMin: currentPriceMin,
        } as Filter
    }
    const {
        data,
        isLoading,
        totalPages,
        totalElems,
        currentPage,
        currentSize,
        error
    } = useDataHook({defaultSize: Math.floor((window.innerWidth) / 260) * 2, getFunction: readAllFlowers, filters: createFilter()});

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
    const handleInputChange = _.debounce((value: any, callback: React.Dispatch<React.SetStateAction<any>>) => {
        callback(value)
        setCurrentOccasion(null)
    }, 500, {trailing: false, leading: true})

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedColor: Color | null = event.target.value as Color | null;
        setCurrentColor(selectedColor);
        setCurrentOccasion(null);
    };

    const handleOccasionChange = (selectedOccasion: Occasion) => {
        setCurrentOccasion(selectedOccasion);
        setCurrentColor(null)
        setCurrentPriceMax(null)
        setCurrentPriceMin(null)
    }
    const handleSubmit = () => {
        if (currentColor) {
            queryParams.set("color", currentColor.toLowerCase())
        } else {
            queryParams.delete("color")
        }
        if (currentOccasion) {
            queryParams.set("occasion", currentOccasion.toLowerCase())
        } else {
            queryParams.delete("occasion")
        }
        if (currentPriceMin != null && currentPriceMin.toString() != '') {
            queryParams.set("priceMin", currentPriceMin.toString())
        } else {
            queryParams.delete("priceMin")
        }
        if (currentPriceMax != null && currentPriceMax.toString() != '') {
            queryParams.set("priceMax", currentPriceMax.toString())
        } else {
            queryParams.delete("priceMax")
        }


        const updatedUrl = `${queryParams.toString()}`;
        navigate(`?${updatedUrl}`, {replace: false});
    }
    const handleClear = () => {
        navigate('', {replace: false})
        setCurrentOccasion(null)
        setCurrentColor(null)
        setCurrentPriceMax(null)
        setCurrentPriceMin(null)
    }

    return (error ?
        <div className="align-self-center alert alert-info  align-self-start ">
            <h5>{error}</h5>
            <Button className="w-100 btn-info" onClick={handleClear}>Go Back</Button>
        </div> : isLoading ? <Loader/> :
            <>
                <div
                    className="w-100 align-self-start bg-white d-flex align-items-center justify-content-evenly p-2 shadow">

                    <OccasionForm currentOccasion={currentOccasion} handleOccasionChange={handleOccasionChange}/>
                    <ColorSelect color={currentColor} handleColorChange={handleColorChange}/>

                    <PriceForm currentPriceMin={currentPriceMin} currentPriceMax={currentPriceMax}
                               handleInputChange={handleInputChange} setCurrentPriceMin={setCurrentPriceMin}
                               setCurrentPriceMax={setCurrentPriceMax}/>
                    <div>
                        <Button className="btn-success" onClick={handleSubmit}>Submit</Button>
                        {queryParams.size > 0 && <Button className="btn-secondary" onClick={handleClear}>Clear</Button>}
                    </div>
                </div>
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
                </div>
            </>)
};

export default FlowersPage;