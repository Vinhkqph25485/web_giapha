import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://anticounterfeit.vn:8011/api/persons/family_tree/';

// Base API functions
const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const fetchProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createProduct = async (product: any) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

const patchProduct = async ({ id, field, value }: { id: number, field: string, value: any }) => {
  const response = await axios.patch(`${API_URL}/${id}`, { [field]: value });
  return response.data;
};

const removeProduct = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return { message: 'Product deleted successfully' };
};

// React Query hooks
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Only run the query if id exists
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate products query to refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: patchProduct,
    onSuccess: (_, variables) => {
      // Invalidate specific product query and products list
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      // Invalidate products query to refetch after deletion
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Export original functions for direct use if needed
export const apiService = {
  getProducts: fetchProducts,
  getProductById: fetchProductById,
  addProduct: createProduct,
  updateProduct: patchProduct,
  deleteProduct: removeProduct,
};
