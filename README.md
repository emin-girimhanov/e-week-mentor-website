# FaRaFIN E-Woche: Mentoren- & Helferportal

Internes, mobil-optimiertes Portal für alle Mentorinnen, Mentoren und Helfer der FIN-Einführungswoche an der Otto-von-Guericke-Universität Magdeburg.

---

## 🚀 Funktionen

* **Interaktiver Dienstplan (Montag bis Wochenende):**
  * Filterbar nach Wochentag, Aufgabenbereich (Lotsendienst, Studiumsplanung, Rallyes, Abend & Party) oder Freitext-Suche.
  * Lokale Aufgaben-Checkliste: Erledigte Punkte lassen sich direkt auf dem Smartphone abhaken (im LocalStorage gespeichert).
  * Anzeige von Raum, Uhrzeit, Zuständigen und Mentor-Instruktionen.
* **Raum-Kompass (Gebäude 29 & Campus):**
  * Schnelle Übersicht aller Kernräume (G29-307, G29-103, G29-301, G29-412 sowie Fachseminarräume).
  * Filterung nach Etage (Keller, 1. OG, 3. OG, 4. OG, Erdgeschoss).
  * Zuordnung der Studiengänge für Dienstag und Mittwoch.
* **Notfallkette & Notfallkontakte:**
  * Verbindliche 3-Stufen-Notfallkette (Deeskalation, Meldung an Hauptorga, Notruf 112).
  * 1-Klick Anruf zu Emin Girimhanov, Davide, Micha (Sicherheit) und Christin Gebauer (Late Arrivals).
  * FaRaFIN Awareness- und Verhaltenskodex (Null-Toleranz bei Diskriminierung, Freiwilligkeit bei Alkohol).
* **Mentor-FAQ für die Westentasche:**
  * Schnelle Hilfen bei fehlendem Uni-Account, Prüfungsordnungs-Crashkurs (SPO), LSF-Stundenplan, internationalen Erstis und Nachzüglern.
* **Campusrallye & Stadtrallye:**
  * 5 Routen im Detail, Übersicht der Initiativen-Stationen und Challenge-Station unseres Hauptsponsors regiocom SE.
* **Ressourcen & Quick-Links:**
  * Direkte Verlinkung zu Typst-Zertifikaten, Miro-Boards, Nextcloud-Ordner und offiziellem Ersti-Portal.
* **Passwortschutz:**
  * Gesperrter interner Bereich mit PIN/Kennwort (`farafin2026`).
  * Schutz vor Suchmaschinen durch `noindex, nofollow` und Sicherheits-Header in `vercel.json`.

---

## 💻 Lokale Entwicklung

```bash
# In den Ordner wechseln
cd mentoren-portal

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Der lokale Entwicklungsserver läuft anschließend unter `http://localhost:5173`.

---

## 🌐 Deployment auf Vercel

### Option A: Über das Vercel Web-Dashboard (Empfohlen)
1. Repository auf GitHub pushen (entweder als eigenes Repo oder als Monorepo-Unterordner).
2. Auf [vercel.com](https://vercel.com) ein neues Projekt anlegen und das Repository auswählen.
3. Falls es als Unterordner im Wissensdatenbank-Repo liegt: **Root Directory** auf `2-Areas/Vereine/FaRaFIN/E-Woche/mentoren-portal` setzen.
4. Framework Preset **Vite** auswählen und auf **Deploy** klicken.
5. Optional: Eigene Domain `mentoren.farafin.de` per CNAME-Eintrag auf `cname.vercel-dns.com` schalten.

### Option B: Über die Vercel CLI
```bash
npm i -g vercel
cd mentoren-portal
vercel
```

---

## 🎨 Farbdesign & Branding

* **FaRaFIN Blau:** `#3567b0` als primäre Akzentfarbe für Navigation, Pins und Buttons
* **Direkter Zugriff:** Kein Passwort erforderlich, sofortiger Einstieg für alle Helfenden

---

## 📝 Datenpflege & Aktualisierungen

Alle Daten (Schichten, Zeiten, Räume, Kontakte, FAQ) sind zentral in folgender Datei gebündelt:
* [src/data/portalData.ts](file:///C:/Users/eming/Nextcloud/Wissensdatenbank/2-Areas/Vereine/FaRaFIN/E-Woche/mentoren-portal/src/data/portalData.ts)

Änderungen dort werden dank TypeScript sofort typgeprüft und nach dem Build bzw. Push live übernommen.
