import { ethers } from "hardhat";

async function main() {
  // deploy meow storage
  const Cryptopapies = await ethers.getContractFactory("Cryptopapies");
  const cryptopapiesContract = await Cryptopapies.deploy();
  await cryptopapiesContract.deployed();
  console.log(`Cryptopapies deployed to ${cryptopapiesContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
