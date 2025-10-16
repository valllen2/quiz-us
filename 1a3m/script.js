// --- CONFIGURAÇÃO ---
const partnerNames = {
    p1: "Valentaine", // Nome da Pessoa 1
    p2: "Eina"  // Nome da Pessoa 2
};

const questions = [
    "Quem é mais ciumenta?",
    "Quem dorme mais?",
    "Quem é mais romântica?",
    "Quem cozinha melhor?",
    "Quem é mais organizada?",
    "Quem tem mais mau humor de manhã?",
    "Quem é mais gastadeira?",
    "Quem é mais fitness?",
    "Quem é mais teimosa?",
    "Quem é mais lenta?",
    "Quem é mais dramatica?",
    "Quem é mais provável que compre uma coisa aleatória e inútil online?",
    "Quem fala mais durante um filme?",
    "Quem é mais rápida para comer?",
    "Quem é mais provável que comece a cantar alto do nada?",
    "Quem é mais provável que pegue toda a coberta durante a noite?",
    "Quem é mais provável de morrer primeiro em um jogo?",
    "Quem é mais provável que largue o jogo no meio de uma fase por frustração?",
    "Quem é mais provável que dê spoilers de um filme?",
    "Quem é mais provável que trapaceie em algum jogo?"
];

// --- VARIÁVEIS DE ESTADO ---
let currentQuestionIndex = 0;
// Aqui vamos armazenar a contagem de votos para cada pessoa
// 'p1' armazena o número de vezes que a P1 foi marcada
// 'p2' armazena o número de vezes que a P2 foi marcada
let voteCounts = {
    p1: 0,
    p2: 0
};

// --- ELEMENTOS DO DOM ---
const questionText = document.getElementById('question-text');
const buttonsArea = document.getElementById('buttons-area');
const resultsArea = document.getElementById('results-area');
const questionArea = document.getElementById('question-area');

// Referências para os botões e resultados
let btnP1;
let btnP2;

// --- FUNÇÕES ---

function createButtons() {
    // Cria o botão da Pessoa 1
    btnP1 = document.createElement('button');
    btnP1.id = 'btn-p1';
    btnP1.className = 'vote-button';
    btnP1.textContent = partnerNames.p1;
    btnP1.addEventListener('click', () => recordVote('p1'));

    // Cria o botão da Pessoa 2
    btnP2 = document.createElement('button');
    btnP2.id = 'btn-p2';
    btnP2.className = 'vote-button';
    btnP2.textContent = partnerNames.p2;
    btnP2.addEventListener('click', () => recordVote('p2'));

    // Adiciona ao HTML
    buttonsArea.appendChild(btnP1);
    buttonsArea.appendChild(btnP2);
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        // Mostra a pergunta atual
        questionText.textContent = questions[currentQuestionIndex];
    } else {
        // Se todas as perguntas foram respondidas, mostra o resultado
        showResults();
    }
}

function recordVote(winner) {
    voteCounts[winner]++; // Incrementa o voto

    // Avança para a próxima pergunta
    currentQuestionIndex++;
    
    // Carrega a próxima pergunta ou mostra o resultado
    loadQuestion();
}

function showResults() {
    // Oculta a área de perguntas/botões
    questionArea.classList.add('hidden');
    buttonsArea.classList.add('hidden');

    // Mostra a área de resultados
    resultsArea.classList.remove('hidden');

    const totalVotes = questions.length;
    
    // Cálculo das porcentagens
    const percentP1 = ((voteCounts.p1 / totalVotes) * 100).toFixed(1);
    const percentP2 = ((voteCounts.p2 / totalVotes) * 100).toFixed(1);

    // Atualiza os nomes
    document.getElementById('name-p1').textContent = partnerNames.p1;
    document.getElementById('name-p2').textContent = partnerNames.p2;
    
    // Atualiza as porcentagens
    document.getElementById('percentage-p1').textContent = `${percentP1}%`;
    document.getElementById('percentage-p2').textContent = `${percentP2}%`;

    // Mensagem Final
    let finalMessage = "";
    if (percentP1 > percentP2) {
        finalMessage = ` ${partnerNames.p1} é a mais votada omaga!`;
    } else if (percentP2 > percentP1) {
        finalMessage = ` ${partnerNames.p2} é a mais votada omaga!`;
    } else {
        finalMessage = "Empate das AMORECASSS!! É o equilibrio";
    }
    document.getElementById('final-message').textContent = finalMessage;

    // Lembre-se de substituir 'foto_pessoa_1.jpg' e 'foto_pessoa_2.jpg' no HTML 
    // com os caminhos reais das fotos de vocês!
}


// --- INICIALIZAÇÃO ---
window.onload = () => {
    createButtons(); // Cria os botões ao carregar a página
    loadQuestion();  // Carrega a primeira pergunta
};