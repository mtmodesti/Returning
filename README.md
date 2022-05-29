passar o pendencias para true no usuario quando finalizar compras

# m4-capstone-returning

---

\*\*Rota de criação de usuário

Para a criação de um usuário, acesse a seguinte rota:

#POST BASE_URL/usuarios/criar-usuario

Dados necessário para enviar no corpo da requisição:

{
"email":"seu_email_aqui",
"senha":"sua_senha_aqui",
"cpf":"seu_cpf_aqui",
"nome":"seu_nome_aqui",
"telefone":"seu_telefone_aqui"
}

Caso o email já exista no banco dados, será retornado a mensagem de "mail já existe".
Caso algum campo não seja enviado, será retornado a mensagem de "Dados incorretos".
Outros erros retornarão a mensagem de "Internal Server Error"

---

\*\*Rota de atualização de usuário

Para atualizar um usuário, use a seguinte rota:
PATCH BASE_URL/usuarios/atualizar

Dados necessários
Envie o dados que deseje atualizar e o seu novo valor. Exemplo:

"email":"novo_email"

Você poderá passar mais de um dado case necessário, da seguinte forma:

"email":"novo_email",
"senha":"nova_senha"

O valor de retorno será sempre o usuário com todas as chaves, já atualizadas. Caso você enviei alguma
chave inexistente, será retornado o usuário com o id fornecido como parâmetro na URL e a chave inexistente será desconsiderada.

---

\*\*Rota de deletar usuários

Para deletar um usuário, use a seguinte rota:

PATCH BASE_URL/usuarios/deletar/id_do_usuario

Caso tudo ocorra bem, será retornado uma mensagem de usuário deletado.
Caso passe o id de um usuário inexistente, a mensagem de "internal server" erro será retornada

---

\*\*Rotas de listar usuários:

Os usuários poderão ser listados na seguinte rota.

#get BASE_URL/usuarios
Lista todo os jogos disponíveis na locadora

---

\*\*Rota de login:

Os usuários logados poderão alugar jogos e consoles. Para fazer o login, acesse a seguinte rota:

#POST BASE_URL/login
Nesta rota o usuário cadastrado poderá fazer o login na locadora e recebrá um token para validação

Dados necessário para enviar:

{
"email":"seu_email_aqui",
"senha":"sua_senha_em_string"
}

\*\*Rota de locação de produtos

Para alugar um produto, pode ser jogo ou console, acesse a seguinte rota:

#GET BASE_URL/alugar/:id_do_produto

Dados necessários para enviar:

Você só precisar estar logado com o seu token validado durante o login.

---

\*\*Rota de devolução de produtos

Para devolver um produto, acesse a seguinte rota:

#GET BASE_URL/devolver/:id_do_produto

Dados necessário para a devolução:

{
"observacao":"Descreva_aqui_se_algo_aconteceu_ou_se_não_houve_nada"
}

tabela endereços ok

tabela usuário ok

tabela carrinho ok

tabela pedido
confirmar relação daquela bolinha que deixaram com a tabela pedidos_consoles. esta com dois
carrinho_id
