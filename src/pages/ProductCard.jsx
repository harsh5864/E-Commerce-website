import { Link } from "react-router-dom";

function ProductCard({ id, productname, price, image, rating, category, isFavorite, onToggleFavorite }){
    return(
        <Link to={`/product/${id}`} className="product-card">
            
            <button
                type="button"
                className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    onToggleFavorite(id);
                }}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {isFavorite ? '♥' : '♡'}
            </button>
            <div className="product-image-wrap">
                <img className="product-image" src={image} alt={productname} loading="lazy" />
            </div>
            <div className="product-card_details">
                <span className="product-category">{category}</span>
                <h3 className="product-name">{productname}</h3>
                <p className="product-rating">★ {rating.rate} <span>({rating.count})</span></p>
                <div className="product-card_footer">
                    <p className="product-price">Rs {price}</p>
                    <span className="view-details-button">View</span>
                </div>
            </div>
        </Link>
    );
}
export default ProductCard;
