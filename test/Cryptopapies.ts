import { expect } from "chai";
import { ethers } from "hardhat";
import { Cryptopapies } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

describe("UserStorage", function () {
  interface Contract {
    token: Cryptopapies;
    owner: SignerWithAddress;
    otherAccount: SignerWithAddress;
  }

  let deploy: Contract;
  let _name = "Cryptopapies";
  let _symbol = "PAPI";

  beforeEach(async function () {
    const Cryptopapies = await ethers.getContractFactory(_name);
    const cryptopapiesContract = await Cryptopapies.deploy();

    const [owner, otherAccount] = await ethers.getSigners();

    deploy = {
      token: cryptopapiesContract,
      owner,
      otherAccount,
    };
  });

  it("Should has the correct name and symbol ", async function () {
    const { token } = deploy;
    expect(await token.name()).to.equal(_name);
    expect(await token.symbol()).to.equal(_symbol);
  });

  it("Should mint a token with token ID 1 & 2 to account1", async function () {
    const { otherAccount, token } = deploy;
    await token.mintPapi(
      otherAccount.address,
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1"
    );
    expect(await token.ownerOf(1)).to.equal(otherAccount.address);
    expect(await token.tokenURI(BigNumber.from(1))).to.equal(
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1"
    );

    await token.mintPapi(
      otherAccount.address,
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2"
    );
    expect(await token.ownerOf(2)).to.equal(otherAccount.address);
    expect(await token.tokenURI(BigNumber.from(2))).to.equal(
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2"
    );

    expect(await token.balanceOf(otherAccount.address)).to.equal(2);
  });

  /* FIXME: set max amount to other to test this method
  it("Should not allow minting more than max amount of tokens", async () => {
    const { otherAccount, token } = deploy;
    const maxAmount: number = (await token.MAX_PAPIES()).toNumber();
    console.log("max papies", maxAmount.toString());
    for (let i = 1; i <= maxAmount; i++) {
      await token.mintPapi(
        otherAccount.address,
        `https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${i}`
      );
    }
    await expect(
      token.mintPapi(
        otherAccount.address,
        `https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${
          maxAmount + 1
        }`
      )
    ).to.be.rejectedWith(Error);
  });*/
});
