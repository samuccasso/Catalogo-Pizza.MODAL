const contador = document.getElementById("contador-carrinho");
const botoes = document.querySelectorAll(".btn-carrinho");
const listaCarrinho = document.getElementById("lista-carrinho");

let carrinho = [];

let quantidade = 0;

botoes.forEach(botao => {

    botao.addEventListener("click", function (event) {

        event.preventDefault();

        quantidade++;

        contador.textContent = quantidade;

        const card = this.closest(".produto");

        const nome = card.querySelector("h2").textContent;

        const preco = card.querySelector(".preco").textContent;

        const existente = carrinho.find(produto => produto.nome === nome);

        if (existente) {

            existente.quantidade++;

        } else {

            carrinho.push({

                nome,
                preco,
                quantidade: 1

            });

        }

        atualizarCarrinho();

        setTimeout(() => {

        }, 300);

    });

});
const modal = document.querySelector("#modal");

function abrirModal() {

    modal.style.display = "flex";

}

function fecharModal() {

    modal.style.display = "none";

}

document.querySelector(".fechar-modal").addEventListener("click", fecharModal);

window.addEventListener("click", (e) => {

    if (e.target == modal) {

        fecharModal();

    }

});

const painelCarrinho = document.querySelector("#carrinho-lateral");

const iconeCarrinho = document.querySelector(".carrinho");

const fecharCarrinho = document.querySelector("#fechar-carrinho");

iconeCarrinho.addEventListener("click", () => {

    painelCarrinho.classList.add("aberto");

});

fecharCarrinho.addEventListener("click", () => {

    painelCarrinho.classList.remove("aberto");

});

function atualizarCarrinho() {

    listaCarrinho.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>
        `;
        return;
    }

    carrinho.forEach((produto, index) => {
        const valor = Number(produto.preco.replace("R$", "").trim());

        total += valor * produto.quantidade;

        listaCarrinho.innerHTML += `
            <div class="item-carrinho">

                <h4>${produto.nome}</h4>

                <span class="preco-item">${produto.preco}</span>

                <div class="controle">

                    <button class="menos" data-index="${index}">-</button>

                    <span>${produto.quantidade}</span>

                    <button class="mais" data-index="${index}">+</button>

                </div>

            </div>
        `;

    });

    document.getElementById("total-carrinho").textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

}

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("mais")) {

        const index = e.target.dataset.index;

        carrinho[index].quantidade++;

        atualizarCarrinho();

    }

    if (e.target.classList.contains("menos")) {

        const index = e.target.dataset.index;

        carrinho[index].quantidade--;

        if (carrinho[index].quantidade <= 0) {

            carrinho.splice(index, 1);

        }

        atualizarCarrinho();

    }

});