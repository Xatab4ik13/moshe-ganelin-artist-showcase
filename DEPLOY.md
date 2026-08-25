# Деплой на VPS (Ubuntu, Timeweb)

Домен: moshearielganelin.com -> A 147.45.246.249 (уже настроено).
Сборка сайта — Node-сервер (SSR), статика и медиа лежат в `.output/public`.

## 1. Подготовка сервера

```bash
apt update && apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm i -g pnpm
```

## 2. Код и сборка

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/Xatab4ik13/moshe-ganelin-artist-showcase.git moshe
cd moshe
npm install
npm run build        # соберётся в .output (preset node-server)
```

Проверка: `PORT=3000 node .output/server/index.mjs`, затем `curl -I localhost:3000`.

## 3. systemd

`/etc/systemd/system/moshe.service`:

```ini
[Unit]
Description=Moshe Ganelin site
After=network.target

[Service]
WorkingDirectory=/var/www/moshe
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOST=127.0.0.1
ExecStart=/usr/bin/node /var/www/moshe/.output/server/index.mjs
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload && systemctl enable --now moshe && systemctl status moshe
```

## 4. Nginx

`/etc/nginx/sites-available/moshe`:

```nginx
server {
    listen 80;
    server_name moshearielganelin.com www.moshearielganelin.com;

    client_max_body_size 20m;

    location /media/ {
        alias /var/www/moshe/.output/public/media/;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        access_log off;
    }

    location /assets/ {
        alias /var/www/moshe/.output/public/assets/;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/moshe /etc/nginx/sites-enabled/moshe
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

## 5. HTTPS

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d moshearielganelin.com -d www.moshearielganelin.com
```

В Timeweb DNS дополнительно добавить запись: `A  www  147.45.246.249` (иначе www не откроется).

## 6. Обновление сайта

```bash
cd /var/www/moshe && git pull && npm install && npm run build && systemctl restart moshe
```

## Медиа

Все видео и фото лежат в репозитории в `public/media/` и попадают в сборку — внешние CDN не нужны.
