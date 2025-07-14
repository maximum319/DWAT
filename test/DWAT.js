const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("DWAT contract", function () {
  let owner, other, dwat;
  const TOTAL_SUPPLY = ethers.parseUnits("100000000000", 0);

  before(async function () {
    [owner, other] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const DWAT = await ethers.getContractFactory("DWAT");
    dwat = await upgrades.deployProxy(DWAT, [], { kind: 'transparent', initializer: 'initialize' });
    await dwat.waitForDeployment();
  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await dwat.balanceOf(owner.address);
    expect(await dwat.totalSupply()).to.equal(ownerBalance);
    expect(ownerBalance).to.equal(TOTAL_SUPPLY);
  });

  it("Should have correct name and symbol", async function () {
    expect(await dwat.name()).to.equal("DWAT");
    expect(await dwat.symbol()).to.equal("DWAT");
  });

  it("Owner should be the deployer", async function () {
    expect(await dwat.owner()).to.equal(owner.address);
  });

  it("Should allow transfers between accounts", async function () {
    // Transfer 100 tokens from owner to other
    await expect(dwat.transfer(other.address, 100)).to.emit(dwat, "Transfer").withArgs(owner.address, other.address, 100);
    expect(await dwat.balanceOf(other.address)).to.equal(100);
    expect(await dwat.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY - 100n);
  });

  it("Should not allow non-owner to call owner-only functions", async function () {
    // Only owner can call owner-only functions, e.g., transferOwnership
    await expect(dwat.connect(other).transferOwnership(other.address)).to.be.reverted;
  });

  it("Should not allow initialize to be called twice", async function () {
    await expect(dwat.initialize()).to.be.reverted;
  });
});
