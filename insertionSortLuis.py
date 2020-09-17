vetor = [20, 8, 99, 800, 9, 1, 801]

atual = []

for ant in range(len(vetor)):
    # print(vetor[ant])
    prox = ant - 1
    atual = vetor[ant]
    while prox >= 0 and atual < vetor[prox]:
        vetor[prox+1] = vetor[prox]
        prox -= 1
    vetor[prox + 1] = atual

print(vetor)
