SET check_function_bodies = false;
CREATE TABLE public.evaluations (
    id integer NOT NULL,
    user_id integer NOT NULL,
    maturity_value_id integer NOT NULL,
    technology_field_id integer NOT NULL
);
CREATE SEQUENCE public.evaluations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.evaluations_id_seq OWNED BY public.evaluations.id;
CREATE TABLE public.maturity_values (
    id integer NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.maturity_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.maturity_values_id_seq OWNED BY public.maturity_values.id;
CREATE TABLE public.technologies (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL
);
CREATE SEQUENCE public.technologies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.technologies_id_seq OWNED BY public.technologies.id;
CREATE TABLE public.technology_fields (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL
);
CREATE SEQUENCE public.technology_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.technology_fields_id_seq OWNED BY public.technology_fields.id;
CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL
);
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.evaluations ALTER COLUMN id SET DEFAULT nextval('public.evaluations_id_seq'::regclass);
ALTER TABLE ONLY public.maturity_values ALTER COLUMN id SET DEFAULT nextval('public.maturity_values_id_seq'::regclass);
ALTER TABLE ONLY public.technologies ALTER COLUMN id SET DEFAULT nextval('public.technologies_id_seq'::regclass);
ALTER TABLE ONLY public.technology_fields ALTER COLUMN id SET DEFAULT nextval('public.technology_fields_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.maturity_values
    ADD CONSTRAINT maturity_values_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.technologies
    ADD CONSTRAINT technologies_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.technology_fields
    ADD CONSTRAINT technology_fields_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_maturity_value_id_fkey FOREIGN KEY (maturity_value_id) REFERENCES public.maturity_values(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_technology_field_id_fkey FOREIGN KEY (technology_field_id) REFERENCES public.technology_fields(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
