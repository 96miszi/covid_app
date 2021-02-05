import ProductInBasketCollection from "../interfaces/ProductInBasketCollection";

export enum BasketAction {
    ADD, REMOVE, SUB
}

export const getPrLstFromLocSt = () => {
    const lcStorProducts = localStorage.getItem("productsInBasket");
    if (lcStorProducts != null) {
        const productsInLocStr: ProductInBasketCollection = JSON.parse(lcStorProducts);
        return productsInLocStr.products;
    }
    return [];
}

export const updateBasket = (product: string, action: BasketAction, qty: number) => {
    const prLstFromLocSt = getPrLstFromLocSt();
    prLstFromLocSt.forEach((p) => {
        if (p.name === product) {
            switch (action) {
                case BasketAction.ADD:
                    p.qty = p.qty + qty;
                    break;
                case BasketAction.SUB:
                    p.qty = p.qty - qty;
                    break;
                case BasketAction.REMOVE:
                    p.qty = 0;
                    break;
            }
        }
    })
    const newProdInBasket = prLstFromLocSt.filter(p => p.qty > 0);
    const newBasket: ProductInBasketCollection = {products: newProdInBasket};
    localStorage.setItem("productsInBasket", JSON.stringify(newBasket));
    return newProdInBasket;
};
export const getTotalPrice = () => {
    if (getPrLstFromLocSt().length == 0) return 0;
    return getPrLstFromLocSt().map((p) => p.price * p.qty)
        .reduce((pn, cn) => pn + cn);
};

export const fetchDataFromServer = (url: string, callback: (p: any) => void, requestOption: object) => {

    fetch(url, requestOption)
        .then(res => res.json())
        .then((data) => {
            callback.call(0, data);
        })
        .catch(console.log)
};