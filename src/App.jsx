import { useState, useEffect } from 'react';
import { Cpu, Zap, RefreshCw, AlertTriangle, ChevronsRight, AlertCircle } from 'lucide-react';

// ===================================
//      CATALOG DATA (Integrated into App.jsx)
// ===================================
const catalog = {
  cpu: [
    { rank: 1, name: "AMD Ryzen 9 9950X3D", price: 669.98, socket: "AM5", brand: "AMD", tdp: 170 },
    { rank: 2, name: "AMD Ryzen 7 9800X3D", price: 476.99, socket: "AM5", brand: "AMD", tdp: 120 },
    { rank: 3, name: "AMD Ryzen 9 9900X3D", price: 559.98, socket: "AM5", brand: "AMD", tdp: 120 },
    { rank: 4, name: "AMD Ryzen 7 7800X3D", price: 359.00, socket: "AM5", brand: "AMD", tdp: 120 },
    { rank: 5, name: "Intel Core i9-14900K", price: 429.99, socket: "LGA1700", brand: "Intel", tdp: 125 },
    { rank: 6, name: "Intel Core i7-14700K", price: 299.99, socket: "LGA1700", brand: "Intel", tdp: 125 },
    { rank: 7, name: "Intel Core i5-14600K", price: 204.94, socket: "LGA1700", brand: "Intel", tdp: 125 },
    { rank: 8, name: "AMD Ryzen 5 7600X", price: 174.99, socket: "AM5", brand: "AMD", tdp: 105 },
    { rank: 9, name: "AMD Ryzen 7 5800X3D", price: 383.99, socket: "AM4", brand: "AMD", tdp: 105 },
    { rank: 10, name: "Intel Core 9 285K", price: 489.99, socket: "LGA1851", brand: "Intel", tdp: 125 },
    { rank: 11, name: "Intel Core 7 265K", price: 259.99, socket: "LGA1851", brand: "Intel", tdp: 125 },
  ],
  gpu: [
    { rank: 1, name: "NVIDIA GeForce RTX 5090", price: 2499.99, brand: "NVIDIA", tdp: 450 },
    { rank: 2, name: "NVIDIA GeForce RTX 4090", price: 2400, brand: "NVIDIA", tdp: 450 },
    { rank: 3, name: "NVIDIA GeForce RTX 5080", price: 999.99, brand: "NVIDIA", tdp: 350 },
    { rank: 4, name: "NVIDIA GeForce RTX 4080 Super", price: 1599.99, brand: "NVIDIA", tdp: 320 },
    { rank: 5, name: "AMD Radeon RX 7900 XTX", price: 749.99, brand: "AMD", tdp: 355 },
    { rank: 6, name: "NVIDIA GeForce RTX 5070 Ti", price: 749.99, brand: "NVIDIA", tdp: 300 },
    { rank: 7, name: "NVIDIA GeForce RTX 4070 Ti Super", price: 1499.99, brand: "NVIDIA", tdp: 285 },
    { rank: 8, name: "AMD Radeon RX 7900 XT", price: 629.99, brand: "AMD", tdp: 315 },
    { rank: 9, name: "NVIDIA GeForce RTX 5070", price: 549.99, brand: "NVIDIA", tdp: 250 },
    { rank: 10, name: "AMD Radeon RX 7900 GRE", price: 629.99, brand: "AMD", tdp: 260 },
    { rank: 11, name: "NVIDIA GeForce RTX 4070", price: 549.99, brand: "NVIDIA", tdp: 200 },
    { rank: 12, name: "AMD Radeon RX 7800 XT", price: 549.99, brand: "AMD", tdp: 263 },
    { rank: 13, name: "AMD Radeon RX 7700 XT", price: 349.99, brand: "AMD", tdp: 245 },
    { rank: 14, name: "NVIDIA GeForce RTX 4060 Ti", price: 329.99, brand: "NVIDIA", tdp: 160 },
    { rank: 15, name: "NVIDIA GeForce RTX 4060", price: 329.99, brand: "NVIDIA", tdp: 115 },
    { rank: 16, name: "AMD Radeon RX 7600", price: 249.99, brand: "AMD", tdp: 165 },
  ],
  motherboard: [
    { rank: 1, name: "High-End X870E (AMD AM5)", price: 299.99, socket: "AM5" },
    { rank: 2, name: "High-End Z890 (Intel LGA1851)", price: 179.99, socket: "LGA1851" },
    { rank: 3, name: "High-End Z790 (Intel LGA1700)", price: 169.99, socket: "LGA1700" },
    { rank: 4, name: "Performance B850 (AMD AM5)", price: 129.99, socket: "AM5" },
    { rank: 5, name: "Performance B650E (AMD AM5)", price: 149.99, socket: "AM5" },
    { rank: 6, name: "Performance Z790 (Intel LGA1700)", price: 169.99, socket: "LGA1700" },
    { rank: 7, name: "Value B650 (AMD AM5)", price: 109.99, socket: "AM5" },
    { rank: 8, name: "Value B760 (Intel LGA1700)", price: 89.99, socket: "LGA1700" },
    { rank: 9, name: "Budget B550 (AMD AM4)", price: 79.98, socket: "AM4" },
  ],
  ram: [
    { rank: 1, name: "64GB DDR5-6400 RAM Kit", price: 199.99 },
    { rank: 2, name: "32GB DDR5-6000 RAM Kit", price: 99.99 },
    { rank: 3, name: "16GB DDR5-5600 RAM Kit", price: 49.99 },
    { rank: 4, name: "32GB DDR4-3600 RAM Kit", price: 79.99 },
    { rank: 5, name: "16GB DDR4-3200 RAM Kit", price: 39.99 },
  ],
  storage: [
    { rank: 1, name: "2TB Gen5 NVMe SSD", price: 179.99 },
    { rank: 2, name: "4TB Gen4 NVMe SSD", price: 229.99 },
    { rank: 3, name: "2TB Gen4 NVMe SSD", price: 114.99 },
    { rank: 4, name: "1TB Gen5 NVMe SSD", price: 89.99 },
    { rank: 5, name: "1TB Gen4 NVMe SSD", price: 64.99 },
    { rank: 6, name: "2TB SATA SSD", price: 99.99 },
    { rank: 7, name: "1TB SATA SSD", price: 49.99 },
  ],
  psu: [
    { rank: 1, name: "1200W+ Gold PSU (Corsair/be quiet!)", price: 179.99, wattage: 1200 },
    { rank: 2, name: "1000W Gold PSU (Corsair/be quiet!)", price: 129.99, wattage: 1000 },
    { rank: 3, name: "850W Gold PSU (Corsair/be quiet!)", price: 99.99, wattage: 850 },
    { rank: 4, name: "750W Gold PSU (Corsair/be quiet!)", price: 89.99, wattage: 750 },
    { rank: 5, name: "650W Gold PSU (Corsair/be quiet!)", price: 69.99, wattage: 650 },
  ],
  case: [
    { rank: 1, name: "Premium Airflow Case (Fractal Design North, Lian Li O11)", price: 129.99 },
    { rank: 2, name: "Mid-Range Airflow Case (Corsair 4000D)", price: 99.99 },
    { rank: 3, name: "Popular SFF Case (Lian Li A4-H2O, Cooler Master NR200P)", price: 124.99 },
    { rank: 4, name: "Budget ATX Mid-Tower Case (NZXT)", price: 59.99 },
  ]
};

// ===================================
//      LOGIC (Ported from Server)
// ===================================

function selectPartFromCatalog(partType, maxPrice, filters = {}) {
    let availableParts = catalog[partType];
    if (!availableParts || !availableParts.length) throw new Error(`No catalog for type: ${partType}`);
    if (filters.brand && filters.brand !== 'any') availableParts = availableParts.filter(p => p.brand && p.brand.toLowerCase() === filters.brand.toLowerCase());
    if (filters.socket) availableParts = availableParts.filter(p => p.socket === filters.socket);
    if (filters.minWattage) availableParts = availableParts.filter(p => p.wattage >= filters.minWattage);
    const bestPart = availableParts.filter(part => part.price <= maxPrice).sort((a, b) => a.rank - b.rank)[0];
    return bestPart || null;
}

function getCheapestPart(partType, filters = {}) {
    let availableParts = catalog[partType];
    if (!availableParts || !availableParts.length) throw new Error(`No catalog for type: ${partType}`);
    if (filters.brand && filters.brand !== 'any') availableParts = availableParts.filter(p => p.brand && p.brand.toLowerCase() === filters.brand.toLowerCase());
    if (filters.socket) availableParts = availableParts.filter(p => p.socket === filters.socket);
    if (filters.minWattage) availableParts = availableParts.filter(p => p.wattage >= filters.minWattage);
    if (availableParts.length === 0) throw new Error(`Cannot find any matching cheapest part for ${partType} with current filters.`);
    return availableParts.sort((a, b) => a.price - b.price)[0];
}

function generateBuildAnalysis(build, resolution) {
    const cpuRank = build.cpu.rank;
    const gpuRank = build.gpu.rank;
    let analysis = `This build is centered around the ${build.cpu.name} and the ${build.gpu.name}. `;
    if (gpuRank <= 5) analysis += `With a top-tier GPU, this is a powerhouse designed for 4K and high-refresh-rate 1440p gaming. `;
    else if (gpuRank <= 12) analysis += `This combination is the sweet spot for high-frame-rate gaming at ${resolution}. Expect excellent performance. `;
    else analysis += `This is a great entry-level build for a solid 1080p gaming experience. `;
    if (cpuRank <= 4) analysis += `The high-end CPU ensures you won't face processor bottlenecks.`;
    else if (cpuRank <= 8) analysis += `The CPU offers fantastic value and will not hold back the GPU in modern games.`;
    return analysis;
}

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('build');
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold">PC Performance Suite</h1>
          <p className="text-gray-400 text-lg mt-4">Build a new PC or upgrade your current one.</p>
        </div>
        <div className="flex justify-center mb-8 border-b border-gray-700">
          <TabButton name="Build Generator" tabId="build" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton name="Upgrade Helper" tabId="upgrade" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {activeTab === 'build' ? <BuildGenerator /> : <UpgradeHelper />}
      </div>
    </div>
  );
}

// Tab Button Component
const TabButton = ({ name, tabId, activeTab, setActiveTab }) => (
  <button onClick={() => setActiveTab(tabId)} className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${activeTab === tabId ? 'border-b-2 border-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
    {name}
  </button>
);

// ===================================
//      BUILD GENERATOR COMPONENT
// ===================================
function BuildGenerator() {
    const [formData, setFormData] = useState({ budget: '', purpose: 'Gaming', resolution: '1080p', cpuBrand: 'any', gpuBrand: 'any' });
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        setTimeout(() => {
            try {
                const { budget, purpose, resolution, cpuBrand, gpuBrand } = formData;
                const numBudget = parseFloat(budget);
                if (!numBudget || numBudget <= 0) throw new Error('Please provide a valid budget.');

                const cheapestCpu = getCheapestPart('cpu', { brand: cpuBrand });
                const cheapestGpu = getCheapestPart('gpu', { brand: gpuBrand });
                const cheapestMobo = getCheapestPart('motherboard', { socket: cheapestCpu.socket });
                const cheapestRam = getCheapestPart('ram');
                const cheapestStorage = getCheapestPart('storage');
                const cheapestCase = getCheapestPart('case');
                const basePowerDraw = (cheapestCpu.tdp || 125) + (cheapestGpu.tdp || 250) + 100;
                const cheapestPsu = getCheapestPart('psu', { minWattage: basePowerDraw });

                const minBudget = [cheapestCpu, cheapestGpu, cheapestMobo, cheapestRam, cheapestStorage, cheapestCase, cheapestPsu]
                    .reduce((sum, part) => sum + (part ? part.price : 0), 0);

                if (numBudget < minBudget) {
                  throw new Error(`A viable build is not possible at this budget. Please enter at least $${Math.ceil(minBudget / 10) * 10}.`);
                }

                let allocation = { cpu: 0.25, gpu: 0.38, ram: 0.07, motherboard: 0.08, storage: 0.08, psu: 0.08, case: 0.06 };
                if (purpose === 'Gaming') {
                    if (resolution === '4K') { allocation.gpu += 0.15; allocation.cpu -= 0.10; }
                    else if (resolution === '1440p') { allocation.gpu += 0.08; allocation.cpu -= 0.05; }
                }
                
                const build = {};
                build.cpu = selectPartFromCatalog('cpu', numBudget * allocation.cpu, { brand: cpuBrand }) || getCheapestPart('cpu', { brand: cpuBrand });
                build.gpu = selectPartFromCatalog('gpu', numBudget * allocation.gpu, { brand: gpuBrand }) || getCheapestPart('gpu', { brand: gpuBrand });
                const estimatedPowerDraw = (build.cpu.tdp || 125) + (build.gpu.tdp || 250) + 150;
                build.motherboard = selectPartFromCatalog('motherboard', numBudget * allocation.motherboard, { socket: build.cpu.socket }) || getCheapestPart('motherboard', { socket: build.cpu.socket });
                build.psu = selectPartFromCatalog('psu', numBudget * allocation.psu, { minWattage: estimatedPowerDraw * 1.3 }) || getCheapestPart('psu', { minWattage: estimatedPowerDraw * 1.3 });
                build.ram = selectPartFromCatalog('ram', numBudget * allocation.ram) || getCheapestPart('ram');
                build.storage = selectPartFromCatalog('storage', numBudget * allocation.storage) || getCheapestPart('storage');
                build.case = selectPartFromCatalog('case', numBudget * allocation.case) || getCheapestPart('case');

                 let unspentBudget = numBudget - Object.values(build).reduce((sum, part) => sum + part.price, 0);
                const upgradePriority = ['gpu', 'cpu', 'ram', 'storage'];
                let upgradesMade;
                do {
                    upgradesMade = false;
                    for (const partType of upgradePriority) {
                        const currentPart = build[partType];
                        const filters = (partType === 'cpu' && cpuBrand !== 'any') ? { brand: cpuBrand } : (partType === 'gpu' && gpuBrand !== 'any') ? { brand: gpuBrand } : {};
                        const nextBestPart = catalog[partType].filter(p => p.rank < currentPart.rank && (!filters.brand || (p.brand && p.brand.toLowerCase() === filters.brand.toLowerCase()))).sort((a, b) => b.rank - a.rank)[0];
                        if (nextBestPart) {
                            let upgradeCost = nextBestPart.price - currentPart.price;
                            let changes = { [partType]: nextBestPart };
                            if (partType === 'cpu' && nextBestPart.socket !== currentPart.socket) {
                                const newMobo = selectPartFromCatalog('motherboard', build.motherboard.price + (unspentBudget - upgradeCost), { socket: nextBestPart.socket }) || getCheapestPart('motherboard', { socket: nextBestPart.socket });
                                if (!newMobo) continue;
                                upgradeCost += (newMobo.price - build.motherboard.price);
                                changes.motherboard = newMobo;
                            }
                            if (upgradeCost > 0 && upgradeCost <= unspentBudget) {
                                Object.assign(build, changes);
                                unspentBudget -= upgradeCost;
                                upgradesMade = true;
                                break;
                            }
                        }
                    }
                } while (upgradesMade);

                let totalPrice = Object.values(build).reduce((sum, part) => sum + part.price, 0);
                const downgradePriority = ['case', 'storage', 'ram', 'motherboard', 'gpu', 'cpu'];
                while (totalPrice > numBudget) {
                    let downgraded = false;
                    for (const partType of downgradePriority) {
                        const currentPart = build[partType];
                        const cheaperPart = catalog[partType].filter(p => p.price < currentPart.price && (!build.cpu.socket || partType !== 'motherboard' || p.socket === build.cpu.socket)).sort((a,b) => b.price - a.price)[0];
                        if (cheaperPart) {
                            build[partType] = cheaperPart;
                            totalPrice = Object.values(build).reduce((sum, part) => sum + part.price, 0);
                            downgraded = true;
                            break;
                        }
                    }
                    if (!downgraded) break;
                }

                const finalPrice = Object.values(build).reduce((sum, part) => sum + part.price, 0);
                const summary = (purpose === 'Gaming') ? generateBuildAnalysis(build, resolution) : `This build is optimized for your $${numBudget.toFixed(2)} budget.`;
                
                setResult({ build, totalPrice: finalPrice, summary });

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }, 100);
    };

    const partIcons = { cpu: Cpu, gpu: Zap, motherboard: Cpu, ram: Zap, storage: Cpu, psu: Zap, case: Cpu };
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
                            <option value="Gaming">Gaming</option><option value="Workstation">Workstation</option>
                        </select>
                    </div>
                    <div className="p-4 bg-black rounded-xl border border-gray-800">
                        <p className="text-sm font-medium text-blue-400 mb-3">Optional Preferences</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-2">CPU Brand</label>
                                <select name="cpuBrand" value={formData.cpuBrand} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                                    <option value="any">Any</option><option value="AMD">AMD</option><option value="Intel">Intel</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-2">GPU Brand</label>
                                <select name="gpuBrand" value={formData.gpuBrand} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                                    <option value="any">Any</option><option value="AMD">AMD</option><option value="NVIDIA">NVIDIA</option>
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
                                    <option value="1080p">1080p</option><option value="1440p">1440p</option><option value="4K">4K</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {error && (<div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center"><AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" /><p className="text-red-300 text-sm font-medium">{error}</p></div>)}
                    <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-4 rounded-xl text-lg transition duration-150 ease-in-out disabled:bg-gray-700">{isLoading ? 'Generating Build...' : 'Generate Build'}</button>
                </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-3">Your Custom Build</h2>
                {isLoading && <div className="text-center py-16"><RefreshCw className="w-12 h-12 animate-spin mx-auto text-blue-400" /></div>}
                {!result && !isLoading && (<div className="text-center text-gray-500 pt-16"><Cpu className="w-20 h-20 mx-auto opacity-30" /><p className="mt-4 text-lg">Your generated build will appear here.</p></div>)}
                {result && (<div className="space-y-6"><div className="bg-gradient-to-r from-blue-900/40 to-black rounded-xl p-6 border border-blue-700/50"><p className="text-sm font-semibold text-gray-400">ESTIMATED COST</p><p className="text-5xl font-extrabold mt-1">${result.totalPrice.toFixed(2)}</p></div><div className="bg-black border border-gray-800 rounded-xl p-4"><p className="text-yellow-300 text-sm font-medium">{result.summary}</p></div><div className="space-y-3">{Object.entries(result.build).map(([partType, part]) => { const Icon = partIcons[partType] || Cpu; return (<div key={partType} className="bg-black rounded-xl p-4 border border-gray-800 flex items-center space-x-4"><Icon className="w-6 h-6 text-blue-400 flex-shrink-0" /><div className="flex-1"><p className="text-xs text-gray-500 uppercase font-medium">{partType}</p><p className="font-semibold">{part.name}</p></div><p className="text-xl font-bold text-green-400">${part.price.toFixed(2)}</p></div>); })}</div></div>)}
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
        const cpuList = catalog.cpu.map(p => ({ name: p.name, rank: p.rank })).sort((a, b) => a.rank - b.rank);
        const gpuList = catalog.gpu.map(p => ({ name: p.name, rank: p.rank })).sort((a, b) => a.rank - b.rank);
        setComponents({ cpu: cpuList, gpu: gpuList });
        if (cpuList.length > 0) setCurrentCpu(cpuList[0].name);
        if (gpuList.length > 0) setCurrentGpu(gpuList[0].name);
    }, []);

    const handleUpgradeSubmit = () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        setTimeout(() => {
            try {
                const budget = parseFloat(upgradeBudget);
                if (isNaN(budget) || budget <= 0) throw new Error("Please enter a valid upgrade budget.");

                const cpu = catalog.cpu.find(p => p.name === currentCpu);
                const gpu = catalog.gpu.find(p => p.name === currentGpu);
                if (!cpu || !gpu) throw new Error("Selected components not found in catalog.");

                const bottleneckScore = cpu.rank - (gpu.rank * 0.9);
                const bottleneckComponent = bottleneckScore > 0 ? 'cpu' : 'gpu';
                
                let recommendation = null;
                let analysis = '';

                if (bottleneckComponent === 'gpu') {
                    recommendation = catalog.gpu.filter(p => p.rank < gpu.rank && p.price <= budget && (gpuBrand === 'any' || (p.brand && p.brand.toLowerCase() === gpuBrand.toLowerCase()))).sort((a, b) => a.rank - b.rank)[0];
                    if (recommendation) {
                        analysis = `Your ${gpu.name} is the bottleneck. Upgrading to a ${recommendation.name} for ~$${recommendation.price.toFixed(0)} will provide a significant uplift.`;
                    } else {
                        analysis = `Your ${gpu.name} is the bottleneck, but no better GPU was found within your $${budget.toFixed(0)} budget.`;
                        recommendation = { name: "No Upgrade Recommended", price: 0 };
                    }
                } else {
                    let sameSocketUpgrade = catalog.cpu.filter(p => p.rank < cpu.rank && p.price <= budget && p.socket === cpu.socket && (cpuBrand === 'any' || (p.brand && p.brand.toLowerCase() === cpuBrand.toLowerCase()))).sort((a, b) => a.rank - b.rank)[0];
                    if (sameSocketUpgrade) {
                        recommendation = sameSocketUpgrade;
                        analysis = `Your ${cpu.name} is the bottleneck. A great value upgrade on your current motherboard is the ${recommendation.name} for ~$${recommendation.price.toFixed(0)}.`;
                    } else {
                        let crossPlatformUpgrade = catalog.cpu.filter(p => p.rank < cpu.rank && p.price <= budget && (cpuBrand === 'any' || (p.brand && p.brand.toLowerCase() === cpuBrand.toLowerCase()))).sort((a, b) => a.rank - b.rank)[0];
                        if (crossPlatformUpgrade) {
                            recommendation = crossPlatformUpgrade;
                            analysis = `Your ${cpu.name} is the bottleneck. The best performance upgrade is the ${recommendation.name}. IMPORTANT: This CPU uses a different socket (${crossPlatformUpgrade.socket}). You will also need a new motherboard and likely new DDR5 RAM.`;
                        } else {
                            analysis = `Your ${cpu.name} is the bottleneck, but no CPU upgrade fits your $${budget.toFixed(0)} budget.`;
                            recommendation = { name: "No Upgrade Recommended", price: 0 };
                        }
                    }
                }
                setResult({ bottleneckComponent, recommendation, analysis });
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }, 100);
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
                      <option value="any">Any</option><option value="AMD">AMD</option><option value="Intel">Intel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">GPU Brand</label>
                    <select value={gpuBrand} onChange={(e) => setGpuBrand(e.target.value)} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                      <option value="any">Any</option><option value="AMD">AMD</option><option value="NVIDIA">NVIDIA</option>
                    </select>
                  </div>
                </div>
              </div>
              {error && <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center"><AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" /><p className="text-red-300 text-sm font-medium">{error}</p></div>}
              <button onClick={handleUpgradeSubmit} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-4 rounded-xl text-lg transition duration-150 ease-in-out disabled:bg-gray-700">
                {isLoading ? 'Analyzing...' : 'Find My Upgrade'}
              </button>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
            <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-3">Upgrade Path</h2>
            {isLoading && <div className="text-center py-16"><RefreshCw className="w-12 h-12 animate-spin mx-auto text-blue-400" /></div>}
            {!result && !isLoading && (<div className="text-center text-gray-500 pt-16"><ChevronsRight className="w-20 h-20 mx-auto opacity-30" /><p className="mt-4 text-lg">Enter your rig and budget to find your best upgrade.</p></div>)}
            {result && (<div className="space-y-6"><div><p className="text-sm text-gray-400">Identified Bottleneck</p><p className="text-2xl font-bold text-blue-400 capitalize">{result.bottleneckComponent}</p></div><div className="bg-black rounded-xl p-5 border border-gray-800"><p className="text-sm text-gray-400">Recommended Upgrade</p><p className="text-3xl font-bold mt-1">{result.recommendation.name}</p>{result.recommendation.price > 0 && <p className="text-2xl font-bold text-green-400 mt-1">~${result.recommendation.price.toFixed(0)}</p>}</div><div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4"><div className="flex"><AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" /><p className="text-yellow-300 text-sm font-medium">{result.analysis}</p></div></div></div>)}
          </div>
        </div>
    );
}

