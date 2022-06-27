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
INVALIDATION_KEY - token to refresh aplication (default 0ead60c3-d118-40be-9519-d531462ddc60)
BASE_URL - for api
KLAVIYO_KEY - key for klaviyo (default NzYWAu)
GTAG_KEY - key for google tags (default G-YYZ9TG2MS2)
GTM_KEY - key for google tag manager (default GTM-K9V7Q37)
CLERK_PUBLIC_KEY - key for clerk io
BACKEND_BASE_URL - for api through local network
PUBLIC_PATH - for CDN url
SITE_URL - for sitemap host url
BASE_DOMAIN - to build routes, redirects (sended in request-host to enable multi language)
PORT - node port
HOST - netork interface

## Env vars set for dev build
export CLERK_PUBLIC_KEY=CEhYajX1WwY3uAClBKte5UC6qAC6d7W1
export COOKIEBOT_KEY=d2da6edf-44b1-4063-a6ef-fe4f37edeb0c
export GTAG_KEY=G-YYZ9TG2MS2
export GTM_KEY=GTM-K9V7Q37
export KLAVIYO_KEY=NzYWAu
export NODE_LOCALE=en-EN
export PUBLIC_PATH=https://rune.greenmind.systems/
export SITE_URL=http://localhost:3000
export INVALIDATION_KEY=0ead60c3-d118-40be-9519-d531462ddc60
export SITEMAP_CACHE=6000
export BACKEND_BASE_URL=https://rune.greenmind.systems/
export BASE_DOMAIN=vue-dev.greenmind.space
