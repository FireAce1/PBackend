import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, ProgressBar } from '../components/ui';
import { Search, Heart, ShieldCheck, ArrowUpRight, Award, ExternalLink } from 'lucide-react';
import { DonationDrive } from '../types';

const MOCK_DRIVES: DonationDrive[] = [
  { id: 1, state: 'Punjab', ngoName: 'Punjab CM Relief Fund', description: 'Official state disaster relief account for flash flood rescue operations and infrastructure repair.', targetAmount: 10000000, raisedAmount: 7500000, paymentLink: 'https://punjab.gov.in/cm-relief-fund', verificationDocUrl: 'official', status: 'VERIFIED' },
  { id: 2, state: 'Punjab', ngoName: 'Red Cross Society Ludhiana', description: 'Providing packed meals, clean drinking water, hygiene products, and temporary tarpaulin sheets to 1000+ displaced families.', targetAmount: 2500000, raisedAmount: 1250000, paymentLink: 'https://redcross.org.in', verificationDocUrl: 'doc', status: 'VERIFIED' },
  { id: 3, state: 'Haryana', ngoName: 'Haryana Disaster Response Fund', description: 'Assisting village councils in Ambala and Yamunanagar with drainage clearings and safety rescues.', targetAmount: 5000000, raisedAmount: 1800000, paymentLink: 'https://haryana.gov.in', verificationDocUrl: 'official', status: 'VERIFIED' },
  { id: 4, state: 'Himachal Pradesh', ngoName: 'HP CM Relief Fund (Flood)', description: 'Direct assistance to families displaced by landslides and river surges in Mandi and Shimla districts.', targetAmount: 15000000, raisedAmount: 12000000, paymentLink: 'https://hp.gov.in', verificationDocUrl: 'official', status: 'VERIFIED' }
];

export const Donations: React.FC = () => {
  const [drives, setDrives] = useState<DonationDrive[]>(MOCK_DRIVES);
  const [searchState, setSearchState] = useState('');

  const filteredDrives = drives.filter(d =>
    d.state.toLowerCase().includes(searchState.toLowerCase()) ||
    d.ngoName.toLowerCase().includes(searchState.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight">Donation Directory</h1>
        <p className="text-sm text-slate-500">Support relief operations by contributing to official state relief accounts and verified local NGOs.</p>
      </div>

      {/* Directory Disclaimer */}
      <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-xs text-slate-500 leading-relaxed">
        <strong>IMPORTANT LEGAL DISCLAIMER:</strong> This is a public registry directory mapping verified third-party organizations and government relief funds. <strong>Monsoon Sahayak does not collect, hold, or process payments directly.</strong> All transactions are settled on external, certified payment portals or deep links. Please review verification statuses and document certificates before contributing.
      </div>

      {/* Filter and search */}
      <Card className="p-4 flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            value={searchState}
            onChange={e => setSearchState(e.target.value)}
            placeholder="Search drives by State (e.g., Punjab, Haryana)..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
          />
        </div>
      </Card>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDrives.map(drive => {
          const pct = Math.round((drive.raisedAmount / drive.targetAmount) * 100);
          return (
            <Card key={drive.id} className="flex flex-col justify-between p-5 border-t-4 border-t-emerald-600 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{drive.state} STATE</span>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{drive.ngoName}</h3>
                  </div>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {drive.description}
                </p>

                {/* Progress bars */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[10px] font-extrabold text-slate-500">
                    <span>Funds raised: {pct}%</span>
                    <span>Target: ₹{drive.targetAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <ProgressBar value={pct} color="success" />
                  <span className="block text-xs font-black text-emerald-600">
                    Raised: ₹{drive.raisedAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-4">
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  <Award size={14} className="text-emerald-500" />
                  80G Tax Exemption
                </span>
                
                <a
                  href={drive.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  Contribute <ExternalLink size={12} />
                </a>
              </div>
            </Card>
          );
        })}
      </div>

    </motion.div>
  );
};
