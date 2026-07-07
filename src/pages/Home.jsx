import { useEffect, useState } from 'react';
import products from './Product';
import '../css/Home.css'
import ProductCard from './ProductCard';

function Home({ searchQuery = "", favorites = [], onToggleFavorite }){
    const featuredProductIds = new Set(products.slice(0, 6).map((product) => product.id));
    const categories = ['for you', ...new Set(products.map((product) => product.category))];
    const [activeCategory, setActiveCategory] = useState(() => {
        const savedCategory = sessionStorage.getItem('home-active-category');
        return savedCategory || 'for you';
    });
    const normalizedSearch = searchQuery.trim().toLowerCase();

    useEffect(() => {
        sessionStorage.setItem('home-active-category', activeCategory);
    }, [activeCategory]);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory === 'for you'
            ? featuredProductIds.has(product.id)
            : product.category === activeCategory;
        const matchesSearch = normalizedSearch === '' || [product.title, product.category, product.description]
            .some((value) => value.toLowerCase().includes(normalizedSearch));

        return matchesCategory && matchesSearch;
    });
    
    return( 
        <div className="home-flex">

           <div className="category-section">
            <p className="eyebrow">Browse the floor</p>
            <h1 className="home-heading">Everything in one aisle</h1>
            <div className="categories-list">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-btn ${activeCategory === category ? 'category-btn-active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
           
            </div>
           </div>
            
      
        <div className="product-grid"> 
        {filteredProducts.length > 0 ? filteredProducts.map((product )=>(
           <ProductCard
           key={product.id}
           id={product.id}
           price={product.price}
           image={product.image}
           productname={product.title}
           category={product.category}
           description={product.description}
           rating={product.rating}
           isFavorite={favorites.includes(product.id)}
           onToggleFavorite={onToggleFavorite}
           />
        )) : <p className="no-products">No products found for your search.</p>}
            </div>
           </div>
      
    );
}

export default Home;
