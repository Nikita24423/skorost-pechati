/**
 * Генератор фраз RU + EN для тренажёра.
 * node generate-phrases.js
 */
const fs = require("fs");
const path = require("path");

function pick(arr, i) {
  return arr[((i % arr.length) + arr.length) % arr.length];
}

function clean(s) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function writePhrases(filename, globalName, list) {
  const out = `/* Автогенерация: node generate-phrases.js */\nwindow.${globalName} = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, filename), out, "utf8");
  console.log(filename, list.length);
}

// ---------- RU ----------
function generateRu() {
  const vI = ["вижу", "читаю", "держу", "несу", "открываю", "покупаю", "пишу", "решаю", "готовлю", "сижу", "стою", "иду", "бегу", "играю", "слушаю", "смотрю", "беру", "строю", "рисую", "работаю", "пью", "ем", "люблю", "выбираю", "ношу"];
  const vWe = ["видим", "читаем", "держим", "несём", "открываем", "покупаем", "пишем", "решаем", "готовим", "сидим", "стоим", "идём", "бежим", "играем", "слушаем", "смотрим", "берём", "строим", "рисуем", "работаем", "пьём", "едим", "любим", "выбираем", "носим"];
  const vHe = ["видит", "читает", "держит", "несёт", "открывает", "покупает", "пишет", "решает", "готовит", "сидит", "стоит", "идёт", "бежит", "играет", "слушает", "смотрит", "берёт", "строит", "рисует", "работает", "пьёт", "ест", "любит", "выбирает", "носит"];
  const vThey = ["видят", "читают", "держат", "несут", "открывают", "покупают", "пишут", "решают", "готовят", "сидят", "стоят", "идут", "бегут", "играют", "слушают", "смотрят", "берут", "строят", "рисуют", "работают", "пьют", "едят", "любят", "выбирают", "носят"];

  const whoSg = ["мама", "папа", "брат", "сестра", "друг", "учитель", "ученик", "студент", "кот", "пёс", "врач", "повар", "сосед", "малыш", "мальчик", "девушка", "бабушка", "дедушка", "гость", "пилот"];
  const whoPl = ["дети", "друзья", "гости", "птицы", "ученики", "мальчики", "девушки"];

  const adjM = ["большой", "маленький", "красивый", "новый", "старый", "добрый", "интересный", "сложный", "простой", "тяжёлый", "лёгкий", "мягкий", "широкий", "узкий", "высокий", "длинный", "короткий", "свежий", "вкусный", "горячий", "холодный", "тёплый", "чистый", "яркий", "тёмный", "синий", "красный", "зелёный", "белый", "чёрный", "жёлтый", "полезный", "важный", "удобный", "быстрый", "тихий", "громкий", "умный", "сильный"];
  const adjF = ["большую", "маленькую", "красивую", "новую", "старую", "добрую", "интересную", "сложную", "простую", "тяжёлую", "лёгкую", "мягкую", "широкую", "узкую", "высокую", "длинную", "короткую", "свежую", "вкусную", "горячую", "холодную", "тёплую", "чистую", "яркую", "тёмную", "синюю", "красную", "зелёную", "белую", "чёрную", "жёлтую", "полезную", "важную", "удобную", "быструю", "тихую", "громкую", "умную", "сильную"];
  const adjN = ["большое", "маленькое", "красивое", "новое", "старое", "доброе", "интересное", "сложное", "простое", "тяжёлое", "лёгкое", "мягкое", "широкое", "узкое", "высокое", "длинное", "короткое", "свежее", "вкусное", "горячее", "холодное", "тёплое", "чистое", "яркое", "тёмное", "синее", "красное", "зелёное", "белое", "чёрное", "жёлтое", "полезное", "важное", "удобное", "быстрое", "тихое", "умное", "сильное"];

  const adjPrepM = ["большом", "маленьком", "красивом", "новом", "старом", "мягком", "широком", "узком", "высоком", "длинном", "тёплом", "чистом", "тёмном", "светлом", "тихом", "удобном", "пустом", "полном"];
  const adjPrepF = ["большой", "маленькой", "красивой", "новой", "старой", "мягкой", "широкой", "узкой", "высокой", "длинной", "тёплой", "чистой", "тёмной", "светлой", "тихой", "удобной", "пустой", "полной"];

  const nounM = ["дом", "стол", "стул", "диван", "рюкзак", "учебник", "журнал", "карандаш", "телефон", "автобус", "поезд", "город", "лес", "парк", "сад", "двор", "мост", "урок", "вопрос", "ответ", "рисунок", "фильм", "подарок", "хлеб", "суп", "чай", "сок", "салат", "пирог", "свитер", "шарф"];
  const nounF = ["книгу", "тетрадь", "ручку", "сумку", "комнату", "улицу", "дорогу", "реку", "школу", "задачу", "тему", "песню", "игру", "собаку", "птицу", "воду", "кашу", "куртку", "шапку", "картину", "вазу", "полку", "чашку", "новость", "прогулку"];
  const nounN = ["окно", "письмо", "слово", "небо", "море", "озеро", "поле", "дерево", "яблоко", "молоко", "масло", "одеяло", "кресло", "зеркало", "место", "солнце", "облако", "задание", "решение", "правило"];

  const placeM = ["доме", "столе", "диване", "парке", "саду", "дворе", "лесу", "городе", "уроке", "классе", "магазине", "поезде", "автобусе", "шкафу", "ящике"];
  const placeF = ["комнате", "кухне", "школе", "улице", "дороге", "реке", "работе", "сумке", "книге", "полке", "квартире", "библиотеке", "площади"];

  const adv = ["утром", "днём", "вечером", "сегодня", "быстро", "медленно", "тихо", "внимательно", "вместе", "снова", "часто", "долго"];

  const seed = [
    "я вижу красивый дом",
    "мы читаем интересную книгу",
    "он держит тяжёлый рюкзак",
    "дети играют во дворе",
    "учитель объясняет новую тему",
    "в комнате стоит большой стол",
    "на столе лежит синяя тетрадь",
    "девушка покупает свежий хлеб",
    "мальчик открывает старое окно",
    "мы идём по широкой улице",
    "птицы летят над высоким лесом",
    "друг подарил мне полезный совет",
    "студент решает сложную задачу",
    "кот сидит на мягком диване",
    "вода течёт по узкой трубе",
    "она пишет длинное письмо",
    "папа чинит старый велосипед",
    "мама готовит вкусный суп",
    "они смотрят новый фильм",
    "я беру синий карандаш",
    "мы гуляем по тихому парку",
    "он несёт тяжёлую сумку",
    "дети рисуют яркую картину",
    "в саду растёт высокое дерево",
    "я пью горячий чай",
    "мы едим свежий салат",
    "они строят новый дом",
    "бабушка вяжет тёплый шарф",
    "дедушка читает старую книгу",
    "собака бежит по длинной дороге",
  ];

  const set = new Set(seed.map(clean));
  let i = 0;
  while (set.size < 1050 && i < 60000) {
    i++;
    const t = i % 12;
    let s = "";
    if (t === 0) s = `я ${pick(vI, i)} ${pick(adjM, i + 1)} ${pick(nounM, i + 2)}`;
    else if (t === 1) s = `я ${pick(vI, i + 2)} ${pick(adjF, i)} ${pick(nounF, i + 1)}`;
    else if (t === 2) s = `я ${pick(vI, i + 3)} ${pick(adjN, i)} ${pick(nounN, i + 2)}`;
    else if (t === 3) s = `мы ${pick(vWe, i)} ${pick(adjM, i + 4)} ${pick(nounM, i + 5)}`;
    else if (t === 4) s = `мы ${pick(vWe, i + 1)} ${pick(adjF, i + 2)} ${pick(nounF, i + 3)}`;
    else if (t === 5) s = `он ${pick(vHe, i)} ${pick(adjM, i + 6)} ${pick(nounM, i + 1)}`;
    else if (t === 6) s = `она ${pick(vHe, i + 1)} ${pick(adjF, i + 3)} ${pick(nounF, i + 4)}`;
    else if (t === 7) s = `они ${pick(vThey, i)} ${pick(adjN, i + 2)} ${pick(nounN, i + 5)}`;
    else if (t === 8) s = `${pick(whoSg, i)} ${pick(vHe, i + 4)} ${pick(adjM, i + 2)} ${pick(nounM, i + 7)}`;
    else if (t === 9) s = `${pick(whoSg, i + 1)} сидит на ${pick(adjPrepM, i)} ${pick(placeM, i + 3)}`;
    else if (t === 10) s = `на ${pick(adjPrepM, i + 2)} ${pick(placeM, i)} лежит ${pick(adjM, i + 5)} ${pick(nounM, i + 4)}`;
    else s = `${pick(whoPl, i)} ${pick(vThey, i + 2)} ${pick(adjF, i + 1)} ${pick(nounF, i + 6)} ${pick(adv, i)}`;

    s = clean(s);
    if (s.length >= 10 && /^[а-яё\s]+$/i.test(s)) set.add(s);

    if (i % 4 === 0) {
      const e = clean(`${pick(whoSg, i + 8)} ${pick(vHe, i + 3)} ${pick(adjF, i + 5)} ${pick(nounF, i + 2)} ${pick(adv, i + 1)}`);
      if (e.length >= 10) set.add(e);
    }
    if (i % 5 === 0) {
      const e = clean(`в ${pick(adjPrepF, i)} ${pick(placeF, i + 2)} стоит ${pick(adjM, i + 4)} ${pick(nounM, i + 6)}`);
      if (e.length >= 10) set.add(e);
    }
  }
  return Array.from(set).slice(0, 1000);
}

// ---------- EN ----------
function generateEn() {
  const vI = ["see", "read", "hold", "carry", "open", "buy", "write", "solve", "cook", "sit", "stand", "walk", "run", "play", "listen", "watch", "take", "build", "draw", "work", "drink", "eat", "love", "choose", "wear"];
  const vWe = ["see", "read", "hold", "carry", "open", "buy", "write", "solve", "cook", "sit", "stand", "walk", "run", "play", "listen", "watch", "take", "build", "draw", "work", "drink", "eat", "love", "choose", "wear"];
  const vS = ["sees", "reads", "holds", "carries", "opens", "buys", "writes", "solves", "cooks", "sits", "stands", "walks", "runs", "plays", "listens", "watches", "takes", "builds", "draws", "works", "drinks", "eats", "loves", "chooses", "wears"];
  const vPl = vWe.slice();

  const whoSg = ["mom", "dad", "brother", "sister", "friend", "teacher", "student", "cat", "dog", "doctor", "cook", "neighbor", "child", "boy", "girl", "guest", "pilot", "driver", "writer", "player"];
  const whoPl = ["kids", "friends", "guests", "birds", "students", "boys", "girls", "players", "workers"];

  const adj = ["big", "small", "nice", "new", "old", "kind", "fun", "hard", "easy", "heavy", "light", "soft", "wide", "narrow", "tall", "long", "short", "fresh", "tasty", "hot", "cold", "warm", "clean", "bright", "dark", "blue", "red", "green", "white", "black", "yellow", "useful", "important", "fast", "quiet", "loud", "smart", "strong"];

  const noun = ["house", "table", "chair", "sofa", "bag", "book", "pen", "phone", "bus", "train", "city", "forest", "park", "garden", "yard", "bridge", "lesson", "question", "answer", "picture", "film", "gift", "bread", "soup", "tea", "juice", "salad", "cake", "sweater", "scarf", "window", "letter", "word", "sky", "sea", "lake", "field", "tree", "apple", "milk", "mirror", "place", "cloud", "task", "rule", "road", "river", "school", "song", "game", "dog", "bird", "water", "cup", "shelf", "lamp", "box", "news", "walk"];

  const place = ["house", "table", "sofa", "park", "garden", "yard", "forest", "city", "class", "shop", "train", "bus", "room", "kitchen", "school", "street", "road", "river", "shelf", "library", "square", "box"];

  const adv = ["today", "now", "slowly", "quickly", "quietly", "together", "again", "often", "long", "soon", "daily", "early"];

  const seed = [
    "i see a nice house",
    "we read an interesting book",
    "he holds a heavy bag",
    "kids play in the yard",
    "the teacher explains a new topic",
    "a big table stands in the room",
    "a blue notebook lies on the table",
    "the girl buys fresh bread",
    "the boy opens an old window",
    "we walk along a wide street",
    "birds fly over a tall forest",
    "a friend gave me useful advice",
    "the student solves a hard task",
    "the cat sits on a soft sofa",
    "water flows through a narrow pipe",
    "she writes a long letter",
    "dad fixes an old bike",
    "mom cooks tasty soup",
    "they watch a new film",
    "i take a blue pencil",
    "we walk in a quiet park",
    "he carries a heavy bag",
    "kids draw a bright picture",
    "a tall tree grows in the garden",
    "i drink hot tea",
    "we eat a fresh salad",
    "they build a new house",
    "grandma knits a warm scarf",
    "grandpa reads an old book",
    "the dog runs along a long road",
  ];

  const set = new Set(seed.map(clean));
  let i = 0;
  while (set.size < 1050 && i < 60000) {
    i++;
    const t = i % 12;
    let s = "";
    if (t === 0) s = `i ${pick(vI, i)} a ${pick(adj, i + 1)} ${pick(noun, i + 2)}`;
    else if (t === 1) s = `we ${pick(vWe, i)} a ${pick(adj, i + 2)} ${pick(noun, i + 3)}`;
    else if (t === 2) s = `he ${pick(vS, i)} a ${pick(adj, i + 4)} ${pick(noun, i + 1)}`;
    else if (t === 3) s = `she ${pick(vS, i + 1)} a ${pick(adj, i + 3)} ${pick(noun, i + 5)}`;
    else if (t === 4) s = `they ${pick(vPl, i)} a ${pick(adj, i + 6)} ${pick(noun, i + 2)}`;
    else if (t === 5) s = `${pick(whoSg, i)} ${pick(vS, i + 2)} a ${pick(adj, i)} ${pick(noun, i + 7)}`;
    else if (t === 6) s = `${pick(whoSg, i + 1)} sits on a ${pick(adj, i + 3)} ${pick(place, i + 4)}`;
    else if (t === 7) s = `a ${pick(adj, i + 2)} ${pick(noun, i)} lies on the ${pick(place, i + 5)}`;
    else if (t === 8) s = `${pick(whoPl, i)} ${pick(vPl, i + 3)} in the ${pick(adj, i + 1)} ${pick(place, i + 6)}`;
    else if (t === 9) s = `i ${pick(vI, i + 4)} the ${pick(adj, i + 5)} ${pick(noun, i + 8)} ${pick(adv, i)}`;
    else if (t === 10) s = `we ${pick(vWe, i + 5)} the ${pick(adj, i + 7)} ${pick(noun, i + 3)} ${pick(adv, i + 2)}`;
    else s = `${pick(whoSg, i + 4)} ${pick(vS, i + 6)} the ${pick(adj, i + 8)} ${pick(noun, i + 9)} ${pick(adv, i + 1)}`;

    s = clean(s);
    // только латиница и пробелы, без пунктуации и цифр
    if (s.length >= 10 && /^[a-z\s]+$/.test(s)) set.add(s);
  }
  return Array.from(set).slice(0, 1000);
}

const ru = generateRu();
const en = generateEn();

writePhrases("phrases.js", "TYPING_LINES_RU", ru);
writePhrases("phrases-en.js", "TYPING_LINES_EN", en);

// совместимость со старым именем
fs.appendFileSync(
  path.join(__dirname, "phrases.js"),
  "\nwindow.TYPING_LINES = window.TYPING_LINES_RU;\n",
  "utf8"
);

console.log("RU sample:", ru.slice(0, 3));
console.log("EN sample:", en.slice(0, 3));
