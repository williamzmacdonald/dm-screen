# dm-screen
This is a project I'm using to learn Next.js, Prisma, Postgresql, Vercel, GCP, and Tailwind CSS. The goal is to create an interactive dungeon master screen used for running Dungeons and Dragons or any other tabletop RPG

## Local Installation instructions
1. Clone repo
2. run `npm install`
3. Install [postgresql](https://www.postgresql.org/download/) locally and open psql to initialize your database
4. Go to [github settings](https://github.com/settings/developers) and add an oauth app with:
    1. http://localhost:3000 as your homepage url
    2. http://localhost:3000/api/auth/callback/github as your authorization callback url
    3. Grab your ID and secret key for later
5. Defing the following environmental variables
    1. NODE_ENV="development"
    2. DATABASE_URL="postgresql://myusername:mypassword@localhost:5432/mydbname" replace each my... with the relevant postgresql value 
    3. GITHUB_ID="githubidhere" 
    4. GITHUB_SECRET="githubidhere" 
    5. AUTH_SECRET="random16characterstringhere"
6. Run `prisma migrate dev --name init` to initialize your tables with the prisma schema
7. Run `npm run dev`
