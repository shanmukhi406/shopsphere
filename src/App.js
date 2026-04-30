import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import tshirtImage from './components/tshirt.jpg';
import Bag from './components/Bag.jpg';
import shoes from './components/shoes.jpg';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';
import LoginComponent from './components/LoginComponent';
import CheckoutModalComponent from './components/CheckoutModalComponent';

function App() {
    const [courses] = useState([
        { id: 1, name: 'Premium T-shirt', price: 499, image: tshirtImage, description: 'Comfortable premium cotton t-shirt.' },
        { id: 2, name: 'Travel Bag', price: 899, image: Bag, description: 'Spacious and durable travel backpack.' },
        { id: 3, name: 'Running Shoes', price: 1299, image: shoes, description: 'Performance running shoes with great grip.' }
    ]);
    
    const [cartCourses, setCartCourses] = useState(() => {
        const savedCart = localStorage.getItem('shopping_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [searchCourse, setSearchCourse] = useState("");
    
    const [loggedUser, setLoggedUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartCourses));
    }, [cartCourses]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setLoggedUser(null);
    };

    const totalAmountCalculationFunction = () => {
        return cartCourses.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const handlePayment = () => {
        const totalAmount = totalAmountCalculationFunction();
        if (totalAmount > 0) {
            setIsCheckoutOpen(true);
        }
    };

    const handleCheckoutSuccess = () => {
        setCartCourses([]);
        setIsCheckoutOpen(false);
    };

    const addCourseToCartFunction = (product) => {
        const itemExists = cartCourses.find(item => item.product.id === product.id);
        if (itemExists) {
            setCartCourses(cartCourses.map(item =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartCourses([...cartCourses, { product, quantity: 1 }]);
        }
    };

    const deleteCourseFromCartFunction = (product) => {
        setCartCourses(cartCourses.filter(item => item.product.id !== product.id));
    };

    const courseSearchUserFunction = (event) => setSearchCourse(event.target.value);

    const filterCourseFunction = courses.filter((course) =>
        course.name.toLowerCase().includes(searchCourse.toLowerCase())
    );

    return (
        <Router>
            <div className="App">
                <nav className="navbar">
                    <div className="nav-brand">
                        <Link to="/">🛍️ ShopSphere</Link>
                    </div>
                    <div className="nav-links">
                        {loggedUser && (
                            <div className="user-menu">
                                <span>Hello, {loggedUser.name}</span>
                                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </nav>
                <div className="main-content-wrapper">
                    <Routes>
                        <Route path="/login" element={
                            loggedUser ? <Navigate to="/" replace /> : <LoginComponent setLoggedUser={setLoggedUser} />
                        } />
                        <Route path="/" element={
                            loggedUser ? (
                                <>
                                    <SearchComponent
                                        searchCourse={searchCourse}
                                        courseSearchUserFunction={courseSearchUserFunction}
                                    />
                                    <main className={`App-main ${cartCourses.length === 0 ? 'empty-cart-layout' : ''}`}>
                                        <ShowCourseComponent
                                            courses={courses}
                                            filterCourseFunction={filterCourseFunction}
                                            addCourseToCartFunction={addCourseToCartFunction}
                                        />
                                        {cartCourses.length > 0 && (
                                            <UserCartComponent
                                                cartCourses={cartCourses}
                                                deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                                                totalAmountCalculationFunction={totalAmountCalculationFunction}
                                                setCartCourses={setCartCourses}
                                                handlePayment={handlePayment}
                                            />
                                        )}
                                    </main>
                                    {isCheckoutOpen && (
                                        <CheckoutModalComponent 
                                            amount={totalAmountCalculationFunction()} 
                                            onClose={() => setIsCheckoutOpen(false)}
                                            onSuccess={handleCheckoutSuccess}
                                        />
                                    )}
                                </>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
