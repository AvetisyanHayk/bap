### Required
![Custom badge](https://img.shields.io/badge/Required-Docker-blue.svg) ![Custom badge](https://img.shields.io/badge/Required-npm%20v6.9.0-cc0000.svg)

---

### Back-End
![Custom badge](https://img.shields.io/badge/Node.JS-v10.14.1-00aa00.svg)  ![Custom badge](https://img.shields.io/badge/ECMAScript-5.1-orange.svg)

### Front-End
![Custom badge](https://img.shields.io/badge/JavaScript-2.0-orange.svg) ![Custom badge](https://img.shields.io/badge/HTML-5-orange.svg) ![Custom badge](https://img.shields.io/badge/CSS-3-ff0000.svg)

------

# Table of Contents

> [1 Branches](#1-branches)
>
> > [1.1 Branch CSRF](#11-branch-csrf)

> > > [1.1.1 Scenario 1 - CSRF Exploit](#111-scenario-1---csrf-exploit)

------

# 1 Branches

## 1.1 Branch CSRF

![Custom badge](https://img.shields.io/badge/Trusted%20Server%20Web%20Application-http%3A%2F%2Flocalhost%3A8081-crimson.svg) ![Custom badge](https://img.shields.io/badge/CSRF%20Exploit-http%3A%2F%2Flocalhost%3A8082-crimson.svg)

 ![Custom badge](https://img.shields.io/badge/Security-CSRF-purple.svg)

```bash
$ git clone https://github.com/AvetisyanHayk/bap.git
```

### 1.1.1 Scenario 1 - CSRF Exploit

#### Stap 1: Docker-containers starten 

```bash
$ git checkout csrf-1/csrf-vulnerability-example
$ cd csrf/docker
```
- **Linux**: `path/to/docker $ ./up.sh`
- **Windows**: `path/to/docker> up.bat`

#### Stap 2: De CSRF-Aanval

1. Surf naar [http://localhost:8081](http://localhost:8081)
2. Kies een gebruiker en meld je aan
3. (Optioneel) Klik op de knop `Wijzigen` en wijzig het e-mailadres
4. Surf naar [http://localhost:8082](http://localhost:8082)
5. Volg de instructies voor een CSRF-aanval
6. Ververs de webapplicatie op de _Trusted Server_: het e-mailadres moet `forged@bybadguy.example.com` worden. **De CSRF-aanval is gelukt!**

#### Stap 3: Docker-containers stoppen

- **Linux**: `path/to/docker $ ./down.sh`
- **Windows**: `path/to/docker> down.bat`
