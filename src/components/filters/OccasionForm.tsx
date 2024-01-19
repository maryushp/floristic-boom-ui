import {Occasion} from "../../utils/types";
import React from "react";
import Form from "react-bootstrap/Form";

interface OccasionFormProps {
    currentOccasion: Occasion|null;
    handleOccasionChange: (occasion: Occasion) => void;
}

const OccasionForm: React.FC<OccasionFormProps> = ({currentOccasion, handleOccasionChange}) => {
    return (
        <Form className="occasion px-3 border-end">
            <h5>Occasion</h5>
            {Object.values(Occasion).map((occasion) => (
                <Form.Check
                    key={occasion}
                    className="mt-1"
                    type="radio"
                    label={occasion}
                    id={occasion.toLowerCase()}
                    name="occasion"
                    value={occasion}
                    checked={currentOccasion === occasion}
                    onChange={() => handleOccasionChange(occasion)}
                />
            ))}
        </Form>
    );
};

export default OccasionForm;