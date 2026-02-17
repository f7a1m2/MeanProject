CREATE TABLE IF NOT EXISTS "Utilisateur" (
	"id" bigint NOT NULL UNIQUE,
	"nom" VARCHAR(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"mot_de_passe" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Centre_commmercial" (
	"id" serial NOT NULL UNIQUE,
	"nom" varchar(255) NOT NULL,
	"heure_ouverture" timestamp with time zone NOT NULL,
	"heure_fermeture" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "batiment" (
	"id" serial NOT NULL UNIQUE,
	"nom" varchar(255) NOT NULL,
	"centre_commercial" bigint NOT NULL,
	"type_batiment" bigint NOT NULL,
	"nbr_etage" numeric(10,0) NOT NULL,
	"surface_etage" numeric(10,0) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Salle" (
	"id" serial NOT NULL UNIQUE,
	"batiment" bigint NOT NULL,
	"numero_salle" varchar(255) NOT NULL UNIQUE,
	"numero_etage" numeric(10,0),
	"espace_utiliser" numeric(10,0) NOT NULL,
	"cout" numeric(10,0) NOT NULL,
	"type_salle" bigint NOT NULL,
	"disponibiliter" bigint NOT NULL UNIQUE,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Salle_boutique" (
	"id" serial NOT NULL UNIQUE,
	"salle" bigint NOT NULL,
	"utilisateur" bigint NOT NULL,
	"date_allocation" date NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "type_batiment" (
	"id" serial NOT NULL UNIQUE,
	"type" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "type_salle" (
	"id" serial NOT NULL UNIQUE,
	"type" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "status" (
	"id" serial NOT NULL UNIQUE,
	"designation" varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Historique_salle" (
	"id" serial NOT NULL UNIQUE,
	"idSalle" bigint NOT NULL,
	"idUtilisateur" bigint NOT NULL,
	"dateDebut" timestamp with time zone NOT NULL UNIQUE,
	"dateFin" timestamp with time zone NOT NULL UNIQUE,
	"status" bigint NOT NULL,
	"revenu_generer" numeric(10,0) NOT NULL,
	PRIMARY KEY ("id")
);
CREATE TABLE IF NOT EXISTS "Type_produit" (
	"id" serial NOT NULL UNIQUE,
	"designation" numeric(10,0) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Produit" (
	"id" serial NOT NULL UNIQUE,
	"designation" numeric(10,0) NOT NULL,
	"type" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Prix_vente_produit_par_boutique" (
	"id" serial NOT NULL UNIQUE,
	"prix" numeric(10,0) NOT NULL,
	"boutique" bigint NOT NULL,
	"date" timestamp without time zone NOT NULL,
	"produit" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "mouvement_produit" (
	"id" serial NOT NULL UNIQUE,
	"type(entrée_ou_sortie)" bigint NOT NULL,
	"date_mouvement" timestamp without time zone NOT NULL,
	"prix" numeric(10,0) NOT NULL,
	"quantité" numeric(10,0) NOT NULL,
	"boutique" bigint NOT NULL,
	"produit" bigint NOT NULL,
	"destinataire_utilisateur" bigint NOT NULL,
	PRIMARY KEY ("id")
);


CREATE TABLE IF NOT EXISTS "Transaction_solde" (
	"id" serial NOT NULL UNIQUE,
	"utilisateur" bigint NOT NULL,
	"type" varchar(255) NOT NULL,
	"montant" numeric(10,0) NOT NULL,
	"date" timestamp without time zone NOT NULL,
	PRIMARY KEY ("id")
);



ALTER TABLE "batiment" ADD CONSTRAINT "batiment_fk2" FOREIGN KEY ("centre_commercial") REFERENCES "Centre_commmercial"("id");

ALTER TABLE "batiment" ADD CONSTRAINT "batiment_fk3" FOREIGN KEY ("type_batiment") REFERENCES "type_batiment"("id");
ALTER TABLE "Salle" ADD CONSTRAINT "Salle_fk1" FOREIGN KEY ("batiment") REFERENCES "batiment"("id");

ALTER TABLE "Salle" ADD CONSTRAINT "Salle_fk6" FOREIGN KEY ("type_salle") REFERENCES "type_salle"("id");

ALTER TABLE "Salle" ADD CONSTRAINT "Salle_fk7" FOREIGN KEY ("disponibiliter") REFERENCES "status"("id");
ALTER TABLE "Salle_boutique" ADD CONSTRAINT "Salle_boutique_fk1" FOREIGN KEY ("salle") REFERENCES "Salle"("id");

ALTER TABLE "Salle_boutique" ADD CONSTRAINT "Salle_boutique_fk2" FOREIGN KEY ("utilisateur") REFERENCES "Utilisateur"("id");



ALTER TABLE "Historique_salle" ADD CONSTRAINT "Historique_salle_fk1" FOREIGN KEY ("idSalle") REFERENCES "Salle_boutique"("id");

ALTER TABLE "Historique_salle" ADD CONSTRAINT "Historique_salle_fk2" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id");

ALTER TABLE "Historique_salle" ADD CONSTRAINT "Historique_salle_fk5" FOREIGN KEY ("status") REFERENCES "status"("id");

ALTER TABLE "Produit" ADD CONSTRAINT "Produit_fk2" FOREIGN KEY ("type") REFERENCES "Type_produit"("id");
ALTER TABLE "Prix_vente_produit_par_boutique" ADD CONSTRAINT "Prix_vente_produit_par_boutique_fk2" FOREIGN KEY ("boutique") REFERENCES "Salle_boutique"("id");

ALTER TABLE "Prix_vente_produit_par_boutique" ADD CONSTRAINT "Prix_vente_produit_par_boutique_fk4" FOREIGN KEY ("produit") REFERENCES "Produit"("id");
ALTER TABLE "mouvement_produit" ADD CONSTRAINT "mouvement_produit_fk5" FOREIGN KEY ("boutique") REFERENCES "Salle_boutique"("id");

ALTER TABLE "mouvement_produit" ADD CONSTRAINT "mouvement_produit_fk6" FOREIGN KEY ("produit") REFERENCES "Produit"("id");

ALTER TABLE "mouvement_produit" ADD CONSTRAINT "mouvement_produit_fk7" FOREIGN KEY ("destinataire_utilisateur") REFERENCES "Utilisateur"("id");

ALTER TABLE "Transaction_solde" ADD CONSTRAINT "Transaction_solde_fk1" FOREIGN KEY ("utilisateur") REFERENCES "Utilisateur"("id");