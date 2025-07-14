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
    const DWAT = await ethers.getContractFactory("DWAT");
    const dwatContract = await upgrades.deployProxy(
        DWAT, [], { kind: 'transparent', initializer: 'initialize' }
    );
    await dwatContract.waitForDeployment();
    const dwatContractAddress = await dwatContract.getAddress();
    const dwatImplAddress = await upgrades.erc1967.getImplementationAddress(dwatContractAddress);
    console.log("DWAT deployed to:", dwatContractAddress);
    console.log("DWAT implementation address:", dwatImplAddress);

    await verify(dwatImplAddress, []);
}

main().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);   
    process.exitCode = 1;
});