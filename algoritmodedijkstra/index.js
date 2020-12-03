const fs = require('fs')


async function iniciar () {
  const graph = {
    inicio: { A: 5, B: 2 },
    A: { C: 4, F: 2 },
    B: { A: 8, D: 7 },
    C: { D: 6, fim: 3 },
    D: { E: 2, fim: 2 },
    E: { fim: 1, F: 5 },
    F: { G: 1 },
    G: { fim: 7 },
    fim: {}
  };

  const objeArry = Object.entries(graph)
  let graphInital = []
  let drawGraph = ''

  for (let index = 0; index < objeArry.length; index++) {

    graphInital = objeArry[index]
    graphInital.push(Object.entries(objeArry[index][1]));

    drawGraph += JSON.stringify((graphInital[2][0] !== undefined ? objeArry[index][0] + '-->' + '|' : '') + (graphInital[2][0] ? (graphInital[2][0]).reverse() : '')).replace(',', '|') + '\n'
    drawGraph += JSON.stringify((graphInital[2][1] !== undefined ? objeArry[index][0] + '-->' + '|' : '') + (graphInital[2][1] ? (graphInital[2][1]).reverse() : '')).replace(',', '|') + '\n'

  }
  console.log('Desenho do grafoInicial: ', drawGraph);


  const findMenorNo = (valor, processado) => {
    const noConhecido = Object.keys(valor)

    const menorNo = noConhecido.reduce((menor, node) => {
      if (menor === null && !processado.includes(node)) {
        menor = node;
      }
      if (valor[node] < valor[menor] && !processado.includes(node)) {
        menor = node;
      }
      return menor;
    }, null);

    return menorNo
  };

  console.time('dijkstra')
  const dijkstra = async (graph) => {
    console.log('Graph: ')
    console.log(graph)

    const rastreioValor = Object.assign({ fim: Infinity }, graph.inicio);
    console.log('Initial `valor`: ')
    console.log(rastreioValor)


    const rastreioPai = { fim: null };
    for (let filho in graph.inicio) {
      rastreioPai[filho] = 'inicio';
    }
    console.log('Initial `pais`: ')
    console.log(rastreioPai)

    const processadoNodes = [];

    let node = findMenorNo(rastreioValor, processadoNodes);
    console.log('Initial `node`: ', node)

    console.log('inicio dos loops: ')
    while (node) {
      console.log(`***** 'Nó Atual': ${node} *****`)
      let custoParaAlcancarNo = rastreioValor[node];
      let noFilho = graph[node];

      for (let filho in noFilho) {
        let custoParaNoFilho = noFilho[filho]
        let costTofilho = custoParaAlcancarNo + custoParaNoFilho;

        if (!rastreioValor[filho] || rastreioValor[filho] > costTofilho) {
          rastreioValor[filho] = costTofilho;
          rastreioPai[filho] = node;
        }

        console.log('`rastreioValor`', rastreioValor)
        console.log('`rastreioPai`', rastreioPai)
        console.log('----------------')
      }

      processadoNodes.push(node);

      node = findMenorNo(rastreioValor, processadoNodes);
    }
    console.log('while loop ends: ')

    let melhorResultado = ['fim'];
    let pai = rastreioPai.fim;
    while (pai) {
      melhorResultado.push(pai);
      pai = rastreioPai[pai];
    }
    melhorResultado.reverse();

    const results = {
      distance: rastreioValor.fim,
      path: melhorResultado
    };

    const final = results.path.join('-->')
    const graficoFinal = ` <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script> Problema inicial: <br> <div class="mermaid" >\ngraph LR \n ${drawGraph.replace(/"/g, "")} </div>  \n<br> Solução:  \n   <div class="mermaid"> \ngraph LR \n ${final} \n</div>`

    fs.writeFileSync('./home.html', graficoFinal)

    return results;
  };
  console.timeEnd('dijkstra')


  console.log('dijkstra', dijkstra(graph));

}

console.time('tempototal')
iniciar()
console.timeEnd('tempototal')
