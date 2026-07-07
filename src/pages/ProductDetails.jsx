import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "./Product";
import "../css/ProductDetails.css";

function ProductDetails({ addToCart}) {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find((product) => product.id === Number(id));
    const [favourite, setFavourite] = useState(false);
    if (!product) {
        return (
            <div className="product-detail-message">
                <p className="eyebrow">Aisle empty</p>
                <h2>Product Not Found</h2>
                <Link className="back-link" to="/">Back to the floor</Link>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <div className="product-detail-image-wrap">
                <span className="stock-stamp">In Stock</span>
                <img className="product-detail-image" src={product.image} alt={product.title} />
            </div>
            <div className="product-detail-info">

                <p className="product-detail-category">{product.category}</p>
                <h1>{product.title}</h1>
                <button className="favourite-button" onClick={() => setFavourite(!favourite)} aria-label={favourite ? "Remove from favorites" : "Add to favorites"}>{favourite? "❤️" : "🤍"}</button>
                <div className="price-rating-row">
                    <p className="product-detail-price">Rs {product.price}</p>
                    <p className="product-detail-rating">★ {product.rating.rate} <span>({product.rating.count} reviews)</span></p>
                </div>
                <p className="product-detail-description">{product.description}</p>
                <div className="buttons-product">
                    <button className="add-cart-button"  onClick={() => addToCart(product)}>Add to cart</button>
                    <button
                        className="buy-now-button"
                        onClick={() => {
                            addToCart(product);
                            navigate("/cart");
                        }}
                    >
                        Buy Now
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ProductDetails;
 