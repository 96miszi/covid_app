import React from "react";
import "../css/ProductPanel.scss"
import Product from "../interfaces/Product"
import {fetchDataFromServer} from "../utils/ShopUtils";

interface ProductPanelProps {
    filteredProduct: string,

    addToBasket(product: string, price: number): void
}


export default class ProductPanel extends React.Component<ProductPanelProps, {}> {

    state = {
        products: [],
        filter: "",
        itemsAdded: false
    }

    constructor(props: ProductPanelProps) {
        super(props);
    }

    componentDidMount() {

        let productURI = "http://localhost:8080/product/all";
        fetchDataFromServer(productURI, (p: any) => {
            this.setState({products: p})
        }, {});
    }

    componentDidUpdate(prevProps: Readonly<ProductPanelProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.filteredProduct !== prevProps.filteredProduct) {
            let currFilter = this.props.filteredProduct;
            let productURI = currFilter === "" ? "http://localhost:8080/product/all" :
                "http://localhost:8080/product/category/" + currFilter;
            fetchDataFromServer(productURI, (p: any) => {
                this.setState({products: p})
            }, {});
        }
    }

    render() {
        return (

            <div className="shopProducts">
                {this.state.products.map((product: Product) => {
                    const imgURI = "http://localhost:8080/image/" + product.image.id;
                    let rec = 0;
                    return (
                        <section className="product-cell">
                            <div className="product">
                                <div className="product-image">
                                    <img className="prodImg" src={imgURI} alt="Logo"/>
                                </div>
                                <div className="product-info">
                                    <h1>{product.name}</h1>
                                    <p className="price">{product.price} zł</p>
                                    <p>
                                        {product.descr}
                                    </p>
                                    <p>
                                        <button onClick={() => {
                                            this.props.addToBasket(product.name, product.price)
                                        }}>
                                            Dodaj do koszyka
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>

        );
    }
}
