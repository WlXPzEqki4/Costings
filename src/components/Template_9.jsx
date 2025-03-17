import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, PieChart, Pie, Cell, Treemap
} from 'recharts';
import {
  Menu, BarChart2, TrendingUp, PieChart as PieIcon,
  Activity, Target, Globe, Users, DollarSign
} from 'lucide-react';

// Define structured data sets
const salesData = {
  monthly: [
    { month: 'Jan', revenue: 65000, expenses: 45000, profit: 20000 },
    { month: 'Feb', revenue: 72000, expenses: 48000, profit: 24000 },
    { month: 'Mar', revenue: 85000, expenses: 52000, profit: 33000 },
    { month: 'Apr', revenue: 78000, expenses: 49000, profit: 29000 },
    { month: 'May', revenue: 92000, expenses: 55000, profit: 37000 },
    { month: 'Jun', revenue: 98000, expenses: 58000, profit: 40000 }
  ]
};

const marketData = {
  segments: [
    { name: 'Enterprise', value: 45, growth: 15 },
    { name: 'SMB', value: 30, growth: 22 },
    { name: 'Consumer', value: 25, growth: 8 }
  ],
  regions: [
    { name: 'North America', value: 40 },
    { name: 'Europe', value: 30 },
    { name: 'Asia', value: 20 },
    { name: 'Other', value: 10 }
  ]
};

const performanceMetrics = {
  radar: [
    { metric: 'Speed', value: 85, benchmark: 75 },
    { metric: 'Reliability', value: 90, benchmark: 85 },
    { metric: 'Uptime', value: 95, benchmark: 90 },
    { metric: 'Security', value: 88, benchmark: 85 },
    { metric: 'Satisfaction', value: 92, benchmark: 80 }
  ],
  trends: [
    { period: 'Q1', performance: 82, target: 80 },
    { period: 'Q2', performance: 87, target: 82 },
    { period: 'Q3', performance: 91, target: 85 },
    { period: 'Q4', performance: 94, target: 88 }
  ]
};

const userMetrics = {
  engagement: [
    { category: 'Daily Active', count: 45000 },
    { category: 'Weekly Active', count: 120000 },
    { category: 'Monthly Active', count: 280000 }
  ],
  retention: [
    { month: 'M1', rate: 100 },
    { month: 'M2', rate: 85 },
    { month: 'M3', rate: 75 },
    { month: 'M4', rate: 70 },
    { month: 'M5', rate: 68 },
    { month: 'M6', rate: 65 }
  ]
};

// Navigation data
const navigationData = [
  { id: 'overview', title: 'Overview', icon: BarChart2 },
  { id: 'performance', title: 'Performance', icon: Activity },
  { id: 'market', title: 'Market Analysis', icon: Globe },
  { id: 'users', title: 'User Metrics', icon: Users }
];

// Color schemes
const colors = {
  primary: ['#3B82F6', '#60A5FA', '#93C5FD'],
  success: ['#10B981', '#34D399', '#6EE7B7'],
  warning: ['#F59E0B', '#FBBF24', '#FCD34D'],
  danger: ['#EF4444', '#F87171', '#FCA5A5'],
  neutral: ['#6B7280', '#9CA3AF', '#D1D5DB']
};

// Animation durations
const ANIMATION_DURATION = 1000;
const ANIMATION_DELAY = 200;

// Custom hook for intersection observer
const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
};

// Reusable chart components with animations
const AnimatedAreaChart = ({ data, dataKey, stroke, fill }) => {
  const chartRef = useRef(null);
  const isVisible = useOnScreen(chartRef);

  return (
    <div ref={chartRef} className="w-full h-[300px]">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={stroke} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={stroke} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            fill={`url(#color${dataKey})`}
            isAnimationActive={isVisible}
            animationDuration={ANIMATION_DURATION}
            animationBegin={ANIMATION_DELAY}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const AnimatedRadarChart = ({ data }) => {
  const chartRef = useRef(null);
  const isVisible = useOnScreen(chartRef);

  return (
    <div ref={chartRef} className="w-full h-[400px]">
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Radar
            name="Value"
            dataKey="value"
            stroke={colors.primary[0]}
            fill={colors.primary[0]}
            fillOpacity={0.6}
            isAnimationActive={isVisible}
            animationDuration={ANIMATION_DURATION}
          />
          <Radar
            name="Benchmark"
            dataKey="benchmark"
            stroke={colors.neutral[0]}
            fill={colors.neutral[0]}
            fillOpacity={0.3}
            isAnimationActive={isVisible}
            animationDuration={ANIMATION_DURATION}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Main component
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Hover-expandable Sidebar */}
      <div className="group h-screen sticky top-0 bg-gray-900 text-white transition-all duration-300 ease-in-out w-16 hover:w-64">
        <nav className="flex h-full flex-col p-4">
          <div className="mb-8 flex items-center">
            <Menu className="h-8 w-8 shrink-0" />
            <span className="ml-4 overflow-hidden whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Analytics Dashboard
            </span>
          </div>

          {navigationData.map(({ id, title, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`
                mb-4 flex items-center rounded-lg p-2 transition-colors
                ${activeSection === id ? 'bg-gray-800' : 'hover:bg-gray-800'}
              `}
            >
              <Icon className="h-6 w-6 shrink-0" />
              <span className="ml-4 overflow-hidden whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                {title}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-8">
          {/* Overview Section */}
          <section id="overview" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-2 bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
                <AnimatedAreaChart
                  data={salesData.monthly}
                  dataKey="revenue"
                  stroke={colors.primary[0]}
                  fill={colors.primary[0]}
                />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Market Segments</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketData.segments}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      animationDuration={ANIMATION_DURATION}
                    >
                      {marketData.segments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.primary[index % colors.primary.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Performance Section */}
          <section id="performance" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Radar</h3>
                <AnimatedRadarChart data={performanceMetrics.radar} />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Quarterly Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceMetrics.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke={colors.primary[0]}
                      animationDuration={ANIMATION_DURATION}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke={colors.neutral[0]}
                      strokeDasharray="5 5"
                      animationDuration={ANIMATION_DURATION}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Market Analysis Section */}
          <section id="market" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Market Analysis</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="col-span-2 bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Regional Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketData.regions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill={colors.primary[0]}
                      animationDuration={ANIMATION_DURATION}
                    >
                      {marketData.regions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.primary[index % colors.primary.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Segment Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={marketData.segments}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar
                      dataKey="growth"
                      fill={colors.success[0]}
                      animationDuration={ANIMATION_DURATION}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>


                {/* User Metrics Section */}
          <section id="users" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">User Metrics</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userMetrics.engagement}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill={colors.primary[0]}
                      animationDuration={ANIMATION_DURATION}
                    >
                      {userMetrics.engagement.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={colors.primary[index % colors.primary.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Retention Rate</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userMetrics.retention}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke={colors.success[0]}
                      strokeWidth={2}
                      dot={{ r: 4, fill: 'white', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: colors.success[0] }}
                      animationDuration={ANIMATION_DURATION}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Additional User Insights */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">User Growth Velocity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={userMetrics.retention}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.warning[0]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.warning[0]} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke={colors.warning[0]}
                      fillOpacity={1}
                      fill="url(#colorVelocity)"
                      animationDuration={ANIMATION_DURATION}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* User Engagement Score */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Engagement Score</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={performanceMetrics.radar}>
                    <PolarGrid strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Current"
                      dataKey="value"
                      stroke={colors.primary[0]}
                      fill={colors.primary[0]}
                      fillOpacity={0.6}
                      animationDuration={ANIMATION_DURATION}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;