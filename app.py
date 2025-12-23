from flask import Flask, render_template, request, jsonify
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("host"),
        user=os.getenv("user"),
        password=os.getenv("password"),
        database=os.getenv("database"),
    )

@app.route("/")
def index():
    return render_template("index.html")


#rotas das sugestões trazidas pelo fetch
@app.route("/sugestoes")
def sugestoes():
    termo = request.args.get("q","")
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "select id_servico, nome_servico from servicos where nome_servico like %s limit 5 ",
        (f"%{termo}%",)

    )
    resultados = cursor.fetchall()
    conn.close()
    return jsonify(resultados)


# Página de resultados (lista de itens parecidos)
@app.route("/resultados")
def resultados():
    termo = request.args.get("q", "")
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "select id_servico, nome_servico, descricao from servicos where nome_servico like %s ",
        (f"%{termo}%",)
    )
    servicos = cursor.fetchall()
    conn.close()
    return render_template("results.html", termo=termo, servicos=servicos)


@app.route("/detalhe/<int:id_servico>")
def detalhe(id_servico):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "select *from servicos where id_servico = %s ",
        (id_servico,)
    )
    servico = cursor.fetchone()
    conn.close()
    return render_template("info2.html", servico = servico)

@app.route("/adicionais/<int:id_servico>")
def adicionais(id_servico):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "select *from servicos where id_servico = %s ",
        (id_servico,)
    )
    servico = cursor.fetchone()
    conn.close()
    return render_template("adicionais.html", servico = servico)




# Executa a aplicação
if __name__ == "__main__":
    app.run(debug=True)