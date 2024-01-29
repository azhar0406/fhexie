
# FHEXIE NFT Card Game

## Overview

Welcome to the Fhexie NFT Card Game, a blockchain-based card game developed on the Fhenix blockchain. This decentralized application (DApp) allows players to participate in battles using unique NFT cards, each with randomized attack and defense strengths. The game leverages on-chain randomness using the solidity and provides privacy features by storing certain card attributes using euint8.

## Table of Contents

1. [Smart Contract Overview](#smart-contract-overview)
2. [FHE Features](#features)
3. [Getting Started](#getting-started)
4. [Game Mechanics](#game-mechanics)
5. [Tokenomics](#tokenomics)
6. [License](#license)

## Smart Contract Overview

The smart contract is implemented in Solidity and follows the ERC-1155 standard for NFTs. It includes features for player registration, NFT creation, battle creation and resolution, and more.

## Features FHE

- **Player Registration:** Players can register in the game by providing a name and creating a random game token.
- **Battle Creation:** Players can create battles and invite others to join.
- **Battle Resolution:** Battles are resolved based on player moves, attack, defense, and health attributes of their NFT cards.
- **Privacy:** Certain attributes of the NFT cards, such as attack and defense strengths, are stored using euint8 for enhanced privacy.

## Getting Started

To get started with the Fhexie NFT Card Game, follow these steps:

1. **Install Dependencies:** Ensure you have the necessary dependencies, including the Fhenix blockchain and FHE library.
2. **Deploy Smart Contract:** Deploy the smart contract on the Fhenix blockchain.
3. **Register as a Player:** Use the `registerPlayer` function to register as a player and create your first game token.
4. **Create and Join Battles:** Use the `createBattle` and `joinBattle` functions to start or join battles with other players.

## Game Mechanics

- **Mana:** Players have a mana attribute that affects their ability to make certain moves in battles.
- **Health:** Each player has a health attribute that determines their resilience in battles.
- **Battle Moves:** Players choose attack or defense moves during battles.
- **Randomized Strengths:** The attack and defense strengths of NFT cards are randomized using on-chain randomness.

## Tokenomics

The game utilizes an ERC-1155 token standard. Each token represents a unique NFT card with distinct attributes. The total supply is dynamically managed based on player interactions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
