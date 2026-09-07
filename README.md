# Kevin Claes Algemene Dakwerken

Een gewone HTML-, CSS- en JavaScript-website. Geen installatie, framework of build nodig.

## Lokaal openen

Open `index.html` in je browser, bijvoorbeeld door erop te dubbelklikken.
De privacypagina, afbeeldingen en scripts werken ook rechtstreeks vanaf je computer.

Voor een lokale webserver kun je VS Code Live Server gebruiken, of vanuit deze map:

```sh
python3 -m http.server 5501
```

Open daarna <http://localhost:5501>.

## Publiceren op GitHub Pages

1. Zet deze bestanden in de GitHub-repository en push naar `main`.
2. Ga in GitHub naar **Settings → Pages → Build and deployment → Source**.
3. Kies **GitHub Actions**.
4. De workflow **Publish static site to GitHub Pages** publiceert de website bij elke push naar `main`. Je kunt hem ook starten via **Actions → Publish static site to GitHub Pages → Run workflow**.

De workflow kopieert alleen de websitebestanden. Er wordt geen Node.js geïnstalleerd en er is geen npm- of buildstap.

De verwachte URL voor deze repository is:
<https://liosmeers.github.io/Dakwerken-Kevin-Claes/>

Je kunt ook **Deploy from a branch → main → / (root)** kiezen. De `.nojekyll` zorgt dat Pages de bestanden rechtstreeks serveert. Verwijder in dat geval `.github/workflows/deploy.yml`, zodat je maar één publicatiemethode gebruikt.

Zie ook de [GitHub Pages-instructies](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Bestanden aanpassen

- `index.html`: homepage, inhoud, header en footer.
- `privacy/index.html`: privacybeleid, header en footer.
- `css/style.css`: alle vormgeving en mobiele schermformaten.
- `js/main.js`: menu, scrollgedrag en animaties.
- `images/`: afbeeldingen en logo.
- `js/vendor/`: lokaal meegeleverde GSAP-, ScrollTrigger- en Lenis-scripts. De oorspronkelijke licentievermeldingen blijven behouden.

De header en footer staan in beide HTML-bestanden. Pas gedeelde contactgegevens dus in beide bestanden aan.

Alle lokale links zijn relatief, zodat de site ook onder een GitHub Pages-repositorypad werkt. Bij een ander domein of een andere repositorynaam pas je de absolute `canonical`- en `og:image`-URL's in beide HTML-bestanden aan.
