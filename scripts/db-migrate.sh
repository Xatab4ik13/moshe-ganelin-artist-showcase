#!/usr/bin/env bash
# Applies all SQL migrations (they are safe to re-run).
set -e
if [ -z "$DATABASE_URL" ]; then
  for f in /etc/systemd/system/moshe.service.d/*.conf /etc/systemd/system/moshe.service; do
    [ -f "$f" ] || continue
    line=$(grep -h 'DATABASE_URL=' "$f" | tail -n1 || true)
    if [ -n "$line" ]; then
      DATABASE_URL=$(echo "$line" | sed -E 's/.*DATABASE_URL=//; s/^"//; s/"$//')
    fi
  done
fi
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL не найден (ни в окружении, ни в /etc/systemd/system/moshe.service.d/)." >&2
  exit 1
fi
for m in db/migrations/*.sql; do
  echo "-> $m"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$m"
done
echo "Миграции применены."
