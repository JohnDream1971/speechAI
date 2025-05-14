import { parseVoiceCommand } from "./nlp/intentParser";
import { buildTransaction } from "./tx/transactionBuilder";
import { confirmAndSign } from "./signing/consentAndSign";

export async function handleV2C(text: string, provider: any, userAddress: string) {
  const parsed = parseVoiceCommand(text);
  if (parsed.intent === "unknown") throw new Error("Unrecognized voice command");

  const tx = await buildTransaction(parsed, userAddress);
  const txHash = await confirmAndSign(tx, provider);

  console.log("✅ Transaction sent:", txHash);
  return txHash;
}
