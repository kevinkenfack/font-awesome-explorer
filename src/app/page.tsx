'use client';

import { useState, useEffect } from 'react';
import { searchIcons, Icon, getAllCategories, getIconCategory } from '../services/icons';
import IconModal from '../components/IconModal';
import IconCard from '../components/IconCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [icons, setIcons] = useState<Icon[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedStyle] = useState<string>('Tous');
  const [isLoading, setIsLoading] = useState(true);
  const [modalIcon, setModalIcon] = useState<Icon | null>(null);

  const categories = getAllCategories();
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
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f9f9f9] w-full flex flex-col items-center px-4 md:px-10 py-10">
        <Header
        />

        {/* Barre de recherche moderne */}
        <div className="w-full max-w-2xl mb-6">
          <input
            type="text"
            placeholder="Rechercher une icône, un mot-clé, une catégorie..."
            className="w-full rounded-[32px] px-6 py-4 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Catégories filtrables */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center w-full max-w-2xl">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${selectedCategory === 'Toutes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50'}`}
            onClick={() => setSelectedCategory('Toutes')}
          >
            Toutes
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loader */}
        {isLoading ? (
          <div className="flex items-center justify-center w-full py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1440px]">
            {filteredIcons.map(icon => (
              <IconCard key={icon.name} icon={icon} onClick={() => setModalIcon(icon)} />
            ))}
          </div>
        )}

        {/* Modal d'icône */}
        <IconModal icon={modalIcon} onClose={() => setModalIcon(null)} />
      </div>
      <Footer />
    </>
  );
}
