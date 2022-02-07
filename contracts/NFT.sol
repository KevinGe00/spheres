// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";
import {Base64} from "./libraries/Base64.sol";


contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewNFTMinted(address sender, uint256 tokenId);
    
    constructor() ERC721("Sphere NFT", "SPH") {
        console.log("Created a new NFT Contract for sphere.");
    }

    function createToken(string memory collection) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        collection,
                        ' SPH", "description": "A token for being a part of the Spheres community.", "image": "https://imgur.com/a/bITI0An"}'
                    )
                )
            )
        );

         string memory tokenURI = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit NewNFTMinted(msg.sender, newItemId);
        return newItemId;
    }
}