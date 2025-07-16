require("dotenv").config();

const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const CoFounderAddress1 = process.env.CO_FOUNDER1_ADDRESS;
  const CoFounderAddress2 = process.env.CO_FOUNDER2_ADDRESS;
  const CoFounderAddress3 = process.env.CO_FOUNDER3_ADDRESS;
  const CoFounderAddress4 = process.env.CO_FOUNDER4_ADDRESS;

  const DeveloperAddress1 = process.env.DEVELOPER1_ADDRESS;
  const DeveloperAddress2 = process.env.DEVELOPER2_ADDRESS;

  const hrks = await ethers.getContractFactory("HRKS");
  const hrksContract = await hrks.attach("0x21855C51ad607D28B6fd1B7E9E638a14836168ab");

  const balance = await hrksContract.balanceOf(deployer.address);
  console.log("before transfer balance: ", balance);

  await hrksContract.transfer(CoFounderAddress1, 3000000000n);
  await hrksContract.transfer(CoFounderAddress2, 3000000000n);
  await hrksContract.transfer(CoFounderAddress3, 3000000000n);
  await hrksContract.transfer(CoFounderAddress4, 3000000000n);

  await hrksContract.transfer(DeveloperAddress1, 4000000000n);
  await hrksContract.transfer(DeveloperAddress2, 4000000000n);
  
  await hrksContract.transfer("0xcd7ccc88f070c305693730ABd57508a55B9Fc1B8", 40000000000n);
  await hrksContract.transfer("0x08513530830C1Da23fB170786e4987891dF27734", 20000000000n);
  await hrksContract.transfer("0x246ff0Efef1B1a8Bc61f733D9bB38F549F16c79B", 15000000000n);
  await hrksContract.transfer("0xDA70eC0eabB9b30F15C92C2E0EcaDd6AaA2425dC", 5000000000n);

  const ico = await ethers.getContractFactory("ICO");
  const icoContract = await ico.attach("0x14024B275CEd8e87cbF908ED78B051f01Ebb3b54");

  await icoContract.transferDwat(CoFounderAddress1, 10000000000n);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
