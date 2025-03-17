import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data generation functions
const generateTimeSeriesData = (points = 12) => {
  return Array.from({ length: points }, (_, i) => ({
    name: `Month ${i + 1}`,
    value1: Math.floor(Math.random() * 1000) + 500,
    value2: Math.floor(Math.random() * 800) + 200,
    value3: Math.floor(Math.random() * 600) + 100
  }));
};

const generateScatterData = (points = 50) => {
  return Array.from({ length: points }, (_, i) => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    z: Math.floor(Math.random() * 500) + 100
  }));
};

const generateRadarData = () => [
  { subject: 'Performance', A: 120, B: 110, fullMark: 150 },
  { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
  { subject: 'Scalability', A: 86, B: 130, fullMark: 150 },
  { subject: 'Security', A: 99, B: 100, fullMark: 150 },
  { subject: 'Usability', A: 85, B: 90, fullMark: 150 },
  { subject: 'Speed', A: 65, B: 85, fullMark: 150 },
];

const generatePieData = () => [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 300 },
  { name: 'Category D', value: 200 },
];

// Color schemes
const colors = {
  primary: ['#3B82F6', '#60A5FA', '#93C5FD'],
  secondary: ['#10B981', '#34D399', '#6EE7B7'],
  accent: ['#F59E0B', '#FBBF24', '#FCD34D'],
  gradient: ['#3B82F6', '#8B5CF6', '#EC4899']
};

// Animated Chart Components
const AnimatedLineChart = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting)
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={chartRef} className="w-full h-[400px] transition-opacity duration-1000" 
         style={{ opacity: isVisible ? 1 : 0 }}>
      <ResponsiveContainer>
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
          {colors.primary.map((color, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={`value${index + 1}`}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4, fill: 'white', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: color }}
              isAnimationActive={isVisible}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const AnimatedBarChart = ({ data, layout = 'vertical' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting)
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ChartComponent = layout === 'vertical' ? BarChart : BarChart;
  const barProps = layout === 'vertical' 
    ? { layout: 'vertical', x: 'value1', y: 'name' }
    : { layout: 'horizontal', x: 'name', y: 'value1' };

  return (
    <div ref={chartRef} className="w-full h-[400px] transition-opacity duration-1000"
         style={{ opacity: isVisible ? 1 : 0 }}>
      <ResponsiveContainer>
        <ChartComponent 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          layout={layout}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis type={layout === 'vertical' ? 'number' : 'category'} dataKey={barProps.x} />
          <YAxis type={layout === 'vertical' ? 'category' : 'number'} dataKey={barProps.y} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          {['value1', 'value2', 'value3'].map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors.primary[index]}
              isAnimationActive={isVisible}
              animationDuration={1500}
              animationEasing="ease-in-out"
              onMouseEnter={() => setHoveredBar(key)}
              onMouseLeave={() => setHoveredBar(null)}
              opacity={hoveredBar ? (hoveredBar === key ? 1 : 0.3) : 1}
            />
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

const AnimatedScatterChart = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting)
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={chartRef} className="w-full h-[400px] transition-opacity duration-1000"
         style={{ opacity: isVisible ? 1 : 0 }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis type="number" dataKey="x" name="X Value" />
          <YAxis type="number" dataKey="y" name="Y Value" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Scatter
            name="Data Points"
            data={data}
            fill={colors.primary[0]}
            isAnimationActive={isVisible}
            animationDuration={1500}
            animationEasing="ease-in-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors.gradient[index % colors.gradient.length]}
                opacity={0.8}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const AnimatedRadarChart = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting)
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={chartRef} className="w-full h-[400px] transition-opacity duration-1000"
         style={{ opacity: isVisible ? 1 : 0 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid strokeOpacity={0.2} />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Series A"
            dataKey="A"
            stroke={colors.primary[0]}
            fill={colors.primary[0]}
            fillOpacity={0.6}
            isAnimationActive={isVisible}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Radar
            name="Series B"
            dataKey="B"
            stroke={colors.secondary[0]}
            fill={colors.secondary[0]}
            fillOpacity={0.6}
            isAnimationActive={isVisible}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Legend />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ChartShowcase = () => {
  // Generate sample data
  const timeSeriesData = generateTimeSeriesData();
  const scatterData = generateScatterData();
  const radarData = generateRadarData();

  return (
    <div className="space-y-12 p-8">
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Animated Line Chart</h2>
        <AnimatedLineChart data={timeSeriesData} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Vertical Bar Chart</h2>
        <AnimatedBarChart data={timeSeriesData} layout="vertical" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Horizontal Bar Chart</h2>
        <AnimatedBarChart data={timeSeriesData} layout="horizontal" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Scatter Plot</h2>
        <AnimatedScatterChart data={scatterData} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Radar Chart</h2>
        <AnimatedRadarChart data={radarData} />
      </section>
    </div>
  );
};

export default ChartShowcase;