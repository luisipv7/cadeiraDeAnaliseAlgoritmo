
import random
import timeit

x = 100
vetor = [20, 8, 99, 800, 9, 1, 801]
vetor = random.sample(range(5000000000000000), x)

atual = []
passos = 0
inicio = timeit.default_timer()

for prox in range(1, len(vetor)):
    # print(vetor[prox])
    ant = prox - 1
    atual = vetor[prox]
    while ant >= 0 and atual < vetor[ant]:
        passos = passos + 1
        vetor[ant+1] = vetor[ant]
        ant -= 1
    vetor[ant + 1] = atual
fim = timeit.default_timer()
print('tempo...: %f ' % (fim - inicio))
print('número de passos: %d ' % passos)

print(vetor)
