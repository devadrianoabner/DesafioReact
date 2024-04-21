import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllProducts, createProduct, editProduct, deleteProduct } from './API/api';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Produto {
  id: string;
  nome: string;
  preco: string;
  marca: string;
  src: string;
  alt: string;
}

interface ProductContextType {
  produtos: Produto[];
  adicionarProduto: (novoProduto: Produto) => Promise<void>;
  apagarProduto: (id: string) => Promise<void>;
  editarProduto: (id: string, novoProduto: Produto) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext deve ser utilizado dentro de um ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const produtosData: Produto[] = await getAllProducts();
        setProdutos(produtosData);
      } catch (error) {
        toast.error('Erro ao buscar produtos');
      }
    };

    fetchProducts();
  }, []);

  const adicionarProduto = async (novoProduto: Produto) => {
    try {
      const novoProdutoComId = { ...novoProduto, id: uuidv4() };
      await createProduct(novoProdutoComId);
      setProdutos([...produtos, novoProdutoComId]);
      toast.success(`${novoProduto.nome} foi adicionado à lista de produtos`);
    } catch (error) {
      toast.error('Erro ao adicionar produto');
      throw error;
    }
  };

  const apagarProduto = async (id: string) => {
    try {
      await deleteProduct(id);
      const novaListaProdutos = produtos.filter((produto) => produto.id !== id);
      setProdutos(novaListaProdutos);
      toast.success('Produto removido com sucesso');
    } catch (error) {
      toast.error('Erro ao apagar produto');
      throw error;
    }
  };

  const editarProduto = async (id: string, novoProduto: Produto) => {
    try {
      const produtoEditado = await editProduct(id, novoProduto);
      if (produtoEditado) {
        const novaListaProdutos = produtos.map((produto) => (produto.id === id ? produtoEditado : produto));
        setProdutos(novaListaProdutos);
        toast.success('Produto editado com sucesso');
      } else {
        throw new Error('Produto não encontrado para edição');
      }
    } catch (error) {
      toast.error('Erro ao editar produto');
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ produtos, adicionarProduto, apagarProduto, editarProduto }}>
      {children}
    </ProductContext.Provider>
  );
};
