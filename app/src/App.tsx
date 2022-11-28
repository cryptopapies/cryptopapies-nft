import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useMetaMask } from "metamask-react";
import styled from "styled-components";

import MetamaskConnect from "./js/components/MetamaskConnect";
import TransferOwnership from "./js/components/TransferOwnership";
import { Alert, Container } from "react-bootstrap";
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

  const alert = process.env.TEST ? (
    <Alert variant="danger">
      Warning, you're working on the test environment
    </Alert>
  ) : (
    <></>
  );

  return (
    <>
      <Main>
        {alert}
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
