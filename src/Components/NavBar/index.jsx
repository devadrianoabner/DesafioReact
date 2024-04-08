import "./style.css";

const NavBar = ({ toggleModal }) => {
  return (
    <div className="containerPrincipalNavBar">
      <h1 onClick={toggleModal}>Adicionar Produto</h1>
    </div>
  );
};

export default NavBar;
