import { Icon } from '../services/icons';

interface IconCardProps {
  icon: Icon;
  onClick?: () => void;
}

export default function IconCard({ icon, onClick }: IconCardProps) {
  return (
    <div
      className="relative bg-gradient-to-b from-white to-[#f4f4f4] rounded-[50px] shadow-[rgba(255,255,255,0.59)_0px_13.8px_13.3px_-12.2px_inset,rgba(255,255,255,0.22)_0px_1.5px_4.6px_0px_inset,rgba(0,0,0,0.1)_0px_0.8px_0.8px_0px,rgba(0,0,0,0.09)_0px_1.6px_1.6px_0px,rgba(0,0,0,0.05)_0px_4.2px_2.5px_0px,rgba(0,0,0,0.01)_0px_7.5px_3.3px_0px,rgba(0,0,0,0)_0px_11.7px_3.3px_0px] p-6 group cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] w-full rounded-[24px] bg-[#F4F4F4] overflow-hidden mb-6 flex items-center justify-center">
        <i
          className={`fa-${icon.styles[0]} fa-${icon.name} text-5xl md:text-7xl text-gray-700 group-hover:text-blue-600 transition-colors duration-200`}
          style={{ fontFamily: 'Font Awesome 6 Pro', fontWeight: icon.styles[0] === 'solid' ? 900 : 400 }}
        ></i>
      </div>
      <h3 className="text-[20px] font-semibold mb-1 text-black text-center truncate w-full">{icon.name}</h3>
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {icon.categories.map(cat => (
          <span key={cat} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{cat}</span>
        ))}
      </div>
      <span className="text-[13px] text-black/50">{icon.family}</span>
    </div>
  );
} 