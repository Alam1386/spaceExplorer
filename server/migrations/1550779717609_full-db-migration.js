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
    CREATE TABLE "space"."booklaunch" (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT,
      "flight_no" INT,
      FOREIGN KEY (user_id) REFERENCES space.users (user_id)
    );
  `)
};