const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
    const rpclink = hre.network.config.url;
    const [encryptedData] = await encryptDataField(rpclink, data);
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};

async function main() {
    const [signer] = await hre.ethers.getSigners();

    //1 setMessage call
    const contractAddress = "0x5101ce6b5D7b9646d3e168742499b5F8e9789eA1";
    const contractFactory = await hre.ethers.getContractFactory("Swisstronik");
    const contract = contractFactory.attach(contractAddress);
    const functionName = "setMessage";
    const messageToSet = "Hello Swisstronik!!";
    const setMessageTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, [messageToSet]), 0);
    await setMessageTx.wait();
    console.log("Transaction Receipt for setMessage: ", setMessageTx);

    //2 mint Token calls and (3) transfer tokens
    const contractTokenAddress = "0x92dC42eCd2704910f6089173f982391F66747Ff5";
    const contractTokenFactory = await hre.ethers.getContractFactory("MySwiss");
    const contractToken = contractTokenFactory.attach(contractTokenAddress);
    const tokenFunctionName = "mint";
    const addressTokenTo = signer.address
    const mintTokenAmount = hre.ethers.toBigInt("1000000000000000000000")
    const setTokenMessageTx = await sendShieldedTransaction(signer, contractTokenAddress, contractToken.interface.encodeFunctionData(tokenFunctionName, [addressTokenTo, mintTokenAmount]), 0);
    await setTokenMessageTx.wait();
    console.log("Transaction Receipt for Token Mint: ", setTokenMessageTx);

    const tTokenFunctionName = "transfer";
    const addresstTokenTo = "0xfF400448c2B8921f0fE5af020A61ABeeB15b1a83"
    const tTokenAmount = hre.ethers.toBigInt("1000000000000000000")
    const settTokenMessageTx = await sendShieldedTransaction(signer, contractTokenAddress, contractToken.interface.encodeFunctionData(tTokenFunctionName, [addresstTokenTo, tTokenAmount]), 0);
    await settTokenMessageTx.wait();
    console.log("Transaction Receipt for token transfer: ", settTokenMessageTx);

    //4 Mint PNFT
    const contractPNFTAddress = "0xD03038FcE68B3EBae6a751A9c4D08A0dFfecCb00";
    const contractPNFTFactory = await hre.ethers.getContractFactory("MyPSwissNFT");
    const contractPNFT = contractPNFTFactory.attach(contractPNFTAddress);
    const PNFTfunctionName = "safeMint";
    const addressPNFTTo = signer.address
    const setPNFTMessageTx = await sendShieldedTransaction(signer, contractPNFTAddress, contractPNFT.interface.encodeFunctionData(PNFTfunctionName, [addressPNFTTo]), 0);
    await setPNFTMessageTx.wait();
    console.log("Transaction Receipt for PNFT: ", setPNFTMessageTx);

    //5 Mint PERC20 and (6) Transfer
    const contractPERC20Address = "0x0188053780426716CE7A356edF816fcA8C9E5c01";
    const contractPERC20Factory = await hre.ethers.getContractFactory("MyPERCToken");
    const contractPERC20 = contractPERC20Factory.attach(contractPERC20Address);
    const PERC20functionName = "mint";
    const setPERC20MessageTx = await sendShieldedTransaction(signer, contractPERC20Address, contractPERC20.interface.encodeFunctionData(PERC20functionName, []), 0);
    await setPERC20MessageTx.wait();
    console.log("Transaction Receipt for PERC20: ", setPERC20MessageTx);

    // <--Transfer-->
    const tPERC20functionName = "transfer";
    const addresstPERC20To = "0xfF400448c2B8921f0fE5af020A61ABeeB15b1a83"
    const tPERC20Amount = hre.ethers.toBigInt("100000000000000000000")
    const settPERC20MessageTx = await sendShieldedTransaction(signer, contractPERC20Address, contractPERC20.interface.encodeFunctionData(tPERC20functionName, [addresstPERC20To, tPERC20Amount]), 0);
    await settPERC20MessageTx.wait();
    console.log("Transaction Receipt for transferPERC20: ", settPERC20MessageTx);

    //7 Mint NFT
    const contractNFTAddress = "0xE9dE310b2aB8aE44447Cc10962DcbB96E2EcC291";
    const contractNFTFactory = await hre.ethers.getContractFactory("MySwissNFT");
    const contractNFT = contractNFTFactory.attach(contractNFTAddress);
    const NFTfunctionName = "safeMint";
    const addressNFTTo = signer.address
    const setNFTMessageTx = await sendShieldedTransaction(signer, contractNFTAddress, contractNFT.interface.encodeFunctionData(NFTfunctionName, [addressNFTTo]), 0);
    await setNFTMessageTx.wait();
    console.log("Transaction Receipt: ", setNFTMessageTx);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});