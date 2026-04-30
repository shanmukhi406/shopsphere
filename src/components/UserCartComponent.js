import React from 'react';

function UserCartComponent({
    cartCourses,
    deleteCourseFromCartFunction,
    totalAmountCalculationFunction,
    setCartCourses,
    handlePayment,
}) {
    return (
        <div className={`cart ${cartCourses.length > 0 ? 'active' : ''}`}>
            <h2>My Cart</h2>
            {cartCourses.length === 0 ? (
                <p className="empty-cart">Your cart is completely empty. Start shopping now!</p>
            ) : (
                <div className="cart-content">
                    <ul>
                        {cartCourses.map((item) => (
                            <li key={item.product.id} className="cart-item">
                                <div className="item-info">
                                    <div className="item-image">
                                        <img src={item.product.image} alt={item.product.name} />
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.product.name}</h3>
                                        <p>₹{item.product.price}</p>
                                    </div>
                                </div>
                                <div className="item-actions">
                                    <div className="quantity">
                                        <button onClick={() => {
                                            setCartCourses((prevCartCourses) => {
                                                return prevCartCourses.map(prevItem =>
                                                    prevItem.product.id === item.product.id
                                                        ? { ...prevItem, quantity: Math.max(item.quantity - 1, 0) }
                                                        : prevItem
                                                ).filter(i => i.quantity > 0);
                                            });
                                        }}>-</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => {
                                            setCartCourses((prevCartCourses) => {
                                                return prevCartCourses.map(prevItem =>
                                                    prevItem.product.id === item.product.id
                                                        ? { ...prevItem, quantity: item.quantity + 1 }
                                                        : prevItem
                                                );
                                            });
                                        }}>+</button>
                                    </div>
                                    <button
                                        className="remove-button"
                                        onClick={() => deleteCourseFromCartFunction(item.product)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="checkout-section">
                        <div className="checkout-total">
                            <span>Total</span>
                            <span style={{color: '#1dd1a1'}}>₹{totalAmountCalculationFunction()}</span>
                        </div>
                        <button
                            className="checkout-button"
                            onClick={handlePayment} 
                            disabled={cartCourses.length === 0 || totalAmountCalculationFunction() === 0}
                        >
                            Checkout & Pay
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserCartComponent;
