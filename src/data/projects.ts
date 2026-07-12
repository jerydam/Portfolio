export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string | null;
  source_code_link: string;
  live_demo_link: string | null;
}

const GITHUB_PROFILE = "https://github.com/jerydam";

export const projects: Project[] = [
  {
    name: "PrimeIQ",
    description:
      "Knowledge dueling and quiz tournament platform, MiniPay-native on Celo. Soulbound token economy, on-chain duel settlement, GoodDollar integration, and real-time WebSocket games.",
    tags: [
      { name: "NextJs", color: "blue-text-gradient" },
      { name: "FastAPI", color: "green-text-gradient" },
      { name: "Solidity", color: "pink-text-gradient" },
    ],
    image: null,
    source_code_link: GITHUB_PROFILE,
    live_demo_link: null,
  },
  {
    name: "FaucetDrops",
    description:
      "Automated on-chain reward distribution platform, live across five chains: Celo, Base, BNB Chain, Lisk, and Arbitrum.",
    tags: [
      { name: "Solidity", color: "blue-text-gradient" },
      { name: "MultiChain", color: "green-text-gradient" },
      { name: "Automation", color: "pink-text-gradient" },
    ],
    image: null,
    source_code_link: GITHUB_PROFILE,
    live_demo_link: null,
  },
  {
    name: "Lumina",
    description:
      "ERC-4337 embedded wallet infrastructure with Turnkey-managed keys, OAuth login, paymaster support, and deterministic multi-chain deploys.",
    tags: [
      { name: "ERC4337", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "AccountAbstraction", color: "pink-text-gradient" },
    ],
    image: null,
    source_code_link: GITHUB_PROFILE,
    live_demo_link: null,
  },
  {
    name: "Kakushō",
    description:
      "ZK-KYC protocol with a TypeScript SDK, OCR and NFC verification paths, built on Stellar/Soroban.",
    tags: [
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "ZeroKnowledge", color: "green-text-gradient" },
      { name: "Soroban", color: "pink-text-gradient" },
    ],
    image: null,
    source_code_link: GITHUB_PROFILE,
    live_demo_link: null,
  },
  {
    name: "ContriBoost",
    description:
      "Decentralized rotating savings and group contribution protocol on Celo and Lisk.",
    tags: [
      { name: "Solidity", color: "blue-text-gradient" },
      { name: "Celo", color: "green-text-gradient" },
      { name: "Lisk", color: "pink-text-gradient" },
    ],
    image: null,
    source_code_link: GITHUB_PROFILE,
    live_demo_link: null,
  },
];
