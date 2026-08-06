import { pathToFileURL } from "node:url";

import { ManualEmbeddingService } from "./manualEmbeddingService.js";
import type { TextPair } from "./model.js";

export function createExamplePairs(): TextPair[] {
  return [
    {
      title: "Synonyme",
      leftText: "Das Auto ist schnell",
      rightText: "Das Fahrzeug ist schnell",
      explanation:
        "Bag of Words sieht nur die Wortüberlappung. OpenAI erkennt meist besser, dass Auto und Fahrzeug ähnlich sind.",
    },
    {
      title: "Wortreihenfolge",
      leftText: "Hund beißt Mann",
      rightText: "Mann beißt Hund",
      explanation:
        "Bag of Words ignoriert die Reihenfolge der Wörter und kann deshalb Bedeutungsunterschiede übersehen.",
    },
    {
      title: "Klar unähnlich",
      leftText: "Ich trinke morgens Kaffee",
      rightText: "Der Server startet neu",
      explanation: "Beide Verfahren sollten hier eine niedrige Ähnlichkeit liefern.",
    },
    {
      title: "Support-Sprache",
      leftText: "Passwort vergessen",
      rightText: "Ich kann mich nicht einloggen",
      explanation:
        "Die Wortwahl ist verschieden, die Bedeutung aber verwandt. Das ist für OpenAI-Embeddings meist leichter.",
    },
  ];
}

export function main(): void {
  const textPairs = createExamplePairs();
  const allTexts = textPairs.flatMap((pair) => [pair.leftText, pair.rightText]);

  const manualEmbeddingService = new ManualEmbeddingService();
  const vocabulary = manualEmbeddingService.buildVocabulary(allTexts);

  console.log("=== Embedding Übung ===");
  console.log(`Vokabular: [${vocabulary.join(", ")}]`);
  manualEmbeddingService.printOneHotExample(vocabulary, "auto");

  console.log("\n=== Teil 1: Bag of Words ===");
  for (const pair of textPairs) {
    manualEmbeddingService.printComparison(pair, vocabulary);
  }

}

const executedFile = process.argv[1];
if (executedFile !== undefined && import.meta.url === pathToFileURL(executedFile).href) {
  try {
    main();
  } catch (error: unknown) {
    console.error(error);
    process.exitCode = 1;
  }
}
