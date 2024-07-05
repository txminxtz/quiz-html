document.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('nomeUsuario');
    const saveScoreBtn = document.getElementById('salvarPontuacaoBtn');
    const pontuacaoFinal = document.getElementById('pontuacaoFinal');
    const pontuacaoRecente = localStorage.getItem('pontuacaoRecente');
    const mensagemConfirmacao = document.getElementById('mensagemConfirmacao');

    const highScores = JSON.parse(localStorage.getItem('maiorPontuacao')) || [];

    pontuacaoFinal.innerText = pontuacaoRecente;

    username.addEventListener('input', () => {
        saveScoreBtn.disabled = username.value.trim() === '';
    });

    const salvarPontuacao = e => {
        e.preventDefault();

        const score = {
            pontuacao: parseInt(pontuacaoRecente),
            nome: username.value.trim()
        };

        highScores.push(score);

        highScores.sort((a, b) => b.pontuacao - a.pontuacao);

        highScores.splice(5);

        localStorage.setItem('maiorPontuacao', JSON.stringify(highScores));

        mensagemConfirmacao.classList.remove('hidden');

        setTimeout(() => {
            mensagemConfirmacao.classList.add('hidden');
        }, 3000);

        username.value = '';
    };

    saveScoreBtn.addEventListener('click', salvarPontuacao);
});