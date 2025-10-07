import { useState, useEffect } from 'react';
import { Cpu, Zap, RefreshCw, AlertTriangle, ChevronsRight, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api';

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('build'); // 'build' or 'upgrade'

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold">PC Performance Suite</h1>
          <p className="text-gray-400 text-lg mt-4">Build a new PC or upgrade your current one.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 border-b border-gray-700">
          <TabButton name="Build Generator" tabId="build" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton name="Upgrade Helper" tabId="upgrade" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Conditional Rendering of Tabs */}
        {activeTab === 'build' ? <BuildGenerator /> : <UpgradeHelper />}
      </div>
    </div>
  );
}

// Tab Button Component
const TabButton = ({ name, tabId, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(tabId)}
    className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
      activeTab === tabId
        ? 'border-b-2 border-blue-500 text-white'
        : 'text-gray-500 hover:text-gray-300'
    }`}
  >
    {name}
  </button>
);


// ===================================
//      BUILD GENERATOR COMPONENT
// ===================================
function BuildGenerator() {
    const [formData, setFormData] = useState({
        budget: '', purpose: 'Gaming', resolution: '1080p', cpuBrand: 'any', gpuBrand: 'any'
    });
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await fetch(`${API_BASE_URL}/build`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, budget: parseFloat(formData.budget) || 0 }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to generate build');
            }
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const partIcons = {
        cpu: Cpu, gpu: Zap, motherboard: Cpu, ram: Zap,
        storage: Cpu, psu: Zap, case: Cpu,
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
             <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-3">Build Requirements</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Budget (USD)</label>
                        <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="e.g., 1500" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg placeholder-gray-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Primary Use</label>
                        <select name="purpose" value={formData.purpose} onChange={handleInputChange} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg">
                            <option value="Gaming">Gaming</option>
                            <option value="Workstation">Workstation</option>
                        </select>
                    </div>
                    <div className="p-4 bg-black rounded-xl border border-gray-800">
                        <p className="text-sm font-medium text-blue-400 mb-3">Optional Preferences</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-2">CPU Brand</label>
                                <select name="cpuBrand" value={formData.cpuBrand} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                                    <option value="any">Any</option>
                                    <option value="AMD">AMD</option>
                                    <option value="Intel">Intel</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-2">GPU Brand</label>
                                <select name="gpuBrand" value={formData.gpuBrand} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                                    <option value="any">Any</option>
                                    <option value="AMD">AMD</option>
                                    <option value="NVIDIA">NVIDIA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {formData.purpose === 'Gaming' && (
                        <div className="p-4 bg-black rounded-xl border border-gray-800">
                            <p className="text-sm font-medium text-blue-400 mb-3">Gaming Target</p>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-2">Target Resolution</label>
                                <select name="resolution" value={formData.resolution} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                                    <option value="1080p">1080p</option>
                                    <option value="1440p">1440p</option>
                                    <option value="4K">4K</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                            <p className="text-red-300 text-sm font-medium">{error}</p>
                        </div>
                    )}
                    <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-4 rounded-xl text-lg transition duration-150 ease-in-out disabled:bg-gray-700">
                        {isLoading ? 'Generating Build...' : 'Generate Build'}
                    </button>
                </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-3">Your Custom Build</h2>
                {isLoading && <div className="text-center py-16"><RefreshCw className="w-12 h-12 animate-spin mx-auto text-blue-400" /></div>}
                {!result && !isLoading && (
                    <div className="text-center text-gray-500 pt-16">
                        <Cpu className="w-20 h-20 mx-auto opacity-30" />
                        <p className="mt-4 text-lg">Your generated build will appear here.</p>
                    </div>
                )}
                {result && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-900/40 to-black rounded-xl p-6 border border-blue-700/50">
                            <p className="text-sm font-semibold text-gray-400">ESTIMATED COST</p>
                            <p className="text-5xl font-extrabold mt-1">${result.totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="bg-black border border-gray-800 rounded-xl p-4">
                            <p className="text-yellow-300 text-sm font-medium">{result.summary}</p>
                        </div>
                        <div className="space-y-3">
                            {Object.entries(result.build).map(([partType, part]) => {
                                const Icon = partIcons[partType] || Cpu;
                                return (
                                <div key={partType} className="bg-black rounded-xl p-4 border border-gray-800 flex items-center space-x-4">
                                    <Icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                                    <div className="flex-1">
                                    <p className="text-xs text-gray-500 uppercase font-medium">{partType}</p>
                                    <p className="font-semibold">{part.name}</p>
                                    </div>
                                    <p className="text-xl font-bold text-green-400">${part.price.toFixed(2)}</p>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


// ===================================
//      UPGRADE HELPER COMPONENT
// ===================================
function UpgradeHelper() {
  const [components, setComponents] = useState({ cpu: [], gpu: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  const [currentCpu, setCurrentCpu] = useState('');
  const [currentGpu, setCurrentGpu] = useState('');
  const [upgradeBudget, setUpgradeBudget] = useState('');
  const [cpuBrand, setCpuBrand] = useState('any');
  const [gpuBrand, setGpuBrand] = useState('any');

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/components`);
        if (!response.ok) throw new Error('Failed to load components');
        const data = await response.json();
        setComponents(data);
        if (data.cpu.length > 0) setCurrentCpu(data.cpu[0].name);
        if (data.gpu.length > 0) setCurrentGpu(data.gpu[0].name);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchComponents();
  }, []);

  const handleUpgradeSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`${API_BASE_URL}/upgrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentCpu, currentGpu, upgradeBudget, cpuBrand, gpuBrand }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to get recommendation');
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-3">Your Current Rig</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Current CPU</label>
            <select value={currentCpu} onChange={(e) => setCurrentCpu(e.target.value)} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg">
              {components.cpu.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Current GPU</label>
            <select value={currentGpu} onChange={(e) => setCurrentGpu(e.target.value)} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg">
              {components.gpu.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Upgrade Budget (USD)</label>
            <input type="number" value={upgradeBudget} onChange={(e) => setUpgradeBudget(e.target.value)} placeholder="e.g., 500" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg" />
          </div>
          <div className="p-4 bg-black rounded-xl border border-gray-800">
            <p className="text-sm font-medium text-blue-400 mb-3">Upgrade Preferences</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">CPU Brand</label>
                <select value={cpuBrand} onChange={(e) => setCpuBrand(e.target.value)} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                  <option value="any">Any</option>
                  <option value="AMD">AMD</option>
                  <option value="Intel">Intel</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">GPU Brand</label>
                <select value={gpuBrand} onChange={(e) => setGpuBrand(e.target.value)} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                  <option value="any">Any</option>
                  <option value="AMD">AMD</option>
                  <option value="NVIDIA">NVIDIA</option>
                </select>
              </div>
            </div>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button onClick={handleUpgradeSubmit} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-4 rounded-xl text-lg transition duration-150 ease-in-out disabled:bg-gray-700">
            {isLoading ? 'Analyzing...' : 'Find My Upgrade'}
          </button>
        </div>
      </div>
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-3">Upgrade Path</h2>
        {isLoading && <div className="text-center py-16"><RefreshCw className="w-12 h-12 animate-spin mx-auto text-blue-400" /></div>}
        {!result && !isLoading && (
            <div className="text-center text-gray-500 pt-16">
                <ChevronsRight className="w-20 h-20 mx-auto opacity-30" />
                <p className="mt-4 text-lg">Enter your rig and budget to find your best upgrade.</p>
            </div>
        )}
        {result && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-400">Identified Bottleneck</p>
              <p className="text-2xl font-bold text-blue-400 capitalize">{result.bottleneckComponent}</p>
            </div>
            <div className="bg-black rounded-xl p-5 border border-gray-800">
              <p className="text-sm text-gray-400">Recommended Upgrade</p>
              <p className="text-3xl font-bold mt-1">{result.recommendation.name}</p>
              {result.recommendation.price > 0 && <p className="text-2xl font-bold text-green-400 mt-1">~${result.recommendation.price.toFixed(0)}</p>}
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
               <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                  <p className="text-yellow-300 text-sm font-medium">{result.analysis}</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

