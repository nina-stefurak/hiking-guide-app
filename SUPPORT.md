# SUPPORT – Utrzymanie i Rozwój MountGuide

Zbiór zasad i procedur dotyczących utrzymania, wersjonowania oraz serwisowania aplikacji.

---

## 1. Utrzymanie i Rozbudowa

- **Codzienne monitorowanie**: Sprawdzamy zgłoszenia błędów i awarie w backlogu (Issues).
- **Szybkie naprawy**: Krytyczne problemy naprawiamy w pierwszej kolejności (hotfix).
- **Nowe funkcje**: Powstają na osobnych gałęziach GIT, a po testach łączymy je w główną wersję.
- **Kompatybilność wsteczna**: Staramy się jej trzymać, ale w wersjach `0.x` (faza rozwojowa) możliwe są niezgodne
  zmiany.

---

## 2. Wersjonowanie (*po wydaniu pierwszej wersji produkcyjnej)

- **SemVer (MAJOR.MINOR.PATCH)**:
    - **MAJOR**: Zmiany łamiące kompatybilność wstecz.
    - **MINOR**: Nowe funkcje i ulepszenia, wstecznie zgodne.
    - **PATCH**: Poprawki błędów i łatki.
- **Zasady**:
    - Nie zmieniamy opublikowanych wersji — każda poprawka to nowa wersja.
    - Przy wydaniu zawsze publikujemy **Release Notes** (co się zmieniło, jakie są wymagania, ewentualne złamanie
      kompatybilności).

---

## 3. Testy i Monitorowanie (*po wydaniu pierwszej wersji produkcyjnej)

- **Wydajność API**: Sprawdzamy czas odpowiedzi, liczbę zapytań i obciążenie bazy (Appwrite).
- **Aplikacje mobilne**: Testy na emulatorach i w chmurze (np. Amazon Device Farm) – sprawdzamy czas działania, płynność
  animacji, itp.
- **Skalowanie**:
    - Optymalizujemy zapytania i w razie potrzeby wprowadzamy caching.
    - Rozważamy skalowanie poziome (więcej serwerów) lub pionowe (więcej zasobów) zależnie od ruchu.

---

## 4. Serwis i Obsługa Błędów (*po wydaniu pierwszej wersji produkcyjnej)

- **Backlog błędów**: Każdy błąd ma priorytet (critical, high, low) i SLA naprawy.
- **Kanały zgłoszeń**:
    - Mail/Chat/Telefon
    - Issues w repozytorium
    - Automatyczne raporty (np. Sentry.io)
- **Proces naprawy**:
    1. Weryfikacja i przypisanie priorytetu
    2. Tworzenie gałęzi `fix/...`
    3. Testy poprawek
    4. Wydanie patcha (podniesienie numeru PATCH)
    5. Aktualizacja `release notes` i powiadomienie zgłaszającego

---

## 5. Proces Wydań

- **Częstotliwość**: Zwykle raz w miesiącu (lub częściej przy krytycznych błędach).
- **Publikacja**:
    - **Mobile**: Aktualizacje w Google Play / App Store (lub EAS / TestFlight).
    - **Web**: Deploy w wybranym środowisku (np. Netlify, AWS).
- **Informowanie użytkowników**:
    - Noty w aplikacji i w repozytorium
    - Kontakt bezpośredni w przypadku istotnych błędów

---

## 6. Podsumowanie

W razie pytań lub zgłoszeń prosimy o kontakt przez Issues lub mail.