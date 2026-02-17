# Express + Mongoose Application

This is the main application directory containing the complete Express.js server with Mongoose ORM for MongoDB.

## Quick Start

### 1. Setup Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Project Structure

```
src/
├── index.js              # Main server file - routes, middleware setup
├── db.js                 # MongoDB connection logic
├── models/               # Mongoose schemas (14 entities)
│   ├── Produit.js
│   ├── Salle.js
│   ├── Batiment.js
│   ├── TypeProduit.js
│   ├── TypeSalle.js
│   ├── TypeBatiment.js
│   ├── CentreCommmercial.js
│   ├── Utilisateur.js
│   ├── Statu.js
│   ├── MouvementProduit.js
│   ├── HistoriqueSalle.js
│   ├── PrixVenteProduitParBoutique.js
│   ├── TransactionSolde.js
│   └── SalleBoutique.js
├── routes/               # Express route handlers (14 endpoints)
│   ├── produit.js
│   ├── salle.js
│   ├── batiment.js
│   ├── typeProduit.js
│   ├── typeSalle.js
│   ├── typeBatiment.js
│   ├── centreCommmercial.js
│   ├── utilisateur.js
│   ├── statu.js
│   ├── mouvementProduit.js
│   ├── historiqueSalle.js
│   ├── prixVenteProduitParBoutique.js
│   ├── transactionSolde.js
│   └── salleBoutique.js
└── utils/                # Helper functions
    ├── errorHandler.js
    ├── export.util.js
    ├── web.util.js
    ├── resourceNotFound.js
    └── constraintDisabler.js
```

## Available Scripts

- `npm start` - Run production server
- `npm run dev` - Run development server with auto-reload (nodemon)

## API Response Format

All endpoints return a standard response:

```json
{
  "status": 200,
  "message": "Operation successful",
  "data": {
    "content": [],
    "totalElements": 0,
    "totalPages": 0,
    "pageNumber": 0,
    "pageSize": 10
  }
}
```

## API Endpoints (All 14 Entities)

### Core Entities
- **Produit**: `/produit` - GET, POST, PUT, DELETE, GET/:id
- **Salle**: `/salle` - Full CRUD operations
- **Batiment**: `/batiment` - Full CRUD operations

### Type Entities
- **TypeProduit**: `/typeProduit` - Full CRUD operations
- **TypeSalle**: `/typeSalle` - Full CRUD operations
- **TypeBatiment**: `/typeBatiment` - Full CRUD operations

### Reference Entities
- **CentreCommmercial**: `/centreCommmercial` - Full CRUD operations
- **Utilisateur**: `/utilisateur` - Full CRUD operations
- **Statu**: `/statu` - Full CRUD operations

### Complex Entities
- **MouvementProduit**: `/mouvementProduit` - Full CRUD operations
- **HistoriqueSalle**: `/historiqueSalle` - Full CRUD operations
- **PrixVenteProduitParBoutique**: `/prixVenteProduitParBoutique` - Full CRUD operations
- **TransactionSolde**: `/transactionSolde` - Full CRUD operations
- **SalleBoutique**: `/salleBoutique` - Full CRUD operations

## Environment Variables

Create a `.env` file in this directory:

```env
# MongoDB Connection String (Atlas or local)
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/meancrud?appName=Cluster0

# Server Port (default: 3000)
PORT=3000
```

## Troubleshooting

### MongoDB Connection Timeout
```
Error: querySrv ETIMEOUT _mongodb._tcp.cluster...
```
Solution: Check internet connection, MongoDB Atlas cluster status, and network whitelist.

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
Solution: Change PORT in `.env` or kill process using port 3000.

### Module Not Found
```
Error: Cannot find module 'mongoose'
```
Solution: Run `npm install` in this directory.

---

For comprehensive documentation, see [../README.md](../README.md)

**Status**: ✅ Complete - All 14 entities migrated and tested (Feb 17, 2026)
