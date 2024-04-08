import React, { useState, useEffect } from "react";
import {
  Overlay,
  ContainerPrincipalModal,
  ContainerInfo,
  BotaoFechar,
  BotaoConfirmar,
} from "./style.jsx";

const Modal = ({
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

  const [produtoEditado, setProdutoEditado] = useState(null);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (produtoEditado) {
      editarProduto(produtoEditado.id, novoProduto);
    } else {
      adicionarProduto(novoProduto);
    }
    toggleModal();
  };

  return (
    modalAberto && (
      <Overlay>
        <ContainerPrincipalModal onSubmit={handleSubmit}>
          <BotaoFechar onClick={toggleModal} type="button">
            Fechar
          </BotaoFechar>
          <ContainerInfo>
            <h1>{titulo}</h1>
            <div value={novoProduto.id}>
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
    )
  );
};

export default Modal;
