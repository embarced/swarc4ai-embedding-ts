import { calculateCosineSimilarity } from "./cosineSimilarity.js";
import type { TextPair } from "./model.js";

export class ManualEmbeddingService {
  buildVocabulary(texts: readonly string[]): string[] {
    const vocabulary = new Set<string>();

    for (const text of texts) {
      for (const token of this.tokenize(text)) {
        vocabulary.add(token);
      }
    }

    return [...vocabulary];
  }

  oneHotEncode(token: string, vocabulary: readonly string[]): number[] {
    const normalizedToken = token.toLocaleLowerCase("de-DE");
    return vocabulary.map((word) => (word === normalizedToken ? 1 : 0));
  }

  toBagOfWordsVector(text: string, vocabulary: readonly string[]): number[] {
    const vector = Array<number>(vocabulary.length).fill(0);
    const tokenIndexes = new Map(
      vocabulary.map((token, index) => [token, index]),
    );

    for (const token of this.tokenize(text)) {
      const tokenIndex = tokenIndexes.get(token);
      if (tokenIndex !== undefined) {
        vector[tokenIndex] = (vector[tokenIndex] ?? 0) + 1;
      }
    }

    return vector;
  }

  calculateSimilarity(
    leftText: string,
    rightText: string,
    vocabulary: readonly string[],
  ): number {
    const leftVector = this.toBagOfWordsVector(leftText, vocabulary);
    const rightVector = this.toBagOfWordsVector(rightText, vocabulary);
    return calculateCosineSimilarity(leftVector, rightVector);
  }

  private tokenize(text: string): string[] {
    return text.toLocaleLowerCase("de-DE").match(/[\p{L}\p{N}]+/gu) ?? [];
  }

  printOneHotExample(vocabulary: readonly string[], token: string): void {
    const vector = this.oneHotEncode(token, vocabulary);
    console.log(`One-Hot-Beispiel für Token '${token}': [${vector.join(", ")}]`);
  }

  printComparison(pair: TextPair, vocabulary: readonly string[]): void {
    const similarity = this.calculateSimilarity(
      pair.leftText,
      pair.rightText,
      vocabulary,
    );

    console.log(`\n[Bag of Words] ${pair.title}`);
    console.log(`A: ${pair.leftText}`);
    console.log(`B: ${pair.rightText}`);
    console.log(`Cosine Similarity: ${similarity.toFixed(4)}`);
    console.log(`Beobachtung: ${pair.explanation}`);
  }
}

