import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  CloudRain, AlertTriangle, MapPin, CheckSquare, HeartHandshake,
  Compass, Phone, ArrowRight, ShieldCheck, Activity, Users, HelpCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, ProgressBar } from '../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const rainData = [
  { time: '09:00', rainfall: 5 },
  { time: '12:00', rainfall: 25 },
  { time: '15:00', rainfall: 45 },
  { time: '18:00', rainfall: 80 },
  { time: '21:00', rainfall: 60 },
  { time: '00:00', rainfall: 15 }
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Top Welcome & Severity Alert Banner */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
          <CloudRain size={250} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge variant="warning" className="bg-amber-500/20 text-amber-200 border-amber-500/30">
              ORANGE ALERT — HEAVY SHOWERS EXPECTED
            </Badge>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Citizen'}
            </h1>
            <p className="text-sm text-blue-100 max-w-xl">
              Heavy rain (80mm+) predicted in {user?.address?.city || 'Ludhiana'} in the next 12 hours. Please check your safety checklist and stay updated on active local shelters.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate('/preparedness')} className="font-bold flex items-center gap-1.5 shadow-sm">
              <CheckSquare size={16} />
              Review Prep Plan
            </Button>
            <Button variant="success" onClick={() => navigate('/safety-points')} className="font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm">
              <MapPin size={16} />
              Find Shelters
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats summary row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card hover className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-950/40 rounded-xl text-blue-600 dark:text-blue-400">
            <CloudRain size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rain Intensity</span>
            <h4 className="text-xl font-extrabold text-slate-800 dark:text-white">80 mm/hr</h4>
            <p className="text-[10px] text-slate-500">Very High Rainfall</p>
          </div>
        </Card>

        <Card hover className="flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-950/40 rounded-xl text-red-600 dark:text-red-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Alerts</span>
            <h4 className="text-xl font-extrabold text-slate-800 dark:text-white">3 Regions</h4>
            <p className="text-[10px] text-red-500 font-bold">1 Emergency warning</p>
          </div>
        </Card>

        <Card hover className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/40 rounded-xl text-emerald-600 dark:text-emerald-400">
            <MapPin size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Safety Shelters</span>
            <h4 className="text-xl font-extrabold text-slate-800 dark:text-white">12 Open</h4>
            <p className="text-[10px] text-slate-500">800+ total capacity</p>
          </div>
        </Card>

        <Card hover className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/40 rounded-xl text-amber-600 dark:text-amber-400">
            <CheckSquare size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Prep Completion</span>
            <h4 className="text-xl font-extrabold text-slate-800 dark:text-white">75%</h4>
            <p className="text-[10px] text-slate-500">3 of 4 checklists done</p>
          </div>
        </Card>
      </motion.div>

      {/* Main Panels grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Rainfall graph and Weather Alert Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Rainfall Trend Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Rainfall Severity Trend</CardTitle>
              <CardDescription>Predicted precipitation levels for the next 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rainData}>
                    <defs>
                      <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRain)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Helplines</CardTitle>
              <CardDescription>Direct state & local emergency control rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-slate-100 dark:border-slate-800 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-center flex flex-col items-center">
                  <Phone size={20} className="text-red-500 mb-1" />
                  <span className="text-xs text-slate-400 font-bold uppercase">Disaster Control</span>
                  <span className="text-base font-extrabold text-red-600 dark:text-red-400 mt-1">1078</span>
                </div>
                <div className="border border-slate-100 dark:border-slate-800 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-center flex flex-col items-center">
                  <Phone size={20} className="text-blue-500 mb-1" />
                  <span className="text-xs text-slate-400 font-bold uppercase">Police Support</span>
                  <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-1">112</span>
                </div>
                <div className="border border-slate-100 dark:border-slate-800 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-center flex flex-col items-center">
                  <Phone size={20} className="text-emerald-500 mb-1" />
                  <span className="text-xs text-slate-400 font-bold uppercase">Medical Hotline</span>
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">102 / 108</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Live Alerts & Checklist Status */}
        <div className="space-y-6">

          {/* Active Alerts Timeline */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Live Regional Alerts</CardTitle>
                <CardDescription>Real-time threat notifications</CardDescription>
              </div>
              <Link to="/alerts" className="text-xs text-blue-600 hover:underline flex items-center font-bold">
                View All <ArrowRight size={12} className="ml-1" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 border-l-2 border-red-500 pl-3">
                <div className="min-w-2 mt-1.5 h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold">LUDHIANA WEST • EMERGENCY</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed mt-0.5">
                    Severe waterlogging in Field Ganj. Residents are advised to avoid ground levels.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 border-l-2 border-amber-500 pl-3">
                <div className="min-w-2 mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold">PUNJAB STATE • WATCH</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed mt-0.5">
                    Sutlej River levels are rising rapidly. Low-lying farms on standby for evacuation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preparedness Quick Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Monsoon Preparedness</CardTitle>
              <CardDescription>Checklist completions based on your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Household Safety Plan</span>
                  <span>75%</span>
                </div>
                <ProgressBar value={75} color="primary" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Emergency Stockpile</span>
                  <span>100%</span>
                </div>
                <ProgressBar value={100} color="success" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Electricity & Drainage checks</span>
                  <span>40%</span>
                </div>
                <ProgressBar value={40} color="warning" />
              </div>

              <Button variant="outline" onClick={() => navigate('/preparedness')} className="w-full text-xs py-2 font-bold flex justify-center items-center gap-1">
                Open Detailed Checklist
              </Button>
            </CardContent>
          </Card>

          {/* Citizen NGO Support drive */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>NGO Relief Funds</CardTitle>
                <CardDescription>Support local citizen relief drives</CardDescription>
              </div>
              <Link to="/donations" className="text-xs text-blue-600 hover:underline flex items-center font-bold">
                Donate <ArrowRight size={12} className="ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="border border-slate-100 dark:border-slate-800 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PUNJAB FLOOD RELIEF</span>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Red Cross Ludhiana Chapter</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Raising funds for food packets and water filtration kits for 500 displaced families.
                </p>
                <div className="mt-3 flex justify-between items-center text-xs">
                  <span className="font-extrabold text-blue-600">₹4,20,000 / ₹5,000,000</span>
                  <Badge variant="success">Verified NGO</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </motion.div>
    </motion.div>
  );
};
