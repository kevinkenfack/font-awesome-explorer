import React, { useState, useEffect } from 'react';
import { Icon, getSvgPath } from '../services/icons';

interface IconModalProps {
  icon: Icon | null;
  onClose: () => void;
}

const TABS = [
  { label: 'HTML', value: 'html' },
  { label: 'REACT', value: 'react' },
  { label: 'SVG', value: 'svg' },
];

function getIconCode(icon: Icon, style: string, tab: string, svgContent: string, svgPreviewOnly = false) {
  if (tab === 'html') {
    return `<i class="fa-${style} fa-${icon.name}"></i>`;
  }
  if (tab === 'react') {
    return `<FontAwesomeIcon icon={['${style}', '${icon.name}']} />`;
  }
  if (tab === 'svg') {
    if (svgPreviewOnly && svgContent.length > 100) {
      return svgContent.slice(0, 100) + '...';
    }
    return svgContent || '<svg>...</svg>';
  }
  return '';
}

export default function IconModal({ icon, onClose }: IconModalProps) {
  const [tab, setTab] = useState('html');
  const [svgContent, setSvgContent] = useState('');
  const [loadingSvg, setLoadingSvg] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (icon && tab === 'svg') {
      setLoadingSvg(true);
      fetch(getSvgPath(icon, icon.styles[0]))
        .then(res => res.text())
        .then(svg => setSvgContent(svg))
        .catch(() => setSvgContent('<svg>Erreur de chargement</svg>'))
        .finally(() => setLoadingSvg(false));
    }
  }, [icon, tab]);

  if (!icon) return null;
  const style = icon.styles[0];
  const isPro = icon.family?.toLowerCase().includes('pro');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  // Détermine le code à afficher (aperçu ou complet)
  const codeToShow = tab === 'svg'
    ? (loadingSvg ? 'Chargement du SVG...' : getIconCode(icon, style, tab, svgContent, true))
    : getIconCode(icon, style, tab, svgContent);

  // Détermine le code à copier (toujours complet)
  const codeToCopy = tab === 'svg'
    ? svgContent
    : getIconCode(icon, style, tab, svgContent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Toast notification */}
        {showToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
            Copié avec succès !
          </div>
        )}
        {/* Fermer */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
        {/* Nom + badge */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{icon.name}</h2>
          {isPro && <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded text-gray-900">PRO</span>}
        </div>
        {/* Icône */}
        <div className="flex items-center justify-center w-32 h-32 rounded-xl bg-gray-50 mb-6">
          <i
            className={`fa-${style} fa-${icon.name} text-7xl text-blue-900`}
            style={{ fontFamily: 'Font Awesome 6 Pro', fontWeight: style === 'solid' ? 900 : 400 }}
          ></i>
        </div>
        {/* Onglets */}
        <div className="flex gap-2 mb-2">
          {TABS.map(t => (
            <button
              key={t.value}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${tab === t.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Code */}
        <div className="w-full bg-gray-900 rounded-lg p-4 mb-4 flex items-center justify-between">
          <code className="text-blue-200 text-sm break-all" style={{maxHeight: 200, overflowY: 'auto'}}>
            {codeToShow}
          </code>
          <button
            className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => copyToClipboard(codeToCopy)}
          >
            Copier
          </button>
        </div>
        {/* Badges catégories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {icon.categories.map(cat => (
            <span key={cat} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{cat}</span>
          ))}
        </div>
        {/* Actions */}
        <div className="flex gap-3 w-full">
          <a
            href={`/icons/svgs/${style}/${icon.name}.svg`}
            download
            className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-center font-semibold text-gray-700 hover:bg-blue-50 transition"
          >
            Télécharger SVG
          </a>
        </div>
      </div>
    </div>
  );
}