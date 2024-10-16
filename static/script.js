// Находим элементы на странице
const flashcard = document.getElementById("flashcard");
const wordElement = document.getElementById("word");
const translationElement = document.getElementById("translation");
const skipButton = document.getElementById("skip");
const nextButton = document.getElementById("next");

// Переменная для текущего слова
let currentWord = { word: "", translation: "" };

// Функция для загрузки нового слова с сервера
async function loadNextWord() {
    try {
        const response = await fetch('/next_word');
        const data = await response.json();
        currentWord = data;
        updateCard();
    } catch (error) {
        console.error("Ошибка при загрузке следующего слова:", error);
    }
}

// Обновляем текст на карточке
function updateCard() {
    wordElement.textContent = currentWord.word;
    translationElement.textContent = currentWord.translation;
    flashcard.classList.remove('flipped');  // Убираем переворот, когда загружается новое слово
}

// Обрабатываем клик по карточке (переворот)
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');  // Переворачиваем карточку
});

// Кнопка "Пропустить" просто переворачивает карточку на следующую
skipButton.addEventListener('click', () => {
    loadNextWord();  // Загружаем следующее слово
});

// Кнопка "Следующая" загружает следующее слово
nextButton.addEventListener('click', () => {
    loadNextWord();  // Загружаем следующее слово
});

// Инициализируем начальное слово при загрузке страницы
loadNextWord();
