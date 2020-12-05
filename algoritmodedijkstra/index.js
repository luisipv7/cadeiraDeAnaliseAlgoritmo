const fs = require('fs')

async function iniciar () {
  const graphMin = {
    inicio: { A: 5, B: 2 },
    A: { C: 4, F: 2 },
    B: { A: 8, D: 7 },
    C: { D: 6, fim: 10 },
    D: { E: 2, fim: 2 },
    E: { G: 1, fim: 5 },
    G: { fim: 7 },
    fim: {}
  };

  const graphMid = {
    inicio: { A: 5, B: 2 },
    A: { C: 4, D: 2 },
    B: { E: 8, F: 7 },
    C: { G: 6, H: 10 },
    D: { L: 2, M: 2 },
    E: { N: 1, O: 5 },
    F: { fim: 3, G: 8 },
    H: { fim: 1 },
    L: { H: 7, fim: 10 },
    M: { G: 4, fim: 1 },
    G: { N: 4, fim: 1 },
    N: { O: 9, fim: 1 },
    O: { fim: 5 },
    fim: {}
  };

  const graphBig = {
    inicio: { A: 5, B: 2 },
    A: { C: 4, D: 2 },
    B: { E: 8, F: 7 },
    C: { G: 6, H: 10 },
    D: { L: 2, M: 2 },
    E: { N: 1, O: 5 },
    F: { L: 9, G: 8 },
    G: { P: 7, Q: 6 },
    H: { I: 6, J: 7 },
    I: { K: 15, R: 9 },
    J: { S: 5, R: 8 },
    K: { T: 7, fim: 8 },
    L: { M: 5, P: 50 },
    P: { K: 9, T: 8 },
    R: { fim: 5 },
    fim: {}
  };


  /*
  
  TODO: Criar gráfico
  
  
  */
  const graphDraw = drawGraph(graphBig)



  console.time('dijkstra')
  const data = dijkstra(graphBig, graphDraw)
  console.timeEnd('dijkstra')
  console.log('dijkstra', data);

}

console.time('tempototal')
iniciar()
console.timeEnd('tempototal')


function dijkstra (graph, drawGraph) {
  console.log('Graph: ')
  console.log(graph)
  console.log('drawGraph: ')
  console.log(drawGraph)

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
}

function findMenorNo (valor, processado) {
  {
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
}

function drawGraph (graph) {
  const objeArry = Object.entries(graph)
  let graphInital = []
  let drawGraph = ''

  for (let index = 0; index < objeArry.length; index++) {

    graphInital = objeArry[index]
    graphInital.push(Object.entries(objeArry[index][1]));

    drawGraph += JSON.stringify((graphInital[2][0] !== undefined ? objeArry[index][0] + '-->' + '|' : '') + (graphInital[2][0] ? (graphInital[2][0]).reverse() : '')).replace(',', '|') + '\n'
    drawGraph += JSON.stringify((graphInital[2][1] !== undefined ? objeArry[index][0] + '-->' + '|' : '') + (graphInital[2][1] ? (graphInital[2][1]).reverse() : '')).replace(',', '|') + '\n'

  }

  return drawGraph
}
