const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer.address);

  const hrks = await ethers.getContractFactory("HRKS");
  const hrksContract = await hrks.attach("0x21855C51ad607D28B6fd1B7E9E638a14836168ab");
  const balance = await hrksContract.balanceOf("0xcd7ccc88f070c305693730ABd57508a55B9Fc1B8");
  console.log("balance: ", balance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});