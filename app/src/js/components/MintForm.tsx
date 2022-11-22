import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useConnectedMetaMask } from "metamask-react";
import styled from "styled-components";
import { Container, Row, Form, Alert, Spinner, Button } from "react-bootstrap";
import Web3Client from "../lib/web3/client";

const Error = styled(Alert)`
  margin: 8px;
`;

const MintForm = () => {
  const [address, setAddress] = React.useState<string>("");
  const [uri, setUri] = React.useState<string>("");
  const [error, setError] = React.useState<string>();
  const [pendingTx, setPendingTx] = React.useState<boolean>(false);
  const { account, ethereum } = useConnectedMetaMask();

  const disabled = uri.length == 0 || address.length !== 42 || pendingTx;

  const onAddressType = (event: React.FormEvent<EventTarget>) => {
    const text = (event.target as HTMLInputElement).value;
    setAddress(text);
  };

  const onUriType = (event: React.FormEvent<EventTarget>) => {
    const text = (event.target as HTMLInputElement).value;
    setUri(text);
  };

  const onMint = () => {
    setPendingTx(true);
    const client = new Web3Client(account, ethereum);
    client
      .mint(address, uri)
      .then(() => {
        setPendingTx(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
        setPendingTx(false);
      });
  };

  return (
    <Container fluid>
      <Row>
        <h1>Mint NFT</h1>
      </Row>
      <Row>
        <Form>
          <Form.Group>
            <Form.Label>Recipient address</Form.Label>
            <Form.Control
              placeholder="Enter address"
              onChange={onAddressType}
              size="lg"
              value={address}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>NFT Uri</Form.Label>
            <Form.Control
              placeholder="Enter uri"
              onChange={onUriType}
              size="lg"
              value={uri}
            />
          </Form.Group>
          <Error variant="danger" hidden={error === undefined}>
            {error}
          </Error>
          <br />
          <Button variant="danger" onClick={onMint} disabled={disabled}>
            <Spinner
              hidden={!pendingTx}
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Mint NFT
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default hot(MintForm);
