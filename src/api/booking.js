// All API calls proxied through /api → https://wizyty.uml.lodz.pl

// dobHint: what to put in the Date of Birth field (service-specific instruction)
// label / labelEn / labelUk: service name in PL / EN / UK
const DOB_VEHICLE = {
  pl: 'Data urodzenia właściciela pojazdu (dla firm: pełnomocnika)',
  en: 'Date of birth of the vehicle owner (for companies: representative)',
  uk: 'Дата народження власника транспортного засобу (для компаній: представника)',
}
const DOB_APPLICANT = {
  pl: 'Data urodzenia wnioskodawcy',
  en: "Applicant's date of birth",
  uk: 'Дата народження заявника',
}
const DOB_APPLICANT_CHILD = {
  pl: 'Data urodzenia wnioskodawcy (dla dzieci poniżej 13 lat: rodzica lub opiekuna)',
  en: "Applicant's date of birth (for children under 13: parent or guardian's)",
  uk: 'Дата народження заявника (для дітей до 13 років: батька або опікуна)',
}

export const SERVICES = [
  // ── POJAZDY ──────────────────────────────────────────────────────────────
  { category: 'Pojazdy', icon: '🚗',
    label: 'Rejestracja pojazdu', labelEn: 'Vehicle registration', labelUk: 'Реєстрація транспортного засобу',
    branchId: 8, serviceId: 60, sedcoBranch: 311, sedcoService: 409, dobHint: DOB_VEHICLE },
  { category: 'Pojazdy', icon: '🗓️',
    label: 'Rejestracja czasowa', labelEn: 'Temporary registration', labelUk: 'Тимчасова реєстрація',
    branchId: 8, serviceId: 61, sedcoBranch: 311, sedcoService: 410, dobHint: DOB_VEHICLE },
  { category: 'Pojazdy', icon: '🔧',
    label: 'Inne czynności rejestracyjne', labelEn: 'Other registration matters', labelUk: 'Інші реєстраційні питання',
    branchId: 8, serviceId: 62, sedcoBranch: 311, sedcoService: 411, dobHint: DOB_VEHICLE },
  { category: 'Pojazdy', icon: '📄',
    label: 'Odbiór dowodu rejestracyjnego', labelEn: 'Collect registration document', labelUk: 'Отримання свідоцтва про реєстрацію',
    branchId: 8, serviceId: 63, sedcoBranch: 311, sedcoService: 412, dobHint: DOB_VEHICLE },

  // ── PRAWA JAZDY ───────────────────────────────────────────────────────────
  { category: 'Prawa jazdy', icon: '📝',
    label: 'Profil kandydata na kierowcę', labelEn: 'Driver candidate profile', labelUk: 'Профіль кандидата на водія',
    branchId: 47, serviceId: 98, sedcoBranch: 311, sedcoService: 401, dobHint: DOB_APPLICANT },
  { category: 'Prawa jazdy', icon: '🚛',
    label: 'Uprawnienia kierowcy zawodowego', labelEn: 'Professional driver licence', labelUk: 'Права водія-професіонала',
    branchId: 47, serviceId: 99, sedcoBranch: 311, sedcoService: 402, dobHint: DOB_APPLICANT },
  { category: 'Prawa jazdy', icon: '🔄',
    label: 'Wymiana zagranicznego prawa jazdy', labelEn: 'Exchange foreign driving licence', labelUk: 'Обмін іноземного водійського посвідчення',
    branchId: 47, serviceId: 100, sedcoBranch: 311, sedcoService: 403, dobHint: DOB_APPLICANT },
  { category: 'Prawa jazdy', icon: '🪪',
    label: 'Odbiór prawa jazdy', labelEn: 'Collect driving licence', labelUk: 'Отримання водійського посвідчення',
    branchId: 47, serviceId: 101, sedcoBranch: 311, sedcoService: 404, dobHint: DOB_APPLICANT },
  { category: 'Prawa jazdy', icon: '📋',
    label: 'Inne sprawy – prawo jazdy', labelEn: 'Other – driving licence', labelUk: 'Інші питання – водійське посвідчення',
    branchId: 47, serviceId: 102, sedcoBranch: 311, sedcoService: 405, dobHint: DOB_APPLICANT },
  { category: 'Prawa jazdy', icon: '⛔',
    label: 'Zatrzymanie prawa jazdy', labelEn: 'Driving licence suspension', labelUk: 'Позбавлення водійського посвідчення',
    branchId: 47, serviceId: 103, sedcoBranch: 311, sedcoService: 406, dobHint: DOB_APPLICANT },

  // ── DOWODY OSOBISTE i EWIDENCJA LUDNOŚCI ─────────────────────────────────
  { category: 'Dowody osobiste i meldunki', icon: '📝',
    label: 'Złożenie wniosku o dowód  ·  ul. Smugowa 30/32', labelEn: 'ID card application  ·  ul. Smugowa 30/32', labelUk: 'Заява на посвідку особи  ·  ul. Smugowa 30/32',
    branchId: 6, serviceId: 14, sedcoBranch: 311, sedcoService: 398, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '🆔',
    label: 'Odbiór gotowego dowodu  ·  ul. Smugowa 30/32', labelEn: 'Collect ready ID card  ·  ul. Smugowa 30/32', labelUk: 'Отримання готової посвідки  ·  ul. Smugowa 30/32',
    branchId: 6, serviceId: 10, sedcoBranch: 311, sedcoService: 397, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '👥',
    label: 'Ewidencja ludności  ·  ul. Smugowa 30/32', labelEn: 'Population register  ·  ul. Smugowa 30/32', labelUk: 'Реєстр населення  ·  ul. Smugowa 30/32',
    branchId: 6, serviceId: 13, sedcoBranch: 311, sedcoService: 399, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '🔐',
    label: 'Zastrzeżenie numeru PESEL  ·  ul. Smugowa 30/32', labelEn: 'PESEL reservation  ·  ul. Smugowa 30/32', labelUk: 'Застереження PESEL  ·  ul. Smugowa 30/32',
    branchId: 6, serviceId: 12, sedcoBranch: 311, sedcoService: 400, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '📝',
    label: 'Złożenie wniosku o dowód  ·  ul. Krzemieniecka 2B', labelEn: 'ID card application  ·  ul. Krzemieniecka 2B', labelUk: 'Заява на посвідку особи  ·  ul. Krzemieniecka 2B',
    branchId: 19, serviceId: 16, sedcoBranch: 114, sedcoService: 173, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '🆔',
    label: 'Odbiór gotowego dowodu  ·  ul. Krzemieniecka 2B', labelEn: 'Collect ready ID card  ·  ul. Krzemieniecka 2B', labelUk: 'Отримання готової посвідки  ·  ul. Krzemieniecka 2B',
    branchId: 19, serviceId: 15, sedcoBranch: 114, sedcoService: 111, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '👥',
    label: 'Ewidencja ludności  ·  ul. Krzemieniecka 2B', labelEn: 'Population register  ·  ul. Krzemieniecka 2B', labelUk: 'Реєстр населення  ·  ul. Krzemieniecka 2B',
    branchId: 19, serviceId: 17, sedcoBranch: 114, sedcoService: 185, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '🔐',
    label: 'Zastrzeżenie numeru PESEL  ·  ul. Krzemieniecka 2B', labelEn: 'PESEL reservation  ·  ul. Krzemieniecka 2B', labelUk: 'Застереження PESEL  ·  ul. Krzemieniecka 2B',
    branchId: 19, serviceId: 19, sedcoBranch: 114, sedcoService: 187, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '🇺🇦',
    label: 'PESEL dla obywateli Ukrainy  ·  ul. Krzemieniecka 2B', labelEn: 'PESEL for Ukrainian citizens  ·  ul. Krzemieniecka 2B', labelUk: 'PESEL для громадян України  ·  ul. Krzemieniecka 2B',
    branchId: 19, serviceId: 18, sedcoBranch: 114, sedcoService: 186, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '📝',
    label: 'Złożenie wniosku o dowód  ·  al. Piłsudskiego 100', labelEn: 'ID card application  ·  al. Piłsudskiego 100', labelUk: 'Заява на посвідку особи  ·  al. Piłsudskiego 100',
    branchId: 12, serviceId: 73, sedcoBranch: 0, sedcoService: 31, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '🆔',
    label: 'Odbiór gotowego dowodu  ·  al. Piłsudskiego 100', labelEn: 'Collect ready ID card  ·  al. Piłsudskiego 100', labelUk: 'Отримання готової посвідки  ·  al. Piłsudskiego 100',
    branchId: 12, serviceId: 34, sedcoBranch: 0, sedcoService: 6, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '👥',
    label: 'Ewidencja ludności  ·  al. Piłsudskiego 100', labelEn: 'Population register  ·  al. Piłsudskiego 100', labelUk: 'Реєстр населення  ·  al. Piłsudskiego 100',
    branchId: 12, serviceId: 74, sedcoBranch: 0, sedcoService: 32, dobHint: DOB_APPLICANT_CHILD },
  { category: 'Dowody osobiste i meldunki', icon: '🔐',
    label: 'Zastrzeżenie numeru PESEL  ·  al. Piłsudskiego 100', labelEn: 'PESEL reservation  ·  al. Piłsudskiego 100', labelUk: 'Застереження PESEL  ·  al. Piłsudskiego 100',
    branchId: 12, serviceId: 33, sedcoBranch: 0, sedcoService: 5, dobHint: DOB_APPLICANT_CHILD },

  // ── URZĄD STANU CYWILNEGO ─────────────────────────────────────────────────
  { category: 'Urząd Stanu Cywilnego', icon: '📄',
    label: 'Odpisy aktów stanu cywilnego', labelEn: 'Civil status record extracts', labelUk: 'Витяги з актів цивільного стану',
    branchId: 9, serviceId: 97, sedcoBranch: 0, sedcoService: 55, dobHint: null },
  { category: 'Urząd Stanu Cywilnego', icon: '✏️',
    label: 'Zmiana imienia lub nazwiska / akty zagraniczne', labelEn: 'Name or surname change / foreign records', labelUk: 'Зміна імені або прізвища / іноземні акти',
    branchId: 10, serviceId: 29, sedcoBranch: 0, sedcoService: 1, dobHint: null },
  { category: 'Urząd Stanu Cywilnego', icon: '📝',
    label: 'Sprostowanie lub uzupełnienie aktu / rozwód zagraniczny', labelEn: 'Record correction or amendment / foreign divorce', labelUk: 'Виправлення або доповнення акта / іноземне розлучення',
    branchId: 10, serviceId: 30, sedcoBranch: 0, sedcoService: 2, dobHint: null },
  { category: 'Urząd Stanu Cywilnego', icon: '👶',
    label: 'Rejestracja urodzenia dziecka', labelEn: 'Child birth registration', labelUk: 'Реєстрація народження дитини',
    branchId: 11, serviceId: 31, sedcoBranch: 0, sedcoService: 3, dobHint: null },
  { category: 'Urząd Stanu Cywilnego', icon: '💒',
    label: 'Zawarcie małżeństwa / zaświadczenia o stanie cywilnym', labelEn: 'Marriage / civil status certificates', labelUk: 'Укладення шлюбу / довідки про сімейний стан',
    branchId: 11, serviceId: 32, sedcoBranch: 0, sedcoService: 4, dobHint: null },

  // ── NADZÓR I KONTROLA ─────────────────────────────────────────────────────
  { category: 'Nadzór i kontrola', icon: '🏫',
    label: 'Ośrodki szkolenia kierowców, instruktorzy i wykładowcy', labelEn: 'Driving schools, instructors & lecturers', labelUk: 'Школи водіння, інструктори та викладачі',
    branchId: 7, serviceId: 58, sedcoBranch: 311, sedcoService: 99, dobHint: null },
  { category: 'Nadzór i kontrola', icon: '🔧',
    label: 'Stacje kontroli pojazdów i diagności', labelEn: 'Vehicle inspection stations & technicians', labelUk: 'Станції техогляду та діагности',
    branchId: 7, serviceId: 59, sedcoBranch: 311, sedcoService: 98, dobHint: null },

  // ── CENTRUM KONTAKTU Z MIESZKAŃCAMI ───────────────────────────────────────
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: 'ℹ️',
    label: 'Informacja UMŁ', labelEn: 'City Hall information', labelUk: 'Інформація міської ради',
    branchId: 58, serviceId: 117, sedcoBranch: 220, sedcoService: 233, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: '📩',
    label: 'Składanie pism do UMŁ', labelEn: 'Submit documents to City Hall', labelUk: 'Подання документів до міської ради',
    branchId: 58, serviceId: 118, sedcoBranch: 220, sedcoService: 234, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: '🏛️',
    label: 'Urbanistyka i Architektura – składanie dokumentów', labelEn: 'Urban planning & architecture – documents', labelUk: 'Урбаністика та архітектура – подання документів',
    branchId: 58, serviceId: 119, sedcoBranch: 220, sedcoService: 886, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: '👨‍👩‍👧‍👦',
    label: 'Łódzka Karta Dużej Rodziny', labelEn: 'Łódź Large Family Card', labelUk: 'Карта великої родини Лодзі',
    branchId: 58, serviceId: 120, sedcoBranch: 220, sedcoService: 239, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: '🇵🇱',
    label: 'Ogólnopolska Karta Dużej Rodziny', labelEn: 'National Large Family Card', labelUk: 'Загальнонаціональна карта великої родини',
    branchId: 58, serviceId: 121, sedcoBranch: 220, sedcoService: 238, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: '🚧',
    label: 'Wjazd na ul. Piotrkowską', labelEn: 'Access permit – ul. Piotrkowska', labelUk: 'Дозвіл на в\'їзд – ul. Piotrkowska',
    branchId: 58, serviceId: 122, sedcoBranch: 220, sedcoService: 241, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: '🏡',
    label: 'Grunty – opłata przekształceniowa', labelEn: 'Land – conversion fee', labelUk: 'Земля – плата за перетворення',
    branchId: 58, serviceId: 123, sedcoBranch: 220, sedcoService: 243, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: '🔐',
    label: 'Profil zaufany', labelEn: 'Trusted Profile', labelUk: 'Довірений профіль',
    branchId: 58, serviceId: 124, sedcoBranch: 220, sedcoService: 240, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: 'ℹ️',
    label: 'Informacja i pomoc w dokumentach  ·  Górna (Politechniki 32)', labelEn: 'Information & document help  ·  Górna (Politechniki 32)', labelUk: 'Інформація та допомога  ·  Górna (Politechniki 32)',
    branchId: 16, serviceId: 39, sedcoBranch: 0, sedcoService: 11, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: 'ℹ️',
    label: 'Informacja i pomoc w dokumentach  ·  Widzew (Piłsudskiego 100)', labelEn: 'Information & document help  ·  Widzew (Piłsudskiego 100)', labelUk: 'Інформація та допомога  ·  Widzew (Piłsudskiego 100)',
    branchId: 18, serviceId: 41, sedcoBranch: 0, sedcoService: 13, dobHint: null },
  { category: 'Centrum Kontaktu z Mieszkańcami', icon: '🔍',
    label: 'Biuro Rzeczy Znalezionych  ·  Śródmieście (Piotrkowska 153)', labelEn: 'Lost & Found Office  ·  Śródmieście (Piotrkowska 153)', labelUk: 'Бюро знахідок  ·  Śródmieście (Piotrkowska 153)',
    branchId: 43, serviceId: 76, sedcoBranch: 0, sedcoService: 34, dobHint: null },

  // ── PODATKI ───────────────────────────────────────────────────────────────
  { category: 'Podatki i opłaty', icon: '🏠',
    label: 'Nieruchomości (os. fizyczne) – deklaracje', labelEn: 'Property tax (individuals) – declarations', labelUk: 'Нерухомість (фізичні особи) – декларації',
    branchId: 34, serviceId: 57, sedcoBranch: 444, sedcoService: 454, dobHint: null },
  { category: 'Podatki i opłaty', icon: '💰',
    label: 'Nieruchomości (os. fizyczne) – rozliczenia', labelEn: 'Property tax (individuals) – payments', labelUk: 'Нерухомість (фізичні особи) – розрахунки',
    branchId: 34, serviceId: 66, sedcoBranch: 444, sedcoService: 463, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🎫',
    label: 'Nieruchomości (os. fizyczne) – ulgi i zwolnienia', labelEn: 'Property tax (individuals) – reliefs & exemptions', labelUk: 'Нерухомість (фізичні особи) – пільги та звільнення',
    branchId: 34, serviceId: 67, sedcoBranch: 444, sedcoService: 487, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🏢',
    label: 'Nieruchomości (os. prawne) – deklaracje', labelEn: 'Property tax (legal entities) – declarations', labelUk: 'Нерухомість (юридичні особи) – декларації',
    branchId: 38, serviceId: 86, sedcoBranch: 444, sedcoService: 482, dobHint: null },
  { category: 'Podatki i opłaty', icon: '💰',
    label: 'Nieruchomości (os. prawne) – rozliczenia', labelEn: 'Property tax (legal entities) – payments', labelUk: 'Нерухомість (юридичні особи) – розрахунки',
    branchId: 38, serviceId: 87, sedcoBranch: 444, sedcoService: 462, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🎫',
    label: 'Nieruchomości (os. prawne) – ulgi i zwolnienia', labelEn: 'Property tax (legal entities) – reliefs & exemptions', labelUk: 'Нерухомість (юридичні особи) – пільги та звільнення',
    branchId: 38, serviceId: 105, sedcoBranch: 444, sedcoService: 487, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🌾',
    label: 'Podatek rolny i leśny – deklaracje', labelEn: 'Agricultural & forestry tax – declarations', labelUk: 'Сільськогосподарський та лісовий податок – декларації',
    branchId: 35, serviceId: 71, sedcoBranch: 444, sedcoService: 459, dobHint: null },
  { category: 'Podatki i opłaty', icon: '💰',
    label: 'Podatek rolny i leśny – rozliczenia', labelEn: 'Agricultural & forestry tax – payments', labelUk: 'Сільськогосподарський та лісовий податок – розрахунки',
    branchId: 35, serviceId: 107, sedcoBranch: 444, sedcoService: 463, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🎫',
    label: 'Podatek rolny i leśny – ulgi i zwolnienia', labelEn: 'Agricultural & forestry tax – reliefs & exemptions', labelUk: 'Сільськогосподарський та лісовий податок – пільги',
    branchId: 35, serviceId: 108, sedcoBranch: 444, sedcoService: 487, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🚌',
    label: 'Podatek od środków transportowych – deklaracje', labelEn: 'Transport vehicles tax – declarations', labelUk: 'Податок на транспортні засоби – декларації',
    branchId: 39, serviceId: 88, sedcoBranch: 444, sedcoService: 484, dobHint: null },
  { category: 'Podatki i opłaty', icon: '💰',
    label: 'Podatek od środków transportowych – rozliczenia', labelEn: 'Transport vehicles tax – payments', labelUk: 'Податок на транспортні засоби – розрахунки',
    branchId: 39, serviceId: 110, sedcoBranch: 444, sedcoService: 462, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🎫',
    label: 'Podatek od środków transportowych – ulgi i zwolnienia', labelEn: 'Transport vehicles tax – reliefs & exemptions', labelUk: 'Податок на транспортні засоби – пільги та звільнення',
    branchId: 39, serviceId: 111, sedcoBranch: 444, sedcoService: 487, dobHint: null },
  { category: 'Podatki i opłaty', icon: '♻️',
    label: 'Opłata za odpady – złożenie deklaracji (DO-J/DO-W/DO-L)', labelEn: 'Waste fee – declaration (DO-J/DO-W/DO-L)', labelUk: 'Плата за відходи – декларація (DO-J/DO-W/DO-L)',
    branchId: 36, serviceId: 77, sedcoBranch: 444, sedcoService: 469, dobHint: null },
  { category: 'Podatki i opłaty', icon: '💰',
    label: 'Opłata za odpady – rozliczenia (księgowość)', labelEn: 'Waste fee – payments (accounting)', labelUk: 'Плата за відходи – розрахунки (бухгалтерія)',
    branchId: 36, serviceId: 126, sedcoBranch: 444, sedcoService: 476, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🎫',
    label: 'Opłata za odpady – ulgi i zwolnienia', labelEn: 'Waste fee – reliefs & exemptions', labelUk: 'Плата за відходи – пільги та звільнення',
    branchId: 36, serviceId: 112, sedcoBranch: 444, sedcoService: 487, dobHint: null },
  { category: 'Podatki i opłaty', icon: '🔍',
    label: 'Kontrola podatkowa', labelEn: 'Tax audit', labelUk: 'Податкова перевірка',
    branchId: 40, serviceId: 89, sedcoBranch: 444, sedcoService: 489, dobHint: null },
  { category: 'Podatki i opłaty', icon: '💸',
    label: 'Opłata skarbowa', labelEn: 'Stamp duty', labelUk: 'Державне мито',
    branchId: 41, serviceId: 90, sedcoBranch: 444, sedcoService: 490, dobHint: null },

  // ── OSOBY Z NIEPEŁNOSPRAWNOŚCIĄ ───────────────────────────────────────────
  { category: 'Osoby z niepełnosprawnością', icon: '🤝',
    label: 'Spotkanie z Rzecznikiem Osób Niepełnosprawnych', labelEn: 'Meeting with Disability Ombudsman', labelUk: 'Зустріч з уповноваженим з питань інвалідності',
    branchId: 30, serviceId: 53, sedcoBranch: 0, sedcoService: 25, dobHint: null },
  { category: 'Osoby z niepełnosprawnością', icon: '♿',
    label: 'Wydanie Łódzkiej Karty Bez Barier / Identyfikatora C', labelEn: 'Łódź Barrier-Free Card / C-Identifier', labelUk: 'Видача карти Łódź Bez Barier / ідентифікатора C',
    branchId: 30, serviceId: 54, sedcoBranch: 0, sedcoService: 26, dobHint: null },
  { category: 'Osoby z niepełnosprawnością', icon: '💬',
    label: 'Konsultacje indywidualne', labelEn: 'Individual consultations', labelUk: 'Індивідуальні консультації',
    branchId: 30, serviceId: 55, sedcoBranch: 0, sedcoService: 27, dobHint: null },
  { category: 'Osoby z niepełnosprawnością', icon: '📋',
    label: 'Rekrutacja do projektów unijnych', labelEn: 'EU project recruitment', labelUk: 'Набір до проєктів ЄС',
    branchId: 30, serviceId: 56, sedcoBranch: 0, sedcoService: 28, dobHint: null },

  // ── EGZEKUCJA I WINDYKACJA ────────────────────────────────────────────────
  { category: 'Egzekucja i windykacja', icon: '⚖️',
    label: 'Egzekucja należności pieniężnych', labelEn: 'Enforcement of monetary claims', labelUk: 'Виконання грошових вимог',
    branchId: 32, serviceId: 93, sedcoBranch: 444, sedcoService: 925, dobHint: null },
  { category: 'Egzekucja i windykacja', icon: '📜',
    label: 'Windykacja należności cywilnoprawnych', labelEn: 'Civil law debt recovery', labelUk: 'Стягнення цивільно-правових заборгованостей',
    branchId: 33, serviceId: 104, sedcoBranch: 444, sedcoService: 926, dobHint: null },

  // ── DZIAŁALNOŚĆ GOSPODARCZA ───────────────────────────────────────────────
  { category: 'Działalność gospodarcza', icon: '🍺',
    label: 'Zezwolenia na sprzedaż napojów alkoholowych', labelEn: 'Alcohol sales permits', labelUk: 'Дозволи на продаж алкогольних напоїв',
    branchId: 45, serviceId: 95, sedcoBranch: 0, sedcoService: 53, dobHint: null },
  { category: 'Działalność gospodarcza', icon: '🚌',
    label: 'Licencje i zezwolenia transportowe', labelEn: 'Transport licences & permits', labelUk: 'Ліцензії та дозволи на перевезення',
    branchId: 44, serviceId: 94, sedcoBranch: 0, sedcoService: 52, dobHint: null },
  { category: 'Działalność gospodarcza', icon: '💼',
    label: 'CEIDG – rejestracja działalności', labelEn: 'CEIDG – business registration', labelUk: 'CEIDG – реєстрація підприємницької діяльності',
    branchId: 46, serviceId: 96, sedcoBranch: 0, sedcoService: 54, dobHint: null },
]

export const CATEGORY_META = {
  'Pojazdy':                        { icon: '🚗', color: '#2563eb' },
  'Prawa jazdy':                    { icon: '🪪', color: '#7c3aed' },
  'Dowody osobiste i meldunki':     { icon: '🆔', color: '#0891b2' },
  'Urząd Stanu Cywilnego':          { icon: '📜', color: '#b45309' },
  'Nadzór i kontrola':              { icon: '🔍', color: '#374151' },
  'Centrum Kontaktu z Mieszkańcami':{ icon: '💬', color: '#059669' },
  'Podatki i opłaty':               { icon: '🧾', color: '#dc2626' },
  'Osoby z niepełnosprawnością':    { icon: '♿', color: '#0284c7' },
  'Egzekucja i windykacja':         { icon: '⚖️', color: '#7f1d1d' },
  'Działalność gospodarcza':        { icon: '💼', color: '#1e40af' },
}

function toLocalDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// ── In-memory TTL cache ────────────────────────────────────────────────────
// Slots change infrequently; 2-minute TTL avoids repeat hammering when users
// navigate back to change their date or service.
const _cache = new Map()
const SLOT_TTL   = 2 * 60 * 1000  // 2 min — individual day slots
const RANGE_TTL  = 3 * 60 * 1000  // 3 min — month availability overview

function cacheGet(key) {
  const entry = _cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expires) { _cache.delete(key); return null }
  return entry.data
}

function cacheSet(key, data, ttl) {
  _cache.set(key, { data, expires: Date.now() + ttl })
  return data
}

// Fetch available slots for a specific date
// Returns array of { time, slots, maxSlots, reservations }
export async function fetchSlots(branchId, serviceId, date) {
  const dateStr = date instanceof Date ? toLocalDateStr(date) : date
  const key = `slots:${branchId}:${serviceId}:${dateStr}`
  const hit = cacheGet(key)
  if (hit) return hit

  const res = await fetch(`/api/admin/API/time/${branchId}/${serviceId}/${dateStr}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const times = data?.TIMES || []
  const slots = times.filter(t => t.slots > 0).map(t => ({
    time: t.time.slice(0, 5),
    slots: t.slots,
    maxSlots: parseInt(t.max_slots),
    reservations: t.reservations_count,
  }))
  return cacheSet(key, slots, SLOT_TTL)
}

// Fetch availability summary across a date range
// Returns { [dateStr]: availableSlotCount }
export async function fetchRangeAvailability(branchId, serviceId, startDate, endDate) {
  const rangeKey = `range:${branchId}:${serviceId}:${toLocalDateStr(new Date(startDate))}:${toLocalDateStr(new Date(endDate))}`
  const hit = cacheGet(rangeKey)
  if (hit) return hit

  const results = {}
  const current = new Date(startDate)
  const end = new Date(endDate)
  const promises = []
  const dates = []

  while (current <= end) {
    const dayOfWeek = current.getDay()
    const dateStr = toLocalDateStr(current)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push(dateStr)
      promises.push(fetchSlots(branchId, serviceId, dateStr).catch(() => []))
    }
    current.setDate(current.getDate() + 1)
  }

  const allSlots = await Promise.all(promises)
  dates.forEach((d, i) => {
    results[d] = allSlots[i].reduce((sum, s) => sum + s.slots, 0)
  })
  return cacheSet(rangeKey, results, RANGE_TTL)
}

// Send SMS verification code
export async function sendVerificationCode({ phone, branchId, serviceId, sedcoBranch, sedcoService }) {
  const payload = JSON.stringify({
    phone,
    timestamp: Date.now(),
    SedcoBranchID: sedcoBranch,
    SedcoServiceID: sedcoService,
    BranchID: branchId,
    ServiceID: serviceId,
  })
  const form = new FormData()
  form.append('JSONForm', payload)
  const res = await fetch('/api/admin/API/validate_phone', { method: 'POST', body: form })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return await res.json()
}

// Book the appointment
export async function takeAppointment({
  sedcoBranch, sedcoService, branchId, serviceId,
  appointmentDay, appointmentTime,
  name, phone, verificationCode, dateOfBirth, email, notificationType,
}) {
  const payload = JSON.stringify({
    SedcoBranchID: sedcoBranch,
    SedcoServiceID: sedcoService,
    BranchID: branchId,
    ServiceID: serviceId,
    AppointmentDay: appointmentDay,
    AppointmentTime: appointmentTime,
    CustomerInfo: {
      AdditionalInfo: {
        CustomerName_L2: name,
        Phone: phone,
        verificationCode,
        DateOfBirth: dateOfBirth,
        Email: email,
        NotificationType: notificationType ? [notificationType] : ['email'],
        checkbox: true,
        checkbox2: true,
      }
    },
    LanguagePrefix: 'pl',
    SelectedLanguage: 'pl',
    SegmentIdentification: 'internet',
  })
  const form = new FormData()
  form.append('JSONForm', payload)
  const res = await fetch('/api/admin/API/take_appointment', { method: 'POST', body: form })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const result = data?.RESPONSE?.TakeAppointmentResult
  if (!result) throw new Error('Brak odpowiedzi z serwera')
  if (result.Code !== 0) throw new Error(result.Description || 'Nieznany błąd')
  return data?.RESPONSE?.AppointmentTicketInfo
}
