Diese Prüfung baut auf der Aufgabenstellung vom 22.11.2019 auf (Workshop mit Fabian).

Wir wollen diesmal eine (minimale) Todo - Applikation entwickeln.

Wie auch bei den vorangegangenen Themen fokussieren wir uns auf das Frontend, allerdings gibt es auch eine kleine Aufgabenstellung auf dem Server.

Die Prüfung ist als offener Power-Test ausgelegt, d.h. es gibt einige (wenige) Aufgaben, die definitiv gemacht werden müssen. Der Rest kann frei interpretiert werden, d.h. die Lösungstiefe / Ausgestaltung überlassen wir Euch.

## Setup

Dieses Repository enthält sowohl eine Web, als auch eine Server Applikation.
Öffnet jeweils *server* und *web* in einer eigenen Visual Studio Code Instanz.

In beiden Lösungen wie immer *npm install* ausführen.

Um sie zu starten, könnt ihr *npm start* ausführen.

## Aufgaben (Server)

### Implementiert DbRepository.ts

Die Klasse *DbRepository* ist nicht vollständig implementiert.
Allerdings wurden die Tests bereits angelegt.

*AUFGABE*: Führt *npm test:watch* im Server aus und implementiert DbRepository.

### Bonus Aufgabe

Aktuell kann sich jeder User ALLE Todos holen (auch die von anderen Usern).

Untersucht *app.controller.ts* und überlegt, wie ihr den Server absichern könnt, so dass jeder User nur seine eigenen Todos sieht.

## Aufgaben (Web)

Es ist Euch überlassen, ob ihr Euch mehr auf Design oder Funktionalität (oder beides) fokussieren wollt.

### Styling Registrierung / Authentifizierung

Die Registrierung und Authentifizierung ist generell implementiert, allerdings nur funktional.
Implementiert ein besseres Design / Styling, damit es für Benutzer attraktiver ist.

### Implementiert Todos

Für eine Verwaltung von Todos ist es wichtig, dass wir sie ansehen können, editieren können, hinzufügen und löschen können.

Hierfür ist folgendes nötig:
- Design des Frontends
- Implementierung des Frontends
- State Management

### Bonus Aufgaben

#### Weitere Webinhalte

Eine typische Webapplikation enthält noch weitere Inhalte (Faq, Hilfen, Support, Kontakt, etc.).

Wie könnte eine Navigationsstruktur in einer richtigen Anwendung aussehen?

#### Todos anderen Benutzern zuordnen

Die Datentruktur erlaubt es, dass Todos auch für andere User angelegt werden können. Wie könnte hierfür eine UI aussehen?

#### Zeitstempel für Todos

Aktuell wird nicht erfasst, WANN ein Todo hinzugefügt oder erledigt wurde. Wie könnte das implementiert werden?

#### Zieldatum für Todo

Viele Todos haben ein Zieldatum, bis wann sie erledigt werden sollten. Wie ließe sich das in Datenstruktur und UI implementieren?


## Cheat sheets / Hilfestellungen

https://htmlcheatsheet.com/

https://htmlcheatsheet.com/css/

https://devhints.io/react

https://devhints.io/react-router

https://reacttraining.com/react-router/web/guides/quick-start

https://reactstrap.github.io/components/alerts/

