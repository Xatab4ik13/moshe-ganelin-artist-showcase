import { Pool } from "pg";

let pool: Pool | null = null;

export function isDbConfigured(): boolean {
  return Boolean(process.env["DATABASE_URL"]);
}

function getPool(): Pool {
  const url = process.env["DATABASE_URL"];
  if (!url) {
    throw new Error("DATABASE_URL не задан: база данных не подключена.");
  }
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      max: 5,
      connectionTimeoutMillis: 10_000,
      query_timeout: 15_000,
    });
  }
  return pool;
}

export async function dbQuery<T extends Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await getPool().query(text, params as never[]);
  return result.rows as T[];
}
