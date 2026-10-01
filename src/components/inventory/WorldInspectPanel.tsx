import { useInventoryStore } from '../../store/useInventoryStore';
import { useInteractionStore } from '../../store/useInteractionStore';
import { ArtifactDetails } from './ArtifactDetails';

export function WorldInspectPanel() {
  const inspectItem = useInventoryStore(state => state.worldInspectItem);
  const closeWorldInspect = useInventoryStore(state => state.closeWorldInspect);
  const addItem = useInventoryStore(state => state.addItem);
  const setFeedback = useInteractionStore(state => state.setFeedbackMessage);
  
  if (!inspectItem) return null;
  
  const handleCollect = () => {
    const success = addItem(inspectItem);
    if (success) {
      setFeedback(`${inspectItem.name} added to inventory.`);
      closeWorldInspect();
    } else {
      setFeedback(`Inventory full. Cannot collect ${inspectItem.name}.`);
    }
  };
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
      <div className="bg-[#1a1815] border border-[#3a352a] rounded-lg shadow-2xl p-6 max-w-lg w-full text-white">
        <h2 className="text-2xl font-semibold text-[#c59c5d] mb-4 border-b border-[#3a352a] pb-2">Inspect Artifact</h2>
        
        <ArtifactDetails artifact={inspectItem} />
        
        <div className="mt-6 flex justify-end space-x-4">
          <button 
            onClick={closeWorldInspect}
            className="px-4 py-2 border border-[#4a453a] text-white/70 hover:bg-[#2a2825] hover:text-white rounded transition"
          >
            Close
          </button>
          <button 
            onClick={handleCollect}
            className="px-6 py-2 bg-[#c59c5d] text-black font-semibold rounded hover:bg-[#d6ad6e] transition"
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
}
