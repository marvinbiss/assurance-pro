-- ============================================================
-- 008_villes_seed.sql
-- Table villes pour pSEO géographique futur (extension au-delà des 84 villes top).
-- Stocke INSEE codes + densité d'artisans/freelances.
-- ============================================================

create table if not exists public.villes (
  slug text primary key,
  nom text not null,
  code_insee text not null unique,
  code_postal text not null,
  departement_code text not null,
  departement_nom text not null,
  region_slug text not null,
  region_nom text not null,
  population int not null default 0,
  artisans_btp_estime int not null default 0,
  freelances_estime int not null default 0,
  zonage_risque text check (zonage_risque in ('urbain_dense','urbain','periurbain','rural')),
  is_top_100 boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_villes_region on public.villes (region_slug);
create index if not exists idx_villes_dep on public.villes (departement_code);
create index if not exists idx_villes_top on public.villes (is_top_100) where is_top_100 = true;

alter table public.villes enable row level security;

drop policy if exists "villes_public_read" on public.villes;
create policy "villes_public_read" on public.villes for select using (true);

drop policy if exists "villes_no_public_write" on public.villes;
create policy "villes_no_public_write" on public.villes for insert with check (false);

comment on table public.villes is
  'Top villes France pour pSEO géographique. RLS : lecture publique, écriture service_role uniquement.';

-- ─────────────────────────────────────────────────────────────
-- Seed top villes (extrait des 84 villes prioritaires hardcodées dans
-- src/lib/data/villes-top100.ts — voir le fichier pour la source d'autorité).
-- ─────────────────────────────────────────────────────────────

insert into public.villes (slug, nom, code_insee, code_postal, departement_code, departement_nom, region_slug, region_nom, population, artisans_btp_estime, freelances_estime, zonage_risque, is_top_100)
values
  ('paris','Paris','75056','75001','75','Paris','ile-de-france','Île-de-France',2102650,38000,165000,'urbain_dense',true),
  ('marseille','Marseille','13055','13001','13','Bouches-du-Rhône','provence-alpes-cote-d-azur','Provence-Alpes-Côte d''Azur',873076,18500,42000,'urbain_dense',true),
  ('lyon','Lyon','69123','69001','69','Rhône','auvergne-rhone-alpes','Auvergne-Rhône-Alpes',522250,14000,56000,'urbain_dense',true),
  ('toulouse','Toulouse','31555','31000','31','Haute-Garonne','occitanie','Occitanie',498003,12500,38000,'urbain_dense',true),
  ('nice','Nice','06088','06000','06','Alpes-Maritimes','provence-alpes-cote-d-azur','Provence-Alpes-Côte d''Azur',348085,9000,22000,'urbain_dense',true),
  ('nantes','Nantes','44109','44000','44','Loire-Atlantique','pays-de-la-loire','Pays de la Loire',320732,8500,28000,'urbain_dense',true),
  ('montpellier','Montpellier','34172','34000','34','Hérault','occitanie','Occitanie',299096,7500,24000,'urbain_dense',true),
  ('strasbourg','Strasbourg','67482','67000','67','Bas-Rhin','grand-est','Grand Est',287228,7800,19000,'urbain_dense',true),
  ('bordeaux','Bordeaux','33063','33000','33','Gironde','nouvelle-aquitaine','Nouvelle-Aquitaine',260958,7200,21000,'urbain_dense',true),
  ('lille','Lille','59350','59000','59','Nord','hauts-de-france','Hauts-de-France',236234,6500,17000,'urbain_dense',true),
  ('rennes','Rennes','35238','35000','35','Ille-et-Vilaine','bretagne','Bretagne',220488,5800,18000,'urbain',true),
  ('reims','Reims','51454','51100','51','Marne','grand-est','Grand Est',182592,4900,9500,'urbain',true),
  ('saint-etienne','Saint-Étienne','42218','42000','42','Loire','auvergne-rhone-alpes','Auvergne-Rhône-Alpes',172565,4500,9200,'urbain',true),
  ('toulon','Toulon','83137','83000','83','Var','provence-alpes-cote-d-azur','Provence-Alpes-Côte d''Azur',175227,4700,9800,'urbain',true),
  ('le-havre','Le Havre','76351','76600','76','Seine-Maritime','normandie','Normandie',165830,4400,7800,'urbain',true),
  ('grenoble','Grenoble','38185','38000','38','Isère','auvergne-rhone-alpes','Auvergne-Rhône-Alpes',158346,4200,14500,'urbain',true),
  ('dijon','Dijon','21231','21000','21','Côte-d''Or','bourgogne-franche-comte','Bourgogne-Franche-Comté',156920,4100,8800,'urbain',true),
  ('angers','Angers','49007','49000','49','Maine-et-Loire','pays-de-la-loire','Pays de la Loire',154508,4000,9100,'urbain',true),
  ('villeurbanne','Villeurbanne','69266','69100','69','Rhône','auvergne-rhone-alpes','Auvergne-Rhône-Alpes',152715,3800,11000,'urbain_dense',true),
  ('saint-denis-reunion','Saint-Denis (Réunion)','97411','97400','974','La Réunion','la-reunion','La Réunion',153810,4000,6500,'urbain',true),
  ('nimes','Nîmes','30189','30000','30','Gard','occitanie','Occitanie',148236,3900,7200,'urbain',true),
  ('clermont-ferrand','Clermont-Ferrand','63113','63000','63','Puy-de-Dôme','auvergne-rhone-alpes','Auvergne-Rhône-Alpes',146734,3700,8200,'urbain',true),
  ('le-mans','Le Mans','72181','72000','72','Sarthe','pays-de-la-loire','Pays de la Loire',146105,3700,6500,'urbain',true),
  ('aix-en-provence','Aix-en-Provence','13001','13100','13','Bouches-du-Rhône','provence-alpes-cote-d-azur','Provence-Alpes-Côte d''Azur',145133,3800,12500,'urbain',true),
  ('brest','Brest','29019','29200','29','Finistère','bretagne','Bretagne',139602,3600,6400,'urbain',true),
  ('tours','Tours','37261','37000','37','Indre-et-Loire','centre-val-de-loire','Centre-Val de Loire',137658,3500,7800,'urbain',true),
  ('amiens','Amiens','80021','80000','80','Somme','hauts-de-france','Hauts-de-France',134706,3400,6100,'urbain',true),
  ('limoges','Limoges','87085','87000','87','Haute-Vienne','nouvelle-aquitaine','Nouvelle-Aquitaine',130876,3300,5800,'urbain',true),
  ('annecy','Annecy','74010','74000','74','Haute-Savoie','auvergne-rhone-alpes','Auvergne-Rhône-Alpes',130721,3500,7500,'urbain',true),
  ('boulogne-billancourt','Boulogne-Billancourt','92012','92100','92','Hauts-de-Seine','ile-de-france','Île-de-France',121334,2800,12000,'urbain_dense',true),
  ('perpignan','Perpignan','66136','66000','66','Pyrénées-Orientales','occitanie','Occitanie',119344,3200,5200,'urbain',true),
  ('besancon','Besançon','25056','25000','25','Doubs','bourgogne-franche-comte','Bourgogne-Franche-Comté',117000,3000,5500,'urbain',true),
  ('orleans','Orléans','45234','45000','45','Loiret','centre-val-de-loire','Centre-Val de Loire',116685,3000,6500,'urbain',true),
  ('metz','Metz','57463','57000','57','Moselle','grand-est','Grand Est',116429,3100,5800,'urbain',true),
  ('saint-denis','Saint-Denis','93066','93200','93','Seine-Saint-Denis','ile-de-france','Île-de-France',113116,3500,6800,'urbain_dense',true),
  ('rouen','Rouen','76540','76000','76','Seine-Maritime','normandie','Normandie',112321,2900,6200,'urbain',true),
  ('argenteuil','Argenteuil','95018','95100','95','Val-d''Oise','ile-de-france','Île-de-France',110210,2700,5800,'urbain_dense',true),
  ('montreuil','Montreuil','93048','93100','93','Seine-Saint-Denis','ile-de-france','Île-de-France',109897,2600,8500,'urbain_dense',true),
  ('mulhouse','Mulhouse','68224','68100','68','Haut-Rhin','grand-est','Grand Est',108940,2900,4500,'urbain',true),
  ('caen','Caen','14118','14000','14','Calvados','normandie','Normandie',105512,2800,5400,'urbain',true),
  ('nancy','Nancy','54395','54000','54','Meurthe-et-Moselle','grand-est','Grand Est',104592,2700,5500,'urbain',true),
  ('saint-paul','Saint-Paul (Réunion)','97415','97411','974','La Réunion','la-reunion','La Réunion',103886,3000,4200,'urbain',true),
  ('roubaix','Roubaix','59512','59100','59','Nord','hauts-de-france','Hauts-de-France',98828,2500,3800,'urbain_dense',true),
  ('tourcoing','Tourcoing','59599','59200','59','Nord','hauts-de-france','Hauts-de-France',97442,2400,3500,'urbain',true),
  ('nanterre','Nanterre','92050','92000','92','Hauts-de-Seine','ile-de-france','Île-de-France',96807,2300,9500,'urbain_dense',true),
  ('vitry-sur-seine','Vitry-sur-Seine','94081','94400','94','Val-de-Marne','ile-de-france','Île-de-France',95567,2200,5800,'urbain_dense',true),
  ('avignon','Avignon','84007','84000','84','Vaucluse','provence-alpes-cote-d-azur','Provence-Alpes-Côte d''Azur',91143,2400,4200,'urbain',true),
  ('creteil','Créteil','94028','94000','94','Val-de-Marne','ile-de-france','Île-de-France',91042,2200,6200,'urbain_dense',true),
  ('poitiers','Poitiers','86194','86000','86','Vienne','nouvelle-aquitaine','Nouvelle-Aquitaine',88291,2200,4100,'urbain',true),
  ('dunkerque','Dunkerque','59183','59140','59','Nord','hauts-de-france','Hauts-de-France',87353,2300,3400,'urbain',true),
  ('asnieres-sur-seine','Asnières-sur-Seine','92004','92600','92','Hauts-de-Seine','ile-de-france','Île-de-France',87217,2100,7500,'urbain_dense',true),
  ('aulnay-sous-bois','Aulnay-sous-Bois','93005','93600','93','Seine-Saint-Denis','ile-de-france','Île-de-France',86742,2100,4800,'urbain_dense',true),
  ('colombes','Colombes','92025','92700','92','Hauts-de-Seine','ile-de-france','Île-de-France',86621,2000,6200,'urbain_dense',true),
  ('versailles','Versailles','78646','78000','78','Yvelines','ile-de-france','Île-de-France',85771,2000,7800,'urbain',true),
  ('saint-maur-des-fosses','Saint-Maur-des-Fossés','94068','94100','94','Val-de-Marne','ile-de-france','Île-de-France',75103,1800,5500,'urbain',true),
  ('rueil-malmaison','Rueil-Malmaison','92063','92500','92','Hauts-de-Seine','ile-de-france','Île-de-France',78641,1900,7100,'urbain',true),
  ('champigny-sur-marne','Champigny-sur-Marne','94017','94500','94','Val-de-Marne','ile-de-france','Île-de-France',77949,1800,4200,'urbain_dense',true),
  ('fort-de-france','Fort-de-France','97209','97200','972','Martinique','martinique','Martinique',75516,2000,3200,'urbain',true),
  ('pau','Pau','64445','64000','64','Pyrénées-Atlantiques','nouvelle-aquitaine','Nouvelle-Aquitaine',76215,2000,4400,'urbain',true),
  ('la-rochelle','La Rochelle','17300','17000','17','Charente-Maritime','nouvelle-aquitaine','Nouvelle-Aquitaine',78535,2100,4500,'urbain',true),
  ('calais','Calais','62193','62100','62','Pas-de-Calais','hauts-de-france','Hauts-de-France',73911,1900,2800,'urbain',true),
  ('antibes','Antibes','06004','06600','06','Alpes-Maritimes','provence-alpes-cote-d-azur','Provence-Alpes-Côte d''Azur',73798,2000,5200,'urbain',true),
  ('cannes','Cannes','06029','06400','06','Alpes-Maritimes','provence-alpes-cote-d-azur','Provence-Alpes-Côte d''Azur',73603,2100,5800,'urbain',true),
  ('saint-nazaire','Saint-Nazaire','44184','44600','44','Loire-Atlantique','pays-de-la-loire','Pays de la Loire',71880,1900,3500,'urbain',true),
  ('merignac','Mérignac','33281','33700','33','Gironde','nouvelle-aquitaine','Nouvelle-Aquitaine',71855,1700,5200,'urbain',true),
  ('mamoudzou','Mamoudzou','97611','97600','976','Mayotte','mayotte','Mayotte',71437,1500,1900,'urbain',true),
  ('issy-les-moulineaux','Issy-les-Moulineaux','92040','92130','92','Hauts-de-Seine','ile-de-france','Île-de-France',68451,1500,8200,'urbain_dense',true),
  ('colmar','Colmar','68066','68000','68','Haut-Rhin','grand-est','Grand Est',68784,1800,2900,'urbain',true),
  ('noisy-le-grand','Noisy-le-Grand','93051','93160','93','Seine-Saint-Denis','ile-de-france','Île-de-France',67200,1500,4800,'urbain_dense',true),
  ('evry-courcouronnes','Évry-Courcouronnes','91228','91000','91','Essonne','ile-de-france','Île-de-France',67085,1600,4100,'urbain_dense',true),
  ('cergy','Cergy','95127','95000','95','Val-d''Oise','ile-de-france','Île-de-France',66155,1500,4500,'urbain_dense',true),
  ('cayenne','Cayenne','97302','97300','973','Guyane','guyane','Guyane',65493,1700,2400,'urbain',true),
  ('valence','Valence','26362','26000','26','Drôme','auvergne-rhone-alpes','Auvergne-Rhône-Alpes',64726,1700,3300,'urbain',true),
  ('levallois-perret','Levallois-Perret','92044','92300','92','Hauts-de-Seine','ile-de-france','Île-de-France',64676,1300,8500,'urbain_dense',true),
  ('quimper','Quimper','29232','29000','29','Finistère','bretagne','Bretagne',62985,1700,3000,'urbain',true),
  ('troyes','Troyes','10387','10000','10','Aube','grand-est','Grand Est',61652,1700,2800,'urbain',true),
  ('chambery','Chambéry','73065','73000','73','Savoie','auvergne-rhone-alpes','Auvergne-Rhône-Alpes',59112,1700,3600,'urbain',true),
  ('lorient','Lorient','56121','56100','56','Morbihan','bretagne','Bretagne',57149,1500,2700,'urbain',true),
  ('beauvais','Beauvais','60057','60000','60','Oise','hauts-de-france','Hauts-de-France',56020,1500,2300,'urbain',true),
  ('la-roche-sur-yon','La Roche-sur-Yon','85191','85000','85','Vendée','pays-de-la-loire','Pays de la Loire',53865,1500,2300,'urbain',true),
  ('cholet','Cholet','49099','49300','49','Maine-et-Loire','pays-de-la-loire','Pays de la Loire',53827,1400,2100,'urbain',true),
  ('la-courneuve','La Courneuve','93027','93120','93','Seine-Saint-Denis','ile-de-france','Île-de-France',43810,1100,1800,'urbain_dense',true),
  ('bethune','Béthune','62119','62400','62','Pas-de-Calais','hauts-de-france','Hauts-de-France',24800,850,1100,'periurbain',true),
  ('pointe-a-pitre','Pointe-à-Pitre','97120','97110','971','Guadeloupe','guadeloupe','Guadeloupe',14844,380,720,'urbain',true)
on conflict (slug) do update set
  population = excluded.population,
  artisans_btp_estime = excluded.artisans_btp_estime,
  freelances_estime = excluded.freelances_estime,
  is_top_100 = true;

-- ─────────────────────────────────────────────────────────────
-- View utilitaire : count par région (utile pour pages /regions/[slug])
-- ─────────────────────────────────────────────────────────────

create or replace view public.v_villes_par_region as
select
  region_slug,
  region_nom,
  count(*)::int as nb_villes,
  sum(population)::bigint as population_totale,
  sum(artisans_btp_estime)::bigint as artisans_btp_total,
  sum(freelances_estime)::bigint as freelances_total
from public.villes
where is_top_100 = true
group by region_slug, region_nom
order by population_totale desc;

comment on view public.v_villes_par_region is
  'Agrégation par région des top villes pour pages /regions et menus dynamiques.';
