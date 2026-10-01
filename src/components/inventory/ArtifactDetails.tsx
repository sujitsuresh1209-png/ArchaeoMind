import type { Artifact } from '../../game/artifacts/artifactTypes';

export function ArtifactDetails({ artifact }: { artifact: Artifact }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded p-4 text-sm text-white/90">
      <h3 className="text-xl font-bold text-[#e6d0a4] mb-2">{artifact.name}</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="opacity-50 block text-xs">Type</span>
          <span>{artifact.type}</span>
        </div>
        <div>
          <span className="opacity-50 block text-xs">Material</span>
          <span>{artifact.material}</span>
        </div>
        <div>
          <span className="opacity-50 block text-xs">Era</span>
          <span>{artifact.era}</span>
        </div>
        <div>
          <span className="opacity-50 block text-xs">Rarity</span>
          <span className="text-[#a4e6d0]">{artifact.rarity}</span>
        </div>
        <div>
          <span className="opacity-50 block text-xs">Condition</span>
          <span>{artifact.condition}% ({artifact.preservationStatus})</span>
        </div>
        <div>
          <span className="opacity-50 block text-xs">Discovery Location</span>
          <span>{artifact.discoveryLocation}</span>
        </div>
        <div>
          <span className="opacity-50 block text-xs">Layer</span>
          <span>{artifact.excavationLayer}</span>
        </div>
        <div>
          <span className="opacity-50 block text-xs">Method</span>
          <span>{artifact.discoveryMethod}</span>
        </div>
      </div>
      <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
        <div>
          <span className="opacity-50 block text-xs">Historical Value</span>
          <span>{artifact.historicalValue}</span>
        </div>
        <div>
          <span className="opacity-50 block text-xs">Market Value</span>
          <span>₹{artifact.marketValue}</span>
        </div>
      </div>
      
      <div className="mt-6 border border-white/5 bg-black/20 p-3 rounded opacity-50">
        <p className="text-xs text-center">[ Reserved for Laboratory Analysis & Knowledge Graph ]</p>
      </div>
    </div>
  );
}
