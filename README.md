# Taules × — Practica les multiplicacions

Aplicació web per practicar les taules de multiplicar, pensada per a l'alumnat de cicle mitjà i superior de primària. Funciona directament al navegador, sense instal·lació ni connexió a internet.


---

## ✨ Funcionalitats

### 4 modes de joc
| Mode | Descripció |
|------|------------|
| 📖 Pràctica lliure | Tria les taules que vols treballar i practica al teu ritme |
| ⏱ Contra rellotge | 2 o 3 minuts: quantes multiplicacions pots encertar? |
| 🎯 Mode errors | Repassa les multiplicacions que has fallat en sessions anteriors |
| 🏆 Repte progressiu | Desbloqueja les taules una a una a mesura que les domines |

### Gamificació
- ⭐ Sistema de punts amb bonus de combo (ratxa × punts extra)
- 🔥 Indicador de ratxa en temps real
- 🏅 8 medalles desbloqueables
- 📊 Progrés visual per a cada taula (en pràctica / dominada)

### Perfils i progrés
- Múltiples perfils d'alumne en el mateix dispositiu
- El progrés es guarda automàticament en local (`localStorage`)
- Historial d'errors per mode de repàs dirigit

---

## 🚀 Com utilitzar-lo

### Opció 1 — GitHub Pages (recomanat)

1. Fes un **fork** d'aquest repositori
2. Ves a **Settings → Pages**
3. A *Source*, selecciona la branca `main` i la carpeta `/ (root)`
4. Guarda i espera uns segons: l'aplicació estarà disponible a `https://el-teu-usuari.github.io/taules`

### Opció 2 — En local

Simplement obre el fitxer `index.html` amb qualsevol navegador modern. No cal servidor ni instal·lació.

---

## 📁 Estructura del repositori

```
taules/
├── index.html   # Aplicació completa (un sol fitxer)
└── README.md
```

Tota l'aplicació és un únic fitxer HTML autònom. No hi ha dependències externes ni processos de build.

---

## 🎮 Com funciona el sistema de punts

- Cada resposta correcta suma **10 punts**
- Les respostes en ratxa afegeixen **+2 punts per encert addicional** (x2 al segon, x4 al tercer, etc.)
- Una taula es considera **dominada** quan s'han respost correctament ≥ 80% de les preguntes amb un mínim de 10 intents

### Medalles disponibles

| Medalla | Condició |
|---------|----------|
| 🌟 Primera! | Completa la primera partida |
| 🔥 Ratxa x5 | 5 encerts seguits |
| 💥 Ratxa x10 | 10 encerts seguits |
| 💯 100 punts | Aconseguir 100 punts totals |
| 🏅 500 punts | Aconseguir 500 punts totals |
| 🥇 1000 punts | Aconseguir 1000 punts totals |
| ⚡ Llamp | 20 encerts en mode rellotge |
| 👑 Mestre | Dominar totes les taules |

---

## 🛠 Tecnologies

- HTML5, CSS3, JavaScript (Vanilla)
- `localStorage` per persistència de dades
- Sense dependències externes · Sense frameworks · Sense servidor

---

## 📚 Context pedagògic

Aquesta eina ha estat dissenyada per a l'alumnat de **3r a 6è de primària** (cicle mitjà i superior), d'acord amb els continguts curriculars de matemàtiques. Es pot fer servir com a activitat d'aula, reforç a casa o racó d'ordinador.

---

## 📄 Llicència

[MIT](LICENSE) — Lliure per usar, modificar i distribuir.
