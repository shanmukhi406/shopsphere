// src/utils/PaymentHandler.js

import axios from 'axios';

const handlePayment = async (totalAmount) => {
    try {
        // Call your backend API to create a payment order
        const response = await axios.post('http://localhost:5000/api/payment', {
            amount: totalAmount * 100, // Send amount in paise
        });

        // Check if the response contains the expected data
        if (!response.data || !response.data.id) {
            throw new Error('Invalid response from payment API');
        }

        const { id, currency, amount } = response.data;

        const options = {
            key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay Key ID
            amount: amount, // Razorpay expects amount in paise
            currency: currency,
            name: 'Your Company Name',
            description: 'Test Transaction',
            order_id: id,
            handler: function (response) {
                alert(`Payment successful: ${response.razorpay_payment_id}`);
                // Optionally, you can call an API to save the payment details
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#F37254',
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open(); // Open Razorpay modal
        rzp1.on('payment.failed', function (response) {
            alert(`Payment failed: ${response.error.description}`);
        });
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please check the console for details.');
    }
};

export default handlePayment;
