import {useState} from 'react';
import {Bouquet} from "../utils/types";
import {addPosition, getPositionByBouquetId, removePosition} from "../utils/cartManager";

const useCart = (bouquet: Bouquet | null) => {
    const [isInBag, setIsInBag] = useState(bouquet ? getPositionByBouquetId(bouquet.id) != null : false);

    const handleAddToCart = () => {
        if (bouquet != null) {
            const newPosition = {
                bouquetId: bouquet.id,
                quantity: 1
            };
            setIsInBag(true);
            addPosition(newPosition);
        }
    };

    const handleRemoveFromCart = () => {
        if (bouquet != null) {
            setIsInBag(false);
            removePosition(bouquet.id);
        }
    };

    return {
        isInBag,
        handleAddToCart,
        handleRemoveFromCart
    };
};

export default useCart;