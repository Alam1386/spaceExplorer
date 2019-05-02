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
  /* TODO: add more migrations */
};