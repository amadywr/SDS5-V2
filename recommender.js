function recommenderFunction(fields) {
  fields.forEach((field, i) => {
    console.log(i, " ", field)
  })

  let recommendation = []

  if (fields.includes("Law")) {
    recommendation.push("Lawyer")
    recommendation.push("Judge")
  }

  if (fields.includes("IT")) {
    const IT = ["Software Engineering", "Computer Science", "AI"]

    recommendation.push(...IT)
  }

  return recommendation
}

module.exports = recommenderFunction
