import React, { useState, useEffect, ChangeEvent } from "react";

import {
  Overlay,
  ContainerPrincipalModal,
  ContainerInfo,
  BotaoFechar,
  BotaoConfirmar,
} from "./styles";

interface Produto {
  id: string;
  nome: string;
  preco: string;
  marca: string;
  src: string;
  alt: string;
}

interface ModalProps {
  adicionarProduto: (produto: Produto) => void;
  toggleModal: () => void;
  modalAberto: boolean;
  produtoSelecionado: Produto | null;
  editarProduto: (id: string, novoProduto: Produto) => void;
  titulo: string;
}

const Modal: React.FC<ModalProps> = ({
  adicionarProduto,
  toggleModal,
  modalAberto,
  produtoSelecionado,
  editarProduto,
  titulo,
}) => {
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    marca: "",
    src: "",
    alt: "",
    id: "",
  });

  const [produtoEditado, setProdutoEditado] = useState(
    produtoSelecionado ?? null
  );

  useEffect(() => {
    if (produtoSelecionado) {
      setProdutoEditado(produtoSelecionado);
      setNovoProduto(produtoSelecionado);
    } else {
      setProdutoEditado(null);
      setNovoProduto({
        nome: "",
        preco: "",
        marca: "",
        src: "",
        alt: "",
        id: "",
      });
    }
  }, [produtoSelecionado]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (produtoEditado) {
      editarProduto(produtoEditado.id, novoProduto);
    } else {
      adicionarProduto(novoProduto);
    }
    toggleModal();
  };

  return modalAberto ? (
    <Overlay>
      <ContainerPrincipalModal onSubmit={handleSubmit}>
        <BotaoFechar onClick={toggleModal}>Fechar</BotaoFechar>
        <ContainerInfo>
          <h1>{titulo}</h1>
          <div data-value={novoProduto.id}>
            <div className="imagemDoProduto">
              <input
                type="text"
                id="imagem"
                name="src"
                placeholder="Link da imagem"
                value={novoProduto.src}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="alt"
                name="alt"
                placeholder="Descrição da imagem"
                value={novoProduto.alt}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Nome do produto"
                value={novoProduto.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="number"
                id="preco"
                name="preco"
                placeholder="Preço"
                value={novoProduto.preco}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="text"
                id="marca"
                name="marca"
                placeholder="Marca"
                value={novoProduto.marca}
                onChange={handleChange}
              />
            </div>
          </div>

          <BotaoConfirmar type="submit">Confirmar</BotaoConfirmar>
        </ContainerInfo>
      </ContainerPrincipalModal>
    </Overlay>
  ) : null;
};

export default Modal;
