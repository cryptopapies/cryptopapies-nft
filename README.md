# Cryptopapies NFT

- [Cryptopapies NFT](#cryptopapies-nft)
  - [Setup](#setup)
    - [Run tests](#run-tests)
    - [Deploy](#deploy)

---

[![ci](https://github.com/cryptopapies/cryptopapies-nft/workflows/CI/badge.svg)](https://github.com/cryptopapies/cryptopapies-nft/actions)
[![license-mit](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)

![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)

## Setup

### Run tests

```sh
npx hardhat compile
REPORT_GAS=true npx hardhat test
```

### Deploy

```sh
# deploy prod
npx hardhat run scripts/deploy.ts --network ethereum
# deploy test net
npx hardhat run scripts/deploy.ts --network goerli
```
