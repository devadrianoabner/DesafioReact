import axios, { AxiosResponse } from "axios";

interface Product {
  id: string;
  nome: string;
  preco: string;
  marca: string;
  src: string;
  alt: string;
}

const API_URL = "https://6288144910e93797c1564f40.mockapi.io/api/v1/";

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get<Product[]>(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return [];
  }
};

const createProduct = async (newProduct: Product): Promise<Product | null> => {
  try {
    const response: AxiosResponse<Product> = await axios.post<Product>(`${API_URL}/product`, newProduct);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return null;
  }
};

const editProduct = async (productId: string, updatedProduct: Product): Promise<Product | null> => {
  try {
    const response: AxiosResponse<Product> = await axios.patch<Product>(
      `${API_URL}/product/${productId}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar produto com ID ${productId}:`, error);
    return null;
  }
};

const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/product/${productId}`);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir produto com ID ${productId}:`, error);
    return false;
  }
};

export { getAllProducts, createProduct, editProduct, deleteProduct };