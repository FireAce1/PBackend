import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '../components/ui';
import { MapPin, Phone, Compass, Shield, Search, Plus } from 'lucide-react';
import { SafetyPoint } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MOCK_SAFETY_POINTS: SafetyPoint[] = [
  { id: 1, type: 'SHELTER', name: 'Model Town Community Hall', lat: 30.901, lng: 75.857, capacity: 250, currentStatus: 'OPEN', contactPhone: '9876543001', verifiedBy: 'Municipal Corporation', lastUpdated: '10m ago', state: 'Punjab', district: 'Ludhiana' },
  { id: 2, type: 'SHELTER', name: 'Field Ganj Government School', lat: 30.912, lng: 75.865, capacity: 150, currentStatus: 'FULL', contactPhone: '9876543002', verifiedBy: 'Municipal Corporation', lastUpdated: '1h ago', state: 'Punjab', district: 'Ludhiana' },
  { id: 3, type: 'FOOD_SUPPLY', name: 'Gurudwara Dukh Niwarin Sahib Kitchen', lat: 30.905, lng: 75.845, capacity: 500, currentStatus: 'OPEN', contactPhone: '9876543003', verifiedBy: 'Local Panchayat', lastUpdated: '30m ago', state: 'Punjab', district: 'Ludhiana' },
  { id: 4, type: 'MEDICAL', name: 'Civil Hospital Emergency Camp', lat: 30.895, lng: 75.852, capacity: 100, currentStatus: 'OPEN', contactPhone: '9876543004', verifiedBy: 'State Health Dept', lastUpdated: '15m ago', state: 'Punjab', district: 'Ludhiana' },
  { id: 5, type: 'FOOD_SUPPLY', name: 'Sarabha Nagar Market Distribution Point', lat: 30.888, lng: 75.825, capacity: 200, currentStatus: 'OPEN', contactPhone: '9876543005', verifiedBy: 'Red Cross Society', lastUpdated: '2h ago', state: 'Punjab', district: 'Ludhiana' }
];

export const SafetyPoints: React.FC = () => {
  const [points, setPoints] = useState<SafetyPoint[]>(MOCK_SAFETY_POINTS);
  const [filterType, setFilterType] = useState<'ALL' | 'SHELTER' | 'FOOD_SUPPLY' | 'MEDICAL'>('ALL');
  const [search, setSearch] = useState('');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Filter logic
  const filteredPoints = points.filter(p => {
    const matchesType = filterType === 'ALL' || p.type === filterType;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.verifiedBy.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Initialize Map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([30.901, 75.857], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Create marker styles
    const getIcon = (type: string) => {
      let color = '#2563EB'; // Blue for Shelter
      if (type === 'FOOD_SUPPLY') color = '#F59E0B'; // Orange
      if (type === 'MEDICAL') color = '#10B981'; // Emerald

      const svgHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
      
      return L.divIcon({
        html: svgHtml,
        className: 'custom-leaflet-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
    };

    // Add markers
    filteredPoints.forEach(p => {
      if (mapRef.current) {
        const marker = L.marker([p.lat, p.lng], { icon: getIcon(p.type) })
          .addTo(mapRef.current)
          .bindPopup(`
            <div style="font-family: inherit; font-size: 12px; padding: 4px;">
              <strong style="font-size: 13px;">${p.name}</strong><br/>
              <span style="color: #64748B;">Type: ${p.type}</span><br/>
              <span style="color: #64748B;">Capacity: ${p.capacity}</span><br/>
              <strong>Status: ${p.currentStatus}</strong>
            </div>
          `);
        markersRef.current.push(marker);
      }
    });

    // Auto-center on first result
    if (filteredPoints.length > 0 && mapRef.current) {
      mapRef.current.panTo([filteredPoints[0].lat, filteredPoints[0].lng]);
    }

  }, [filteredPoints]);

  const handleCardClick = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 15);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN': return <Badge variant="success">OPEN</Badge>;
      case 'FULL': return <Badge variant="danger">FULL</Badge>;
      default: return <Badge variant="secondary">CLOSED</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'SHELTER': return <Badge variant="primary">Shelter</Badge>;
      case 'FOOD_SUPPLY': return <Badge variant="warning">Food supply</Badge>;
      default: return <Badge variant="success">Medical Camp</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Safety & Relief Points</h1>
          <p className="text-sm text-slate-500">Find verified safe shelters, food distribution, and medical aid</p>
        </div>
        <Button className="flex items-center gap-1.5 text-xs font-bold py-2">
          <Plus size={16} /> Request Shelter Verification
        </Button>
      </div>

      {/* Map & List container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)] min-h-[500px]">
        
        {/* Left Side: Filter and safety cards list */}
        <div className="lg:col-span-1 flex flex-col space-y-4 h-full overflow-y-auto pr-1">
          
          <Card className="p-4 space-y-3 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search shelter or hospital name..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'SHELTER', 'FOOD_SUPPLY', 'MEDICAL'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t as any)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    filterType === t
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </Card>

          {/* Cards List */}
          <div className="space-y-3 flex-1 overflow-y-auto">
            {filteredPoints.map(p => (
              <div
                key={p.id}
                onClick={() => handleCardClick(p.lat, p.lng)}
                className="cursor-pointer"
              >
                <Card hover className="p-4 space-y-3 border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{p.name}</h4>
                    {getStatusBadge(p.currentStatus)}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {getTypeBadge(p.type)}
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Compass size={12} /> 1.2 km away
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 flex items-center gap-1.5">
                    <Shield size={12} className="text-emerald-500" />
                    Verified by: {p.verifiedBy}
                  </p>

                  <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800/80 pt-3 text-[10px]">
                    <span className="font-bold text-slate-500">Cap: {p.capacity} persons</span>
                    <a href={`tel:${p.contactPhone}`} className="text-blue-600 font-bold flex items-center gap-1">
                      <Phone size={10} /> Call Contact
                    </a>
                  </div>
                </Card>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Map Container */}
        <div className="lg:col-span-2 h-full rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 relative bg-slate-100">
          <div ref={mapContainerRef} className="absolute inset-0 z-10" />
        </div>

      </div>

    </motion.div>
  );
};
