document.addEventListener('DOMContentLoaded', () => {
    const highScoresList = document.getElementById('highScoresList');
    const highScores = JSON.parse(localStorage.getItem('maiorPontuacao')) || [];

    highScoresList.innerHTML = highScores.map(score => {
        return `<li class="high-score">${score.nome} - ${score.pontuacao}</li>`;
    }).join('');
});
