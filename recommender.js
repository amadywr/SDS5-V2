function recommenderFunction(fields) {

  let recommendation = []

  if(fields.includes('Computers') && fields.includes("Maths")){

    const result = ["63529a5b31209c390001a0a6", "63532835dd97fd2b7860a899", "63532b41dd97fd2b7860a8d2", "63532bb2dd97fd2b7860a8d8", "635336eadd933638643f23bc", "63533713dd933638643f23c2"]
    recommendation.push(...result)

  } else if (fields.includes('Computers')){

    const result = ["63529a5b31209c390001a0a6", "63532b41dd97fd2b7860a8d2", "63532c18dd97fd2b7860a8e7"]
    recommendation.push(...result)

  } else if (fields.includes('Maths')){

    const result = ["63533713dd933638643f23c2", "635336eadd933638643f23bc"]
    recommendation.push(...result)

  } 

  if(fields.includes('Health')){

    const result = ["6353384ddd933638643f23eb", "63533807dd933638643f23e5", "635337d5dd933638643f23df"]
    recommendation.push(...result)

  } 
  return recommendation
}

module.exports = recommenderFunction
