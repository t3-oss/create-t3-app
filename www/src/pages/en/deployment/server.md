---
title: Server
description: Deployment to Server
layout: ../../../layouts/docs.astro
lang: en
---

You can deploy to physical server or a virtual server(VPS) using services like aws(Amazon web services), gcp(Google cloud provider), droplets(digital ocean), basically this should work on all linux based servers.

## Requirements

Would assume you have setup your server already and ready to deploy your project, so we will skip all the initial server setup process. You also need to install Nginx, thats what we would be using.

### keys

- `domain.com` (this represent your actual domain example: google.com)

## Deploy a single project

### 1. Configuring nginx

```bash
sudo nano /etc/nginx/sites-available/domain.com
```

paste in the following:

```diff
server {
        server_name domain.com;

        gzip on;
        gzip_proxied any;
        gzip_types application/javascript application/x-javascript text/css text/javascript;
        gzip_comp_level 5;
        gzip_buffers 16 8k;
        gzip_min_length 256;

        location /_next/static/ {
                alias /var/www/domain/domain.com/.next/static/;
                expires 365d;
                access_log off;
        }

        location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

> **_Notes_**
>
> - _`/var/www/domain/domain.com` is the path to root folder where your code is located_
> - _`http://127.0.0.1:3000` is your host address you get after running `npm run start`_

<br />

Now lets link `/etc/nginx/sites-available/domain.com` with `/etc/nginx/sites-enabled/domain.com` so that when we make changes to `/etc/nginx/sites-available/domain.com` it automatically sync with `/etc/nginx/sites-enabled/domain.com`.

```bash
sudo ln -s /etc/nginx/sites-available/domain.com /etc/nginx/sites-enabled/domain.com
```

Restart Nginx server

```bash
sudo systemctl restart nginx
```

### 2. Configuring our project

- Install node
- `npm install` (to install your project dependency)
- `npm run build` (to build a production bundle)
- `npm run start` (to start the production build)
- you can also use pm2, byobu, tmux to keep you session active always

## Deploy multiple projects

Deploying multiple projects on same server is also very straight forward, we just need to modify our ports in which we serve our project from on the server

### 1. Configuring nginx

```bash
sudo nano /etc/nginx/sites-available/domain2.com
```

paste in the following:

```diff
server {
        server_name domain2.com;

        gzip on;
        gzip_proxied any;
        gzip_types application/javascript application/x-javascript text/css text/javascript;
        gzip_comp_level 5;
        gzip_buffers 16 8k;
        gzip_min_length 256;

        location /_next/static/ {
                alias /var/www/domain/domain2.com/.next/static/;
                expires 365d;
                access_log off;
        }

        location / {
                proxy_pass http://127.0.0.1:3002;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

> **_Notes_**
>
> - _`/var/www/domain2/domain2.com` is the path to root folder where your code is located_
> - _`http://127.0.0.1:3002` is your host address you get after running `npm run start`_.
> - _port `3002` in `proxy_pass` above is the port we get after running `npm run start` but because we have our previous project running, a new port will be assigned to us for use, but the port to be assigned can be configured by you [here](http://localhost:3000/en/deployment/server#2-configuring-our-project-1)._

<br />

Now lets link `/etc/nginx/sites-available/domain2.com` with `/etc/nginx/sites-enabled/domain2.com` so that when we make changes to `/etc/nginx/sites-available/domain2.com` it automatically sync with `/etc/nginx/sites-enabled/domain2.com`.

```bash
sudo ln -s /etc/nginx/sites-available/domain2.com /etc/nginx/sites-enabled/domain2.com
```

Restart Nginx server

```bash
sudo systemctl restart nginx
```

### 2. Configuring our project

modify our package.json to give us a specific port.

```bash
nano package.json
```

in our case we want port `3002` so we will add `-p 3002` in our start script in our package.json

```diff
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "postinstall": "prisma generate",
    "lint": "next lint",
-   "start": "next start"
+   "start": "next start -p 3002",
  },
```

Then do this

- `npm install` (to install your project dependency)
- `npm run build` (to build a production bundle)
- `npm run start` (to start the production build)
- you can also use pm2, byobu, tmux to keep you session active always
