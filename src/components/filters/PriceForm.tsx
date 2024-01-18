import React from "react";
import {Input} from "reactstrap";

interface PriceFormProps {
    currentPriceMin: number | null;
    currentPriceMax: number | null;
    handleInputChange: (value: string, setter: (price: number) => void) => void;
    setCurrentPriceMin: (price: number) => void;
    setCurrentPriceMax: (price: number) => void;
}

const PriceForm: React.FC<PriceFormProps> = ({currentPriceMin, currentPriceMax, handleInputChange, setCurrentPriceMin, setCurrentPriceMax}) => {
    return (
        <div className="price w-25 text-center">
            <h5>Price</h5>
            <div className="d-flex">
                <div className="d-flex justify-content-center">
                    <span className="input-group-text">From</span>
                    <Input
                        className="w-50"
                        type="number"
                        step={0.1}
                        min={0}
                        value={currentPriceMin ?? ''}
                        onChange={(e) => handleInputChange(e.target.value, setCurrentPriceMin)}
                    ></Input>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="input-group-prepend">
                        <span className="input-group-text">To</span>
                    </div>
                    <Input
                        className="w-50"
                        type="number"
                        step={0.1}
                        min={0}
                        value={currentPriceMax ?? ''}
                        onChange={(e) => handleInputChange(e.target.value, setCurrentPriceMax)}
                    ></Input>
                </div>
            </div>
        </div>
    );
};

export default PriceForm;
