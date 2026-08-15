// Screenshot & Anti-cheating Prevention
document.addEventListener('keydown', (e) => {
    if (e.key === 'PrintScreen') {
        e.preventDefault();
        alert('スクリーンショットは禁止されています！');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        alert('印刷機能は禁止されています！');
    }
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        alert('開発者ツールは禁止されています！');
    }
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('右クリックは禁止されています！');
    return false;
});

const questions = [
    // 大問１: 記述問題（Riddle）
    {
        id: 1,
        category: "大問１",
        categoryName: "記述問題",
        type: "riddle",
        question: "私は毎日、皆さんの近くにあります。朝は輪郭が長く、昼間は短く、夜間は消えてしまいます。私は何でしょう？",
        answers: ["影", "かげ"],
        hint1: "ヒント１: 毎日太陽の動きで変わります",
        hint2: "ヒント２: 光があれば出現し、光がなければ消えます"
    },
    {
        id: 2,
        category: "大問１",
        categoryName: "記述問題",
        type: "riddle",
        question: "階段を上っていますが、上に行きません。何でしょう？",
        answers: ["温度計", "おんどけい"],
        hint1: "ヒント１: よく見ると数字が増えていきます",
        hint2: "ヒント２: 医者のところでよく使われます"
    },
    // 大問２: 選択問題（Multiple Choice）
    {
        id: 3,
        category: "大問２",
        categoryName: "選択問題",
        type: "choice",
        question: "日本の首都はどこでしょう？",
        options: ["東京", "大阪", "京都", "福岡"],
        correctAnswer: "東京",
        answers: ["東京", "とうきょう"],
        hint1: "ヒント１: 関東地方にあります",
        hint2: "ヒント２: オリンピックが開催されました"
    },
    {
        id: 4,
        category: "大問２",
        categoryName: "選択問題",
        type: "choice",
        question: "富士山はどこの県にあるでしょう？",
        options: ["静岡県", "山梨県", "神奈川県", "岐阜県"],
        correctAnswer: "静岡県",
        answers: ["静岡県", "静岡"],
        hint1: "ヒント１: 東海地方の県です",
        hint2: "ヒント２: お茶で有名な県です"
    },
    // 大問３: CAPTCHA形式画像認識
    {
        id: 5,
        category: "大問３",
        categoryName: "CAPTCHA形式",
        type: "captcha",
        question: "画像に含まれる数字と文字を組み合わせて答えてください",
        captchaText: "3K7M",
        answers: ["3K7M", "3k7m"],
        hint1: "ヒント１: 大文字で記入してください",
        hint2: "ヒント２: 数字は3で始まります"
    },
    {
        id: 6,
        category: "大問３",
        categoryName: "CAPTCHA形式",
        type: "captcha",
        question: "画像に含まれる数字と文字を組み合わせて答えてください",
        captchaText: "A5B2",
        answers: ["A5B2", "a5b2"],
        hint1: "ヒント１: 全て大文字です",
        hint2: "ヒント２: Aで始まる2文字が含まれます"
    },
    // 大問４: 画像選択
    {
        id: 7,
        category: "大問４",
        categoryName: "画像選択",
        type: "visual",
        question: "次の記号のうち、日本銀行のマークはどれでしょう？",
        options: ["🏦", "🏛️", "💷", "🎌"],
        description: "日本銀行",
        correctAnswer: "🏛️",
        answers: ["建物", "ビル"],
        hint1: "ヒント１: 政府の建物に関連しています",
        hint2: "ヒント２: 古風で格式のあるマークです"
    },
    {
        id: 8,
        category: "大問４",
        categoryName: "画像選択",
        type: "visual",
        question: "次の記号のうち、警察を表すマークはどれでしょう？",
        options: ["🚑", "🚒", "🚓", "🚔"],
        description: "警察",
        correctAnswer: "🚓",
        answers: ["パトカー", "警察"],
        hint1: "ヒント１: 赤と白のサイレン車です",
        hint2: "ヒント２: 犯人を追跡します"
    }
];

const SHARED_SECRET_CODE = 'SEITOKAI';

const englishQuestionText = {
    1: 'I am near you every day. In the morning I am long, in the daytime I am short, and at night I disappear. What am I?',
    2: 'I am climbing stairs, but I never go up. What am I?',
    3: 'What is the capital city of Japan?',
    4: 'Which prefecture is Mount Fuji in?',
    5: 'Please enter the characters and numbers in the image.',
    6: 'Please enter the characters and numbers in the image.',
    7: 'Which symbol is the Bank of Japan mark?',
    8: 'Which symbol represents police?'
};

const englishOptionMap = {
    3: ['Tokyo', 'Osaka', 'Kyoto', 'Fukuoka'],
    4: ['Shizuoka Prefecture', 'Yamanashi Prefecture', 'Kanagawa Prefecture', 'Gifu Prefecture'],
    7: ['🏦', '🏛️', '💷', '🎌'],
    8: ['🚑', '🚒', '🚓', '🚔']
};

const englishAnswersMap = {
    1: ['shadow'],
    2: ['thermometer'],
    3: ['Tokyo'],
    4: ['Shizuoka Prefecture', 'Shizuoka'],
    5: ['3K7M'],
    6: ['A5B2'],
    7: ['building'],
    8: ['police', 'police car']
};

const englishCorrectAnswerMap = {
    3: 'Tokyo',
    4: 'Shizuoka Prefecture',
    7: '🏛️',
    8: '🚓'
};

const englishHintMap = {
    1: {
        hint1: 'Hint 1: I change every day with the movement of the sun.',
        hint2: 'Hint 2: I appear when there is light, and disappear when there is none.'
    },
    2: {
        hint1: 'Hint 1: Look closely — the number keeps going up.',
        hint2: 'Hint 2: You often see one at the doctor\'s office.'
    },
    3: {
        hint1: 'Hint 1: It\'s in the Kanto region.',
        hint2: 'Hint 2: The Olympics were held here.'
    },
    4: {
        hint1: 'Hint 1: It\'s a prefecture in the Tokai region.',
        hint2: 'Hint 2: This prefecture is famous for its tea.'
    },
    5: {
        hint1: 'Hint 1: Enter it in capital letters.',
        hint2: 'Hint 2: The number starts with 3.'
    },
    6: {
        hint1: 'Hint 1: Everything is in capital letters.',
        hint2: 'Hint 2: It includes 2 letters starting with A.'
    },
    7: {
        hint1: 'Hint 1: It\'s related to a government building.',
        hint2: 'Hint 2: It\'s an old-fashioned, dignified mark.'
    },
    8: {
        hint1: 'Hint 1: A red-and-white car with a siren.',
        hint2: 'Hint 2: It chases after suspects.'
    }
};

function getLocalizedHint(question, hintNumber) {
    const key = hintNumber === 1 ? 'hint1' : 'hint2';
    if (gameState.language === 'en' && englishHintMap[question.id]) {
        return englishHintMap[question.id][key];
    }
    return question[key];
}

const translations = {
    ja: {
        menuText: 'ようこそ！このゲームをプレイしますか？',
        rulesTitle: 'ゲームルール',
        rules: [
            '８つのなぞなぞの中から、ランダムに４つが選ばれます',
            '各問題に対して正しい答えを入力してください',
            '各問題ごとにコードを入力またはスキャンして、次の問題を進みます',
            'すべてのなぞなぞとコードをクリアして、宝いを開ける！',
            '毎回異なる問題が出題されます'
        ],
        menuDescription: '８つのなぞなぞの中から４つを選んで、コードをゲットしよう！',
        startGame: 'ゲーム開始！',
        language: 'Language',
        resultEmpty: '答えを入力してください！',
        resultWrong: '不正解です。もう一度試してください！',
        resultCorrect: 'やったね！大正解！！',
        finalSuccess: 'コードが認証されました！おめでとうございます！🎉',
        mistakeCountLabel: (n) => `失敗数: ${n}`,
        hint1Locked: 'ヒント１（3回失敗後に表示）',
        hint1Unlocked: 'ヒント１を見る',
        hint1Maxed: 'ヒント１は2回まで',
        hint2Locked: 'ヒント２（5回失敗後に表示）',
        hint2Unlocked: 'ヒント２を見る',
        hint2Maxed: 'ヒント２は2回まで'
    },
    en: {
        menuText: 'Welcome! Would you like to play?',
        rulesTitle: 'Game Rules',
        rules: [
            '4 out of 8 riddles are selected at random',
            'Enter the correct answer for each question',
            'Enter or scan a code between questions to continue',
            'Clear all riddles and codes to open the treasure!',
            'A different set of questions appears each time'
        ],
        menuDescription: 'Choose 4 out of 8 riddles and collect the secret code!',
        startGame: 'Start Game',
        language: 'Language',
        resultEmpty: 'Please enter your answer!',
        resultWrong: 'Incorrect. Please try again!',
        resultCorrect: 'Nice! Correct answer!',
        finalSuccess: 'Code verified! Congratulations! 🎉',
        mistakeCountLabel: (n) => `Mistakes: ${n}`,
        hint1Locked: 'Hint 1 (unlocks after 3 mistakes)',
        hint1Unlocked: 'View Hint 1',
        hint1Maxed: 'Hint 1: max 2 views',
        hint2Locked: 'Hint 2 (unlocks after 5 mistakes)',
        hint2Unlocked: 'View Hint 2',
        hint2Maxed: 'Hint 2: max 2 views'
    }
};

const validCodes = {
    shared: SHARED_SECRET_CODE
};

let gameState = {
    currentQuestion: 0,
    completedQuestions: 0,
    stage: 'menu',
    questionSequence: [],
    mistakesCount: 0,
    hint1Shown: false,
    hint2Shown: false,
    wrongAnswerHistory: {},
    hint1Attempts: {},
    hint2Attempts: {},
    secretCode: SHARED_SECRET_CODE,
    answerLocked: false,
    isCooldown: false,
    language: 'ja',
    qrScannerActive: false,
    qrScannerStream: null,
    intermediateQrScannerActive: false,
    intermediateQrScannerStream: null
};

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function selectRandomQuestions(allQuestions, count = 4) {
    return shuffleArray(allQuestions).slice(0, count);
}

// Safely toggle screens without crashing if an element is missing
function showScreen(screenName) {
    ['menuScreen', 'questionScreen', 'intermediateCodeScreen', 'codeScreen'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const secretDisplay = document.getElementById('secretCodeDisplay');
    if (secretDisplay) secretDisplay.classList.add('hidden');

    const target = document.getElementById(screenName);
    if (target) target.classList.remove('hidden');
}

function normalizeAnswer(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/[\s\-_]/g, '')
        .replace(/[。！？.,!?:;]/g, '');
}

function getLocalizedQuestionText(question) {
    if (gameState.language === 'en') {
        return englishQuestionText[question.id] || question.question;
    }
    return question.question;
}

function getLocalizedOptions(question) {
    if (gameState.language === 'en' && englishOptionMap[question.id]) {
        return englishOptionMap[question.id];
    }
    return question.options || [];
}

function getAcceptedAnswers(question) {
    const answers = [...(question.answers || [])];
    if (gameState.language === 'en') {
        answers.push(...(englishAnswersMap[question.id] || []));
    }
    if (question.correctAnswer) answers.push(question.correctAnswer);
    return [...new Set(answers.filter(Boolean))];
}

function applyLanguageUI() {
    const lang = gameState.language;
    const t = translations[lang] || translations.ja;

    const menuText = document.getElementById('menuText');
    const rulesTitle = document.getElementById('rulesTitle');
    const rulesList = document.getElementById('rulesList');
    const menuDescription = document.getElementById('menuDescription');
    const startGameBtn = document.getElementById('startGameBtn');
    const languageLabel = document.querySelector('.language-label');
    const languageSelect = document.getElementById('languageSelect');

    if (menuText) menuText.textContent = t.menuText;
    if (rulesTitle) rulesTitle.textContent = t.rulesTitle;
    if (rulesList && t.rules) rulesList.innerHTML = t.rules.map(item => `<li>${item}</li>`).join('');
    if (menuDescription) menuDescription.textContent = t.menuDescription;
    if (startGameBtn) startGameBtn.textContent = t.startGame;
    if (languageLabel) languageLabel.textContent = t.language;
    if (languageSelect) languageSelect.value = lang;

    const answerInput = document.getElementById('answer');
    if (answerInput) {
        answerInput.placeholder = lang === 'en' ? 'Type your answer here' : '答えを入力してください～';
    }
    const captchaInput = document.getElementById('captchaAnswer');
    if (captchaInput) {
        captchaInput.placeholder = lang === 'en' ? 'Type the letters and numbers' : '文字と数字を入力してください';
    }
}

function startGame() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) gameState.language = languageSelect.value || 'ja';

    gameState.stage = 'question';
    gameState.currentQuestion = 0;
    gameState.completedQuestions = 0;
    gameState.secretCode = SHARED_SECRET_CODE;
    gameState.answerLocked = false;
    gameState.isCooldown = false;

    const stampTray = document.getElementById('stampTray');
    if (stampTray) {
        stampTray.innerHTML = '';
        stampTray.classList.remove('hidden');
    }

    gameState.questionSequence = selectRandomQuestions(questions, 4);
    showScreen('questionScreen');
    loadQuestion();
}

function loadQuestion() {
    const question = gameState.questionSequence[gameState.currentQuestion];
    if (!question) return;
    const questionId = question.id;

    const qNum = document.getElementById('questionNumber');
    if (qNum) qNum.textContent = `${question.category} / ${question.categoryName} (#${question.id})`;

    const localizedQuestionText = getLocalizedQuestionText(question);
    ['riddleQuestionText', 'choiceQuestionText', 'captchaQuestionText', 'visualQuestionText'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = localizedQuestionText;
    });

    const ansInput = document.getElementById('answer');
    if (ansInput) ansInput.value = '';
    const capInput = document.getElementById('captchaAnswer');
    if (capInput) capInput.value = '';

    const res = document.getElementById('result');
    if (res) {
        res.textContent = '';
        res.style.color = '';
    }

    if (!gameState.wrongAnswerHistory[questionId]) gameState.wrongAnswerHistory[questionId] = [];
    if (!gameState.hint1Attempts[questionId]) gameState.hint1Attempts[questionId] = 0;
    if (!gameState.hint2Attempts[questionId]) gameState.hint2Attempts[questionId] = 0;

    gameState.mistakesCount = 0;
    gameState.hint1Shown = false;
    gameState.hint2Shown = false;
    gameState.answerLocked = false;
    gameState.isCooldown = false;

    const answerBtn = document.querySelector('button[onclick="checkAnswer()"]');
    if (answerBtn) {
        answerBtn.disabled = false;
        answerBtn.style.opacity = '1';
    }

    ['riddleContainer', 'choiceContainer', 'captchaContainer', 'visualContainer'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    if (question.type === 'riddle') {
        const el = document.getElementById('riddleContainer');
        if (el) el.classList.remove('hidden');
    } else if (question.type === 'choice') {
        const el = document.getElementById('choiceContainer');
        if (el) el.classList.remove('hidden');
        const choicesDiv = document.getElementById('choiceOptions');
        if (choicesDiv) {
            choicesDiv.innerHTML = '';
            getLocalizedOptions(question).forEach((option) => {
                const label = document.createElement('label');
                label.className = 'choice-option';
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'choiceAnswer';
                input.value = option;
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                choicesDiv.appendChild(label);
            });
        }
    } else if (question.type === 'captcha') {
        const el = document.getElementById('captchaContainer');
        if (el) el.classList.remove('hidden');
        const captchaDisplay = document.getElementById('captchaDisplay');
        if (captchaDisplay) {
            captchaDisplay.textContent = '';
            for (let char of question.captchaText) {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'captcha-char';
                span.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
                span.style.display = 'inline-block';
                span.style.marginRight = '8px';
                span.style.fontSize = '2em';
                span.style.fontWeight = 'bold';
                captchaDisplay.appendChild(span);
            }
        }
    } else if (question.type === 'visual') {
        const el = document.getElementById('visualContainer');
        if (el) el.classList.remove('hidden');
        const visualOptions = document.getElementById('visualOptions');
        if (visualOptions) {
            visualOptions.innerHTML = '';
            getLocalizedOptions(question).forEach((option) => {
                const label = document.createElement('label');
                label.className = 'visual-option';
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'visualAnswer';
                input.value = option;
                label.appendChild(input);
                const emoji = document.createElement('span');
                emoji.textContent = option;
                emoji.style.fontSize = '3em';
                label.appendChild(emoji);
                visualOptions.appendChild(label);
            });
        }
    }

    ['hint1Container', 'hint2Container'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const activeT = translations[gameState.language] || translations.ja;

    const h1Btn = document.getElementById('hint1Btn');
    if (h1Btn) {
        h1Btn.classList.remove('unlocked');
        h1Btn.textContent = activeT.hint1Locked;
        h1Btn.disabled = false;
        h1Btn.style.opacity = '1';
    }

    const h2Btn = document.getElementById('hint2Btn');
    if (h2Btn) {
        h2Btn.classList.remove('unlocked');
        h2Btn.textContent = activeT.hint2Locked;
        h2Btn.disabled = false;
        h2Btn.style.opacity = '1';
    }

    const mCount = document.getElementById('mistakeCount');
    if (mCount) mCount.textContent = activeT.mistakeCountLabel(0);

    const pFill = document.getElementById('progressFill');
    if (pFill) {
        const progress = ((gameState.currentQuestion + 1) / gameState.questionSequence.length) * 100;
        pFill.style.width = progress + '%';
    }
}

function addStamp() {
    const tray = document.getElementById('stampTray');
    if (!tray) return;
    const stamp = document.createElement('div');
    stamp.className = 'stamp';
    stamp.textContent = `STAMP ${gameState.completedQuestions}`;
    tray.appendChild(stamp);
    tray.classList.remove('hidden');
}

function checkAnswer() {
    if (gameState.answerLocked || gameState.isCooldown) return;

    const currentQuestion = gameState.questionSequence[gameState.currentQuestion];
    if (!currentQuestion) return;
    const questionId = currentQuestion.id;
    const resultElement = document.getElementById('result');
    const submitBtn = document.querySelector('button[onclick="checkAnswer()"]');
    let userAnswer = '';

    if (currentQuestion.type === 'choice') {
        userAnswer = document.querySelector('input[name="choiceAnswer"]:checked')?.value || '';
    } else if (currentQuestion.type === 'visual') {
        userAnswer = document.querySelector('input[name="visualAnswer"]:checked')?.value || '';
    } else if (currentQuestion.type === 'captcha') {
        const cap = document.getElementById('captchaAnswer');
        userAnswer = cap ? cap.value.trim() : '';
    } else {
        const ans = document.getElementById('answer');
        userAnswer = ans ? ans.value.trim() : '';
    }

    if (userAnswer === '') {
        if (resultElement) {
            resultElement.textContent = gameState.language === 'en' ? translations.en.resultEmpty : translations.ja.resultEmpty;
            resultElement.style.color = 'orange';
        }
        return;
    }

    const acceptedAnswers = getAcceptedAnswers(currentQuestion);
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const isCorrect = acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalizedUserAnswer);

    if (isCorrect) {
        gameState.answerLocked = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        }

        if (resultElement) {
            resultElement.textContent = gameState.language === 'en' ? translations.en.resultCorrect : translations.ja.resultCorrect;
            resultElement.style.color = 'green';
            resultElement.classList.add('correct-animation');
        }

        gameState.completedQuestions++;
        addStamp();
        celebrateCorrectAnswer();

        setTimeout(() => {
            if (resultElement) resultElement.classList.remove('correct-animation');
            gameState.stage = 'intermediateCode';
            showScreen('intermediateCodeScreen');
            const incInput = document.getElementById('intermediateCodeInput');
            if (incInput) incInput.value = '';
            const incRes = document.getElementById('intermediateCodeResult');
            if (incRes) {
                incRes.textContent = '';
                incRes.style.color = '';
            }
        }, 2000);
    } else {
        if (!gameState.wrongAnswerHistory[questionId]) {
            gameState.wrongAnswerHistory[questionId] = [];
        }

        // Anti-spam duplicate check
        const isDuplicate = gameState.wrongAnswerHistory[questionId].some(
            prevAttempt => normalizeAnswer(prevAttempt) === normalizedUserAnswer
        );

        if (isDuplicate) {
            if (resultElement) {
                resultElement.textContent = gameState.language === 'en' 
                    ? 'You already tried this answer!' 
                    : 'その回答はすでに試しました！';
                resultElement.style.color = 'orange';
            }
            return;
        }

        // 1.5 Second Cooldown
        gameState.isCooldown = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
        }
        setTimeout(() => {
            gameState.isCooldown = false;
            if (!gameState.answerLocked && submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        }, 1500);

        gameState.wrongAnswerHistory[questionId].push(userAnswer);

        if (resultElement) {
            resultElement.textContent = gameState.language === 'en' ? translations.en.resultWrong : translations.ja.resultWrong;
            resultElement.style.color = 'red';
        }

        gameState.mistakesCount++;

        const activeT = translations[gameState.language] || translations.ja;

        const mistakeElement = document.getElementById('mistakeCount');
        if (mistakeElement) {
            mistakeElement.textContent = activeT.mistakeCountLabel(gameState.mistakesCount);
            mistakeElement.classList.add('shake-animation');
            setTimeout(() => mistakeElement.classList.remove('shake-animation'), 500);
        }

        if (gameState.mistakesCount >= 3 && !gameState.hint1Shown) {
            const h1 = document.getElementById('hint1Btn');
            if (h1) {
                h1.classList.add('unlocked');
                h1.textContent = activeT.hint1Unlocked;
            }
        }

        if (gameState.mistakesCount >= 5 && !gameState.hint2Shown) {
            const h2 = document.getElementById('hint2Btn');
            if (h2) {
                h2.classList.add('unlocked');
                h2.textContent = activeT.hint2Unlocked;
            }
        }
    }
}

function showHint1() {
    const currentQuestion = gameState.questionSequence[gameState.currentQuestion];
    if (!currentQuestion) return;
    const questionId = currentQuestion.id;

    if (gameState.mistakesCount >= 3 && gameState.hint1Attempts[questionId] < 2) {
        const hintContainer = document.getElementById('hint1Container');
        if (hintContainer) hintContainer.classList.remove('hidden');
        const hintText = document.getElementById('hint1Text');
        if (hintText) hintText.textContent = getLocalizedHint(currentQuestion, 1);

        gameState.hint1Shown = true;
        gameState.hint1Attempts[questionId]++;

        if (gameState.hint1Attempts[questionId] >= 2) {
            const h1Btn = document.getElementById('hint1Btn');
            if (h1Btn) {
                h1Btn.disabled = true;
                h1Btn.textContent = (translations[gameState.language] || translations.ja).hint1Maxed;
                h1Btn.style.opacity = '0.5';
            }
        }
    }
}

function showHint2() {
    const currentQuestion = gameState.questionSequence[gameState.currentQuestion];
    if (!currentQuestion) return;
    const questionId = currentQuestion.id;

    if (gameState.mistakesCount >= 5 && gameState.hint2Attempts[questionId] < 2) {
        const hintContainer = document.getElementById('hint2Container');
        if (hintContainer) hintContainer.classList.remove('hidden');
        const hintText = document.getElementById('hint2Text');
        if (hintText) hintText.textContent = getLocalizedHint(currentQuestion, 2);

        gameState.hint2Shown = true;
        gameState.hint2Attempts[questionId]++;

        if (gameState.hint2Attempts[questionId] >= 2) {
            const h2Btn = document.getElementById('hint2Btn');
            if (h2Btn) {
                h2Btn.disabled = true;
                h2Btn.textContent = (translations[gameState.language] || translations.ja).hint2Maxed;
                h2Btn.style.opacity = '0.5';
            }
        }
    }
}

function celebrateCorrectAnswer() {
    const container = document.getElementById('questionScreen');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = ['#ff3b4e', '#3577f1', '#ffcc33', '#ff6fa5'][Math.floor(Math.random() * 4)];
        confetti.style.animation = `fall ${2 + Math.random() * 1}s linear`;
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

function submitCode() {
    const input = document.getElementById('codeInput');
    const codeInput = input ? input.value.trim() : '';
    const codeResultElement = document.getElementById('codeResult');
    if (!codeResultElement) return;

    if (codeInput === '') {
        codeResultElement.textContent = gameState.language === 'en' ? 'Please enter the code!' : 'コードを入力してください！';
        codeResultElement.style.color = 'orange';
        return;
    }

    if (codeInput.toUpperCase() === validCodes.shared.toUpperCase()) {
        codeResultElement.textContent = gameState.language === 'en' ? translations.en.finalSuccess : translations.ja.finalSuccess;
        codeResultElement.style.color = 'green';
    } else {
        codeResultElement.textContent = 'コードが無効です。正しいコードを入力してください。';
        codeResultElement.style.color = 'red';
    }
}

function submitIntermediateCode() {
    const input = document.getElementById('intermediateCodeInput');
    const codeInput = input ? input.value.trim() : '';
    const codeResultElement = document.getElementById('intermediateCodeResult');
    if (!codeResultElement) return;

    if (codeInput === '') {
        codeResultElement.textContent = gameState.language === 'en' ? 'Please enter the code!' : 'コードを入力してください！';
        codeResultElement.style.color = 'orange';
        return;
    }

    if (codeInput.toUpperCase() === validCodes.shared.toUpperCase()) {
        codeResultElement.textContent = gameState.language === 'en' ? 'Code verified! Moving to next question...' : 'コードが認証されました！次の問題に進みます...';
        codeResultElement.style.color = 'green';

        setTimeout(() => {
            gameState.currentQuestion++;
            if (gameState.currentQuestion < gameState.questionSequence.length) {
                showScreen('questionScreen');
                loadQuestion();
            } else {
                gameState.stage = 'finalCode';
                showScreen('codeScreen');
            }
        }, 1000);
    } else {
        codeResultElement.textContent = 'コードが無効です。正しいコードを入力してください。';
        codeResultElement.style.color = 'red';
    }
}

function resetGame() {
    const stampTray = document.getElementById('stampTray');
    if (stampTray) {
        stampTray.innerHTML = '';
        stampTray.classList.add('hidden');
    }
    const previousLanguage = gameState.language || 'ja';
    gameState = {
        currentQuestion: 0,
        completedQuestions: 0,
        stage: 'menu',
        questionSequence: [],
        mistakesCount: 0,
        hint1Shown: false,
        hint2Shown: false,
        wrongAnswerHistory: {},
        hint1Attempts: {},
        hint2Attempts: {},
        secretCode: SHARED_SECRET_CODE,
        answerLocked: false,
        isCooldown: false,
        language: previousLanguage,
        qrScannerActive: false,
        qrScannerStream: null,
        intermediateQrScannerActive: false,
        intermediateQrScannerStream: null
    };
    applyLanguageUI();
    showScreen('menuScreen');
}

// Ensure DOM is fully loaded before initialization
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            gameState.language = event.target.value || 'ja';
            applyLanguageUI();
        });
    }
    applyLanguageUI();
});

// ===== EASTER EGG: Persona-style hover on buttons & choices =====
document.addEventListener('DOMContentLoaded', () => {
    const callout = document.createElement('div');
    callout.id = 'easterEggCallout';
    document.body.appendChild(callout);

    let calloutTimeoutId = null;

    function triggerPersonaHover(target) {
        // Ignore locked hint buttons
        if (target.classList.contains('btn-hint') && !target.classList.contains('unlocked')) {
            return;
        }

        // Trigger slash jitter animation
        target.classList.remove('persona-hover');
        void target.offsetWidth; // Restart CSS animation
        target.classList.add('persona-hover');

        // Determine text to show
        let textToShow = target.getAttribute('data-callout');

        if (!textToShow) {
            if (target.classList.contains('choice-option') || target.classList.contains('visual-option')) {
                textToShow = 'Select!';
            } else {
                textToShow = 'Answer Now!';
            }
        }

        callout.textContent = textToShow;

        // Calculate positioning dynamically above the target element
        const rect = target.getBoundingClientRect();
        const topPos = rect.top - 8; // Small gap above target
        const leftPos = rect.left + (rect.width / 2); // Centered horizontally over target

        callout.style.top = `${topPos}px`;
        callout.style.left = `${leftPos}px`;

        // Animate callout popup
        callout.classList.remove('show');
        void callout.offsetWidth;
        callout.classList.add('show');

        clearTimeout(calloutTimeoutId);
        calloutTimeoutId = setTimeout(() => callout.classList.remove('show'), 600);
    }

    // Use event delegation so dynamically loaded question choices work automatically
    document.body.addEventListener('mouseenter', (e) => {
        const target = e.target.closest('.btn-primary, .btn-secondary, .btn-hint, .choice-option, .visual-option');
        if (target) {
            triggerPersonaHover(target);
        }
    }, true);

    document.body.addEventListener('animationend', (e) => {
        if (e.animationName === 'personaJitter') {
            e.target.classList.remove('persona-hover');
        }
    }, true);
});