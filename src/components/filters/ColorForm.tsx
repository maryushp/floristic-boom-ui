import {Color} from "../../utils/types";
import React from "react";
import {FormSelect} from "react-bootstrap";

interface ColorSelectProps {
    color: Color | null;
    handleColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ColorSelect = ({color, handleColorChange}: ColorSelectProps) => {
    return (
        <div className="text-center">
            <h5>Color</h5>
            <FormSelect
                className="mt-3 text-center"
                size="sm"
                onChange={handleColorChange}
                value={color ? color : "default"}
                style={{
                    backgroundColor: color!=null? color.toLowerCase(): "lightyellow",
                    color: color==null ||color === Color.WHITE || color === Color.YELLOW ? "black" : "white"
                }}
            >
                <option disabled value={"default"}>Select Color</option>
                {Object.values(Color).map(color => (
                    <option key={color} value={color}>
                        {color}
                    </option>
                ))}
            </FormSelect>
        </div>
    );
};

export default ColorSelect;