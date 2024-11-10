const hre = require("hardhat");

async function main() {
  /**
   * @dev make sure the first argument has the same name as your contract in the Hello_swtr.sol file
   * @dev the second argument must be the message we want to set in the contract during the deployment process
  */

  // const contract = await hre.ethers.deployContract("Swisstronik", ["Hello Swisstronik!!"]);
  // const contract = await hre.ethers.deployContract("MySwiss", ["0x6fe75a39433906bca84aca704503dbc04ade8657"]);
  // const contract = await hre.ethers.deployContract("MySwissNFT", ["0x6fe75a39433906bca84aca704503dbc04ade8657"]);
  // const contract = await hre.ethers.deployContract("MyPERCToken", []);
  const contract = await hre.ethers.deployContract("MyPSwissNFT", ["0x6fe75a39433906bca84aca704503dbc04ade8657"]);

  await contract.waitForDeployment();

  // console.log(`Swisstronik contract deployed to ${contract.target}`);
  // console.log(`MySwiss contract deployed to ${contract.target}`);
  // console.log(`MySwissNFT contract deployed to ${contract.target}`);
  // console.log(`MyPERCToken contract deployed to ${contract.target}`);
  console.log(`MyPSwissNFT contract deployed to ${contract.target}`);

  // Swisstronik contract deployed to 0x5101ce6b5D7b9646d3e168742499b5F8e9789eA1
  // MySwiss contract deployed to 0x92dC42eCd2704910f6089173f982391F66747Ff5
  // MySwissNFT contract deployed to 0xE9dE310b2aB8aE44447Cc10962DcbB96E2EcC291
  // MyPERCToken contract deployed to 0x0188053780426716CE7A356edF816fcA8C9E5c01
  // MyPSwissNFT contract deployed to 0xD03038FcE68B3EBae6a751A9c4D08A0dFfecCb00
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});