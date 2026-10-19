import axiosClient from '../lib/axiosClient';

const productService = {
  getProducts: async () => {
    const response = await axiosClient.get('/products');
    return response.data;
  },
  getProductById: async (id) => {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await axiosClient.post('/products', productData);
    return response.data;
  },
  updateProduct: async ({ id, ...productData }) => {
    const response = await axiosClient.put(`/products/${id}`, productData);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await axiosClient.delete(`/products/${id}`);
    return response.data;
  }
};

export default productService;
