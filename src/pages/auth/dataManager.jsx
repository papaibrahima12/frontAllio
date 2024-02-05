// DataManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignIn from './sign-in';  // Assurez-vous que le chemin est correct
import SignUp from './sign-up';  // Assurez-vous que le chemin est correct
// import DataDisplay from './DataDisplay';  // Assurez-vous que le chemin est correct

const DataManager = () => {
  const apiUrl = 'http://54.158.173.253/';

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (credentials) => {
    try {
      const response = await axios.post(`${apiUrl}/signin`, credentials);
      const tokenFromResponse = response.data.token;
      setToken(tokenFromResponse);
      console.log('SignIn successful. Token:', tokenFromResponse);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignUp = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, userData);
      const tokenFromResponse = response.data.token;
      setToken(tokenFromResponse);
      console.log('SignUp successful. Token:', tokenFromResponse);
      fetchData();  // Mise à jour des données après l'inscription
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <SignIn onLogin={handleSignIn} />
      <SignUp onSignup={handleSignUp} />
      {/* <DataDisplay data={data} isLoading={isLoading} error={error} /> */}
    </div>
  );
};

export default DataManager;
