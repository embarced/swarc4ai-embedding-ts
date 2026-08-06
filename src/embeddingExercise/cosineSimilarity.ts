export function calculateCosineSimilarity(
  leftVector: readonly number[],
  rightVector: readonly number[],
): number {
  if (leftVector.length !== rightVector.length) {
    throw new Error("Die Vektoren müssen dieselbe Länge haben.");
  }

  let dotProduct = 0;
  let leftNorm = 0;
  let rightNorm = 0;

  for (let index = 0; index < leftVector.length; index += 1) {
    const leftValue = leftVector[index] ?? 0;
    const rightValue = rightVector[index] ?? 0;
    dotProduct += leftValue * rightValue;
    leftNorm += leftValue * leftValue;
    rightNorm += rightValue * rightValue;
  }

  if (leftNorm === 0 || rightNorm === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm));
}

