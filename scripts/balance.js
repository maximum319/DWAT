const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer.address);

  const dwat = await ethers.getContractFactory("DWAT");
  const dwatContract = await dwat.attach("0x716aFF0E9B87B619fA7d5FF79b559ebC5E4cfCFB");
  const balance = await dwatContract.balanceOf("0x1A6DCE7Efbdd2D9B391CE875EAf3528540DC1445");
  console.log("balance: ", balance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});