PGDMP     :    0                {            indoorgardeners    15.1    15.1 _    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    69302    indoorgardeners    DATABASE     �   CREATE DATABASE indoorgardeners WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE indoorgardeners;
                postgres    false                        3079    69304 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    69314    address    TABLE     �   CREATE TABLE public.address (
    id bigint NOT NULL,
    address character varying(255),
    city character varying(255),
    house_number character varying(255),
    postal_code character varying(255)
);
    DROP TABLE public.address;
       public         heap    postgres    false            �            1259    69319    app_user    TABLE     t  CREATE TABLE public.app_user (
    id bigint NOT NULL,
    email character varying(255),
    enabled boolean,
    first_name character varying(255),
    last_name character varying(255),
    locked boolean,
    password character varying(255),
    phone_number character varying(255),
    basket_id bigint,
    billing_address_id bigint,
    delivery_address_id bigint
);
    DROP TABLE public.app_user;
       public         heap    postgres    false            �            1259    69324    app_user_app_user_roles    TABLE     x   CREATE TABLE public.app_user_app_user_roles (
    app_user_id bigint NOT NULL,
    app_user_roles_id bigint NOT NULL
);
 +   DROP TABLE public.app_user_app_user_roles;
       public         heap    postgres    false            �            1259    69327    app_user_orders    TABLE     h   CREATE TABLE public.app_user_orders (
    app_user_id bigint NOT NULL,
    orders_id bigint NOT NULL
);
 #   DROP TABLE public.app_user_orders;
       public         heap    postgres    false            �            1259    69330    app_user_role    TABLE     _   CREATE TABLE public.app_user_role (
    id bigint NOT NULL,
    name character varying(255)
);
 !   DROP TABLE public.app_user_role;
       public         heap    postgres    false            �            1259    69333    basket    TABLE     I   CREATE TABLE public.basket (
    id bigint NOT NULL,
    price bigint
);
    DROP TABLE public.basket;
       public         heap    postgres    false            �            1259    69336    basket_item    TABLE     h   CREATE TABLE public.basket_item (
    id bigint NOT NULL,
    quantity bigint,
    product_id bigint
);
    DROP TABLE public.basket_item;
       public         heap    postgres    false            �            1259    69339    basket_products    TABLE     h   CREATE TABLE public.basket_products (
    basket_id bigint NOT NULL,
    products_id bigint NOT NULL
);
 #   DROP TABLE public.basket_products;
       public         heap    postgres    false            �            1259    69342    branch_category    TABLE     j   CREATE TABLE public.branch_category (
    id bigint NOT NULL,
    category_name character varying(255)
);
 #   DROP TABLE public.branch_category;
       public         heap    postgres    false            �            1259    69345    branch_category_main_categories    TABLE     �   CREATE TABLE public.branch_category_main_categories (
    branch_category_id bigint NOT NULL,
    main_categories_id bigint NOT NULL
);
 3   DROP TABLE public.branch_category_main_categories;
       public         heap    postgres    false            �            1259    69348    category    TABLE     �   CREATE TABLE public.category (
    id bigint NOT NULL,
    category_name character varying(255),
    href character varying(255),
    parent_id bigint
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    69353    file_entity    TABLE     �   CREATE TABLE public.file_entity (
    id character varying(255) NOT NULL,
    content_type character varying(255),
    data bytea,
    name character varying(255),
    size bigint
);
    DROP TABLE public.file_entity;
       public         heap    postgres    false            �            1259    69358    hibernate_sequence    SEQUENCE     {   CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.hibernate_sequence;
       public          postgres    false            �            1259    69359 
   order_item    TABLE     g   CREATE TABLE public.order_item (
    id bigint NOT NULL,
    quantity bigint,
    product_id bigint
);
    DROP TABLE public.order_item;
       public         heap    postgres    false            �            1259    69362    order_items    TABLE     `   CREATE TABLE public.order_items (
    order_id bigint NOT NULL,
    items_id bigint NOT NULL
);
    DROP TABLE public.order_items;
       public         heap    postgres    false            �            1259    69365    order_products    TABLE     |   CREATE TABLE public.order_products (
    order_id bigint NOT NULL,
    products bigint,
    products_key bigint NOT NULL
);
 "   DROP TABLE public.order_products;
       public         heap    postgres    false            �            1259    69368    orderofuser    TABLE     �  CREATE TABLE public.orderofuser (
    id bigint NOT NULL,
    billing_name character varying(255),
    closed boolean NOT NULL,
    date timestamp without time zone,
    delivery_name character varying(255),
    email character varying(255),
    paid boolean NOT NULL,
    phone_number character varying(255),
    shipped boolean NOT NULL,
    app_user_id bigint,
    billing_address_id bigint,
    delivery_address_id bigint
);
    DROP TABLE public.orderofuser;
       public         heap    postgres    false            �            1259    69373    orderofuser_items    TABLE     f   CREATE TABLE public.orderofuser_items (
    order_id bigint NOT NULL,
    items_id bigint NOT NULL
);
 %   DROP TABLE public.orderofuser_items;
       public         heap    postgres    false            �            1259    69376    product    TABLE     �   CREATE TABLE public.product (
    id bigint NOT NULL,
    available boolean NOT NULL,
    description character varying(255),
    name character varying(255),
    price integer,
    stock integer
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    69381    product_category    TABLE     j   CREATE TABLE public.product_category (
    product_id bigint NOT NULL,
    category_id bigint NOT NULL
);
 $   DROP TABLE public.product_category;
       public         heap    postgres    false            �            1259    69384    product_pictures    TABLE     z   CREATE TABLE public.product_pictures (
    product_id bigint NOT NULL,
    pictures_id character varying(255) NOT NULL
);
 $   DROP TABLE public.product_pictures;
       public         heap    postgres    false            �            1259    69387    refresh_token    TABLE     �   CREATE TABLE public.refresh_token (
    id bigint NOT NULL,
    expiry_date timestamp without time zone,
    token character varying(255),
    app_user_id bigint
);
 !   DROP TABLE public.refresh_token;
       public         heap    postgres    false            �          0    69314    address 
   TABLE DATA           O   COPY public.address (id, address, city, house_number, postal_code) FROM stdin;
    public          postgres    false    215   �w       �          0    69319    app_user 
   TABLE DATA           �   COPY public.app_user (id, email, enabled, first_name, last_name, locked, password, phone_number, basket_id, billing_address_id, delivery_address_id) FROM stdin;
    public          postgres    false    216   9x       �          0    69324    app_user_app_user_roles 
   TABLE DATA           Q   COPY public.app_user_app_user_roles (app_user_id, app_user_roles_id) FROM stdin;
    public          postgres    false    217   �x       �          0    69327    app_user_orders 
   TABLE DATA           A   COPY public.app_user_orders (app_user_id, orders_id) FROM stdin;
    public          postgres    false    218   �x       �          0    69330    app_user_role 
   TABLE DATA           1   COPY public.app_user_role (id, name) FROM stdin;
    public          postgres    false    219   �x       �          0    69333    basket 
   TABLE DATA           +   COPY public.basket (id, price) FROM stdin;
    public          postgres    false    220   $y       �          0    69336    basket_item 
   TABLE DATA           ?   COPY public.basket_item (id, quantity, product_id) FROM stdin;
    public          postgres    false    221   Ey       �          0    69339    basket_products 
   TABLE DATA           A   COPY public.basket_products (basket_id, products_id) FROM stdin;
    public          postgres    false    222   by       �          0    69342    branch_category 
   TABLE DATA           <   COPY public.branch_category (id, category_name) FROM stdin;
    public          postgres    false    223   y       �          0    69345    branch_category_main_categories 
   TABLE DATA           a   COPY public.branch_category_main_categories (branch_category_id, main_categories_id) FROM stdin;
    public          postgres    false    224   �y       �          0    69348    category 
   TABLE DATA           F   COPY public.category (id, category_name, href, parent_id) FROM stdin;
    public          postgres    false    225   z       �          0    69353    file_entity 
   TABLE DATA           I   COPY public.file_entity (id, content_type, data, name, size) FROM stdin;
    public          postgres    false    226   �|       �          0    69359 
   order_item 
   TABLE DATA           >   COPY public.order_item (id, quantity, product_id) FROM stdin;
    public          postgres    false    228   �|       �          0    69362    order_items 
   TABLE DATA           9   COPY public.order_items (order_id, items_id) FROM stdin;
    public          postgres    false    229   �|       �          0    69365    order_products 
   TABLE DATA           J   COPY public.order_products (order_id, products, products_key) FROM stdin;
    public          postgres    false    230   �|       �          0    69368    orderofuser 
   TABLE DATA           �   COPY public.orderofuser (id, billing_name, closed, date, delivery_name, email, paid, phone_number, shipped, app_user_id, billing_address_id, delivery_address_id) FROM stdin;
    public          postgres    false    231   �|       �          0    69373    orderofuser_items 
   TABLE DATA           ?   COPY public.orderofuser_items (order_id, items_id) FROM stdin;
    public          postgres    false    232   }       �          0    69376    product 
   TABLE DATA           Q   COPY public.product (id, available, description, name, price, stock) FROM stdin;
    public          postgres    false    233   3}       �          0    69381    product_category 
   TABLE DATA           C   COPY public.product_category (product_id, category_id) FROM stdin;
    public          postgres    false    234   P}       �          0    69384    product_pictures 
   TABLE DATA           C   COPY public.product_pictures (product_id, pictures_id) FROM stdin;
    public          postgres    false    235   m}       �          0    69387    refresh_token 
   TABLE DATA           L   COPY public.refresh_token (id, expiry_date, token, app_user_id) FROM stdin;
    public          postgres    false    236   �}       �           0    0    hibernate_sequence    SEQUENCE SET     A   SELECT pg_catalog.setval('public.hibernate_sequence', 52, true);
          public          postgres    false    227            �           2606    69391    address address_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.address DROP CONSTRAINT address_pkey;
       public            postgres    false    215            �           2606    69393 4   app_user_app_user_roles app_user_app_user_roles_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.app_user_app_user_roles
    ADD CONSTRAINT app_user_app_user_roles_pkey PRIMARY KEY (app_user_id, app_user_roles_id);
 ^   ALTER TABLE ONLY public.app_user_app_user_roles DROP CONSTRAINT app_user_app_user_roles_pkey;
       public            postgres    false    217    217            �           2606    69395    app_user app_user_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.app_user DROP CONSTRAINT app_user_pkey;
       public            postgres    false    216            �           2606    69397     app_user_role app_user_role_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.app_user_role
    ADD CONSTRAINT app_user_role_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.app_user_role DROP CONSTRAINT app_user_role_pkey;
       public            postgres    false    219            �           2606    69399    basket_item basket_item_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.basket_item
    ADD CONSTRAINT basket_item_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.basket_item DROP CONSTRAINT basket_item_pkey;
       public            postgres    false    221            �           2606    69401    basket basket_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.basket DROP CONSTRAINT basket_pkey;
       public            postgres    false    220            �           2606    69403 $   branch_category branch_category_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.branch_category
    ADD CONSTRAINT branch_category_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.branch_category DROP CONSTRAINT branch_category_pkey;
       public            postgres    false    223            �           2606    69405    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    225            �           2606    69407    file_entity file_entity_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.file_entity
    ADD CONSTRAINT file_entity_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.file_entity DROP CONSTRAINT file_entity_pkey;
       public            postgres    false    226            �           2606    69409    order_item order_item_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.order_item DROP CONSTRAINT order_item_pkey;
       public            postgres    false    228            �           2606    69411 "   order_products order_products_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_pkey PRIMARY KEY (order_id, products_key);
 L   ALTER TABLE ONLY public.order_products DROP CONSTRAINT order_products_pkey;
       public            postgres    false    230    230            �           2606    69413    orderofuser orderofuser_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.orderofuser
    ADD CONSTRAINT orderofuser_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.orderofuser DROP CONSTRAINT orderofuser_pkey;
       public            postgres    false    231            �           2606    69415    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    233            �           2606    69417     refresh_token refresh_token_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT refresh_token_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.refresh_token DROP CONSTRAINT refresh_token_pkey;
       public            postgres    false    236            �           2606    69419 %   app_user uk_1j9d9a06i600gd43uu3km82jw 
   CONSTRAINT     a   ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT uk_1j9d9a06i600gd43uu3km82jw UNIQUE (email);
 O   ALTER TABLE ONLY public.app_user DROP CONSTRAINT uk_1j9d9a06i600gd43uu3km82jw;
       public            postgres    false    216            �           2606    69421 ,   branch_category uk_20vcaixhssy9tls6j6mthod34 
   CONSTRAINT     p   ALTER TABLE ONLY public.branch_category
    ADD CONSTRAINT uk_20vcaixhssy9tls6j6mthod34 UNIQUE (category_name);
 V   ALTER TABLE ONLY public.branch_category DROP CONSTRAINT uk_20vcaixhssy9tls6j6mthod34;
       public            postgres    false    223            �           2606    69423 ,   basket_products uk_4te9vkdky24an6ar37ef5tlos 
   CONSTRAINT     n   ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT uk_4te9vkdky24an6ar37ef5tlos UNIQUE (products_id);
 V   ALTER TABLE ONLY public.basket_products DROP CONSTRAINT uk_4te9vkdky24an6ar37ef5tlos;
       public            postgres    false    222            �           2606    69425 <   branch_category_main_categories uk_7cx9l47gc3d1f8swucjmv3imy 
   CONSTRAINT     �   ALTER TABLE ONLY public.branch_category_main_categories
    ADD CONSTRAINT uk_7cx9l47gc3d1f8swucjmv3imy UNIQUE (main_categories_id);
 f   ALTER TABLE ONLY public.branch_category_main_categories DROP CONSTRAINT uk_7cx9l47gc3d1f8swucjmv3imy;
       public            postgres    false    224            �           2606    69427 -   product_pictures uk_96w7rol5yoa2px5i84nhlxafh 
   CONSTRAINT     o   ALTER TABLE ONLY public.product_pictures
    ADD CONSTRAINT uk_96w7rol5yoa2px5i84nhlxafh UNIQUE (pictures_id);
 W   ALTER TABLE ONLY public.product_pictures DROP CONSTRAINT uk_96w7rol5yoa2px5i84nhlxafh;
       public            postgres    false    235            �           2606    69429 (   order_items uk_d0vxbj4gqklaa3ro4kja2h72x 
   CONSTRAINT     g   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT uk_d0vxbj4gqklaa3ro4kja2h72x UNIQUE (items_id);
 R   ALTER TABLE ONLY public.order_items DROP CONSTRAINT uk_d0vxbj4gqklaa3ro4kja2h72x;
       public            postgres    false    229            �           2606    69431 ,   app_user_orders uk_gwx84wp7pmcp50qq15owx0cwn 
   CONSTRAINT     l   ALTER TABLE ONLY public.app_user_orders
    ADD CONSTRAINT uk_gwx84wp7pmcp50qq15owx0cwn UNIQUE (orders_id);
 V   ALTER TABLE ONLY public.app_user_orders DROP CONSTRAINT uk_gwx84wp7pmcp50qq15owx0cwn;
       public            postgres    false    218            �           2606    69433 %   category uk_lroeo5fvfdeg4hpicn4lw7x9b 
   CONSTRAINT     i   ALTER TABLE ONLY public.category
    ADD CONSTRAINT uk_lroeo5fvfdeg4hpicn4lw7x9b UNIQUE (category_name);
 O   ALTER TABLE ONLY public.category DROP CONSTRAINT uk_lroeo5fvfdeg4hpicn4lw7x9b;
       public            postgres    false    225            �           2606    69435 *   refresh_token uk_r4k4edos30bx9neoq81mdvwph 
   CONSTRAINT     f   ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT uk_r4k4edos30bx9neoq81mdvwph UNIQUE (token);
 T   ALTER TABLE ONLY public.refresh_token DROP CONSTRAINT uk_r4k4edos30bx9neoq81mdvwph;
       public            postgres    false    236            �           2606    69437 -   orderofuser_items uk_vfosm3yqvmqtlsqc5qey2txa 
   CONSTRAINT     l   ALTER TABLE ONLY public.orderofuser_items
    ADD CONSTRAINT uk_vfosm3yqvmqtlsqc5qey2txa UNIQUE (items_id);
 W   ALTER TABLE ONLY public.orderofuser_items DROP CONSTRAINT uk_vfosm3yqvmqtlsqc5qey2txa;
       public            postgres    false    232            �           2606    69438 ,   product_category fk2k3smhbruedlcrvu6clued06x    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT fk2k3smhbruedlcrvu6clued06x FOREIGN KEY (product_id) REFERENCES public.product(id);
 V   ALTER TABLE ONLY public.product_category DROP CONSTRAINT fk2k3smhbruedlcrvu6clued06x;
       public          postgres    false    233    234    3295            �           2606    69443 '   orderofuser fk2tt86ypd4ntk7qrk6oho2k5of    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderofuser
    ADD CONSTRAINT fk2tt86ypd4ntk7qrk6oho2k5of FOREIGN KEY (app_user_id) REFERENCES public.app_user(id);
 Q   ALTER TABLE ONLY public.orderofuser DROP CONSTRAINT fk2tt86ypd4ntk7qrk6oho2k5of;
       public          postgres    false    231    216    3257            �           2606    69448 +   basket_products fk3nksxc87yys2os1w7cwlekka7    FK CONSTRAINT     �   ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT fk3nksxc87yys2os1w7cwlekka7 FOREIGN KEY (products_id) REFERENCES public.basket_item(id);
 U   ALTER TABLE ONLY public.basket_products DROP CONSTRAINT fk3nksxc87yys2os1w7cwlekka7;
       public          postgres    false    221    222    3269            �           2606    69453 -   orderofuser_items fk3xm6flqjo8xaicwjp66sxcjug    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderofuser_items
    ADD CONSTRAINT fk3xm6flqjo8xaicwjp66sxcjug FOREIGN KEY (order_id) REFERENCES public.orderofuser(id);
 W   ALTER TABLE ONLY public.orderofuser_items DROP CONSTRAINT fk3xm6flqjo8xaicwjp66sxcjug;
       public          postgres    false    231    3291    232            �           2606    69458 &   order_item fk551losx9j75ss5d6bfsqvijna    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT fk551losx9j75ss5d6bfsqvijna FOREIGN KEY (product_id) REFERENCES public.product(id);
 P   ALTER TABLE ONLY public.order_item DROP CONSTRAINT fk551losx9j75ss5d6bfsqvijna;
       public          postgres    false    228    233    3295            �           2606    69463 $   app_user fk6kfnrff34b4jcap9oiwqvmsb6    FK CONSTRAINT     �   ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT fk6kfnrff34b4jcap9oiwqvmsb6 FOREIGN KEY (basket_id) REFERENCES public.basket(id);
 N   ALTER TABLE ONLY public.app_user DROP CONSTRAINT fk6kfnrff34b4jcap9oiwqvmsb6;
       public          postgres    false    216    220    3267            �           2606    69468 3   app_user_app_user_roles fk8e2v1rmbd8nee9vje8qbgb83n    FK CONSTRAINT     �   ALTER TABLE ONLY public.app_user_app_user_roles
    ADD CONSTRAINT fk8e2v1rmbd8nee9vje8qbgb83n FOREIGN KEY (app_user_id) REFERENCES public.app_user(id);
 ]   ALTER TABLE ONLY public.app_user_app_user_roles DROP CONSTRAINT fk8e2v1rmbd8nee9vje8qbgb83n;
       public          postgres    false    217    216    3257            �           2606    69473 3   app_user_app_user_roles fka7pbvm93c80ufed9exydync0a    FK CONSTRAINT     �   ALTER TABLE ONLY public.app_user_app_user_roles
    ADD CONSTRAINT fka7pbvm93c80ufed9exydync0a FOREIGN KEY (app_user_roles_id) REFERENCES public.app_user_role(id);
 ]   ALTER TABLE ONLY public.app_user_app_user_roles DROP CONSTRAINT fka7pbvm93c80ufed9exydync0a;
       public          postgres    false    219    3265    217            �           2606    69478 ,   product_pictures fkbnhx8ewo7dcxm4je7jxs3k6t3    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_pictures
    ADD CONSTRAINT fkbnhx8ewo7dcxm4je7jxs3k6t3 FOREIGN KEY (pictures_id) REFERENCES public.file_entity(id);
 V   ALTER TABLE ONLY public.product_pictures DROP CONSTRAINT fkbnhx8ewo7dcxm4je7jxs3k6t3;
       public          postgres    false    235    226    3283            �           2606    69483 )   refresh_token fkdwy9vc8w0fy8u7f37wgjh0onk    FK CONSTRAINT     �   ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT fkdwy9vc8w0fy8u7f37wgjh0onk FOREIGN KEY (app_user_id) REFERENCES public.app_user(id);
 S   ALTER TABLE ONLY public.refresh_token DROP CONSTRAINT fkdwy9vc8w0fy8u7f37wgjh0onk;
       public          postgres    false    216    236    3257            �           2606    69488 '   orderofuser fkfvdao2tjytxerscwmo5muao10    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderofuser
    ADD CONSTRAINT fkfvdao2tjytxerscwmo5muao10 FOREIGN KEY (billing_address_id) REFERENCES public.address(id);
 Q   ALTER TABLE ONLY public.orderofuser DROP CONSTRAINT fkfvdao2tjytxerscwmo5muao10;
       public          postgres    false    3255    215    231            �           2606    69493 '   basket_item fkh4prhjkyv0umn63ebttoq9wl3    FK CONSTRAINT     �   ALTER TABLE ONLY public.basket_item
    ADD CONSTRAINT fkh4prhjkyv0umn63ebttoq9wl3 FOREIGN KEY (product_id) REFERENCES public.product(id);
 Q   ALTER TABLE ONLY public.basket_item DROP CONSTRAINT fkh4prhjkyv0umn63ebttoq9wl3;
       public          postgres    false    221    233    3295            �           2606    69498 ,   product_pictures fkhhrqwwvq0v1pgtlo5jt943uh2    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_pictures
    ADD CONSTRAINT fkhhrqwwvq0v1pgtlo5jt943uh2 FOREIGN KEY (product_id) REFERENCES public.product(id);
 V   ALTER TABLE ONLY public.product_pictures DROP CONSTRAINT fkhhrqwwvq0v1pgtlo5jt943uh2;
       public          postgres    false    233    3295    235            �           2606    69503 ;   branch_category_main_categories fkirlc70khsode87tm5swr7afsv    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_category_main_categories
    ADD CONSTRAINT fkirlc70khsode87tm5swr7afsv FOREIGN KEY (main_categories_id) REFERENCES public.category(id);
 e   ALTER TABLE ONLY public.branch_category_main_categories DROP CONSTRAINT fkirlc70khsode87tm5swr7afsv;
       public          postgres    false    3279    225    224            �           2606    69508 ,   product_category fkkud35ls1d40wpjb5htpp14q4e    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT fkkud35ls1d40wpjb5htpp14q4e FOREIGN KEY (category_id) REFERENCES public.category(id);
 V   ALTER TABLE ONLY public.product_category DROP CONSTRAINT fkkud35ls1d40wpjb5htpp14q4e;
       public          postgres    false    234    225    3279            �           2606    69513 +   basket_products fklf7fabaqrkluttrqcbdiknoci    FK CONSTRAINT     �   ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT fklf7fabaqrkluttrqcbdiknoci FOREIGN KEY (basket_id) REFERENCES public.basket(id);
 U   ALTER TABLE ONLY public.basket_products DROP CONSTRAINT fklf7fabaqrkluttrqcbdiknoci;
       public          postgres    false    222    3267    220            �           2606    69518 -   orderofuser_items fkmcdtr0n75l1qtrbhstp83h02b    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderofuser_items
    ADD CONSTRAINT fkmcdtr0n75l1qtrbhstp83h02b FOREIGN KEY (items_id) REFERENCES public.order_item(id);
 W   ALTER TABLE ONLY public.orderofuser_items DROP CONSTRAINT fkmcdtr0n75l1qtrbhstp83h02b;
       public          postgres    false    232    228    3285            �           2606    69523 ;   branch_category_main_categories fkmto9sucaf9qev7fndt4f5ujly    FK CONSTRAINT     �   ALTER TABLE ONLY public.branch_category_main_categories
    ADD CONSTRAINT fkmto9sucaf9qev7fndt4f5ujly FOREIGN KEY (branch_category_id) REFERENCES public.branch_category(id);
 e   ALTER TABLE ONLY public.branch_category_main_categories DROP CONSTRAINT fkmto9sucaf9qev7fndt4f5ujly;
       public          postgres    false    223    224    3273            �           2606    69528 $   app_user fkocfrnsk84ehyjcchbh7t6bwtt    FK CONSTRAINT     �   ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT fkocfrnsk84ehyjcchbh7t6bwtt FOREIGN KEY (delivery_address_id) REFERENCES public.address(id);
 N   ALTER TABLE ONLY public.app_user DROP CONSTRAINT fkocfrnsk84ehyjcchbh7t6bwtt;
       public          postgres    false    3255    215    216            �           2606    69533 '   orderofuser fkoksp4e9ge9gsab11pqvd6rwrl    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderofuser
    ADD CONSTRAINT fkoksp4e9ge9gsab11pqvd6rwrl FOREIGN KEY (delivery_address_id) REFERENCES public.address(id);
 Q   ALTER TABLE ONLY public.orderofuser DROP CONSTRAINT fkoksp4e9ge9gsab11pqvd6rwrl;
       public          postgres    false    215    231    3255            �           2606    69538 $   app_user fkq16521tpo579x4kj3r6gbhpb8    FK CONSTRAINT     �   ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT fkq16521tpo579x4kj3r6gbhpb8 FOREIGN KEY (billing_address_id) REFERENCES public.address(id);
 N   ALTER TABLE ONLY public.app_user DROP CONSTRAINT fkq16521tpo579x4kj3r6gbhpb8;
       public          postgres    false    215    216    3255            �   -   x�3�N�-�IU(.)JM-���/J�/�444�06������ ��	�      �   q   x�3�LL���s �z����%(�Ʃb��bh�b�b\���lV\QUU�_�Z���S�Pad�T���d��_ȩmlfl`ddd���1~@����� �R"�      �      x�3�4����� "      �      x������ � �      �      x�3�v�2�tt�������� ,>�      �      x�3�4������ z!      �      x������ � �      �      x������ � �      �   A   x�3��I�+)�2�t/�/��KW.-(��L-�21�tIM�/J,�,KUpLNN-.�/���qqq F�      �   /   x�3�44�2�44�\�F�@�� D�r�p��Iے+F��� �<\      �   f  x�mT�n1=s�B?�³؎�iV�q4F|�E�e��Ȑ��ח�f�4����㈤����$�ɨ6x���;��W��COBJ�8{�R�h�B��c�U���A��g>��9\�سrZ��,�,�F�
]-@E��Sxm�5�y����m���W��z���7/f��?!��䰶�ti�y��*�z�Ǔ�k7"�J`��Ax�m�ON��E�9�Q(���8�b��=����x� >��yV,�I�=�
D&l�0?w�4����Fˑ-0�`+�Ig�&�����(�6��r�����aOe�6�����Nt(gYY�Y�[kwi|O&�p��9Z@v��Vؽڱ� ��~i�!"�'��B�9<�CM����i7����3���s���\­9Y��DyO����u��d���b���P|�K��219DcU��[kw�6�+r�-�F�lB;G�O�U�U%�U�׮'7}���Y��4'd���N���:��םG�.`-$�K�)�I(�fT��2�nmO���iQ�M
}�K�F���0�Ʉ~���k�݉��ը�݀��{9�{��˛
�Z�v~���9�)��u�w��C��[�F9'�E�q41��#˲�#Ų      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     