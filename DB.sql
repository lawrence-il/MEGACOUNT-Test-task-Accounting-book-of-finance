PGDMP     ,    !                z            accounting_book    14.5    14.5 4    (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    16561    accounting_book    DATABASE     l   CREATE DATABASE accounting_book WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE accounting_book;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            ,           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            �            1259    21856    Expenses    TABLE       CREATE TABLE public."Expenses" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "WalletId" integer
);
    DROP TABLE public."Expenses";
       public         heap    postgres    false    3            �            1259    21855    Expenses_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Expenses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Expenses_id_seq";
       public          postgres    false    220    3            -           0    0    Expenses_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Expenses_id_seq" OWNED BY public."Expenses".id;
          public          postgres    false    219            �            1259    21811    ListWallets    TABLE     �   CREATE TABLE public."ListWallets" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer
);
 !   DROP TABLE public."ListWallets";
       public         heap    postgres    false    3            �            1259    21826    ListWalletsWallets    TABLE     �   CREATE TABLE public."ListWalletsWallets" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ListWalletId" integer,
    "WalletId" integer
);
 (   DROP TABLE public."ListWalletsWallets";
       public         heap    postgres    false    3            �            1259    21825    ListWalletsWallets_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ListWalletsWallets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."ListWalletsWallets_id_seq";
       public          postgres    false    216    3            .           0    0    ListWalletsWallets_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."ListWalletsWallets_id_seq" OWNED BY public."ListWalletsWallets".id;
          public          postgres    false    215            �            1259    21810    ListWallets_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ListWallets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."ListWallets_id_seq";
       public          postgres    false    3    212            /           0    0    ListWallets_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."ListWallets_id_seq" OWNED BY public."ListWallets".id;
          public          postgres    false    211            �            1259    21843    Revenues    TABLE       CREATE TABLE public."Revenues" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "WalletId" integer
);
    DROP TABLE public."Revenues";
       public         heap    postgres    false    3            �            1259    21842    Revenues_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Revenues_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Revenues_id_seq";
       public          postgres    false    218    3            0           0    0    Revenues_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Revenues_id_seq" OWNED BY public."Revenues".id;
          public          postgres    false    217            �            1259    21801    Users    TABLE     2  CREATE TABLE public."Users" (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255),
    role character varying(255) DEFAULT 'user'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false    3            �            1259    21800    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    3    210            1           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    209            �            1259    21818    Wallets    TABLE     �   CREATE TABLE public."Wallets" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Wallets";
       public         heap    postgres    false    3            �            1259    21817    Wallets_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Wallets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Wallets_id_seq";
       public          postgres    false    214    3            2           0    0    Wallets_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Wallets_id_seq" OWNED BY public."Wallets".id;
          public          postgres    false    213            }           2604    21859    Expenses id    DEFAULT     n   ALTER TABLE ONLY public."Expenses" ALTER COLUMN id SET DEFAULT nextval('public."Expenses_id_seq"'::regclass);
 <   ALTER TABLE public."Expenses" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            w           2604    21814    ListWallets id    DEFAULT     t   ALTER TABLE ONLY public."ListWallets" ALTER COLUMN id SET DEFAULT nextval('public."ListWallets_id_seq"'::regclass);
 ?   ALTER TABLE public."ListWallets" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            z           2604    21829    ListWalletsWallets id    DEFAULT     �   ALTER TABLE ONLY public."ListWalletsWallets" ALTER COLUMN id SET DEFAULT nextval('public."ListWalletsWallets_id_seq"'::regclass);
 F   ALTER TABLE public."ListWalletsWallets" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            {           2604    21846    Revenues id    DEFAULT     n   ALTER TABLE ONLY public."Revenues" ALTER COLUMN id SET DEFAULT nextval('public."Revenues_id_seq"'::regclass);
 <   ALTER TABLE public."Revenues" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            u           2604    21804    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            x           2604    21821 
   Wallets id    DEFAULT     l   ALTER TABLE ONLY public."Wallets" ALTER COLUMN id SET DEFAULT nextval('public."Wallets_id_seq"'::regclass);
 ;   ALTER TABLE public."Wallets" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            %          0    21856    Expenses 
   TABLE DATA           [   COPY public."Expenses" (id, name, value, "createdAt", "updatedAt", "WalletId") FROM stdin;
    public          postgres    false    220   �<                 0    21811    ListWallets 
   TABLE DATA           O   COPY public."ListWallets" (id, "createdAt", "updatedAt", "UserId") FROM stdin;
    public          postgres    false    212   k=       !          0    21826    ListWalletsWallets 
   TABLE DATA           h   COPY public."ListWalletsWallets" (id, "createdAt", "updatedAt", "ListWalletId", "WalletId") FROM stdin;
    public          postgres    false    216   �=       #          0    21843    Revenues 
   TABLE DATA           [   COPY public."Revenues" (id, name, value, "createdAt", "updatedAt", "WalletId") FROM stdin;
    public          postgres    false    218   �=                 0    21801    Users 
   TABLE DATA           V   COPY public."Users" (id, login, password, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �>                 0    21818    Wallets 
   TABLE DATA           N   COPY public."Wallets" (id, name, value, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   ,?       3           0    0    Expenses_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Expenses_id_seq"', 7, true);
          public          postgres    false    219            4           0    0    ListWalletsWallets_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."ListWalletsWallets_id_seq"', 2, true);
          public          postgres    false    215            5           0    0    ListWallets_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."ListWallets_id_seq"', 1, true);
          public          postgres    false    211            6           0    0    Revenues_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Revenues_id_seq"', 7, true);
          public          postgres    false    217            7           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);
          public          postgres    false    209            8           0    0    Wallets_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Wallets_id_seq"', 2, true);
          public          postgres    false    213            �           2606    21862    Expenses Expenses_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT "Expenses_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Expenses" DROP CONSTRAINT "Expenses_pkey";
       public            postgres    false    220            �           2606    21831 *   ListWalletsWallets ListWalletsWallets_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."ListWalletsWallets"
    ADD CONSTRAINT "ListWalletsWallets_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."ListWalletsWallets" DROP CONSTRAINT "ListWalletsWallets_pkey";
       public            postgres    false    216            �           2606    21816    ListWallets ListWallets_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."ListWallets"
    ADD CONSTRAINT "ListWallets_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."ListWallets" DROP CONSTRAINT "ListWallets_pkey";
       public            postgres    false    212            �           2606    21849    Revenues Revenues_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Revenues"
    ADD CONSTRAINT "Revenues_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Revenues" DROP CONSTRAINT "Revenues_pkey";
       public            postgres    false    218            �           2606    21809    Users Users_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id, login);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    210    210            �           2606    21824    Wallets Wallets_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Wallets"
    ADD CONSTRAINT "Wallets_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Wallets" DROP CONSTRAINT "Wallets_pkey";
       public            postgres    false    214            �           2606    21863    Expenses Expenses_WalletId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT "Expenses_WalletId_fkey" FOREIGN KEY ("WalletId") REFERENCES public."Wallets"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."Expenses" DROP CONSTRAINT "Expenses_WalletId_fkey";
       public          postgres    false    214    3204    220            �           2606    21832 7   ListWalletsWallets ListWalletsWallets_ListWalletId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ListWalletsWallets"
    ADD CONSTRAINT "ListWalletsWallets_ListWalletId_fkey" FOREIGN KEY ("ListWalletId") REFERENCES public."ListWallets"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 e   ALTER TABLE ONLY public."ListWalletsWallets" DROP CONSTRAINT "ListWalletsWallets_ListWalletId_fkey";
       public          postgres    false    212    216    3202            �           2606    21837 3   ListWalletsWallets ListWalletsWallets_WalletId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ListWalletsWallets"
    ADD CONSTRAINT "ListWalletsWallets_WalletId_fkey" FOREIGN KEY ("WalletId") REFERENCES public."Wallets"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 a   ALTER TABLE ONLY public."ListWalletsWallets" DROP CONSTRAINT "ListWalletsWallets_WalletId_fkey";
       public          postgres    false    3204    216    214            �           2606    21850    Revenues Revenues_WalletId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Revenues"
    ADD CONSTRAINT "Revenues_WalletId_fkey" FOREIGN KEY ("WalletId") REFERENCES public."Wallets"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."Revenues" DROP CONSTRAINT "Revenues_WalletId_fkey";
       public          postgres    false    214    218    3204            %   �   x�}ϱ1��ڞ�ztVl�q�fa
�`
jf�m�(P�b]��}�ch��<nǽ��ka`I	$������$���6�Ɨdg�QFM [�4�Y�5��
����K@	�T���e05&��b�Wm��{��u�c=1�Q+�n�̛��o1�����e�yb���P��J���ҏ�         -   x�3�4202�5��56P00�22�24�336�60�'e����� s�B      !   ?   x�u�1�0�9~{��vBy�GW�|:�iO޳x���K��s
�.6��|��x�+�      #   �   x�}б1��ڞ�]��ĉs��0
��pl�a����>���}{\�m��@PRQ]ė*'�U}m(�p���-%7M,Cq��z'p�V�ٽ%/@˭#�[�yo��Uj��&VL`�����X�e��_1�{�:���=�Qĳ��?n����Q����O��         u   x�3��̩L� N�$S�DO���J�,�r��|�J}� ��İ���4��0�*3ws�dW��=���R����"N###]]c#+#3+C=3#mS<R\1z\\\ %�"M         i   x�m�1@@F�z�z��w&�ݳ�J�J�
�0s#J����E7=l��&�]�pp�
m%(���,�CR����%z��!b����۠׳
 >� ���M�y"��&*     