import axios from 'axios';

const API_URL = 'http://localhost:3001/products';

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const addProduct = async (product: any) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, field: string, value: any) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { [field]: value });
    return response.data;
  } catch (error) {
    console.error(`Error updating product field ${field} with id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};
