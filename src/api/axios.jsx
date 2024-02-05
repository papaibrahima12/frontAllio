import axios from "axios";

const BASE_URL = "http://54.158.173.253";
const token = localStorage.getItem('jwt');

const config= {
    headers: { "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
 }
 
}

const myconfg= {
    headers: { 
    Authorization: `Bearer ${token}`
 }
}

export const signup = (data) => {
    return axios.post(`${BASE_URL}/api/auth/company/register`, data, {
        headers: { "Content-Type": "application/json" },
    })
}

export const login = (data) => {
    return axios.post(`${BASE_URL}/api/auth/company/login`, data, {
        headers: { "Content-Type": "application/json" },
    })
}
//LES BONS DE REDUCTION
export const addBon = (data) => {
    return axios.post(`${BASE_URL}/api/v1/company/bon/add`, data, {
        headers: { 
        Authorization: `Bearer ${token}`
     },
        
    })
}

export const getBon = () => {
    console.log("mon config", config)
    return axios.get(`${BASE_URL}/api/v1/company/bons/all`, config
      
        
    )
}
export const deletBon = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/company/bon/delete/${id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
  };

  export const updateBon = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/company/campagne/update/${id}`, myconfg);
        return response.data;
    } catch (error) {
        throw error;
    }
  };
// LES CAMPAGENS
export const addCamp = (data) => {
    return axios.post(`${BASE_URL}/api/v1/company/campagne/add`, data, {
        headers: { 
        Authorization: `Bearer ${token}`
     },
        
    })
}
export const getCamp = () => {
    console.log("mon config", config)
    return axios.get(`${BASE_URL}/api/v1/company/campagnes/all`,myconfg
      
        
    )
}
export const deletCamp = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/company/campagne/delete/${id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
  };

  export const updateCamp = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/company/campagne/update/${id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
  };


