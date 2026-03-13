import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({ baseURL: API_URL });

export const getProperties = (filters = {}) => {
  const params = {};
  if (filters.city) params.city = filters.city;
  if (filters.propertyType && filters.propertyType !== 'all') params.propertyType = filters.propertyType;
  if (filters.minSqft) params.minSqft = filters.minSqft;
  if (filters.maxSqft) params.maxSqft = filters.maxSqft;
  return api.get('/properties', { params });
};

export const createProperty = (formData) =>
  api.post('/properties', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const deleteProperty = (id) => api.delete(`/properties/${id}`);

export const submitContact = (data) => api.post('/contact', data);

export const login = (credentials) => api.post('/auth/login', credentials);
