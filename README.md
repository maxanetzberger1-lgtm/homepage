# 📚 Lehrer-Homepage - Digitale Klassenverwaltung

Eine vollständige, passwortgeschützte Web-Anwendung für Lehrer zur Verwaltung von Klassen, Materialien, Hausaufgaben und Terminen.

## ✨ Features

- 🔐 **Passwortschutz** - Separater Login für Lehrer und Schüler
- 📁 **Materialverwaltung** - Links zu Cloud-Speichern (Google Drive, Dropbox, etc.)
- 📝 **Hausaufgaben** - Mit Fälligkeitsdaten und Prioritäten
- 📅 **Terminkalender** - Klassenarbeiten, Veranstaltungen, etc.
- 🎯 **Fächerverwaltung** - Organisiere nach Unterrichtsfächern
- 💾 **Persistente Speicherung** - Alle Daten bleiben erhalten
- 📱 **Responsive Design** - Funktioniert auf allen Geräten

## 🚀 Schnellstart

### Option 1: Lokal testen

```bash
# Repository klonen oder Dateien herunterladen
# In den Projekt-Ordner wechseln
cd lehrer-homepage

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die App läuft jetzt auf http://localhost:3000

### Option 2: Auf Vercel deployen (EMPFOHLEN)

1. Gehe zu [vercel.com](https://vercel.com)
2. Erstelle einen kostenlosen Account
3. Klicke auf "New Project"
4. Importiere dieses Repository oder lade die Dateien hoch
5. Klicke auf "Deploy"
6. Fertig! 🎉

Alternativ: Netlify, Firebase Hosting, oder GitHub Pages

## 🔐 Erste Schritte

### Standard-Zugangsdaten

**Admin (Lehrer):**
- Passwort: `Lehrer2024!`
- ⚠️ **WICHTIG**: Ändere dieses Passwort in der Datei `src/lehrer-homepage-vollstaendig.jsx` (Zeile 20)!

**Schüler:**
- Passwörter werden vom Lehrer beim Erstellen einer Klasse festgelegt

## 📖 Nutzung

### Als Lehrer

1. Mit Admin-Passwort anmelden
2. Neue Klasse erstellen (Name, Schuljahr, Passwort)
3. Fächer hinzufügen
4. Materialien hochladen (als Links zu Cloud-Speichern)
5. Hausaufgaben und Termine eintragen

### Als Schüler

1. Klasse auswählen
2. Mit Klassen-Passwort anmelden
3. Materialien durchstöbern
4. Hausaufgaben checken
5. Termine einsehen

## 📁 Projekt-Struktur

```
lehrer-homepage/
├── src/
│   ├── main.jsx                           # React Einstiegspunkt
│   └── lehrer-homepage-vollstaendig.jsx   # Hauptanwendung
├── index.html                              # HTML Template
├── package.json                            # Abhängigkeiten
├── vite.config.js                          # Build-Konfiguration
├── ANLEITUNG.md                            # Ausführliche Dokumentation
└── README.md                               # Diese Datei
```

## 🛠️ Technologie-Stack

- **React 18** - UI Framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build Tool
- **Storage API** - Datenpersistenz

## 📝 Material-Upload

Die App unterstützt Material-Upload über Cloud-Links:

### Google Drive
1. Datei hochladen
2. Rechtsklick → "Link abrufen"
3. Freigabe: "Jeder mit dem Link"
4. Link kopieren und in der App einfügen

### Dropbox
1. Datei hochladen
2. "Freigeben" klicken
3. "Link erstellen"
4. Link kopieren und einfügen

### OneDrive
1. Datei hochladen
2. "Freigeben" → "Link kopieren"
3. Link in der App einfügen

## 🔒 Sicherheit

- Alle Daten werden lokal im Browser gespeichert
- Keine Server-seitige Datenspeicherung
- Passwörter sollten regelmäßig geändert werden
- Verwende starke Passwörter (min. 12 Zeichen)
- DSGVO-konform (keine personenbezogenen Daten erforderlich)

## 💾 Datensicherung

**Wichtig:** Erstelle regelmäßig Backups!

1. Browser-Entwicklertools öffnen (F12)
2. Tab "Application" → "Storage"
3. Einträge kopieren
4. In Textdatei speichern

Empfehlung: Backup 1x pro Monat

## 🎨 Anpassungen

### Admin-Passwort ändern
```javascript
// In src/lehrer-homepage-vollstaendig.jsx, Zeile ~20
const ADMIN_PASSWORD = 'DeinNeuesPasswort123!';
```

### Farben anpassen
Die App nutzt Tailwind CSS Klassen:
- Admin-Theme: `from-indigo-600 to-blue-600`
- Schüler-Theme: `from-emerald-600 to-teal-600`

## 🐛 Bekannte Probleme & Lösungen

**Problem:** Passwort wird nicht akzeptiert  
**Lösung:** Browser-Cache leeren (Strg + Shift + R)

**Problem:** Daten sind verschwunden  
**Lösung:** Browser-Storage prüfen, Backup einspielen

**Problem:** Materialien laden nicht  
**Lösung:** Cloud-Link auf "Jeder mit dem Link" setzen

## 📚 Weiterführende Dokumentation

Siehe `ANLEITUNG.md` für:
- Detaillierte Hosting-Anleitungen
- Ausführliche Nutzungstipps
- Problemlösungen
- Best Practices
- DSGVO-Hinweise

## 🤝 Beitragen

Verbesserungsvorschläge und Bug-Reports sind willkommen!

## 📄 Lizenz

Freie Nutzung für Bildungszwecke

## 🎓 Entwickelt für

Moderne Bildung - Digital, sicher, benutzerfreundlich

---

**Version:** 1.0.0  
**Stand:** Dezember 2024

Viel Erfolg mit deiner digitalen Klassenverwaltung! 🚀
