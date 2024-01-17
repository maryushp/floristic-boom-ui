import {useState} from 'react';
import {Flower} from "../utils/types";
import {addBouquetFlower, getBouquetFlowerById, removeBouquetFlower} from "../utils/bouquetCreationManager";

const useBouquetManager = (flower: Flower | null) => {
    const [isInBouquet, setIsInBouquet] = useState(flower ? getBouquetFlowerById(flower.id) != null : false);

    const handleAddToBouquet = () => {
        if (flower != null) {
            const newBouquetFlower = {
                flower: flower,
                quantity: 1
            };
            setIsInBouquet(true);
            addBouquetFlower(newBouquetFlower)
        }
    };

    const handleRemoveFromBouquet = () => {
        if (flower != null) {
            setIsInBouquet(false);
            removeBouquetFlower(flower.id);
        }
    };

    return {
        isInBouquet,
        handleAddToBouquet,
        handleRemoveFromBouquet
    };
};

export default useBouquetManager;