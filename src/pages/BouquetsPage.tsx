import React from 'react';
import {Bouquet} from "../utils/types";
import BouquetCard from "../components/BouquetCard";
import Loader from "../components/common/Loader";
import PaginationList from "../components/common/PaginationList";
import {Button} from "reactstrap";
import {readAllBouquets} from "../utils/bouquetUtils";
import useDataHook from "../hooks/dataHook";

const BouquetsPage = () => {

    const {
        data,
        isLoading,
        totalPages,
        totalElems,
        currentPage,
        currentSize,
        error,
    } = useDataHook({defaultSize:Math.floor((window.innerWidth * 0.8) / 300) * 2,getFunction: readAllBouquets});

    return (error ?
        <div className="align-self-center alert alert-info  align-self-start ">
            <h5>{error}</h5>
            <Button className="w-100 btn-info">Go Back</Button>
        </div> : isLoading ? <Loader/> :
            <div className="d-flex gap-4 flex-wrap p-5 justify-content-center">
                {data.map((bouquet: Bouquet) => (
                    <BouquetCard key={bouquet.id} bouquet={bouquet}/>
                ))}
                <PaginationList totalElems={totalElems} totalPages={totalPages} currentPage={currentPage}
                                currentSize={currentSize}/>
            </div>)
};

export default BouquetsPage;