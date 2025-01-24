# MountGuide – Dokumentacja i Utrzymanie

---

## 1. Odbiór Produktu

- **Środowisko testowe**: Wykonawca udostępnia aplikację (Expo/React Native) oraz testową instancję Appwrite. Klient
  testuje kluczowe funkcje (logowanie, rezerwacje, tworzenie wycieczek).
- **Odbiór końcowy**: Po pozytywnych testach na środowisku testowym następuje weryfikacja w środowisku produkcyjnym (lub
  publikacja w Google Play/App Store). Tworzony jest krótki protokół odbioru.
- **Poprawki usterek**: Błędy zgłaszane są w backlogu (np. GitHub Issues). Naprawy w ustalonym harmonogramie.

---

## 2. Wdrożenie

- **Wymagania techniczne**:
    - Konfiguracja Appwrite (projekt, kolekcje, bucket) + .env (ID projektu, endpoint).
    - Dostępne narzędzia CI/CD (opcjonalnie) dla buildów Expo.
- **Proces instalacji**:
    - **Mobile**: Build aplikacji (APK/AAB/IPA) → publikacja w sklepie lub dystrybucja testowa.
    - **Web** (jeśli aktywny): `expo export:web` → hostowanie plików statycznych.
- **Migracja danych**: Na razie brak konieczności migracji (projekt w fazie rozwoju).
- **Okienko wdrożenia**: Jeśli aplikacja trafi na produkcję – zalecane wdrożenie poza godzinami szczytu, by uniknąć
  problemów.

---

## 3. Kopie Zapasowe

- **Za co odpowiada Appwrite**: W chmurze Appwrite utrzymuje bazy i pliki. Regularne backupy można skonfigurować z
  poziomu chmury lub panelu administracyjnego.
- **Właściciel systemu**: Może dodatkowo wykonywać eksport kolekcji lub plików i przechowywać je w niezależnym miejscu.
- **Rodzaje backupów**:
    - **Pełny** (np. 1x na tydzień/miesiąc).
    - **Przyrostowy** (jeśli dostępne).
- **Przechowywanie danych w aplikacji**: Główne dane są w chmurze. Na urządzeniu lokalnym (cache itp.) nie ma kluczowych
  informacji do backupowania.

---

## 4. Odtworzenie Systemu (DR)

- **Przygotowanie**:
    - Konfigurować od zera nową instancję Appwrite lub przywrócić z backupu.
    - Wgrać lub przywrócić bazy i pliki (kolekcje, bucket).
- **Frontend**:
    - Build Expo z repozytorium (lub przywrócony build).
    - Skonfigurować .env (endpointy Appwrite).
- **Kolejność**:
    - Najpierw przywrócenie usług w Appwrite (auth, baza).
    - Potem uruchomienie aplikacji (mobilnej/web).

---
