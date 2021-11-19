const main = async () => {
  const Floppy = await ethers.getContractFactory('Floppy');
  const floppy = await Floppy.deploy();

  await floppy.deployed();
  console.log('Floppy deployed at:', floppy.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
