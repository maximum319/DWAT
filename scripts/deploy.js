const { ethers, upgrades } = require("hardhat");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    console.log(args);
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

    console.log("Deploying HRKS...");

    const HRKS = await ethers.getContractFactory("HRKS");
    const hrksContract = await upgrades.deployProxy(
        HRKS, [], { kind: 'transparent', initializer: 'initialize' }
    );
    await hrksContract.waitForDeployment();
    const hrksContractAddress = await hrksContract.getAddress();
    const hrksImplAddress = await upgrades.erc1967.getImplementationAddress(hrksContractAddress);
    console.log("HRKS deployed to:", hrksContractAddress);
    console.log("HRKS implementation address:", hrksImplAddress);

    await sleep(10000);
    
    console.log("Deploying Community...");
    const Community = await ethers.getContractFactory("Community");
    const communityContract = await Community.deploy(hrksContractAddress);
    await communityContract.waitForDeployment();
    const communityContractAddress = await communityContract.getAddress();
    console.log("Community deployed to:", communityContractAddress);

    console.log("Deploying ICO...");
    const ICO = await ethers.getContractFactory("ICO");
    const icoContract = await ICO.deploy("0x21855C51ad607D28B6fd1B7E9E638a14836168ab");
    await icoContract.waitForDeployment();
    const icoContractAddress = await icoContract.getAddress();
    console.log("ICO deployed to:", icoContractAddress);
    await sleep(10000);

    console.log("Deploying Liquidity");
    const Liquidity = await ethers.getContractFactory("Liquidity");
    const liquidityContract = await Liquidity.deploy(hrksContractAddress);
    await liquidityContract.waitForDeployment();
    const liquidityContractAddress = await liquidityContract.getAddress();
    console.log("Liquidity deployed to:", liquidityContractAddress);
    await sleep(10000);

    console.log("Deploying Marketing");
    const Marketing = await ethers.getContractFactory("Marketing");
    const marketingContract = await Marketing.deploy(hrksContractAddress);
    await marketingContract.waitForDeployment();
    const marketingContractAddress = await marketingContract.getAddress();
    console.log("Marketing deployed to:", marketingContractAddress);
    await sleep(10000);
}

main().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);   
    process.exitCode = 1;
});