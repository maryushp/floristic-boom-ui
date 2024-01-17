import {getCookie, setCookie} from "./cookiesManager";
import {FlowerBouquet} from "./types";

export const getCustomBouquet = (): FlowerBouquet[] => {
    const bouquet: FlowerBouquet[] = []
    const bouquetCookie = getCookie("customBouquet");
    if (bouquetCookie && Array.isArray(bouquetCookie.bouquet)) {
        bouquetCookie.bouquet.map((position: FlowerBouquet) => bouquet.push(position))
    }
    return bouquet;
};

export const setCustomBouquet = (bouquet: FlowerBouquet[]) => {
    setCookie("customBouquet", JSON.stringify({bouquet}), {maxAge: 24 * 60 * 60 * 7});
};

export const cleanBouquet = () => {
    setCustomBouquet([])
}
export const addBouquetFlower = (position: FlowerBouquet) => {
    const bouquet = getCustomBouquet();
    bouquet.push(position);
    setCustomBouquet(bouquet);
};

export const removeBouquetFlower = (id: number) => {
    let bouquet = getCustomBouquet();
    bouquet = bouquet.filter((position) => position.flower.id !== id);
    setCustomBouquet(bouquet);
};

export const updateBouquetFlowerQuantity = (id: number | undefined, quantity: number) => {
    let bouquet = getCustomBouquet();
    bouquet = bouquet.map((position) =>
        position.flower.id === id ? {...position, quantity: quantity} : position
    );
    setCustomBouquet(bouquet);
};

export const getBouquetFlowerById = (id: number): FlowerBouquet | undefined => {
    const bouquet = getCustomBouquet();
    return bouquet.find((position) => position.flower.id === id);
};
export const isCustomBouquetEmpty = () => {
    return getCustomBouquet().length == 0
}