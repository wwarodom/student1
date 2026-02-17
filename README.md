# Student App

A Next.js application with Prisma ORM and PostgreSQL.

## Prerequisites

- [Docker](https://www.docker.com/) installed and running
- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/)

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL container (`db`) on `localhost:5432` with:

| Setting  | Value      |
| -------- | ---------- |
| User     | `postgres` |
| Password | `postgres` |
| Database | `student`  |

### 3. Run database migrations

```bash
npx prisma migrate dev
```

### 4. Seed 10 sample students

```bash
pnpm seed
```

This inserts the following students into the database:

| Name           | Email               |
| -------------- | ------------------- |
| Alice Johnson  | alice@example.com   |
| Bob Smith      | bob@example.com     |
| Charlie Brown  | charlie@example.com |
| Diana Prince   | diana@example.com   |
| Edward Norton  | edward@example.com  |
| Fiona Green    | fiona@example.com   |
| George Wilson  | george@example.com  |
| Hannah Lee     | hannah@example.com  |
| Ivan Petrov    | ivan@example.com    |
| Julia Chen     | julia@example.com   |

The seed script uses `upsert`, so it is safe to run multiple times without creating duplicates.

### 5. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful Commands

| Command                    | Description                    |
| -------------------------- | ------------------------------ |
| `docker compose up -d`     | Start PostgreSQL               |
| `docker compose down`      | Stop PostgreSQL                |
| `npx prisma migrate dev`   | Run migrations                 |
| `npx prisma studio`        | Open Prisma Studio (DB viewer) |
| `pnpm seed`                | Seed 10 sample students        |
| `pnpm dev`                 | Start Next.js dev server       |
