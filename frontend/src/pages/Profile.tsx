import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Alert } from '../components/ui';
import { User, MapPin, Users, Settings, Save, CheckCircle } from 'lucide-react';
import { HouseType } from '../types';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    preferredLanguage: user?.preferredLanguage || 'en',
    state: user?.address?.state || '',
    district: user?.address?.district || '',
    subDistrict: user?.address?.subDistrict || '',
    city: user?.address?.city || '',
    pincode: user?.address?.pincode || '',
    adults: user?.householdProfile?.adults || 2,
    children: user?.householdProfile?.children || 0,
    elderly: user?.householdProfile?.elderly || 0,
    pets: user?.householdProfile?.pets || 0,
    disabilities: user?.householdProfile?.disabilities || false,
    houseType: user?.householdProfile?.houseType || ('PUCCA' as HouseType),
    floodProneHistory: user?.householdProfile?.floodProneHistory || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    const done = await updateProfile(formData);
    if (done) {
      setSuccess('Profile configuration saved successfully!');
      setEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-3xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tight">My Profile</h1>
          <p className="text-sm text-slate-500">Configure household metadata and emergency contact parameters</p>
        </div>
        {!editing && (
          <Button variant="outline" onClick={() => setEditing(true)} className="flex items-center gap-1 text-xs py-1.5 px-3">
            <Settings size={14} /> Edit Configuration
          </Button>
        )}
      </div>

      {success && <Alert variant="success" className="mb-4">{success}</Alert>}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Step 1: Personal Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User size={18} className="text-blue-600" /> Personal Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Full Name</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                />
              ) : (
                <span className="text-sm font-semibold">{user?.name}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Preferred Language</label>
              {editing ? (
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="pa">Punjabi</option>
                </select>
              ) : (
                <span className="text-sm font-semibold uppercase">{user?.preferredLanguage}</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Address Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin size={18} className="text-blue-600" /> Address Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">State</label>
                {editing ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{user?.address?.state}</span>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">District</label>
                {editing ? (
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{user?.address?.district}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">City</label>
                {editing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{user?.address?.city}</span>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Pincode</label>
                {editing ? (
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{user?.address?.pincode}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Household Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users size={18} className="text-blue-600" /> Household Composition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Adults</label>
                {editing ? (
                  <input
                    type="number"
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{user?.householdProfile?.adults}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Children</label>
                {editing ? (
                  <input
                    type="number"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{user?.householdProfile?.children}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Elderly</label>
                {editing ? (
                  <input
                    type="number"
                    name="elderly"
                    value={formData.elderly}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{user?.householdProfile?.elderly}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Pets</label>
                {editing ? (
                  <input
                    type="number"
                    name="pets"
                    value={formData.pets}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{user?.householdProfile?.pets}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">House Type</label>
                {editing ? (
                  <select
                    name="houseType"
                    value={formData.houseType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  >
                    <option value="FLAT">Flat / Apartment</option>
                    <option value="GROUND_FLOOR">Ground Floor House</option>
                    <option value="KUTCHA">Kutcha House (Mud/Thatch)</option>
                    <option value="PUCCA">Pucca House (Concrete)</option>
                  </select>
                ) : (
                  <span className="text-sm font-semibold uppercase">{user?.householdProfile?.houseType}</span>
                )}
              </div>

              {editing && (
                <div className="flex flex-col justify-end space-y-2 pb-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="disabilities"
                      checked={formData.disabilities}
                      onChange={handleChange}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Family Member with Disability</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="floodProneHistory"
                      checked={formData.floodProneHistory}
                      onChange={handleChange}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Flood-prone History Area</span>
                  </label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {editing && (
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setEditing(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 flex justify-center items-center gap-1.5">
              <Save size={16} /> Save Changes
            </Button>
          </div>
        )}

      </form>
    </motion.div>
  );
};
