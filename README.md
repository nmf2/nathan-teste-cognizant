# Introdução
Este repositório resolve o teste de desenvolvimento da cognizant

# Pré requisitos
 É possível executar o projeto diretamente com o Node.js 14 ou com o Docker. 
 Instale um dos dois dependendo da forma como queira executar. Links úteis:
 * (https://nodejs.org/)[https://nodejs.org/]
 * (https://docs.docker.com/get-docker/)[https://docs.docker.com/get-docker/]

# Primeiros Passos
Clonar o repositório: 
```
git clone https://github.com/nmf2/nathan-teste-cognizant.git
```
___
## Para rodar com o Node.js 14
Instalar as dependências do npm:
```
npm install
```

Rodar o server:
```
npm run dev
```

## Para rodar com o Docker
Executar build da imagem e rodar o container:
```
npm run docker
```

____
Assim que o server estiver pronto o console emitirá  a seguinte mensagem:
```
Server up and runnig on port 3000
```

# Utilização
Quando o server estiver pronto é possível testá-lo apenas acessando o seguinte 
endereço:
```
http://localhost:3000/api-explorer
```

Para testar os endpoints individualmente apenas é necessário clicar em 
"*Try it out*" e preencher as informações necessárias para cada endpoint e 
clicar em *Execute*.

Por exemplo: ![Exemplo](https://imgur.com/oY4LwnP.png)

# Descrição da estrutura do projeto

```
├── dist                        -- Pasta onde fica o resultado do build
│   ├── api.yaml
│   └── server.js
├── node_modules
├── public                      -- Pasta reservada para assets necessários para 
|                                  página de documentação "/api-explorer"
├── src                         -- Código fonte
│   ├── resources               -- Definição de recursos
│   │   ├── image
│   │   │   ├── controller.js   -- Tratamento de erros e resposta da requisição
│   │   │   ├── service.js      -- Lógica para calcular valores
│   │   │   └── router.js       -- Rota do endpoint de imagem
│   │   └── messages
│   │       ├── controller.js   -- Tratamento de erros e resposta da requisição
│   │       ├── service.js      -- Lógica para ler o log da corrida e gerar as 
│   │       │                      estatísticas
│   │       └── router.js       -- Rotas dos endpoints de corrida de super-herói
│   ├── api.yaml                -- Documentação da API seguindo o OpenAPI 3 
│   │                              (i.e. evolução do Swagger 2.0)
│   ├── index.js                -- Inicialização do server e dos recursos
│   └── routes.js               -- Definição de rotas base para os recursos
├── Dockerfile
├── jsconfig.json
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

# Pontos importantes
 * Utilizando o arquivo api.yaml é possível definir como as requisições devem ser
feitas e garantir que os parâmetros que virão no body/query/path da requisição 
estarão no formato esperado pelo controller (com a utilização do middleware openapi-validator).
 * Os controllers têm a lógica de manipular o banco e responder a requisição.
 * Os routers definem os parâmetros da rota atual e possíveis middlewares para endpoints específicos
 * A primeira e segunda questão estão resolvidas no endpoint /image/bulk/count-values
 * A terceira está no endpoint /super-hero-race/stats
