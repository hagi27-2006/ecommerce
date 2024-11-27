import React, { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/clerk-react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (currentState === 'Login') {
        await signIn.create({
          identifier: email,
          password,
        });
      } else {
        await signUp.create({
          emailAddress: email,
          password,
          firstName: name,
        });
      }
    } catch (err) {
      setError(err.errors[0]?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      {/* Login/Register Form */}
      <form onSubmit={onSubmitHandler}>
        {currentState === 'Register' && (
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        )}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">{currentState}</button>
      </form>

      {error && <p>{error}</p>}

      <button onClick={() => setCurrentState(currentState === 'Login' ? 'Register' : 'Login')}>
        {currentState === 'Login' ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};
cors
export default Login;
