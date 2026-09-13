"use strict";

/* =====================================================================
 * 1. DATA OTÁZEK — zde upravujte zadání, možnosti a správnost.
 * Stabilní id propojuje odpověď s hodnocením, nikoli její pozice či písmeno.
 * Správné odpovědi jsou v čistě statické aplikaci dostupné ve zdrojovém kódu.
 * Uzamčení chrání průchod rozhraním, není ověřením identity ani proti podvodu.
 * ===================================================================== */
const MATERIAL = {title:"ICT v práci farmaceutického asistenta", url:"https://ucebnaa101.github.io/Ict_ve_farmacii/"};
const LINKS = {
  sukl:"https://sukl.gov.cz/faq/jak-je-rozdelena-napln-prace-jednotlivych-pracovniku-lekarny/",
  recept:"https://epreskripce.gov.cz/faq/1-co-je-to-erecept/",
  poukaz:"https://epreskripce.gov.cz/faq/1-co-je-epoukaz/",
  security:"https://ncez.mzcr.cz/cs/kyberneticka-bezpecnost/kyberneticka-bezpecnost",
  wiki:"https://cs.wikipedia.org/wiki/L%C3%A9ka%C5%99sk%C3%BD_p%C5%99edpis#Elektronick%C3%BD_recept",
  search:"https://search.seznam.cz/?q=eRecept"
};
const BOOK_MODELS = {
  Harvard:"RADVÁKOVÁ, Věra a Tomáš SIGMUND, 2020. Základy odborné práce včetně základů informační etiky. 2., aktualizované a rozšířené vydání. Praha: Oeconomica, nakladatelství VŠE. ISBN 978-80-245-2404-7.",
  APA:"Radváková, V., & Sigmund, T. (2020). Základy odborné práce včetně základů informační etiky (2., aktualizované a rozšířené vydání). Oeconomica, nakladatelství VŠE."
};
const CITATION_OPTIONS = {
  Harvard:[
    {id:"h-correct",correct:true,cite:"(ICT v práci farmaceutického asistenta, bez data)",record:`ICT v práci farmaceutického asistenta. Bez data. [online]. Dostupné z: ${MATERIAL.url}`},
    {id:"h-author",correct:false,cite:"(Novák, bez data)",record:`NOVÁK, Jan. Bez data. ICT v práci farmaceutického asistenta. [online]. Dostupné z: ${MATERIAL.url}`},
    {id:"h-year",correct:false,cite:"(ICT v práci farmaceutického asistenta, 2024)",record:`ICT v práci farmaceutického asistenta. 2024. [online]. Dostupné z: ${MATERIAL.url}`},
    {id:"h-mismatch",correct:false,cite:"(ICT ve farmacii, bez data)",record:`ICT v práci farmaceutického asistenta. Bez data. [online]. Dostupné z: ${MATERIAL.url}`}
  ],
  APA:[
    {id:"a-correct",correct:true,cite:"(ICT v práci farmaceutického asistenta, n.d.)",record:`ICT v práci farmaceutického asistenta. (n.d.). ${MATERIAL.url}`},
    {id:"a-author",correct:false,cite:"(Novák, n.d.)",record:`Novák, J. (n.d.). ICT v práci farmaceutického asistenta. ${MATERIAL.url}`},
    {id:"a-year",correct:false,cite:"(ICT v práci farmaceutického asistenta, 2024)",record:`ICT v práci farmaceutického asistenta. (2024). ${MATERIAL.url}`},
    {id:"a-mismatch",correct:false,cite:"(ICT ve farmacii, n.d.)",record:`ICT v práci farmaceutického asistenta. (n.d.). ${MATERIAL.url}`}
  ]
};
const QUESTIONS = [
  {id:"direct",title:"Přímá citace",type:"single",prompt:"Student převzal část odborného textu beze změny, vložil ji do uvozovek, označil kurzívou a uvedl odkaz na původní zdroj. Co provedl?",options:[
    {id:"direct-paraphrase",text:"parafrázi",correct:false},{id:"direct-quote",text:"přímou (doslovnou) citaci",correct:true},{id:"direct-common",text:"obecně známou informaci",correct:false},{id:"direct-wrong",text:"nesprávné převzetí textu",correct:false}
  ],feedbackCorrect:"Jedná se o přímou (doslovnou) citaci, protože text byl převzat beze změny a řádně označen.",feedbackWrong:"Původní text nebyl přeformulován, ale převzat beze změny. Jedná se proto o přímou (doslovnou) citaci. Podle metodického manuálu školy se doslovně převzatý text uvádí v uvozovkách a kurzívou a doplňuje se odkazem na původní zdroj."},
  {id:"paraphrase",title:"Parafráze",type:"single",prompt:"Která z následujících možností představuje správnou parafrázi původního textu?",original:"ICT jsou součástí každodenní práce lékárny: pomáhají s objednávkami, zásobami, informacemi a elektronickými poukazy.",options:[
    {id:"para-near",text:"„ICT jsou součástí každodenního provozu lékárny a pomáhají s objednávkami, zásobami, informacemi a elektronickými poukazy.“",correct:false},
    {id:"para-correct",text:"„Informační a komunikační technologie podporují v lékárně řadu běžných pracovních činností, například správu objednávek a zásob nebo práci s informacemi a elektronickými poukazy.“",correct:true},
    {id:"para-short",text:"„V lékárně se používají informační a komunikační technologie.“",correct:false},
    {id:"para-verbatim",text:"„ICT jsou součástí každodenní práce lékárny: pomáhají s objednávkami, zásobami, informacemi a elektronickými poukazy.“",correct:false}
  ],feedback:"Správná parafráze zachovává význam původního sdělení, ale vyjadřuje jej novou formulací a vlastními slovy. Nestačí pouze změnit několik slov, původní text výrazně zkrátit ani jej doslovně zopakovat. V této otázce se hodnotí formulace parafráze, nikoli formální uvedení citace."},
  {id:"citation",title:"Volba citačního stylu a citace",type:"citation",original:"Výukové schéma propojuje dodávku, evidenci a výdej. Informační systém může být zapojen už při objednávce a příjmu; není pouze krokem po skladu.",paraphrase:"Informační systém lze v lékárně využívat již při objednávání a příjmu zboží, tedy ještě před jeho následnou evidencí ve skladu.",prompt:"Která možnost obsahuje odpovídající odkaz v textu a bibliografický záznam podle vámi zvoleného citačního stylu?"},
  {id:"isbn",title:"Bibliografický záznam podle ISBN",type:"text",prompt:"Vyhledejte publikaci podle uvedeného ISBN a vytvořte její bibliografický záznam. Použijte citační styl, který jste si zvolili v předchozí úloze. K dohledání údajů můžete využít knihovní katalog nebo citační generátor. Výsledný záznam před odesláním zkontrolujte."},
  {id:"errors",title:"Hledání chyb v odborném textu",type:"multiple",prompt:"Prohlédněte si pozorně odborný text a seznam použitých bibliografických zdrojů. Označte všechna tvrzení, která správně popisují chyby v ukázce.",options:[
    {id:"err-missing",text:"Odkaz na jeden zdroj v textu nemá odpovídající záznam v seznamu použité literatury.",correct:true},
    {id:"err-italic",text:"Doslovná citace není správně označena kurzívou.",correct:true},
    {id:"err-unused",text:"Jeden zdroj uvedený v seznamu použité literatury není v předloženém textu použit.",correct:true},
    {id:"err-paraphrase",text:"Parafrázovaný text musí být vždy uveden v uvozovkách.",correct:false},
    {id:"err-page",text:"U každého webového zdroje musí být v citačním odkazu uvedeno číslo strany.",correct:false},
    {id:"err-url",text:"Odkaz na webový zdroj je chybný, protože přímo v odkazu v textu není uvedena jeho URL.",correct:false}
  ]},
  {id:"sources",title:"Hodnocení informačních zdrojů",type:"sources",prompt:"Zpracováváte odborný text na téma elektronizace zdravotnictví a využití informačních technologií ve farmacii. Prohlédněte si následující zdroje a označte všechny, které nejsou vhodné jako odborný zdroj pro zpracování odborného textu.",options:[
    {id:"src-sukl",text:"Státní ústav pro kontrolu léčiv – náplň práce pracovníků lékárny",description:"Přehled činností a odborných rolí v lékárně na webu SÚKL.",url:LINKS.sukl,correct:false},
    {id:"src-recept",text:"ePreskripce – Co je eRecept?",description:"Informace o elektronickém receptu a jeho využití na portálu ePreskripce.",url:LINKS.recept,correct:false},
    {id:"src-poukaz",text:"ePreskripce – informace o ePoukazu",description:"Vysvětlení elektronického poukazu na zdravotnické prostředky.",url:LINKS.poukaz,correct:false},
    {id:"src-security",text:"Národní centrum elektronického zdravotnictví – Kybernetická bezpečnost",description:"Informační a metodická podpora kybernetické bezpečnosti ve zdravotnictví na webu Ministerstva zdravotnictví ČR.",url:LINKS.security,correct:false},
    {id:"src-wiki",text:"Wikipedia – Lékařský předpis / elektronický recept",description:"Encyklopedické heslo s informacemi o lékařských předpisech včetně elektronické podoby.",url:LINKS.wiki,correct:true},
    {id:"src-search",text:"Seznam.cz – výsledky vyhledávání „eRecept“",description:"Seznam odkazů nalezených vyhledávačem pro zadaný pojem.",url:LINKS.search,correct:true},
    {id:"src-blog",text:"Blogový článek bez uvedeného autora a zdrojů",description:"Modelový článek o elektronizaci lékáren. Neuvádí autora, datum zveřejnění ani použité zdroje.",model:true,correct:true}
  ]}
];

/* 2. RANDOMIZACE — Fisher–Yates, nemění vstupní data. Blok zůstává pohromadě. */
function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function createSession(name) {
  const order = shuffle([["direct"],["paraphrase"],["citation","isbn"],["errors"],["sources"]]).flat();
  const optionOrders = {};
  QUESTIONS.filter(q => q.options).forEach(q => {optionOrders[q.id] = shuffle(q.options.map(o => o.id));});
  Object.entries(CITATION_OPTIONS).forEach(([style, options]) => {optionOrders[style] = shuffle(options.map(o => o.id));});
  return {version:1,name,order,optionOrders,index:0,style:null,answers:{},drafts:{},completedAt:null};
}

/* 3. HODNOCENÍ — čisté funkce bez závislosti na rozhraní. */
function normalize(text) {
  return String(text).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
}
function validateBook(text, style) {
  const value = normalize(text);
  const missing = [];
  const required = [["radvakova","Radváková"],["sigmund","Sigmund"],["zaklady odborne prace","Základy odborné práce"],["informacni etiky","informační etiky"],["2020","2020"]];
  required.forEach(([key,label]) => {if (!new RegExp(`(?:^| )${key}(?: |$)`).test(value)) missing.push(label);});
  if (!/(?:^| )(oeconomica|vse)(?: |$)/.test(value)) missing.push("nakladatel Oeconomica nebo VŠE");
  if (missing.length) return {correct:false,reason:`Chybí nebo nejsou správně uvedeny tyto identifikační údaje: ${missing.join(", ")}.`};
  const authorEnd = Math.max(value.indexOf("radvakova"),value.indexOf("sigmund"));
  const title = value.indexOf("zaklady odborne prace");
  const year = value.search(/\b2020\b/);
  const publisher = value.search(/\b(?:oeconomica|vse)\b/);
  // Základní uspořádání. Drobné rozdíly ISO 690 / generátorů jsou přípustné.
  let structure = authorEnd < title && title < publisher && authorEnd < year;
  if (style === "APA") structure = structure && year < title;
  if (!structure) return {correct:false,reason:style === "APA" ? "V APA uveďte autory, poté rok, název a nakladatele." : "Uveďte nejprve autory, následně bibliografické údaje; název publikace patří před údaje o nakladateli."};
  return {correct:true,reason:"Záznam obsahuje základní identifikační údaje správné publikace a odpovídající základní uspořádání. Drobné odlišnosti interpunkce a zápisu z generátorů jsou tolerovány. V APA 7 se místo vydání nevyžaduje."};
}
function optionsFor(q, style) {return q.type === "citation" ? CITATION_OPTIONS[style] || [] : q.options || [];}
function evaluateAnswer(q, answer, style) {
  if (q.type === "text") return validateBook(answer,style);
  const correct = optionsFor(q,style).filter(o => o.correct).map(o => o.id);
  const selected = Array.isArray(answer) ? [...new Set(answer)] : [];
  return {correct:selected.length === correct.length && correct.every(id => selected.includes(id))};
}
function totalScore(session) {return Object.values(session.answers).reduce((sum,a) => sum + (a.correct ? 1 : 0),0);}

/* 4. STAV — jediné vyhodnocení, obnova při obnovení karty, žádné tlačítko restart. */
const STORAGE_KEY = "vosz-ict-correspondence-1-v1";
let state = null;
let storageAvailable = true;
const app = document.getElementById("app");
function saveSession() {
  try {sessionStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
  catch (_) {storageAvailable = false;}
}
function loadSession() {
  try {
    const s = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (!s || s.version !== 1 || typeof s.name !== "string" || !s.name.trim()) return null;
    if (!Array.isArray(s.order) || s.order.length !== 6 || new Set(s.order).size !== 6 || !s.order.every(id => QUESTIONS.some(q => q.id === id))) return null;
    if (s.order.indexOf("isbn") !== s.order.indexOf("citation") + 1 || !Number.isInteger(s.index) || s.index < 0 || s.index > 6) return null;
    if (![null,"Harvard","APA"].includes(s.style) || !s.answers || !s.optionOrders) return null;
    for (const q of QUESTIONS) {
      const groups = q.type === "citation" ? ["Harvard","APA"] : q.options ? [q.id] : [];
      for (const group of groups) {
        const expected = q.type === "citation" ? CITATION_OPTIONS[group] : q.options;
        const saved = s.optionOrders[group];
        if (!Array.isArray(saved) || saved.length !== expected.length || new Set(saved).size !== expected.length || !saved.every(id => expected.some(o => o.id === id))) return null;
      }
    }
    if (s.index > s.order.indexOf("citation") && !s.style) return null;
    if (s.index === 6 && (!s.completedAt || !Number.isFinite(Date.parse(s.completedAt)))) return null;
    for (let i = 0; i < s.order.length; i++) {
      const id = s.order[i], answer = s.answers[id];
      if (i < s.index && !answer) return null;
      if (answer) {
        if (i > s.index) return null;
        const q = QUESTIONS.find(q => q.id === id);
        if (q.type === "text" ? typeof answer.value !== "string" : !Array.isArray(answer.value)) return null;
        // Při obnově skóre znovu počítáme; nebereme uložený součet jako pravdu.
        s.answers[id] = {...answer,...evaluateAnswer(q,answer.value,s.style)};
      }
    }
    s.drafts = s.drafts || {};
    return s;
  } catch (_) {return null;}
}
function commitAnswer(value) {
  if (!state || state.index >= 6) return false;
  const id = state.order[state.index];
  if (state.answers[id]) return false; // Ochrana i proti dvojkliku / opakované události.
  const q = QUESTIONS.find(q => q.id === id);
  state.answers[id] = {value,...evaluateAnswer(q,value,state.style)};
  delete state.drafts[id];
  saveSession();
  return true;
}

/* 5. ZOBRAZENÍ — uživatelská data jsou vždy escapována. */
function escapeHTML(value) {return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function externalLink(url,label) {return `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span aria-hidden="true">↗</span></a>`;}
function materialQuote(text) {return `<div class="quote-box"><span class="part-label">Původní text</span><blockquote><em>„${escapeHTML(text)}“</em></blockquote><cite>Zdroj: ${escapeHTML(MATERIAL.title)}${externalLink(MATERIAL.url,MATERIAL.url)}</cite></div>`;}
function errorExample() {
  // Záměrně právě tři chyby: chybí ePoukaz v seznamu, přímá citace není kurzívou,
  // SÚKL je v seznamu navíc. Jde o výukovou ukázku, nikoli vzor správného zápisu.
  return `<section class="example-text" aria-label="Ukázka odborného textu"><span class="eyebrow">Ukázka k posouzení</span><h2>Elektronické doklady v lékárně</h2><p>„eRecept je lékařský předpis (recept) vystavený v elektronické podobě.“ (ePreskripce – Co je eRecept?, bez data)</p><p>Elektronický poukaz slouží k předepisování zdravotnických prostředků (ePreskripce – Co je ePoukaz?, bez data).</p><h3>Seznam použité literatury</h3><ol><li>ePreskripce – Co je eRecept? Bez data. [online]. Dostupné z: ${externalLink(LINKS.recept,LINKS.recept)}</li><li>Státní ústav pro kontrolu léčiv – Jak je rozdělena náplň práce jednotlivých pracovníků lékárny? Bez data. [online]. Dostupné z: ${externalLink(LINKS.sukl,LINKS.sukl)}</li></ol></section>`;
}
function feedbackHTML(q,result) {
  let body = "";
  if (q.id === "direct") body = `<p>${escapeHTML(result.correct ? q.feedbackCorrect : q.feedbackWrong)}</p>`;
  if (q.id === "paraphrase") body = `<p>${escapeHTML(q.feedback)}</p>`;
  if (q.id === "citation") body = `<p>Web neuvádí osobního autora ani datum vydání. Na místě autora proto stojí název dokumentu; ${state.style === "APA" ? "v APA se neznámé datum označuje „n.d.“" : "v použitém zápisu Harvard se uvádí „bez data“"}. Název v odkazu musí jednoznačně odpovídat bibliografickému záznamu. Autora ani rok nelze domýšlet.</p>`;
  if (q.id === "isbn") body = `<p>${escapeHTML(result.reason)}</p>${result.correct ? "" : `<p><strong>Vzorový záznam – ${state.style}</strong></p><p>${escapeHTML(BOOK_MODELS[state.style])}</p>`}`;
  if (q.id === "errors") body = `<p>Skutečné chyby v ukázce:</p><ul><li><strong>Chybějící záznam:</strong> odkaz na „ePreskripce – Co je ePoukaz?“ nemá protějšek v seznamu literatury.</li><li><strong>Chybějící kurzíva:</strong> doslovná věta o eReceptu je v uvozovkách, ale podle metodického manuálu školy má být také kurzívou.</li><li><strong>Nepoužitý zdroj:</strong> záznam SÚKL o pracovnících lékárny není v předloženém textu citován.</li></ul><p>Parafráze nevyžaduje uvozovky. U webové stránky bez stránkování nelze vyžadovat číslo strany. URL patří do bibliografického záznamu; nemusí být přímo v odkazu v textu.</p>`;
  if (q.id === "sources") body = `<p>Označeny měly být Wikipedia, výsledky vyhledávání Seznam.cz a modelový blogový článek.</p><ul><li><strong>Wikipedia:</strong> Může pomoci při základní orientaci v tématu, ale podle metodického manuálu školy není vhodná jako odborný zdroj pro absolventskou práci.</li><li><strong>Seznam.cz:</strong> Vyhledávač lze použít k nalezení odborného zdroje, není však sám původním odborným zdrojem informace.</li><li><strong>Modelový blog:</strong> chybí autor, datum i použité zdroje, takže nelze spolehlivě ověřit původ a aktuálnost tvrzení.</li></ul><p>SÚKL, ePreskripce a Národní centrum elektronického zdravotnictví jsou k uvedenému tématu vhodnými institucionálními zdroji. Ani u nich nezapomínejte ověřovat aktuálnost konkrétní stránky.</p><p>Při výběru zvažujte autora nebo odpovědnou instituci, odbornost, aktuálnost, dohledatelnost informací, použité zdroje a relevanci k tématu. Rozhoduje důvěryhodnost a účel zdroje, nikoli samotné zveřejnění na internetu.</p>`;
  return `<section id="feedback" class="feedback ${result.correct ? "" : "wrong"}" role="status" tabindex="-1"><h2>${result.correct ? "Správně – získáváte 1 bod." : "Nesprávně – získáváte 0 bodů."}</h2>${body}</section>`;
}
function renderOptions(q,result) {
  const options = optionsFor(q,state.style);
  const key = q.type === "citation" ? state.style : q.id;
  const ordered = state.optionOrders[key].map(id => options.find(o => o.id === id));
  const selected = result ? result.value : state.drafts[q.id] || [];
  return `<div class="options ${q.type === "sources" ? "source-options" : ""}">${ordered.map(o => {
    const checked = Array.isArray(selected) && selected.includes(o.id);
    const cls = result ? o.correct ? " correct" : checked ? " incorrect" : "" : "";
    const note = result ? `<span class="answer-note">${o.correct ? "Správná volba" : checked ? "Tato volba není správná" : ""}</span>` : "";
    const input = `<input type="${["multiple","sources"].includes(q.type) ? "checkbox" : "radio"}" name="answer" value="${o.id}" ${checked ? "checked" : ""} ${result ? "disabled" : ""}>`;
    if (q.type === "sources") return `<article class="source-option${cls}"><label>${input}<span>${escapeHTML(o.text)}</span></label><p>${escapeHTML(o.description)}</p>${o.model ? `<details><summary>Otevřít modelový zdroj</summary><div class="model-body"><span class="part-label">Modelový článek pro tuto úlohu</span><h3>Digitální lékárna očima blogu</h3><p>Digitální nástroje prý vyřeší všechny problémy lékárny. Elektronické doklady mají být vždy zcela bezpečné a jejich údaje není třeba kontrolovat.</p><p>Autor, datum zveřejnění ani zdroje nejsou uvedeny.</p></div></details>` : externalLink(o.url,"Otevřít zdroj")}${note}</article>`;
    const content = q.type === "citation" ? `<span class="citation-part"><span class="part-label">Odkaz v textu</span>${escapeHTML(o.cite)}</span><span class="citation-part"><span class="part-label">Bibliografický záznam</span>${escapeHTML(o.record).replace(escapeHTML(MATERIAL.title),`<em>${escapeHTML(MATERIAL.title)}</em>`)}</span>` : escapeHTML(o.text);
    return `<label class="option${cls}${result ? " locked" : ""}">${input}<span class="option-content">${content}${note}</span></label>`;
  }).join("")}</div>`;
}
function renderQuestion(focus = true) {
  const q = QUESTIONS.find(q => q.id === state.order[state.index]);
  const result = state.answers[q.id];
  const needsStyle = q.id === "citation" && !state.style;
  let content = "";
  if (needsStyle) {
    content = `<section class="style-picker"><h2>Zvolte citační styl</h2><p>Pro následující dvě úlohy si zvolte citační styl. Zvolený styl již během úkolu nelze změnit.</p><form id="style-form"><fieldset class="answer-fieldset"><legend>Citační styl</legend><div class="style-choices"><label class="option"><input type="radio" name="style" value="Harvard" required><span>Harvard</span></label><label class="option"><input type="radio" name="style" value="APA" required><span>APA</span></label></div></fieldset><button class="primary" type="submit">Potvrdit citační styl</button></form></section>`;
  } else {
    if (["citation","isbn"].includes(q.id)) content += `<span class="style-badge">Zvolený styl: <strong>${state.style}</strong> · uzamčeno</span>`;
    if (q.original) content += materialQuote(q.original);
    if (q.paraphrase) content += `<div class="paraphrase"><span class="part-label">Parafráze</span><p>„${escapeHTML(q.paraphrase)}“</p></div>`;
    if (q.id === "errors") content += errorExample();
    content += `<p class="question-instruction">${escapeHTML(q.prompt)}</p>`;
    if (q.id === "isbn") content += `<p class="isbn"><span class="part-label">ISBN publikace</span>978-80-245-2404-7</p>`;
    const legend = ["multiple","sources"].includes(q.type) ? "Označte všechny vyhovující možnosti. Bod získáte pouze za přesnou kombinaci." : "Vyberte jednu odpověď.";
    content += `<form id="answer-form"><fieldset class="answer-fieldset" ${result ? "disabled" : ""}>${q.type === "text" ? `<label for="book-answer">Váš bibliografický záznam</label><textarea id="book-answer" name="bookAnswer" maxlength="6000" required ${result ? "disabled" : ""}>${escapeHTML(result ? result.value : state.drafts[q.id] || "")}</textarea>` : `<legend>${legend}</legend>${renderOptions(q,result)}`}</fieldset><p class="error" id="answer-error" role="alert"></p><div class="actions"><span class="attempt-note">${result ? "Odpověď byla odeslána a uzamčena." : "Jeden pokus · po odeslání nelze odpověď změnit"}</span><button type="submit" class="primary" ${result ? "disabled" : ""}>${result ? "Odpověď odeslána" : "Odeslat odpověď"}</button></div></form>`;
    if (result) content += feedbackHTML(q,result);
  }
  app.innerHTML = `<div class="question-shell"><div class="progress-meta"><strong>Otázka ${state.index+1} z 6</strong><span>${escapeHTML(state.name)}</span></div><progress max="6" value="${state.index + (result ? 1 : 0)}" aria-label="Počet dokončených otázek"></progress><section class="question-card"><p class="eyebrow">Korespondenční úkol č. 1</p><h1 id="question-title" tabindex="-1">${escapeHTML(q.title)}</h1>${content}<div class="actions"><span class="attempt-note">${needsStyle ? "Propojený blok · dvě navazující otázky" : "ICT v práci farmaceutického asistenta"}</span><button id="continue" type="button" class="${result ? "primary" : "secondary"}" ${result ? "" : "disabled"}>Pokračovat <span aria-hidden="true">→</span></button></div></section>${storageAvailable ? "" : `<p class="storage-note" role="status">Prohlížeč neumožňuje uložit průběh. Neobnovujte ani nezavírejte tuto kartu před uložením výsledku.</p>`}</div>`;
  if (focus) {document.getElementById("question-title").focus({preventScroll:true});window.scrollTo(0,0);}
  document.getElementById("style-form")?.addEventListener("submit",event => {
    event.preventDefault();
    if (state.style) return;
    const selected = new FormData(event.currentTarget).get("style");
    if (!["Harvard","APA"].includes(selected)) return;
    state.style = selected; saveSession(); renderQuestion();
  });
  const form = document.getElementById("answer-form");
  form?.addEventListener("input",() => {
    if (state.answers[q.id]) return;
    const data = new FormData(form);
    state.drafts[q.id] = q.type === "text" ? data.get("bookAnswer") || "" : data.getAll("answer");
    saveSession();
  });
  form?.addEventListener("submit",event => {
    event.preventDefault();
    if (state.answers[q.id]) return;
    const data = new FormData(form);
    const value = q.type === "text" ? String(data.get("bookAnswer") || "").trim() : data.getAll("answer");
    if (!value.length) {
      document.getElementById("answer-error").textContent = q.type === "text" ? "Nejprve napište bibliografický záznam." : "Nejprve označte odpověď.";
      return;
    }
    if (commitAnswer(value)) {renderQuestion(false);document.getElementById("feedback").focus();}
  });
  document.getElementById("continue").addEventListener("click",() => {
    if (!state.answers[q.id] || state.order[state.index] !== q.id) return;
    state.index++;
    if (state.index === 6) state.completedAt = new Date().toISOString();
    saveSession();
    if (state.index === 6) renderResult(); else renderQuestion();
  });
}
function renderResult() {
  const score = totalScore(state);
  const percent = Math.round(score / 6 * 100);
  const date = new Intl.DateTimeFormat("cs-CZ",{dateStyle:"long",timeStyle:"short"}).format(new Date(state.completedAt));
  app.innerHTML = `<section class="result"><p class="print-heading">VOŠZ – Informační a komunikační technologie</p><p class="eyebrow">Výsledkový protokol</p><p class="task-number">Korespondenční úkol č. 1</p><h1 id="result-title" tabindex="-1">Práce s odbornými informacemi a citacemi</h1><p class="subtitle">ICT v práci farmaceutického asistenta</p><dl class="result-meta"><div><dt>Student</dt><dd>${escapeHTML(state.name)}</dd></div><div><dt>Zvolený citační styl</dt><dd>${state.style}</dd></div></dl><div class="score-panel"><div><span>Výsledek</span><strong>${score} / 6</strong><span>bodů</span></div><div><span>Úspěšnost</span><strong>${percent} %</strong></div><div class="completion"><strong>Úkol byl dokončen.</strong></div></div><h2>Přehled hodnocení</h2><table class="result-table"><thead><tr><th scope="col">Otázka</th><th scope="col">Získané body</th></tr></thead><tbody>${state.order.map(id => `<tr><td>${escapeHTML(QUESTIONS.find(q => q.id === id).title)}</td><td>${state.answers[id].correct ? 1 : 0} / 1</td></tr>`).join("")}</tbody></table><p class="completion-date">Datum dokončení: <time datetime="${state.completedAt}">${escapeHTML(date)}</time></p><div class="actions"><button class="primary" id="print-result" type="button">Vytisknout / uložit jako PDF</button></div></section>`;
  document.getElementById("print-result").addEventListener("click",() => window.print());
  document.getElementById("result-title").focus({preventScroll:true});window.scrollTo(0,0);
}
document.getElementById("start-form").addEventListener("submit",event => {
  event.preventDefault();
  if (state) return;
  const name = document.getElementById("student-name").value.trim().replace(/\s+/g," ");
  if (!name) {document.getElementById("name-error").textContent = "Vyplňte prosím jméno a příjmení.";document.getElementById("student-name").focus();return;}
  state = createSession(name);saveSession();renderQuestion();
});
state = loadSession();
if (state) {if (state.index === 6) renderResult();else renderQuestion();}
