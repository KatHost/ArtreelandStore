# ARTRƎELAND Storefront

The storefront is built with React and Vite. From the repository root, run
`npm --prefix artreelandstore ci`, `npm --prefix artreelandstore run dev`, and
`npm --prefix artreelandstore run lint`. Alternatively, change into this
directory first and run the commands without the `--prefix` option.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
Place the following font files into this directory (WOFF2 preferred) to enable the premium typography:

- GT-America-Display-Regular.woff2
- GT-America-Display-Bold.woff2

If you cannot provide GT America, use a high-quality alternative:
- MaisonNeue or Inter Display (WOFF2).

After uploading, clear the browser cache / hard reload to ensure new fonts load.

## HostAfrica cPanel deployment and PayFast setup

The PHP checkout requires PHP 8.1+, PDO MySQL, cURL, Apache `mod_rewrite`, and a
MySQL database. Confirm those are available for your hosting plan in cPanel.

1. From this directory, run `npm ci` and `npm run build`. The build exports the
   product prices and starting stock values to `dist/data/catalog.json` and a
   one-time inventory seed file.
2. In cPanel, create a MySQL database and user, import `server/schema.sql`,
   then import `dist/data/catalog-seed.sql` using phpMyAdmin.
3. Copy `dist/api/config.example.php` to `dist/api/config.local.php`. Fill in
   the database details, PayFast merchant ID/key/passphrase, and the HTTPS
   site URL. Start with PayFast sandbox mode. Never commit `config.local.php`
   or share merchant credentials in chat.
4. In cPanel Domains, make sure `artreeland.co.za` uses the correct document
   root and remove any old domain-forwarding redirect. Point DNS to the exact
   HostAfrica hosting values, then enable SSL/AutoSSL for the domain.
5. In File Manager, upload the **contents** of `dist` to that document root,
   including `.htaccess`, the `api` directory, and the `data` directory. Do not
   upload `node_modules` or the source folder.
6. Complete a sandbox order and confirm the PayFast ITN endpoint is reachable
   at `https://artreeland.co.za/api/payfast-itn.php`. Switch the PHP config to
   live mode only after the sandbox flow and live merchant credentials are
   verified.

For local checkout development, start PHP's built-in server with
`php -S 127.0.0.1:8000 -t public`, configure `public/api/config.local.php`,
then run `npm run dev`; Vite proxies `/api` to that PHP server. A public HTTPS
deployment is required for PayFast to send its ITN payment notification;
localhost alone cannot complete the end-to-end payment confirmation. Orders
and inventory are held in MySQL. Paid orders must be fulfilled from the
`artreeland_orders` table; back up and protect that database because it stores
customer delivery details.

The included Apache rewrite lets React Router serve direct product and shop
URLs. PayFast signatures are generated on the server, and payment completion
is only recorded after the signed notification passes PayFast's server-side
validation. See the
[PayFast Developer Docs](https://developers.payfast.co.za/docs#quickstart)
for merchant setup. Never put PayFast secrets in frontend code or commit them
to Git.

## GitHub Pages deployment

Push to `main` or `master` to build the static storefront and publish it to the
`gh-pages` branch. After the first successful **Deploy GitHub Pages** workflow,
open the repository's **Settings → Pages** and set the source to **Deploy from
a branch**, select `gh-pages` and `/(root)`, then save. The project-site URL is
`https://kathost.github.io/ArtreelandStore/`.

GitHub Pages cannot run the PHP/MySQL checkout. The Pages build therefore
disables online checkout and excludes the PHP API, Apache rules, and SQL seed
from the published files. For real PayFast payments, deploy the full `dist`
directory to the PHP-enabled HostAfrica hosting described above.