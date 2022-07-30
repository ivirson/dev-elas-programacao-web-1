# Módulo 10 - Programação Web I - Aula 03

## Classes de resposta do HTTP

- **1xx** - Informação
- **2xx** - Status de sucesso
- **3xx** - Categoria de redirecionamento
- **4xx** - Erro no Cliente
- **5xx** - Erro no server

&nbsp;

_2xx Sucesso_

| Código                    | Descrição                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **1xx Informação**        |
| Não são muito utilizados  |
| **2xx Sucesso**           |
| 200 Ok                    | Requisição foi bem sucedida                                                                                                             |
| 201 Created               | Requisição foi bem sucedida e um novo recurso foi criado. Utilizado para a resposta do POST                                             |
| 202 Accepted              | Indica que o servidor aceitou a request. Utilizado para processos assíncronos                                                           |
| 204 No Content            | Requisição bem sucedida, mas sem conteúdo para ser retornado. Utilizado para PUT, PATCH e DELETE e quando o GET não retornou resultados |
| **3xx Redirecionamento**  |
| Não são muito utilizados  |
| **4xx Erro no cliente**   |
| 400 Bad Request           | Solicitação não foi processada, pois o servidor não entendeu o que o cliente está solicitando                                           |
| 401 Unauthorized          | Cliente não autenticado e não tem autorização para acessar o recurso                                                                    |
| 403 Forbidden             | Cliente autenticado e requisição é válida, mas o cliente não tem permissão para aquele recurso                                         |
| 404 Not Found             | Recurso não localizado                                                                                                                  |
| **5xx Erro no servidor**  |
| 500 Internal Server Error | Houve uma falha e o servidor não conseguiu processar a requisição                                                                       |
| 503 Service Unavailable   | Serviço indisponível                                                                                                                    |

## Bibliografia

- [Trabalhar com cabeçalhos HTTP no Express](https://flaviocopes.com/express-headers/)
- [Cabeçalhos HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)
- [Respostas de erro do Cliente](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)
- [API RESTful - Boas práticas](https://www.brunobrito.net.br/api-restful-boas-praticas/)
- [PUG Npm](https://www.npmjs.com/package/pug)
- [Server-Side Rendering with Pug Templates](https://medium.com/@SigniorGratiano/server-side-rendering-with-pug-templates-e1e5947d4c1a)
- [Node.js Server Side Rendering (SSR) using EJS](<https://www.geeksforgeeks.org/node-js-server-side-rendering-ssr-using-ejs/#:~:text=Server%2Dside%20rendering%20(SSR),SPA%20can%20operate%20as%20normal.>)
- [Single Page (SPA) vs Server Side Rendering (SSR)](https://www.youtube.com/watch?v=DyBiFZn9Cn4)
