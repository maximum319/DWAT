const { ethers } = require("hardhat");

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
    await verify("0x21855C51ad607D28B6fd1B7E9E638a14836168ab", []);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
