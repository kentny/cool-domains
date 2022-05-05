const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy();
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);

    let txn = await domainContract.register("doom");
    await txn.wait();

    const domainOwner = await domainContract.getAddress("doom");
    console.log("Owner of domain:", domainOwner);

    // This code is failed because `randomPerson` is not the owner of the domain.
    // txn = await domainContract.connect(randomPerson).setRecord("doom", "This is my domain now!");
    // await txn.wait();
    
    txn = await domainContract.setRecord("doom", "HELLO!!! How are you??");
    await txn.wait();

    const domainRecord = await domainContract.getRecord("doom");
    console.log("Record of domain:", domainRecord);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();
