# Fonctionnalité Admin - Gestion des Centres Commerciaux

## Vue d'ensemble

Cette fonctionnalité permet aux administrateurs de créer un centre commercial complet avec tous ses bâtiments et leurs types en une seule opération transactionnelle.

## Endpoints

### POST /admin/centre-commercial-complet

Crée un centre commercial avec ses bâtiments et leurs types.

#### Requête

```json
{
  "centreCommercial": {
    "nom": "Centre Commercial ABC",
    "adresse": "123 Rue de la Ville, Ville, Pays"
  },
  "batiments": [
    {
      "nom": "Batiment Principal",
      "nbrEtage": 5,
      "surfaceEtage": 1200,
      "typeBatiment": "Commercial"
    },
    {
      "nom": "Batiment Annexe",
      "nbrEtage": 3,
      "surfaceEtage": 800,
      "typeBatiment": "Résidentiel"
    }
  ]
}
```

#### Réponse de succès (201)

```json
{
  "status": 201,
  "message": "Centre commercial complet créé avec succès",
  "data": {
    "centreCommercial": {
      "id": "507f1f77bcf86cd799439011",
      "nom": "Centre Commercial ABC",
      "adresse": "123 Rue de la Ville, Ville, Pays",
      "createdAt": "2026-02-24T10:00:00.000Z"
    },
    "batiments": [
      {
        "id": "507f1f77bcf86cd799439012",
        "nom": "Batiment Principal",
        "nbrEtage": 5,
        "surfaceEtage": 1200,
        "typeBatiment": "Commercial"
      },
      {
        "id": "507f1f77bcf86cd799439013",
        "nom": "Batiment Annexe",
        "nbrEtage": 3,
        "surfaceEtage": 800,
        "typeBatiment": "Résidentiel"
      }
    ],
    "totalBatiments": 2
  }
}
```

### GET /admin/centre-commercial-complet/:id

Récupère un centre commercial avec tous ses bâtiments.

#### Réponse de succès (200)

```json
{
  "status": 200,
  "message": "Centre commercial récupéré avec succès",
  "data": {
    "centreCommercial": {
      "id": "507f1f77bcf86cd799439011",
      "nom": "Centre Commercial ABC",
      "adresse": "123 Rue de la Ville, Ville, Pays",
      "createdAt": "2026-02-24T10:00:00.000Z"
    },
    "batiments": [
      {
        "id": "507f1f77bcf86cd799439012",
        "nom": "Batiment Principal",
        "nbrEtage": 5,
        "surfaceEtage": 1200,
        "typeBatiment": "Commercial",
        "createdAt": "2026-02-24T10:00:00.000Z"
      }
    ],
    "totalBatiments": 1
  }
}
```

## Logique Métier

### Transaction MongoDB
- Utilise les sessions MongoDB pour garantir l'atomicité
- Si une partie échoue, tout est annulé (rollback)

### Gestion des Types de Bâtiments
- Recherche d'abord si le type existe
- Crée le type s'il n'existe pas
- Réutilise les types existants

### Validation
- Centre commercial requis avec nom
- Au moins un bâtiment requis
- Chaque bâtiment doit avoir nom, nbrEtage, surfaceEtage, typeBatiment

## Exemple d'utilisation avec curl

### Créer un centre commercial complet

```bash
curl -X POST http://localhost:3000/admin/centre-commercial-complet \
  -H "Content-Type: application/json" \
  -d '{
    "centreCommercial": {
      "nom": "Mega Center",
      "adresse": "456 Avenue des Commerçants"
    },
    "batiments": [
      {
        "nom": "Tour Nord",
        "nbrEtage": 8,
        "surfaceEtage": 1500,
        "typeBatiment": "Commercial Premium"
      },
      {
        "nom": "Aile Sud",
        "nbrEtage": 4,
        "surfaceEtage": 1000,
        "typeBatiment": "Commercial Standard"
      }
    ]
  }'
```

### Récupérer un centre commercial

```bash
curl http://localhost:3000/admin/centre-commercial-complet/507f1f77bcf86cd799439011
```

## Gestion d'erreurs

### Erreurs de validation (400)
```json
{
  "status": 400,
  "message": "Centre commercial requis avec au moins un nom"
}
```

### Erreurs de données (404)
```json
{
  "status": 404,
  "message": "Centre commercial non trouvé"
}
```

### Erreurs serveur (500)
```json
{
  "status": 500,
  "message": "Erreur lors de la création du centre commercial complet",
  "error": "Détails de l'erreur"
}
```

## Sécurité

⚠️ **Note**: Cette route admin devrait être protégée par authentification dans un environnement de production.

## Tests

### Test de création réussie
1. POST avec données valides
2. Vérifier code 201
3. Vérifier que le centre et les bâtiments sont créés en DB
4. Vérifier que les types de bâtiments sont créés/réutilisés

### Test de rollback
1. POST avec un bâtiment invalide
2. Vérifier code 500
3. Vérifier qu'aucun centre/bâtiment n'est créé en DB

### Test de récupération
1. GET avec ID valide
2. Vérifier code 200 et données complètes
3. GET avec ID invalide
4. Vérifier code 404