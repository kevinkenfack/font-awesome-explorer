'use client';

import { useState, useEffect } from 'react';
import { searchIcons, Icon, getAllCategories, getSubcategories, filterIconsByCategory, getAvailableStyles, getFormattedStyleName, getIconCategory } from '../services/icons';
import IconModal from '../components/IconModal';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [icons, setIcons] = useState<Icon[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('Toutes');
  const [selectedStyle, setSelectedStyle] = useState<string>('Tous');
  const [isLoading, setIsLoading] = useState(true);
  const [modalIcon, setModalIcon] = useState<Icon | null>(null);

  const categories = getAllCategories();
  const subcategories = selectedCategory !== 'Toutes' ? getSubcategories(selectedCategory) : [];
  const styles = ['Tous', ...getAvailableStyles()];

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const allIcons = await searchIcons('');
        setIcons(allIcons);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function search() {
      setIsLoading(true);
      try {
        const results = await searchIcons(searchQuery);
        setIcons(results);
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      } finally {
        setIsLoading(false);
      }
    }
    search();
  }, [searchQuery]);

  const filteredIcons = icons
    .filter(icon => selectedStyle === 'Tous' || icon.styles.includes(selectedStyle))
    .filter(icon => selectedCategory === 'Toutes' || getIconCategory(icon) === selectedCategory);

  return (
    <div className={`min-h-screen bg-black text-white ${modalIcon ? 'overflow-hidden' : ''}`}>
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">Font Awesome Explorer</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Documentation</a>
              <a href="#" className="text-gray-300 hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Trouvez l'icône parfaite
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Explorez la collection complète d'icônes Font Awesome et trouvez celle qui correspond à votre projet
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une icône..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Filtre par style */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">Style</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {styles.map(style => (
                <option key={style} value={style}>
                  {getFormattedStyleName(style)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Filtre par catégorie */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">Catégorie</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {['Toutes', ...getAllCategories()].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grille d'icônes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredIcons.map(icon => (
            <div
              key={icon.name}
              onClick={() => setModalIcon(icon)}
              className="group bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="aspect-square flex items-center justify-center mb-2">
                <i 
                  className={`fa-${icon.styles[0]} fa-${icon.name} text-3xl text-white`}
                  style={{ 
                    fontFamily: 'Font Awesome 6 Pro',
                    fontWeight: icon.styles[0] === 'solid' ? 900 : 
                               icon.styles[0] === 'regular' ? 400 :
                               icon.styles[0] === 'light' ? 300 :
                               icon.styles[0] === 'thin' ? 100 : 900
                  }}
                ></i>
              </div>
              <p className="text-sm text-gray-400 text-center truncate">{icon.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Catégories</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('Toutes');
                      setSelectedSubcategory('Toutes');
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'Toutes'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    Toutes les icônes
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedSubcategory('Toutes');
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {selectedCategory !== 'Toutes' && subcategories.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Sous-catégories</h2>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedSubcategory('Toutes')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedSubcategory === 'Toutes'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      Toutes
                    </button>
                    {subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => setSelectedSubcategory(subcategory)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedSubcategory === subcategory
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Icons Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : filteredIcons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Aucune icône trouvée</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredIcons.map((icon) => (
                  <div 
                    key={`icon-${icon.name}`} 
                    onClick={() => setModalIcon(icon)} 
                    className="group cursor-pointer"
                  >
                    <div className="bg-gray-900 rounded-lg p-6 transition-all duration-200 hover:bg-gray-800">
                      <div className="aspect-square flex items-center justify-center mb-4">
                        <i 
                          className={`fa-${icon.styles[0]} fa-${icon.name} text-4xl text-gray-400 group-hover:text-white transition-colors`}
                          style={{ 
                            fontFamily: 'Font Awesome 6 Pro',
                            fontWeight: icon.styles[0] === 'solid' ? 900 : 
                                       icon.styles[0] === 'regular' ? 400 :
                                       icon.styles[0] === 'light' ? 300 :
                                       icon.styles[0] === 'thin' ? 100 : 900
                          }}
                        ></i>
                      </div>
                      <p className="text-sm text-gray-400 group-hover:text-white text-center truncate transition-colors">
                        {icon.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <IconModal icon={modalIcon} onClose={() => setModalIcon(null)} />
    </div>
  );
}
