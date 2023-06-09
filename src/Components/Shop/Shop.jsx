import React, { useState } from 'react';
import { useEffect } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart =[]
        // step-1(for saved data from local storage)
        for (const id in storedCart) {
            //step -2 get the product by using id
            const addedProducts = products.find(product => product.id === id)
            if(addedProducts){
            //step-3 get quantity of the product
            const quantity = storedCart[id];
            addedProducts.quantity = quantity;
            //step-4 add the added product to the saved card
            savedCart.push(addedProducts);

        }
       
        }
        //step-5 set the cart
        setCart(savedCart);
    }, [products])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                ></Cart>
            </div>
        </div>
    );
};

export default Shop;