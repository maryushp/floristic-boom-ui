import React from 'react';
import {Flower} from "../utils/types";
import FlowerCard from "../components/FlowerCard";
import Loader from "../components/common/Loader";
import PaginationList from "../components/common/PaginationList";
import {Button} from "reactstrap";
import useDataHook from "../hooks/dataHook";
import {readAllFlowers} from "../utils/flowerUtils";

const FlowersPage = () => {

    const {
        data,
        isLoading,
        totalPages,
        totalElems,
        currentPage,
        currentSize,
        error,
    } = useDataHook({getFunction: readAllFlowers});

    return (error ?
        <div className="align-self-center alert alert-info  align-self-start ">
            <h5>{error}</h5>
            <Button className="w-100 btn-info">Go Back</Button>
        </div> : isLoading ? <Loader/> :
            <div className="d-flex gap-4 flex-wrap p-5 justify-content-center">
                {data.map((flower: Flower) => (
                    <FlowerCard key={flower.id} flower={flower}/>
                ))}
                <PaginationList totalElems={totalElems} totalPages={totalPages} currentPage={currentPage}
                                currentSize={currentSize}/>
            </div>)
};

export default FlowersPage;