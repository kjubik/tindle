# tindle

Interfejs webowy do przeglądania wyników z przedmiotu Technologie internetowe. <br/><br/>
![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
### copy me to get started!

```
git clone https://github.com/kjubik/tindle
cd tindle
npm i
npm i tailwindcss
npm i @iconify/svelte
npm run dev
```

## Opis zadania

### Zadanie 6.1 - Indywidualny interfejs sprawdzarki TIN (4 punkty)

Stwórz aplikację internetową pozwalającą na przeglądanie wyników uzyskanych przez danego studenta na sprawdzarce TIN. Wymagane jest użycie wspólczesnej biblioteki/frameworku webowego (np. Angular).

Konieczne jest uwzględnienie:
* danych z endpointu <http://bikol.vm.wmi.amu.edu.pl/dtin/results/{id}>
    * sumy uzyskanych punktów
    * punktacji za poszczególne zadania
    * daty zaliczenia zadania oraz informacji dodatkowych
    * informacji czy zadanie zostało zrealizowane w terminie czy nie
* danych z endpointu <http://bikol.vm.wmi.amu.edu.pl/dtin/tasks>
    * maksymalnych punktów i terminu oddania poszczególnych zadań

### Zadanie 6.2 - Wspólny interfejs sprawdzarki TIN (4 punkty)

Stwórz aplikację internetową pozwalającą na przeglądanie wyników uzyskanych przez wszystkich studentów w ramach sprawdzarki TIN. Wymagane jest użycie wspólczesnej biblioteki/frameworku webowego (np. Angular). Rozwiązanie powinno stanowić rozszerzenie poprzedniego zadania.

Koniecznie jest uwzględnienie:
* danych z endpointu <http://bikol.vm.wmi.amu.edu.pl/dtin/results>
    * tabeli z punktami uzyskanymi przez wszystkich studentów (poszczególne zadania suma, zadania nie zrealizowane, zrelizowane po terminie itp)
* przechodzenia do profili indywidualnych
* sortowania rankingu po poszczególnym zadaniu, sumie punktów oraz numerze indeksu
* podświetlenia wybranego wiersza w tabeli

