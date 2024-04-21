import styled from "styled-components";

export const CardContainer = styled.div<{ value: string }>`
  max-width: 237px;
  width: 50%;
  max-height: 304px;
  height: auto;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 2vh 1vw;
  padding: 1vh 1vw;
  box-shadow: 0vh 0vh 2vh rgba(0, 0, 0, 0.338);
  display: flex;
  flex-direction: column;
  font-family: inter;
  value: ${(props) => props.value};
`;

export const ImagemDoProduto = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const Imagem = styled.img`
  max-width: 100%;
  max-height: 123px;
  min-height: 123px;
  height: auto;
`;

export const InformacoesDoProduto = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DescricaoDoProduto = styled.div`
  font-size: 15px;
`;

export const Preco = styled.div`
  height: 5vh;
`;

export const PrecoSpan = styled.span`
  font-size: 26px;
  font-weight: bold;
`;

export const Botoes = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5vh;
`;

export const EditarButton = styled.button`
  color: #ce7c01;
  text-decoration: underline;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: inter;
`;

export const RemoverButton = styled.button`
  text-decoration: underline;
  color: #ce0101;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: inter;
`;
