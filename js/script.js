
document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".track__play");
    const player = document.querySelector("#spotify-embed");
    const status = document.querySelector("#spotify-status");

    botoes.forEach((botao) => {
        botao.addEventListener("click", () => {
            const url = botao.dataset.spotifySrc;

            // Confere se o endereço é um embed válido do Spotify.
            if (
                !url ||
                !/^https:\/\/open\.spotify\.com\/embed\/track\/[A-Za-z0-9]+(?:\?|$)/.test(url)
            ) {
                status.textContent =
                    "Não foi possível carregar esta faixa. Confira o link do Spotify.";
                return;
            }

            const faixa = botao.closest(".track");
            const titulo = faixa.querySelector(".track__title").textContent;
            const artista = faixa.querySelector(".track__artist").textContent;

            // Cria o player oficial do Spotify.
            const iframe = document.createElement("iframe");

            iframe.src = url;
            iframe.title = `Spotify: ${titulo} — ${artista}`;
            iframe.width = "100%";
            iframe.height = "152";
            iframe.loading = "lazy";
            iframe.allow =
                "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.borderRadius = "12px";
            iframe.style.border = "0";

            // Substitui a música que estava selecionada.
            player.replaceChildren(iframe);

            status.textContent = `Música selecionada: ${titulo}`;

            // Indica visualmente qual faixa foi escolhida.
            botoes.forEach((outroBotao) => {
                outroBotao.classList.remove("track__play--selected");
            });

            botao.classList.add("track__play--selected");
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const listas = document.querySelectorAll(".track-list");

    listas.forEach((lista) => {
        const musicas = lista.querySelectorAll(".track");
        const cabecalho = lista.previousElementSibling;

        musicas.forEach((musica, indice) => {
            const numero = String(indice + 1).padStart(2, "0");

            // Atualiza o número exibido na música
            const numeroElemento = musica.querySelector(".track__number");

            if (numeroElemento) {
                numeroElemento.textContent = numero;
            }

            // Mantém o atributo data-track sincronizado
            musica.dataset.track = indice + 1;

            // Atualiza o nome acessível do botão
            const botao = musica.querySelector(".track__play");

            if (botao) {
                botao.setAttribute(
                    "aria-label",
                    `Selecionar música ${numero}`
                );
            }
        });

        // Atualiza a quantidade de músicas da categoria
        if (cabecalho?.classList.contains("tracklist__heading")) {
            const contador = cabecalho.querySelector(".track-count");

            if (contador) {
                const quantidade = String(musicas.length).padStart(2, "0");
                contador.textContent = `${quantidade} faixas`;
            }
        }
    });
});
