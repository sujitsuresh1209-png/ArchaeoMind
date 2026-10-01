import { useState } from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { ArtifactDetails } from './ArtifactDetails';
import { ArtifactType } from '../../game/artifacts/artifactTypes';

export function InventoryPanel() {
  const { items, capacity, isOpen, closeInventory } = useInventoryStore();
  const [filterType, setFilterType] = useState<ArtifactType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'Name' | 'Rarity' | 'Condition' | 'HistoricalValue' | 'MarketValue'>('Name');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  if (!isOpen) return null;
  
  const filtered = items.filter(i => filterType === 'All' || i.type === filterType);
  
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Condition') return b.condition - a.condition;
    if (sortBy === 'MarketValue') return b.marketValue - a.marketValue;
    if (sortBy === 'Rarity') {
      const rarityRank = { 'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Very Rare': 4, 'Unique': 5 } as Record<string, number>;
      return rarityRank[b.rarity] - rarityRank[a.rarity];
    }
    if (sortBy === 'HistoricalValue') {
      const valRank = { 'Low': 1, 'Medium': 2, 'High': 3, 'Exceptional': 4 } as Record<string, number>;
      return valRank[b.historicalValue] - valRank[a.historicalValue];
    }
    return 0;
  });

  const selectedItem = items.find(i => i.id === selectedId) || null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto">
      <div className="bg-[#121110] border border-[#3a352a] rounded-xl shadow-2xl flex max-w-6xl w-full h-[80vh] overflow-hidden text-white">
        
        {/* Left: List & Filters */}
        <div className="w-2/3 border-r border-[#3a352a] flex flex-col">
          <div className="p-4 border-b border-[#3a352a] flex justify-between items-center bg-[#1a1815]">
            <h2 className="text-xl font-bold text-[#c59c5d]">Inventory Database</h2>
            <div className="text-sm opacity-60">
              Capacity: {items.length} / {capacity}
            </div>
          </div>
          
          <div className="p-3 bg-[#161513] border-b border-[#3a352a] flex space-x-4 text-sm">
            <select 
              className="bg-[#0a0a09] border border-[#3a352a] p-1 rounded text-white"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="All">All Types</option>
              {Object.values(ArtifactType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            
            <select 
              className="bg-[#0a0a09] border border-[#3a352a] p-1 rounded text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="Name">Sort: Name</option>
              <option value="Rarity">Sort: Rarity</option>
              <option value="Condition">Sort: Condition</option>
              <option value="HistoricalValue">Sort: Historical Value</option>
              <option value="MarketValue">Sort: Market Value</option>
            </select>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {sorted.map(item => (
              <button 
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`text-left p-3 rounded border transition-colors ${selectedId === item.id ? 'bg-[#2a251a] border-[#c59c5d]' : 'bg-[#1a1815] border-[#3a352a] hover:border-[#5a554a]'}`}
              >
                <div className="font-semibold text-[#e6d0a4] mb-1">{item.name}</div>
                <div className="text-xs opacity-60 flex justify-between">
                  <span>{item.type}</span>
                  <span className="text-[#a4e6d0]">{item.rarity}</span>
                </div>
              </button>
            ))}
            {sorted.length === 0 && (
              <div className="col-span-3 text-center text-white/40 mt-10">No artifacts found.</div>
            )}
          </div>
        </div>
        
        {/* Right: Details */}
        <div className="w-1/3 bg-[#1a1815] flex flex-col relative">
          <button 
            onClick={closeInventory}
            className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            ✕
          </button>
          
          <div className="flex-1 overflow-y-auto p-6 mt-8">
            {selectedItem ? (
              <>
                <h3 className="text-lg font-semibold text-white/50 mb-4 uppercase tracking-wider border-b border-white/10 pb-2">Artifact Analysis</h3>
                <ArtifactDetails artifact={selectedItem} />
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-white/30 text-sm">
                Select an artifact to view details
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
