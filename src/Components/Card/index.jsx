import "./styles.css";

const Card = ({
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
    <div value={id} className="containerProduto">
      <div className="imagemDoProduto">
        <img
          src={
            src
              ? ""
              : "https://radio93fm.com.br/wp-content/uploads/2019/02/produto-585x380.png"
          }
          alt={alt}
        ></img>
      </div>
      <div className="informacoesDoProduto">
        <div className="descricaoDoProduto">
          <p>{nome}</p>
          <span>{marca}</span>
        </div>

        <div className="preco">
          <span>R$ {preco}</span>
        </div>

        <div className="botoes">
          <button className="editar" onClick={handleEditarProduto}>
            Editar
          </button>
          <button className="remover" onClick={handleApagarProduto}>
            {" "}
            X Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
