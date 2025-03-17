import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Cell
} from 'recharts';

// Fallback Simple Bar Component (in case recharts isn't available)
const SimpleBar = ({ value, maxValue, label, color }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef(null);
  
  useEffect(() => {
    if (barRef.current) {
      setTimeout(() => {
        setWidth((value / maxValue) * 100);
      }, 100);
    }
  }, [value, maxValue]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          ref={barRef}
          className="h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${width}%`,
            backgroundColor: color || '#3B82F6'
          }}
        />
      </div>
    </div>
  );
};

// Sample data generation
const generateData = (points = 12) => {
  return Array.from({ length: points }, (_, i) => ({
    name: `Point ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 100,
    secondary: Math.floor(Math.random() * 800) + 200,
    tertiary: Math.floor(Math.random() * 600) + 300
  }));
};

const DataVisualizations = () => {
  const [data] = useState(generateData());
  const maxValue = Math.max(...data.map(d => d.value));
  
  // Color schemes
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    tertiary: '#F59E0B',
    background: '#F3F4F6'
  };

  return (
    <div className="space-y-8 p-6">
      {/* Basic Bars */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Basic Animated Bars</h2>
        <div className="space-y-4">
          {data.slice(0, 5).map((item, index) => (
            <SimpleBar
              key={index}
              value={item.value}
              maxValue={maxValue}
              label={item.name}
              color={colors.primary}
            />
          ))}
        </div>
      </section>

      {/* Recharts Bar Chart */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Interactive Bar Chart</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar
                dataKey="value"
                fill={colors.primary}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Bar
                dataKey="secondary"
                fill={colors.secondary}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Line Chart */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Animated Line Chart</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                strokeWidth={2}
                dot={{ r: 4, fill: 'white', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: colors.primary }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Line
                type="monotone"
                dataKey="secondary"
                stroke={colors.secondary}
                strokeWidth={2}
                dot={{ r: 4, fill: 'white', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: colors.secondary }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Custom Interactive Elements */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Interactive Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Change:</span>
                    <span className="font-semibold text-green-600">+{item.secondary - item.value}</span>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-blue-200">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-1000"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
                style={{
                  transform: 'translateX(-100%)',
                  animation: 'slide 2s linear infinite'
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default DataVisualizations;