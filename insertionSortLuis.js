let vetor = [20, 8, 99, 800, 9, 1]
let atual = []
let newValue = window.prompt('insira um valor')

vetor.push(Number(newValue))

console.log(vetor);

for (let prox = 1; prox < vetor.length; prox++) {
  let ant = prox - 1
  atual = vetor[prox]
  for (ant >= 0; atual < vetor[ant]; ant--) {
    vetor[ant + 1] = vetor[ant]
  }
  vetor[ant + 1] = atual
}

console.log(vetor)
