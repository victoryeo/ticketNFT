import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function ({
    deployments,
    getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log("deploy from account", deployer)

    await deploy("TicketNFT", {
        from: deployer,
        log: true,
    })
}

export default func

func.tags = ["TicketNFT"]
