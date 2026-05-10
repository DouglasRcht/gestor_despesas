Feature: Painel de upload de nota fiscal

  Background:
    Given que acesso a pagina inicial

  Scenario: Renderiza o titulo do painel de upload
    Then vejo o heading "Saida por leitura de PDF ou imagem"

  Scenario: Exibe os tipos de arquivo aceitos
    Then vejo o texto "PDF, JPG, PNG ou WEBP"

  Scenario: Exibe o botao de analisar nota fiscal
    Then vejo o botao "Analisar nota fiscal"

  Scenario: Exibe o nome do arquivo apos selecionar um PDF valido
    When seleciono o arquivo "nota-mercado.pdf" do tipo "application/pdf"
    Then vejo o texto "Arquivo pronto para analise:"
    And vejo o texto "nota-mercado.pdf"

  Scenario: Exibe erro ao selecionar arquivo com tipo invalido
    When seleciono o arquivo "planilha.csv" do tipo "text/csv"
    Then vejo o alerta "Envie um arquivo em PDF, JPG, PNG ou WEBP."
