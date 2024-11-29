// script.js
const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const timerElement = document.getElementById('timer');
const gameStatus = document.getElementById('game-status');
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let gameStarted = false;
let timer;
let timeLeft = 60; // 設定倒計時時間為 60 秒

// 使用 emoji 表示的動物
const animalEmojis = [
    '🦁', '🐯', '🐘', '🐼', '🦒', '🦓', '🐨', '🦘'
];

// 初始化遊戲
function initializeGame() {
    const shuffledCards = shuffle([...animalEmojis, ...animalEmojis]);
    board.innerHTML = '';
    cards = [];

    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', emoji); // 每張卡片對應的 emoji
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cards.push(card);
    });

    flippedCards = [];
    matchedCards = 0;
    gameStarted = true;
    gameStatus.textContent = '';
    startTimer(); // 開始倒計時
}

// 隨機打亂數組
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交換元素
    }
    return array;
}

// 開始倒計時
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `剩餘時間: ${timeLeft}秒`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameStatus.textContent = '遊戲失敗，時間用盡！';
            gameStarted = false; // 結束遊戲
        }
    }, 1000);
}

// 處理翻牌邏輯
function flipCard(event) {
    if (!gameStarted || flippedCards.length === 2) return;

    const card = event.target;

    // 防止同一張卡片被再次翻開
    if (flippedCards.includes(card) || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = card.getAttribute('data-value'); // 顯示 emoji
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// 檢查是否有配對
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchedCards++;
        flippedCards = [];
        if (matchedCards === cards.length / 2) {
            clearInterval(timer); // 停止計時器
            gameStatus.textContent = '恭喜你，遊戲勝利！';
            gameStarted = false; // 結束遊戲
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// 重新開始遊戲
function resetGame() {
    clearInterval(timer); // 清除計時器
    timeLeft = 60; // 重置時間
    initializeGame();
}

// 開始遊戲
initializeGame();
