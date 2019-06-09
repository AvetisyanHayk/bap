![Custom badge](https://img.shields.io/badge/Required-Docker-blue.svg) ![Custom badge](https://img.shields.io/badge/Required-npm%20v6.9.0-cc0000.svg)

---

### Back-End
![Custom badge](https://img.shields.io/badge/Node.JS-v10.14.1-00aa00.svg)  ![Custom badge](https://img.shields.io/badge/ECMAScript-5.1-orange.svg)

### Front-End
![Custom badge](https://img.shields.io/badge/JavaScript-2.0-orange.svg) ![Custom badge](https://img.shields.io/badge/HTML-5-orange.svg) ![Custom badge](https://img.shields.io/badge/CSS-3-ff0000.svg)

------

# Table of Contents

> [1 Project CSRF](#1-project-csrf)

> > [1.1 Scenario 1 - CSRF Exploit](#11-scenario-1---csrf-exploit)

> > [1.2 Scenario 2 - CSRF Mitigatie](#12-scenario-2---csrf-mitigatie)

> [2 Project OAuth-JWT](#2-project-oauth-jwt)

> > [2.1 Scenario 3 - Tokens opslaan in localStorage](#21-scenario-3---tokens-opslaan-in-localstorage)

------

![Custom badge](https://img.shields.io/badge/Trusted%20Server%20Web%20Application-http%3A%2F%2Flocalhost%3A8081-crimson.svg) ![Custom badge](https://img.shields.io/badge/CSRF%20Exploit-http%3A%2F%2Flocalhost%3A8082-crimson.svg)

# 1 Project CSRF

## 1.1 Scenario 1 - CSRF-Exploit

### Stap 1: Docker-containers starten 

```bash
$ git checkout csrf-1/csrf-vulnerability-example
$ cd csrf/docker
```
- **Linux**: `path/to/docker $ ./up.sh`
- **Windows**: `path/to/docker> up.bat`

### Stap 2: De CSRF-Aanval

1. Surf naar [http://localhost:8081](http://localhost:8081)
2. Kies een gebruiker en meld je aan
3. (Optioneel) Klik op de knop `Wijzigen` en wijzig het e-mailadres
4. Surf naar [http://localhost:8082](http://localhost:8082)
5. Volg de instructies voor een CSRF-aanval
6. Ververs de webapplicatie op de _Trusted Server_: het e-mailadres moet `forged@bybadguy.example.com` worden. **De CSRF-aanval is gelukt!**

### Stap 3: Docker-containers stoppen

- **Linux**: `path/to/docker $ ./down.sh`
- **Windows**: `path/to/docker> down.bat`

## 1.2 Scenario 2 - CSRF-Mitigatie

![Custom badge](https://img.shields.io/badge/Security-CSRF-purple.svg)

```bash
$ git checkout csrf-1/csrf-token-example
$ cd csrf/docker
```
Dezelfde stappen herhalen zoals bij [1.1 Scenario 1 - CSRF-Exploit](#11-scenario-1---csrf-exploit).
De CSRF-aanval mislukt.

# 2 Project oAuth-JWT

![Custom badge](https://img.shields.io/badge/Web%20Application-http%3A%2F%2Flocalhost%3A8083-crimson.svg) ![Custom badge](https://img.shields.io/badge/Web%20API-http%3A%2F%2Flocalhost%3A8083%2Fapi-crimson.svg) ![Custom badge](https://img.shields.io/badge/Token%20Endpoint-http%3A%2F%2Flocalhost%3A8083%2Fauth-crimson.svg)

## 2.1 Scenario 3 - Tokens opslaan in localStorage

![Custom badge](https://img.shields.io/badge/Security-oAuth%202-purple.svg) ![Custom badge](https://img.shields.io/badge/Security-JWS-purple.svg)

### Stap 1: Node.js server starten 

```bash
$ git checkout oauth-1/oauth-ropc-initial
$ cd oauth/webapp
$ node app
```

### Stap 2: Toegangstoken aanvragen

1. Surf naar [http://localhost:8083](http://localhost:8083), klik op `localStorage weergeven`: het zal leeg zijn.
2. Meldt u aan. U wordt omgeleid naar de homepagina.
3. Klik vervolgens opnieuw op `localStorage weergeven`: een toegangstoken (JWT) wordt weergegeven, uitgegeven door het Token Endpoint (**Resource Owner Password Credentials Grant Type**).
4. Wijzig het e-mailadres. Het zal succesvol gewijzigd worden.
