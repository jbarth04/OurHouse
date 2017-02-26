-- Table: "OurHouse"."Houses"

-- DROP TABLE "OurHouse"."Houses";

CREATE TABLE "OurHouse"."Houses"
(
    "Id" integer NOT NULL DEFAULT nextval('"OurHouse"."Houses_Id_seq"'::regclass),
    "LandlordId" integer NOT NULL,
    "Address1" character varying(120) COLLATE pg_catalog."default" NOT NULL,
    "Address2" character varying(120) COLLATE pg_catalog."default",
    "City" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "State" character(2) COLLATE pg_catalog."default" NOT NULL,
    "Zipcode" character(5) COLLATE pg_catalog."default" NOT NULL,
    "Rooms" integer NOT NULL,
    "ParkingSpots" integer NOT NULL DEFAULT 0,
    "MonthlyRent" integer NOT NULL,
    "UtilitiesIncluded" boolean NOT NULL,
    "Laundry" boolean NOT NULL,
    "Pets" boolean NOT NULL,
    CONSTRAINT "Houses_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "fk_Houses_Landlords_LandlordId" FOREIGN KEY ("LandlordId")
        REFERENCES "OurHouse"."Landlords" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

--ALTER TABLE "OurHouse"."Houses"
    --OWNER to "Josie";

-- Index: fki_fk_Houses_Landlords_LandlordId

-- DROP INDEX "OurHouse"."fki_fk_Houses_Landlords_LandlordId";

CREATE INDEX "fki_fk_Houses_Landlords_LandlordId"
    ON "OurHouse"."Houses" USING btree
    (LandlordId)
    TABLESPACE pg_default;