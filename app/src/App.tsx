import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useMetaMask } from "metamask-react";
import styled from "styled-components";

import MetamaskConnect from "./js/components/MetamaskConnect";
import TransferOwnership from "./js/components/TransferOwnership";
import { Container } from "react-bootstrap";

const Main = styled.main`
  height: 100vh;
  padding: 64px;
  width: 100vw;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConnectForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const { account } = useMetaMask();

  return (
    <>
      <Main>
        <ConnectForm>
          <MetamaskConnect />
        </ConnectForm>
        <hr />
        <Container fluid hidden={!account}>
          <TransferOwnership />
        </Container>
      </Main>
    </>
  );
};

export default hot(App);
