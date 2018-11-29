# Dot Environment Sync
Check different of 2 dotenv file and sync it 

## Install

`npm install --save env-sync.js`

Usage: 

#### CLI
```bash
./node_modules/.bin/env-sync.js
```

#### DOCKER

```bash
docker run --rm -v $(pwd):$(pwd) kenylieou/env-sync /path/to/.env /path/to/.env.sample
```

This is in .env.default

```bash
VAR1=1
VAR2=true
VAR3=false
VAR4=0
VAR5="hello world"

```


This is in .env
```bash
VAR1=
VAR2=1
VAR3=false
```

After run env-sync
```bash
VAR1=1
VAR2=1
VAR3=false
VAR4=0
VAR5="hello world"
```

