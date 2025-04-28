import { Icon } from '../services/icons';

interface IconCardProps {
  icon: Icon;
}

export default function IconCard({ icon }: IconCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg">
          <i 
            className={`fa-${icon.styles[0]} fa-${icon.name} text-4xl text-gray-700 group-hover:text-blue-600 transition-colors duration-200`}
            style={{ 
              fontFamily: 'Font Awesome 6 Pro',
              fontWeight: icon.styles[0] === 'solid' ? 900 : 
                         icon.styles[0] === 'regular' ? 400 :
                         icon.styles[0] === 'light' ? 300 :
                         icon.styles[0] === 'thin' ? 100 : 900
            }}
          ></i>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900 text-center truncate">{icon.name}</p>
        </div>
      </div>
    </div>
  );
} 