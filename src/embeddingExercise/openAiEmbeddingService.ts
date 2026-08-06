import OpenAI from "openai";

import { calculateCosineSimilarity } from "./cosineSimilarity.js";
import type { TextPair } from "./model.js";

export class OpenAiEmbeddingService {
  constructor(
    private readonly client: OpenAI = new OpenAI(),
    private readonly model = "text-embedding-3-small",
  ) {}

  async embed(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: this.model,
      input: text,
      encoding_format: "float",
    });
    const embedding = response.data[0]?.embedding;

    if (embedding === undefined) {
      throw new Error("OpenAI hat kein Embedding zurückgegeben.");
    }

    return embedding;
  }

  async calculateSimilarity(leftText: string, rightText: string): Promise<number> {
    const leftEmbedding = await this.embed(leftText);
    const rightEmbedding = await this.embed(rightText);
    return calculateCosineSimilarity(leftEmbedding, rightEmbedding);
  }

  async printComparison(pair: TextPair): Promise<void> {
    const similarity = await this.calculateSimilarity(
      pair.leftText,
      pair.rightText,
    );

    console.log(`\n[OpenAI Embeddings] ${pair.title}`);
    console.log(`A: ${pair.leftText}`);
    console.log(`B: ${pair.rightText}`);
    console.log(`Cosine Similarity: ${similarity.toFixed(4)}`);
    console.log(`Beobachtung: ${pair.explanation}`);
  }
}

