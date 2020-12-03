var items = [5, 3, 7, 6, 2, 9, 8, 2, 4, 10];

// for (let index = 0; index < 1000; index++) {
//   items.push(Math.floor(Math.random() * (5000 - 2 + 2) + 2))

// }

console.time('tempoquickSort')
function quickSort (itens, esq, dir) {
  var index;
  if (itens.length > 1) {
    index = particionar(itens, esq, dir); //índice retornado da partição
    if (esq < index - 1) { //mais elementos no lado esquerdo do pivô 
      quickSort(itens, esq, index - 1);
    }
    if (index < dir) { //mais elementos no lado esquerdo do pivô 
      quickSort(itens, index, dir);
    }
  }
  return itens;
}
console.timeEnd('tempoquickSort')

// primeira chamada para classificação rápida 
console.time('tempoTotal')
var sortedArray = quickSort(items, 0, items.length - 1);
console.timeEnd('tempoTotal');
console.log(sortedArray); //prints [2,3,5,6,7,9]

console.time('tempoParticionar')
function particionar (itens, esq, dir) {
  var pivo = itens[Math.floor((dir + esq) / 2)], //valor de meio
    i = esq, //ponteiro da esquerda
    j = dir; //ponteiro da direita
  while (i <= j) {
    while (itens[i] < pivo) {
      i++;
    }
    while (itens[j] > pivo) {
      j--;
    }
    if (i <= j) {
      troca(itens, i, j); //trocando dois elementos
      i++;
      j--;
    }
  }
  return i;
}
console.time('tempoParticionar')

console.time('tempoTroca')
function troca (itens, esqindex, driIndesx) {
  var temp = itens[esqindex];
  itens[esqindex] = itens[driIndesx];
  itens[driIndesx] = temp;
}
console.timeEnd('tempoTroca')
