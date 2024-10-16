from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json
import random

app = FastAPI()

# Подключаем статику для стилей и скриптов
app.mount("/static", StaticFiles(directory="static"), name="static")

# Подключаем шаблоны
templates = Jinja2Templates(directory="templates")

# Загружаем слова из JSON-файла
words = []
current_index = 0

def load_words():
    global words
    with open("words.json", "r", encoding="utf-8") as file:
        words = json.load(file)
    random.shuffle(words)  # Перемешиваем слова

@app.on_event("startup")
async def startup_event():
    load_words()  # Загружаем и перемешиваем слова при старте приложения

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    global words
    return templates.TemplateResponse("index.html", {"request": request, "words": words})

@app.get("/next_word")
async def get_next_word():
    global words, current_index

    if current_index >= len(words):
        random.shuffle(words)  # Перемешиваем слова заново
        current_index = 0  # Сбрасываем индекс

    word = words[current_index]
    current_index += 1

    sword = {
        'word': ', '.join(str(w) for w in word['russ_phrase']),
        'translation': ', '.join(str(w) for w in word['eng_phrase'])
    }
    return sword
