import * as React from "react";
import { hot } from "react-hot-loader/root";
import Button from "react-bootstrap/Button";
import { useMetaMask } from "metamask-react";
import Logo from "./MetamaskConnect/Logo";

//const CHAIN_ID = "0x1";
const GOERLI = "0x05";
const MAIN_NET = "0x01";

const CHAIN_ID = process.env.TEST ? GOERLI : MAIN_NET;

const MetamaskConnect = () => {
  const { status, connect, account, chainId, switchChain } = useMetaMask();
  const disabled = () =>
    ["initializing", "unavailable", "connecting", "connected"].includes(status);

  const onClick = () => {
    if (status === "notConnected") {
      if (chainId !== CHAIN_ID) {
        switchChain(CHAIN_ID);
      }
      return connect();
    }
    return undefined;
  };

  const addressText = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const text = () => {
    if (status === "initializing") return "Initializing...";
    if (status === "unavailable") return "MetaMask not available";
    if (status === "notConnected") return "Connect to MetaMask";
    if (status === "connecting") return "Connecting...";
    if (status === "connected") return addressText(account);
    return undefined;
  };

  return (
    <Button variant="primary" onClick={onClick} disabled={disabled()}>
      <Logo />
      <span>{text()}</span>
    </Button>
  );
};

export default hot(MetamaskConnect);
