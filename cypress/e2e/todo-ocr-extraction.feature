# TODO implement: Desafio 2 — Extracao de nota fiscal por OCR
#
# Pre-requisito: implementar a rota /api/receipt-extraction com um provedor de OCR
# (ex: Claude API com vision), concluir extractExpenseFromReceipt() em receipt-upload.ts
# e createExpense() para persistir o resultado no Firestore.
#
# O que testar:
#   - Upload de PDF retorna establishmentName e amount extraidos
#   - Dados extraidos sao mapeados corretamente para a estrutura de Expense
#   - Despesa e salva automaticamente no Firestore apos a extracao
#   - Mensagem "Despesa criada automaticamente a partir da nota fiscal." aparece
#   - Arquivo invalido (CSV, TXT) continua bloqueado antes de chegar na API
#   - API retorna suggestedCategory dentro das categorias validas do sistema

Feature: Extracao de nota fiscal por OCR

  Background:
    # TODO implement: iniciar o app com Firebase e ANTHROPIC_API_KEY configurados
    Given que acesso a pagina inicial

  @todo
  Scenario: Extrai dados de uma nota fiscal em PDF e salva como despesa
    # TODO implement: selecionar um PDF de nota fiscal real com cy.fixture()
    # TODO implement: clicar em "Analisar nota fiscal"
    # TODO implement: verificar que a despesa aparece na lista de lancamentos recentes
    # TODO implement: verificar que o valor extraido e maior que zero
    Given pendente de implementacao
    Then pendente de implementacao

  @todo
  Scenario: A rota de OCR retorna os campos esperados no contrato
    # TODO implement: fazer POST via fetch para /api/receipt-extraction com nota valida
    # TODO implement: verificar que a resposta tem status 200
    # TODO implement: verificar que a resposta contem establishmentName preenchido
    # TODO implement: verificar que amount e um numero maior que zero
    # TODO implement: verificar que suggestedCategory e um dos valores de expenseCategories
    Given pendente de implementacao
    Then pendente de implementacao

  @todo
  Scenario: Exibe mensagem de sucesso apos importar a nota fiscal
    # TODO implement: selecionar arquivo valido e clicar em "Analisar nota fiscal"
    # TODO implement: verificar mensagem "Despesa criada automaticamente a partir da nota fiscal."
    # TODO implement: verificar que o campo de arquivo foi limpo apos o sucesso
    Given pendente de implementacao
    Then pendente de implementacao
