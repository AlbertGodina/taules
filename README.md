# Taules ×

Aplicació web per **practicar les taules de multiplicar** de l'1 al 13, pensada per a l'alumnat de primària i primer d'ESO. Funciona al navegador, sense instal·lació, sense comptes i sense enviar dades enlloc.

🔗 **Prova-la:** <https://albertgodina.github.io/taules/>

## Què inclou

### Modes de joc

| Mode | Descripció |
|---|---|
| 📖 **Pràctica lliure** | Tria quines taules vols practicar i quantes operacions (10, 20, 30 o 40). |
| ⏱ **Contra rellotge** | Quantes multiplicacions pots resoldre en 2 o 3 minuts? |
| 🔁 **Repàs intel·ligent** | Repàs amb repetició espaiada: l'aplicació proposa el que toca repassar i, quan cal, fets nous. |
| 🏆 **Repte progressiu** | Es desbloquegen les taules una a una. Per superar-ne una cal resoldre 10 preguntes amb un 80 % d'encerts com a mínim. |
| 📽 **Mode presentació** | Per projectar a la pissarra i jugar a classe amb tot el grup. |

També es pot activar la **pregunta inversa** (`___ × 7 = 42`) en la pràctica lliure i en el mode contra rellotge.

### Taules i multiplicadors

- Taules disponibles: **de l'1 al 13**.
- El multiplicador va sempre **de l'1 al 10** (`13 × 7`, però no `13 × 12`).

### Ajuda visual

El botó **«Veure-ho»** mostra la multiplicació com una matriu de files i columnes, i com a salts de suma (`+7 → 7 → 14 → 21…`). Mirar l'ajuda no penalitza: l'operació es torna a treballar més endavant, però no compta com un error.

### Motivació

- Punts per encert, amb bonificació per ratxa.
- 12 medalles (ratxes, encerts totals, taules dominades, sessions sense errors, mode rellotge, repassos…).
- Nivells i avatars que es desbloquegen amb les medalles.
- Perfils múltiples al mateix dispositiu, de manera que cada alumne té el seu progrés.

### Eines per al professorat

- **Fitxa imprimible** amb 20 operacions, triades segons el que cada alumne necessita treballar.
- **Exportació del progrés en CSV** (fet, tipus, estat, repeticions, encerts, errors, interval i proper repàs).
- Tema clar i fosc.

## Com funciona el repàs intel·ligent

El mòdul `srs.js` implementa una versió adaptada de **SM-2** pensada per a infants:

- L'infant **no s'autoavalua**: la qualitat de cada resposta es calcula a partir de l'encert i del temps de resposta (≤ 5 s = fàcil, ≤ 12 s = bé, més = lent). Els llindars es poden calibrar amb les dades reals de l'alumne.
- Els fets nous passen per uns **passos d'aprenentatge curts** (10 minuts i 1 dia) i es graduen a 3 dies.
- Els intervals creixen fins a un màxim de 90 dies. Un fet es considera **«dominat»** quan arriba a 21 dies.
- Els errors dins d'una sessió es **reinsereixen** unes quantes preguntes més endavant.
- Demanar ajuda no penalitza: el fet es torna a treballar sense baixar-ne la facilitat.
- Les multiplicacions són commutatives (`3 × 12` i `12 × 3` comparteixen targeta).
- La pregunta inversa només entra a l'SRS quan la directa corresponent ja s'ha après.
- Pensat per a sessions de 2–3 cops per setmana.

## Estructura del projecte

```
├── index.html   Interfície, estils i lògica de joc (tot en un sol fitxer)
├── srs.js       Mòdul de repetició espaiada (SM-2 adaptat)
├── ui-srs.js    Connector entre la interfície i el mòdul SRS
└── README.md
```

No hi ha cap dependència externa ni cap pas de compilació. És HTML, CSS i JavaScript pur.

## Dades i privacitat

Tot es guarda al **`localStorage` del navegador** de cada dispositiu:

| Clau | Contingut |
|---|---|
| `taulesx.perfils.v1` | Perfils, punts, medalles i desbloquejos |
| `taulesx.srs.v1` | Estat de repetició espaiada de cada fet |
| `taulesx.fosc` | Tema clar o fosc |

No hi ha servidor, ni analítica, ni cookies de seguiment. Si s'esborren les dades del navegador, es perd el progrés; per això convé exportar-lo en CSV si es vol conservar.

## Ús en local

Descarrega el repositori i obre `index.html` al navegador. No cal res més.

## Publicació

El projecte es publica amb **GitHub Pages**. Els fitxers han de ser a l'arrel de la branca publicada i dir-se exactament `index.html`, `srs.js` i `ui-srs.js`.

## Personalització

- **Taules disponibles:** a `index.html`, la constant `TAULES` defineix el rang (ara de l'1 al 13).
- **Ordre del repte progressiu:** constant `ORDRE`.
- **Paràmetres de l'SRS** (passos, intervals, llindars de temps, màxim de repassos per sessió): objecte `CONFIG` a `srs.js`.

## Autoria

Creat per [Albert Godina](https://github.com/AlbertGodina), docent de tecnologia i digitalització.
