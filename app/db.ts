import { drizzle } from 'drizzle-orm/mysql2';
import { eq, sql } from 'drizzle-orm';
import mysql from "mysql2/promise";
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

import { users } from 'drizzle/schema';
// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "test"
})

export let db = drizzle(connection);

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash });
}
