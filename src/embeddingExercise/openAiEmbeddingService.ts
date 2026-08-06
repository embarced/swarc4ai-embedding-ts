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
    // TODO: ÜBUNG 2 - Erzeuge für den linken Text über this.embed ein
    // OpenAI-Embedding.
    // TODO: ÜBUNG 2 - Erzeuge für den rechten Text ebenfalls ein Embedding.
    // TODO: ÜBUNG 2 - Berechne die Cosine Similarity zwischen beiden
    // Embeddings.
    // TODO: ÜBUNG 2 - Gib den berechneten Wert zurück.
    // SO PRÜFST DU ES: Starte die App mit gesetztem OPENAI_API_KEY. Für
    // semantisch ähnliche Satzpaare wie "Auto" vs. "Fahrzeug" sollte der
    // Score meist höher und sinnvoller sein als bei Bag of Words.
    throw new Error(
      "ÜBUNG 2: Implementiere die OpenAI-Embeddings und den Similarity-Vergleich.",
    );
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
