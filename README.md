## Getting Started

### Prerequisites

1. Install [Node.js (version 16.15.X)](https://nodejs.org/download/)
2. Install [Postgresql (version 14)](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

### Initial Local Setup

#### 1. Clone git repository

Open your terminal and clone this repository into a directory of your choice.
```
cd <path to directory of choice>
git clone https://github.com/myc37/fdps.git
```

#### 2. Install dependencies

Ensure that you have installed and are using version **16.15.X** of Node.js. 
If you have a different version of Node.js installed, you can make use of nvm for [Windows](https://github.com/coreybutler/nvm-windows) or [macOS/unix/WSL](https://github.com/nvm-sh/nvm) to change it.
```
cd fdps
npm install
```

#### 3. Set up .env File

You can rename the `.env.example` file in the repository to `.env` and add the API Token sent via email.

#### 4. Seed database

The local database will need to be set up and seed.
```
npx prisma migrate dev
npx prisma db seed
```
The seeding of the database will **take a few minutes**, please be patient as this frontloaded caching greatly improves the performance.

#### 5. Host the web application locally

Finally, run the application.
```
npm run build
npm run preview
```
You will then be able to access the application at `localhost:4173` (by default). 

## Additional Information

- You can view the contents of the database via the command `npx prisma studio`
- The validity of the API token is **only 3 days**, so please contact me via email if it expires during testing.

## Assumptions

1. No new traffic cameras are added
    - This assumption allows me to seed the street names of all traffic camera locations. If new traffic cameras were to be added, I would simply just have to reset the database and re-run the seeding script.

2. Area metadata of weather api does not change
    - Same reason as above, except it allows me to seed area string of a location instead of street name. 
