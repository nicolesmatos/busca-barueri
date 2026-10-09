# 🔍 Busca-Barueri

O **Busca-Barueri** é uma plataforma centralizada que otimiza o acesso aos serviços oferecidos pela **Secretaria dos Direitos da Pessoa com Deficiência (SDPD)**. Atuando como um motor de busca intuitivo e eficiente, a solução facilita a consulta e a navegação pelas informações e serviços prestados pela secretaria.

O projeto foi desenvolvido no âmbito das atividades prestadas para a **Secretaria de Inovação e Tecnologia (CIT - Barueri)** durante o programa de estágio em 2025.

---

## 🚀 Como Executar o Projeto

Você pode rodar este projeto localmente clonando o repositório ou executando-o através do **GitHub Codespaces**.

### 1. Instalação das Dependências

Abra o terminal na raiz do projeto e execute o comando abaixo para instalar os pacotes necessários (como Flask, drivers de conexão com o MySQL e `python-dotenv`):

```bash
pip install -r requirements.txt
```

### 2. Configuração das Variáveis de Ambiente (`.env`)

Na raiz do projeto, crie um arquivo chamado `.env`.

> ⚠️ **Atenção:** Este arquivo armazena credenciais sensíveis e parâmetros de conexão com o banco de dados. Por motivos de segurança, ele é mantido no `.gitignore` e não deve ser commitado no GitHub. É necessário criá-lo manualmente ao configurar o ambiente.

Adicione as credenciais de acesso ao banco de dados no arquivo `.env`:

```env
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

* 🗄️ **Banco de Dados:** As credenciais podem ser ajustadas conforme a necessidade do ambiente. O script SQL de criação de tabelas e as inserções iniciais necessárias para o funcionamento do projeto constam no arquivo `BD.TXT`.

### 3. Execução da Aplicação

Com as dependências instaladas e as variáveis de ambiente configuradas, inicie a aplicação executando:

```bash
python app.py
```

Após a inicialização do servidor, acesse a URL disponibilizada no terminal (por padrão: `http://127.0.0.1:5000`) para visualizar e interagir com a plataforma no navegador.
