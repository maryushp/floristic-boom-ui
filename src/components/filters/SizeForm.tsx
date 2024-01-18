import React from 'react';
import Form from "react-bootstrap/Form";
import {Size} from "../../utils/types";

interface SizeFormProps {
    currentBouquet: Size | null,
    handleSizeChange: (size: Size) => void
}

const SizeForm = ({currentBouquet, handleSizeChange}: SizeFormProps) => {
    return (
        <Form className="size">
            <h5>Size</h5>
            <Form.Check
                className="mt-1"
                type="radio"
                label={Size.SMALL}
                id="small"
                name="size"
                value={Size.SMALL}
                checked={currentBouquet === Size.SMALL}
                onChange={() => handleSizeChange(Size.SMALL)}
            />
            <Form.Check
                className="mt-1"
                type="radio"
                label={Size.MEDIUM}
                id="medium"
                name="size"
                value={Size.MEDIUM}
                checked={currentBouquet === Size.MEDIUM}
                onChange={() => handleSizeChange(Size.MEDIUM)}
            />
            <Form.Check
                className="mt-1"
                type="radio"
                label={Size.BIG}
                id="big"
                name="size"
                value={Size.BIG}
                checked={currentBouquet === Size.BIG}
                onChange={() => handleSizeChange(Size.BIG)}
            />
        </Form>
    );
};

export default SizeForm;