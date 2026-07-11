import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, ProgressBar, Alert } from '../components/ui';
import { CheckSquare, Settings, Sparkles, Check, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { PreparednessItem } from '../types';

const INITIAL_CHECKLIST: PreparednessItem[] = [
  { id: '1', category: 'Home', item: 'Verify roof drains and ground pipes are free from leaves/sludge', whyItMatters: 'Prevents immediate rooftop accumulation and local flooding', done: true },
  { id: '2', category: 'Home', item: 'Check power cords and seal low-level outlets with waterproof tape', whyItMatters: 'Reduces risk of short circuits or electrocution during basement leaks', done: false },
  { id: '3', category: 'Food', item: 'Store 15 liters of drinking water in sealed jerry cans', whyItMatters: 'Clean tap water might get contaminated or disabled during major floods', done: true },
  { id: '4', category: 'Food', item: 'Keep 5 days of dry grains, biscuits, and milk powder', whyItMatters: 'Ensures nutrition if grocery delivery and local shops are closed', done: false },
  { id: '5', category: 'Medical', item: 'Pack all daily prescription drugs in a zip-lock bag on an upper shelf', whyItMatters: 'Prevents medicine damage and guarantees continuous access', done: true },
  { id: '6', category: 'Electricity', item: 'Fully charge primary and backup power banks (20,000 mAh+)', whyItMatters: 'Maintains critical mobile connectivity during grid outages', done: false },
  { id: '7', category: 'Documents', item: 'Store Aadhaar cards, property registry, and health cards on cloud storage', whyItMatters: 'Protects physical papers from irreversible water damage', done: false }
];

export const Preparedness: React.FC = () => {
  const { user } = useAuth();
  const [checklist, setChecklist] = useState<PreparednessItem[]>(() => {
    const saved = localStorage.getItem('checklist');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Home');
  const [generating, setGenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('checklist', JSON.stringify(checklist));
  }, [checklist]);

  const handleToggle = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleGenerate = () => {
    setGenerating(true);
    setSuccessMsg('');
    setTimeout(() => {
      // Simulate GenAI output merging with household size
      const generatedList = [
        ...checklist,
        {
          id: Date.now().toString(),
          category: 'Medical' as any,
          item: `Purchase pediatric medicines for children and special pet food packets`,
          whyItMatters: `Necessary since you declared ${user?.householdProfile?.children || 1} child and ${user?.householdProfile?.pets || 1} pet in your profile.`,
          done: false
        }
      ];
      setChecklist(generatedList);
      setGenerating(false);
      setSuccessMsg('AI Preparedness Checklist regenerated successfully in Punjabi/English!');
    }, 1500);
  };

  const categories = ['Home', 'Food', 'Medical', 'Electricity', 'Travel', 'Documents'];

  // Completion calculation
  const total = checklist.length;
  const completed = checklist.filter(c => c.done).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight">Preparedness Plan</h1>
        <p className="text-sm text-slate-500">AI-customized preparedness checklists & safety guidelines</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Summary and Progress panel */}
        <div className="lg:col-span-1 space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Plan Progress</CardTitle>
              <CardDescription>Overall safety readiness level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-6">
                <h1 className="text-6xl font-black text-blue-600 dark:text-blue-400">{pct}%</h1>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2 block">Safety Checklist Done</span>
              </div>
              <ProgressBar value={pct} color={pct === 100 ? 'success' : pct > 50 ? 'primary' : 'warning'} />
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>{completed} completed</span>
                <span>{total - completed} remaining</span>
              </div>
            </CardContent>
          </Card>

          {/* Household summary review */}
          <Card>
            <CardHeader>
              <CardTitle>Household Profile</CardTitle>
              <CardDescription>Checklist customized for these parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-500">Location</span>
                <span className="font-extrabold">{user?.address?.city || 'Ludhiana'}, {user?.address?.state || 'Punjab'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-500">Household Size</span>
                <span className="font-extrabold">{user?.householdProfile?.adults || 3} Adults | {user?.householdProfile?.children || 1} Child</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-500">Structure Type</span>
                <span className="font-extrabold uppercase">{user?.householdProfile?.houseType || 'GROUND_FLOOR'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Flood Prone History</span>
                <Badge variant={user?.householdProfile?.floodProneHistory ? 'danger' : 'success'}>
                  {user?.householdProfile?.floodProneHistory ? 'Yes' : 'No'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Prompt AI Button */}
          <Button
            onClick={handleGenerate}
            loading={generating}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex justify-center items-center gap-1.5 shadow-md"
          >
            <Sparkles size={16} />
            Regenerate AI Plan
          </Button>

        </div>

        {/* Right: Expandable Checklist Categories */}
        <div className="lg:col-span-2 space-y-4">
          {successMsg && <Alert variant="success" className="mb-4">{successMsg}</Alert>}

          {categories.map(category => {
            const items = checklist.filter(item => item.category === category);
            const isOpen = expandedCategory === category;
            const categoryCompleted = items.filter(i => i.done).length;
            const categoryTotal = items.length;

            if (categoryTotal === 0) return null;

            return (
              <Card key={category} className="overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(isOpen ? null : category)}
                  className="w-full flex justify-between items-center text-left py-1"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {category}
                      <Badge variant={categoryCompleted === categoryTotal ? 'success' : 'secondary'}>
                        {categoryCompleted}/{categoryTotal} Done
                      </Badge>
                    </h3>
                  </div>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3"
                    >
                      {items.map(item => (
                        <div
                          key={item.id}
                          onClick={() => handleToggle(item.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-150 ${
                            item.done
                              ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60'
                              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-200'
                          }`}
                        >
                          <div className={`mt-0.5 rounded-lg border w-5 h-5 flex items-center justify-center transition-colors ${
                            item.done ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-700'
                          }`}>
                            {item.done && <Check size={14} />}
                          </div>
                          <div>
                            <span className={`text-xs font-bold leading-relaxed block ${item.done ? 'line-through text-slate-500' : 'text-slate-950 dark:text-white'}`}>
                              {item.item}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1 block">Why it matters: {item.whyItMatters}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
};
