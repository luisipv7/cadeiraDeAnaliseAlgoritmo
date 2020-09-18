vetor = [20, 8, 99, 800, 9, 1, 801]

atual = []

for prox in range(len(vetor)):
    # print(vetor[prox])
    ant = prox - 1
    atual = vetor[prox]
    while ant >= 0 and atual < vetor[ant]:
        vetor[ant+1] = vetor[ant]
        ant -= 1
    vetor[ant + 1] = atual

print(vetor)
