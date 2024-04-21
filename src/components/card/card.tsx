import React from "react";
import {
  RemoverButton,
  EditarButton,
  Botoes,
  PrecoSpan,
  Preco,
  DescricaoDoProduto,
  InformacoesDoProduto,
  Imagem,
  ImagemDoProduto,
  CardContainer,
} from "./styles";

interface Produto {
    id: string;
    src: string;
    alt: string;
    nome: string;
    marca: string;
    preco: string;
  }
  
  interface Props {
    produto: Produto;
    apagarProduto: (id: string) => void;
    toggleModal: () => void;
    setProdutoSelecionado: (produto: Produto | null) => void;
    produtoSelecionado: Produto | null;
  }

const Card: React.FC<Props>= ({
  produto,
  apagarProduto,
  toggleModal,
  setProdutoSelecionado,
  produtoSelecionado,
}) => {
  const { id, src, alt, nome, marca, preco } = produto;

  const handleApagarProduto = () => {
    const confirmarExclusao = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (confirmarExclusao) {
      apagarProduto(id);
    }
  };

  const handleEditarProduto = () => {
    if (!produtoSelecionado) {
      setProdutoSelecionado(produto);
      toggleModal();
    }
  };


  return (
    <CardContainer value={id}>
      <ImagemDoProduto>
        <Imagem
          src={
            src ||
            "https://radio93fm.com.br/wp-content/uploads/2019/02/produto-585x380.png"
          }
          alt={alt}
        />
      </ImagemDoProduto>
      <InformacoesDoProduto>
        <DescricaoDoProduto>
          <p>{nome}</p>
          <span>{marca}</span>
        </DescricaoDoProduto>
        <Preco>
          <PrecoSpan>R$ {preco}</PrecoSpan>
        </Preco>
        <Botoes>
          <EditarButton onClick={handleEditarProduto}>Editar</EditarButton>
          <RemoverButton onClick={handleApagarProduto}>X Remover</RemoverButton>
        </Botoes>
      </InformacoesDoProduto>
    </CardContainer>
  );
};

export default Card;
