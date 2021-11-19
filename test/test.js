const { expect } = require('chai');
// require('dotenv').config();

describe('Floppy', () => {
  let Floppy;
  let floppy;
  let owner;
  let addr1;
  beforeEach(async function () {
    Floppy = await hre.ethers.getContractFactory('Floppy');
    floppy = await Floppy.deploy();
    [owner, addr1] = await ethers.getSigners();
  });
  describe('Deployment', () => {
    it('should return the correct name and symbol', async () => {
      await floppy.deployed();
      expect(await floppy.name()).to.equal('Floppy');
      expect(await floppy.symbol()).to.equal('FLPY');
    });
    it('should return the correct owner', async () => {
      await floppy.deployed();

      expect(await floppy.owner()).to.equal(owner.address);
    });
    it('should assign the correct mint rate', async () => {
      const mintRate = ethers.utils.parseEther('0.01').toString();

      expect((await floppy.mintRate()).toString()).to.equal(mintRate);
    });
    it('should assign the correct total supply', async () => {
      const ownerSupply = (await floppy.balanceOf(owner.address)).toString();
      expect((await floppy.totalSupply()).toString()).to.equal(ownerSupply);
    });
  });
  describe('Minting', () => {
    it('should mint correctly', async () => {
      const overrides = { value: ethers.utils.parseEther('0.01') };
      await floppy.safeMint(addr1.address, overrides);
      expect(await floppy.ownerOf('0')).to.equal(addr1.address);
      expect((await floppy.totalSupply()).toString()).to.equal('1');
    });
  });
});
