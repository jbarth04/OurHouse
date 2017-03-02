-- Table: "OurHouse"."Landlords"

-- DROP TABLE "OurHouse"."Landlords";

CREATE TABLE "OurHouse"."Landlords"
(
    "Id" integer NOT NULL DEFAULT nextval('"OurHouse"."Landlords_Id_seq"'::regclass),
    "FirstName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "LastName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(62) COLLATE pg_catalog."default" NOT NULL,
    "Phone" character(10) COLLATE pg_catalog."default" NOT NULL,
    "IsActive" boolean NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Landlords_pkey" PRIMARY KEY ("Id")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

--ALTER TABLE "OurHouse"."Landlords"
    --OWNER to "Josie";