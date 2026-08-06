# Anleitung zur TypeScript-Übung "Embeddings"

## Ziel der Übung

In dieser Übung arbeitet ihr euch schrittweise von einfachen, selbstgebauten
Vektoren zu echten OpenAI-Embeddings vor:

1. Texte in Tokens zerlegen
2. One-Hot-Encoding und Bag of Words verstehen
3. Cosine Similarity berechnen
4. Grenzen von Bag of Words beobachten
5. dieselben Texte mit OpenAI embeddieren
6. die Similarity-Werte vergleichen

Am Ende steht ein kleines TypeScript-Programm, das dieselben Satzpaare mit zwei
verschiedenen Embedding-Strategien gegenüberstellt.

## Voraussetzungen

- Node.js 22 oder neuer
- npm
- für `ex-2` und `main`: OpenAI API Key

## Installation

Abhängigkeiten reproduzierbar aus der mitgelieferten Lock-Datei installieren:

```bash
npm ci
```

Wenn ihr Abhängigkeiten bewusst aktualisieren und dabei die Lock-Datei anpassen
möchtet, verwendet stattdessen:

```bash
npm install
```

## API-Key setzen

Für `ex-2` und `main` wird ein OpenAI API Key benötigt.

Unter macOS und Linux:

```bash
export OPENAI_API_KEY="<dein-key>"
```

Unter Windows PowerShell:

```powershell
$env:OPENAI_API_KEY="<dein-key>"
```

## Arbeitsweise

Dieses Repository enthält:

- den Branch `ex-1` mit der ersten Übung zu manuellen Vektoren
- den Branch `ex-2` mit der gelösten Übung 1 und einer neuen Übung zu OpenAI-Embeddings
- den Branch `main` mit der vollständigen Referenzlösung

Wichtig:

- `// TODO`-Texte und `// SO PRÜFST DU ES` sind auf Deutsch
- Klassen-, Funktions- und Variablennamen bleiben Englisch

## Branch-Ablauf

### 1) Übungs-Branch: `ex-1`

```bash
git checkout ex-1
```

Sucht TODOs nach `ÜBUNG 1`.

Inhaltlich:

- Vokabular aus mehreren Texten aufbauen
- einen Token per One-Hot-Encoding darstellen
- einen Text als Bag-of-Words-Vektor abbilden
- Cosine Similarity zwischen zwei Textvektoren berechnen
- beobachten, wo Bag of Words an Grenzen stößt

Testidee:

- App starten
- prüfen, dass für mehrere Satzpaare Bag-of-Words-Scores ausgegeben werden
- beobachten, dass Synonyme schwach erkannt werden
- beobachten, dass Wortreihenfolge bei Bag of Words verloren geht

### 2) Übungs-Branch: `ex-2`

```bash
git checkout ex-2
```

Sucht TODOs nach `ÜBUNG 2`.

Inhaltlich:

- Texte mit dem OpenAI-TypeScript-SDK embeddieren
- Cosine Similarity für die Embeddings berechnen
- Bag of Words und OpenAI-Embeddings direkt vergleichen

Testidee:

- App starten
- beobachten, dass semantisch ähnliche Satzpaare mit OpenAI oft näher zusammenliegen als bei Bag of Words

### 3) Referenzlösung: `main`

```bash
git checkout main
```

`main` enthält die vollständige, lauffähige Lösung.

## Anwendung starten

```bash
npm start
```

Das npm-Skript führt dabei explizit diese Datei aus:

```bash
npx tsx src/embeddingExercise/embeddingApplication.ts
```

Auf `ex-2` und `main` muss zuvor `OPENAI_API_KEY` gesetzt sein. `ex-1`
benötigt keinen API-Key.

## Nützliche Kommandos

TypeScript-Typen prüfen:

```bash
npm run check
```

JavaScript nach `dist/` bauen und ausführen:

```bash
npm run build
npm run start:compiled
```

TODOs finden:

```bash
rg "ÜBUNG" src
```

Status prüfen:

```bash
git status
git diff
```

Branch wechseln:

```bash
git checkout <branch-name>
```

## Wichtige Dateien

- `src/embeddingExercise/embeddingApplication.ts`
  - Startpunkt und Konsolenausgabe
- `src/embeddingExercise/manualEmbeddingService.ts`
  - One-Hot-Encoding, Bag of Words und Cosine Similarity
- `src/embeddingExercise/openAiEmbeddingService.ts`
  - OpenAI-Embeddings für dieselben Texte

## Abschluss

Wenn die TODOs in `ex-1` und `ex-2` gelöst sind, kann mit folgendem Stand
verglichen werden:

```bash
git checkout main
```

