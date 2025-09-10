/* 
    AULA 05 -> INDECES

    O que é Indices ? => são estruturas de dados especiais que armazenam
    uma parte dos dados de uma coleção de forma ordenada, o que facilita
    as buscass rápidas;

    Sem Indeces Vs. Com Indeces:
    -> Sem: O MongoDB precisa percorrer todos os documentos para encontrar os resultados;
    -> Com: O MongoDB acessa diretamente os documentos relevantes, reduzindo o tempo de busca;

    DESVANTAGENS DO INDICES: Ele ocupa espaço extra em disco e afetam a performance de escrita, pois sempre
    que um documento é inserido/atualizado, os indices precisam ser ajustados;

    OUTROS INDICES:

    -> INDECES SIMPLES: 
*/