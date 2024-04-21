import React from "react";
import { ContainerPrincipalHeadder, TituloHeader } from "./styles";

const Header = ({ title }: { title: string }) => {
  return (
    <ContainerPrincipalHeadder>
      <TituloHeader className="tituloHeader">{title}</TituloHeader>
    </ContainerPrincipalHeadder>
  );
};

export default Header;
