// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Cryptopapies is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // maximum amount of mintable papies
    uint256 public MAX_PAPIES;

    constructor() ERC721("Cryptopapies", "PAPI") {
        MAX_PAPIES = 7777;
    }

    /// @notice mint a new PAPI NFT
    /// @param _to address to give the papi to
    /// @param _uri token uri
    /// @return _newItemId the id of the minted token
    function mintPapi(address _to, string memory _uri) public onlyOwner returns(uint256 _newItemId) {
        require(
            _tokenIds.current() + 1 <= MAX_PAPIES,
            "Mint would exceed max supply of Cryptopapies"
        );
        _tokenIds.increment();

        _newItemId = _tokenIds.current();
        _mint(_to, _newItemId);
        _setTokenURI(_newItemId, _uri);

        return _newItemId;
    }
}
