import React, {useState} from 'react';
import {Bouquet, Filter, Occasion, Size} from "../utils/types";
import BouquetCard from "../components/BouquetCard";
import Loader from "../components/common/Loader";
import PaginationList from "../components/common/PaginationList";
import {Button} from "reactstrap";
import {readAllBouquets} from "../utils/bouquetUtils";
import useDataHook from "../hooks/dataHook";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import SizeForm from "../components/filters/SizeForm";
import OccasionForm from "../components/filters/OccasionForm";
import PriceForm from "../components/filters/PriceForm";

const BouquetsPage = () => {
        const navigate = useNavigate()
        const queryParams = new URLSearchParams(window.location.search);
        const bouquetSize = queryParams.get("bouquet");
        let [currentBouquet, setCurrentBouquet] = useState(bouquetSize ? Size[bouquetSize.toUpperCase() as keyof typeof Size] || Size.SMALL : null);
        const priceMin = queryParams.get("priceMin");
        let [currentPriceMin, setCurrentPriceMin] = useState(priceMin ? parseFloat(priceMin) : null);
        const priceMax = queryParams.get("priceMax");
        let [currentPriceMax, setCurrentPriceMax] = useState(priceMax ? parseFloat(priceMax) : null);
        const occasion = queryParams.get("occasion");
        let [currentOccasion, setCurrentOccasion] = useState(occasion && priceMax == null && priceMin == null && bouquetSize == null ? Occasion[occasion.toUpperCase() as keyof typeof Occasion] || Occasion.BIRTHDAY : null);

        const createFilter = () => {
            return {
                color: null,
                occasion: currentOccasion,
                priceMax: currentPriceMax,
                priceMin: currentPriceMin,
                size: currentBouquet
            } as Filter
        }
        const {
            data,
            isLoading,
            totalPages,
            totalElems,
            currentPage,
            currentSize,
            error,
        } = useDataHook({defaultSize: Math.floor((window.innerWidth * 0.8) / 300) * 2, getFunction: readAllBouquets, filters: createFilter()});

        const handleInputChange = _.debounce((value: any, callback: React.Dispatch<React.SetStateAction<any>>) => {
            callback(value)
            setCurrentOccasion(null)
        }, 500, {trailing: false, leading: true})

        const handleSizeChange = (selectedSize: Size) => {
            setCurrentBouquet(selectedSize);
            setCurrentOccasion(null)
        }
        const handleOccasionChange = (selectedOccasion: Occasion) => {
            setCurrentOccasion(selectedOccasion);
            setCurrentBouquet(null)
            setCurrentPriceMax(null)
            setCurrentPriceMin(null)
        }
        const handleSubmit = () => {
            if (currentBouquet) {
                queryParams.set("bouquet", currentBouquet.toLowerCase())
            } else {
                queryParams.delete("bouquet")
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
            setCurrentBouquet(null)
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
                        <SizeForm currentBouquet={currentBouquet} handleSizeChange={handleSizeChange}/>

                        <PriceForm currentPriceMin={currentPriceMin} currentPriceMax={currentPriceMax}
                                   handleInputChange={handleInputChange} setCurrentPriceMin={setCurrentPriceMin}
                                   setCurrentPriceMax={setCurrentPriceMax}/>
                        <div>
                            <Button className="btn-success" onClick={handleSubmit}>Submit</Button>
                            {queryParams.size > 0 && <Button className="btn-secondary" onClick={handleClear}>Clear</Button>}
                        </div>
                    </div>
                    <div className="d-flex gap-4 flex-wrap p-5 justify-content-center  ">

                        {data.map((bouquet: Bouquet) => (
                            <BouquetCard key={bouquet.id} bouquet={bouquet}/>
                        ))}
                        <PaginationList totalElems={totalElems} totalPages={totalPages} currentPage={currentPage}
                                        currentSize={currentSize}/>
                    </div>
                </>)
    }
;

export default BouquetsPage;