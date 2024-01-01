-- --
-- -- PostgreSQL database dump
-- --

-- -- Dumped from database version 16.1 (Ubuntu 16.1-1.pgdg22.04+1)
-- -- Dumped by pg_dump version 16.1 (Ubuntu 16.1-1.pgdg22.04+1)

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- --
-- -- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
-- --

-- -- *not* creating schema, since initdb creates it


-- ALTER SCHEMA public OWNER TO postgres;

-- --
-- -- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
-- --

-- COMMENT ON SCHEMA public IS '';


-- SET default_tablespace = '';

-- SET default_table_access_method = heap;

-- --
-- -- Name: Account; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Account" (
--     id text DEFAULT gen_random_uuid() NOT NULL,
--     "firstName" text NOT NULL,
--     "lastName" text NOT NULL
-- );


-- ALTER TABLE public."Account" OWNER TO postgres;

-- --
-- -- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Comment" (
--     id text DEFAULT gen_random_uuid() NOT NULL,
--     comment text NOT NULL,
--     "authorId" text NOT NULL,
--     "postId" text NOT NULL
-- );


-- ALTER TABLE public."Comment" OWNER TO postgres;

-- --
-- -- Name: Post; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Post" (
--     id text DEFAULT gen_random_uuid() NOT NULL,
--     title text NOT NULL,
--     content text NOT NULL,
--     "authorId" text NOT NULL,
--     "modifiedById" text
-- );


-- ALTER TABLE public."Post" OWNER TO postgres;

-- --
-- -- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public._prisma_migrations (
--     id character varying(36) NOT NULL,
--     checksum character varying(64) NOT NULL,
--     finished_at timestamp with time zone,
--     migration_name character varying(255) NOT NULL,
--     logs text,
--     rolled_back_at timestamp with time zone,
--     started_at timestamp with time zone DEFAULT now() NOT NULL,
--     applied_steps_count integer DEFAULT 0 NOT NULL
-- );


-- ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "firstName", "lastName") FROM stdin;
3b7878c4-e41f-4837-9426-54b59aa83913    Emiline Brasier
530b1887-bf68-44d5-9a4d-c89238a7d4d7    Ferdy   Vicary
c3c5660b-55f3-4d0c-a593-f8ec37d4745d    Lorens  Pretty
9efd575c-d761-4f27-9cc8-7475b6fcb7ad    Andros  Chupin
bd131796-fa69-4d91-8c43-9cbdb6a54e39    Ardelia Arnoult
0adfd653-b1ac-4d12-aa80-1d77aeaa1344    Claybourne      Tatford
f765f6d9-8ba5-4692-9915-5b2c67b421ed    Ardene  Boaler
65ed0c42-d62e-4c6a-a070-754245bdb630    Vito    Buckhurst
9eeb0526-c70d-4d1f-b6ee-cf259e35de0c    Johnath Rowaszkiewicz
43b133ea-7f60-4b72-86fe-e7dcc6fc7880    Mellisa Haken
be544aef-b1f5-4c9a-935a-9dfd9bc8d068    Theodora        Kiss
f10fa015-ad3e-45f6-a1b2-2d4583b07173    Erma    Heighway
e96fb86d-97a2-4aa9-a3d5-d2e77968ebdc    Sandro  Vasyaev
26383544-aba4-49f5-b7ae-6707fe7c63b6    Gregg   Connerry
492e584f-0fcc-4194-8e1e-ab3d12eee3d3    Dalis   Handscombe
c80fbdc1-ed04-4d5d-bced-0d7d88c8b643    Aluino  Redmayne
f3a814a3-407b-4a28-a528-3840f6ac7ee6    Gilbert Ferrar
66aae8b9-ed0c-4f22-89b4-cdc3e1d47175    Ardine  Charrisson
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comment" (id, comment, "authorId", "postId") FROM stdin;
602eb623-c273-4a75-a2df-df128903f2ee    Incredible facts about elephants!       65ed0c42-d62e-4c6a-a070-754245bdb630    64d451a9-1de3-4ffe-8791-7c7ff904bad8
4b7f5727-26b1-4fe1-991e-3e661a4704c9    I never knew cheetahs were that fast!   c3c5660b-55f3-4d0c-a593-f8ec37d4745d    54b66417-c911-4ea1-9ddd-a26fc0c95728
0711b54c-3a31-467a-97e1-d169dc9471eb    Their speed is absolutely astounding.   9efd575c-d761-4f27-9cc8-7475b6fcb7ad    54b66417-c911-4ea1-9ddd-a26fc0c95728
004dfe82-cda9-4d6b-a3c1-81f0068827aa    I love giraffes!        530b1887-bf68-44d5-9a4d-c89238a7d4d7    39ff231c-0297-4c8b-ad7f-aaeb5b81ccec
b4201a47-0b82-49e5-a6d5-30e80a52de06    Their height is really something special.       9eeb0526-c70d-4d1f-b6ee-cf259e35de0c    39ff231c-0297-4c8b-ad7f-aaeb5b81ccec
69592172-55c2-478b-9fe2-2f2187817a33    Jellyfish are so mysterious and fascinating.    0adfd653-b1ac-4d12-aa80-1d77aeaa1344    d4127dc8-860f-4bc3-843f-a99818f08c6c
14342857-92bb-457e-8675-5e650161b5cb    They are such ancient creatures!        3b7878c4-e41f-4837-9426-54b59aa83913    d4127dc8-860f-4bc3-843f-a99818f08c6c
dff488db-0ebd-4729-9e71-f7853287e3e3    Their survival through ages is remarkable.      f10fa015-ad3e-45f6-a1b2-2d4583b07173    d4127dc8-860f-4bc3-843f-a99818f08c6c
e69bb36f-be5c-4fb1-bcbd-a0cbe8204b40    Blue whales are truly magnificent.🐳    bd131796-fa69-4d91-8c43-9cbdb6a54e39    eeb6af6d-f902-46e2-a72c-bf9f04b5c9e4
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Post" (id, title, content, "authorId", "modifiedById") FROM stdin;
64d451a9-1de3-4ffe-8791-7c7ff904bad8    Majestic Elephants      Elephants are the largest land animals on Earth.        9efd575c-d761-4f27-9cc8-7475b6fcb7ad    f10fa015-ad3e-45f6-a1b2-2d4583b07173
54b66417-c911-4ea1-9ddd-a26fc0c95728    Cheetahs: Fastest Land Animals  Cheetahs can run up to 70 mph in short bursts.  f765f6d9-8ba5-4692-9915-5b2c67b421ed    c80fbdc1-ed04-4d5d-bced-0d7d88c8b643
eeb6af6d-f902-46e2-a72c-bf9f04b5c9e4    The Blue Whale  Blue whales are the largest animals ever known to have lived.   530b1887-bf68-44d5-9a4d-c89238a7d4d7    492e584f-0fcc-4194-8e1e-ab3d12eee3d3
2babf636-3aed-43d2-a9a4-441b91f7a661    Fascinating Octopuses   Octopuses have three hearts and blue blood.     9eeb0526-c70d-4d1f-b6ee-cf259e35de0c    9efd575c-d761-4f27-9cc8-7475b6fcb7ad
39ff231c-0297-4c8b-ad7f-aaeb5b81ccec    Giraffes: The Tall Mammals      Giraffes are the tallest mammals on Earth.      3b7878c4-e41f-4837-9426-54b59aa83913    43b133ea-7f60-4b72-86fe-e7dcc6fc7880
7d3ec71b-b080-42ef-ab2e-a9baeacf16f1    Penguins in Antarctica  Emperor Penguins can dive deeper than 500 meters.       e96fb86d-97a2-4aa9-a3d5-d2e77968ebdc    c3c5660b-55f3-4d0c-a593-f8ec37d4745d
d4127dc8-860f-4bc3-843f-a99818f08c6c    Mysterious Jellyfish    Jellyfish have been around for more than 500 million years.     0adfd653-b1ac-4d12-aa80-1d77aeaa1344    66aae8b9-ed0c-4f22-89b4-cdc3e1d47175
ff87c393-2789-4cab-99c3-6dec56e6e827    The Intelligent Dolphins        Dolphins are known for their intelligence and playfulness.      bd131796-fa69-4d91-8c43-9cbdb6a54e39    e96fb86d-97a2-4aa9-a3d5-d2e77968ebdc
8099ca8a-778d-42d4-8e84-ecc8612fdf8e    Sneaky Chameleons       Chameleons can change their color for communication and temperature regulation. 65ed0c42-d62e-4c6a-a070-754245bdb630       f765f6d9-8ba5-4692-9915-5b2c67b421ed
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
12726ddf-e3b4-4607-b8f5-bbcc88c91be5    85c803950bc05b77b9e14d8801180f94894ddd546b1c654bec1d75397ad84163        2023-12-03 14:09:27.26681-05    20231203190927_init     \N      \N2023-12-03 14:09:27.254826-05    1
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Comment Comment_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_modifiedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_modifiedById_fkey" FOREIGN KEY ("modifiedById") REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--
