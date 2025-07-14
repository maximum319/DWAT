# Hardhat Token Template

A simple Hardhat-based Ethereum smart contract project featuring a basic ERC20-like token contract. This template provides a starting point for developing, testing, and deploying Solidity smart contracts using Hardhat.

## Features
- **Solidity 0.8.28**
- Minimal ERC20-style `Token` contract
- Hardhat Toolbox integration
- Example test with Chai and Ethers.js
- Ready for Sepolia testnet deployment

## Contract Overview
The main contract is [`Token.sol`](contracts/Token.sol):
- Name: `My Hardhat Token`
- Symbol: `MHT`
- Total Supply: 1,000,000 tokens (assigned to deployer)
- Functions:
  - `transfer(address to, uint256 amount)`: Transfer tokens to another address
  - `balanceOf(address account)`: Check token balance

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/maximum319/hardhat-template.git
   cd hardhat-template
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the project root with the following variables for Sepolia deployment:
```
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Usage

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npm test
```

### Deploy to Sepolia
Update your `.env` as above, then run:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```
*(You may need to create a `scripts/deploy.js` script if not present.)*

## Project Structure
- `contracts/` — Solidity smart contracts
- `test/` — JavaScript tests
- `hardhat.config.js` — Hardhat configuration
- `ignition/` — Deployment modules and artifacts

## License

This project is licensed under the ISC License. 