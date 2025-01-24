# React Native Travel App (MountGuide)

**Kros-platformowa aplikacja podróżnicza zbudowana za pomocą [Expo](https://expo.dev/) i [React Native](https://reactnative.dev/), integrująca [Appwrite](https://appwrite.io/) jako Backend-as-a-Service, zapewniając uwierzytelnianie użytkowników, przechowywanie danych, przesyłanie plików i inne.**  
Aplikacja umożliwia użytkownikom przeglądanie wyselekcjonowanych wycieczek górskich, rezerwowanie ich oraz dzielenie się opiniami. Istnieje również moduł certyfikacji przewodników, umożliwiający zweryfikowanym przewodnikom tworzenie i zarządzanie nowymi wycieczkami.

---

## Spis Treści

- [Przegląd](#przegląd)
- [Stos Technologiczny](#stos-technologiczny)
- [Struktura Katalogów](#struktura-katalogów)
- [Konfiguracja Środowiska](#konfiguracja-środowiska)
- [Instalacja](#instalacja)
- [Użycie](#użycie)
- [Skrypty](#skrypty)
- [Testowanie](#testowanie)
- [Wdrażanie](#wdrażanie)
- [Wkład](#wkład)
- [Licencja](#licencja)
- [Wsparcie i Kontakt](#wsparcie-i-kontakt)
- [Podziękowania](#podziękowania)

---

## Przegląd

### Kluczowe Funkcje

- **Uwierzytelnianie Użytkowników**: Bezpieczne logowanie przez Google OAuth (wykorzystując przepływ OAuth2 Appwrite).
- **Przeglądanie Wycieczek**: Wyświetla wyróżnione i rekomendowane wycieczki, wraz z możliwością filtrowania według trudności lub zapytania wyszukiwania.
- **Tworzenie Wycieczek**: Zweryfikowani przewodnicy mogą tworzyć nowe wycieczki, w tym nazwę, poziom trudności, daty, dystanse itp.
- **System Rezerwacji**: Użytkownicy mogą rezerwować wycieczki, zobaczyć, które wycieczki zarezerwowali, oraz anulować rezerwacje.
- **Certyfikacja Przewodników**: Pozwala użytkownikom na przesłanie certyfikatu kwalifikacyjnego, odblokowując możliwość tworzenia wycieczek.
- **Opinie i Oceny**: Zbiera opinie użytkowników; wyświetla średnią ocenę dla każdej wycieczki.

### Status
- W aktywnym rozwoju. Obecnie testowane na emulatorach Androida.

---

## Stos Technologiczny

- **Front-End / Mobile**: [React Native](https://reactnative.dev/) za pomocą [Expo](https://expo.dev)
- **Backend / API**: [Appwrite (cloud.appwrite.io)](https://appwrite.io/)
- **Routing**: [Expo Router](https://expo.github.io/router/docs)
- **Stylizacja**: [Tailwind CSS](https://tailwindcss.com/) z [NativeWind](https://www.nativewind.dev/)
- **Komponenty UI**: [React Native Paper](https://callstack.github.io/react-native-paper/)
- **Język**: TypeScript
- **Inne Ważne Pakiety**:
  - **`react-native-appwrite`** do integracji klienta Appwrite
  - **`expo-document-picker`** do przesyłania plików (certyfikaty i zdjęcia wycieczek)
  - **`use-debounce`** do optymalizacji zapytań wyszukiwania
  - **`react-native-safe-area-context`** do układu
  - **`expo-web-browser`** do obsługi przepływów OAuth
  - **`react-native-reanimated`** do animacji

---

## Struktura Katalogów

Poniżej znajduje się układ katalogów najwyższego poziomu:

```
.
├── app
│   ├── (root)
│   │   ├── (tabs)
│   │   │   ├── explore.tsx
│   │   │   ├── index.tsx
│   │   │   └── profile.tsx
│   │   ├── certificate
│   │   │   └── [id].tsx
│   │   └── trips
│   │       ├── bookedTrips.tsx
│   │       ├── create.tsx
│   │       ├── myTrips.tsx
│   │       └── [id].tsx
│   ├── _layout.tsx
│   ├── sign-in.tsx
│   ├── global.css
│   └── ...
├── components
│   ├── Cards.tsx
│   ├── Comment.tsx
│   ├── CustomButton.tsx
│   ├── Filters.tsx
│   ├── NoResults.tsx
│   └── Search.tsx
├── constants
│   ├── data.ts
│   ├── icons.ts
│   └── images.ts
├── lib
│   ├── appwrite.ts
│   ├── global-provider.tsx
│   ├── useAppwrite.ts
│   ├── seed.ts
│   └── data.ts
├── assets
│   ├── icons
│   ├── images
│   └── fonts
├── .env.local
├── .gitignore
├── app.json
├── babel.config.js
├── tailwind.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md
```

### Ważne Katalogi i Pliki

- **`app/`**  
  - **`(root)/(tabs)/index.tsx`**: Główny ekran (strona domowa) z wyróżnionymi i rekomendowanymi wycieczkami.  
  - **`(root)/(tabs)/explore.tsx`**: Ekran przeglądania wycieczek z filtrami.  
  - **`(root)/(tabs)/profile.tsx`**: Ekran profilu pokazujący szczegóły użytkownika, ustawienia i wylogowanie.  
  - **`sign-in.tsx`**: Ekran logowania Google OAuth.  
  - **`(root)/trips/`**: Zawiera trasy do zarządzania wycieczkami (tworzenie, lista zarezerwowanych wycieczek użytkownika itp.).  
  - **`(root)/certificate/[id].tsx`**: Strona przesyłania i wyświetlania certyfikatu przewodnika.  
  - **`_layout.tsx`**: Układ aplikacji używający Expo Router.  

- **`components/`**  
  - **`Cards.tsx`**: Zawiera komponenty UI do renderowania wyróżnionych kart i standardowych kart wycieczek.  
  - **`Comment.tsx`**: Wyświetla recenzje na stronach szczegółów wycieczek.  
  - **`Filters.tsx`**: Komponenty filtrów dla trudności wycieczek.  
  - **`Search.tsx`**: Pasek wyszukiwania z opóźnionym wejściem.  
  - **`CustomButton.tsx`**: Pływający przycisk akcji używany przez przewodników do tworzenia nowej wycieczki.  
  - **`NoResults.tsx`**: Wyświetlane, gdy nie znaleziono wyników na liście.

- **`constants/`**  
  - **`data.ts`**: Przykładowe dane statyczne i definicje (trudności, ustawienia itp.).  
  - **`icons.ts` / `images.ts`**: Centralne miejsce dla lokalnych lub zdalnych ikon i obrazów.

- **`lib/`**  
  - **`appwrite.ts`**: Konfiguracja i funkcje dla Appwrite (logowanie, wylogowanie, tworzenie wycieczki itp.).  
  - **`global-provider.tsx`**: Kontekst React używany do przechowywania globalnego stanu użytkownika i uwierzytelnienia.  
  - **`useAppwrite.ts`**: Niestandardowy hook do pobierania danych z Appwrite, obsługi ładowania i błędów.  
  - **`seed.ts`**: (Opcjonalnie) Skrypt do zasilania kolekcji Appwrite danymi testowymi.  
  - **`data.ts`**: Dodatkowe placeholdery dla obrazów lub przykładowych danych.

- **`tailwind.config.js`** / **`global.css`**: Konfiguracja Tailwind (NativeWind) i globalne style.

- **`.env.local`**: Przechowuje zmienne środowiskowe dla poświadczeń Appwrite, np. `EXPO_PUBLIC_APPWRITE_ENDPOINT`, `EXPO_PUBLIC_APPWRITE_PROJECT_ID` itp.

---

## Konfiguracja Środowiska

Ten projekt używa zmiennych środowiskowych do połączenia z instancją Appwrite. Kluczowe zmienne są przechowywane w **`.env.local`**, który jest ignorowany przez Git:

```
EXPO_PUBLIC_APPWRITE_PROJECT_ID=******
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_DATABASE_ID=******
EXPO_PUBLIC_APPWRITE_GUIDES_COLLECTION_ID=******
EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID=******
EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID=******
EXPO_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID=******
EXPO_PUBLIC_APPWRITE_BUCKET_ID=******
```

- **`EXPO_PUBLIC_APPWRITE_ENDPOINT`**: Bazowy URL dla Twojego punktu końcowego Appwrite.  
- **`EXPO_PUBLIC_APPWRITE_PROJECT_ID`**: Unikalny identyfikator projektu Appwrite.  
- **`EXPO_PUBLIC_APPWRITE_DATABASE_ID`**: ID Twojej głównej bazy danych Appwrite.  
- **`EXPO_PUBLIC_APPWRITE_*_COLLECTION_ID`**: ID różnych kolekcji (wycieczki, przewodnicy, galerie, opinie).  
- **`EXPO_PUBLIC_APPWRITE_BUCKET_ID`**: ID Twojego kubełka przechowywania Appwrite do obsługi obrazów/dokumentów.

**WAŻNE**: Nie commituj prawdziwych poświadczeń. Upewnij się, że dodałeś `env*.local` do **`.gitignore`**, aby uniknąć wycieku sekretów.

---

## Instalacja

1. **Sklonuj repozytorium**  
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd react_native_travelApp
   ```

2. **Zainstaluj zależności**  
   ```bash
   npm install
   ```

3. **Skonfiguruj .env.local**  
   - Sklonuj dowolny plik `.env.example` (jeśli jest dostępny) lub utwórz plik `.env.local`.  
   - Wypełnij go informacjami o swoim projekcie Appwrite (ID, punkty końcowe, kubełek).  

---

## Użycie

1. **Uruchom serwer deweloperski**  
   ```bash
   npx expo start
   ```

2. **Otwórz aplikację na emulatorach lub rzeczywistym urządzeniu**  
   - Naciśnij `a` w terminalu, aby otworzyć emulator Androida.  
   - Zeskanuj kod QR aparatem w swoim urządzeniu (za pomocą Expo Go) dla rzeczywistego urządzenia.

3. **Uzyskaj dostęp do wersji webowej (opcjonalnie)**  
   ```bash
   npx expo start --web
   ```
   Uruchamia aplikację w przeglądarce internetowej do szybkiego testowania.  

4. **Zaloguj się**  
   - Stuknij **“Kontynuuj z Google”** na ekranie logowania.  
   - Otworzy się okno przeglądarki do przepływu Google OAuth dostarczonego przez Appwrite.  
   - Po pomyślnym logowaniu zostaniesz przekierowany z powrotem do aplikacji.

5. **Przeglądaj lub Twórz Wycieczki**  
   - Po zalogowaniu możesz przeglądać wyróżnione lub rekomendowane wycieczki na ekranie **Home**.  
   - Filtruj lub wyszukuj na ekranie **Explore**.  
   - Jeśli jesteś certyfikowanym przewodnikiem, stuknij pływający przycisk **“+”**, aby stworzyć wycieczkę.

---

## Skrypty

W pliku **`package.json`** znajdziesz następujące skrypty:

- **`start`** : Uruchamia `expo start` w trybie deweloperskim.  
- **`android`** : Skrót do uruchomienia serwera Expo i otwarcia emulatora Androida.  
- **`web`** : Skrót do otwarcia aplikacji w przeglądarce internetowej.  
- **`test`** : Uruchamia testy Jest (`jest --watchAll`).  
- **`lint`** : Uruchamia `expo lint` w celu wykrycia potencjalnych problemów.  
- **`reset-project`** : Kopiuje istniejący kod aplikacji do `app-example` i przywraca pusty katalog **app**.  

Przykładowe użycie:
```bash
npm run android
```

---

## Testowanie (w trakcie tworzenia)

Ten projekt jest skonfigurowany z **Jest**:

- Uruchom wszystkie testy:
  ```bash
  npm run test
  ```
- Domyślnie skanuje wszystkie pliki testowe (`*.test.ts`, `*.test.tsx` itp.) w repozytorium.  

*Możesz rozbudować tę sekcję, jeśli dodasz testy integracyjne, raporty pokrycia itp.*

---

## Wdrażanie

### Wdrażanie do Sklepów (Android)
- **EAS (Expo Application Services)** jest zalecany do budowania binariów i publikowania w App Store/Play Store.  
- Postępuj zgodnie z [dokumentacją Expo EAS](https://docs.expo.dev/eas/) krok po kroku.

---

## Wkład

1. **Sforkuj** repozytorium.  
2. **Stwórz** nową gałąź funkcji z `main`.  
3. **Zacommituj** swoje zmiany z jasnymi komunikatami.  
4. **Wypchnij** do swojego forka i otwórz **Pull Request**.  

Zapraszamy do wkładu, sugestii i zgłaszania błędów!

---

## Licencja

Dystrybuowane na podstawie licencji MIT. Zobacz [LICENSE](LICENSE) po więcej informacji.

---

## Wsparcie i Kontakt

- **Problemy / Pytania**: Użyj [GitHub Issues](https://github.com/nina-stefurak/hiking-guide-app/issues).  
- **Email**: nina.stefurak@microsoft.wsei.edu.pl (opcjonalnie)  

---

## Podziękowania

- [React Native](https://reactnative.dev/) & [Expo](https://expo.dev) za umożliwienie rozwoju cross-platformowego.
- [Appwrite](https://appwrite.io/) za zarządzane uwierzytelnianie i bazy danych w czasie rzeczywistym.
- Społeczność open-source stojąca za [React Native Paper](https://callstack.github.io/react-native-paper/), [NativeWind](https://www.nativewind.dev/) i innymi.

---

> **Dziękujemy za zapoznanie się z projektem!** Jeśli masz jakieś pytania lub chcesz wnieść wkład, śmiało zgłoś problem lub pull request. Doceniamy Twoje zainteresowanie **MountGuide**.