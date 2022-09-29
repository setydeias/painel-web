# Painel Administrativo Setydeias
Obs: Todos os comandos devem ser executados no `Node.js command prompt`.
## Dependências

* [NodeJS 16.17.1](https://nodejs.org/en/blog/release/v16.17.1// "NodeJS")
* [Npm 8.19.2] - Build tasks
```sh
$ npm install -g npm
```
## Como instalar

### Local

1. Acesse `D:/Instaladores/Setydeias/Painel Web Setydeias` e copie o arquivo `painel-web.rar` para a pasta desejada. Ex:`C:/Setydeias/`
2. Descompacte `painel-web.rar`

### via GitHub

Para clonar o repositório, insira as seguintes linhas de comando no Node.js command prompt:

```sh
$ cd c:/Setydeias/
$ git clone https://github.com/setydeias/painel-web.git
```
Login: setydeias
Senha: "padrão"

## Carregando as dependências

Após clonar o repositório:

```sh
$ cd c:/Setydeias/
$ npm run start
```

Obs: Caso apresente erros relacionados ao Gulp sass, execute os comandos
```sh
$ npm audit fix
$ npm run start
```

## Dicas

1. Sempre após o término desses procedimentos é imprescindível limpar o cache dos navegadores (CTRL + SHIFT + DELETE)
