import * as React from "react";
import { hot } from "react-hot-loader/root";
import { useConnectedMetaMask } from "metamask-react";
import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap";
import Web3Client from "../lib/web3/client";

const Error = styled(Alert)`
  margin: 8px;
`;

const TransferOwnership = () => {
  const [address, setAddress] = React.useState<string>("");
  const [error, setError] = React.useState<string>();
  const [pendingTx, setPendingTx] = React.useState<boolean>(false);
  const { account, ethereum } = useConnectedMetaMask();

  const disabled = address.length == 0 || address.length !== 42 || pendingTx;

  const onType = (event: React.FormEvent<EventTarget>) => {
    const text = (event.target as HTMLInputElement).value;
    setAddress(text);
  };

  const onTransfer = () => {
    setPendingTx(true);
    const client = new Web3Client(account, ethereum);
    client
      .transferOwnership(address)
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
        <h1>Transfer ownership</h1>
      </Row>
      <Row>
        <Form>
          <Form.Group>
            <Form.Label>New address</Form.Label>
            <Form.Control
              placeholder="Enter new address"
              onChange={onType}
              size="lg"
              value={address}
            />
          </Form.Group>
          <Error variant="danger" hidden={error === undefined}>
            {error}
          </Error>
          <br />
          <Button variant="danger" onClick={onTransfer} disabled={disabled}>
            <Spinner
              hidden={!pendingTx}
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Transfer Ownership
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default hot(TransferOwnership);
