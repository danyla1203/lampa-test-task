CREATE TABLE public.ads
(
    ad_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    title character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    photos_link character varying[] COLLATE pg_catalog."default" NOT NULL,
    price money NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT ads_pkey PRIMARY KEY (ad_id)
);