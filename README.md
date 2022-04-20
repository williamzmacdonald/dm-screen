# dm-screen
This is a project I'm using to learn Next.js, Prisma, Postgresql, Vercel, GCP, and Tailwind CSS. The goal is to create an interactive dungeon master screen used for running Dungeons and Dragons or any other tabletop RPG

## Local Installation instructions
1. Clone repo
2. run `npm install`
3. Install [postgresql](https://www.postgresql.org/download/) locally and open psql to initialize your database
4. Defing the following environmental variables
    1. NODE_ENV="development"
    2. DATABASE_URL="postgresql://myusername:mypassword@localhost:5432/mydbname" replace each my... with the relevant postgresql value 
    3. Go to [github settings](https://github.com/settings/developers) and add an oauth app to grab the following two values
    4. GITHUB_ID="githubidhere" 
    5. GITHUB_SECRET="githubidhere" 
    6. AUTH_SECRET="random16characterstringhere"
5. Run `prisma migrate dev --name init` to initialize your tables with the prisma schema
6. Run `npm run dev`
