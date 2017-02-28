-- Table: "OurHouse"."Students"

-- DROP TABLE "OurHouse"."Students";

CREATE TABLE "OurHouse"."Students"
(
    "Id" integer NOT NULL DEFAULT nextval('"OurHouse"."Students_Id_seq"'::regclass),
    "FirstName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "LastName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(62) COLLATE pg_catalog."default" NOT NULL,
    "Phone" character(10) COLLATE pg_catalog."default" NOT NULL,
    "IsActive" boolean NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Students_pkey" PRIMARY KEY ("Id")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

--ALTER TABLE "OurHouse"."Students"
    --OWNER to "Josie";