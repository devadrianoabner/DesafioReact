import React, { useState, useEffect } from "react";
import Card from "../Card";
import NavBar from "../NavBar";
import Modal from "../Modal";
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

const Body = () => {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState();

  const notificacaoSucesso = (textoSucesso) => toast.success(textoSucesso);
  const notificacaoErro = (textoErro) => toast.success(textoErro);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const produtosData = await getAllProducts();
        setListaProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const adicionarProduto = async (novoProduto) => {
    try {
      const novoProdutoComId = { ...novoProduto, id: uuidv4() };
      await createProduct(novoProdutoComId);
      setListaProdutos([...listaProdutos, novoProdutoComId]);
      notificacaoSucesso(
        `${novoProduto.nome} foi adicionado à lista de produtos`
      );
    } catch (error) {
      notificacaoErro("Erro ao adicionar produto:", error);
    }
  };

  const apagarProduto = async (id) => {
    try {
      await deleteProduct(id);
      const novaListaProdutos = listaProdutos.filter(
        (produto) => produto.id !== id
      );
      setListaProdutos(novaListaProdutos);
      notificacaoSucesso("Produto removido com sucesso");
    } catch (error) {
      notificacaoErro("Erro ao excluir produto:", error);
    }
  };

  const editarProduto = async (id, novoProduto) => {
    try {
      await editProduct(id, novoProduto);

      const novaListaProdutos = listaProdutos.map((produto) =>
        produto.id === id ? novoProduto : produto
      );
      setListaProdutos(novaListaProdutos);

      toggleModal();

      notificacaoSucesso("Produto editado com sucesso");
    } catch (error) {
      notificacaoErro("Erro ao editar produto:", error);
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
            editarProduto={editarProduto}
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

export default Body;