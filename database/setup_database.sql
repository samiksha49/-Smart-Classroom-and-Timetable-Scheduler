--
-- PostgreSQL database dump
--

\restrict Q43x8NF0GvuFIt75RzD21vAkEhbNTzEHMgxsI4XmQV1beTIuuZj03jRenUoptwX

-- Dumped from database version 14.19 (Homebrew)
-- Dumped by pg_dump version 17.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: batches; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.batches (
    id integer NOT NULL,
    department_id integer NOT NULL,
    year integer NOT NULL,
    section character varying(10) NOT NULL,
    strength integer NOT NULL,
    status boolean
);


--
-- Name: batches_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.batches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: batches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.batches_id_seq OWNED BY public.batches.id;


--
-- Name: departments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(10) NOT NULL,
    description character varying(255),
    status boolean
);


--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- Name: faculties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faculties (
    id integer NOT NULL,
    department_id integer NOT NULL,
    name character varying(100) NOT NULL,
    employee_code character varying(20) NOT NULL,
    email character varying(100) NOT NULL,
    designation character varying(100) NOT NULL,
    status boolean
);


--
-- Name: faculties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.faculties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: faculties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.faculties_id_seq OWNED BY public.faculties.id;


--
-- Name: faculty_subject_mappings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faculty_subject_mappings (
    id integer NOT NULL,
    faculty_id integer NOT NULL,
    subject_id integer NOT NULL
);


--
-- Name: faculty_subject_mappings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.faculty_subject_mappings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: faculty_subject_mappings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.faculty_subject_mappings_id_seq OWNED BY public.faculty_subject_mappings.id;


--
-- Name: subjects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    department_id integer NOT NULL,
    batch_id integer NOT NULL,
    faculty_id integer,
    subject_code character varying(20) NOT NULL,
    subject_name character varying(100) NOT NULL,
    hours_per_week integer NOT NULL,
    status boolean,
    is_lab boolean,
    lab_sessions_per_week integer
);


--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- Name: timetables; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.timetables (
    id integer NOT NULL,
    batch_id integer NOT NULL,
    day character varying(20) NOT NULL,
    period integer NOT NULL,
    subject_id integer NOT NULL,
    faculty_id integer NOT NULL,
    room_number character varying(50)
);


--
-- Name: timetables_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.timetables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timetables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.timetables_id_seq OWNED BY public.timetables.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: batches id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.batches ALTER COLUMN id SET DEFAULT nextval('public.batches_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- Name: faculties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculties ALTER COLUMN id SET DEFAULT nextval('public.faculties_id_seq'::regclass);


--
-- Name: faculty_subject_mappings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculty_subject_mappings ALTER COLUMN id SET DEFAULT nextval('public.faculty_subject_mappings_id_seq'::regclass);


--
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- Name: timetables id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timetables ALTER COLUMN id SET DEFAULT nextval('public.timetables_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: batches; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.batches (id, department_id, year, section, strength, status) FROM stdin;
1	1	1	A	60	t
2	2	1	A	60	t
3	3	1	A	60	t
4	4	1	A	60	t
5	5	1	A	60	t
6	6	1	A	60	t
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.departments (id, name, code, description, status) FROM stdin;
1	Computer Science Engineering	CSE	Computer Science Engineering Department	t
2	Information Technology	IT	Information Technology Department	t
3	Artificial Intelligence & Machine Learning	AIML	Artificial Intelligence & Machine Learning Department	t
4	Electronics and Communication Engineering	ECE	Electronics and Communication Engineering Department	t
5	Electrical and Electronics Engineering	EEE	Electrical and Electronics Engineering Department	t
6	Mechanical Engineering	MECH	Mechanical Engineering Department	t
\.


--
-- Data for Name: faculties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.faculties (id, department_id, name, employee_code, email, designation, status) FROM stdin;
1	3	Dr Kumar	FAC001	faculty1@college.com	Assistant Professor	t
2	6	Mrs Priya	FAC002	faculty2@college.com	Assistant Professor	t
3	2	Mr Rahul	FAC003	faculty3@college.com	Assistant Professor	t
4	3	Dr Deepika	FAC004	faculty4@college.com	Assistant Professor	t
5	1	Mr Ravi	FAC005	faculty5@college.com	Assistant Professor	t
6	3	Mrs Anitha	FAC006	faculty6@college.com	Assistant Professor	t
7	6	Mr Arjun	FAC007	faculty7@college.com	Assistant Professor	t
8	3	Dr Suresh	FAC008	faculty8@college.com	Assistant Professor	t
9	6	Mrs Keerthana	FAC009	faculty9@college.com	Assistant Professor	t
10	4	Mr Dinesh	FAC010	faculty10@college.com	Assistant Professor	t
11	4	Dr Vignesh	FAC011	faculty11@college.com	Assistant Professor	t
12	3	Mrs Divya	FAC012	faculty12@college.com	Assistant Professor	t
13	6	Mr Karthik	FAC013	faculty13@college.com	Assistant Professor	t
14	2	Dr Lakshmi	FAC014	faculty14@college.com	Assistant Professor	t
15	2	Mr Naveen	FAC015	faculty15@college.com	Assistant Professor	t
16	6	Mrs Janani	FAC016	faculty16@college.com	Assistant Professor	t
17	1	Mr Ashwin	FAC017	faculty17@college.com	Assistant Professor	t
18	5	Dr Meena	FAC018	faculty18@college.com	Assistant Professor	t
19	4	Mrs Nandhini	FAC019	faculty19@college.com	Assistant Professor	t
20	2	Mr Prakash	FAC020	faculty20@college.com	Assistant Professor	t
\.


--
-- Data for Name: faculty_subject_mappings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.faculty_subject_mappings (id, faculty_id, subject_id) FROM stdin;
1	3	1
2	16	1
3	20	2
4	12	2
5	1	3
6	9	3
7	19	4
8	20	4
9	6	5
10	8	5
11	13	6
12	5	6
13	17	7
14	9	7
15	2	8
16	6	8
17	20	9
18	16	9
19	8	10
20	16	10
21	2	11
22	6	11
23	1	12
24	14	12
25	14	13
26	5	13
27	5	14
28	20	14
29	2	15
30	3	15
31	18	16
32	6	16
33	18	17
34	6	17
35	10	18
36	14	18
37	7	19
38	1	19
39	5	20
40	1	20
41	1	21
42	7	21
43	1	22
44	9	22
45	1	23
46	14	23
47	20	24
48	1	24
49	19	25
50	12	25
51	15	26
52	12	26
53	1	27
54	11	27
55	6	28
56	2	28
57	17	29
58	8	29
59	6	30
60	12	30
61	15	31
62	5	31
63	6	32
64	17	32
65	4	33
66	16	33
67	2	34
68	15	34
69	11	35
70	5	35
71	16	36
72	14	36
73	7	37
74	20	37
75	12	38
76	1	38
77	10	39
78	3	39
79	15	40
80	16	40
81	14	41
82	16	41
83	16	42
84	17	42
85	11	43
86	3	43
87	18	44
88	6	44
89	11	45
90	1	45
91	17	46
92	5	46
93	14	47
94	12	47
95	9	48
96	12	48
97	17	49
98	13	49
99	1	50
100	8	50
101	11	51
102	8	51
103	6	52
104	5	52
105	14	53
106	17	53
107	6	54
108	20	54
109	13	55
110	15	55
111	6	56
112	1	56
113	17	57
114	16	57
115	14	58
116	13	58
117	6	59
118	2	59
119	3	60
120	13	60
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.subjects (id, department_id, batch_id, faculty_id, subject_code, subject_name, hours_per_week, status, is_lab, lab_sessions_per_week) FROM stdin;
1	1	1	3	CSE_MA25C01	Applied Calculus	5	t	f	0
2	1	1	20	CSE_EN25C01	English Essentials - I	4	t	f	0
3	1	1	1	CSE_UC25H01	Heritage of Tamils	2	t	f	0
4	1	1	19	CSE_PH25C01	Applied Physics - I	4	t	f	0
5	1	1	6	CSE_CY25C01	Applied Chemistry - I	4	t	f	0
6	1	1	13	CSE_CS25C01	Computer Programming: C	5	t	f	0
7	1	1	17	CSE_CS25C03	Essentials of Computing	4	t	f	0
8	1	1	2	CSE_PH25L01	Physics Laboratory	4	t	t	2
9	1	1	20	CSE_CY25L01	Chemistry Laboratory	4	t	t	2
10	1	1	8	CSE_CS25L01	Programming Laboratory	4	t	t	2
11	2	2	2	IT_MA25C01	Applied Calculus	5	t	f	0
12	2	2	1	IT_EN25C01	English Essentials - I	4	t	f	0
13	2	2	14	IT_UC25H01	Heritage of Tamils	2	t	f	0
14	2	2	5	IT_PH25C01	Applied Physics - I	4	t	f	0
15	2	2	2	IT_CY25C01	Applied Chemistry - I	4	t	f	0
16	2	2	18	IT_CS25C01	Computer Programming: C	5	t	f	0
17	2	2	18	IT_CS25C03	Essentials of Computing	4	t	f	0
18	2	2	10	IT_PH25L01	Physics Laboratory	4	t	t	2
19	2	2	7	IT_CY25L01	Chemistry Laboratory	4	t	t	2
20	2	2	5	IT_CS25L01	Programming Laboratory	4	t	t	2
21	3	3	1	AIML_MA25C01	Applied Calculus	5	t	f	0
22	3	3	1	AIML_EN25C01	English Essentials - I	4	t	f	0
23	3	3	1	AIML_UC25H01	Heritage of Tamils	2	t	f	0
24	3	3	20	AIML_PH25C01	Applied Physics - I	4	t	f	0
25	3	3	19	AIML_CY25C01	Applied Chemistry - I	4	t	f	0
26	3	3	15	AIML_CS25C01	Computer Programming: C	5	t	f	0
27	3	3	1	AIML_CS25C03	Essentials of Computing	4	t	f	0
28	3	3	6	AIML_PH25L01	Physics Laboratory	4	t	t	2
29	3	3	17	AIML_CY25L01	Chemistry Laboratory	4	t	t	2
30	3	3	6	AIML_CS25L01	Programming Laboratory	4	t	t	2
31	4	4	15	ECE_MA25C01	Applied Calculus	5	t	f	0
32	4	4	6	ECE_EN25C01	English Essentials - I	4	t	f	0
33	4	4	4	ECE_UC25H01	Heritage of Tamils	2	t	f	0
34	4	4	2	ECE_PH25C01	Applied Physics - I	4	t	f	0
35	4	4	11	ECE_CY25C01	Applied Chemistry - I	4	t	f	0
36	4	4	16	ECE_CS25C01	Computer Programming: C	5	t	f	0
37	4	4	7	ECE_CS25C03	Essentials of Computing	4	t	f	0
38	4	4	12	ECE_PH25L01	Physics Laboratory	4	t	t	2
39	4	4	10	ECE_CY25L01	Chemistry Laboratory	4	t	t	2
40	4	4	15	ECE_CS25L01	Programming Laboratory	4	t	t	2
41	5	5	14	EEE_MA25C01	Applied Calculus	5	t	f	0
42	5	5	16	EEE_EN25C01	English Essentials - I	4	t	f	0
43	5	5	11	EEE_UC25H01	Heritage of Tamils	2	t	f	0
44	5	5	18	EEE_PH25C01	Applied Physics - I	4	t	f	0
45	5	5	11	EEE_CY25C01	Applied Chemistry - I	4	t	f	0
46	5	5	17	EEE_CS25C01	Computer Programming: C	5	t	f	0
47	5	5	14	EEE_CS25C03	Essentials of Computing	4	t	f	0
48	5	5	9	EEE_PH25L01	Physics Laboratory	4	t	t	2
49	5	5	17	EEE_CY25L01	Chemistry Laboratory	4	t	t	2
50	5	5	1	EEE_CS25L01	Programming Laboratory	4	t	t	2
51	6	6	11	MECH_MA25C01	Applied Calculus	5	t	f	0
52	6	6	6	MECH_EN25C01	English Essentials - I	4	t	f	0
53	6	6	14	MECH_UC25H01	Heritage of Tamils	2	t	f	0
54	6	6	6	MECH_PH25C01	Applied Physics - I	4	t	f	0
55	6	6	13	MECH_CY25C01	Applied Chemistry - I	4	t	f	0
56	6	6	6	MECH_CS25C01	Computer Programming: C	5	t	f	0
57	6	6	17	MECH_CS25C03	Essentials of Computing	4	t	f	0
58	6	6	14	MECH_PH25L01	Physics Laboratory	4	t	t	2
59	6	6	6	MECH_CY25L01	Chemistry Laboratory	4	t	t	2
60	6	6	3	MECH_CS25L01	Programming Laboratory	4	t	t	2
\.


--
-- Data for Name: timetables; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.timetables (id, batch_id, day, period, subject_id, faculty_id, room_number) FROM stdin;
1265	1	Friday	7	8	2	LAB-CSE
1266	1	Friday	8	8	2	LAB-CSE
1267	1	Tuesday	3	8	2	LAB-CSE
1268	1	Tuesday	4	8	2	LAB-CSE
1269	1	Thursday	1	9	20	LAB-CSE
1270	1	Thursday	2	9	20	LAB-CSE
1271	1	Monday	7	9	20	LAB-CSE
1272	1	Monday	8	9	20	LAB-CSE
1273	1	Wednesday	5	10	8	LAB-CSE
1274	1	Wednesday	6	10	8	LAB-CSE
1275	1	Monday	1	1	3	CSE-1A
1276	1	Monday	6	1	3	CSE-1A
1277	1	Tuesday	2	1	3	CSE-1A
1278	1	Wednesday	7	1	3	CSE-1A
1279	1	Thursday	6	1	3	CSE-1A
1280	1	Thursday	7	2	20	CSE-1A
1281	1	Friday	5	2	20	CSE-1A
1282	1	Tuesday	1	2	20	CSE-1A
1283	1	Wednesday	3	2	20	CSE-1A
1284	1	Monday	5	3	1	CSE-1A
1285	1	Tuesday	6	3	1	CSE-1A
1286	1	Friday	6	4	19	CSE-1A
1287	1	Wednesday	1	4	19	CSE-1A
1288	1	Thursday	8	4	19	CSE-1A
1289	1	Thursday	3	4	19	CSE-1A
1290	1	Monday	2	5	6	CSE-1A
1291	1	Thursday	5	5	6	CSE-1A
1292	1	Wednesday	2	5	6	CSE-1A
1293	1	Wednesday	8	5	6	CSE-1A
1294	1	Tuesday	7	6	13	CSE-1A
1295	1	Friday	4	6	13	CSE-1A
1296	1	Monday	4	6	13	CSE-1A
1297	1	Thursday	4	6	13	CSE-1A
1298	1	Wednesday	4	6	13	CSE-1A
1299	1	Tuesday	5	7	17	CSE-1A
1300	1	Monday	3	7	17	CSE-1A
1301	1	Tuesday	8	2	20	CSE-1A
1302	1	Friday	1	5	6	CSE-1A
1303	1	Friday	2	4	19	CSE-1A
1304	1	Friday	3	4	19	CSE-1A
1305	2	Monday	7	18	10	LAB-IT
1306	2	Monday	8	18	10	LAB-IT
1307	2	Friday	1	18	10	LAB-IT
1308	2	Friday	2	18	10	LAB-IT
1309	2	Thursday	5	19	7	LAB-IT
1310	2	Thursday	6	19	7	LAB-IT
1311	2	Wednesday	7	19	7	LAB-IT
1312	2	Wednesday	8	19	7	LAB-IT
1313	2	Tuesday	5	20	5	LAB-IT
1314	2	Tuesday	6	20	5	LAB-IT
1315	2	Monday	4	11	2	IT-1A
1316	2	Thursday	3	11	2	IT-1A
1317	2	Friday	3	11	2	IT-1A
1318	2	Thursday	7	11	2	IT-1A
1319	2	Wednesday	5	11	2	IT-1A
1320	2	Wednesday	2	12	1	IT-1A
1321	2	Friday	6	12	1	IT-1A
1322	2	Thursday	4	12	1	IT-1A
1323	2	Tuesday	8	12	1	IT-1A
1324	2	Wednesday	1	13	14	IT-1A
1325	2	Friday	7	13	14	IT-1A
1326	2	Friday	5	14	5	IT-1A
1327	2	Tuesday	1	14	5	IT-1A
1328	2	Wednesday	6	14	5	IT-1A
1329	2	Monday	1	14	5	IT-1A
1330	2	Monday	3	15	2	IT-1A
1331	2	Wednesday	4	15	2	IT-1A
1332	2	Thursday	1	15	2	IT-1A
1333	2	Monday	6	15	2	IT-1A
1334	2	Friday	4	16	18	IT-1A
1335	2	Monday	2	16	18	IT-1A
1336	2	Thursday	8	16	18	IT-1A
1337	2	Tuesday	7	16	18	IT-1A
1338	2	Tuesday	2	16	18	IT-1A
1339	2	Monday	5	17	18	IT-1A
1340	2	Tuesday	3	16	18	IT-1A
1341	2	Tuesday	4	12	1	IT-1A
1342	2	Wednesday	3	15	2	IT-1A
1343	2	Thursday	2	11	2	IT-1A
1344	2	Friday	8	12	1	IT-1A
1345	3	Friday	5	28	6	LAB-AIML
1346	3	Friday	6	28	6	LAB-AIML
1347	3	Tuesday	3	28	6	LAB-AIML
1348	3	Tuesday	4	28	6	LAB-AIML
1349	3	Thursday	1	29	17	LAB-AIML
1350	3	Thursday	2	29	17	LAB-AIML
1351	3	Wednesday	5	29	17	LAB-AIML
1352	3	Wednesday	6	29	17	LAB-AIML
1353	3	Monday	3	30	6	LAB-AIML
1354	3	Monday	4	30	6	LAB-AIML
1355	3	Wednesday	8	21	1	AIML-1A
1356	3	Monday	2	21	1	AIML-1A
1357	3	Tuesday	7	21	1	AIML-1A
1358	3	Thursday	5	21	1	AIML-1A
1359	3	Monday	6	21	1	AIML-1A
1360	3	Wednesday	1	22	1	AIML-1A
1361	3	Monday	7	22	1	AIML-1A
1362	3	Friday	1	22	1	AIML-1A
1363	3	Tuesday	5	22	1	AIML-1A
1364	3	Tuesday	1	23	1	AIML-1A
1365	3	Friday	4	23	1	AIML-1A
1366	3	Monday	1	24	20	AIML-1A
1367	3	Monday	5	24	20	AIML-1A
1368	3	Wednesday	7	24	20	AIML-1A
1369	3	Wednesday	4	24	20	AIML-1A
1370	3	Thursday	6	25	19	AIML-1A
1371	3	Tuesday	2	25	19	AIML-1A
1372	3	Friday	7	25	19	AIML-1A
1373	3	Monday	8	25	19	AIML-1A
1374	3	Wednesday	3	26	15	AIML-1A
1375	3	Tuesday	8	26	15	AIML-1A
1376	3	Thursday	4	26	15	AIML-1A
1377	3	Tuesday	6	24	20	AIML-1A
1378	3	Wednesday	2	25	19	AIML-1A
1379	3	Thursday	3	21	1	AIML-1A
1380	3	Thursday	7	27	1	AIML-1A
1381	3	Thursday	8	24	20	AIML-1A
1382	3	Friday	2	22	1	AIML-1A
1383	3	Friday	3	22	1	AIML-1A
1384	3	Friday	8	24	20	AIML-1A
1385	4	Friday	3	38	12	LAB-ECE
1386	4	Friday	4	38	12	LAB-ECE
1387	4	Wednesday	3	38	12	LAB-ECE
1388	4	Wednesday	4	38	12	LAB-ECE
1389	4	Monday	1	39	10	LAB-ECE
1390	4	Monday	2	39	10	LAB-ECE
1391	4	Tuesday	1	39	10	LAB-ECE
1392	4	Tuesday	2	39	10	LAB-ECE
1393	4	Thursday	7	40	15	LAB-ECE
1394	4	Thursday	8	40	15	LAB-ECE
1395	4	Monday	4	31	15	ECE-1A
1396	4	Friday	8	31	15	ECE-1A
1397	4	Tuesday	3	31	15	ECE-1A
1398	4	Tuesday	5	31	15	ECE-1A
1399	4	Monday	7	31	15	ECE-1A
1400	4	Tuesday	6	32	6	ECE-1A
1401	4	Monday	6	32	6	ECE-1A
1402	4	Thursday	1	32	6	ECE-1A
1403	4	Wednesday	7	32	6	ECE-1A
1404	4	Thursday	4	33	4	ECE-1A
1405	4	Friday	7	33	4	ECE-1A
1406	4	Wednesday	6	34	2	ECE-1A
1407	4	Monday	8	34	2	ECE-1A
1408	4	Tuesday	7	34	2	ECE-1A
1409	4	Friday	6	34	2	ECE-1A
1410	4	Thursday	2	35	11	ECE-1A
1411	4	Thursday	6	35	11	ECE-1A
1412	4	Tuesday	4	35	11	ECE-1A
1413	4	Friday	5	35	11	ECE-1A
1414	4	Friday	1	36	16	ECE-1A
1415	4	Wednesday	5	36	16	ECE-1A
1416	4	Monday	3	36	16	ECE-1A
1417	4	Monday	5	36	16	ECE-1A
1418	4	Wednesday	1	36	16	ECE-1A
1419	4	Tuesday	8	33	4	ECE-1A
1420	4	Wednesday	2	35	11	ECE-1A
1421	4	Wednesday	8	36	16	ECE-1A
1422	4	Thursday	3	32	6	ECE-1A
1423	4	Thursday	5	36	16	ECE-1A
1424	4	Friday	2	31	15	ECE-1A
1425	5	Friday	1	48	9	LAB-EEE
1426	5	Friday	2	48	9	LAB-EEE
1427	5	Monday	5	48	9	LAB-EEE
1428	5	Monday	6	48	9	LAB-EEE
1429	5	Wednesday	7	49	17	LAB-EEE
1430	5	Wednesday	8	49	17	LAB-EEE
1431	5	Tuesday	1	49	17	LAB-EEE
1432	5	Tuesday	2	49	17	LAB-EEE
1433	5	Thursday	1	50	1	LAB-EEE
1434	5	Thursday	2	50	1	LAB-EEE
1435	5	Thursday	3	41	14	EEE-1A
1436	5	Friday	8	41	14	EEE-1A
1437	5	Tuesday	8	41	14	EEE-1A
1438	5	Thursday	6	41	14	EEE-1A
1439	5	Monday	4	41	14	EEE-1A
1440	5	Tuesday	5	42	16	EEE-1A
1441	5	Friday	7	42	16	EEE-1A
1442	5	Monday	7	42	16	EEE-1A
1443	5	Friday	4	42	16	EEE-1A
1444	5	Wednesday	4	43	11	EEE-1A
1445	5	Tuesday	6	43	11	EEE-1A
1446	5	Thursday	4	44	18	EEE-1A
1447	5	Wednesday	5	44	18	EEE-1A
1448	5	Wednesday	2	44	18	EEE-1A
1449	5	Monday	3	44	18	EEE-1A
1450	5	Monday	8	45	11	EEE-1A
1451	5	Friday	3	45	11	EEE-1A
1452	5	Tuesday	3	45	11	EEE-1A
1453	5	Monday	1	45	11	EEE-1A
1454	5	Friday	5	46	17	EEE-1A
1455	5	Monday	2	46	17	EEE-1A
1456	5	Thursday	5	46	17	EEE-1A
1457	5	Thursday	7	46	17	EEE-1A
1458	5	Wednesday	3	46	17	EEE-1A
1459	5	Tuesday	4	47	14	EEE-1A
1460	5	Thursday	8	47	14	EEE-1A
1461	5	Tuesday	7	46	17	EEE-1A
1462	5	Wednesday	1	46	17	EEE-1A
1463	5	Wednesday	6	43	11	EEE-1A
1464	5	Friday	6	46	17	EEE-1A
1465	6	Friday	3	58	14	LAB-MECH
1466	6	Friday	4	58	14	LAB-MECH
1467	6	Monday	1	58	14	LAB-MECH
1468	6	Monday	2	58	14	LAB-MECH
1469	6	Tuesday	7	59	6	LAB-MECH
1470	6	Tuesday	8	59	6	LAB-MECH
1471	6	Thursday	7	59	6	LAB-MECH
1472	6	Thursday	8	59	6	LAB-MECH
1473	6	Wednesday	5	60	3	LAB-MECH
1474	6	Wednesday	6	60	3	LAB-MECH
1475	6	Wednesday	7	51	11	MECH-1A
1476	6	Friday	2	51	11	MECH-1A
1477	6	Thursday	3	51	11	MECH-1A
1478	6	Friday	7	51	11	MECH-1A
1479	6	Monday	3	51	11	MECH-1A
1480	6	Monday	8	52	6	MECH-1A
1481	6	Thursday	4	52	6	MECH-1A
1482	6	Wednesday	1	52	6	MECH-1A
1483	6	Tuesday	1	52	6	MECH-1A
1484	6	Thursday	5	53	14	MECH-1A
1485	6	Tuesday	3	53	14	MECH-1A
1486	6	Friday	8	54	6	MECH-1A
1487	6	Wednesday	3	54	6	MECH-1A
1488	6	Monday	5	54	6	MECH-1A
1489	6	Monday	4	57	17	MECH-1A
1490	6	Monday	6	51	11	MECH-1A
1491	6	Monday	7	54	6	MECH-1A
1492	6	Tuesday	2	52	6	MECH-1A
1493	6	Tuesday	4	57	17	MECH-1A
1494	6	Tuesday	5	56	6	MECH-1A
1495	6	Tuesday	6	57	17	MECH-1A
1496	6	Wednesday	2	53	14	MECH-1A
1497	6	Wednesday	4	54	6	MECH-1A
1498	6	Wednesday	8	53	14	MECH-1A
1499	6	Thursday	1	55	13	MECH-1A
1500	6	Thursday	2	55	13	MECH-1A
1501	6	Thursday	6	54	6	MECH-1A
1502	6	Friday	1	57	17	MECH-1A
1503	6	Friday	5	53	14	MECH-1A
1504	6	Friday	6	53	14	MECH-1A
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, role) FROM stdin;
1	Admin	admin@gmail.com	$2b$12$GdV/79R09tvlptsNu4VTlOFTBc5Ti/TEVw4tcd9qOtXLmPUbwHKT.	ADMIN
\.


--
-- Name: batches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.batches_id_seq', 6, true);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.departments_id_seq', 6, true);


--
-- Name: faculties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.faculties_id_seq', 20, true);


--
-- Name: faculty_subject_mappings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.faculty_subject_mappings_id_seq', 120, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.subjects_id_seq', 60, true);


--
-- Name: timetables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.timetables_id_seq', 1504, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: batches batches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.batches
    ADD CONSTRAINT batches_pkey PRIMARY KEY (id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: faculties faculties_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_email_key UNIQUE (email);


--
-- Name: faculties faculties_employee_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_employee_code_key UNIQUE (employee_code);


--
-- Name: faculties faculties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_pkey PRIMARY KEY (id);


--
-- Name: faculty_subject_mappings faculty_subject_mappings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculty_subject_mappings
    ADD CONSTRAINT faculty_subject_mappings_pkey PRIMARY KEY (id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- Name: subjects subjects_subject_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_subject_code_key UNIQUE (subject_code);


--
-- Name: timetables timetables_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT timetables_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_batches_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_batches_id ON public.batches USING btree (id);


--
-- Name: ix_departments_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_departments_id ON public.departments USING btree (id);


--
-- Name: ix_faculties_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_faculties_id ON public.faculties USING btree (id);


--
-- Name: ix_faculty_subject_mappings_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_faculty_subject_mappings_id ON public.faculty_subject_mappings USING btree (id);


--
-- Name: ix_subjects_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_subjects_id ON public.subjects USING btree (id);


--
-- Name: ix_timetables_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_timetables_id ON public.timetables USING btree (id);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: batches batches_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.batches
    ADD CONSTRAINT batches_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: faculties faculties_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: faculty_subject_mappings faculty_subject_mappings_faculty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculty_subject_mappings
    ADD CONSTRAINT faculty_subject_mappings_faculty_id_fkey FOREIGN KEY (faculty_id) REFERENCES public.faculties(id);


--
-- Name: faculty_subject_mappings faculty_subject_mappings_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faculty_subject_mappings
    ADD CONSTRAINT faculty_subject_mappings_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- Name: subjects subjects_batch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES public.batches(id);


--
-- Name: subjects subjects_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: subjects subjects_faculty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_faculty_id_fkey FOREIGN KEY (faculty_id) REFERENCES public.faculties(id);


--
-- Name: timetables timetables_batch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT timetables_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES public.batches(id);


--
-- Name: timetables timetables_faculty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT timetables_faculty_id_fkey FOREIGN KEY (faculty_id) REFERENCES public.faculties(id);


--
-- Name: timetables timetables_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT timetables_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Q43x8NF0GvuFIt75RzD21vAkEhbNTzEHMgxsI4XmQV1beTIuuZj03jRenUoptwX

