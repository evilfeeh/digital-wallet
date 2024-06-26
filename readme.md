# Digital Wallet

<img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/evilfeeh/digital_wallet/node.js.yml"> <a href="https://app.codacy.com/gh/evilfeeh/digital-wallet/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage"><img alt="test coverage" src="https://app.codacy.com/project/badge/Coverage/74c08c426d074b51a7454ca1d5c4576e"/></a> <a href="https://app.codacy.com/gh/evilfeeh/digital-wallet/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img alt="codacy quality test" src="https://app.codacy.com/project/badge/Grade/74c08c426d074b51a7454ca1d5c4576e"/></a>

Este projeto foi feito como prática do desenvolvimento de software a partir de um teste tecnico de um banco digital.

## O Problema

Temos 2 tipos de usuários, os comuns e lojistas, ambos têm carteira com dinheiro e realizam transferências entre eles. Vamos nos atentar **somente** ao fluxo de transferência entre dois usuários.

Requisitos:

- Para ambos tipos de usuário, precisamos do Nome Completo, CPF, e-mail e Senha. CPF/CNPJ e e-mails devem ser únicos no sistema. Sendo assim, seu sistema deve permitir apenas um cadastro com o mesmo CPF ou endereço de e-mail.

- Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários.

- Lojistas **só recebem** transferências, não enviam dinheiro para ninguém.

- Validar se o usuário tem saldo antes da transferência.

- Antes de finalizar a transferência, deve-se consultar um serviço autorizador externo.

- A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o dinheiro deve voltar para a carteira do usuário que envia.

- No recebimento de pagamento, o usuário ou lojista precisa receber notificação (envio de email, sms) enviada por um serviço de terceiro e eventualmente este serviço pode estar indisponível/instável.

- Este serviço deve ser RESTFul.

### Payload

Faça uma **proposta** :heart: de payload, se preferir, temos uma exemplo aqui:

POST /transaction

```json
{
    "value": 100.0,
    "payer": 4,
    "payee": 15
}
```

## Executando a Aplicação

Este projeto foi construído em Typescript e possui uma `docker-compose` com duas imagens:

- 1 instancia do projeto
- 1 instancia de banco de dados

Para executar, Crie um arquivo .env a partir do arquivo .env.sample e execute o comando

```bash
    docker compose up
```

Acesse a url `http://localhost:<port>` para acesso a documentação das rotas da api
