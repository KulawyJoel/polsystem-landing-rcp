# Landing page RCP Polsystem

Statyczny landing page przygotowany pod kampanie Meta Ads i Google Ads. Projekt nie wymaga procesu budowania i jest gotowy do hostowania w GitHub Pages.

## Uruchomienie lokalne

W katalogu projektu uruchom prosty serwer HTTP, na przykład:

```powershell
python -m http.server 8080
```

Następnie otwórz `http://localhost:8080/`.

## Obsługa formularza

Wersja prototypowa po walidacji otwiera w programie pocztowym gotową wiadomość adresowaną do `biuro@polsystem.pl`. Przed skierowaniem płatnego ruchu należy zastąpić mechanizm `mailto:` w `script.js` docelowym endpointem formularza Polsystem albo integracją CRM. Bez tego wysłanie wiadomości zależy od konfiguracji poczty na urządzeniu użytkownika.

## Publikacja w GitHub Pages

Pliki `index.html`, `styles.css`, `script.js` i katalog `assets` należy umieścić w katalogu głównym repozytorium publikowanego przez GitHub Pages. Strona korzysta wyłącznie z lokalnych zasobów i nie wymaga zewnętrznych bibliotek.

Podczas testów strona ma ustawione `noindex,nofollow`. Przed publikacją na docelowej domenie decyzję o indeksacji należy podjąć świadomie, uwzględniając relację tego landingu do głównej strony produktu na `polsystem.pl`.
