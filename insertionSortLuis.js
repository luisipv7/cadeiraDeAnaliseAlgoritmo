let vetor = [20, 8, 99, 800, 9, 1]
let atual = []
let newValue = window.prompt('insira um valor')

vetor.push(Number(newValue))

console.log(vetor);

for (let ant = 1; ant < vetor.length; ant++) {
  let prox = ant - 1
  atual = vetor[ant]
  for (prox >= 0; atual < vetor[prox]; prox--) {
    vetor[prox + 1] = vetor[prox]
  }
  vetor[prox + 1] = atual
}

console.log(vetor)
