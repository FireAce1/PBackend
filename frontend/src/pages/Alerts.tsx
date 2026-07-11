import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '../components/ui';
import { AlertTriangle, Clock, Search, MapPin, CheckCircle, Volume2 } from 'lucide-react';
import { Alert as AlertType } from '../types';

const MOCK_ALERTS: AlertType[] = [
  { id: '1', regionCode: 'LUD-WEST', severity: 'EMERGENCY', message: 'Severe street flooding in Field Ganj. Power lines isolated for safety. Evacuate immediately if water enters ground levels.', issuedAt: '12:15 PM', expiresAt: '6:00 PM' },
  { id: '2', regionCode: 'PUN-STATE', severity: 'WARNING', message: 'Sutlej River levels rising near Ropar. Embankments on standby. Avoid river banks or farm crossings.', issuedAt: '10:30 AM', expiresAt: '12:00 AM' },
  { id: '3', regionCode: 'LUD-EAST', severity: 'WATCH', message: 'Moderate rain accumulation on GT Road near Sherpur Chowk. Traffic slowdowns reported.', issuedAt: '9:15 AM', expiresAt: '3:00 PM' },
  { id: '4', regionCode: 'PUN-NORTH', severity: 'ADVISORY', message: 'Gusty winds (40km/h) expected in Pathankot. Secure weak rooftop structures.', issuedAt: '8:00 AM', expiresAt: '4:00 PM' }
];

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertType[]>(MOCK_ALERTS);
  const [filter, setFilter] = useState<'ALL' | 'EMERGENCY' | 'WARNING' | 'WATCH'>('ALL');
  const [search, setSearch] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'ALL' || alert.severity === filter;
    const matchesSearch = alert.message.toLowerCase().includes(search.toLowerCase()) ||
                          alert.regionCode.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'EMERGENCY': return 'border-l-red-600 bg-red-50/10 border-red-500/30';
      case 'WARNING': return 'border-l-orange-500 bg-orange-50/10 border-orange-500/30';
      case 'WATCH': return 'border-l-amber-500 bg-amber-50/10 border-amber-500/30';
      default: return 'border-l-blue-500 bg-blue-50/10 border-blue-500/30';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'EMERGENCY': return <Badge variant="danger">EMERGENCY</Badge>;
      case 'WARNING': return <Badge variant="danger" className="bg-orange-600 hover:bg-orange-700">WARNING</Badge>;
      case 'WATCH': return <Badge variant="warning">WATCH</Badge>;
      default: return <Badge variant="info">ADVISORY</Badge>;
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
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            Live Alerts
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          </h1>
          <p className="text-sm text-slate-500">Real-time emergency broadcast announcements</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center gap-1 text-xs py-1.5 px-3">
            <Volume2 size={14} /> Play Siren Sound
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Severity Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {['ALL', 'EMERGENCY', 'WARNING', 'WATCH'].map(level => (
            <button
              key={level}
              onClick={() => setFilter(level as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === level
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by area or alert text..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
          />
        </div>

      </Card>

      {/* Alerts Timeline */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card className="text-center py-12 flex flex-col items-center">
            <CheckCircle className="text-emerald-500 mb-2" size={32} />
            <h4 className="font-bold text-sm">All Clear!</h4>
            <p className="text-xs text-slate-400 mt-1">No matching active alerts for your filters.</p>
          </Card>
        ) : (
          filteredAlerts.map(alert => (
            <motion.div
              key={alert.id}
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Card className={`border-l-4 ${getSeverityStyle(alert.severity)}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(alert.severity)}
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <MapPin size={12} /> {alert.regionCode}
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
                      {alert.message}
                    </p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80 pt-3 sm:pt-0 gap-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> Issued: {alert.issuedAt}
                    </span>
                    <span className="font-bold text-red-500/80">
                      Expires: {alert.expiresAt}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

    </motion.div>
  );
};
