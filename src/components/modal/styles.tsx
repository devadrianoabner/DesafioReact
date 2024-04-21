import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerPrincipalModal = styled.form`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  font-family: inter;
  min-width: 20vw;
`;

export const ContainerInfo = styled.div`
  h1 {
    margin-bottom: 5vh;
  }

  input {
    margin: 20px;
    border-radius: 7px;
    width: 20vw;
    min-width: 300px;
    padding: 1vh;
    font-family: inter;
    font-weight: 600;
    font-size: 15px;
  }
`;

export const BotaoFechar = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export const BotaoConfirmar = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
  color: #510083;
  font-size: 18px;
  margin-top: 5vh;
  background-color: transparent;
  border: none;
`;
