# Projeto WikiLibras (Wikilibras Backend)

Este projeto é uma aplicação web desenvolvida por alunos do Bootcamp de Desenvolvimento Web da IronHack, com foco no desenvolvimento de ferramentas tecnológicas que possam contribuir com a administração pública.

A WikiLibras e um site interativo e colaborativo Libras / Português que tá cmo um repositório de termos nas duas línguas. Tem o objetivo de ser alimentado elos próprios usuários, valorizando o regionalismo e interação entre as duas línguas.

O público alvo desse projeto é a comunidade surda como um todo, uma vez que passe a ser uma referência na busca por um sinal (em Libras) ou uma palavra (em Português), ou ainda o significado de um termo. Todavia, qualquer pessoa que queira mais contato com uma ou outra língua tem uma boa experiência com o site WikiLibras.

## Repositórios e links do Projeto 

O projeto está online e foi deployado: https://wikilibras-server.cyclic.app/

O projeto Front-end que alimenta essa aplicação consta no repostório: https://github.com/ramontcruz/wikilibras-client

O projeto Front-end deployado dessa aplicação consta no link: https://wikilibras-client.netlify.app/

## Funcionalidades e Demonstração da Aplicação

Uma vez realizado cadastro e login no site, o usuário poderá contribuir com a inclusão de termos e com a edição de um termo já existente na página. A proposta é que a biblioteca de termos possa crescer a cada dia, formando m grande banco de termos, de diferentes partes do país.
Aos usuários ainda não cadastrados ficam disponíveis as funcionalidades de consulta termos já existentes e a página de cada sinal, com seus detalhes. E apenas os administradores podem excluir sinais já inseridos no site.

## Rotas do servidor

### Usuário

 POST /user/sign-up (cria um usuário)
 
 POST /user/login (login de usuário)
 
 GET /user/all-users (retorna todos usuários cadastrados)
 
 GET /user/:id (retorna o usuário específico)
 
 DELETE /user/:id [rota protegida] (apaga o usuário específico)
 
 PUT /user/:id [rota protegida] (edita o usuário específico)
 
 GET /user/profile (perfil de usuário)
 
### Termos

POST /termo/new-termo (cria um termo)
 
 GET /termo/all-termos (retorna todos termos cadastrados)
 
 GET /termo/termo/:id (retorna o termo específico)
 
 DELETE /termo/:id [rota protegida] (apaga o usuário específico)
 
 PUT /termo/:id [rota protegida] (edita o termo específico)
 
 
## Tecnologias utilizadas

HTML
CSS
JavaScryt
React js
Node js
MongoDB
Disponibilizado pelo Netlify
Back-end onlne via Cyclic

## Pessoas Contribuidoras

Professores e TAs da IronHack.

## Pessoas Desenvolvedoras do Projeto

André Licks – https://github.com/aclicks

Angélica Rodrigues Gonçalves – https://github.com/angelicarg

Guilherme Oliveira – https://github.com/guiolive

Ramon Torres Cruz – https://github.com/ramontcruz

## Status do Projeto 

Online, concluído e disponível a acesso.
https://wikilibras-server.cyclic.app/
