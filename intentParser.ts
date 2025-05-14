export function parseVoiceCommand(text: string) {
  const lower = text.toLowerCase();

  if (/stake (\d+\.?\d*) (eth|usdc|\w+)/.test(lower)) {
    const match = lower.match(/stake (\d+\.?\d*) (\w+)/);
    return {
      intent: "stake",
      amount: parseFloat(match?.[1] || "0"),
      token: match?.[2]
    };
  }

  if (/transfer (\d+\.?\d*) (\w+) to (0x[a-f0-9]{40})/.test(lower)) {
    const match = lower.match(/transfer (\d+\.?\d*) (\w+) to (0x[a-f0-9]{40})/);
    return {
      intent: "transfer",
      amount: parseFloat(match?.[1] || "0"),
      token: match?.[2],
      recipient: match?.[3]
    };
  }

  const swapMatch = lower.match(/swap (\d+\.?\d*) (\w+) (to|for) (\w+)( with (\d+)% max slippage)?/);
  if (swapMatch) {
    return {
      intent: "swap",
      amount: parseFloat(swapMatch[1]),
      fromToken: swapMatch[2],
      toToken: swapMatch[4],
      slippage: parseFloat(swapMatch[6] || "1")
    };
  }

  return { intent: "unknown" };
}
