🍰 Dokumentacja Projektowa: PWA "Słodka Ola"
Wersja: 1.0.0
Typ Aplikacji: Mobile-first Web App (PWA)
Główny cel: Bezproblemowe przeglądanie asortymentu cukierni, zarządzanie koszykiem i składanie zamówień przez interfejs mobilny w przeglądarce.

1. Stos Technologiczny (Standard 2026)
Aplikacja będzie oparta o architekturę Headless i Server-Driven UI, co zapewnia maksymalną wydajność na urządzeniach mobilnych.

Frontend / Framework: React 19+ (w ramach Next.js lub Remix) z wykorzystaniem React Server Components (RSC) dla błyskawicznego ładowania (Zero-Bundle-Size).

Stylizacja: Tailwind CSS z wykorzystaniem dynamicznych zmiennych CSS do obsługi motywów.

Zarządzanie Stanem: Zustand (dla lokalnego stanu koszyka) + React Query/SWR (dla synchronizacji asortymentu).

Backend / Baza Danych: BaaS (np. Supabase / Appwrite) oparty na PostgreSQL, oferujący wbudowaną autoryzację, Realtime API i Edge Functions dla logiki biznesowej (obliczanie cen koszyka, weryfikacja dostępności).

Hosting: Vercel lub Cloudflare Pages (wdrożenie na krawędzi - Edge Network).

2. Projektowanie Kognitywne i UI/UX
Projekt opiera się na zasadach psychologii poznawczej:

Prawo Fittsa: Główne przyciski akcji (CTA - np. "Dodaj do koszyka", "Przejdź do kasy") są duże (min. 48x48px) i umieszczone w dolnej części ekranu (tzw. Thumb Zone).

Prawo Millera: Asortyment jest podzielony na kategoryczne "kawałki" (Ciasteczka, Torty, Wypieki), aby nie przytłoczyć użytkownika mnogością opcji.

Zasada bliskości: Cena, waga (np. 500g) i przyciski kontroli ilości (+/-) znajdują się w jednej, wizualnie wydzielonej karcie.

Kolorystyka (Styl: Słodka Piekarnia)

Tło aplikacji (Background): Ciepła, kremowa biel #FFFDF9 (nie męczy wzroku).

Główny akcent (Primary): Pastelowy, "malinowy" róż #E88D96 (przyciski akcji, ikony nawigacji).

Tekst główny: Głęboki, czekoladowy brąz #3E2723 (lepszy kontrast i mniej agresywny niż czysty czarny).

Akcenty sukcesu (np. dodano do koszyka): Delikatna mięta #A8E6CF.

Typografia

Nagłówki: Fredoka lub Quicksand (zaokrąglone, przyjazne, budzące skojarzenia z lukrem i wypiekami).

Tekst czytelny (Body): Inter lub Nunito (maksymalna czytelność na małych ekranach).

3. Asortyment i Kategoryzacja (Mockup Danych)
Każdy produkt posiada jasno określoną logikę jednostki miary. Ciasteczka sprzedawane są na paczki (500g), torty na sztuki.

Kategoria: 🍪 Ciasteczka i Drobne Wypieki

Logika: 1 sztuka w koszyku = 1 paczka (500g)

Zdjęcie (Placeholder)	Nazwa Produktu	Opis	Cena	Jednostka
Pieguski Klasyczne	Kruche ciasteczka z kawałkami belgijskiej czekolady.	24.00 zł	Paczka 500g
Makaroniki Malina	Migdałowe makaroniki z nadzieniem malinowym.	45.00 zł	Paczka 500g
Kategoria: 🎂 Torty i Ciasta

Logika: 1 sztuka w koszyku = 1 cały tort/ciasto

Zdjęcie (Placeholder)	Nazwa Produktu	Opis	Cena	Jednostka
Malinowa Chmurka	Lekki tort z bezą, kremem mascarpone i malinami.	160.00 zł	1 sztuka
Sernik Nowojorski	Klasyczny, kremowy sernik na kruchym spodzie.	120.00 zł	1 sztuka
4. Architektura Widoków (Mobile)
A. Ekran Główny (Home / Menu)

Header: Logo "Słodka Ola" (wyśrodkowane), po prawej ikona koszyka z czerwoną kropką (badge) i liczbą produktów.

Hero Section: Karuzela z promocjami (np. "Dziś do kawy 10% taniej").

Filtry / Kategorie: Przewijane poziomo pigułki (Pills): Wszystko | Ciasteczka | Torty | Wegańskie.

Grid Produktów: Jedna kolumna na bardzo małych ekranach, dwie kolumny (Kafelki) na standardowych smartfonach. Każdy kafelek zawiera:

Zdjęcie na całą szerokość kafelka.

Nazwa i krótki opis.

Cena i gramatura (np. 24 zł / 500g).

Guzik + Dodaj (który po kliknięciu zmienia się na kontroler [ - ] 1 [ + ]).

B. Moduł Koszyka (Wysuwany Drawer z dołu / Bottom Sheet)

Zgodnie z dobrymi praktykami UX, koszyk na mobile nie powinien przenosić na nową stronę, lecz wysuwać się z dołu (Bottom Sheet), aby utrzymać kontekst zakupów.

Lista produktów:

Miniaturka zdjęcia.

Tytuł i info: np. Pieguski Klasyczne (500g).

Kontroler ilości: Przyciski ➖ i ➕.

Przycisk 🗑️ Usuń (zabezpieczony delikatną animacją potwierdzenia lub po prostu szybkim usunięciem z możliwością "Cofnij" w Snackbarze).

Podsumowanie:

Subtotal (Wartość produktów).

Koszt dostawy / Odbiór osobisty.

Sticky Bottom Bar (Zawsze widoczny na dole):

Suma całkowita: np. Wartość: 184.00 zł

Wielki przycisk akcji: Idź do kasy ->

C. Ekran Kasy (Checkout)

Krok 1: Dane zamawiającego (Imię, Telefon, E-mail).

Krok 2: Sposób odbioru (Odbiór osobisty w cukierni / Dowóz).

Krok 3: Metoda płatności (BLIK, Karta, Przelewy24, PayPo).

5. Logika Biznesowa (Bramka Płatności)
Na prośbę interesariuszy, integracja z zewnętrznym operatorem płatności jest na ten moment wstrzymana.

Flow końcowe zamówienia:

Użytkownik klika "Zamawiam i płacę".

Walidacja formularza (czy imię i telefon są wypełnione).

Pojawia się Modal (Pop-up) zajmujący cały ekran, z estetyczną grafiką (np. wektorowy, uśmiechnięty pączek) oraz wielkim napisem:

🚀 SOON ™

Moduł płatności jest w trakcie pieczenia!
Wróć do nas wkrótce, gdy tylko wyciągniemy go z pieca.

(W kodzie backendowym endpoint /api/checkout na ten moment będzie zwracał status 501 Not Implemented lub po prostu logował próbę zamówienia do bazy bez wywoływania API Stripe/PayU).