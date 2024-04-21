import React, { useState, useEffect } from "react";
import Card from "../card/card";
import Modal from "../modal/modal";
import NavBar from "../navBar/naveBar";
import { ContainerPrincipalBody, ContainerProdutos } from "./styles";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../../API/api";

interface Produto {
  id: string;
  nome: string;
  preco: string;
  marca: string;
  src: string;
  alt: string;
}

const MainArea: React.FC = () => {
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );

  const notificacaoSucesso = (textoSucesso: string) =>
    toast.success(textoSucesso);
  const notificacaoErro = (textoErro: string) => toast.error(textoErro);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const produtosData: Produto[] = await getAllProducts();
        setListaProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const adicionarProduto = async (novoProduto: Produto) => {
    try {
      const novoProdutoComId = { ...novoProduto, id: uuidv4() };
      await createProduct(novoProdutoComId);
      setListaProdutos([...listaProdutos, novoProdutoComId]);
      notificacaoSucesso(
        `${novoProduto.nome} foi adicionado à lista de produtos`
      );
    } catch (error) {
      notificacaoErro(`Erro ao adicionar produto: ${error}`);
    }
  };

  const apagarProduto = async (id: string) => {
    try {
      await deleteProduct(id);
      const novaListaProdutos = listaProdutos.filter(
        (produto) => produto.id !== id
      );
      setListaProdutos(novaListaProdutos);
      notificacaoSucesso("Produto removido com sucesso");
    } catch (error) {
      notificacaoErro(`Erro ao adicionar produto: ${error}`);
    }
  };

  const editarProduto = async (id: string, novoProduto: Produto) => {
    try {
      const produtoEditado = await editProduct(id, novoProduto);

      if (produtoEditado) {
        const novaListaProdutos = listaProdutos.map((produto) =>
          produto.id === id ? produtoEditado : produto
        );
        setListaProdutos(novaListaProdutos);

        toggleModal();

        notificacaoSucesso("Produto editado com sucesso");
      } else {
        notificacaoErro("Erro ao editar produto(verificar console)");
      }
    } catch (error) {
      notificacaoErro(`Erro ao adicionar produto ${error}`);
      console.log(error);
    }
  };

  const toggleModal = () => {
    if (produtoSelecionado) {
      setProdutoSelecionado(null);
    }
    setModalAberto(!modalAberto);
  };

  return (
    <ContainerPrincipalBody>
      <Modal
        adicionarProduto={adicionarProduto}
        modalAberto={modalAberto}
        toggleModal={toggleModal}
        produtoSelecionado={produtoSelecionado}
        editarProduto={editarProduto}
        titulo={
          produtoSelecionado
            ? `Editar produto ${produtoSelecionado.nome}`
            : "Adicionar novo produto"
        }
      />
      <NavBar toggleModal={toggleModal} />
      <ContainerProdutos>
        {listaProdutos.map((produto) => (
          <Card
            key={produto.id}
            produto={produto}
            apagarProduto={apagarProduto}
            toggleModal={toggleModal}
            setProdutoSelecionado={setProdutoSelecionado}
            produtoSelecionado={produtoSelecionado}
          />
        ))}
      </ContainerProdutos>
      <ToastContainer />
    </ContainerPrincipalBody>
  );
};

export default MainArea;
