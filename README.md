# 📌 Guia de Execução do Projeto

Este repositório contém as instruções necessárias para configurar e rodar a aplicação localmente ou via **GitHub Codespaces**.

---

## 🚀 Como Executar o Projeto

Você pode rodar este projeto localmente clonando o repositório ou abrindo-o diretamente através do **Code Space**.

### 1. Instalação das Dependências

Abra o terminal na raiz do projeto e execute o comando abaixo para instalar as dependências necessárias (incluindo Flask, MySQL driver e dotenv):

```bash
pip install -r requirements.txt
```

---

### 2. Configuração do Ambiente (.env)

Na raiz do projeto, crie um arquivo chamado `.env`.

> ⚠️ **Atenção:** Este arquivo contém credenciais sensíveis e de acesso ao banco de dados, por isso não é enviado para o GitHub. É necessária a sua criação manual sempre que for executar o projeto em um novo ambiente.

Adicione as configurações e acessos do seu banco de dados dentro do arquivo `.env`:

```env
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

* **Banco de Dados:** Os acessos podem ser substituídos caso um novo banco de dados precise ser utilizado. O script de criação do banco e as inserções de dados realizadas constam no arquivo `BD.TXT`.

---

### 3. Executando a Aplicação

Com o ambiente configurado e as dependências instaladas, execute a aplicação no terminal:

```bash
python app.py
```

Após o comando ser executado, acesse o link com a porta criada que será exibido no terminal (ex: `http://127.0.0.1:5000`).
