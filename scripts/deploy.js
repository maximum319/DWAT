const { ethers, upgrades } = require("hardhat");

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      });
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already verified!");
      } else {
        console.log(e);
      }
    }
}

async function main() {

  console.log("Deploying DWAT...");

  // const DWAT = await ethers.getContractFactory("DWAT");
  // const dwatContract = await DWAT.deploy();
  // await dwatContract.waitForDeployment();
  // console.log("DWAT deployed to: ", dwatContract.target);
  // const dwatContractAddress = await dwatContract.getAddress();
  // console.log("DWAT deployed to:", dwatContractAddress);

    const HRKS = await ethers.getContractFactory("HRKS");
    const hrksContract = await upgrades.deployProxy(
        HRKS, [], { kind: 'transparent', initializer: 'initialize' }
    );
    await hrksContract.waitForDeployment();
    console.log("HRKS deployed to: ", hrksContract.target);
    const hrksContractAddress = await hrksContract.getAddress();
    const hrksImplAddress = await upgrades.erc1967.getImplementationAddress(hrksContractAddress);
    console.log("HRKS deployed to:", hrksContractAddress);
    console.log("HRKS implementation address:", hrksImplAddress);

    // await sleep(10000);
    
    await verify(hrksImplAddress, []);    

    // console.log("Deploying Community...");
    // const Community = await ethers.getContractFactory("Community");
    // const communityContract = await Community.deploy(dwatContractAddress);
    // await communityContract.waitForDeployment();
    // const communityContractAddress = await communityContract.getAddress();
    // console.log("Community deployed to:", communityContractAddress);

    // await verify(communityContractAddress, [dwatContractAddress]);
    
}

main().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);   
    process.exitCode = 1;
});     