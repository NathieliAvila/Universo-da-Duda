
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
