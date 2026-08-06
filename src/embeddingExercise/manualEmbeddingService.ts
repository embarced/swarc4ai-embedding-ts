import type { TextPair } from "./model.js";

export class ManualEmbeddingService {
  buildVocabulary(texts: readonly string[]): string[] {
    // TODO: ÜBUNG 1 - Erzeuge aus allen Texten ein gemeinsames Vokabular.
    // TODO: ÜBUNG 1 - Zerlege dafür jeden Text in Tokens und sammle jedes
    // Wort genau einmal.
    // TODO: ÜBUNG 1 - Gib das Vokabular als string[] zurück.
    throw new Error("ÜBUNG 1: Implementiere den Aufbau des Vokabulars.");
  }

  oneHotEncode(token: string, vocabulary: readonly string[]): number[] {
    // TODO: ÜBUNG 1 - Erzeuge einen Vektor mit der Länge des Vokabulars.
    // TODO: ÜBUNG 1 - Setze genau die Position des übergebenen Tokens auf 1.
    // TODO: ÜBUNG 1 - Alle anderen Positionen bleiben 0.
    throw new Error("ÜBUNG 1: Implementiere One-Hot-Encoding.");
  }

  toBagOfWordsVector(text: string, vocabulary: readonly string[]): number[] {
    // TODO: ÜBUNG 1 - Erzeuge für den gesamten Text einen
    // Bag-of-Words-Vektor.
    // TODO: ÜBUNG 1 - Erhöhe für jedes vorkommende Token den passenden
    // Zähler im Vektor.
    throw new Error("ÜBUNG 1: Implementiere den Bag-of-Words-Vektor.");
  }

  calculateSimilarity(
    leftText: string,
    rightText: string,
    vocabulary: readonly string[],
  ): number {
    // TODO: ÜBUNG 1 - Erzeuge für beide Texte jeweils einen
    // Bag-of-Words-Vektor.
    // TODO: ÜBUNG 1 - Berechne anschließend die Cosine Similarity mit
    // calculateCosineSimilarity.
    // TODO: ÜBUNG 1 - Gib den berechneten Wert zurück.
    // SO PRÜFST DU ES: Starte die App. Es sollten für mehrere Satzpaare
    // Bag-of-Words-Scores ausgegeben werden. Achtet darauf, dass "Auto"
    // vs. "Fahrzeug" nur begrenzt erkannt wird und dass bei
    // "Hund beißt Mann" vs. "Mann beißt Hund" die Wortreihenfolge
    // verloren geht.
    throw new Error("ÜBUNG 1: Implementiere die Bag-of-Words-Similarity.");
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
