import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, Badge } from '../components/ui';
import { CloudRain, Sun, Wind, Droplets, Thermometer, CloudLightning, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const hourlyForecast = [
  { time: '13:00', temp: 28, rain: 90 },
  { time: '14:00', temp: 27, rain: 95 },
  { time: '15:00', temp: 26, rain: 80 },
  { time: '16:00', temp: 26, rain: 75 },
  { time: '17:00', temp: 27, rain: 60 },
  { time: '18:00', temp: 28, rain: 40 }
];

const weeklyForecast = [
  { day: 'Mon', tempMin: 24, tempMax: 30, rain: 95, status: 'heavy-rain' },
  { day: 'Tue', tempMin: 25, tempMax: 31, rain: 80, status: 'showers' },
  { day: 'Wed', tempMin: 26, tempMax: 32, rain: 40, status: 'scattered' },
  { day: 'Thu', tempMin: 25, tempMax: 33, rain: 20, status: 'cloudy' },
  { day: 'Fri', tempMin: 26, tempMax: 34, rain: 10, status: 'sunny' },
  { day: 'Sat', tempMin: 27, tempMax: 35, rain: 15, status: 'sunny' },
  { day: 'Sun', tempMin: 25, tempMax: 32, rain: 70, status: 'thunderstorm' }
];

export const Weather: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Weather Forecast</h1>
          <p className="text-sm text-slate-500">Real-time alerts & weather charts</p>
        </div>
        <button className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 flex items-center gap-1.5 text-xs font-bold shadow-sm">
          <RefreshCw size={14} /> Refresh Data
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Current Weather status card */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden flex flex-col justify-between p-6">
          <div className="absolute right-0 top-0 opacity-15 translate-x-10 -translate-y-6">
            <CloudLightning size={240} />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">Ludhiana, PB</h3>
                <span className="text-xs text-slate-400">Updated 5 minutes ago</span>
              </div>
              <Badge variant="danger" className="bg-red-500/20 text-red-200 border-red-500/30">
                RED ALERT
              </Badge>
            </div>

            <div className="flex items-center gap-4 my-6">
              <CloudLightning size={72} className="text-blue-400 animate-pulse" />
              <div>
                <h1 className="text-5xl font-black tracking-tight">26°C</h1>
                <p className="text-sm text-slate-300 font-semibold mt-1">Severe Thunderstorm</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-700/60 pt-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Wind size={18} className="text-slate-400" />
                <div className="text-xs">
                  <span className="block text-slate-500 font-bold uppercase text-[9px]">Wind Speed</span>
                  <span className="font-extrabold text-white">24 km/h</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets size={18} className="text-slate-400" />
                <div className="text-xs">
                  <span className="block text-slate-500 font-bold uppercase text-[9px]">Humidity</span>
                  <span className="font-extrabold text-white">92%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Charts panels */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Temperature and Rain probability hourly */}
          <Card>
            <CardHeader>
              <CardTitle>Hourly Outlook</CardTitle>
              <CardDescription>Predicted temperature and precipitation levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyForecast}>
                    <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#F59E0B" strokeWidth={2} fill="transparent" />
                    <Area yAxisId="right" type="monotone" dataKey="rain" name="Rain Prob (%)" stroke="#2563EB" strokeWidth={2} fill="rgba(37, 99, 235, 0.1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* 7-Day Forecast Section */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Outlook</CardTitle>
          <CardDescription>Extended forecasts and regional alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklyForecast.map((day, idx) => (
              <div key={idx} className="border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-center bg-slate-50/50 dark:bg-slate-900/40 flex flex-col items-center justify-between">
                <span className="font-bold text-xs text-slate-500">{day.day}</span>
                <div className="my-3">
                  {day.status === 'heavy-rain' || day.status === 'thunderstorm' ? (
                    <CloudRain className="text-blue-600 animate-bounce" size={28} />
                  ) : day.status === 'sunny' ? (
                    <Sun className="text-amber-500 animate-spin" style={{ animationDuration: '8s' }} size={28} />
                  ) : (
                    <CloudRain className="text-slate-400" size={28} />
                  )}
                </div>
                <div className="space-y-1">
                  <span className="block text-xs font-black text-slate-800 dark:text-white">{day.tempMax}°C</span>
                  <span className="block text-[10px] text-blue-600 font-bold">Rain: {day.rain}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </motion.div>
  );
};
