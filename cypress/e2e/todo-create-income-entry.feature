# TODO implement: Desafio 1 — Persistencia de entradas no Firestore
#
# Pre-requisito: concluir createIncomeEntry() em src/services/income-entry-service.ts
# e subscribeToIncomeEntries() para sincronizacao em tempo real.
#
# O que testar:
#   - Entrada salva reflete no card "Entradas" sem recarregar
#   - Saldo estimado aumenta apos salvar uma entrada
#   - Formulario e limpo e mensagem de confirmacao aparece
#   - Entradas persistem apos recarregar a pagina (Firestore em tempo real)
#   - Valor zero ou negativo continua bloqueado com Firebase ativo

Feature: Criacao de entrada financeira no Firestore

  Background:
    # TODO implement: iniciar o app com variaveis Firebase validas no ambiente de teste
    Given que acesso a pagina inicial

  @todo
  Scenario: Salva uma entrada e atualiza o card de entradas
    # TODO implement: preencher descricao com "Salario de abril"
    # TODO implement: preencher valor com "5000"
    # TODO implement: selecionar origem "Salario"
    # TODO implement: clicar em "Salvar entrada"
    # TODO implement: verificar que o card "Entradas" exibe o novo total
    # TODO implement: verificar que o saldo estimado aumentou
    Given pendente de implementacao
    Then pendente de implementacao

  @todo
  Scenario: Exibe confirmacao e reseta o formulario apos salvar
    # TODO implement: submeter a entrada com dados validos
    # TODO implement: verificar mensagem "Entrada cadastrada com sucesso."
    # TODO implement: verificar que os campos descricao e valor estao limpos
    Given pendente de implementacao
    Then pendente de implementacao

  @todo
  Scenario: Entradas persistidas aparecem apos recarregar a pagina
    # TODO implement: salvar uma entrada via formulario
    # TODO implement: chamar cy.reload() para recarregar a pagina
    # TODO implement: verificar que o card "Entradas" ainda reflete o valor salvo
    Given pendente de implementacao
    Then pendente de implementacao
