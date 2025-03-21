import React from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Label, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, ComposedChart, Area, ReferenceLine, Rectangle, LabelList
} from 'recharts';

// A simplified box plot component
// We're no longer using BoxPlot, replaced with simpler bar-based distribution visualization

const QueryCreditsAnalysis = () => {
  const data = [
    { month: "May-24", totalQueries: 64, totalCreditsConsumed: 1549, percentageOfSpendingCap: 62, creditsPerQuery: 24.20 },
    { month: "Jun-24", totalQueries: 39, totalCreditsConsumed: 1795, percentageOfSpendingCap: 72, creditsPerQuery: 46.03 },
    { month: "Jul-24", totalQueries: 31, totalCreditsConsumed: 1008, percentageOfSpendingCap: 40, creditsPerQuery: 32.52 },
    { month: "Aug-24", totalQueries: 41, totalCreditsConsumed: 358, percentageOfSpendingCap: 14, creditsPerQuery: 8.73 },
    { month: "Sep-24", totalQueries: 42, totalCreditsConsumed: 1081, percentageOfSpendingCap: 43, creditsPerQuery: 25.74 },
    { month: "Oct-24", totalQueries: 25, totalCreditsConsumed: 889, percentageOfSpendingCap: 36, creditsPerQuery: 35.56 },
    { month: "Nov-24", totalQueries: 37, totalCreditsConsumed: 1683, percentageOfSpendingCap: 67, creditsPerQuery: 45.49 },
    { month: "Dec-24", totalQueries: 13, totalCreditsConsumed: 345, percentageOfSpendingCap: 14, creditsPerQuery: 26.54 },
    { month: "Jan-25", totalQueries: 14, totalCreditsConsumed: 240, percentageOfSpendingCap: 10, creditsPerQuery: 17.14 },
    { month: "Feb-25", totalQueries: 26, totalCreditsConsumed: 1280, percentageOfSpendingCap: 51, creditsPerQuery: 49.23 }
  ];

  // Statistical values
  const stats = {
    queries: {
      min: 13,
      max: 64,
      mean: 33.2,
      median: 37,
      stdDev: 14.27,
      q1: 25,
      q3: 41
    },
    credits: {
      min: 240,
      max: 1795,
      mean: 1022.8,
      median: 1081,
      stdDev: 539.52,
      q1: 358,
      q3: 1549
    },
    cpq: {
      min: 8.73,
      max: 49.23,
      mean: 31.12,
      median: 32.52,
      stdDev: 12.54,
      q1: 24.2,
      q3: 45.49
    }
  };

  // Box plot data structures
  const queriesBoxData = [{ 
    name: "Total Queries",
    min: stats.queries.min,
    q1: stats.queries.q1,
    median: stats.queries.median,
    q3: stats.queries.q3,
    max: stats.queries.max,
    mean: stats.queries.mean
  }];

  const creditsBoxData = [{ 
    name: "Total Credits",
    min: stats.credits.min,
    q1: stats.credits.q1,
    median: stats.credits.median,
    q3: stats.credits.q3,
    max: stats.credits.max,
    mean: stats.credits.mean
  }];

  const cpqBoxData = [{ 
    name: "Credits per Query",
    min: stats.cpq.min,
    q1: stats.cpq.q1,
    median: stats.cpq.median,
    q3: stats.cpq.q3,
    max: stats.cpq.max,
    mean: stats.cpq.mean
  }];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Distribution data for pie charts
  const queryDistribution = [
    { name: "0-20", value: 2 },
    { name: "21-40", value: 5 },
    { name: "41-60", value: 2 },
    { name: "61-80", value: 1 }
  ];

  const creditDistribution = [
    { name: "0-500", value: 3 },
    { name: "501-1000", value: 2 },
    { name: "1001-1500", value: 2 },
    { name: "1501-2000", value: 3 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-md">
          <p className="font-semibold">{payload[0].payload.month}</p>
          <p>Queries: {payload[0].payload.totalQueries}</p>
          <p>Credits: {payload[0].payload.totalCreditsConsumed}</p>
          <p>Credits/Query: {payload[0].payload.creditsPerQuery.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24">
      <h1 className="text-5xl font-bold text-center my-4">Usage Analysis Dashboard</h1>

      {/* Statistical Tables with Box Plots */}
      <div className="space-y-6">
        {/* Total Queries Stats */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Analysis of Total Monthly Queries</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-2">
              <h3 className="text-md font-medium mb-2">Statistics</h3>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Statistic</th>
                    <th className="p-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Min</td><td className="p-2 text-right">{stats.queries.min.toFixed(0)}</td></tr>
                  <tr className="border-t"><td className="p-2">Max</td><td className="p-2 text-right">{stats.queries.max.toFixed(0)}</td></tr>
                  <tr className="border-t"><td className="p-2">Mean</td><td className="p-2 text-right">{stats.queries.mean.toFixed(1)}</td></tr>
                  <tr className="border-t"><td className="p-2">Median</td><td className="p-2 text-right">{stats.queries.median.toFixed(0)}</td></tr>
                  <tr className="border-t"><td className="p-2">Std Dev</td><td className="p-2 text-right">{stats.queries.stdDev.toFixed(2)}</td></tr>
                  <tr className="border-t"><td className="p-2">Q1</td><td className="p-2 text-right">{stats.queries.q1.toFixed(0)}</td></tr>
                  <tr className="border-t"><td className="p-2">Q3</td><td className="p-2 text-right">{stats.queries.q3.toFixed(0)}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="md:w-1/2 p-2">
              <h3 className="text-md font-medium mb-2">Distribution Visualization</h3>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Range", value: stats.queries.max - stats.queries.min, x: stats.queries.min }
                  ]}
                  margin={{ top: 20, right: 20, bottom: 5, left: 20 }}
                >
                  <XAxis type="number" domain={[0, 70]} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip />
                  
                  {/* Full range bar (min to max) */}
                  <Bar dataKey="value" isAnimationActive={false} barSize={20} fill="#e5e7eb">
                    <LabelList dataKey="x" position="left" content={({value}) => <text x={value-5} y={30} textAnchor="end" fontSize={12}>{value}</text>} />
                    <LabelList dataKey="value" position="right" content={({x, value}) => <text x={x+value+5} y={30} textAnchor="start" fontSize={12}>{stats.queries.max}</text>} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "IQR", value: stats.queries.q3 - stats.queries.q1, x: stats.queries.q1 }
                  ]}
                  margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                >
                  <XAxis type="number" domain={[0, 70]} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip />
                  
                  {/* Q1-Q3 bar */}
                  <Bar dataKey="value" fill="#8884d8" barSize={20} isAnimationActive={false}>
                    <LabelList dataKey="x" position="left" content={({value}) => <text x={value-2} y={30} textAnchor="end" fontSize={12}>{`Q1: ${value}`}</text>} />
                    <LabelList dataKey="value" position="right" content={({x, value}) => <text x={x+value+2} y={30} textAnchor="start" fontSize={12}>{`Q3: ${stats.queries.q3}`}</text>} />
                  </Bar>
                  
                  {/* Median and Mean markers */}
                  <ReferenceLine x={stats.queries.median} stroke="#000000" strokeWidth={2}>
                    <Label value={`Median: ${stats.queries.median}`} position="top" fontSize={12} />
                  </ReferenceLine>
                  <ReferenceLine x={stats.queries.mean} stroke="#ff0000" strokeWidth={2} strokeDasharray="3 3">
                    <Label value={`Mean: ${stats.queries.mean.toFixed(1)}`} position="bottom" fontSize={12} fill="#ff0000" />
                  </ReferenceLine>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="text-xs text-center mt-2">
                <span className="inline-block w-3 h-3 bg-gray-200 mr-1"></span> Range (Min-Max)
                <span className="inline-block ml-3 mr-1 w-3 h-3 bg-indigo-400"></span> IQR (Q1-Q3)
                <span className="inline-block ml-3 mr-1" style={{ color: 'red' }}>- - -</span> Mean
              </div>
            </div>
          </div>
        </div>

        {/* Total Credits Stats */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Analysis of Total Monthly Credits</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-2">
              <h3 className="text-md font-medium mb-2">Statistics</h3>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Statistic</th>
                    <th className="p-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Min</td><td className="p-2 text-right">{stats.credits.min.toFixed(0)}</td></tr>
                  <tr className="border-t"><td className="p-2">Max</td><td className="p-2 text-right">{stats.credits.max.toFixed(0)}</td></tr>
                  <tr className="border-t"><td className="p-2">Mean</td><td className="p-2 text-right">{stats.credits.mean.toFixed(1)}</td></tr>
                  <tr className="border-t"><td className="p-2">Median</td><td className="p-2 text-right">{stats.credits.median.toFixed(0)}</td></tr>
                  <tr className="border-t"><td className="p-2">Std Dev</td><td className="p-2 text-right">{stats.credits.stdDev.toFixed(2)}</td></tr>
                  <tr className="border-t"><td className="p-2">Q1</td><td className="p-2 text-right">{stats.credits.q1.toFixed(0)}</td></tr>
                  <tr className="border-t"><td className="p-2">Q3</td><td className="p-2 text-right">{stats.credits.q3.toFixed(0)}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="md:w-1/2 p-2">
              <h3 className="text-md font-medium mb-2">Distribution Visualization</h3>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Range", value: stats.credits.max - stats.credits.min, x: stats.credits.min }
                  ]}
                  margin={{ top: 20, right: 20, bottom: 5, left: 20 }}
                >
                  <XAxis type="number" domain={[0, 2000]} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip />
                  
                  {/* Full range bar (min to max) */}
                  <Bar dataKey="value" isAnimationActive={false} barSize={20} fill="#e5e7eb">
                    <LabelList dataKey="x" position="left" content={({value}) => <text x={value-5} y={30} textAnchor="end" fontSize={12}>{value}</text>} />
                    <LabelList dataKey="value" position="right" content={({x, value}) => <text x={x+value+5} y={30} textAnchor="start" fontSize={12}>{stats.credits.max}</text>} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "IQR", value: stats.credits.q3 - stats.credits.q1, x: stats.credits.q1 }
                  ]}
                  margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                >
                  <XAxis type="number" domain={[0, 2000]} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip />
                  
                  {/* Q1-Q3 bar */}
                  <Bar dataKey="value" fill="#82ca9d" barSize={20} isAnimationActive={false}>
                    <LabelList dataKey="x" position="left" content={({value}) => <text x={value-2} y={30} textAnchor="end" fontSize={12}>{`Q1: ${value}`}</text>} />
                    <LabelList dataKey="value" position="right" content={({x, value}) => <text x={x+value+2} y={30} textAnchor="start" fontSize={12}>{`Q3: ${stats.credits.q3}`}</text>} />
                  </Bar>
                  
                  {/* Median and Mean markers */}
                  <ReferenceLine x={stats.credits.median} stroke="#000000" strokeWidth={2}>
                    <Label value={`Median: ${stats.credits.median}`} position="top" fontSize={12} />
                  </ReferenceLine>
                  <ReferenceLine x={stats.credits.mean} stroke="#ff0000" strokeWidth={2} strokeDasharray="3 3">
                    <Label value={`Mean: ${stats.credits.mean.toFixed(1)}`} position="bottom" fontSize={12} fill="#ff0000" />
                  </ReferenceLine>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="text-xs text-center mt-2">
                <span className="inline-block w-3 h-3 bg-gray-200 mr-1"></span> Range (Min-Max)
                <span className="inline-block ml-3 mr-1 w-3 h-3 bg-green-400"></span> IQR (Q1-Q3)
                <span className="inline-block ml-3 mr-1" style={{ color: 'red' }}>- - -</span> Mean
              </div>
            </div>
          </div>
        </div>

        {/* Credits per Query Stats */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Credits per Query Analysis</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-2">
              <h3 className="text-md font-medium mb-2">Statistics</h3>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Statistic</th>
                    <th className="p-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Min</td><td className="p-2 text-right">{stats.cpq.min.toFixed(2)}</td></tr>
                  <tr className="border-t"><td className="p-2">Max</td><td className="p-2 text-right">{stats.cpq.max.toFixed(2)}</td></tr>
                  <tr className="border-t"><td className="p-2">Mean</td><td className="p-2 text-right">{stats.cpq.mean.toFixed(2)}</td></tr>
                  <tr className="border-t"><td className="p-2">Median</td><td className="p-2 text-right">{stats.cpq.median.toFixed(2)}</td></tr>
                  <tr className="border-t"><td className="p-2">Std Dev</td><td className="p-2 text-right">{stats.cpq.stdDev.toFixed(2)}</td></tr>
                  <tr className="border-t"><td className="p-2">Q1</td><td className="p-2 text-right">{stats.cpq.q1.toFixed(2)}</td></tr>
                  <tr className="border-t"><td className="p-2">Q3</td><td className="p-2 text-right">{stats.cpq.q3.toFixed(2)}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="md:w-1/2 p-2">
              <h3 className="text-md font-medium mb-2">Distribution Visualization</h3>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Range", value: stats.cpq.max - stats.cpq.min, x: stats.cpq.min }
                  ]}
                  margin={{ top: 20, right: 20, bottom: 5, left: 20 }}
                >
                  <XAxis type="number" domain={[0, 55]} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip />
                  
                  {/* Full range bar (min to max) */}
                  <Bar dataKey="value" isAnimationActive={false} barSize={20} fill="#e5e7eb">
                    <LabelList dataKey="x" position="left" content={({value}) => <text x={value-2} y={30} textAnchor="end" fontSize={12}>{value.toFixed(1)}</text>} />
                    <LabelList dataKey="value" position="right" content={({x, value}) => <text x={x+value+2} y={30} textAnchor="start" fontSize={12}>{stats.cpq.max.toFixed(1)}</text>} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "IQR", value: stats.cpq.q3 - stats.cpq.q1, x: stats.cpq.q1 }
                  ]}
                  margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                >
                  <XAxis type="number" domain={[0, 55]} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip />
                  
                  {/* Q1-Q3 bar */}
                  <Bar dataKey="value" fill="#3b82f6" barSize={20} isAnimationActive={false}>
                    <LabelList dataKey="x" position="left" content={({value}) => <text x={value-2} y={30} textAnchor="end" fontSize={12}>{`Q1: ${value.toFixed(1)}`}</text>} />
                    <LabelList dataKey="value" position="right" content={({x, value}) => <text x={x+value+2} y={30} textAnchor="start" fontSize={12}>{`Q3: ${stats.cpq.q3.toFixed(1)}`}</text>} />
                  </Bar>
                  
                  {/* Median and Mean markers */}
                  <ReferenceLine x={stats.cpq.median} stroke="#000000" strokeWidth={2}>
                    <Label value={`Median: ${stats.cpq.median.toFixed(1)}`} position="top" fontSize={12} />
                  </ReferenceLine>
                  <ReferenceLine x={stats.cpq.mean} stroke="#ff0000" strokeWidth={2} strokeDasharray="3 3">
                    <Label value={`Mean: ${stats.cpq.mean.toFixed(1)}`} position="bottom" fontSize={12} fill="#ff0000" />
                  </ReferenceLine>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="text-xs text-center mt-2">
                <span className="inline-block w-3 h-3 bg-gray-200 mr-1"></span> Range (Min-Max)
                <span className="inline-block ml-3 mr-1 w-3 h-3 bg-blue-400"></span> IQR (Q1-Q3)
                <span className="inline-block ml-3 mr-1" style={{ color: 'red' }}>- - -</span> Mean
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Correlation Analysis */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Queries vs Credits Correlation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="totalQueries" 
              name="Total Queries" 
              domain={[0, 70]}
            >
              <Label value="Total Queries" position="bottom" offset={0} />
            </XAxis>
            <YAxis 
              type="number" 
              dataKey="totalCreditsConsumed" 
              name="Total Credits"
              domain={[0, 2000]}
            >
              <Label value="Total Credits" angle={-90} position="left" offset={-40} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="Months" data={data} fill="#1e40af" />
            
            {/* Regression Line */}
            <Scatter
              name="Regression Line"
              data={[
                { totalQueries: 10, totalCreditsConsumed: 582 },
                { totalQueries: 70, totalCreditsConsumed: 1462 }
              ]}
              line={{ stroke: '#ff0000', strokeWidth: 2 }}
              shape={() => null}
              legendType="line"
            />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="bg-gray-100 p-2 rounded mt-2">
          <p className="text-center font-medium">Regression equation: y = 22.85x + 264.07 (R² = 0.3652)</p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Monthly Trends - Combined View</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              angle={-45} 
              textAnchor="end"
              height={60}
            />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8">
              <Label value="Queries" angle={-90} position="left" offset={-20} />
            </YAxis>
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 2000]}>
              <Label value="Credits" angle={-90} position="right" offset={20} />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="totalQueries" fill="#8884d8" name="Total Queries" />
            <Line yAxisId="right" type="monotone" dataKey="totalCreditsConsumed" stroke="#82ca9d" name="Total Credits" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Credits per Query - Monthly */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Credits per Query by Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              angle={-45} 
              textAnchor="end"
              height={60}
            />
            <YAxis domain={[0, 55]}>
              <Label value="Credits per Query" angle={-90} position="left" offset={-20} />
            </YAxis>
            <Tooltip />
            <Bar dataKey="creditsPerQuery" fill="#3b82f6" name="Credits per Query">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.creditsPerQuery > stats.cpq.mean ? '#ef4444' : '#3b82f6'} />
              ))}
            </Bar>
            <Legend />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-sm text-center mt-2">
          Red bars indicate above-average credits per query
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4 text-center">Query Count Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={queryDistribution}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {queryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} months`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4 text-center">Credit Usage Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={creditDistribution}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {creditDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} months`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Monthly Data with Ratios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Month</th>
                <th className="p-2 text-right">Total Queries</th>
                <th className="p-2 text-right">Total Credits</th>
                <th className="p-2 text-right">Credits per Query</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{row.month}</td>
                  <td className="p-2 text-right">{row.totalQueries}</td>
                  <td className="p-2 text-right">{row.totalCreditsConsumed.toLocaleString()}</td>
                  <td className="p-2 text-right">{row.creditsPerQuery.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueryCreditsAnalysis;










