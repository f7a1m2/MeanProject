-- ========================================
-- DONNÉES DE TEST POUR LE PROJET MEAN
-- Basé sur le schéma Conception_MEAN-1771237813.sql
-- ========================================

-- Insertion des types de bâtiments
INSERT INTO "type_batiment" ("type") VALUES 
('Bureau'),
('Commerce'),
('Entrepôt'),
('Restaurant'),
('Parking');

-- Insertion des types de salles
INSERT INTO "type_salle" ("type") VALUES 
('Boutique'),
('Magasin'),
('Restaurant'),
('Cafétéria'),
('Bureau');

-- Insertion des statuts
INSERT INTO "status" ("designation") VALUES 
('Disponible'),
('Occupé'),
('En maintenance'),
('Réservé'),
('Indisponible');

-- Insertion des centres commerciaux
INSERT INTO "Centre_commmercial" ("nom", "heure_ouverture", "heure_fermeture") VALUES 
('Centre Commercial Les Halles', '2024-01-01 09:00:00+00', '2024-01-01 21:00:00+00'),
('Centre Commercial La Défense', '2024-01-01 08:30:00+00', '2024-01-01 20:30:00+00'),
('Centre Commercial Beaugrenelle', '2024-01-01 10:00:00+00', '2024-01-01 22:00:00+00');

-- Insertion des utilisateurs
INSERT INTO "Utilisateur" ("id", "nom", "type", "mot_de_passe") VALUES 
(1, 'Admin Principal', 'admin', 'admin123'),
(2, 'Jean Dupont', 'gérant', 'gerant123'),
(3, 'Marie Martin', 'propriétaire', 'proprio123'),
(4, 'Pierre Durand', 'employé', 'emp123'),
(5, 'Sophie Bernard', 'client', 'client123');

-- Insertion des bâtiments
INSERT INTO "batiment" ("nom", "centre_commercial", "type_batiment", "nbr_etage", "surface_etage") VALUES 
('Tour A', 1, 1, 5, 200),
('Tour B', 1, 2, 3, 150),
('Pavillon Est', 2, 1, 2, 120),
('Pavillon Ouest', 2, 3, 1, 300),
('Annexe Services', 3, 4, 1, 80);

-- Insertion des salles
INSERT INTO "Salle" ("batiment", "numero_salle", "numero_etage", "espace_utiliser", "cout", "type_salle", "disponibiliter") VALUES 
(1, 'A101', 1, 45, 1500, 1, 1),
(1, 'A102', 1, 60, 2000, 1, 1),
(1, 'B201', 2, 80, 2500, 2, 1),
(2, 'C101', 1, 35, 1200, 1, 2),
(2, 'C102', 1, 40, 1300, 1, 1),
(3, 'D101', 1, 200, 5000, 3, 1),
(4, 'E101', 1, 250, 6000, 3, 1),
(5, 'F101', 1, 30, 800, 4, 1);

-- Insertion des salles boutiques
INSERT INTO "Salle_boutique" ("salle", "utilisateur", "date_allocation") VALUES 
(1, 2, '2024-01-15'),
(2, 3, '2024-01-20'),
(4, 4, '2024-02-01'),
(5, 2, '2024-02-10'),
(8, 5, '2024-02-15');

-- Insertion des types de produits
INSERT INTO "Type_produit" ("designation") VALUES 
(1),
(2),
(3),
(4),
(5);

-- Insertion des produits
INSERT INTO "Produit" ("designation", "type") VALUES 
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(8, 4),
(9, 5),
(10, 5);

-- Insertion des prix de vente par boutique
INSERT INTO "Prix_vente_produit_par_boutique" ("prix", "boutique", "date", "produit") VALUES 
(25.99, 1, '2024-01-01 10:00:00', 1),
(29.99, 1, '2024-01-01 10:00:00', 2),
(15.50, 1, '2024-01-01 10:00:00', 3),
(19.99, 1, '2024-01-01 10:00:00', 4),
(45.00, 2, '2024-01-01 11:00:00', 5),
(52.50, 2, '2024-01-01 11:00:00', 6),
(8.99, 3, '2024-01-01 12:00:00', 7),
(12.50, 3, '2024-01-01 12:00:00', 8),
(3.99, 4, '2024-01-01 13:00:00', 9),
(7.50, 4, '2024-01-01 13:00:00', 10);

-- Insertion des mouvements de produits
INSERT INTO "mouvement_produit" ("type(entrée_ou_sortie)", "date_mouvement", "prix", "quantité", "boutique", "produit", "destinataire_utilisateur") VALUES 
(0, '2024-01-01 09:00:00', 20.00, 100, 1, 1, 2),
(0, '2024-01-01 10:00:00', 25.00, 50, 1, 2, 2),
(1, '2024-01-01 14:00:00', 15.50, 25, 1, 3, 4),
(0, '2024-01-02 08:00:00', 40.00, 75, 2, 5, 3),
(1, '2024-01-02 16:00:00', 45.00, 30, 2, 6, 4),
(0, '2024-01-03 09:00:00', 10.00, 200, 3, 7, 5),
(1, '2024-01-03 18:00:00', 12.50, 150, 3, 8, 4),
(0, '2024-01-04 08:00:00', 5.00, 300, 4, 9, 5),
(1, '2024-01-04 17:00:00', 7.50, 250, 4, 10, 4);

-- Insertion des transactions de solde
INSERT INTO "Transaction_solde" ("utilisateur", "type", "montant", "date") VALUES 
(2, 'credit', 5000.00, '2024-01-01 09:00:00'),
(3, 'credit', 3000.00, '2024-01-01 10:00:00'),
(4, 'debit', 500.00, '2024-01-01 14:00:00'),
(5, 'credit', 1500.00, '2024-01-02 09:00:00'),
(2, 'debit', 200.00, '2024-01-02 15:00:00'),
(3, 'credit', 1000.00, '2024-01-03 11:00:00'),
(4, 'debit', 300.00, '2024-01-03 16:00:00'),
(5, 'debit', 100.00, '2024-01-04 12:00:00');

-- Insertion de l'historique des salles
INSERT INTO "Historique_salle" ("idSalle", "idUtilisateur", "dateDebut", "dateFin", "status", "revenu_generer") VALUES 
(1, 2, '2024-01-01 00:00:00+00', '2024-01-31 23:59:59+00', 1, 45000.00),
(2, 3, '2024-01-15 00:00:00+00', '2024-02-15 23:59:59+00', 1, 60000.00),
(4, 4, '2024-02-01 00:00:00+00', '2024-02-28 23:59:59+00', 2, 39000.00),
(5, 2, '2024-02-10 00:00:00+00', '2024-03-10 23:59:59+00', 1, 39000.00),
(8, 5, '2024-02-15 00:00:00+00', '2024-03-15 23:59:59+00', 1, 24000.00);

-- ========================================
-- RÉSUMÉ DES DONNÉES INSÉRÉES
-- ========================================
-- Centres commerciaux: 3
-- Bâtiments: 5
-- Salles: 8
-- Utilisateurs: 5 (1 admin, 1 gérant, 1 propriétaire, 1 employé, 1 client)
-- Types de bâtiments: 5
-- Types de salles: 5
-- Statuts: 5
-- Salles boutiques: 5
-- Types de produits: 5
-- Produits: 10
-- Prix de vente: 10
-- Mouvements de produits: 9
-- Transactions de solde: 8
-- Historique des salles: 5

-- ========================================
-- REQUÊTES DE TEST POUR VÉRIFICATION
-- ========================================

-- Vérifier tous les utilisateurs
SELECT * FROM "Utilisateur";

-- Vérifier tous les centres commerciaux avec leurs bâtiments
SELECT cc.nom as centre, b.nom as batiment, b.type_batiment, b.nbr_etage
FROM "Centre_commmercial" cc
LEFT JOIN "batiment" b ON cc.id = b.centre_commercial;

-- Vérifier toutes les salles avec leur statut
SELECT s.numero_salle, s.numero_etage, s.espace_utiliser, s.cout, 
       ts.type as type_salle, st.designation as statut
FROM "Salle" s
JOIN "type_salle" ts ON s.type_salle = ts.id
JOIN "status" st ON s.disponibiliter = st.id;

-- Vérifier les salles boutiques avec utilisateurs
SELECT sb.date_allocation, u.nom as utilisateur, s.numero_salle
FROM "Salle_boutique" sb
JOIN "Utilisateur" u ON sb.utilisateur = u.id
JOIN "Salle" s ON sb.salle = s.id;

-- Vérifier les mouvements de produits récents
SELECT mp.date_mouvement, mp."type(entrée_ou_sortie)", mp.quantite, mp.prix,
       p.designation as produit, u.nom as destinataire
FROM "mouvement_produit" mp
JOIN "Produit" p ON mp.produit = p.id
JOIN "Utilisateur" u ON mp.destinataire_utilisateur = u.id
ORDER BY mp.date_mouvement DESC;

-- Vérifier le solde des transactions par utilisateur
SELECT u.nom, SUM(CASE WHEN ts.type = 'credit' THEN ts.montant ELSE -ts.montant END) as solde
FROM "Transaction_solde" ts
JOIN "Utilisateur" u ON ts.utilisateur = u.id
GROUP BY u.id, u.nom;
