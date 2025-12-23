const campoBusca = document.getElementById("busca");
const sugestoes = document.getElementById("sugestoes");

const formBusca = document.getElementById("searchForm");
const buscarBtn = document.getElementById("buscarBtn");

campoBusca.addEventListener("input", async () => {
    const valor = campoBusca.value;
    if (valor.length > 0) {   // corrigido length
        const response = await fetch(`/sugestoes?q=${valor}`);
        const dados = await response.json();

        sugestoes.innerHTML = "";
        if (dados.length > 0) {
            sugestoes.classList.add("open"); // mostra o bloco
            dados.forEach(servicos => {
                const div = document.createElement("div");
                div.textContent = servicos.nome_servico;
                div.classList.add("suggestion"); // aplica estilo CSS
                div.onclick = () => goToResults(servicos.nome_servico);
                sugestoes.appendChild(div);
            });
        } else {
            sugestoes.classList.remove("open"); // esconde se não houver dados
        }
    } else {
        sugestoes.innerHTML = "";
        sugestoes.classList.remove("open"); // esconde se campo vazio
    }
});

campoBusca.addEventListener("keypress", (e) =>{
    if(e.key === "Enter"){
        goToResults(campoBusca.value);
    }
});


buscarBtn.addEventListener("click", () => {
    goToResults(campoBusca.value);
});


function goToResults(valor){
    window.location.href=`/resultados?q=${valor}`;

}

