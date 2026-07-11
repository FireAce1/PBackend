import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, Badge } from '../components/ui';
import { BarChart3, TrendingUp, AlertTriangle, Users, Heart } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const rainfallHistory = [
  { month: 'Jun 1', level: 120 },
  { month: 'Jun 10', level: 140 },
  { month: 'Jun 20', level: 210 },
  { month: 'Jul 1', level: 320 },
  { month: 'Jul 10', level: 410 }
];

const donationDisbursement = [
  { state: 'HP', amount: 12000000 },
  { state: 'PB', amount: 8750000 },
  { state: 'HR', amount: 1800000 }
];

export const Reports: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight">Reports & Analytics</h1>
        <p className="text-sm text-slate-500">Historical data modeling & regional stats</p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover className="flex gap-4 items-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-950/40 rounded-xl text-blue-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Total Rainfall (Jun-Jul)</span>
            <h3 className="text-2xl font-extrabold">1,200 mm</h3>
            <span className="text-[10px] text-red-500 font-bold">+18% vs Normal Season</span>
          </div>
        </Card>

        <Card hover className="flex gap-4 items-center">
          <div className="p-3 bg-red-100 dark:bg-red-950/40 rounded-xl text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Disaster Alerts Issued</span>
            <h3 className="text-2xl font-extrabold">24 Warnings</h3>
            <span className="text-[10px] text-slate-400 font-semibold">12 red warning levels</span>
          </div>
        </Card>

        <Card hover className="flex gap-4 items-center">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/40 rounded-xl text-emerald-600">
            <Heart size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block uppercase">Total Relief Mobilized</span>
            <h3 className="text-2xl font-extrabold">₹2.25 Cr</h3>
            <span className="text-[10px] text-emerald-500 font-bold">100% disbursed to NGOs</span>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Rainfall Accumulation */}
        <Card>
          <CardHeader>
            <CardTitle>Rainfall Accumulation Trend (mm)</CardTitle>
            <CardDescription>Comparative water levels over the season</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rainfallHistory}>
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="level" name="Precipitation (mm)" stroke="#2563EB" strokeWidth={2.5} fill="rgba(37, 99, 235, 0.1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* State-wise Donation Disbursement */}
        <Card>
          <CardHeader>
            <CardTitle>State-wise Relief Fund Disbursement (₹)</CardTitle>
            <CardDescription>Direct allocation of citizens and CM funds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donationDisbursement}>
                  <XAxis dataKey="state" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`} />
                  <Bar dataKey="amount" name="Relief Allotted" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </motion.div>
  );
};
