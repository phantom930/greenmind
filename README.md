# Greenmind

Hos GreenMind finder du secondhand elektronik med 3 års garanti. Køb brugt elektronik til fordelagtige priser og gør en forskel for miljøet.

## How to start?

Tip - Add to your /etc/hosts
127.0.0.1       vue-dev.greenmind.space.local

```sh
1. git clone https://git.odoogap.com/customer-projects/greenmind
2. yarn install
3. yarn build # (required) GreenMind project need build to fetch dinamic routes from ODOO
4. yarn dev
5. You can access with http://vue-dev.greenmind.space.local:3000
6. Or yarn dev-default 
```

## Env vars used

NODE_ENV - for enviroments
NODE_LOCALE - for translations
COOKIEBOT_KEY - key for cookiebot (default d2da6edf-44b1-4063-a6ef-fe4f37edeb0c)
REBUILD_TOKEN - token to refresh aplication (default green-123)
BASE_URL - for api
GTAG_KEY - key for google tags
GTM_KEY - key for google tag manager
BACKEND_BASE_URL - for api through local network
PUBLIC_PATH - for CDN url
SITE_URL - for sitemap host url
PORT - node port
HOST - netork interface
