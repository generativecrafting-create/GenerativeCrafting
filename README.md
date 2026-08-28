# Generative Crafting — Website

Statische, zweisprachige (DE/EN) Website für das 3D-Druck-Business
**Generative Crafting**. Reines HTML/CSS/JS, kein Build-Schritt nötig —
läuft direkt auf GitHub Pages.

## Struktur

```
index.html          Seite (alle Sektionen: Hero, Portfolio, Prozess, Über mich, Auftragsformular, Kontakt)
css/style.css        Styles (Dark/Technical-Theme)
js/i18n.js            Übersetzungstexte (DE/EN)
js/main.js            Sprachumschalter, mobiles Menü, Formular-Logik
assets/img/           Bilder, Logo, Favicon
```

## Was du noch anpassen solltest

### 1. Logo & Favicon
`assets/img/logo-mark.svg` (helle Variante für den dunklen Header) und
`assets/img/logo-mark-dark.svg` (dunkle Variante für helle Hintergründe,
z.B. Print/Docs) sind eine **nachgebaute Annäherung** an das im Chat
geteilte Logo (Hexagon mit Cube-/Molekül-Motiv). Die Cloud-Umgebung hatte
keinen Dateizugriff auf das eingefügte Bild, daher wurde die Grafik als
Vektor nachgebaut statt 1:1 übernommen.

Sobald du die Originaldatei per Link (z.B. Google Drive, Dropbox,
GitHub-Issue-Anhang) bereitstellen kannst, ersetze einfach
`assets/img/logo-mark.svg` durch dein echtes Logo (idealerweise als SVG
oder PNG mit transparentem Hintergrund) — der Dateiname in `index.html`
kann gleich bleiben:

```html
<img src="assets/img/logo-mark.svg" alt="Generative Crafting Logo" class="brand-logo">
```

`assets/img/favicon.svg` kannst du ebenfalls durch eine eigene Version
ersetzen.

### 2. Portfolio-Fotos
Die Portfolio-Karten in `index.html` (Abschnitt `#portfolio`) haben
aktuell farbige Platzhalter-Kacheln mit „Foto folgt“-Badge
(`.portfolio-thumb`). Ersetze pro Karte:

```html
<div class="portfolio-thumb thumb-1">
  <span class="thumb-badge" data-i18n="placeholder.photo">Foto folgt</span>
</div>
```

durch z. B.:

```html
<div class="portfolio-thumb">
  <img src="assets/img/projekt-1.jpg" alt="Beschreibung des Projekts">
</div>
```

Lege die Bilder unter `assets/img/` ab.

### 3. Auftragsformular aktivieren (E-Mail-Empfang)
Das Formular sendet aktuell noch nirgendwohin. Es ist für
[Formspree](https://formspree.io) vorbereitet (kostenloser Tarif reicht):

1. Kostenloses Konto auf formspree.io mit `generative.crafting@gmail.com` anlegen.
2. Neues Formular erstellen → du bekommst eine Formular-ID (`xxxxxxxx`).
3. In `index.html` im `<form id="order-form" ...>`-Tag die Action-URL ersetzen:

   ```html
   action="https://formspree.io/f/xxxxxxxx"
   ```

4. Den Hinweistext direkt unter dem Absenden-Button
   (`data-i18n="order.form.note"`) kannst du danach aus `index.html`
   entfernen — der Hinweis erscheint automatisch nur, solange
   `YOUR_FORM_ID` noch im `action`-Attribut steht.

Alternative zu Formspree: jeder andere Formular-Endpoint-Dienst
(z. B. Netlify Forms, wenn du auf Netlify hostest) funktioniert genauso,
einfach die `action`-URL entsprechend anpassen.

### 4. Texte & Eckdaten ergänzen
In `js/i18n.js` (Übersetzungen DE + EN) folgende Platzhalter ersetzen:

- `about.fact1_value` → Standort
- `about.fact2_value` → Drucker-Modelle
- `placeholder.social` → Instagram/Etsy/Social-Media-Link (in `index.html`
  auch den `<span class="placeholder-text">` durch einen echten `<a>`-Link ersetzen)

Alle anderen Texte (Hero, Über mich, Prozess, Portfolio-Beschreibungen)
sind frei editierbar — bitte **in beiden Sprachen** (`de` und `en` Objekt)
konsistent halten.

## Lokal testen

Kein Build nötig. Einfach mit einem lokalen Server öffnen, z. B.:

```bash
python3 -m http.server 8000
```

und dann `http://localhost:8000` im Browser öffnen (ein direktes Öffnen der
`index.html` per Doppelklick funktioniert meist auch, außer für den
Datei-Upload im Formular in manchen Browsern).

## Deployment auf GitHub Pages

1. Repo auf GitHub pushen (Branch z. B. `main`).
2. Im Repo unter **Settings → Pages**:
   - Source: „Deploy from a branch“
   - Branch: `main` (oder den gewünschten Branch), Ordner `/ (root)`
3. Nach kurzer Zeit ist die Seite unter
   `https://<dein-github-name>.github.io/<repo-name>/` erreichbar.

Die Datei `.nojekyll` sorgt dafür, dass GitHub Pages die Seite unverändert
ausliefert (kein Jekyll-Preprocessing).

### Eigene Domain (optional)
Falls du später eine eigene Domain nutzen willst: In den Pages-Settings
unter „Custom domain“ eintragen und beim Domain-Anbieter einen CNAME
(bzw. A-Records auf GitHub Pages IPs) einrichten.

## Sprachumschalter

Der Button oben rechts (`DE`/`EN`) schaltet die komplette Seite um. Die
gewählte Sprache wird im Browser gespeichert (`localStorage`), sodass
Besucher beim nächsten Besuch ihre Sprache behalten. Neue Texte immer als
`data-i18n="schluessel"`-Attribut im HTML markieren und den Schlüssel in
`js/i18n.js` für **beide** Sprachen ergänzen.
