const question = document.querySelector('#question');
const escolhas = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#pontuação'); // Corrigido para corresponder ao id no HTML
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let pontuação = 0;
let contadorDeQuestoes = 0;
let availableQuestions = [];

let perguntas = [
    {
        pergunta: 'Quanto é 1 + 1?',
        escolha1: '2',
        escolha2: '4',
        escolha3: '3',
        escolha4: '1',
        resposta: 1
    },
    {
        pergunta: 'Quem foi o primeiro rei do Brasil?',
        escolha1: 'Dom Pedro II',
        escolha2: 'Dom João VI',
        escolha3: 'Dom Pedro I',
        escolha4: 'Dom Miguel I',
        resposta: 3
    },
    {
        pergunta: 'Quanto é 5 x 5?',
        escolha1: '15',
        escolha2: '20',
        escolha3: '10',
        escolha4: '25',
        resposta: 4
    },
    {
        pergunta: 'Qual é a capital do Brasil?',
        escolha1: 'São Paulo',
        escolha2: 'Rio de Janeiro',
        escolha3: 'Brasília',
        escolha4: 'Salvador',
        resposta: 3
    }
];

const PONTOS_MARCADOS = 100;
const MAX_QUESTOES = 4;

const começarJogo = () => {
    contadorDeQuestoes = 0;
    pontuação = 0;
    availableQuestions = [...perguntas];
    novasPerguntas();
};

const novasPerguntas = () => {
    if (availableQuestions.length === 0 || contadorDeQuestoes >= MAX_QUESTOES) {
        localStorage.setItem("pontuaçãoRecente", pontuação);
        return window.location.assign('end.html');
    }

    contadorDeQuestoes++;
    progressText.innerText = `Pergunta ${contadorDeQuestoes} de ${MAX_QUESTOES}`;
    progressBarFull.style.width = `${(contadorDeQuestoes / MAX_QUESTOES) * 100}%`;

    const perguntasIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[perguntasIndex];
    question.innerText = currentQuestion.pergunta;

    escolhas.forEach(escolha => {
        const numero = escolha.dataset['number']; 
        escolha.innerText = currentQuestion['escolha' + numero];
    });

    availableQuestions.splice(perguntasIndex, 1);
    acceptingAnswers = true;
};

escolhas.forEach(escolha => {
    escolha.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const escolhaSelecionada = e.target;
        const respostaSelecionada = escolhaSelecionada.dataset['number'];

        const classToApply = respostaSelecionada == currentQuestion.resposta ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            pontuaçãoIncrementada(PONTOS_MARCADOS);
        }

        escolhaSelecionada.parentElement.classList.add(classToApply);

        setTimeout(() => {
            escolhaSelecionada.parentElement.classList.remove(classToApply);
            novasPerguntas();
        }, 1000);
    });
});

const pontuaçãoIncrementada = num => {
    pontuação += num;
    scoreText.innerText = pontuação;
};

começarJogo();
