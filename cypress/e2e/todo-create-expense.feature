# TODO implement: Desafio 1 — Persistencia de saidas manuais no Firestore
#
# Pre-requisito: concluir createExpense() em src/services/expense-service.ts
# e configurar as variaveis NEXT_PUBLIC_FIREBASE_* no ambiente de testes.
#
# O que testar:
#   - Despesa salva aparece na lista "Lancamentos recentes" sem recarregar a pagina
#   - Saldo estimado diminui apos salvar a despesa
#   - Formulario e limpo apos o envio bem-sucedido
#   - Mensagem de confirmacao "Despesa cadastrada com sucesso." e exibida
#   - Despesa excluida desaparece da lista em tempo real
#   - Valor negativo ou zero continua bloqueado mesmo com Firestore ativo

Feature: Criacao de saida manual no Firestore

  Background:
    # TODO implement: iniciar o app com variaveis Firebase validas no ambiente de teste
    Given que acesso a pagina inicial

  @todo
  Scenario: Salva uma saida manual com dados validos e exibe na lista
    # TODO implement: preencher titulo com "Mercado semanal"
    # TODO implement: preencher valor com "150.00"
    # TODO implement: selecionar categoria "Alimentacao"
    # TODO implement: clicar em "Salvar despesa"
    # TODO implement: verificar que "Mercado semanal" aparece na lista de lancamentos recentes
    # TODO implement: verificar que o card "Despesas" foi atualizado com o novo total
    Given pendente de implementacao
    Then pendente de implementacao

  @todo
  Scenario: Exibe confirmacao e limpa o formulario apos salvar
    # TODO implement: preencher e submeter o formulario
    # TODO implement: verificar mensagem "Despesa cadastrada com sucesso."
    # TODO implement: verificar que os campos titulo e valor estao em branco
    Given pendente de implementacao
    Then pendente de implementacao

  @todo
  Scenario: Permite excluir uma saida existente da lista
    # TODO implement: verificar que o botao de exclusao esta visivel na lista
    # TODO implement: clicar no botao de excluir da despesa
    # TODO implement: verificar que a despesa foi removida da lista sem recarregar
    Given pendente de implementacao
    Then pendente de implementacao
