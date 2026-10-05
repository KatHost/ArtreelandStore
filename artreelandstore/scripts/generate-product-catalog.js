import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import products from "../src/data/product.js";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const catalogPath = resolve(
    scriptDirectory,
    "../public/data/catalog.json"
);
const seedPath = resolve(
    scriptDirectory,
    "../public/data/catalog-seed.sql"
);

const catalog = products.map(({ id, name, price, size, stock }) => ({
    id,
    name,
    price,
    size,
    stock,
}));

mkdirSync(dirname(catalogPath), { recursive: true });
writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

const sqlValues = catalog.map((product) => {
    const name = product.name.replaceAll("'", "''");
    const price = Number(product.price).toFixed(2);
    return `(${Number(product.id)}, '${name}', ${price}, ${Number(product.stock)})`;
});

const seedSql = [
    "INSERT INTO artreeland_inventory (product_id, product_name, price, stock)",
    `VALUES\n${sqlValues.join(",\n")}`,
    "ON DUPLICATE KEY UPDATE",
    "    product_name = VALUES(product_name),",
    "    price = VALUES(price);",
    "",
].join("\n");

writeFileSync(seedPath, seedSql);
