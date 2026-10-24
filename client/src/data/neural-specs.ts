/**
 * Inspectable nodes for the exploded AI system. The architecture is an
 * illustrative composite of how the systems I build are layered, not live
 * telemetry; the section says so on screen.
 */
export type LayerId =
  | "faceL"
  | "faceR"
  | "matrix"
  | "router"
  | "kv"
  | "telemetry"
  | `tile${0 | 1 | 2 | 3}`;

export interface NodeSpec {
  id: string;
  layer: LayerId;
  /** Position in the layer's own pixel space (plates are 360×360). */
  x: number;
  y: number;
  title: string;
  rows: readonly (readonly [string, string])[];
}

export const PLATE = 360;

export const stages = [
  {
    id: 1,
    name: "Interface",
    title: "Holographic landmark grid",
    body: "The front end: a landmark mesh reads the face and turns it into features the model can use.",
  },
  {
    id: 2,
    name: "Transformer",
    title: "Synaptic transformer matrix",
    body: "The face splits apart to reveal attention heads multiplying queries against keys to decide what matters.",
  },
  {
    id: 3,
    name: "Compute",
    title: "Inference engine",
    body: "At the core, a local router, tensor units and a KV-cache keep inference fast and cheap.",
  },
] as const;

export const nodeSpecs: readonly NodeSpec[] = [
  {
    id: "landmarks",
    layer: "faceL",
    x: 138,
    y: 160,
    title: "Landmark mesh",
    rows: [
      ["Input", "Camera frame"],
      ["Output", "68 facial landmarks"],
      ["Used for", "Expression and gaze features"],
    ],
  },
  {
    id: "encoder",
    layer: "faceR",
    x: 42,
    y: 272,
    title: "Vision encoder",
    rows: [
      ["Patch size", "16 × 16 px"],
      ["Embedding", "768-dim tokens"],
      ["Hands off to", "Transformer layers"],
    ],
  },
  {
    id: "head",
    layer: "matrix",
    x: 120,
    y: 150,
    title: "Attention head 03 / 32",
    rows: [
      ["Scores", "softmax(QKᵀ / √d)"],
      ["Head size", "d = 128"],
      ["Context", "8k tokens"],
    ],
  },
  {
    id: "wq",
    layer: "matrix",
    x: 290,
    y: 82,
    title: "Query weights W_Q",
    rows: [
      ["Shape", "4096 → 128 per head"],
      ["Role", "What each token is looking for"],
    ],
  },
  {
    id: "wk",
    layer: "matrix",
    x: 290,
    y: 140,
    title: "Key weights W_K",
    rows: [
      ["Shape", "4096 → 128 per head"],
      ["Role", "What each token offers"],
    ],
  },
  {
    id: "wv",
    layer: "matrix",
    x: 290,
    y: 198,
    title: "Value weights W_V",
    rows: [
      ["Shape", "4096 → 128 per head"],
      ["Role", "Content passed forward"],
    ],
  },
  {
    id: "matmul",
    layer: "matrix",
    x: 180,
    y: 312,
    title: "Matrix multiplication path",
    rows: [
      ["Step 1", "QKᵀ / √d"],
      ["Step 2", "Causal-masked softmax"],
      ["Step 3", "Weighted sum · V"],
    ],
  },
  {
    id: "router",
    layer: "router",
    x: 180,
    y: 180,
    title: "Local model router",
    rows: [
      ["Runtime", "Ollama, open-weight models"],
      ["Decision", "Smallest model that fits the task"],
      ["Fallback", "Quantised 4-bit variant"],
    ],
  },
  {
    id: "kv",
    layer: "kv",
    x: 180,
    y: 74,
    title: "KV-cache cluster",
    rows: [
      ["Stores", "Past keys and values"],
      ["Saves", "Recomputing earlier tokens"],
      ["Eviction", "Oldest pages first"],
    ],
  },
  {
    id: "telemetry",
    layer: "telemetry",
    x: 180,
    y: 300,
    title: "Execution telemetry",
    rows: [
      ["Tracks", "Tokens/s, latency, memory"],
      ["Feeds", "Router decisions"],
    ],
  },
  ...([0, 1, 2, 3] as const).map(i => ({
    id: `tile${i}`,
    layer: `tile${i}` as const,
    x: 40,
    y: 40,
    title: `Tensor unit ${String(i).padStart(2, "0")}`,
    rows: [
      ["Ops", "FP16 / INT8 matmul"],
      ["Role", "Batched token generation"],
    ] as const,
  })),
];
