import React from 'react';
import { Icon, getIconHtmlCode, getIconReactCode, getSvgPath, getFormattedStyleName } from '../services/icons';

interface IconModalProps {
  icon: Icon | null;
  onClose: () => void;
}

export default function IconModal({ icon, onClose }: IconModalProps) {
  if (!icon) return null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copié dans le presse-papier !');
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const handleDownloadSvg = async () => {
    try {
      const response = await fetch(getSvgPath(icon, icon.styles[0]));
      const svgText = await response.text();
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${icon.name}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  const handleCopySvg = async () => {
    try {
      const response = await fetch(getSvgPath(icon, icon.styles[0]));
      const svgText = await response.text();
      await copyToClipboard(svgText);
    } catch (error) {
      console.error('Erreur lors de la copie du SVG:', error);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      {/* Overlay avec flou */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="sticky top-0 bg-gray-800 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-white truncate">
              {icon.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 sm:p-6">
          {/* Aperçu de l'icône */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8">
              <i 
                className={`fa-${icon.styles[0]} fa-${icon.name} text-5xl sm:text-6xl text-white`}
                style={{ 
                  fontFamily: 'Font Awesome 6 Pro',
                  fontWeight: icon.styles[0] === 'solid' ? 900 : 
                             icon.styles[0] === 'regular' ? 400 :
                             icon.styles[0] === 'light' ? 300 :
                             icon.styles[0] === 'thin' ? 100 : 900
                }}
              ></i>
            </div>
          </div>

          {/* Détails */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1 sm:mb-2">Style</h3>
                <p className="text-white">{getFormattedStyleName(icon.styles[0])}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1 sm:mb-2">Styles disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {icon.styles.map((style, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 rounded text-xs sm:text-sm text-white">
                      {getFormattedStyleName(style)}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1 sm:mb-2">Unicode</h3>
                <p className="text-white font-mono text-sm">{icon.unicode}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1 sm:mb-2">Famille</h3>
                <p className="text-white">{icon.family}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                {icon.categories.map((category, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-800 rounded text-xs sm:text-sm text-white">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={() => copyToClipboard(getIconHtmlCode(icon, icon.styles[0]))}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copier HTML
            </button>
            <button
              onClick={() => copyToClipboard(getIconReactCode(icon, icon.styles[0]))}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copier React
            </button>
            <button
              onClick={() => copyToClipboard(icon.unicode)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copier Unicode
            </button>
            <button
              onClick={handleCopySvg}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copier SVG
            </button>
            <button
              onClick={handleDownloadSvg}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger SVG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 