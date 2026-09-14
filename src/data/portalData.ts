export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  roomBadge: string;
  category: 'orga' | 'lotsendienst' | 'begruessung' | 'mensa' | 'rallye' | 'planung' | 'party' | 'kultur';
  responsible: string[];
  description: string;
  checklist?: string[];
  importantNote?: string;
  mentorInstructions?: string;
}

export interface DaySchedule {
  id: string;
  dayName: string;
  date: string;
  focus: string;
  items: ScheduleItem[];
}

export interface RoomInfo {
  room: string;
  building: string;
  floor: string;
  purpose: string;
  studyPrograms?: string[];
  equipment: string;
  responsibleContact?: string;
  notes?: string;
  googleMapsUrl?: string;
  appleMapsUrl?: string;
}

export interface CampusLocation {
  id: string;
  name: string;
  badge: string;
  address: string;
  description: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
  rooms?: string[];
  keyEvents?: string[];
}

export interface EmergencyContact {
  role: string;
  name: string;
  phone?: string;
  location: string;
  responsibility: string;
  isEmergencyService?: boolean;
}

export interface FAQItem {
  question: string;
  category: 'lsf' | 'spo' | 'accounts' | 'international' | 'soziales' | 'late-arrival';
  answer: string;
  actionPoints?: string[];
}

export interface RallyeStation {
  name: string;
  location: string;
  type: 'campus' | 'stadt';
  lead: string;
  status: 'Bestaetigt' | 'Offen';
  description: string;
}

export const DAYS_SCHEDULE: DaySchedule[] = [
  {
    id: 'montag',
    dayName: 'Montag',
    date: '05.10.2026',
    focus: 'Begrüßung, Ersti-Beutel & Campusrallye',
    items: [
      {
        id: 'mo-1',
        time: '11:20 bis 12:00 Uhr',
        title: 'Campus-Lotsendienst',
        location: 'Magistrale, Campus Welcome Center bis FIN (G29)',
        roomBadge: 'Campus / Magistrale',
        category: 'lotsendienst',
        responsible: ['Orga-Team', 'Helfer-Team', 'Alle Mentoren'],
        description: 'Erstsemester vom Campus Welcome Center und von der Immatrikulationsfeier zur FIN lotsen.',
        checklist: [
          'Kreidespray-Markierungen auf den Hauptwegen aufbringen',
          'Wegweiser-Aufsteller entlang der Magistrale platzieren',
          'Erstis aktiv ansprechen und nach G29 begleiten',
          'Social-Media-Storys und Wegbeschreibungen live unterstützen'
        ],
        importantNote: 'Auf- und Abbau zentraler Infozelte erfolgt durch die OVGU.'
      },
      {
        id: 'mo-2',
        time: '12:00 bis 13:30 Uhr',
        title: 'Hello, Students! Begrüßung & Gruppeneinteilung',
        location: 'Gebäude 29, Großer Hörsaal',
        roomBadge: 'G29-307',
        category: 'begruessung',
        responsible: ['Dekanat', 'Micha', 'Davide', 'Emin', 'Mentoren-Tandems'],
        description: 'Offizielle Begrüßung der Bachelor-Erstis durch Dekanat und Fachschaftsrat. Sicherheitsbelehrung und Vorstellung des Mentoring-Programms.',
        checklist: [
          'Mentoren-Tandems finden sich im Hörsaal ein',
          'Gruppeneinteilung unterstützen: Jeweils zwei Mentoren übernehmen 10 bis 15 Erstis',
          'Gemeinsame WhatsApp-, Signal- oder Telegram-Gruppe für die Ersti-Gruppe aufsetzen',
          'Ersti-Beutel Logistik unterstützen'
        ],
        mentorInstructions: 'Erklärt euren Erstis kurz die Funktion von G29-103 als Notfall-Desk und Anlaufstelle.'
      },
      {
        id: 'mo-3',
        time: '13:00 bis 13:30 Uhr',
        title: 'E-Beutel Ausgabe & Logistik',
        location: 'Gebäude 29, Foyer & Besprechungsraum',
        roomBadge: 'G29-412 / Foyer',
        category: 'orga',
        responsible: ['Emin', 'Helfer-Team'],
        description: 'Ausgabe der gepackten Ersti-Beutel mit Goodies, Gutscheinen und Einkaufswagenchips an alle anwesenden Erstsemester.',
        checklist: [
          'Materialnachschub aus G29-412 ins Foyer organisieren',
          'Beutelausgabe nur gegen Vorlage der Immatrikulationsbescheinigung bzw. Namensabgleich',
          'Restbeutel für Nachzügler zählen und in G29-103 einlagern'
        ]
      },
      {
        id: 'mo-4',
        time: '13:30 bis 15:00 Uhr',
        title: 'Bits & Bites: Gemeinsamer Mensagang',
        location: 'Mensa UniCampus',
        roomBadge: 'Mensa',
        category: 'mensa',
        responsible: ['Mentoren-Tandems'],
        description: 'Erste gemeinsame Mensa-Runde mit den Mentoren-Gruppen. Erstsemester-Karten an den Terminals validieren.',
        checklist: [
          'Karten-Validierungsstationen im Mensafoyer oder Campus Welcome Center zeigen',
          'Erstis ohne Bargeld bzw. ohne aktive Karte unterstützen',
          'Lockeres Kennenlernen und erste Fragen zum Unialltag beantworten'
        ],
        importantNote: 'Erstis vorab daran erinnern, Studierendenausweis und Bezahlkarte bzw. Bargeld mitzubringen.'
      },
      {
        id: 'mo-5',
        time: '15:00 bis 18:00 Uhr',
        title: 'Campusrallye (5 Routen)',
        location: 'Start: Vorplatz Gebäude 29 (FIN)',
        roomBadge: 'Vorplatz G29',
        category: 'rallye',
        responsible: ['Davide (Leitung)', 'Emin', 'Mentoren-Tandems'],
        description: 'Große Campusrallye mit rund 150 bis 200 Erstis in 15 bis 20 Kleingruppen über 5 verschiedene Campus-Routen.',
        checklist: [
          'Gruppen zeitversetzt an den 5 Startpunkten starten lassen',
          'Stationen anlaufen: UMD Racing (G11), DoJo/Lerncafé, robOTTO, Netz39, StuRa, Initiativen in G22',
          'Pflicht-Wegpunkte ansteuern: Prüfungsamt G29-101, URZ, Lernräume G29-333 und G29-318',
          'Punktebögen am Ziel im Foyer G29 abgeben'
        ],
        mentorInstructions: 'Achtet darauf, dass niemand verloren geht. Dedizierte englischsprachige Gruppen laufen mit muttersprachlichen oder fließend Englisch sprechenden Mentoren.'
      },
      {
        id: 'mo-6',
        time: '17:00 bis 23:00 Uhr',
        title: 'Informatik-Spieleabend',
        location: 'Gebäude 29, Großer Hörsaal',
        roomBadge: 'G29-307',
        category: 'party',
        responsible: ['Yousef', 'Lars', 'Helfer-Pool'],
        description: 'Gemütlicher Ausklang des ersten Tages mit Brettspielen, Konsolenecke, Multiplayer-Games und Vernetzung.',
        checklist: [
          'Spiele-Fundus aus G29-412 bereitstellen',
          'Snacks und Getränke ausgeben',
          'Ab 22:30 Uhr Müllentsorgung und Grundordnung im Hörsaal sicherstellen'
        ]
      }
    ]
  },
  {
    id: 'dienstag',
    dayName: 'Dienstag',
    date: '06.10.2026',
    focus: 'Bachelor Studiumsplanung.exe & Kneipentour',
    items: [
      {
        id: 'di-1',
        time: '13:00 bis 13:45 Uhr',
        title: 'Kurzpräsentationen Teil I',
        location: 'Gebäude 29, Großer Hörsaal',
        roomBadge: 'G29-307',
        category: 'begruessung',
        responsible: ['Emin (Moderation)', 'Claudia', 'Dr. Christian Beyer', 'regiocom SE', 'Jana Görs (QM)'],
        description: 'Impulsvorträge und Unternehmensvorstellung vor Beginn der Stundenplanerstellung.',
        checklist: [
          'Technik-Check für Präsentationen und Mikrofone in G29-307 durchführen',
          'Empfang von Dr. Christian Beyer und Klemens Gutmann (regiocom)',
          'Erstis pünktlich im Hörsaal versammeln'
        ],
        importantNote: 'Dr. Christian Beyer hält Keynote auf Englisch ("Learning is the errors we solved along the way"). Klemens Gutmann präsentiert regiocom zweisprachig.'
      },
      {
        id: 'di-2',
        time: '13:45 bis 19:00 Uhr',
        title: 'Bachelor Studiumsplanung.exe (Fachräume)',
        location: 'Gebäude 29 & Gebäude 20 (Fachseminarräume)',
        roomBadge: 'Fachräume FIN',
        category: 'planung',
        responsible: ['Emin (Gesamtleitung)', 'Fach-Mentoren pro Raum', 'Claudia & Darija (BiBa)'],
        description: 'Kerntag der E-Woche: Stundenplanerstellung, LSF-Einführung, Prüfungsordnung und Modulbelegung.',
        checklist: [
          'Raum G29-307: Bachelor Informatik (ca. 4 Gruppen)',
          'Raum G20-335: Bachelor Bilinguale Informatik (BiBa, hybrid ab 14:00 Uhr)',
          'Raum G29-336: Bachelor Wirtschaftsinformatik (Zoom-Link Turowski/Beyer bereitstellen)',
          'Raum G29-K058: Bachelor Ingenieurinformatik & AI-Engineering',
          'Raum G29-K059: Bachelor Computervisualistik (Zoom-Link Prof. Preim)',
          'Ausweichraum G29-333 bei Überlauf nutzen'
        ],
        mentorInstructions: 'Stellt sicher, dass jeder Ersti seinen LSF-Stundenplan fertiggestellt, auf Überschneidungen geprüft und als PDF exportiert hat.'
      },
      {
        id: 'di-3',
        time: '19:00 Uhr bis Open End',
        title: 'Kneipentour & Barabend',
        location: 'Treffpunkt Vorplatz G29, Richtung Hasselbachplatz',
        roomBadge: 'Hasselbachplatz',
        category: 'party',
        responsible: ['Diana (Koordination)', 'Mentoren-Teams'],
        description: 'Traditionelle Kneipentour durch Magdeburger Bars und Kneipen rund um den Hasselbachplatz.',
        checklist: [
          'Gruppen in max. 15 bis 20 Personen aufteilen',
          'Feste Mentoren-Tandems pro Gruppe bestimmen',
          'Alkoholfreie Optionen und Awareness aktiv gewährleisten',
          'Notfallkontakt zu Diana und Emin bereithalten'
        ],
        importantNote: 'Strikte Freiwilligkeit bei allen Trinkspielen. Niemand wird zum Alkoholkonsum gedrängt.'
      }
    ]
  },
  {
    id: 'mittwoch',
    dayName: 'Mittwoch',
    date: '07.10.2026',
    focus: 'Master-Planung, Stadtrallye & Instaparty',
    items: [
      {
        id: 'mi-1',
        time: '09:00 bis 09:30 Uhr',
        title: 'International Welcome & Orientation',
        location: 'Gebäude 29, Großer Hörsaal',
        roomBadge: 'G29-307',
        category: 'begruessung',
        responsible: ['Studiendekanat', 'Claudia Krull', 'FaRaFIN', 'Christin Gebauer'],
        description: 'Offizielle Begrüßung aller neuen Master- und internationalen Studierenden. Zentrale Anlaufstellen für Visum, Prüfungsamt und Nachzügler.',
        checklist: [
          'Präsentation auf Englisch vorbereiten',
          'Hinweis auf Christin Gebauer als Ansprechperson für Late Arrivals geben',
          'Handouts und digitale Links verteilen'
        ]
      },
      {
        id: 'mi-2',
        time: '09:30 bis 12:00 Uhr',
        title: 'Master Studiumsplanung.exe',
        location: 'Gebäude 29, Großer Hörsaal & Seminarräume',
        roomBadge: 'G29-307 / Seminarräume',
        category: 'planung',
        responsible: ['Claudia', 'Magnus', 'Simin', 'Emin', 'Master-Mentoren'],
        description: 'Fachspezifische Studienplanung auf Englisch für MDKE (Data Science), MDE (Digital Engineering) und Visual Computing.',
        checklist: [
          'Zoom-Meeting für Visual Computing (Hansen) einrichten',
          'Modulwahl und Anerkennungsverfahren durchgehen',
          'Unterstützung bei LSF und Vorlesungsverzeichnis'
        ]
      },
      {
        id: 'mi-3',
        time: '13:00 bis 13:45 Uhr',
        title: 'Kurzpräsentationen Teil II',
        location: 'Gebäude 29, Großer Hörsaal',
        roomBadge: 'G29-307',
        category: 'begruessung',
        responsible: ['Emin (Moderation)', 'ArbeiterKind.de', 'Kamelia Dobreva (FDIBA)', 'Studentenwerk'],
        description: 'Vorstellung von ArbeiterKind.de, dem deutsch-bulgarischen Doppelabschluss FDIBA und Sozialberatung des Studentenwerks.',
        checklist: [
          'Vortragende am Haupteingang G29 empfangen',
          'Folien auf Präsentations-Laptop laden'
        ]
      },
      {
        id: 'mi-4',
        time: '13:45 bis 18:30 Uhr',
        title: 'Stadtrallye (Bilingual DE/EN)',
        location: 'Magdeburg Innenstadt, Domplatz & Elbufer',
        roomBadge: 'Magdeburg City',
        category: 'rallye',
        responsible: ['Davide (Leitung)', 'Timon Christ (regiocom)', 'Mentoren-Teams'],
        description: 'Erkundung der Stadt Magdeburg mit Fotospots, Elbpromenade, Kultur-Rätseln und exklusiver regiocom Challenge-Station.',
        checklist: [
          'Kleingruppen bilingual aufteilen',
          'Station bei regiocom ansteuern (Koordination Timon Christ)',
          'SelectLine Trinkflaschen als Etappengewinne bereithalten',
          'Rückkehr nach G29 pünktlich vor Beginn der Instaparty anleiten'
        ]
      },
      {
        id: 'mi-5',
        time: '19:00 Uhr bis Open End',
        title: 'Legendäre Instaparty',
        location: 'Gebäude 29, Innenhof & Foyer',
        roomBadge: 'G29 Innenhof',
        category: 'party',
        responsible: ['Diana', 'Lukas', 'Lars', 'Bar-Team', 'Grill-Team'],
        description: 'Große Fachschaftsparty im Innenhof von Gebäude 29 mit Musik, Barbetrieb, Grill mit veganen und vegetarischen Optionen.',
        checklist: [
          'Bar-Schichtplan in G29-103 aushängen',
          'Getränkelieferung (Plasmaservice Sponsoring) prüfen und kühlen',
          'Grillgut und vegane Alternativen vorbereiten',
          'DSGVO-Foto-Opt-Out Bändchen am Einlass bereithalten',
          'Lärmschutz und Einlasskontrolle überwachen'
        ],
        mentorInstructions: 'Mentoren unterstützen abwechselnd die Bar- und Einlassschichten gemäß Einteilungsplan.'
      }
    ]
  },
  {
    id: 'donnerstag',
    dayName: 'Donnerstag',
    date: '08.10.2026',
    focus: 'Markt der Möglichkeiten & Spieleabend',
    items: [
      {
        id: 'do-1',
        time: '10:00 bis 11:00 Uhr',
        title: 'Kater-Frühstück für Mentoren & Helfer',
        location: 'Gebäude 29, FaRaFIN-Büro',
        roomBadge: 'G29-103',
        category: 'orga',
        responsible: ['FaRaFIN Orga-Team'],
        description: 'Gemeinsames Frühstück, Kaffee und kurzes Lage-Briefing nach der Instaparty.',
        checklist: [
          'Kaffee kochen und Brötchen bereitstellen',
          'Kurzes 10-Minuten Feedback zum Vortag',
          'Stand-Schichten für den Markt der Möglichkeiten einteilen'
        ]
      },
      {
        id: 'do-2',
        time: '11:00 bis 15:00 Uhr',
        title: 'Markt der Möglichkeiten der OVGU',
        location: 'Gebäude 22, Innenhof & Foyer',
        roomBadge: 'G22 Innenhof',
        category: 'kultur',
        responsible: ['FaRaFIN Stand-Team', 'OVGU Zentral'],
        description: 'Große Hochschulmesse für studentische Initiativen, Sportgruppen, Vereine und Gremien.',
        checklist: [
          'FaRaFIN-Stand mit Bannern, Infoflyern und Goodies betreuen',
          'Erstis bei Fragen zu Gremienarbeit und Fachschaft beraten'
        ]
      },
      {
        id: 'do-3',
        time: '18:00 Uhr bis Open End',
        title: 'Abendprogramm: Festung Mark oder Mini-Spieleabend',
        location: 'Festung Mark bzw. Gebäude 29',
        roomBadge: 'Festung Mark / G29',
        category: 'party',
        responsible: ['Lars', 'Helfer-Team'],
        description: 'Gemütlicher Abend nach Helferkapazität: Besuch des Stübchens in der Festung Mark oder kleiner Spieleabend in G29.',
        checklist: [
          'Treffpunkt mit Erstis abstimmen',
          'Bei Bedarf G29-307 als Schlechtwetter-Alternative aufschließen'
        ]
      }
    ]
  },
  {
    id: 'freitag',
    dayName: 'Freitag',
    date: '09.10.2026',
    focus: 'Master-Brunch & Nordpark-Abschlussgrillen',
    items: [
      {
        id: 'fr-1',
        time: '10:00 bis 14:00 Uhr',
        title: 'Master-Brunch',
        location: 'Gebäude 29, Großer Hörsaal',
        roomBadge: 'G29-307',
        category: 'kultur',
        responsible: ['Simin', 'Helfer-Team'],
        description: 'Gemeinsames Mitbring-Frühstück und Networking für Masterstudierende und internationale Erstis.',
        checklist: [
          'Tische und Bestuhlung in G29-307 herrichten',
          'Kaffee, Tee und Kaltgetränke bereitstellen',
          'Raum ab 14:00 Uhr besenrein hinterlassen'
        ]
      },
      {
        id: 'fr-2',
        time: '15:00 Uhr bis Open End',
        title: 'Abschlussgrillen im Nordpark',
        location: 'Nordpark Magdeburg (Grillwiese)',
        roomBadge: 'Nordpark',
        category: 'party',
        responsible: ['Lars', 'Lukas', 'Kooperation FaRaMath', 'Grill-Team'],
        description: 'Großes Abschlussgrillen der E-Woche gemeinsam mit der Fachschaft Mathematik (FMA / FaRaMath).',
        checklist: [
          'Grills, Holzkohle, Pavillons und Bierzeltgarnituren in den Nordpark transportieren',
          'Vegane und Fleisch-Grillstationen strikt trennen',
          'Freiluftspiele aufbauen: Spikeball, Flunkyball, Wikingerschach',
          'Müllsäcke aufhängen und Parkfläche nach Ende komplett säubern'
        ],
        importantNote: 'Genehmigung für den Grillplatz im Nordpark liegt vor. Lärmschutz ab 22:00 Uhr beachten.'
      }
    ]
  },
  {
    id: 'wochenende',
    dayName: 'Samstag & Sonntag',
    date: '10./11.10.2026',
    focus: 'Mentoring-Dinner & Auswertung',
    items: [
      {
        id: 'we-1',
        time: 'Flexibel nach Absprache',
        title: 'Mentoring-Dinner & Lessons Learned',
        location: 'G29-307 oder Restaurant in Magdeburg',
        roomBadge: 'G29 / Extern',
        category: 'kultur',
        responsible: ['Emin', 'nossel', 'Kern-Orga', 'Alle Mentoren'],
        description: 'Dankeschön-Essen für alle Mentorinnen, Mentoren und Helfer. Feedbackrunde und Übergabe der Typst-Zertifikate.',
        checklist: [
          'Offizielle Typst-Helferzertifikate ausdrucken und überreichen',
          'Feedback-Punkte auf den Miro-Boards WiSe 2026/2027 festhalten',
          'Dokumentation und Fotos archivieren'
        ]
      }
    ]
  }
];

export const ROOMS_DATA: RoomInfo[] = [
  {
    room: 'G29-307',
    building: 'Gebäude 29 (FIN)',
    floor: '3. Obergeschoss',
    purpose: 'Großer Hörsaal: Begrüßung, Kurzpräsentationen, Spieleabend, Master-Brunch, Bachelor Informatik Planung.',
    studyPrograms: ['Informatik (Bachelor)', 'Master-Studiengänge (MDKE, MDE, VC)'],
    equipment: 'Beamer, Mikrofone, Hörsaalbestuhlung, HDMI-Pult, Klimaanlage.',
    notes: 'Ganztägig durchgehend gebucht. Zentrale Anlaufstelle bei Vollversammlungen.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    room: 'G29-103',
    building: 'Gebäude 29 (FIN)',
    floor: '1. Obergeschoss',
    purpose: 'FaRaFIN-Büro: Notfall-Schaltzentrale, tägliches Schichtleiter-Briefing (08:30 Uhr), Kater-Frühstück, Late-Arrival-Desk.',
    equipment: 'Kaffeemaschine, Notfall-Telefon, Verbandskasten, Rechner, Drucker, Schlüssel.',
    responsibleContact: 'Emin & Davide',
    notes: 'Dauerhaft während der gesamten E-Woche mit Orga-Mitgliedern besetzt.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    room: 'G29-301',
    building: 'Gebäude 29 (FIN)',
    floor: '3. Obergeschoss',
    purpose: 'Seminarraum: Orga-Puffer, Vorbereitungsraum und Ruheraum für Mentoren.',
    equipment: 'Tische, Stühle, Whiteboard, Stromanschlüsse.',
    notes: 'Rückzugsort für Mentoren zwischen den Schichten. Bitte leise und sauber halten.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    room: 'G29-412',
    building: 'Gebäude 29 (FIN)',
    floor: '4. Obergeschoss',
    purpose: 'Besprechungsraum: Fachschafts-Logistik, Materiallager, Sponsoren-Goodies, E-Beutel Nachschub.',
    equipment: 'Lagerregale, Packtische, Kartons, Rollwagen.',
    notes: 'Zutritt nur für Mentoren und Helfer. Tür stets geschlossen halten.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    room: 'G29-336',
    building: 'Gebäude 29 (FIN)',
    floor: '3. Obergeschoss',
    purpose: 'Seminarraum: Bachelor Wirtschaftsinformatik Studiumsplanung.exe am Dienstag.',
    studyPrograms: ['Wirtschaftsinformatik (B.Sc.)'],
    equipment: 'Beamer, Whiteboard, Steckdosenleisten, Zoom-Schaltung (Turowski/Beyer).',
    responsibleContact: 'Fach-Mentoren Wirtschaftsinformatik',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    room: 'G29-K058',
    building: 'Gebäude 29 (FIN)',
    floor: 'Untergeschoss (Keller)',
    purpose: 'Keller-Seminarraum: Bachelor Ingenieurinformatik & AI-Engineering am Dienstag.',
    studyPrograms: ['Ingenieurinformatik (B.Sc.)', 'AI-Engineering (B.Sc.)'],
    equipment: 'Beamer, Whiteboard, Rechner-Arbeitsplätze.',
    responsibleContact: 'Fach-Mentoren Ingenieurinformatik',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    room: 'G29-K059',
    building: 'Gebäude 29 (FIN)',
    floor: 'Untergeschoss (Keller)',
    purpose: 'Keller-Seminarraum: Bachelor Computervisualistik am Dienstag.',
    studyPrograms: ['Computervisualistik (B.Sc.)'],
    equipment: 'Beamer, Whiteboard, Steckdosen, Zoom-Schaltung (Prof. Preim).',
    responsibleContact: 'Fach-Mentoren Computervisualistik',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    room: 'G20-335',
    building: 'Gebäude 20',
    floor: '3. Obergeschoss',
    purpose: 'Seminarraum: Bachelor Bilinguale Informatik (BiBa, hybrid) am Dienstag ab 14:00 Uhr.',
    studyPrograms: ['Bilinguale Informatik / BiBa (B.Sc.)'],
    equipment: 'Hybrid-Videokonferenztechnik, Beamer, Whiteboard.',
    responsibleContact: 'Claudia Krull, Darija Grisanova, BiBa-Mentoren',
    googleMapsUrl: 'https://maps.google.com/?q=52.14028,11.64344',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+20+OVGU&ll=52.14028,11.64344'
  },
  {
    room: 'G29-333 / G29-318',
    building: 'Gebäude 29 (FIN)',
    floor: '3. Obergeschoss',
    purpose: 'Freie Arbeits- und Lernräume: Ausweichoptionen bei Überlauf der Planungsgruppen.',
    equipment: 'Tische, Strom, WLAN.',
    notes: 'Können ohne Voranmeldung als Puffer genutzt werden.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468'
  },
  {
    room: 'G11 Werkstatt',
    building: 'Gebäude 11',
    floor: 'Erdgeschoss',
    purpose: 'UMD Racing Formula Student Werkstatt: Station der Campusrallye am Montag.',
    equipment: 'Rennwagen, Demonstratoren, Werkzeuge.',
    responsibleContact: 'UMD Racing e.V.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13970,11.64160',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+11+OVGU&ll=52.13970,11.64160'
  },
  {
    room: 'G22 Foyer / DoJo',
    building: 'Gebäude 22',
    floor: 'Erdgeschoss',
    purpose: 'Campus Welcome Center, Studentenwerk Lerncafé / DoJo (Rallye-Station & Markt der Möglichkeiten).',
    equipment: 'Infostände, Sitzgelegenheiten.',
    responsibleContact: 'Studentenwerk & OVGU Zentral',
    googleMapsUrl: 'https://maps.google.com/?q=52.13812,11.64251',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+22+OVGU&ll=52.13812,11.64251'
  }
];

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'g29',
    name: 'Gebäude 29 (Fakultät für Informatik / FIN)',
    badge: 'Zentraler Knotenpunkt',
    address: 'Universitätsplatz 2, 39106 Magdeburg',
    description: 'Hauptstandort der E-Woche: Großer Hörsaal (G29-307), FaRaFIN-Büro (G29-103), Fachseminarräume und Innenhof.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13903,11.64468',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+29+FIN+OVGU&ll=52.13903,11.64468',
    rooms: ['G29-307', 'G29-103', 'G29-301', 'G29-412', 'G29-336', 'G29-K058', 'G29-K059', 'G29-333', 'G29-318'],
    keyEvents: ['Hello Students Begrüßung', 'Bachelor & Master Studiumsplanung', 'Spieleabend', 'Instaparty', 'Master-Brunch']
  },
  {
    id: 'g20',
    name: 'Gebäude 20 (BiBa Seminarraum)',
    badge: 'Studiengang BiBa',
    address: 'Universitätsplatz 2, 39106 Magdeburg',
    description: 'Standort für die Bilinguale Informatik (BiBa) Studiumsplanung in Raum G20-335 am Dienstag.',
    googleMapsUrl: 'https://maps.google.com/?q=52.14028,11.64344',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+20+OVGU&ll=52.14028,11.64344',
    rooms: ['G20-335'],
    keyEvents: ['BiBa Studiumsplanung (Dienstag 14:00 Uhr)']
  },
  {
    id: 'mensa',
    name: 'Mensa UniCampus & Campus Welcome Center (G22)',
    badge: 'Verpflegung & Service',
    address: 'Universitätsplatz 2, 39106 Magdeburg',
    description: 'Mensa für Bits & Bites Mensagang sowie Gebäude 22 (Studentenwerk DoJo, Lerncafé und Markt der Möglichkeiten).',
    googleMapsUrl: 'https://maps.google.com/?q=52.13812,11.64251',
    appleMapsUrl: 'https://maps.apple.com/?q=Mensa+UniCampus+Magdeburg&ll=52.13812,11.64251',
    rooms: ['Mensa Speisesaal', 'Validierungsterminals', 'G22 DoJo / Lerncafé', 'G22 Innenhof'],
    keyEvents: ['Bits & Bites Mensagang (Montag 13:30 Uhr)', 'Markt der Möglichkeiten (Donnerstag 11:00 Uhr)']
  },
  {
    id: 'g11',
    name: 'Gebäude 11 (UMD Racing Werkstatt)',
    badge: 'Campusrallye Station',
    address: 'Universitätsplatz 2, 39106 Magdeburg',
    description: 'Werkstatt des Formula Student Rennteams UMD Racing e.V. mit Rennwagen und Fahrsimulator.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13970,11.64160',
    appleMapsUrl: 'https://maps.apple.com/?q=Gebaeude+11+OVGU&ll=52.13970,11.64160',
    rooms: ['G11 Werkstatt'],
    keyEvents: ['Campusrallye Route 5 (Montag 15:00 Uhr)']
  },
  {
    id: 'hassel',
    name: 'Hasselbachplatz & Magdeburger Kneipenszene',
    badge: 'Abendprogramm',
    address: 'Hasselbachplatz, 39104 Magdeburg',
    description: 'Zentraler Treffpunkt für die Kneipentour und den Barabend am Dienstagabend.',
    googleMapsUrl: 'https://maps.google.com/?q=52.12282,11.62775',
    appleMapsUrl: 'https://maps.apple.com/?q=Hasselbachplatz+Magdeburg&ll=52.12282,11.62775',
    keyEvents: ['Kneipentour & Barabend (Dienstag 19:00 Uhr)']
  },
  {
    id: 'nordpark',
    name: 'Nordpark Magdeburg (Grillwiese)',
    badge: 'Wochenabschluss',
    address: 'Hohepfortestraße, 39106 Magdeburg',
    description: 'Große Parkanlage direkt nördlich des Campus. Traditionelles Kooperationsgrillen mit der Fachschaft Mathematik.',
    googleMapsUrl: 'https://maps.google.com/?q=52.14410,11.64350',
    appleMapsUrl: 'https://maps.apple.com/?q=Nordpark+Magdeburg&ll=52.14410,11.64350',
    keyEvents: ['Abschlussgrillen mit FaRaMath (Freitag 15:00 Uhr)']
  },
  {
    id: 'festung',
    name: 'Festung Mark',
    badge: 'Kulturareal',
    address: 'Hohepfortewall 1, 39104 Magdeburg',
    description: 'Historische Festungsanlage unweit des Campus mit Stübchen, Biergarten und Freiflächen.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13670,11.64680',
    appleMapsUrl: 'https://maps.apple.com/?q=Festung+Mark+Magdeburg&ll=52.13670,11.64680',
    keyEvents: ['Donnerstagabend (gemütlicher Ausklang)']
  },
  {
    id: 'opernhaus',
    name: 'Opernhaus Magdeburg',
    badge: 'Auftakt OVGU',
    address: 'Universitätsplatz 9, 39104 Magdeburg',
    description: 'Veranstaltungsort der feierlichen Immatrikulationsfeier der Universität zum Auftakt der Einführungswoche.',
    googleMapsUrl: 'https://maps.google.com/?q=52.13630,11.63750',
    appleMapsUrl: 'https://maps.apple.com/?q=Opernhaus+Magdeburg&ll=52.13630,11.63750',
    keyEvents: ['Offizielle Immatrikulationsfeier (Montag 10:30 Uhr)']
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    role: 'Gesamtleitung & Hauptorga E-Woche',
    name: 'Emin Girimhanov',
    phone: '+49 176 00000000',
    location: 'G29-103 (FaRaFIN-Büro) oder mobil',
    responsibility: 'Gesamtkoordination, Notfälle, Eskalationen, Sponsoren, Raumfragen'
  },
  {
    role: 'Co-Orga & Rallye-Leitung',
    name: 'Davide',
    phone: '+49 176 00000001',
    location: 'Campus unterwegs / G29-103',
    responsibility: 'Campusrallye, Stadtrallye, Mentoren-Einteilung, Notfallkette'
  },
  {
    role: 'Brandschutz & Campus-Sicherheit',
    name: 'Micha (Michael)',
    phone: '+49 391 67 00000',
    location: 'Gebäude 29',
    responsibility: 'Sicherheitsbelehrung, Erste Hilfe, Schließanlage, Hausrecht'
  },
  {
    role: 'Late Arrivals & Internationals Koordination',
    name: 'Christin Gebauer',
    phone: '+49 391 67 58000',
    location: 'Gebäude 29 Dekanat / Infopunkt',
    responsibility: 'Zentrale FIN-Kontaktperson für Nachzügler, Visumsprobleme und späte Einschreibungen'
  },
  {
    role: 'FaRaFIN-Büro Notfall-Schaltzentrale',
    name: 'G29-103 Festnetz',
    phone: '+49 391 67 58600',
    location: 'G29-103',
    responsibility: 'Dauerhaft besetztes Bürotelefon während der gesamten E-Woche'
  },
  {
    role: 'Notruf Feuerwehr & Rettungsdienst',
    name: 'Notruf 112',
    phone: '112',
    location: 'Magdeburg',
    responsibility: 'Akute medizinische Notfälle, Brand, Lebensgefahr',
    isEmergencyService: true
  },
  {
    role: 'Notruf Polizei',
    name: 'Polizei 110',
    phone: '110',
    location: 'Magdeburg',
    responsibility: 'Akute Bedrohung, Gewalt, Straftaten',
    isEmergencyService: true
  }
];

export const MENTOR_FAQ: FAQItem[] = [
  {
    category: 'accounts',
    question: 'Was mache ich, wenn ein Ersti noch keinen funktionierenden Uni-Account hat?',
    answer: 'Zur Validierung der Otto-von-Guericke-Card an die Automaten im Mensafoyer oder im Campus Welcome Center (G22) lotsen. Bei URZ-Accountproblemen direkt an den FaRaFIN-Techdesk in G29-103 verweisen. Für die Studiumsplanung am Dienstag temporär mit Gast-WLAN oder Screen-Sharing im Mentoren-Tandem arbeiten.',
    actionPoints: [
      'Automaten zur Kartenvalidierung: Mensafoyer oder G22',
      'URZ-Accountprüfung: G29-103 Notfall-Desk',
      'Temporäre Lösung: Gast-WLAN der OVGU oder gemeinsamer Bildschirm mit Mentor'
    ]
  },
  {
    category: 'spo',
    question: 'Wie erkläre ich die Prüfungsordnung (SPO) in drei Sätzen?',
    answer: 'Jedes Modul schließt mit einer Prüfungsleistung ab (Klausur, Hausarbeit, Projekt oder mündliche Prüfung). Pro Modul existieren regulär drei Versuche. Wer eine Prüfung im Erstversuch nicht besteht, wird für den nächsten regulären Prüfungstermin automatisch pflichtangemeldet.',
    actionPoints: [
      'Regulär 3 Versuche pro Modul',
      'Automatische Pflichtanmeldung im Folgesemester nach Nichtbestehen',
      'Prüfungsabmeldung ist bis wenige Tage vor der Klausur im LSF möglich'
    ]
  },
  {
    category: 'international',
    question: 'Ein Ersti spricht nur Englisch. Welcher Gruppe wird er zugeteilt?',
    answer: 'Die Master-Studiumsplanung und die Stadtrallye sind standardmäßig bilingual ausgelegt. Bei der Campusrallye am Montag gibt es dedizierte englischsprachige Gruppen mit muttersprachlichen oder fließend Englisch sprechenden Mentoren.',
    actionPoints: [
      'Montag Campusrallye: Englische Routengruppe auswählen',
      'Dienstag BiBa: Raum G20-335 (Bilinguale Informatik)',
      'Mittwoch Master: G29-307 International Welcome ab 09:00 Uhr'
    ]
  },
  {
    category: 'lsf',
    question: 'Wie funktioniert die Stundenplanerstellung im LSF Schritt für Schritt?',
    answer: 'Zuerst im Modulkatalog des Studiengangs die empfohlenen Pflichtveranstaltungen für das erste Fachsemester heraussuchen. Anschließend Vorlesungen, Übungen und Praktika im LSF belegen, Überschneidungen prüfen und den Plan als PDF oder iCal exportieren.',
    actionPoints: [
      'Schritt 1: Modulkatalog des Studiengangs öffnen (1. Fachsemester Pflichtmodule)',
      'Schritt 2: Veranstaltungen im LSF suchen und belegen',
      'Schritt 3: Zeitliche Überschneidungen in der Stundenplanansicht prüfen',
      'Schritt 4: Stundenplan als PDF herunterladen oder in Google/Apple Kalender exportieren'
    ]
  },
  {
    category: 'soziales',
    question: 'Wo gibt es Hilfe bei BAföG, Wohnheimen oder mentalen Krisen?',
    answer: 'Studentenwerk Magdeburg (Wohnheime, BAföG-Amt, Sozialberatung im Wohnheim 7) sowie die Psychosoziale Studierendenberatung (PSB). Erste unkomplizierte Anlaufstelle bei allen Orientierungsproblemen ist das FaRaFIN-Büro in G29-103.',
    actionPoints: [
      'Studentenwerk Wohnheim 7: BAföG & Wohnheimverwaltung',
      'Psychosoziale Studierendenberatung (PSB): Terminvermittlung vertraulich und kostenfrei',
      'FaRaFIN-Büro G29-103: Peer-to-Peer Beratung auf Augenhöhe'
    ]
  },
  {
    category: 'late-arrival',
    question: 'Was tun mit Nachzüglern (Late Arrivals), die erst im Laufe der Woche eintreffen?',
    answer: 'Christin Gebauer ist die zentrale Ansprechperson an der FIN für Late Arrivals und internationale Nachzügler. Im FaRaFIN-Büro (G29-103) liegen Ersti-Beutel bereit. Nachzügler werden sofort in bestehende Signal-, WhatsApp- und Discord-Mentorengruppen nachgetragen.',
    actionPoints: [
      'Erstis nach G29-103 schicken zur Beutelabholung',
      'Kontakt zu Christin Gebauer für offizielle Immatrikulationsfragen herstellen',
      'In die studiengangsspezifische Chatgruppe einladen',
      'Video-Aufzeichnungen und LSF-PDF-Guide aushändigen'
    ]
  }
];

export const RALLYE_STATIONS: RallyeStation[] = [
  {
    name: 'UMD Racing e.V.',
    location: 'Gebäude 11 Werkstatt',
    type: 'campus',
    lead: 'Formula Student Team',
    status: 'Bestaetigt',
    description: 'Besichtigung des aktuellen Rennwagens, Rennsimulator und Mini-Challenge für Ersti-Teams.'
  },
  {
    name: 'Studentenwerk Lerncafé / DoJo',
    location: 'Gebäude 22',
    type: 'campus',
    lead: 'Studentenwerk Magdeburg',
    status: 'Bestaetigt',
    description: 'Kennenlernen von Sozialberatung, Wohnheimangeboten und Quiz rund um Mensa und BAföG.'
  },
  {
    name: 'FaRaFIN Zentrale Station',
    location: 'G29 Vorplatz & Foyer',
    type: 'campus',
    lead: 'Davide & FaRaFIN-Team',
    status: 'Bestaetigt',
    description: 'Start- und Zielpunkt, Punktevergabe, Snack- und Getränkeausgabe.'
  },
  {
    name: 'regiocom SE Challenge-Station',
    location: 'Innenstadt / Elbufer Route',
    type: 'stadt',
    lead: 'Timon Christ (regiocom)',
    status: 'Bestaetigt',
    description: 'Exklusive Challenge-Station unseres Hauptsponsors regiocom bei der Stadtrallye am Mittwoch. Gewinne: Rucksäcke & Tech-Goodies.'
  },
  {
    name: 'Team robOTTO (Industrierobotik)',
    location: 'Gebäude 07 / FIN Labor',
    type: 'campus',
    lead: 'robOTTO Team',
    status: 'Offen',
    description: 'Live-Vorführung autonomer Roboter und Mini-Programmier-Rätsel.'
  },
  {
    name: 'Acagamics e.V. (Game Development)',
    location: 'Campus Liegenschaft',
    type: 'campus',
    lead: 'Acagamics Vorstand',
    status: 'Offen',
    description: 'Game-Development Showcase und Mini-Game Challenge auf Highscore.'
  },
  {
    name: 'Netz39 e.V. (Hackerspace)',
    location: 'G03-106',
    type: 'campus',
    lead: 'Netz39 Team',
    status: 'Offen',
    description: 'Hardware-Rätsel, Löten und Open-Source-Hardware zum Anfassen.'
  },
  {
    name: 'StuRa Hochschulpolitik & Campus-Quiz',
    location: 'Vor Gebäude 26 / Hörsaal 1',
    type: 'campus',
    lead: 'StuRa OVGU',
    status: 'Offen',
    description: 'Quiz zu studentischer Mitbestimmung und Gremien der Universität.'
  }
];

export const QUICK_LINKS = [
  {
    title: 'Öffentliches Ersti-Portal (FaRaFIN)',
    url: 'https://farafin.de/en/freshmen/intro-week/',
    description: 'Öffentlicher Zeitplan für Erstsemester auf Englisch und Deutsch'
  },
  {
    title: 'Typst Helfer- & Mentor-Zertifikate',
    url: 'https://typst.app/team/aaT7YZTCKOva32XW4Tduj4',
    description: 'Offizielle Vorlage zur Generierung der Zertifikate nach der E-Woche'
  },
  {
    title: 'FaRaFIN Cloud E-Woche Ordner',
    url: 'https://cloud.farafin.de/apps/files/files/189071?dir=/FaRaFIN/Referate%20und%20Taskforces/E-Woche',
    description: 'Alle PDFs, Lagepläne, Präsentationen und Druckdateien'
  },
  {
    title: 'Miro-Board WiSe 2026/2027',
    url: 'https://miro.com/app/board/uXjVGSX8eRI=/?share_link_id=644693867035',
    description: 'Live-Feedback, Notizen und Lessons Learned der E-Woche'
  }
];
