import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie'; // Need to install this package

const API_URL = 'http://anticounterfeit.vn:8011/api/persons/family_tree/';
const AUTH_API_URL = 'http://anticounterfeit.vn:8011/api/account/';

// Helper function to get auth token from cookies
const getAuthToken = () => {
  return Cookies.get('accessToken');
};

// Helper function to create headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Authentication functions
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}login/jwt/`, {
      username,
      password
    });
    
    // Save token to cookies
    if (response.data && response.data.access) {
      Cookies.set('accessToken', response.data.access, { expires: 7 }); // expires in 7 days
      
      // Set token as default Authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      // Store user info if available
      if (response.data.user) {
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });
      } else {
        // If user info not included in response, try to get user info
        try {
          const userResponse = await axios.get(`${AUTH_API_URL}me/`, {
            headers: { Authorization: `Bearer ${response.data.access}` }
          });
          Cookies.set('user', JSON.stringify(userResponse.data), { expires: 7 });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  // Remove tokens and user data
  Cookies.remove('accessToken');
  Cookies.remove('user');
  delete axios.defaults.headers.common['Authorization'];
};

export const isAuthenticated = () => {
  const token = Cookies.get('accessToken');
  return !!token;
};

export const getCurrentUser = () => {
  const userString = Cookies.get('user');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Base API functions
const fetchProducts = async () => {
  const headers = getAuthHeaders();
  const response = await axios.get(API_URL, { headers });
  return response.data;
};

const fetchProductById = async (id: number) => {
  const headers = getAuthHeaders();
  const response = await axios.get(`${API_URL}/${id}`, { headers });
  return response.data;
};

const createProduct = async (product: any) => {
  const headers = getAuthHeaders();
  const response = await axios.post(API_URL, product, { headers });
  return response.data;
};

const patchProduct = async ({ id, field, value }: { id: number, field: string, value: any }) => {
  const headers = getAuthHeaders();
  const response = await axios.patch(`${API_URL}/${id}`, { [field]: value }, { headers });
  return response.data;
};

const removeProduct = async (id: number) => {
  const headers = getAuthHeaders();
  await axios.delete(`${API_URL}/${id}`, { headers });
  return { message: 'Product deleted successfully' };
};

// React Query hooks
export const useProducts = (searchParams?: Record<string, any>) => {
  return useQuery({
    queryKey: ['products', searchParams],
    queryFn: () => fetchProductsWithParams(searchParams),
  });
};

const fetchProductsWithParams = async (params?: Record<string, any>) => {
  const headers = getAuthHeaders();
  const response = await axios.get(API_URL, { params, headers });
  return response.data;
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

// News API endpoints
const NEWS_API_URL = 'http://anticounterfeit.vn:8011/api/news/';

// News API functions
const fetchNewsArticles = async (params?: Record<string, any>) => {
  const headers = getAuthHeaders();
  const response = await axios.get(`${NEWS_API_URL}articles/`, { params, headers });
  return response.data;
};

// New function to fetch paginated news articles
const fetchPaginatedNewsArticles = async (page: number = 1, pageSize: number = 10) => {
  const headers = getAuthHeaders();
  const response = await axios.get(`${NEWS_API_URL}articles/`, { 
    params: { 
      page, 
      page_size: pageSize 
    },
    headers
  });
  return response.data;
};

const fetchNewsArticleById = async (id: number) => {
  const headers = getAuthHeaders();
  const response = await axios.get(`${NEWS_API_URL}articles/${id}/`, { headers });
  return response.data;
};

const createNewsArticle = async (articleData: FormData) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'multipart/form-data',
    ...(token && { Authorization: `Bearer ${token}` })
  };
  
  const response = await axios.post(`${NEWS_API_URL}articles/`, articleData, { headers });
  return response.data;
};

const updateNewsArticle = async ({ id, data }: { id: number; data: FormData }) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'multipart/form-data',
    ...(token && { Authorization: `Bearer ${token}` })
  };
  
  const response = await axios.patch(`${NEWS_API_URL}articles/${id}/`, data, { headers });
  return response.data;
};

const deleteNewsArticle = async (id: number) => {
  const headers = getAuthHeaders();
  await axios.delete(`${NEWS_API_URL}articles/${id}/`, { headers });
  return { message: 'News article deleted successfully' };
};

// React Query hooks for news
export const useNewsArticles = (searchParams?: Record<string, any>) => {
  return useQuery({
    queryKey: ['news', searchParams],
    queryFn: () => fetchNewsArticles(searchParams),
  });
};

export const useNewsArticle = (id: number) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => fetchNewsArticleById(id),
    enabled: !!id,
  });
};

export const useAddNewsArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createNewsArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useUpdateNewsArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateNewsArticle,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['news', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useDeleteNewsArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteNewsArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

// Export news API services
export const newsApiService = {
  getNewsArticles: fetchNewsArticles,
  getPaginatedNewsArticles: fetchPaginatedNewsArticles,
  getNewsArticleById: fetchNewsArticleById,
  addNewsArticle: createNewsArticle,
  updateNewsArticle: updateNewsArticle,
  deleteNewsArticle: deleteNewsArticle,
};
