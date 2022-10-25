function recommenderFunction(fields) {
  let recommendation = []

  if (fields.includes("Computers") && fields.includes("Maths")) {
    const result = [
      "63532835dd97fd2b7860a899",
      "63532bb2dd97fd2b7860a8d8",
      "63532becdd97fd2b7860a8e1",
    ]
    recommendation.push(...result)
  } else if (fields.includes("Computers")) {
    const result = ["63532b41dd97fd2b7860a8d2", "63532c18dd97fd2b7860a8e7"]
    recommendation.push(...result)
  } else if (fields.includes("Maths")) {
    const result = ["63533713dd933638643f23c2", "63572cb27a8c7a5bb8cf8024"]
    recommendation.push(...result)
  }

  if (fields.includes("Law") && fields.includes("Maths")) {
    const result = ["6353374add933638643f23c8"]
    recommendation.push(...result)
  }

  if (fields.includes("Health")) {
    const result = [
      "635337d5dd933638643f23df",
      "63533807dd933638643f23e5",
      "6353384ddd933638643f23eb",
    ]
    recommendation.push(...result)
  }
  return recommendation
}

module.exports = recommenderFunction
