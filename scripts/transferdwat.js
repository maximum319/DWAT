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

  const dwat = await ethers.getContractFactory("DWAT");
  const dwatContract = await dwat.attach("0x716aFF0E9B87B619fA7d5FF79b559ebC5E4cfCFB");

  const balance = await dwatContract.balanceOf(deployer.address);
  console.log("before transfer balance: ", balance);

  // await dwatContract.transfer(CoFounderAddress1, 3000000000000000000000000000n);
  // await dwatContract.transfer(CoFounderAddress2, 3000000000000000000000000000n);
  // await dwatContract.transfer(CoFounderAddress3, 3000000000000000000000000000n);
  // await dwatContract.transfer(CoFounderAddress4, 3000000000000000000000000000n);

  // await dwatContract.transfer(DeveloperAddress1, 4000000000000000000000000000n);
  // await dwatContract.transfer(DeveloperAddress2, 4000000000000000000000000000n);
  
  // await dwatContract.transfer("0xa5E14C2f8B7ac11a56e3f189f36A69FD31eeef44", 40000000000000000000000000000n);
  // await dwatContract.transfer("0x36Aca6429319AbE137a2972e28465d06676EBEBC", 20000000000000000000000000000n);
  // await dwatContract.transfer("0xAc2A68C06D26cC123c6A77B076689c58e7FCa451", 15000000000000000000000000000n);
  // await dwatContract.transfer("0xA7782c228F3549e97C3CFF4Cc79Cd78b9FC15451", 5000000000000000000000000000n);

  const ico = await ethers.getContractFactory("ICO");
  const icoContract = await ico.attach("0x36Aca6429319AbE137a2972e28465d06676EBEBC");

  await icoContract.transferDwat("0x70Cc1636b668F718c3203D10C47AD356A097AAB3", 8000000000000000000000000000n);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
