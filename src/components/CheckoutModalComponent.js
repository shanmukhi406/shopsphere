import React, { useState } from 'react';

const CheckoutModalComponent = ({ amount, onClose, onSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePay = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate network request
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 2500); // Auto close after 2.5 seconds
        }, 1500);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content checkout-modal">
                {!isSuccess && <button className="close-btn" onClick={onClose}>&times;</button>}
                
                {isSuccess ? (
                    <div className="success-state">
                        <div className="success-icon">✓</div>
                        <h2>Payment Successful!</h2>
                        <p>Your mock order was processed seamlessly.</p>
                        <p className="order-id">Order ID: #{Math.floor(Math.random() * 1000000)}</p>
                    </div>
                ) : (
                    <>
                        <h2>Complete Payment</h2>
                        <p className="payment-amount">Total: ₹{amount}</p>
                        
                        <form onSubmit={handlePay} className="payment-form">
                            <div className="form-group">
                                <label>Card Number</label>
                                <input 
                                    type="text" 
                                    maxLength="19" 
                                    placeholder="XXXX XXXX XXXX XXXX" 
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input 
                                        type="text" 
                                        maxLength="5" 
                                        placeholder="MM/YY" 
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input 
                                        type="password" 
                                        maxLength="3" 
                                        placeholder="123" 
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <button type="submit" className="pay-now-btn" disabled={isProcessing}>
                                {isProcessing ? 'Processing SECURELY...' : `Pay ₹${amount}`}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutModalComponent;
