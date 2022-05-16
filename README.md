# Greenmind

https://www.bluecity.dk + https://greenmind.dk

## How to start?

Tip - Add to your /etc/hosts
127.0.0.1       vue-dev.greenmind.space.local

```sh
1. git clone https://git.odoogap.com/customer-projects/greenmind 
2. yarn install
3. yarn build # (required) GreenMind project need build to fetch dinamic routes from ODOO
4. yarn dev
5. You can access with http://vue-dev.greenmind.space.local:3000
```

## Env vars used
NODE_ENV - for enviroments 
NODE_LOCALE - for translations
COOKIEBOT_KEY - key for cookiebot
BACKEND_BASE_URL or PUBLIC_PATH or BASE_URL - for api
SITE_URL - for sitemap host url
