#!/bin/sh
set -eu

# Railway monta el volumen persistente en RAILWAY_VOLUME_MOUNT_PATH.
# En local, se usa db.json de la carpeta api.
DATA_DIR="${RAILWAY_VOLUME_MOUNT_PATH:-.}"
DB_PATH="$DATA_DIR/db.json"

mkdir -p "$DATA_DIR"

# Copia los datos de prueba al volumen solo la primera vez.
if [ ! -f "$DB_PATH" ]; then
    cp db.json "$DB_PATH"
fi

exec npx json-server "$DB_PATH" --host 0.0.0.0 --port "${PORT:-3000}"
