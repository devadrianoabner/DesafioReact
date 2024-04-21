import { ContainerPrincipalNavBar, TituloNavBar } from "./styles";

interface NavBarProps {
  toggleModal: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleModal }) => {
  return (
    <ContainerPrincipalNavBar>
      <TituloNavBar onClick={toggleModal}>Adicionar Produto</TituloNavBar>
    </ContainerPrincipalNavBar>
  );
};

export default NavBar;
