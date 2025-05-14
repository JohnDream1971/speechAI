export async function confirmAndSign(tx: any, provider: any) {
  const signer = await provider.getSigner();
  const txResponse = await signer.sendTransaction(tx);
  await txResponse.wait();
  return txResponse.hash;
}
