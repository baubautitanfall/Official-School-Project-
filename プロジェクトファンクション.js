// ==========================================
// ANTI-CHEAT & SCREEN PROTECTION
// ==========================================
document.addEventListener('keydown', (e) => {
    const lang = gameState?.language || 'ja';
    const t = (translations[lang] || translations.ja);
    if (e.key === 'PrintScreen') {
        e.preventDefault();
        alert(t.antiCheatScreenshot || 'スクリーンショットは禁止されています！');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        alert(t.antiCheatPrint || '印刷機能は禁止されています！');
    }
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        alert(t.antiCheatDevTools || '開発者ツールは禁止されています！');
    }
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const lang = gameState?.language || 'ja';
    const t = (translations[lang] || translations.ja);
    alert(t.antiCheatContextMenu || '右クリックは禁止されています！');
    return false;
});

// ==========================================
// SVG ICON LIBRARY & METADATA
// ==========================================
const gameSvgIcons = {
    bank_historic: `<svg class="game-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Historic Bank of Japan">
      <rect x="6" y="52" width="52" height="6" rx="2" fill="#e2e8f0" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="10" y="47" width="44" height="5" rx="1.5" fill="#f8fafc" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="32,8 7,22 57,22" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="32" cy="16" r="3.5" fill="#ff3b4e" stroke="#1b1b1f" stroke-width="2"/>
      <path d="M26,8 Q32,2 38,8" fill="#3577f1" stroke="#1b1b1f" stroke-width="2.5"/>
      <line x1="32" y1="2" x2="32" y2="0" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="9" y="22" width="46" height="4" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5"/>
      <rect x="13" y="26" width="6" height="21" rx="1" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2.5"/>
      <rect x="23" y="26" width="6" height="21" rx="1" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2.5"/>
      <rect x="35" y="26" width="6" height="21" rx="1" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2.5"/>
      <rect x="45" y="26" width="6" height="21" rx="1" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2.5"/>
      <path d="M29,47 V35 A3,3 0 0 1 35,35 V47 Z" fill="#3577f1" stroke="#1b1b1f" stroke-width="2"/>
    </svg>`,

    bank_modern: `<svg class="game-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Modern Bank">
      <rect x="10" y="10" width="44" height="48" rx="4" fill="#3577f1" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="15" y="16" width="9" height="8" rx="1.5" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="28" y="16" width="9" height="8" rx="1.5" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="40" y="16" width="9" height="8" rx="1.5" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="15" y="28" width="9" height="8" rx="1.5" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="28" y="28" width="9" height="8" rx="1.5" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="40" y="28" width="9" height="8" rx="1.5" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="24" y="42" width="16" height="16" rx="2" fill="#fffdf7" stroke="#1b1b1f" stroke-width="2.5"/>
      <circle cx="32" cy="7" r="6.5" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2.5"/>
      <text x="32" y="10" font-family="'Dela Gothic One', 'M PLUS Rounded 1c', sans-serif" font-size="8" font-weight="bold" fill="#1b1b1f" text-anchor="middle">¥</text>
    </svg>`,

    currency_notes: `<svg class="game-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Banknotes">
      <g transform="rotate(-10 32 34)">
        <rect x="8" y="22" width="48" height="26" rx="3" fill="#a8e6cf" stroke="#1b1b1f" stroke-width="2.5"/>
      </g>
      <rect x="8" y="20" width="48" height="28" rx="3" fill="#2ecc71" stroke="#1b1b1f" stroke-width="2.5"/>
      <rect x="12" y="24" width="40" height="20" rx="2" fill="#e8f8f0" stroke="#1b1b1f" stroke-width="1.8" stroke-dasharray="3 2"/>
      <circle cx="32" cy="34" r="6" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2"/>
      <text x="32" y="37" font-family="'Dela Gothic One', 'M PLUS Rounded 1c', sans-serif" font-size="7" font-weight="bold" fill="#1b1b1f" text-anchor="middle">¥</text>
      <circle cx="50" cy="14" r="5" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2"/>
      <line x1="50" y1="5" x2="50" y2="7" stroke="#1b1b1f" stroke-width="2" stroke-linecap="round"/>
      <line x1="57" y1="14" x2="59" y2="14" stroke="#1b1b1f" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    crossed_flags: `<svg class="game-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Crossed Flags">
      <line x1="12" y1="12" x2="52" y2="54" stroke="#1b1b1f" stroke-width="3" stroke-linecap="round"/>
      <line x1="52" y1="12" x2="12" y2="54" stroke="#1b1b1f" stroke-width="3" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="4.5" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2.5"/>
      <circle cx="52" cy="12" r="4.5" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2.5"/>
      <polygon points="15,15 32,24 23,38 12,28" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="21" cy="26" r="4" fill="#ff3b4e"/>
      <polygon points="49,15 32,24 41,38 52,28" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="43" cy="26" r="4" fill="#ff3b4e"/>
      <circle cx="32" cy="33" r="3.5" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2"/>
    </svg>`,

    police_car: `<svg class="game-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Police Patrol Car">
      <polygon points="28,12 36,12 38,17 26,17" fill="#ff3b4e" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="32" y1="6" x2="32" y2="9" stroke="#ff3b4e" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="8" x2="26" y2="10" stroke="#ff3b4e" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="8" x2="38" y2="10" stroke="#ff3b4e" stroke-width="2" stroke-linecap="round"/>
      <path d="M16,30 L22,17 L44,17 L52,30 Z" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="23,19 31,19 31,28 18,28" fill="#d0e5ff" stroke="#1b1b1f" stroke-width="1.8"/>
      <polygon points="34,19 43,19 49,28 34,28" fill="#d0e5ff" stroke="#1b1b1f" stroke-width="1.8"/>
      <rect x="6" y="28" width="52" height="8" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5"/>
      <path d="M6,36 H58 V45 C58,47 56,48 54,48 H10 C8,48 6,47 6,45 Z" fill="#1b1b1f" stroke="#1b1b1f" stroke-width="2.5"/>
      <polygon points="32,32 33.2,35.5 37,35.5 34,37.5 35.2,41 32,39 28.8,41 30,37.5 27,35.5 30.8,35.5" fill="#ffcc33" stroke="#1b1b1f" stroke-width="1"/>
      <circle cx="17" cy="48" r="6" fill="#1b1b1f"/>
      <circle cx="17" cy="48" r="3" fill="#ffffff" stroke="#1b1b1f" stroke-width="1.5"/>
      <circle cx="47" cy="48" r="6" fill="#1b1b1f"/>
      <circle cx="47" cy="48" r="3" fill="#ffffff" stroke="#1b1b1f" stroke-width="1.5"/>
      <rect x="56" y="32" width="2" height="4" fill="#ffcc33" rx="1"/>
      <rect x="6" y="32" width="2" height="4" fill="#ff3b4e" rx="1"/>
    </svg>`,

    ambulance: `<svg class="game-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ambulance">
      <ellipse cx="34" cy="12" rx="4" ry="3" fill="#ff3b4e" stroke="#1b1b1f" stroke-width="2"/>
      <line x1="34" y1="6" x2="34" y2="8" stroke="#ff3b4e" stroke-width="2" stroke-linecap="round"/>
      <path d="M8,16 H44 L54,28 V46 C54,48 52,49 50,49 H10 C8,49 8,48 8,46 Z" fill="#ffffff" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="42,20 50,28 42,28" fill="#d0e5ff" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="8" y="32" width="46" height="5" fill="#ff3b4e" stroke="#1b1b1f" stroke-width="1.5"/>
      <circle cx="25" cy="24" r="6" fill="#ffffff" stroke="#1b1b1f" stroke-width="1.5"/>
      <rect x="23.5" y="20" width="3" height="8" fill="#ff3b4e"/>
      <rect x="21" y="22.5" width="8" height="3" fill="#ff3b4e"/>
      <circle cx="18" cy="49" r="6" fill="#1b1b1f"/>
      <circle cx="18" cy="49" r="2.5" fill="#ffffff" stroke="#1b1b1f" stroke-width="1.5"/>
      <circle cx="44" cy="49" r="6" fill="#1b1b1f"/>
      <circle cx="44" cy="49" r="2.5" fill="#ffffff" stroke="#1b1b1f" stroke-width="1.5"/>
    </svg>`,

    fire_engine: `<svg class="game-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fire Engine">
      <rect x="12" y="9" width="34" height="6" rx="1.5" fill="#e2e8f0" stroke="#1b1b1f" stroke-width="2"/>
      <line x1="18" y1="9" x2="18" y2="15" stroke="#1b1b1f" stroke-width="1.5"/>
      <line x1="24" y1="9" x2="24" y2="15" stroke="#1b1b1f" stroke-width="1.5"/>
      <line x1="30" y1="9" x2="30" y2="15" stroke="#1b1b1f" stroke-width="1.5"/>
      <line x1="36" y1="9" x2="36" y2="15" stroke="#1b1b1f" stroke-width="1.5"/>
      <line x1="42" y1="9" x2="42" y2="15" stroke="#1b1b1f" stroke-width="1.5"/>
      <ellipse cx="48" cy="15" rx="3.5" ry="2.5" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2"/>
      <path d="M8,17 H42 L56,28 V47 C56,49 54,50 52,50 H10 C8,50 8,49 8,47 Z" fill="#ff3b4e" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="43,20 52,28 43,28" fill="#d0e5ff" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="12" y="24" width="16" height="14" rx="2" fill="#fff3da" stroke="#1b1b1f" stroke-width="2"/>
      <circle cx="20" cy="31" r="4" fill="#ffcc33" stroke="#1b1b1f" stroke-width="1.5"/>
      <rect x="30" y="32" width="24" height="4" fill="#ffcc33" stroke="#1b1b1f" stroke-width="1.5"/>
      <circle cx="18" cy="50" r="6" fill="#1b1b1f"/>
      <circle cx="18" cy="50" r="2.5" fill="#e2e8f0" stroke="#1b1b1f" stroke-width="1.5"/>
      <circle cx="46" cy="50" r="6" fill="#1b1b1f"/>
      <circle cx="46" cy="50" r="2.5" fill="#e2e8f0" stroke="#1b1b1f" stroke-width="1.5"/>
    </svg>`,

    patrol_cruiser: `<svg class="game-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Police Sunburst Emblem">
      <g fill="#ffcc33" stroke="#1b1b1f" stroke-width="2" stroke-linejoin="round">
        <polygon points="32,4 35,16 41,6 39,18 49,12 43,22 55,20 46,27 58,32 46,37 55,44 43,42 49,52 39,46 41,58 35,48 32,60 29,48 23,58 25,46 15,52 21,42 9,44 18,37 6,32 18,27 9,20 21,22 15,12 25,18 23,6 29,16"/>
      </g>
      <circle cx="32" cy="32" r="14" fill="#ff9416" stroke="#1b1b1f" stroke-width="2.5"/>
      <circle cx="32" cy="32" r="10" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2"/>
      <circle cx="32" cy="32" r="4.5" fill="#ff3b4e" stroke="#1b1b1f" stroke-width="1.5"/>
      <polygon points="32,29 33,31.5 35.5,32 33,32.5 32,35 31,32.5 28.5,32 31,31.5" fill="#fffdf7"/>
    </svg>`,

    trophy_celebration: `<svg class="game-icon celebration-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Victory Trophy">
      <rect x="10" y="8" width="4" height="4" fill="#ff3b4e" transform="rotate(25 12 10)"/>
      <rect x="50" y="10" width="4" height="4" fill="#3577f1" transform="rotate(-30 52 12)"/>
      <circle cx="16" cy="22" r="2.5" fill="#ffcc33"/>
      <circle cx="48" cy="22" r="2.5" fill="#2ecc71"/>
      <path d="M18,12 H46 V26 C46,34 38,40 32,40 C26,40 18,34 18,26 Z" fill="#ffcc33" stroke="#1b1b1f" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M18,16 H12 C9.8,16 8,17.8 8,20 V22 C8,26 12,28 18,28" fill="none" stroke="#1b1b1f" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M46,16 H52 C54.2,16 56,17.8 56,20 V22 C56,26 52,28 46,28" fill="none" stroke="#1b1b1f" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="29" y="40" width="6" height="8" fill="#ff9416" stroke="#1b1b1f" stroke-width="2.5"/>
      <rect x="20" y="48" width="24" height="8" rx="2" fill="#ff3b4e" stroke="#1b1b1f" stroke-width="2.5"/>
      <polygon points="32,18 33.5,22 38,22 34.5,24.5 36,29 32,26.5 28,29 29.5,24.5 26,22 30.5,22" fill="#ffffff" stroke="#1b1b1f" stroke-width="1"/>
    </svg>`,

    stamp_star: `<svg class="stamp-star-icon" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#ff3b4e" stroke="#1b1b1f" stroke-width="2" stroke-linejoin="round"/></svg>`,

    icon_rules: `<svg class="ui-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,

    icon_lang: `<svg class="ui-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,

    icon_qr: `<svg class="ui-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,

    icon_hint: `<svg class="ui-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,

    icon_restart: `<svg class="ui-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`
};

function getGameIconSvg(name) {
    return gameSvgIcons[name] || '';
}

const visualOptionMeta = {
    bank_modern: { ja: '現代の銀行', en: 'Modern Bank' },
    bank_historic: { ja: '日本銀行（歴史的本館）', en: 'Bank of Japan (Historic)' },
    currency_notes: { ja: '紙幣・お金', en: 'Banknotes & Cash' },
    crossed_flags: { ja: '祝祭の交差旗', en: 'Crossed Flags' },
    ambulance: { ja: '救急車', en: 'Ambulance' },
    fire_engine: { ja: '消防車', en: 'Fire Engine' },
    police_car: { ja: 'パトカー', en: 'Police Patrol Car' },
    patrol_cruiser: { ja: '警察紋章（旭日章）', en: 'Police Star Emblem' }
};

// ==========================================
// GAME DATA & SECRET CODES
// ==========================================
const SHARED_SECRET_CODE = ['SEITOKAI', '483433', 'IKEMENKAICHOU', 'SIX SEVEN'];

const questions = [
    // 大問１: 記述問題
    { id: 1, category: "大問１", categoryName: "記述問題", type: "riddle", question: "私は毎日、皆さんの近くにあります。朝は輪郭が長く、昼間は短く、夜間は消えてしまいます。私は何でしょう？", answers: ["影", "かげ", "カゲ", "お影", "おかげ"], hint1: "ヒント１: 毎日太陽の動きで変わります", hint2: "ヒント２: 光があれば出現し、光がなければ消えます" },
    { id: 2, category: "大問１", categoryName: "記述問題", type: "riddle", question: "階段を上っていますが、上に行きません。何でしょう？", answers: ["温度計", "おんどけい", "オンドケイ", "体温計", "たいおんけい"], hint1: "ヒント１: よく見ると数字が増えていきます", hint2: "ヒント２: 医者のところでよく使われます" },
    // 大問２: 選択問題
    { id: 3, category: "大問２", categoryName: "選択問題", type: "choice", question: "日本の首都はどこでしょう？", options: ["東京", "大阪", "京都", "福岡"], correctAnswer: "東京", answers: ["東京", "とうきょう", "トウキョウ"], hint1: "ヒント１: 関東地方にあります", hint2: "ヒント２: オリンピックが開催されました" },
    { id: 4, category: "大問２", categoryName: "選択問題", type: "choice", question: "富士山はどこの県にあるでしょう？", options: ["静岡県", "山梨県", "神奈川県", "岐阜県"], correctAnswer: "静岡県", answers: ["静岡県", "静岡", "しずおかけん", "しずおか"], hint1: "ヒント１: 東海地方の県です", hint2: "ヒント２: お茶で有名な県です" },
    // 大問３: CAPTCHA
    { id: 5, category: "大問３", categoryName: "CAPTCHA形式", type: "captcha", question: "画像に含まれる数字と文字を組み合わせて答えてください", captchaText: "3K7M", answers: ["3K7M", "3k7m"], hint1: "ヒント１: 大文字で記入してください", hint2: "ヒント２: 数字は3で始まります" },
    { id: 6, category: "大問３", categoryName: "CAPTCHA形式", type: "captcha", question: "画像に含まれる数字と文字を組み合わせて答えてください", captchaText: "A5B2", answers: ["A5B2", "a5b2"], hint1: "ヒント１: 全て大文字です", hint2: "ヒント２: Aで始まる2文字が含まれます" },
    // 大問４: 画像選択
    { id: 7, category: "大問４", categoryName: "画像選択", type: "visual", question: "次の記号のうち、日本銀行のマークはどれでしょう？", options: ["bank_modern", "bank_historic", "currency_notes", "crossed_flags"], description: "日本銀行", correctAnswer: "bank_historic", answers: ["bank_historic", "歴史的銀行", "日銀", "日本銀行", "建物", "ビル", "historic bank", "bank of japan", "building", "bank", "🏛️", "🏛"], hint1: "ヒント１: 政府の建物に関連しています", hint2: "ヒント２: 古風で格式のあるマークです" },
    { id: 8, category: "大問４", categoryName: "画像選択", type: "visual", question: "次の記号のうち、警察を表すマークはどれでしょう？", options: ["ambulance", "fire_engine", "police_car", "patrol_cruiser"], description: "警察", correctAnswer: "police_car", answers: ["police_car", "パトカー", "警察", "警察車", "police", "police car", "patrol car", "🚓", "🚔"], hint1: "ヒント１: 赤と白のサイレン車です", hint2: "ヒント２: 犯人を追跡します" },
    // 大問５: 記述問題
    { id: 9, category: "大問５", categoryName: "記述問題", type: "riddle", question: "朝みんなを起こすのに、自分は一度も眠りません。私は何でしょう？", answers: ["目覚まし時計", "めざましどけい", "目覚まし", "アラーム", "アラーム時計"], hint1: "ヒント１: 毎朝同じ時間に鳴ります", hint2: "ヒント２: ベルや音楽で知らせます" },
    { id: 10, category: "大問５", categoryName: "記述問題", type: "riddle", question: "私は文字がたくさん並んでいますが、自分では一言も話しません。私は何でしょう？", answers: ["辞書", "じしょ", "辞典", "じてん"], hint1: "ヒント１: 学校でよく使われます", hint2: "ヒント２: 50音順やアルファベット順に並んでいます" },
    // 大問６: 選択問題
    { id: 11, category: "大問６", categoryName: "選択問題", type: "choice", question: "日本で一番高い山はどれでしょう？", options: ["富士山", "立山", "白山", "御嶽山"], correctAnswer: "富士山", answers: ["富士山", "ふじさん", "フジサン"], hint1: "ヒント１: 静岡県と山梨県にまたがっています", hint2: "ヒント２: 標高3776メートルです" },
    { id: 12, category: "大問６", categoryName: "選択問題", type: "choice", question: "日本の通貨単位はどれでしょう？", options: ["円", "ウォン", "元", "ドル"], correctAnswer: "円", answers: ["円", "えん", "エン"], hint1: "ヒント１: 硬貨と紙幣があります", hint2: "ヒント２: 「¥」の記号で表されます" },
    // 大問７: CAPTCHA
    { id: 13, category: "大問７", categoryName: "CAPTCHA形式", type: "captcha", question: "画像に含まれる数字と文字を組み合わせて答えてください", captchaText: "7X2P", answers: ["7X2P", "7x2p"], hint1: "ヒント１: 大文字で記入してください", hint2: "ヒント２: 数字の7から始まります" },
    { id: 14, category: "大問７", categoryName: "CAPTCHA形式", type: "captcha", question: "画像に含まれる数字と文字を組み合わせて答えてください", captchaText: "Q9L4", answers: ["Q9L4", "q9l4"], hint1: "ヒント１: 全て大文字です", hint2: "ヒント２: Qで始まる文字が含まれます" },
    // 大問８: 画像選択
    { id: 15, category: "大問８", categoryName: "画像選択", type: "visual", question: "次の記号のうち、救急車を表すマークはどれでしょう？", options: ["ambulance", "fire_engine", "police_car", "patrol_cruiser"], description: "救急車", correctAnswer: "ambulance", answers: ["ambulance", "救急車", "きゅうきゅうしゃ", "ambulance car", "🚑"], hint1: "ヒント１: 赤十字のマークが描かれています", hint2: "ヒント２: けが人や病人を病院に運びます" },
    { id: 16, category: "大問８", categoryName: "画像選択", type: "visual", question: "次の記号のうち、消防車を表すマークはどれでしょう？", options: ["fire_engine", "ambulance", "police_car", "patrol_cruiser"], description: "消防車", correctAnswer: "fire_engine", answers: ["fire_engine", "消防車", "しょうぼうしゃ", "fire truck", "fire engine", "🚒"], hint1: "ヒント１: 火事の時に出動します", hint2: "ヒント２: はしごやホースが装備されています" },
    // 大問９: 記述問題
    { id: 17, category: "大問９", categoryName: "記述問題", type: "riddle", question: "私は毎年増えていくのに、誰も欲しがりません。私は何でしょう？", answers: ["年齢", "ねんれい", "歳", "とし"], hint1: "ヒント１: 誕生日に必ず変わります", hint2: "ヒント２: 数字で表されます" },
    { id: 18, category: "大問９", categoryName: "記述問題", type: "riddle", question: "私は冷たいうちは固く、温かくなると柔らかく溶けていきます。私は何でしょう？", answers: ["アイスクリーム", "アイス", "あいすくりーむ"], hint1: "ヒント１: 甘くて夏によく食べられます", hint2: "ヒント２: コーンやカップに入っていることが多いです" },
    // 大問１０: 選択問題
    { id: 19, category: "大問１０", categoryName: "選択問題", type: "choice", question: "日本の国花としてよく知られる花はどれでしょう？", options: ["桜", "ひまわり", "チューリップ", "バラ"], correctAnswer: "桜", answers: ["桜", "さくら", "サクラ"], hint1: "ヒント１: 春に咲きます", hint2: "ヒント２: お花見で有名です" },
    { id: 20, category: "大問１０", categoryName: "選択問題", type: "choice", question: "文化祭が行われる季節としてよくあるのはどれでしょう？", options: ["秋", "冬", "夏", "春"], correctAnswer: "秋", answers: ["秋", "あき", "アキ"], hint1: "ヒント１: 涼しくなってくる季節です", hint2: "ヒント２: 運動会と同じ時期に行われることが多いです" },
    // 大問１１: CAPTCHA
    { id: 21, category: "大問１１", categoryName: "CAPTCHA形式", type: "captcha", question: "画像に含まれる数字と文字を組み合わせて答えてください", captchaText: "M3K8", answers: ["M3K8", "m3k8"], hint1: "ヒント１: 大文字で記入してください", hint2: "ヒント２: 数字の3が含まれます" },
    { id: 22, category: "大問１１", categoryName: "CAPTCHA形式", type: "captcha", question: "画像に含まれる数字と文字を組み合わせて答えてください", captchaText: "5T1D", answers: ["5T1D", "5t1d"], hint1: "ヒント１: 全て大文字です", hint2: "ヒント２: 数字の5から始まります" },
    // 大問１２: 画像選択
    { id: 23, category: "大問１２", categoryName: "画像選択", type: "visual", question: "次の記号のうち、現代的な銀行を表すマークはどれでしょう？", options: ["bank_modern", "bank_historic", "currency_notes", "crossed_flags"], description: "現代の銀行", correctAnswer: "bank_modern", answers: ["bank_modern", "現代銀行", "近代的な銀行", "modern bank", "bank", "🏦"], hint1: "ヒント１: 四角いビルの形をしています", hint2: "ヒント２: 円マークが描かれています" },
    { id: 24, category: "大問１２", categoryName: "画像選択", type: "visual", question: "次の記号のうち、紙幣（お札）を表すマークはどれでしょう？", options: ["currency_notes", "bank_modern", "bank_historic", "crossed_flags"], description: "紙幣", correctAnswer: "currency_notes", answers: ["currency_notes", "紙幣", "お札", "おさつ", "banknotes", "money", "cash", "💴"], hint1: "ヒント１: 緑色で描かれています", hint2: "ヒント２: 円マークが中央にあります" },
    // 大問１３: 記述問題
    { id: 25, category: "大問１３", categoryName: "記述問題", type: "riddle", question: "呼ぶと逃げていき、逃げると追いかけてくるものは何でしょう？", answers: ["こだま", "やまびこ", "エコー", "反響"], hint1: "ヒント１: 山で大きな声を出すと聞こえます", hint2: "ヒント２: 自分の声が返ってきます" },
    { id: 26, category: "大問１３", categoryName: "記述問題", type: "riddle", question: "私は毎日使われるほど、体がだんだん短くなっていきます。私は何でしょう？", answers: ["鉛筆", "えんぴつ", "エンピツ"], hint1: "ヒント１: 勉強の道具です", hint2: "ヒント２: 削ると先が尖ります" },
    // 大問１４: 選択問題
    { id: 27, category: "大問１４", categoryName: "選択問題", type: "choice", question: "日本で新幹線が最初に開業したのは、東京とどこの間でしょう？", options: ["大阪", "名古屋", "福岡", "仙台"], correctAnswer: "大阪", answers: ["大阪", "おおさか", "オオサカ"], hint1: "ヒント１: 1964年に開業しました", hint2: "ヒント２: 東京オリンピックが開催された年です" },
    { id: 28, category: "大問１４", categoryName: "選択問題", type: "choice", question: "日本の多くの学校で新学期が始まる月はどれでしょう？", options: ["4月", "1月", "9月", "3月"], correctAnswer: "4月", answers: ["4月", "四月", "しがつ"], hint1: "ヒント１: 桜が咲く頃です", hint2: "ヒント２: 多くの学校で入学式が行われます" },
    // 大問１５: CAPTCHA
    { id: 29, category: "大問１５", categoryName: "CAPTCHA形式", type: "captcha", question: "画像に含まれる数字と文字を組み合わせて答えてください", captchaText: "R6P0", answers: ["R6P0", "r6p0"], hint1: "ヒント１: 大文字で記入してください", hint2: "ヒント２: Rで始まる文字が含まれます" },
    { id: 30, category: "大問１５", categoryName: "CAPTCHA形式", type: "captcha", question: "画像に含まれる数字と文字を組み合わせて答えてください", captchaText: "8N4W", answers: ["8N4W", "8n4w"], hint1: "ヒント１: 全て大文字です", hint2: "ヒント２: 数字の8から始まります" },
    // 大問１６: 画像選択
    { id: 31, category: "大問１６", categoryName: "画像選択", type: "visual", question: "次の記号のうち、旗を表すマークはどれでしょう？", options: ["crossed_flags", "currency_notes", "bank_modern", "bank_historic"], description: "旗", correctAnswer: "crossed_flags", answers: ["crossed_flags", "旗", "はた", "国旗", "flags", "flag", "🎌"], hint1: "ヒント１: 2本の旗が交差しています", hint2: "ヒント２: 黄色い旗竿の先端が丸くなっています" },
    { id: 32, category: "大問１６", categoryName: "画像選択", type: "visual", question: "次の記号のうち、パトロールを表す紋章はどれでしょう？", options: ["patrol_cruiser", "police_car", "ambulance", "fire_engine"], description: "パトロール紋章", correctAnswer: "patrol_cruiser", answers: ["patrol_cruiser", "パトロール", "巡回", "emblem", "patrol", "🚨"], hint1: "ヒント１: 太陽のような放射状のデザインです", hint2: "ヒント２: 警察に関連するシンボルです" }
];

// ==========================================
// ENGLISH TRANSLATIONS & DICTIONARIES
// ==========================================
const englishQuestionText = {
    1: 'I am near you every day. In the morning I am long, in the daytime I am short, and at night I disappear. What am I?',
    2: 'I climb up and down, but I never move from my place. What am I?',
    3: 'What is the capital city of Japan?',
    4: 'Which prefecture is Mount Fuji located in?',
    5: 'Please enter the characters and numbers shown in the image.',
    6: 'Please enter the characters and numbers shown in the image.',
    7: 'Which symbol represents the Bank of Japan?',
    8: 'Which symbol represents the police?',
    9: 'I wake everyone up every morning, but I never sleep myself. What am I?',
    10: 'I have many characters lined up on me, but I never say a word myself. What am I?',
    11: 'What is the tallest mountain in Japan?',
    12: 'What is the currency unit of Japan?',
    13: 'Please enter the characters and numbers shown in the image.',
    14: 'Please enter the characters and numbers shown in the image.',
    15: 'Which symbol represents an ambulance?',
    16: 'Which symbol represents a fire engine?',
    17: 'I grow bigger every year, but nobody wants more of me. What am I?',
    18: 'I am hard when I am cold, but I turn soft and melt when I get warm. What am I?',
    19: 'Which flower is well known as the national flower of Japan?',
    20: 'Which season do school festivals usually take place in?',
    21: 'Please enter the characters and numbers shown in the image.',
    22: 'Please enter the characters and numbers shown in the image.',
    23: 'Which symbol represents a modern bank?',
    24: 'Which symbol represents banknotes (paper money)?',
    25: 'If you call out to it, it runs away, and if you run away, it chases you. What is it?',
    26: 'The more I am used each day, the shorter my body becomes. What am I?',
    27: "Between Tokyo and which city did Japan's first shinkansen line open?",
    28: 'In which month does the new school term usually begin in Japan?',
    29: 'Please enter the characters and numbers shown in the image.',
    30: 'Please enter the characters and numbers shown in the image.',
    31: 'Which symbol represents a flag?',
    32: 'Which symbol represents a patrol emblem?'
};

const englishOptionMap = {
    3: ['Tokyo', 'Osaka', 'Kyoto', 'Fukuoka'],
    4: ['Shizuoka Prefecture', 'Yamanashi Prefecture', 'Kanagawa Prefecture', 'Gifu Prefecture'],
    7: ['bank_modern', 'bank_historic', 'currency_notes', 'crossed_flags'],
    8: ['ambulance', 'fire_engine', 'police_car', 'patrol_cruiser'],
    11: ['Mt. Fuji', 'Mt. Tateyama', 'Mt. Haku', 'Mt. Ontake'],
    12: ['Yen', 'Won', 'Yuan', 'Dollar'],
    15: ['ambulance', 'fire_engine', 'police_car', 'patrol_cruiser'],
    16: ['fire_engine', 'ambulance', 'police_car', 'patrol_cruiser'],
    19: ['Cherry Blossom', 'Sunflower', 'Tulip', 'Rose'],
    20: ['Autumn', 'Winter', 'Summer', 'Spring'],
    23: ['bank_modern', 'bank_historic', 'currency_notes', 'crossed_flags'],
    24: ['currency_notes', 'bank_modern', 'bank_historic', 'crossed_flags'],
    27: ['Osaka', 'Nagoya', 'Fukuoka', 'Sendai'],
    28: ['April', 'January', 'September', 'March'],
    31: ['crossed_flags', 'currency_notes', 'bank_modern', 'bank_historic'],
    32: ['patrol_cruiser', 'police_car', 'ambulance', 'fire_engine']
};

const englishAnswersMap = {
    1: ['shadow', 'a shadow', 'the shadow', 'shadows', 'my shadow', 'your shadow'],
    2: ['thermometer', 'a thermometer', 'the thermometer', 'temperature', 'temp gauge', 'temperature gauge', 'mercury thermometer', 'stairs', 'staircase'],
    3: ['Tokyo', 'tokyo'],
    4: ['Shizuoka Prefecture', 'Shizuoka', 'Shizuoka pref', 'shizuoka'],
    5: ['3K7M', '3k7m'],
    6: ['A5B2', 'a5b2'],
    7: ['bank_historic', 'bank of japan', 'historic bank', 'building', 'bank', 'classical bank', '🏛️', '🏛'],
    8: ['police_car', 'police', 'police car', 'patrol car', 'patrol', '🚓', '🚔'],
    9: ['alarm clock', 'an alarm clock', 'the alarm clock', 'alarm', 'clock'],
    10: ['dictionary', 'a dictionary', 'the dictionary'],
    11: ['Mt. Fuji', 'Mount Fuji', 'mt fuji', 'fuji'],
    12: ['Yen', 'yen', 'japanese yen'],
    13: ['7X2P', '7x2p'],
    14: ['Q9L4', 'q9l4'],
    15: ['ambulance', 'an ambulance', 'the ambulance', 'ambulance car', '🚑'],
    16: ['fire engine', 'fire truck', 'a fire engine', 'the fire engine', '🚒'],
    17: ["age", "my age", "your age", "one's age"],
    18: ['ice cream', 'icecream', 'an ice cream', 'the ice cream'],
    19: ['Cherry Blossom', 'cherry blossom', 'sakura', 'cherry blossoms'],
    20: ['Autumn', 'autumn', 'fall'],
    21: ['M3K8', 'm3k8'],
    22: ['5T1D', '5t1d'],
    23: ['modern bank', 'a modern bank', 'bank_modern', 'bank', '🏦'],
    24: ['banknotes', 'currency notes', 'paper money', 'money', 'cash', '💴'],
    25: ['echo', 'an echo', 'the echo'],
    26: ['pencil', 'a pencil', 'the pencil'],
    27: ['Osaka', 'osaka'],
    28: ['April', 'april'],
    29: ['R6P0', 'r6p0'],
    30: ['8N4W', '8n4w'],
    31: ['flag', 'flags', 'crossed flags', 'crossed_flags', '🎌'],
    32: ['patrol emblem', 'patrol', 'patrol_cruiser', 'emblem', '🚨']
};

const englishCorrectAnswerMap = {
    3: 'Tokyo', 4: 'Shizuoka Prefecture', 7: 'bank_historic', 8: 'police_car',
    11: 'Mt. Fuji', 12: 'Yen', 15: 'ambulance', 16: 'fire_engine',
    19: 'Cherry Blossom', 20: 'Autumn', 23: 'bank_modern', 24: 'currency_notes',
    27: 'Osaka', 28: 'April', 31: 'crossed_flags', 32: 'patrol_cruiser'
};

const englishHintMap = {
    1: { hint1: 'Hint 1: I change every day with the movement of the sun.', hint2: 'Hint 2: I appear when there is light, and disappear when there is none.' },
    2: { hint1: 'Hint 1: Look closely — the numbers go up and down.', hint2: 'Hint 2: You often see one at the doctor\'s office or on a wall.' },
    3: { hint1: 'Hint 1: It is in the Kanto region.', hint2: 'Hint 2: The Olympic Games were held here.' },
    4: { hint1: 'Hint 1: It is a prefecture in the Tokai region.', hint2: 'Hint 2: This prefecture is famous for green tea.' },
    5: { hint1: 'Hint 1: Enter it in capital letters.', hint2: 'Hint 2: The code starts with the number 3.' },
    6: { hint1: 'Hint 1: Everything is in capital letters.', hint2: 'Hint 2: It includes two letters starting with A.' },
    7: { hint1: 'Hint 1: It is related to a classical government building.', hint2: 'Hint 2: It is a dignified historic architectural symbol.' },
    8: { hint1: 'Hint 1: A car equipped with red flashing emergency lights.', hint2: 'Hint 2: It patrols the streets and responds to emergency calls.' },
    9: { hint1: 'Hint 1: It rings at the same time every morning.', hint2: 'Hint 2: It lets you know with a bell or music.' },
    10: { hint1: 'Hint 1: It is often used at school.', hint2: 'Hint 2: Its entries are arranged in alphabetical order.' },
    11: { hint1: 'Hint 1: It sits on the border of Shizuoka and Yamanashi.', hint2: 'Hint 2: It stands 3,776 meters tall.' },
    12: { hint1: 'Hint 1: It comes in coins and banknotes.', hint2: 'Hint 2: It is shown with the "¥" symbol.' },
    13: { hint1: 'Hint 1: Enter it in capital letters.', hint2: 'Hint 2: The code starts with the number 7.' },
    14: { hint1: 'Hint 1: Everything is in capital letters.', hint2: 'Hint 2: It includes a letter starting with Q.' },
    15: { hint1: 'Hint 1: It has a red cross symbol on it.', hint2: 'Hint 2: It carries injured or sick people to the hospital.' },
    16: { hint1: 'Hint 1: It is dispatched when there is a fire.', hint2: 'Hint 2: It is equipped with a ladder and hoses.' },
    17: { hint1: 'Hint 1: It always changes on your birthday.', hint2: 'Hint 2: It is represented by a number.' },
    18: { hint1: 'Hint 1: It is sweet and often eaten in summer.', hint2: 'Hint 2: It is often served in a cone or a cup.' },
    19: { hint1: 'Hint 1: It blooms in spring.', hint2: 'Hint 2: It is famous for flower-viewing parties.' },
    20: { hint1: 'Hint 1: It is a season when the weather starts to cool down.', hint2: 'Hint 2: It often happens around the same time as sports day.' },
    21: { hint1: 'Hint 1: Enter it in capital letters.', hint2: 'Hint 2: It includes the number 3.' },
    22: { hint1: 'Hint 1: Everything is in capital letters.', hint2: 'Hint 2: The code starts with the number 5.' },
    23: { hint1: 'Hint 1: It is shaped like a square building.', hint2: 'Hint 2: It has a yen symbol drawn on it.' },
    24: { hint1: 'Hint 1: It is drawn in green.', hint2: 'Hint 2: A yen symbol sits in the middle.' },
    25: { hint1: 'Hint 1: You hear it after shouting loudly in the mountains.', hint2: 'Hint 2: It is your own voice coming back to you.' },
    26: { hint1: 'Hint 1: It is a tool used for studying.', hint2: 'Hint 2: Sharpening it makes the tip pointy.' },
    27: { hint1: 'Hint 1: It opened in 1964.', hint2: 'Hint 2: That is the year the Tokyo Olympics were held.' },
    28: { hint1: 'Hint 1: It is around the time cherry blossoms bloom.', hint2: 'Hint 2: Many schools hold entrance ceremonies then.' },
    29: { hint1: 'Hint 1: Enter it in capital letters.', hint2: 'Hint 2: It includes a letter starting with R.' },
    30: { hint1: 'Hint 1: Everything is in capital letters.', hint2: 'Hint 2: The code starts with the number 8.' },
    31: { hint1: 'Hint 1: Two flags are crossed over each other.', hint2: 'Hint 2: The tips of the yellow flagpoles are rounded.' },
    32: { hint1: 'Hint 1: It has a sunburst-like radial design.', hint2: 'Hint 2: It is a symbol related to the police.' }
};

const translations = {
    ja: {
        pageTitle: '「シン・探せいとかい：II」',
        menuText: 'ようこそ！このゲームをプレイしますか？',
        rulesTitle: 'ゲームルール',
        rules: [
            '32個のなぞなぞの中から、ランダムに8つが選ばれます',
            '各問題に対して正しい答えを入力してください',
            '1ページに2問ずつ出題され、1問目を正解すると2問目が開きます',
            '2問正解するごとにスタンプが1つ増えます（全部で4つ！）',
            'すべてのなぞなぞとコードをクリアして、宝いを開ける！',
            '毎回異なる問題が出題されます'
        ],
        menuDescription: '32個のなぞなぞの中から8つを選んで、コードをゲットしよう！',
        startGame: 'ゲーム開始！',
        language: 'Language',
        questionNumPrefix: '問題',
        answerPlaceholder: '答えを入力してください～',
        captchaPlaceholder: '文字と数字を入力してください',
        choiceDefaultText: '選択肢から選んでください',
        visualDefaultText: '正しい選択肢をクリックしてください',
        captchaDefaultText: '画像に含まれる数字と文字を組み合わせて答えてください',
        checkAnswerBtn: '答える！',
        resultEmpty: '答えを入力してください！',
        resultWrong: '不正解です。もう一度試してください！',
        resultCorrect: 'やったね！大正解！！',
        resultDuplicate: 'その回答はすでに試しました！',
        mistakeCountLabel: (n) => `失敗数: ${n}`,
        hint1Locked: 'ヒント１（3回失敗後に表示）',
        hint1Unlocked: 'ヒント１を見る',
        hint1Maxed: 'ヒント１は2回まで',
        hint2Locked: 'ヒント２（5回失敗後に表示）',
        hint2Unlocked: 'ヒント２を見る',
        hint2Maxed: 'ヒント２は2回まで',
        intermediateTitle: '正解です！',
        intermediateDescription: '次の問題に進むため、コードを入力またはスキャンしてください',
        intermediateManualLabel: '手動でコードを入力:',
        intermediateInputPlaceholder: 'コードを入力してください',
        intermediateSubmitBtn: 'コード送信',
        intermediateQrLabel: 'またはQRコードをスキャン:',
        qrOpenBtn: 'QRスキャナーを開く',
        qrCloseBtn: 'スキャンを閉じる',
        qrStatusAccessing: 'カメラをアクセス中...',
        qrStatusScanning: 'カメラに向けてQRコードをスキャンしてください',
        qrStatusError: 'カメラにアクセスできませんでした',
        intermediateCodeEmpty: 'コードを入力してください！',
        intermediateCodeInvalid: 'コードが無効です。正しいコードを入力してください。',
        intermediateCodeSuccess: 'コードが認証されました！次の問題に進みます...',
        finalTitle: 'やったね！全問題をクリアしました！',
        finalDescription: '最後のステップです。最終コードを入力またはスキャンしてください',
        finalManualLabel: '手動でコードを入力:',
        finalInputPlaceholder: 'コードを入力してください',
        finalSubmitBtn: 'コード送信',
        finalQrLabel: 'またはQRコードをスキャン:',
        finalSuccess: 'コードが認証されました！おめでとうございます！',
        finalCodeInvalid: 'コードが無効です。正しいコードを入力してください。',
        finalCodeEmpty: 'コードを入力してください！',
        playAgainBtn: 'もう一度プレイ',
        personaCallouts: ['イケイケ！', 'どうだろうな！', '当たってMiiや！', 'せやで～'],
        personaCalloutRare: 'それちゃうわぼけw',
        antiCheatScreenshot: 'スクリーンショットは禁止されています！',
        antiCheatPrint: '印刷機能は禁止されています！',
        antiCheatDevTools: '開発者ツールは禁止されています！',
        antiCheatContextMenu: '右クリックは禁止されています！'
    },
    en: {
        pageTitle: 'Shin Seitokai: II',
        menuText: 'Welcome! Would you like to play this game?',
        rulesTitle: 'Game Rules',
        rules: [
            '8 out of 32 riddles/questions are chosen at random',
            'Two questions appear on each page',
            'Question 2 unlocks only after Question 1 is correct',
            'You earn a stamp every 2 correct answers (4 stamps total!)',
            'Clear all riddles and secret codes to unlock the treasure!',
            'A different set of questions appears each playthrough'
        ],
        menuDescription: 'Solve 8 randomly picked riddles and discover the secret code!',
        startGame: 'Start Game!',
        language: 'Language',
        questionNumPrefix: 'Question',
        answerPlaceholder: 'Type your answer here...',
        captchaPlaceholder: 'Type the letters and numbers',
        choiceDefaultText: 'Choose from the options below',
        visualDefaultText: 'Click the correct symbol',
        captchaDefaultText: 'Please enter the characters and numbers shown in the image',
        checkAnswerBtn: 'Submit Answer!',
        resultEmpty: 'Please enter your answer!',
        resultWrong: 'Incorrect. Please try again!',
        resultCorrect: 'Awesome! That is correct!!',
        resultDuplicate: 'You already tried this answer!',
        mistakeCountLabel: (n) => `Mistakes: ${n}`,
        hint1Locked: 'Hint 1 (unlocks after 3 mistakes)',
        hint1Unlocked: 'View Hint 1',
        hint1Maxed: 'Hint 1: max 2 views',
        hint2Locked: 'Hint 2 (unlocks after 5 mistakes)',
        hint2Unlocked: 'View Hint 2',
        hint2Maxed: 'Hint 2: max 2 views',
        intermediateTitle: 'Correct Answer!',
        intermediateDescription: 'Enter or scan the secret code to proceed to the next question',
        intermediateManualLabel: 'Enter code manually:',
        intermediateInputPlaceholder: 'Enter code here',
        intermediateSubmitBtn: 'Submit Code',
        intermediateQrLabel: 'Or scan the QR code:',
        qrOpenBtn: 'Open QR Scanner',
        qrCloseBtn: 'Close Scanner',
        qrStatusAccessing: 'Accessing camera...',
        qrStatusScanning: 'Point your camera at a QR code',
        qrStatusError: 'Could not access camera',
        intermediateCodeEmpty: 'Please enter the code!',
        intermediateCodeInvalid: 'Invalid code. Please enter the correct code.',
        intermediateCodeSuccess: 'Code verified! Moving to the next question...',
        finalTitle: 'You did it! All questions cleared!',
        finalDescription: 'Final step: enter or scan the secret code to complete the game',
        finalManualLabel: 'Enter code manually:',
        finalInputPlaceholder: 'Enter code here',
        finalSubmitBtn: 'Submit Code',
        finalQrLabel: 'Or scan the QR code:',
        finalSuccess: 'Code verified! Congratulations!',
        finalCodeInvalid: 'Invalid code. Please enter the correct code.',
        finalCodeEmpty: 'Please enter the code!',
        playAgainBtn: 'Play Again',
        personaCallouts: ['ANSWERING!', 'IM DOING IT~', 'ARE YOU SURE?', 'LETS GO!'],
        personaCalloutRare: 'do u know da way',
        antiCheatScreenshot: 'Screenshots are disabled!',
        antiCheatPrint: 'Printing is disabled!',
        antiCheatDevTools: 'Developer tools are disabled!',
        antiCheatContextMenu: 'Right-click is disabled!'
    }
};

// ==========================================
// GAME STATE MANAGEMENT
// ==========================================
let gameState = {
    currentQuestion: 0,
    pairPage: 0,
    q1Correct: false,
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

// Helper Functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function selectRandomQuestions(allQuestions, count = 8) {
    return shuffleArray(allQuestions).slice(0, count);
}

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
        .replace(/[。！？.,!?:;'"“”]/g, '');
}

function getLocalizedHint(question, hintNumber) {
    const key = hintNumber === 1 ? 'hint1' : 'hint2';
    if (gameState.language === 'en' && englishHintMap[question.id]) {
        return englishHintMap[question.id][key];
    }
    return question[key];
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
    answers.push(...(englishAnswersMap[question.id] || []));
    if (question.correctAnswer) answers.push(question.correctAnswer);
    if (englishCorrectAnswerMap[question.id]) answers.push(englishCorrectAnswerMap[question.id]);
    return [...new Set(answers.filter(Boolean))];
}

// ==========================================
// UI LOCALIZATION
// ==========================================
function applyLanguageUI() {
    const lang = gameState.language;
    const t = translations[lang] || translations.ja;

    document.documentElement.lang = lang;
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = t.pageTitle;

    const menuText = document.getElementById('menuText');
    const rulesTitle = document.getElementById('rulesTitle');
    const rulesList = document.getElementById('rulesList');
    const menuDescription = document.getElementById('menuDescription');
    const startGameBtn = document.getElementById('startGameBtn');
    const languageLabel = document.querySelector('.language-label');
    const languageSelect = document.getElementById('languageSelect');

    if (menuText) menuText.textContent = t.menuText;
    if (rulesTitle) rulesTitle.innerHTML = `${getGameIconSvg('icon_rules')} <span>${t.rulesTitle}</span>`;
    if (rulesList && t.rules) rulesList.innerHTML = t.rules.map(item => `<li>${item}</li>`).join('');
    if (menuDescription) {
        const customJa = menuDescription.dataset.ja || t.menuDescription;
        const customEn = menuDescription.dataset.en || t.menuDescription;
        menuDescription.textContent = lang === 'en' ? customEn : customJa;
    }
    if (startGameBtn) startGameBtn.textContent = t.startGame;
    if (languageLabel) languageLabel.innerHTML = `${getGameIconSvg('icon_lang')} <span>${t.language}</span>`;
    if (languageSelect) languageSelect.value = lang;

    if (gameState.stage === 'question' && gameState.questionSequence.length) {
        renderQuestionPair();
    }

    // Intermediate Screen UI
    const intTitle = document.getElementById('intermediateCodeTitle');
    if (intTitle) intTitle.textContent = t.intermediateTitle;
    const intDesc = document.getElementById('intermediateCodeDescription');
    if (intDesc) intDesc.textContent = t.intermediateDescription;
    const intManual = document.getElementById('intermediateManualLabel');
    if (intManual) intManual.textContent = t.intermediateManualLabel;
    const intInput = document.getElementById('intermediateCodeInput');
    if (intInput) intInput.placeholder = t.intermediateInputPlaceholder;
    const intSubBtn = document.getElementById('intermediateSubmitBtn');
    if (intSubBtn) intSubBtn.textContent = t.intermediateSubmitBtn;
    const intQrLabel = document.getElementById('intermediateQrLabel');
    if (intQrLabel) intQrLabel.textContent = t.intermediateQrLabel;
    const intQrToggle = document.getElementById('intermediateQrToggleBtn');
    if (intQrToggle) intQrToggle.textContent = t.qrOpenBtn;
    const intQrClose = document.getElementById('intermediateQrCloseBtn');
    if (intQrClose) intQrClose.textContent = t.qrCloseBtn;

    // Final Screen UI
    const finalTitle = document.getElementById('finalCodeTitle');
    if (finalTitle) finalTitle.textContent = t.finalTitle;
    const finalDesc = document.getElementById('finalCodeDescription');
    if (finalDesc) finalDesc.textContent = t.finalDescription;
    const finalManual = document.getElementById('finalManualLabel');
    if (finalManual) finalManual.textContent = t.finalManualLabel;
    const finalInput = document.getElementById('codeInput');
    if (finalInput) finalInput.placeholder = t.finalInputPlaceholder;
    const finalSubBtn = document.getElementById('finalSubmitBtn');
    if (finalSubBtn) finalSubBtn.textContent = t.finalSubmitBtn;
    const finalQrLabel = document.getElementById('finalQrLabel');
    if (finalQrLabel) finalQrLabel.textContent = t.finalQrLabel;
    const qrToggle = document.getElementById('qrToggleBtn');
    if (qrToggle) qrToggle.textContent = t.qrOpenBtn;
    const finalQrClose = document.getElementById('finalQrCloseBtn');
    if (finalQrClose) finalQrClose.textContent = t.qrCloseBtn;
    const resetBtn = document.getElementById('resetGameBtn');
    if (resetBtn) resetBtn.textContent = t.playAgainBtn;
}

// ==========================================
// CORE GAME LOGIC
// ==========================================
function startGame() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) gameState.language = languageSelect.value || 'ja';

    gameState.stage = 'question';
    gameState.currentQuestion = 0;
    gameState.pairPage = 0;
    gameState.q1Correct = false;
    gameState.completedQuestions = 0;
    gameState.secretCode = SHARED_SECRET_CODE;
    gameState.answerLocked = false;
    gameState.isCooldown = false;

    const stampTray = document.getElementById('stampTray');
    if (stampTray) {
        stampTray.innerHTML = '';
        stampTray.classList.remove('hidden');
    }

    gameState.questionSequence = selectRandomQuestions(questions, 8);
    showScreen('questionScreen');
    renderQuestionPair();
}

function getPairQuestion(slot) {
    return gameState.questionSequence[gameState.pairPage * 2 + slot];
}

function renderQuestionPair() {
    const pair = document.getElementById('questionPair');
    if (!pair) return;

    const q1 = getPairQuestion(0);
    const q2 = getPairQuestion(1);
    if (!q1 || !q2) return;

    const qNum = document.getElementById('questionNumber');
    if (qNum) {
        const page = gameState.pairPage + 1;
        qNum.textContent = gameState.language === 'en'
            ? `Page ${page} / 4 — Questions ${gameState.pairPage * 2 + 1}–${gameState.pairPage * 2 + 2}`
            : `ページ #${page} / 4 — 問題 ${gameState.pairPage * 2 + 1}・${gameState.pairPage * 2 + 2}`;
    }

    pair.innerHTML = '';
    pair.appendChild(buildQuestionCard(q1, 0));
    pair.appendChild(buildQuestionCard(q2, 1));

    const pFill = document.getElementById('progressFill');
    if (pFill) pFill.style.width = `${((gameState.pairPage + 1) / 4) * 100}%`;

    setQuestion2Locked(!gameState.q1Correct);
}

function buildQuestionCard(question, slot) {
    const card = document.createElement('section');
    card.className = `pair-question-card ${slot === 1 && !gameState.q1Correct ? 'question-locked' : ''}`;
    card.id = `questionCard${slot}`;

    const title = document.createElement('div');
    title.className = 'pair-question-title';
    title.textContent = gameState.language === 'en'
        ? `Question ${gameState.pairPage * 2 + slot + 1}`
        : `第${gameState.pairPage * 2 + slot + 1}問`;
    card.appendChild(title);

    const text = document.createElement('p');
    text.className = 'pair-question-text';
    text.textContent = getLocalizedQuestionText(question);
    card.appendChild(text);

    const content = document.createElement('div');
    content.className = 'pair-question-content';

    if (question.type === 'riddle') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `answer-${slot}`;
        input.className = 'pair-answer-input';
        input.placeholder = (translations[gameState.language] || translations.ja).answerPlaceholder;
        content.appendChild(input);
    } else if (question.type === 'choice') {
        const options = document.createElement('div');
        options.className = 'options-container';
        getLocalizedOptions(question).forEach(option => {
            const label = document.createElement('label');
            label.className = 'choice-option';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `choiceAnswer-${slot}`;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            options.appendChild(label);
        });
        content.appendChild(options);
    } else if (question.type === 'captcha') {
        const captcha = document.createElement('div');
        captcha.className = 'captcha-box';
        for (const char of question.captchaText) {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'captcha-char';
            span.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
            captcha.appendChild(span);
        }
        content.appendChild(captcha);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `captchaAnswer-${slot}`;
        input.className = 'pair-answer-input';
        input.placeholder = (translations[gameState.language] || translations.ja).captchaPlaceholder;
        content.appendChild(input);
    } else if (question.type === 'visual') {
        const options = document.createElement('div');
        options.className = 'visual-options-container';
        getLocalizedOptions(question).forEach(optionKey => {
            const label = document.createElement('label');
            label.className = 'visual-option';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `visualAnswer-${slot}`;
            input.value = optionKey;
            label.appendChild(input);

            const iconWrapper = document.createElement('div');
            iconWrapper.className = 'visual-icon-wrapper';
            iconWrapper.innerHTML = getGameIconSvg(optionKey);
            label.appendChild(iconWrapper);

            const meta = visualOptionMeta[optionKey];
            const caption = document.createElement('span');
            caption.className = 'visual-option-label';
            caption.textContent = meta ? (meta[gameState.language] || meta.ja) : optionKey;
            label.appendChild(caption);
            options.appendChild(label);
        });
        content.appendChild(options);
    }

    card.appendChild(content);

    const result = document.createElement('p');
    result.id = `result-${slot}`;
    result.className = 'pair-result';
    card.appendChild(result);

    const button = document.createElement('button');
    button.className = 'btn-primary pair-answer-button';
    button.textContent = (translations[gameState.language] || translations.ja).checkAnswerBtn;
    button.onclick = () => checkAnswer(slot);
    card.appendChild(button);

    const hint = document.createElement('div');
    hint.className = 'pair-hints';

    const mistake = document.createElement('p');
    mistake.id = `mistakeCount-${slot}`;
    mistake.className = 'pair-mistake-count';
    mistake.textContent = (translations[gameState.language] || translations.ja).mistakeCountLabel(0);
    hint.appendChild(mistake);

    const h1 = document.createElement('button');
    h1.id = `hint1Btn-${slot}`;
    h1.className = 'btn-hint';
    h1.textContent = (translations[gameState.language] || translations.ja).hint1Locked;
    h1.disabled = true;
    h1.onclick = () => showHint1(slot);
    hint.appendChild(h1);

    const h1box = document.createElement('div');
    h1box.id = `hint1Container-${slot}`;
    h1box.className = 'hint-box hidden';
    hint.appendChild(h1box);

    const h2 = document.createElement('button');
    h2.id = `hint2Btn-${slot}`;
    h2.className = 'btn-hint';
    h2.textContent = (translations[gameState.language] || translations.ja).hint2Locked;
    h2.disabled = true;
    h2.onclick = () => showHint2(slot);
    hint.appendChild(h2);

    const h2box = document.createElement('div');
    h2box.id = `hint2Container-${slot}`;
    h2box.className = 'hint-box hidden';
    hint.appendChild(h2box);

    card.appendChild(hint);

    if (slot === 1 && !gameState.q1Correct) {
        const lock = document.createElement('div');
        lock.className = 'question-lock-overlay';
        lock.textContent = gameState.language === 'en'
            ? '🔒 Solve Question 1 first'
            : '🔒 第1問を正解すると開きます';
        card.appendChild(lock);
    }

    return card;
}

function setQuestion2Locked(locked) {
    const card = document.getElementById('questionCard1');
    if (!card) return;
    card.classList.toggle('question-locked', locked);

    card.querySelectorAll('input, button').forEach(el => {
        el.disabled = locked;
    });

    const overlay = card.querySelector('.question-lock-overlay');
    if (locked && !overlay) {
        const lock = document.createElement('div');
        lock.className = 'question-lock-overlay';
        lock.textContent = gameState.language === 'en'
            ? '🔒 Solve Question 1 first'
            : '🔒 第1問を正解すると開きます';
        card.appendChild(lock);
    } else if (!locked && overlay) {
        overlay.remove();
    }
}

function addStamp() {
    const stampTray = document.getElementById('stampTray');
    if (stampTray) {
        const stamp = document.createElement('span');
        stamp.className = 'stamp-item';
        stamp.innerHTML = getGameIconSvg('stamp_star');
        stampTray.appendChild(stamp);
    }
}

function checkAnswer(slot) {
    if (slot === 1 && !gameState.q1Correct) return;

    const question = getPairQuestion(slot);
    if (!question) return;

    const questionId = question.id;
    const card = document.getElementById(`questionCard${slot}`);
    const resultElement = document.getElementById(`result-${slot}`);
    const submitBtn = card?.querySelector('.pair-answer-button');
    const activeT = translations[gameState.language] || translations.ja;

    let userAnswer = '';
    if (question.type === 'choice') {
        userAnswer = card.querySelector(`input[name="choiceAnswer-${slot}"]:checked`)?.value || '';
    } else if (question.type === 'visual') {
        userAnswer = card.querySelector(`input[name="visualAnswer-${slot}"]:checked`)?.value || '';
    } else if (question.type === 'captcha') {
        userAnswer = document.getElementById(`captchaAnswer-${slot}`)?.value.trim() || '';
    } else {
        userAnswer = document.getElementById(`answer-${slot}`)?.value.trim() || '';
    }

    if (!userAnswer) {
        resultElement.textContent = activeT.resultEmpty;
        resultElement.style.color = 'orange';
        return;
    }

    if (!gameState.wrongAnswerHistory[questionId]) gameState.wrongAnswerHistory[questionId] = [];
    const normalized = normalizeAnswer(userAnswer);
    const accepted = getAcceptedAnswers(question);
    const correct = accepted.some(answer => normalizeAnswer(answer) === normalized);

    if (correct) {
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.65';
        }

        resultElement.textContent = activeT.resultCorrect;
        resultElement.style.color = 'green';
        gameState.completedQuestions++;

        if (slot === 0) {
            gameState.q1Correct = true;
            celebrateCorrectAnswer();
            setQuestion2Locked(false);
        } else {
            if (gameState.completedQuestions % 2 === 0) addStamp();
            celebrateCorrectAnswer();

            setTimeout(() => {
                if (gameState.pairPage < 3) {
                    gameState.pairPage++;
                    gameState.currentQuestion = gameState.pairPage * 2;
                    gameState.q1Correct = false;
                    renderQuestionPair();
                } else {
                    gameState.stage = 'code';
                    showScreen('codeScreen');
                    applyLanguageUI();
                }
            }, 900);
        }
        return;
    }

    const duplicate = gameState.wrongAnswerHistory[questionId].some(
        previous => normalizeAnswer(previous) === normalized
    );
    if (duplicate) {
        resultElement.textContent = activeT.resultDuplicate;
        resultElement.style.color = 'orange';
        return;
    }

    gameState.wrongAnswerHistory[questionId].push(userAnswer);

    const mistakeKey = `mistakes_${questionId}`;
    gameState[mistakeKey] = (gameState[mistakeKey] || 0) + 1;
    const mistakes = gameState[mistakeKey];

    resultElement.textContent = activeT.resultWrong;
    resultElement.style.color = 'red';

    const mistakeElement = document.getElementById(`mistakeCount-${slot}`);
    if (mistakeElement) mistakeElement.textContent = activeT.mistakeCountLabel(mistakes);

    if (mistakes >= 3) {
        const h1 = document.getElementById(`hint1Btn-${slot}`);
        if (h1) {
            h1.disabled = false;
            h1.classList.add('unlocked');
            h1.textContent = activeT.hint1Unlocked;
        }
    }
    if (mistakes >= 5) {
        const h2 = document.getElementById(`hint2Btn-${slot}`);
        if (h2) {
            h2.disabled = false;
            h2.classList.add('unlocked');
            h2.textContent = activeT.hint2Unlocked;
        }
    }
}

function showHint1(slot) {
    const question = getPairQuestion(slot);
    if (!question) return;
    const id = question.id;
    const attempts = gameState.hint1Attempts[id] || 0;
    const mistakes = gameState[`mistakes_${id}`] || 0;
    if (mistakes < 3 || attempts >= 2) return;

    const box = document.getElementById(`hint1Container-${slot}`);
    if (box) {
        box.textContent = getLocalizedHint(question, 1);
        box.classList.remove('hidden');
    }
    gameState.hint1Attempts[id] = attempts + 1;

    if (gameState.hint1Attempts[id] >= 2) {
        const btn = document.getElementById(`hint1Btn-${slot}`);
        if (btn) {
            btn.disabled = true;
            btn.textContent = (translations[gameState.language] || translations.ja).hint1Maxed;
        }
    }
}

function showHint2(slot) {
    const question = getPairQuestion(slot);
    if (!question) return;
    const id = question.id;
    const attempts = gameState.hint2Attempts[id] || 0;
    const mistakes = gameState[`mistakes_${id}`] || 0;
    if (mistakes < 5 || attempts >= 2) return;

    const box = document.getElementById(`hint2Container-${slot}`);
    if (box) {
        box.textContent = getLocalizedHint(question, 2);
        box.classList.remove('hidden');
    }
    gameState.hint2Attempts[id] = attempts + 1;

    if (gameState.hint2Attempts[id] >= 2) {
        const btn = document.getElementById(`hint2Btn-${slot}`);
        if (btn) {
            btn.disabled = true;
            btn.textContent = (translations[gameState.language] || translations.ja).hint2Maxed;
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

// ==========================================
// CODE SUBMISSION
// ==========================================
function isCodeValid(inputCode) {
    const normalizedInput = inputCode.trim().toUpperCase();
    return SHARED_SECRET_CODE.some(code => code.toUpperCase() === normalizedInput);
}

function submitCode() {
    const input = document.getElementById('codeInput');
    const codeInput = input ? input.value.trim() : '';
    const codeResultElement = document.getElementById('codeResult');
    const activeT = translations[gameState.language] || translations.ja;
    if (!codeResultElement) return;

    if (codeInput === '') {
        codeResultElement.textContent = activeT.finalCodeEmpty;
        codeResultElement.style.color = 'orange';
        return;
    }

    if (isCodeValid(codeInput)) {
        codeResultElement.innerHTML = `
            <div class="celebration-banner">
                ${getGameIconSvg('trophy_celebration')}
                <span class="celebration-text">${activeT.finalSuccess}</span>
            </div>
        `;
        codeResultElement.style.color = 'var(--green)';
    } else {
        codeResultElement.textContent = activeT.finalCodeInvalid;
        codeResultElement.style.color = 'red';
    }
}

function submitIntermediateCode() {
    const input = document.getElementById('intermediateCodeInput');
    const codeInput = input ? input.value.trim() : '';
    const codeResultElement = document.getElementById('intermediateCodeResult');
    const activeT = translations[gameState.language] || translations.ja;
    if (!codeResultElement) return;

    if (codeInput === '') {
        codeResultElement.textContent = activeT.intermediateCodeEmpty;
        codeResultElement.style.color = 'orange';
        return;
    }

    if (isCodeValid(codeInput)) {
        codeResultElement.textContent = activeT.intermediateCodeSuccess;
        codeResultElement.style.color = 'green';

        setTimeout(() => {
            gameState.currentQuestion++;
            if (gameState.currentQuestion < gameState.questionSequence.length) {
                showScreen('questionScreen');
                renderQuestionPair();
            } else {
                gameState.stage = 'finalCode';
                showScreen('codeScreen');
                applyLanguageUI();
            }
        }, 1000);
    } else {
        codeResultElement.textContent = activeT.intermediateCodeInvalid;
        codeResultElement.style.color = 'red';
    }
}

// ==========================================
// QR CODE SCANNERS
// ==========================================
function toggleIntermediateQRScanner() {
    const container = document.getElementById('intermediateQrScannerContainer');
    const video = document.getElementById('intermediateQrVideo');
    const canvas = document.getElementById('intermediateQrCanvas');
    const status = document.getElementById('intermediateQrScannerStatus');
    const activeT = translations[gameState.language] || translations.ja;

    if (!container || !video || !canvas) return;

    if (gameState.intermediateQrScannerActive) {
        stopIntermediateQRScanner();
        return;
    }

    container.classList.remove('hidden');
    if (status) status.textContent = activeT.qrStatusAccessing;
    gameState.intermediateQrScannerActive = true;

    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
            gameState.intermediateQrScannerStream = stream;
            video.srcObject = stream;
            video.setAttribute('playsinline', true);
            video.play();
            if (status) status.textContent = activeT.qrStatusScanning;

            function scanFrame() {
                if (!gameState.intermediateQrScannerActive) return;
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    canvas.height = video.videoHeight;
                    canvas.width = video.videoWidth;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    if (window.jsQR) {
                        const code = window.jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
                        if (code && code.data) {
                            const input = document.getElementById('intermediateCodeInput');
                            if (input) input.value = code.data;
                            stopIntermediateQRScanner();
                            submitIntermediateCode();
                            return;
                        }
                    }
                }
                requestAnimationFrame(scanFrame);
            }
            requestAnimationFrame(scanFrame);
        })
        .catch((err) => {
            console.error('Camera error:', err);
            if (status) status.textContent = activeT.qrStatusError;
            gameState.intermediateQrScannerActive = false;
        });
}

function stopIntermediateQRScanner() {
    const container = document.getElementById('intermediateQrScannerContainer');
    const video = document.getElementById('intermediateQrVideo');
    if (container) container.classList.add('hidden');
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    if (gameState.intermediateQrScannerStream) {
        gameState.intermediateQrScannerStream.getTracks().forEach(track => track.stop());
        gameState.intermediateQrScannerStream = null;
    }
    gameState.intermediateQrScannerActive = false;
}

function toggleQRScanner() {
    const container = document.getElementById('qrScannerContainer');
    const video = document.getElementById('qrVideo');
    const canvas = document.getElementById('qrCanvas');
    const status = document.getElementById('qrScannerStatus');
    const activeT = translations[gameState.language] || translations.ja;

    if (!container || !video || !canvas) return;

    if (gameState.qrScannerActive) {
        stopQRScanner();
        return;
    }

    container.classList.remove('hidden');
    if (status) status.textContent = activeT.qrStatusAccessing;
    gameState.qrScannerActive = true;

    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
            gameState.qrScannerStream = stream;
            video.srcObject = stream;
            video.setAttribute('playsinline', true);
            video.play();
            if (status) status.textContent = activeT.qrStatusScanning;

            function scanFrame() {
                if (!gameState.qrScannerActive) return;
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    canvas.height = video.videoHeight;
                    canvas.width = video.videoWidth;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    if (window.jsQR) {
                        const code = window.jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
                        if (code && code.data) {
                            const input = document.getElementById('codeInput');
                            if (input) input.value = code.data;
                            stopQRScanner();
                            submitCode();
                            return;
                        }
                    }
                }
                requestAnimationFrame(scanFrame);
            }
            requestAnimationFrame(scanFrame);
        })
        .catch((err) => {
            console.error('Camera error:', err);
            if (status) status.textContent = activeT.qrStatusError;
            gameState.qrScannerActive = false;
        });
}

function stopQRScanner() {
    const container = document.getElementById('qrScannerContainer');
    const video = document.getElementById('qrVideo');
    if (container) container.classList.add('hidden');
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    if (gameState.qrScannerStream) {
        gameState.qrScannerStream.getTracks().forEach(track => track.stop());
        gameState.qrScannerStream = null;
    }
    gameState.qrScannerActive = false;
}

function resetGame() {
    stopIntermediateQRScanner();
    stopQRScanner();

    const stampTray = document.getElementById('stampTray');
    if (stampTray) {
        stampTray.innerHTML = '';
        stampTray.classList.add('hidden');
    }
    const previousLanguage = gameState.language || 'ja';
    gameState = {
        currentQuestion: 0,
        pairPage: 0,
        q1Correct: false,
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

// ==========================================
// INITIALIZATION & EASTER EGGS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            gameState.language = event.target.value || 'ja';
            applyLanguageUI();
        });
    }
    applyLanguageUI();

    // Easter Egg Setup
    const callout = document.createElement('div');
    callout.id = 'easterEggCallout';
    document.body.appendChild(callout);

    let calloutTimeoutId = null;

    const personaCallouts = {
        en: { standard: ['ANSWERING!', 'IM DOING IT~', 'ARE YOU SURE?', 'LETS GO!'], rare: 'do u know da way' },
        ja: { standard: ['イケイケ！', 'どうだろうな！', '当たってMiiや！', 'せやで～'], rare: 'それちゃうわぼけw' }
    };

    function triggerPersonaHover(target) {
        if (target.classList.contains('btn-hint') && !target.classList.contains('unlocked')) return;

        target.classList.remove('persona-hover');
        void target.offsetWidth;
        target.classList.add('persona-hover');

        const isEn = gameState?.language === 'en' || document.getElementById('languageSelect')?.value === 'en';
        const langConfig = isEn ? personaCallouts.en : personaCallouts.ja;
        const isRare = Math.random() < 0.1;

        let textToShow = isRare ? langConfig.rare : langConfig.standard[Math.floor(Math.random() * langConfig.standard.length)];

        if (isRare) {
            callout.classList.add('rare');
        } else {
            callout.classList.remove('rare');
        }

        callout.textContent = textToShow;

        const rect = target.getBoundingClientRect();
        callout.style.top = `${rect.top - 8}px`;
        callout.style.left = `${rect.left + (rect.width / 2)}px`;

        callout.classList.remove('show');
        void callout.offsetWidth;
        callout.classList.add('show');

        clearTimeout(calloutTimeoutId);
        calloutTimeoutId = setTimeout(() => {
            callout.classList.remove('show');
            callout.classList.remove('rare');
        }, 600);
    }

    document.body.addEventListener('mouseenter', (e) => {
        const target = e.target.closest('.btn-primary, .btn-secondary, .btn-hint, .choice-option, .visual-option');
        if (target) triggerPersonaHover(target);
    }, true);

    document.body.addEventListener('animationend', (e) => {
        if (e.animationName === 'personaSmoothPulse' || e.animationName === 'personaJitter') {
            e.target.classList.remove('persona-hover');
        }
    }, true);
});
