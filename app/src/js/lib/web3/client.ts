import { BigNumber } from "ethers";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

import { ABI, CONTRACT_ADDRESS } from "./contracts/Cryptopapies";

export default class Web3Client {
  private address: string;
  private web3: Web3;

  constructor(address: string, ethereum: any) {
    this.address = address;
    this.web3 = new Web3(ethereum);
  }

  async transferOwnership(newAddress: string) {
    const contract = this.getContract();
    return contract.methods
      .transferOwnership(newAddress)
      .send({ from: this.address });
  }

  async mint(address: string, uri: string) {
    const contract = this.getContract();
    return contract.methods.mintPapi(address, uri).send({ from: this.address });
  }

  private getContract() {
    return new this.web3.eth.Contract(ABI as AbiItem[], CONTRACT_ADDRESS);
  }
}
