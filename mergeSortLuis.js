
let aleatoriosValores = []
let countMErgeSort = 0
let countMerger = 0

for (let index = 0; index < 1000; index++) {
  aleatoriosValores.push(Math.floor(Math.random() * (5000 - 2 + 2) + 2))

}
console.time('tempo')
function mergeSort (array, meio = array.length / 2) {
  countMErgeSort++
  if (array.length < 2) {
    return array
  }

  const left = array.splice(0, meio);

  return merger(mergeSort(left), mergeSort(array))
}

function merger (esquerda, direita) {
  countMerger++
  const arr = [];

  while (esquerda.length && direita.length) {
    if (esquerda[0] < direita[0]) {
      arr.push(esquerda.shift())
    } else {
      arr.push(direita.shift())
    }
  }

  return [...arr, ...esquerda, ...direita];
}

// console.log(mergeSort([10, 5, 3, 8, 2, 6, 4, 7, 9, 1]));
// console.log(aleatoriosValores);
console.log(mergeSort(aleatoriosValores));
console.log('Número de vezes que MergeSort foi chamado: ', countMErgeSort);
console.log('Número de vezes que Merge foi chamado: ', countMerger);
console.timeEnd('tempo');
