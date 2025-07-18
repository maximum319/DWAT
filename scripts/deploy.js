const { ethers, upgrades } = require("hardhat");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

    console.log("Deploying DWAT...");

    const DWAT = await ethers.getContractFactory("DWAT");
    const dwatContract = await upgrades.deployProxy(
        DWAT, [], { kind: 'transparent', initializer: 'initialize' }
    );
    await dwatContract.waitForDeployment();
    const dwatContractAddress = await dwatContract.getAddress();
    const dwatImplAddress = await upgrades.erc1967.getImplementationAddress(dwatContractAddress);
    console.log("DWAT deployed to:", dwatContractAddress);
    console.log("DWAT implementation address:", dwatImplAddress);

    await sleep(10000);
    
    console.log("Deploying Community...");
    const Community = await ethers.getContractFactory("Community");
    const communityContract = await Community.deploy(dwatContractAddress);
    await communityContract.waitForDeployment();
    const communityContractAddress = await communityContract.getAddress();
    console.log("Community deployed to:", communityContractAddress);

    console.log("Deploying ICO...");
    const ICO = await ethers.getContractFactory("ICO");
    const icoContract = await ICO.deploy(dwatContractAddress);
    await icoContract.waitForDeployment();
    const icoContractAddress = await icoContract.getAddress();
    console.log("ICO deployed to:", icoContractAddress);
    await sleep(10000);

    console.log("Deploying Liquidity");
    const Liquidity = await ethers.getContractFactory("Liquidity");
    const liquidityContract = await Liquidity.deploy(dwatContractAddress);
    await liquidityContract.waitForDeployment();
    const liquidityContractAddress = await liquidityContract.getAddress();
    console.log("Liquidity deployed to:", liquidityContractAddress);
    await sleep(10000);

    console.log("Deploying Marketing");
    const Marketing = await ethers.getContractFactory("Marketing");
    const marketingContract = await Marketing.deploy(dwatContractAddress);
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