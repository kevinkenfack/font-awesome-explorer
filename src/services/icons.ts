export interface Icon {
  name: string;
  unicode: string;
  styles: string[];
  family: string;
  categories: string[];
  search: {
    terms: string[];
  };
}

let icons: Icon[] = [];

// Liste complète des styles disponibles
export const AVAILABLE_STYLES = [
  'brands',
  'duotone',
  'duotone-light',
  'duotone-regular',
  'duotone-thin',
  'light',
  'regular',
  'sharp-duotone-light',
  'sharp-duotone-regular',
  'sharp-duotone-solid',
  'sharp-duotone-thin',
  'sharp-light',
  'sharp-regular',
  'sharp-solid',
  'sharp-thin',
  'solid',
  'thin'
];

// Charger les icônes de manière asynchrone
export async function loadIcons(): Promise<Icon[]> {
  if (icons.length > 0) return icons;
  
  try {
    const response = await fetch('/icons/metadata/icons.json');
    const data = await response.json();
    
    return Object.entries(data).map(([name, data]: [string, any]) => {
      // Filtrer les styles disponibles
      const availableStyles = data.styles.filter((style: string) => {
        // Vérifier si le style existe dans le dossier svgs
        const stylePath = style.includes('sharp') ? style.replace('sharp-', '') : style;
        return AVAILABLE_STYLES.includes(style);
      });

      return {
        name,
        unicode: data.unicode,
        styles: availableStyles,
        family: data.family,
        categories: data.categories || [],
        search: {
          terms: data.search?.terms || []
        }
      };
    });
  } catch (error) {
    console.error('Erreur lors du chargement des icônes:', error);
    return [];
  }
}

export async function searchIcons(query: string): Promise<Icon[]> {
  const allIcons = await loadIcons();
  if (!query) return allIcons;
  
  const searchTerm = query.toLowerCase();
  return allIcons.filter(icon => 
    icon.name.toLowerCase().includes(searchTerm) ||
    icon.search.terms.some((term: string) => term.toLowerCase().includes(searchTerm))
  );
}

export async function loadFamilies(): Promise<string[]> {
  const allIcons = await loadIcons();
  const families = new Set<string>();
  allIcons.forEach(icon => {
    families.add(icon.family);
  });
  return Array.from(families);
}

// Catégories principales avec leurs sous-catégories
export const categories = {
  'Interface': ['Navigation', 'Actions', 'Notifications', 'États', 'Formulaires'],
  'Communication': ['Social', 'Messagerie', 'Partage', 'Réseaux sociaux'],
  'Design': ['Formes', 'Éléments UI', 'Décoration', 'Arrière-plans'],
  'Business': ['Commerce', 'Finance', 'Marketing', 'Analytics'],
  'Développement': ['Code', 'Git', 'Déploiement', 'Outils'],
  'Multimédia': ['Audio', 'Vidéo', 'Images', 'Galerie'],
  'Système': ['Fichiers', 'Dossiers', 'Paramètres', 'Sécurité'],
  'Éducation': ['Apprentissage', 'Livres', 'Notes', 'Quiz'],
  'Santé': ['Médecine', 'Fitness', 'Bien-être', 'Urgence'],
  'Voyage': ['Transport', 'Hébergement', 'Navigation', 'Lieux']
};

// Fonction pour déterminer la catégorie d'une icône
export function getIconCategory(icon: Icon): string {
  const name = icon.name.toLowerCase();
  
  // Interface
  if (name.includes('menu') || name.includes('nav') || name.includes('hamburger')) return 'Interface';
  if (name.includes('button') || name.includes('click') || name.includes('action')) return 'Interface';
  if (name.includes('notification') || name.includes('alert') || name.includes('bell')) return 'Interface';
  if (name.includes('check') || name.includes('error') || name.includes('warning')) return 'Interface';
  if (name.includes('input') || name.includes('form') || name.includes('field')) return 'Interface';
  
  // Communication
  if (name.includes('message') || name.includes('chat') || name.includes('comment')) return 'Communication';
  if (name.includes('share') || name.includes('send') || name.includes('forward')) return 'Communication';
  if (name.includes('social') || name.includes('facebook') || name.includes('twitter')) return 'Communication';
  
  // Design
  if (name.includes('shape') || name.includes('circle') || name.includes('square')) return 'Design';
  if (name.includes('ui') || name.includes('element') || name.includes('component')) return 'Design';
  if (name.includes('decor') || name.includes('ornament') || name.includes('pattern')) return 'Design';
  
  // Business
  if (name.includes('shop') || name.includes('store') || name.includes('cart')) return 'Business';
  if (name.includes('money') || name.includes('dollar') || name.includes('euro')) return 'Business';
  if (name.includes('chart') || name.includes('graph') || name.includes('analytics')) return 'Business';
  
  // Développement
  if (name.includes('code') || name.includes('programming') || name.includes('developer')) return 'Développement';
  if (name.includes('git') || name.includes('github') || name.includes('version')) return 'Développement';
  if (name.includes('deploy') || name.includes('server') || name.includes('cloud')) return 'Développement';
  
  // Multimédia
  if (name.includes('music') || name.includes('audio') || name.includes('sound')) return 'Multimédia';
  if (name.includes('video') || name.includes('camera') || name.includes('film')) return 'Multimédia';
  if (name.includes('image') || name.includes('photo') || name.includes('picture')) return 'Multimédia';
  
  // Système
  if (name.includes('file') || name.includes('folder') || name.includes('document')) return 'Système';
  if (name.includes('settings') || name.includes('config') || name.includes('preferences')) return 'Système';
  if (name.includes('security') || name.includes('lock') || name.includes('shield')) return 'Système';
  
  // Éducation
  if (name.includes('learn') || name.includes('education') || name.includes('school')) return 'Éducation';
  if (name.includes('book') || name.includes('library') || name.includes('read')) return 'Éducation';
  if (name.includes('note') || name.includes('exam') || name.includes('quiz')) return 'Éducation';
  
  // Santé
  if (name.includes('health') || name.includes('medical') || name.includes('doctor')) return 'Santé';
  if (name.includes('fitness') || name.includes('exercise') || name.includes('gym')) return 'Santé';
  if (name.includes('emergency') || name.includes('ambulance') || name.includes('hospital')) return 'Santé';
  
  // Voyage
  if (name.includes('travel') || name.includes('trip') || name.includes('journey')) return 'Voyage';
  if (name.includes('hotel') || name.includes('accommodation') || name.includes('room')) return 'Voyage';
  if (name.includes('map') || name.includes('location') || name.includes('place')) return 'Voyage';
  
  return 'Autres';
}

// Fonction pour obtenir les sous-catégories d'une catégorie
export function getSubcategories(category: string): string[] {
  return categories[category as keyof typeof categories] || [];
}

// Fonction pour obtenir toutes les catégories
export function getAllCategories(): string[] {
  return Object.keys(categories);
}

// Fonction pour filtrer les icônes par catégorie
export function filterIconsByCategory(icons: Icon[], category: string): Icon[] {
  if (category === 'Toutes') return icons;
  return icons.filter(icon => getIconCategory(icon) === category);
}

// Fonction pour filtrer les icônes par sous-catégorie
export function filterIconsBySubcategory(icons: Icon[], category: string, subcategory: string): Icon[] {
  if (subcategory === 'Toutes') return filterIconsByCategory(icons, category);
  // Implémentation de la logique de sous-catégorie à venir
  return icons;
}

// Fonction pour obtenir les styles disponibles
export function getAvailableStyles(): string[] {
  return AVAILABLE_STYLES;
}

// Fonction pour obtenir le nom formaté d'un style
export function getFormattedStyleName(style: string): string {
  const styleMap: { [key: string]: string } = {
    'solid': 'Solide',
    'regular': 'Regular',
    'light': 'Light',
    'thin': 'Thin',
    'duotone': 'Duotone',
    'duotone-light': 'Duotone Light',
    'duotone-regular': 'Duotone Regular',
    'duotone-thin': 'Duotone Thin',
    'sharp-duotone-light': 'Sharp Duotone Light',
    'sharp-duotone-regular': 'Sharp Duotone Regular',
    'sharp-duotone-solid': 'Sharp Duotone Solid',
    'sharp-duotone-thin': 'Sharp Duotone Thin',
    'sharp-light': 'Sharp Light',
    'sharp-regular': 'Sharp Regular',
    'sharp-solid': 'Sharp Solid',
    'sharp-thin': 'Sharp Thin',
    'brands': 'Brands'
  };
  return styleMap[style] || style;
}

// Fonction pour obtenir le chemin SVG correct
export function getSvgPath(icon: Icon, style: string): string {
  // Gestion des styles spéciaux
  let stylePath = style;
  if (style.includes('sharp')) {
    stylePath = style.replace('sharp-', '');
  }
  return `/icons/svgs/${stylePath}/${icon.name}.svg`;
}

// Fonction pour obtenir le code HTML d'une icône
export function getIconHtmlCode(icon: Icon, style: string): string {
  const styleClass = style.includes('sharp') ? `fa-sharp fa-${style.replace('sharp-', '')}` : `fa-${style}`;
  return `<i class="${styleClass} fa-${icon.name}"></i>`;
}

// Fonction pour obtenir le code React d'une icône
export function getIconReactCode(icon: Icon, style: string): string {
  const styleClass = style.includes('sharp') ? `fa-sharp fa-${style.replace('sharp-', '')}` : `fa-${style}`;
  return `<FontAwesomeIcon icon={fa${icon.name.charAt(0).toUpperCase() + icon.name.slice(1)}} style={{ fontFamily: '${styleClass}' }} />`;
} 