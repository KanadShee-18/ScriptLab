# ScriptLab Backend:

- A medium-like platform where user can signup, login basically can authenticate him to get amazing features to add his content to see other users content and can modify or delete his content. All the features has been added.

## For HONO, make a wrangler.toml file which will look like this:

```toml
name = "backend"
main = "src/index.ts"
compatibility_date = "2024-11-23"
# nodejs_compat = true


compatibility_flags = [ "nodejs_compat" ]

[vars]
DATABASE_URL="your_db_url(prisma generated pooling accelerate db link)"

JWT_SECRET="your_secret"
```

## Set Up Process:

1. Make a directory (name as per yours)

```
mkdir scriptlab
```

2. Change Directory Inside It

```
cd scriptlab
```

- Target Directory: **backend**
- Which template do you want to use? - **cloudflare-workers**
- Do you want to install project dependencies?...**yes**
- Which package do you want to use? > npm

3. Initialize your routes and structure your project as your need.

4. **Initialize DB:**

- get your postgress(in this project have been used) url
- get connection pool URL from prisma accelerate
- In **.env** file add:
  ```
  DATABASE_URL="postgresql://..."
  ```
- In **wrangler.toml** file add:

  ```
  name = "backend"
  main = "src/index.ts"
  compatibility_date = "2024-11-23"
  # nodejs_compat = true


  compatibility_flags = [ "nodejs_compat" ]

  [vars]
  DATABASE_URL="your_db_url(prisma generated pooling accelerate db link)"

  JWT_SECRET="your_secret"
  ```

5. Initialize **prisma** in project:

```
npm i prisma
npx prisma init
```

6. Set Up Done!

7. Just create schema in **schema.prisma** and write all controllers.

