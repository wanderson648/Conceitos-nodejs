# 🚀 Sobre o desafio
Aplicação serve para armazenar repositórios de um portfólio. Permite a criação, listagem, atualização e remoção dos repositórios. Também permite que os repositórios possam receber "likes".

# Rotas da aplicação
   . POST /repositories: A rota deve receber title, url e techs dentro do corpo da requisição, sendo a URL o link para o github desse    repositório. Ao cadastrar um novo projeto, ele deve ser armazenado dentro de um objeto no seguinte formato: { id: "uuid", title: 'Desafio Node.js', techs: ["Node.js", "..."], likes: 0 }; Certifique-se que o ID seja um UUID, e de sempre iniciar os likes como 0.
