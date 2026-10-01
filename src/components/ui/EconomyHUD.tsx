import { useEconomyStore } from '../../store/useEconomyStore';
import { formatMoney } from '../../game/economy/economyUtils';

export function EconomyHUD() {
  const balance = useEconomyStore(state => state.balance);
  
  return (
    <div className="bg-[#1a1815]/80 border border-[#c59c5d]/30 px-3 py-1.5 rounded-md backdrop-blur-md flex items-center space-x-2 pointer-events-auto shadow-lg">
      <div className="text-[#c59c5d]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="10" y1="10" x2="14" y2="10"></line>
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-[9px] uppercase tracking-wider text-[#c59c5d]/70 font-bold leading-none mb-0.5">Funding</span>
        <div className="text-[13px] font-bold text-amber-50/90 tracking-wide leading-none">
          {formatMoney(balance)}
        </div>
      </div>
    </div>
  );
}
