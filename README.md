# Font Awesome Explorer

Une application web moderne pour explorer et utiliser les icônes Font Awesome de manière intuitive.

![Font Awesome Explorer](public/preview.png)

## 🚀 Fonctionnalités

- 🔍 Recherche avancée d'icônes
- 📱 Interface responsive et moderne
- 🎨 Support de tous les styles Font Awesome (Solid, Regular, Light, Thin, Duotone, Sharp)
- 📋 Copie rapide du code HTML, React ou Unicode
- ⬇️ Téléchargement des icônes en SVG
- 🏷️ Organisation par catégories
- 🌓 Mode sombre intégré
- 🎯 Interface inspirée de Vercel/Next.js

## 🛠️ Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/kevinkenfack/font-awesome-explorer.git
cd font-awesome-explorer
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Structure du Projet

```
font-awesome-explorer/
├── public/
│   └── icons/          # Dossier des icônes Font Awesome
├── src/
│   ├── app/           # Pages Next.js
│   ├── components/    # Composants React
│   ├── services/      # Services et utilitaires
│   └── styles/        # Styles globaux
├── .gitignore
├── package.json
└── README.md
```

## 🎨 Technologies Utilisées

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Font Awesome](https://fontawesome.com/) - Bibliothèque d'icônes
- [TypeScript](https://www.typescriptlang.org/) - Typage statique

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📝 Utilisation

1. **Recherche d'icônes**
   - Utilisez la barre de recherche pour trouver des icônes
   - Filtrez par catégorie ou style

2. **Copie d'icônes**
   - Cliquez sur une icône pour ouvrir la modal
   - Choisissez le format de code (HTML, React, Unicode)
   - Copiez le code avec un seul clic

3. **Téléchargement**
   - Ouvrez la modal d'une icône
   - Cliquez sur le bouton "Télécharger SVG"

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Font Awesome](https://fontawesome.com/) pour leur incroyable bibliothèque d'icônes
- [Next.js](https://nextjs.org/) pour leur framework React
- [Tailwind CSS](https://tailwindcss.com/) pour leur framework CSS

## 📞 Contact

Votre Nom - [@votre-twitter](https://twitter.com/votre-twitter)

Lien du Projet : [https://github.com/votre-username/font-awesome-explorer](https://github.com/votre-username/font-awesome-explorer)
