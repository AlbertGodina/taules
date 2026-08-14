# Taules × — Practica les multiplicacions

Aplicació web per practicar les taules de multiplicar, pensada per a l'alumnat de cicle mitjà i superior de primària. Més enllà de la simple memorització, integra un **motor de repetició espaiada (SRS)** i **suports visuals** per construir una comprensió real de la multiplicació. 

Funciona directament al navegador, sense instal·lació ni connexió a internet.

---

## ✨ Funcionalitats principals

### 🎮 5 Modes de joc
| Mode | Descripció |
|------|------------|
| 📖 **Pràctica lliure** | Tria les taules que vols treballar i practica al teu ritme. |
| ⏱ **Contra rellotge** | 2 o 3 minuts: quantes multiplicacions pots encertar sota pressió? |
| 🔁 **Repàs intel·ligent** | Basat en repetició espaiada (estil Anki). L'algorisme programa els repassos just quan l'alumne està a punt d'oblidar la multiplicació. |
| 🏆 **Repte progressiu** | Desbloqueja les taules una a una (en ordre pedagògic: 2, 5, 10, 4...) a mesura que les domines. |
| 📽 **Mode presentació** | Sense registre de dades. Pensat per projectar a la pissarra digital i jugar a classe amb tot el grup. |

### 🧠 Pedagogia i Suport Visual
- **Feedback formatiu:** En fallar, l'app no només marca l'error en vermell, sinó que mostra l'operació completa i la sacseja per assegurar que l'alumne processa la correcció.
- **Representació concreta:** El botó "👁 Veure-ho" no dona directament el resultat, sinó que ensenya *per què* és aquell resultat mitjançant **matrius de punts** i **salts a la recta numèrica**.
- **Mode invers:** Treballa la relació multiplicació/divisió i el pensament algebraic primerenc (`? × 6 = 42`).
- **Fitxes imprimibles intel·ligents:** Genera un PDF amb les multiplicacions exactes que l'alumne necessita repassar segons el seu estat de memòria.

### 🏅 Gamificació i Motivació
- ⭐ **Punts i combos:** 10 punts base + bonus per mantenir ratxes d'encerts.
- 🔥 **Ratxes en temps real:** Indicador visual per fomentar la concentració.
- 🎖️ **12 Medalles progressives:** Des de "Primers passos" fins a "Campió del ×". Les medalles bloquejades mostren el progrés actual (ex: *3/10*) per motivar l'alumne.
- 🦊 **Avatars desbloquejables:** Els alumnes guanyen nous avatars (😎🦊🐯🦄👑) a mesura que aconsegueixen medalles.
- 📈 **Títols de nivell:** Evolució des d'*Aprenent* fins a *Llegenda del ×*.

---

## 🚀 Com utilitzar-lo

### Opció 1 — GitHub Pages (Recomanat per a l'aula)
1. Fes un **fork** d'aquest repositori.
2. Ves a **Settings → Pages**.
3. A *Source*, selecciona la branca `main` i la carpeta `/ (root)`.
4. Guarda i espera uns segons: l'aplicació estarà disponible a `https://el-teu-usuari.github.io/taules`.

### Opció 2 — En local o sense internet
1. Descarrega el repositori (Code → Download ZIP).
2. Obre el fitxer `index.html` amb qualsevol navegador modern (Chrome, Safari, Firefox). 
*(Nota: Assegura't que `srs.js` i `ui-srs.js` estiguin a la mateixa carpeta).*

---

## 📁 Estructura del repositori

```text
taules/
├── index.html   # Interfície (HTML/CSS) i lògica principal del joc
├── srs.js       # Motor de repetició espaiada (Algorisme SM-2 adaptat)
├── ui-srs.js    # Connector entre el motor SRS i la interfície
└── README.md

```


Tota l'aplicació està escrita en **Vanilla JS**. No hi ha dependències externes, ni frameworks, ni processos de *build*.

---

## ⚙️ Com funciona el Repàs Intel·ligent (SRS)

El "Mode errors" tradicional s'ha substituït per un algorisme de **Repetició Espaiada** adaptat a la cognició infantil:

1. **Sense autoavaluació:** L'infant no ha de dir si li ha costat o no. L'app calcula la dificultat basant-se en l'encert, el temps de resposta i l'ús de l'ajuda visual.
2. **L'ajuda no castiga:** Si l'alumne prem "👁 Veure-ho", es considera una fase d'aprenentatge (codificació) i no penalitza la targeta, evitant l'ansietat matemàtica.
3. **Intervals progressius:** Una multiplicació passa de repassar-se als 10 minuts, a l'endemà, als 3 dies, fins a considerar-se **Dominada** (més de 21 dies de retenció).
4. **Commutativitat:** `7×8` i `8×7` comparteixen targeta de memòria per optimitzar l'aprenentatge.

---

## 🛠 Tecnologies

- **HTML5, CSS3, JavaScript (ES6)**
- **`localStorage`** per a la persistència de perfils i estats de memòria.
- Disseny *Responsive* (optimitzat per a tauletes i mòbils a l'aula).
- Mode fosc 🌙 per a pissarres digitals o entorns amb poca llum.

---

## 📚 Context pedagògic

Aquesta eina ha estat dissenyada per a l'alumnat de **3r a 6è de primària**, alineada amb els continguts curriculars de matemàtiques i les bones pràctiques en didàctica:

- Prioritza la **comprensió** (suports visuals) per sobre de la memorització buida.
- Fomenta la **fluïdesa** (automatització) mitjançant la repetició espaiada.
- Redueix l'**ansietat matemàtica** permetent l'ús d'ajudes sense penalitzacions i amagant el cronòmetre en modes de pràctica.

---

## 📄 Llicència

[MIT](LICENSE) — Lliure per usar, modificar, adaptar a l'aula i distribuir.