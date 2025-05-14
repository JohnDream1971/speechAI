import { ethers } from "ethers";

export async function buildTransaction(parsed: any, userAddress: string) {
  switch (parsed.intent) {
    case "stake":
      return buildStakeTx(parsed, userAddress);
    case "transfer":
      return buildTransferTx(parsed);
    case "swap":
      return buildSwapTx(parsed, userAddress);
    default:
      throw new Error("Unsupported intent");
  }
}

async function buildStakeTx({ amount, token }: any, user: string) {
  const contractAddr = "0xStakingContract";
  const iface = new ethers.Interface(["function stake(uint256 amount)"]);
  const value = token === "eth" ? ethers.parseEther(amount.toString()) : 0n;

  return {
    to: contractAddr,
    data: iface.encodeFunctionData("stake", [ethers.parseUnits(amount.toString(), 18)]),
    value
  };
}

async function buildTransferTx({ amount, token, recipient }: any) {
  const tokenAddr = getTokenAddress(token);
  const iface = new ethers.Interface(["function transfer(address to, uint256 amount)"]);
  return {
    to: tokenAddr,
    data: iface.encodeFunctionData("transfer", [recipient, ethers.parseUnits(amount.toString(), 18)]),
    value: 0
  };
}

async function buildSwapTx({ amount, fromToken, toToken, slippage }: any, user: string) {
  const router = "0xUniswapRouter";
  const path = [getTokenAddress(fromToken), getTokenAddress(toToken)];
  const iface = new ethers.Interface([
    "function swapExactTokensForTokens(uint256,uint256,address[],address,uint256)"
  ]);

  const amountIn = ethers.parseUnits(amount.toString(), 6);
  const estimatedOut = amountIn * 35n / 100000n;
  const amountOutMin = estimatedOut * BigInt(100 - slippage) / 100n;
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 300);

  return {
    to: router,
    data: iface.encodeFunctionData("swapExactTokensForTokens", [amountIn, amountOutMin, path, user, deadline]),
    value: 0
  };
}

function getTokenAddress(symbol: string): string {
  const map: Record<string, string> = {
    usdc: "0xa0b86991c...",
    eth: "0xEeeeeEeee...",
    dai: "0x6b175474..."
  };
  return map[symbol.toLowerCase()] || "0x0";
}
