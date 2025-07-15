# Hardhat Token & DWAT Template

A simple Hardhat-based Ethereum smart contract project featuring a basic ERC20-like token contract and an upgradeable ERC20 contract (DWAT). This template provides a starting point for developing, testing, and deploying Solidity smart contracts using Hardhat.

## Features
- **Solidity 0.8.28**
- Minimal ERC20-style `Token` contract
- Upgradeable ERC20 contract `DWAT` using OpenZeppelin Upgrades
- Hardhat Toolbox integration
- Example tests with Chai and Ethers.js
- Ready for Sepolia testnet deployment

## Contract Overview
### [`Token.sol`](contracts/Token.sol):
- Name: `My Hardhat Token`
- Symbol: `MHT`
- Total Supply: 1,000,000 tokens (assigned to deployer)
- Functions:
  - `transfer(address to, uint256 amount)`: Transfer tokens to another address
  - `balanceOf(address account)`: Check token balance

### [`DWAT.sol`](contracts/DWAT.sol):
- Name: `DWAT`
- Symbol: `DWAT`
- Total Supply: 100,000,000,000 tokens (assigned to deployer/owner on initialization)
- Upgradeable (uses proxy pattern)
- Ownable (OpenZeppelin)
- Functions:
  - Standard ERC20 functions
  - `initialize()`: Initializes the contract (must be called once after proxy deployment)

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

### Deploy DWAT to Sepolia (Upgradeable Proxy)
Update your `.env` as above, then run:
```bash
npx hardhat run scripts/DWAT.js --network sepolia
```
This will deploy the DWAT proxy and print both the proxy and implementation addresses.

### Verify DWAT Implementation on Etherscan
After deployment, verify the **implementation contract** (not the proxy) on Etherscan:
```bash
npx hardhat verify --network sepolia <DWAT_IMPLEMENTATION_ADDRESS>
```
- The implementation address is printed by the deployment script.
- No constructor arguments are needed for verification (initializer is used instead).

## Project Structure
- `contracts/` — Solidity smart contracts
- `test/` — JavaScript tests
- `hardhat.config.js` — Hardhat configuration
- `ignition/` — Deployment modules and artifacts
- `scripts/` — Deployment and verification scripts

## License

This project is licensed under the ISC License. 