import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function ({
    deployments,
    getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    let args: any[] = []
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log("deploy from account", deployer)

    args[0] = "T_NAME"
    args[1] = "T_SYMBOL"
    args[2] = 2
    await deploy("CurrencyToken", {
        from: deployer,
        args: args,
        log: true,
    })
}

export default func

func.tags = ["CurrencyToken"]
