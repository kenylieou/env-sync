# Dot Environment Sync
Check different of 2 dotenv files and sync it 

## Install

`npm install --save env-sync`

Usage: 

#### CLI
```bash
./node_modules/.bin/env-sync.js .env .env.default
```

#### DOCKER

```bash
docker run --rm -v $(pwd):$(pwd) kenylieou/env-sync /path/to/.env /path/to/.env.sample
```

example:

```bash
docker run --rm -v $(pwd):$(pwd) kenylieou/env-sync $(pwd)/.env $(pwd)/.env.default -v
```

#### CLI Options

```
Usage: env-sync [options] <file1> <file2>

file1: is the file need to check
file2: is the file use to compare

Options:
  -V, --version  output the version number
  -s, --sync     Sync the missing environment key and write to file1
  -v, --verbose  Display verbose
  -h, --help     output usage information

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

