# 📚 Lehrer-Homepage - Installations- und Nutzungsanleitung

## 🎯 Überblick

Diese Lehrer-Homepage ist eine vollständige Web-Anwendung mit:
- ✅ Passwortgeschützten Klassenbereichen
- ✅ Material-Verwaltung (mit Links zu Cloud-Speichern)
- ✅ Hausaufgaben-Manager
- ✅ Terminkalender
- ✅ Fächerverwaltung
- ✅ Persistente Datenspeicherung

## 🚀 Hosting-Optionen (alle KOSTENLOS!)

### Option 1: Vercel (EMPFOHLEN - am einfachsten!)

**Vorteile:**
- Komplett kostenlos
- Automatisches HTTPS
- Extrem schnell
- 1-Klick-Deployment

**Schritt-für-Schritt:**

1. **Vercel-Account erstellen**
   - Gehe zu https://vercel.com
   - Registriere dich mit GitHub, GitLab oder Email
   - Account ist komplett kostenlos

2. **Projekt vorbereiten**
   ```bash
   # Erstelle einen neuen Ordner für dein Projekt
   mkdir lehrer-homepage
   cd lehrer-homepage
   
   # Kopiere die React-Datei hinein
   # (lehrer-homepage-vollstaendig.jsx)
   ```

3. **package.json erstellen**
   Erstelle eine Datei `package.json` mit folgendem Inhalt:
   ```json
   {
     "name": "lehrer-homepage",
     "version": "1.0.0",
     "private": true,
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     },
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "lucide-react": "^0.263.1"
     },
     "devDependencies": {
       "@vitejs/plugin-react": "^4.0.0",
       "vite": "^4.3.9"
     }
   }
   ```

4. **index.html erstellen**
   ```html
   <!DOCTYPE html>
   <html lang="de">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Lehrer-Homepage</title>
       <script src="https://cdn.tailwindcss.com"></script>
     </head>
     <body>
       <div id="root"></div>
       <script type="module" src="/src/main.jsx"></script>
     </body>
   </html>
   ```

5. **main.jsx erstellen**
   ```javascript
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import App from './lehrer-homepage-vollstaendig'

   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
   )
   ```

6. **Bei Vercel deployen**
   - Öffne https://vercel.com/new
   - Wähle "Import Project"
   - Verbinde dein GitHub-Repository ODER
   - Ziehe deinen Projekt-Ordner per Drag & Drop
   - Klicke auf "Deploy"
   - Fertig! 🎉

### Option 2: Netlify

**Vorteile:**
- Ebenfalls kostenlos
- Einfaches Drag & Drop
- Automatische Updates

**Anleitung:**
1. Gehe zu https://netlify.com
2. Registriere dich kostenlos
3. "Add new site" → "Deploy manually"
4. Ziehe deinen Build-Ordner per Drag & Drop
5. Fertig!

### Option 3: Firebase Hosting

**Vorteile:**
- Google-Integration
- Sehr zuverlässig
- Kostenlos

**Anleitung:**
1. Gehe zu https://firebase.google.com
2. Erstelle ein neues Projekt
3. Aktiviere Hosting
4. Installiere Firebase CLI:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

## 🔐 Sicherheit & Passwörter

### WICHTIG: Admin-Passwort ändern!

Öffne die Datei und ändere diese Zeile (ca. Zeile 20):
```javascript
const ADMIN_PASSWORD = 'Lehrer2024!';  // ← HIER ÄNDERN!
```

**Empfehlung für sichere Passwörter:**
- Mindestens 12 Zeichen
- Groß- und Kleinbuchstaben
- Zahlen und Sonderzeichen
- Beispiel: `Schule#2024!Sicher`

### Klassen-Passwörter

- Wähle für jede Klasse ein eigenes Passwort
- Teile Schülern das Passwort über sichere Wege mit
- Ändere Passwörter regelmäßig (z.B. pro Halbjahr)

## 📖 Nutzungsanleitung

### Für Lehrer (Admin)

1. **Erste Anmeldung**
   - Öffne die Website
   - Klicke auf "Lehrer-Login"
   - Gib dein Admin-Passwort ein

2. **Klasse erstellen**
   - Tab "Neue Klasse"
   - Klassenname eingeben (z.B. "8a")
   - Schuljahr (optional)
   - Klassen-Passwort festlegen
   - Fächer hinzufügen
   - "Klasse erstellen" klicken

3. **Materialien hochladen**
   - Tab "Materialien"
   - Klasse auswählen
   - Titel und Beschreibung eingeben
   - **WICHTIG**: Link zu deiner Cloud einfügen
     - Google Drive: Datei → Rechtsklick → Link abrufen
     - Dropbox: Datei → Freigeben → Link kopieren
     - OneDrive: Datei → Freigeben → Link kopieren
   - Fach auswählen (optional)
   - "Material hinzufügen" klicken

4. **Hausaufgaben erstellen**
   - Tab "Hausaufgaben"
   - Klasse auswählen
   - Titel eingeben
   - Ausführliche Beschreibung
   - Fälligkeitsdatum festlegen
   - Fach zuordnen
   - "Hausaufgabe hinzufügen" klicken

5. **Termine eintragen**
   - Tab "Termine"
   - Klasse auswählen
   - Titel (z.B. "Klassenarbeit Mathe")
   - Datum und Uhrzeit
   - Optional: Ort angeben
   - "Termin hinzufügen" klicken

### Für Schüler

1. **Anmeldung**
   - Website öffnen
   - "Schüler-Login" wählen
   - Eigene Klasse auswählen
   - Klassen-Passwort eingeben

2. **Materialien ansehen**
   - Tab "Materialien"
   - Material durchstöbern
   - Auf "Link öffnen" klicken zum Download

3. **Hausaufgaben checken**
   - Tab "Hausaufgaben"
   - Überfällige werden rot markiert
   - Dringende (≤3 Tage) orange markiert

4. **Termine einsehen**
   - Tab "Termine"
   - Alle kommenden Termine im Überblick
   - Vergangene Termine grau dargestellt

## 💾 Datenspeicherung

### Wie funktioniert die Speicherung?

Die App nutzt die Browser Storage API:
- Daten werden automatisch gespeichert
- Bleiben auch nach Browserschließung erhalten
- Funktioniert ohne zusätzliche Datenbank

### Datensicherung (WICHTIG!)

Da alle Daten im Browser gespeichert werden, solltest du regelmäßig Backups erstellen:

**Manuelles Backup:**
1. Als Admin anmelden
2. Browser-Entwicklertools öffnen (F12)
3. Tab "Application" → "Storage"
4. Rechtsklick auf Einträge → "Copy"
5. In Textdatei einfügen und sichern

**Empfehlung:**
- Backup mindestens 1x pro Monat
- Vor wichtigen Änderungen
- Auf USB-Stick oder Cloud speichern

## 🛠️ Anpassungen & Erweiterungen

### Design anpassen

**Farben ändern:**
Die App nutzt Tailwind CSS. Hauptfarben findest du hier:
- Admin: `from-indigo-600 to-blue-600`
- Schüler: `from-emerald-600 to-teal-600`

### Logo hinzufügen

Ersetze das Buch-Icon in Zeile ~130:
```javascript
<Book className="w-10 h-10 text-white" />
// Ersetzen mit deinem Logo:
<img src="dein-logo.png" alt="Logo" />
```

### Weitere Features

Die App ist erweiterbar für:
- Notenverwaltung
- Anwesenheitslisten
- Eltern-Zugang
- Chat-Funktion
- Dateiupload direkt (ohne Cloud-Links)

## 🐛 Problemlösung

### "Passwort funktioniert nicht"

- Stelle sicher, dass keine Leerzeichen vor/nach dem Passwort sind
- Achte auf Groß-/Kleinschreibung
- Lösche Browser-Cache und versuche erneut

### "Daten sind weg"

- Prüfe ob du im gleichen Browser bist
- Browser-Cache nicht gelöscht?
- Verwende dein Backup zur Wiederherstellung

### "Materialien werden nicht angezeigt"

- Prüfe ob der Cloud-Link öffentlich ist
- Teste den Link in einem neuen Tab
- Verwende "Jeder mit dem Link"-Freigabe

### "Seite lädt nicht"

- Browser-Cache leeren (Strg + Shift + R)
- Anderen Browser testen
- Bei Hosting-Anbieter Status prüfen

## 📱 Mobile Nutzung

Die App ist voll responsiv und funktioniert auf:
- Smartphones
- Tablets
- Desktop-PCs
- Alle modernen Browser

**Empfehlung für Schüler:**
- Als Lesezeichen auf Homescreen speichern
- Push-Benachrichtigungen können später hinzugefügt werden

## ⚖️ Rechtliches & Datenschutz

**DSGVO-konform:**
- Keine personenbezogenen Daten werden gespeichert
- Keine Tracking-Cookies
- Daten bleiben lokal im Browser
- Keine Server-seitige Speicherung

**Hinweis für Schulen:**
- Mit Datenschutzbeauftragten absprechen
- Einwilligung bei Cloud-Links einholen
- Keine sensiblen Daten teilen

## 🎓 Tipps für den Einsatz

### Best Practices

1. **Klare Namenskonvention**
   - Einheitliche Klassennamen (z.B. 8a, nicht Acht A)
   - Schuljahr immer angeben

2. **Regelmäßige Updates**
   - Mindestens 1x pro Woche neue Inhalte
   - Alte Termine/Hausaufgaben archivieren

3. **Klare Kommunikation**
   - Schülern erklären wie die Plattform funktioniert
   - Tutorials in der ersten Stunde zeigen
   - FAQ-Dokument erstellen

4. **Material-Organisation**
   - Fächer konsequent zuordnen
   - Beschreibungen klar formulieren
   - Links auf Funktionsfähigkeit prüfen

## 🆘 Support & Kontakt

Bei Problemen:
1. Zuerst diese Anleitung durchlesen
2. Browser-Konsole auf Fehler prüfen (F12)
3. Bei technischen Fragen: Community-Foren nutzen

## 📈 Zukünftige Features (geplant)

- [ ] PDF-Generierung für Hausaufgaben
- [ ] Email-Benachrichtigungen
- [ ] Export-Funktion für alle Daten
- [ ] Mehrsprachigkeit
- [ ] Dark Mode
- [ ] Offline-Modus (PWA)
- [ ] Notenverwaltung
- [ ] Anwesenheitsliste

## 🎉 Viel Erfolg!

Danke für die Nutzung der Lehrer-Homepage!

**Version:** 1.0  
**Letzte Aktualisierung:** Dezember 2024  
**Entwickelt für:** Moderne Bildung 🚀
