-- Table: "OurHouse"."Reviews"

-- DROP TABLE "OurHouse"."Reviews";

CREATE TABLE "OurHouse"."Reviews"
(
    "Id" integer NOT NULL DEFAULT nextval('"OurHouse"."Reviews_Id_seq"'::regclass),
    "HouseId" integer NOT NULL,
    "StudentId" integer NOT NULL,
    "Stars" "char" NOT NULL,
    "Comment" character varying(2048) COLLATE pg_catalog."default",
    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "fk_Reviews_Houses_HouseId" FOREIGN KEY ("HouseId")
        REFERENCES "OurHouse"."Houses" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_Reviews_Students_StudentId" FOREIGN KEY ("StudentId")
        REFERENCES "OurHouse"."Students" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

--ALTER TABLE "OurHouse"."Reviews"
    --OWNER to "Josie";