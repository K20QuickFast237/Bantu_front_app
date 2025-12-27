# Configuration - Vérification du rôle acheteur (Buyer)

## Vue d'ensemble
La fonctionnalité "Buy" nécessite une vérification du rôle utilisateur côté backend pour déterminer si l'utilisateur peut accéder directement à la plateforme d'achat ou s'il doit remplir un formulaire d'inscription en tant qu'acheteur.

## Endpoint requis

### POST `/check-buyer-role`

**Description:** Vérifie si l'utilisateur a le rôle "vendeur" (seller) dans la table `roles` de la base de données.

**Authentification:** Requise (Bearer Token)

**Paramètres du corps (JSON):**
```json
{
  "user_id": 1
}
```

**Réponse - Succès (200):**
```json
{
  "isBuyer": true,
  "user_id": 1
}
```
ou
```json
{
  "isBuyer": false,
  "user_id": 1
}
```

**Réponse - Erreur (401 ou 403):**
```json
{
  "message": "Non authentifié"
}
```

**Réponse - Erreur (400):**
```json
{
  "message": "user_id est requis"
}
```

## Logique côté backend

Le endpoint doit :

1. **Vérifier l'authentification** : L'utilisateur doit être authentifié avec un token valide
2. **Valider l'input** : `user_id` doit être fourni
3. **Vérifier les rôles** : Chercher dans la table `roles` si l'utilisateur possède le rôle "buyer" ou "seller"
4. **Retourner le résultat** : Indiquer si l'utilisateur est un buyer existant

### Exemple (Laravel):

```php
// routes/api.php
Route::post('/check-buyer-role', [BuyerController::class, 'checkBuyerRole'])->middleware('auth:sanctum');

// app/Http/Controllers/BuyerController.php
public function checkBuyerRole(Request $request)
{
    $request->validate([
        'user_id' => 'required|integer|exists:users,id'
    ]);

    $user = $request->user();
    
    // Vérifier si l'utilisateur a le rôle 'buyer'
    $isBuyer = $user->roles()->where('name', 'buyer')->exists();
    
    return response()->json([
        'isBuyer' => $isBuyer,
        'user_id' => $user->id
    ]);
}
```

## Comportement du frontend

1. **Clic sur "Buy"** → Appel POST à `/check-buyer-role` avec `user_id`
2. **Si `isBuyer: true`** → Redirection directe vers `/dashboard/buyer?token=${token}` (plateforme marketplace)
3. **Si `isBuyer: false`** → Affichage d'un formulaire modal pour compléter le profil acheteur

## Formulaire acheteur

Le formulaire actuellement inclus demande :
- Nom de l'entreprise
- Description

**À personnaliser selon vos besoins** : Modifier le composant dans `src/pages/app/WhatDoYouWantToDo.jsx` pour ajouter d'autres champs requis.

Le formulaire doit soumettre les données à un endpoint pour :
- Créer ou mettre à jour le profil acheteur
- Attribuer le rôle "buyer" à l'utilisateur
- Rediriger vers la plateforme marketplace

## Variables d'environnement requises

Vérifiez que ces variables sont configurées dans `.env` :

```
VITE_MARKETPLACE_URL=https://marketplace.example.com
```

## Fichiers modifiés

- `src/pages/app/WhatDoYouWantToDo.jsx` - Logique de vérification du rôle acheteur et formulaire modal
