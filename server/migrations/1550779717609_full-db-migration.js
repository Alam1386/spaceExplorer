exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "space"."users" (
      "user_id" SERIAL PRIMARY KEY,
      "first_name" TEXT,
      "last_name"  TEXT,
      "email" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      "country" TEXT,
      "age"   INT,
      "gender" TEXT
    );
  `)
  pgm.sql(`
    CREATE TABLE "space"."bookLaunch" (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT,
      "flight_no" INT,
      "flight_name" TEXT,
      "passenger_name" TEXT,
      "price" NUMERIC(10,2),
      "departure_date" DATE,
      "destination" TEXT,
      FOREIGN KEY (user_id) REFERENCES space.users (user_id)
    );
  `)
};