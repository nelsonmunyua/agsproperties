import { useState, useEffect, useCallback } from 'react';
import api from '../../../services/agent';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProperties(100);
      const transformed = (data.properties || []).map((p) => ({
        ...p,
        location: p.location || 'Nairobi',
        status: p.listing_type,
        beds: p.bedrooms,
        baths: p.bathrooms,
        sqft: p.area_size,
      }));
      setProperties(transformed);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const createProperty = async (formData) => {
    const result = await api.createProperty(formData);
    await fetchProperties();
    return result;
  };

  const updateProperty = async (propertyId, formData) => {
    const result = await api.updateProperty(propertyId, formData);
    await fetchProperties();
    return result;
  };

  const deleteProperty = async (propertyId) => {
    const result = await api.deleteProperty(propertyId);
    await fetchProperties();
    return result;
  };

  const getProperty = useCallback(async (propertyId) => {
    return await api.getProperty(propertyId);
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    getProperty,
  };
};

export default useProperties;

