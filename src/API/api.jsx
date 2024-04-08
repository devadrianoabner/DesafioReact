import axios from "axios";

const API_URL = "https://6288144910e93797c1564f40.mockapi.io/api/v1/";

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return [];
  }
};

const createProduct = async (newProduct) => {
  try {
    const response = await axios.post(`${API_URL}/product`, newProduct);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return null;
  }
};

const editProduct = async (productId, updatedProduct) => {
  try {
    const response = await axios.patch(
      `${API_URL}/product/${productId}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar produto com ID ${productId}:`, error);
    return null;
  }
};

const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_URL}/product/${productId}`);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir produto com ID ${productId}:`, error);
    return false;
  }
};

export { getAllProducts, createProduct, editProduct, deleteProduct };