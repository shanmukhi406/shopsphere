import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ setLoggedUser }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLoginView) {
            // Login Logic
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name }));
                setLoggedUser(user);
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } else {
            // Signup Logic
            if (password.length < 6) {
                setError('Password must be at least 6 characters.');
                return;
            }
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.email === email)) {
                setError('User already exists. Please login.');
                return;
            }
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({ email, name }));
            setLoggedUser(newUser);
            navigate('/');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isLoginView ? 'Login to your account' : 'Create an Account'}</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    
                    {!isLoginView && (
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                    </div>
                    
                    <button type="submit" className="action-button">
                        {isLoginView ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div className="toggle-text">
                    {isLoginView ? "Don't have an account? " : "Already have an account? "}
                    <span className="toggle-link" onClick={() => { setIsLoginView(!isLoginView); setError(''); }}>
                        {isLoginView ? 'Sign up here' : 'Login here'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
