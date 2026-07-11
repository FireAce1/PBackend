import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, CardHeader, CardTitle, CardContent, CardDescription, Alert } from '../components/ui';
import { ShieldAlert, User, MapPin, Users } from 'lucide-react';
import { HouseType } from '../types';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    preferredLanguage: 'en',
    state: '',
    district: '',
    subDistrict: '',
    city: '',
    pincode: '',
    latitude: 30.901,
    longitude: 75.857,
    adults: 2,
    children: 0,
    elderly: 0,
    pets: 0,
    disabilities: false,
    houseType: 'PUCCA' as HouseType,
    floodProneHistory: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && (!formData.name || !formData.email || !formData.phone || !formData.password)) {
      setError('Please fill in all personal details');
      return;
    }
    if (step === 2 && (!formData.state || !formData.district || !formData.city || !formData.pincode)) {
      setError('Please fill in all address details');
      return;
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await register(formData);
    setLoading(false);

    if (success) {
      navigate('/');
    } else {
      setError('Failed to create account. Please check details or try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-8">
      <div className="w-full max-w-lg">
        
        {/* Brand header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-md mb-2">
            <ShieldAlert size={26} />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Monsoon Sahayak</h2>
          <p className="text-xs text-slate-500">Citizen Preparedness & Assistance Platform</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle>Create Account</CardTitle>
              <span className="text-xs font-bold text-blue-600">Step {step} of 3</span>
            </div>
            
            {/* Step Indicators */}
            <div className="flex gap-2">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-100'}`} />
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-100'}`} />
              <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-100'}`} />
            </div>
          </CardHeader>
          <CardContent>
            {error && <Alert variant="error" className="mb-4">{error}</Alert>}

            {/* STEP 1: PERSONAL INFO */}
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                  <User size={16} className="text-blue-600" />
                  <span className="font-bold text-xs uppercase tracking-wide text-slate-600">Personal Information</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Password (Min 6 chars)</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Preferred Language</label>
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
                  </div>
                </div>

                <Button type="submit" className="w-full py-2 mt-2">Next Page</Button>
              </form>
            )}

            {/* STEP 2: ADDRESS INFO */}
            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                  <MapPin size={16} className="text-blue-600" />
                  <span className="font-bold text-xs uppercase tracking-wide text-slate-600">Address details</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Punjab"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">District</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Ludhiana"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Sub-district / Block</label>
                    <input
                      type="text"
                      name="subDistrict"
                      value={formData.subDistrict}
                      onChange={handleChange}
                      placeholder="Ludhiana West"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ludhiana"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="141001"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 mt-4 pt-2">
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                  <Button type="submit" className="flex-1">Next Page</Button>
                </div>
              </form>
            )}

            {/* STEP 3: HOUSEHOLD PROFILE */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                  <Users size={16} className="text-blue-600" />
                  <span className="font-bold text-xs uppercase tracking-wide text-slate-600">Household Composition</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Adults (18+)</label>
                    <input
                      type="number"
                      name="adults"
                      value={formData.adults}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Children</label>
                    <input
                      type="number"
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Elderly (60+)</label>
                    <input
                      type="number"
                      name="elderly"
                      value={formData.elderly}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Pets</label>
                    <input
                      type="number"
                      name="pets"
                      value={formData.pets}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">House Type</label>
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
                  </div>

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
                </div>

                <div className="flex gap-2 mt-4 pt-2">
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                  <Button type="submit" loading={loading} className="flex-1">Register</Button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
              <span>Already have an account? </span>
              <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
