import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useMetaMask } from "metamask-react";
import styled from "styled-components";

import MetamaskConnect from "./js/components/MetamaskConnect";
import TransferOwnership from "./js/components/TransferOwnership";
import { Container } from "react-bootstrap";
import MintForm from "./js/components/MintForm";

const Main = styled.main`
  height: 100vh;
  padding: 64px;
  width: 100vw;
`;

const App = () => {
  const { account } = useMetaMask();

  const transferOwnership = account ? <TransferOwnership /> : <></>;
  const mintForm = account ? <MintForm /> : <></>;

  return (
    <>
      <Main>
        <h1>Cryptopapies Management Console</h1>
        <MetamaskConnect />
        <hr />
        <Container fluid hidden={!account}>
          {transferOwnership}
        </Container>
        <hr />
        <Container fluid hidden={!account}>
          {mintForm}
        </Container>
      </Main>
    </>
  );
};

export default hot(App);
