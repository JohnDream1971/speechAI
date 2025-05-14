# 🎙️ Voice-to-Contract (V2C) — for Speech AI

Voice-to-Contract (V2C) is a frictionless interface layer for the Ethereum ecosystem that allows users to execute smart contract operations using natural spoken language. Integrated with the Speech AI protocol, this module enables secure, intent-driven interactions with DeFi protocols — completely hands-free.

## ✨ Features

- 🎧 Voice-driven Web3 execution
- 🧠 Multi-intent natural language parsing (swap, stake, transfer)
- 🔁 Dynamic ABI-to-payload synthesis
- 🔐 EIP-1559-compatible wallet signing
- ✅ Modular EVM support
- ⚠️ Built-in rule checks for slippage, value limits, and contract safelisting

## 🗂 Project Structure

src/
├── main.ts                      # V2C engine entry point
├── nlp/
│   └── intentParser.ts         # Converts voice text into structured commands
├── tx/
│   └── transactionBuilder.ts   # Maps command → ABI payload
├── signing/
│   └── consentAndSign.ts       # Wallet interaction and user consent

## 🛠 Supported Intents (Examples)

| Intent Type | Voice Example | Result |
|-------------|----------------|--------|
| **Swap** | `Swap 100 USDC to ETH with 1% max slippage` | Calls `swapExactTokensForTokens` |
| **Stake** | `Stake 2 ETH` | Calls `stake(uint256)` |
| **Transfer** | `Transfer 50 DAI to 0xabc...` | Calls `transfer(address,uint256)` |

## 🚀 Usage

```ts
import { handleV2C } from './src/main';
import { ethers } from 'ethers';

const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);

handleV2C("stake 2 eth", provider, "0xYourWalletAddress");
```

## 🔒 Security Notes

- Transaction replay resistance via wallet nonce
- Max limits & slippage enforcement included
- Expandable with EIP-712 signing and proof-of-intent logs

## 🔧 Dependencies

- `ethers.js` (v6+)
- Browser with voice-to-text input OR backend with Whisper/STT integration

## 🧩 Future Extensions

- GPT-driven dynamic intent resolution
- Whisper real-time microphone integration
- Multichain support (via wagmi/rainbowkit)
- Telegram bot interface

## 📄 License

MIT © Speech AI Labs
