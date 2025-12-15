# 🚀 Lehrer-Homepage - ERWEITERTE VERSION 2.0

## ✨ NEUE FEATURES

### 🎨 Dark Mode
- Sun/Moon Button oben rechts
- Speichert Präferenz
- Funktioniert überall

### 📊 Dashboard (Lehrer)
- Live-Statistiken
- Klassen-Übersicht
- Schnellzugriff

### 📁 File-Upload System
- **Klein (<500KB)**: Direkt speichern
- **Groß (>500KB)**: Automatisch BayernCloud-Link
- Funktioniert für:
  - Materialien
  - Hausaufgaben-Abgabe
  - Foto-Galerie

### 📝 Hausaufgaben-Abgabe
**SCHÜLER KÖNNEN JETZT:**
- Hausaufgaben abgeben
- Dateien hochladen
- Status sehen (Offen/Abgegeben/Bewertet)

**LEHRER KÖNNEN:**
- Abgaben sehen
- Status ändern
- Feedback geben

### 📢 Ankündigungen
- Wichtige Mitteilungen
- Prioritäten (Normal/Wichtig/Dringend)
- Werden prominent angezeigt

### 🖼️ Foto-Galerie
- Klassenfotos hochladen
- Ausflüge dokumentieren
- Grid-Ansicht

### 📅 Stundenplan
- Wochenübersicht
- Fächer eintragen
- Für Schüler sichtbar

### 👤 Schüler-Login
- Müssen Namen eingeben
- Wird bei Abgaben angezeigt
- Bessere Nachvollziehbarkeit

## 🚀 DEPLOYMENT

### Schnellstart (Vercel):
```bash
1. Entpacke lehrer-homepage-ERWEITERT.zip
2. Gehe zu vercel.com
3. "New Project"
4. Ordner hochziehen
5. Framework: Vite
6. Deploy!
```

### Lokal testen:
```bash
cd lehrer-homepage
npm install
npm run dev
```

## 🔐 Login

**Lehrer:**
- Passwort: `Lehrer2024!`
- ⚠️ BITTE ÄNDERN in src/lehrer-homepage-vollstaendig.jsx Zeile 15

**Schüler:**
- Name eingeben
- Klasse wählen
- Klassen-Passwort (vom Lehrer)

## 📦 Was ist enthalten

```
lehrer-homepage/
├── src/
│   ├── main.jsx (Entry Point)
│   └── lehrer-homepage-vollstaendig.jsx (Haupt-App)
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README-ERWEITERT.md (diese Datei)
```

## ⚙️ Konfiguration

### Dark Mode
Automatisch aktivierbar - keine Config nötig

### BayernCloud
Nutzer wird automatisch aufgefordert bei großen Dateien

### File-Limits
In `FileUploadComponent` änderbar:
```javascript
maxSizeKB={500}  // ← Hier anpassen
```

## 🎯 Haupt-Features Übersicht

| Feature | Lehrer | Schüler |
|---------|--------|---------|
| Dashboard | ✅ | ❌ |
| Dark Mode | ✅ | ✅ |
| Klassen verwalten | ✅ | ❌ |
| Materialien hochladen | ✅ | ❌ |
| Materialien ansehen | ✅ | ✅ |
| Hausaufgaben erstellen | ✅ | ❌ |
| Hausaufgaben abgeben | ❌ | ✅ |
| Abgaben bewerten | ✅ | ❌ |
| Termine erstellen | ✅ | ❌ |
| Termine ansehen | ✅ | ✅ |
| Ankündigungen | ✅ | ✅ |
| Foto-Galerie | ✅ | ✅ |
| Stundenplan | ✅ | ✅ |

## 💾 Datenspeicherung

- **localStorage** (Browser)
- Keine externe Datenbank nötig
- Backup regelmäßig machen!

## 🐛 Bekannte Einschränkungen

1. **File-Größe**: Nur kleine Dateien (<500KB) direkt
2. **Browser-Abhängig**: Daten pro Browser/Gerät
3. **Kein Sync**: Zwischen Geräten nicht synchronisiert

## 🔄 Updates

Version 2.0 - Erweiterte Features
Version 1.0 - Basis-Funktionalität

## 🆘 Support

Bei Problemen:
1. Browser-Cache leeren
2. Inkognito-Modus testen
3. Console öffnen (F12) für Fehlermeldungen

## 🎉 Viel Erfolg!

Entwickelt für modernen digitalen Unterricht!
