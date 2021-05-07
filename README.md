# TXTWerk - Benchmark

Bestehend aus einer Server- und einer Client-Komponente

---

## Intention

Analyse(n) von:

- Client
  - Responsezeiten
- Server (TXTWerk-Stack)
  - Ressourcen des hosts
  - Ressourcen der docker container






## Features

- docker images/container
- Client
  - dashboard (Grafana)
  - für verschiedene Projekte/Szenarien/Services mittels env vars
  - Variante 1
    - Docker-Test-Image (beinhaltet den K6 Test für TXTWerk)
  - Variante 2
    - K6 Image (original) + gemountetes dir um externe Test(files) auszuführen
- Server
  - 2x dashboard (Grafana; host system + docker container)
  - optional: alertmanager
  - optional: pushgateway  

  

## Install

**Requirements:** docker + docker-compose

**Hinweis:** Es ist nicht vorgesehen, dass beide Komponenten auf ein und dem selben Host läuft !!!

```bash
$ git clone ssh://git@stash.neofonie.de:7999/txt/txt-bench.git && cd txt-bench
```

  

### Server

```bash
$ cd server && docker-compose up -d
```

Webbrowser:

```
http://<HOSTNAME>:3000
```

  

### Client

```bash
$ cd client && docker-compose up -d
```

Webbrowser:

```
http://<HOSTNAME>:3000
```

  

## Usage

Siehe Verzeichnis [Server](server) bzw. [Client](client) ...
