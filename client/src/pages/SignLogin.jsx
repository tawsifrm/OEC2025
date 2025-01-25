import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseclient';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setSession(user);
    };

    checkUser();
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Error signing up:', error);
    } else {
      console.log('User signed up:', user);
      setIsLogin(true);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error signing in:', error);
    } else {
      console.log('User signed in:', user);
      setSession(user);
      navigate('/'); // Redirect to home page on successful login
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      setSession(null);
      console.log('User signed out');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={isLogin ? signIn : signUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>{isLogin ? 'Sign In' : 'Sign Up'}</button>
      </form>

      <p style={{ color: 'white' }}>
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button onClick={() => setIsLogin(false)} style={buttonStyle}>Sign Up</button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)} style={buttonStyle}>Login</button>
          </>
        )}
      </p>

      {session && (
        <div>
          <h3 style={{ color: 'white' }}>Welcome, {session.email}</h3>
          <button onClick={signOut} style={buttonStyle}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  backgroundColor: '#000', // Black background
  color: 'white', // White text
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '400px',
  margin: 'auto',
  textAlign: 'center',
  height: '100vh', // Full height to cover the body
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#444', // Dark grey background for input
  color: 'white', // White text for input
  boxSizing: 'border-box', // Ensure padding is included in width
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#813737', // Red color for buttons
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  width: '100%',
};

export default Auth;