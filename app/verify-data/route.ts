import { db } from '@vercel/postgres';

const client = await db.connect();

export async function GET() {
    try {
      await client.sql`BEGIN`;
    //   const data = await client.sql`SELECT * FROM users`;
      const data = await client.sql`SELECT * FROM customers `;
      data.rows.forEach(row => console.log(row));
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'success' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }