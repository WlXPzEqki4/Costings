import React, { useState, useEffect } from 'react';

const SnowflakeQueryEstimator = () => {
  const [queryCount, setQueryCount] = useState('');
  const [estimatedCredits, setEstimatedCredits] = useState(null);
  const [averageCreditsPerQuery, setAverageCreditsPerQuery] = useState(30.8);
  const [warehouseTimes, setWarehouseTimes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthWarehouseTimes, setMonthWarehouseTimes] = useState([]);

  // Historical data for reference
  const historicalData = [
    { month: "May-24", totalQueries: 64, totalCreditsConsumed: 1549, creditsPerQuery: 24.20 },
    { month: "Jun-24", totalQueries: 39, totalCreditsConsumed: 1795, creditsPerQuery: 46.03 },
    { month: "Jul-24", totalQueries: 31, totalCreditsConsumed: 1008, creditsPerQuery: 32.52 },
    { month: "Aug-24", totalQueries: 41, totalCreditsConsumed: 358, creditsPerQuery: 8.73 },
    { month: "Sep-24", totalQueries: 42, totalCreditsConsumed: 1081, creditsPerQuery: 25.74 },
    { month: "Oct-24", totalQueries: 25, totalCreditsConsumed: 889, creditsPerQuery: 35.56 },
    { month: "Nov-24", totalQueries: 37, totalCreditsConsumed: 1683, creditsPerQuery: 45.49 },
    { month: "Dec-24", totalQueries: 13, totalCreditsConsumed: 345, creditsPerQuery: 26.54 },
    { month: "Jan-25", totalQueries: 14, totalCreditsConsumed: 240, creditsPerQuery: 17.14 },
    { month: "Feb-25", totalQueries: 26, totalCreditsConsumed: 1280, creditsPerQuery: 49.23 }
  ];

  // Warehouse sizes and their credit consumption rates
  const warehouseSizes = [
    { size: "X-Small", creditsPerHour: 1, creditsPerSecond: 0.0003 },
    { size: "Small", creditsPerHour: 2, creditsPerSecond: 0.0006 },
    { size: "Medium", creditsPerHour: 4, creditsPerSecond: 0.0011 },
    { size: "Large", creditsPerHour: 8, creditsPerSecond: 0.0022 },
    { size: "X-Large", creditsPerHour: 16, creditsPerSecond: 0.0044 },
    { size: "2X-Large", creditsPerHour: 32, creditsPerSecond: 0.0089 },
    { size: "3X-Large", creditsPerHour: 64, creditsPerSecond: 0.0178 },
    { size: "4X-Large", creditsPerHour: 128, creditsPerSecond: 0.0356 },
    { size: "5X-Large", creditsPerHour: 256, creditsPerSecond: 0.0711 },
    { size: "6X-Large", creditsPerHour: 512, creditsPerSecond: 0.1422 }
  ];

  // Calculate totals and average
  useEffect(() => {
    const totalQueries = historicalData.reduce((sum, item) => sum + item.totalQueries, 0);
    const totalCredits = historicalData.reduce((sum, item) => sum + item.totalCreditsConsumed, 0);
    const average = totalCredits / totalQueries;
    setAverageCreditsPerQuery(average);
  }, []);

  // Calculate estimated credits and warehouse times when query count changes
  useEffect(() => {
    if (queryCount === '' || isNaN(parseInt(queryCount))) {
      setEstimatedCredits(null);
      setWarehouseTimes([]);
      return;
    }

    const estimated = Number(queryCount) * averageCreditsPerQuery;
    setEstimatedCredits(estimated);

    // Calculate time required at each warehouse size
    const times = calculateWarehouseTimes(estimated);
    setWarehouseTimes(times);
  }, [queryCount, averageCreditsPerQuery]);

  // Calculate warehouse times for selected month
  useEffect(() => {
    if (!selectedMonth) {
      setMonthWarehouseTimes([]);
      return;
    }

    const monthData = historicalData.find(item => item.month === selectedMonth);
    if (monthData) {
      const times = calculateWarehouseTimes(monthData.totalCreditsConsumed);
      setMonthWarehouseTimes(times);
    }
  }, [selectedMonth]);

  // Helper function to calculate warehouse times for a given credit amount
  const calculateWarehouseTimes = (credits) => {
    return warehouseSizes.map(warehouse => {
      const seconds = credits / warehouse.creditsPerSecond;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      const days = hours / 24;

      return {
        ...warehouse,
        timeInSeconds: seconds,
        timeInMinutes: minutes,
        timeInHours: hours,
        timeInDays: days,
        formattedTime: formatTime(seconds)
      };
    });
  };

  // Format seconds into a readable time string
  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds.toFixed(1)} seconds`;
    } else if (seconds < 3600) {
      return `${(seconds / 60).toFixed(1)} minutes`;
    } else if (seconds < 86400) {
      return `${(seconds / 3600).toFixed(1)} hours`;
    } else {
      return `${(seconds / 86400).toFixed(1)} days`;
    }
  };

  const handleQueryCountChange = (e) => {
    setQueryCount(e.target.value);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  // Function to determine cell background color based on time
  const getTimeColor = (seconds) => {
    if (seconds < 60) return "bg-green-50"; // < 1 minute
    if (seconds < 3600) return "bg-blue-50"; // < 1 hour
    if (seconds < 86400) return "bg-yellow-50"; // < 1 day
    return "bg-red-50"; // >= 1 day
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md pb-24">
      {/* Section 1: Query Estimator */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">Snowflake Query Execution Time Estimator</h2>
        
        <div className="mb-6">
          <div className="mb-2 text-sm text-gray-600">
            Based on historical data, each query consumes an average of <span className="font-semibold">{averageCreditsPerQuery.toFixed(2)}</span> credits.
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="queryCount" className="block mb-2 font-medium">
                Enter number of queries:
              </label>
              <input
                id="queryCount"
                type="number"
                value={queryCount}
                onChange={handleQueryCountChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter query count"
                min="0"
              />
            </div>
            
            {estimatedCredits !== null && (
              <div className="flex-1 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Estimated Credits:</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(estimatedCredits).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  (Based on average of {averageCreditsPerQuery.toFixed(2)} credits per query)
                </div>
              </div>
            )}
          </div>
        </div>
        
        {warehouseTimes.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Estimated Execution Times by Warehouse Size:</h3>
            <div className="overflow-x-auto rounded border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse Size</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credits/Hour</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credits/Second</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Time</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Efficiency</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {warehouseTimes.map((warehouse, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 text-sm text-gray-700 font-medium">{warehouse.size}</td>
                      <td className="px-3 py-2 text-sm text-right text-gray-700">{warehouse.creditsPerHour}</td>
                      <td className="px-3 py-2 text-sm text-right text-gray-700">{warehouse.creditsPerSecond.toFixed(4)}</td>
                      <td className={`px-3 py-2 text-sm text-right font-medium ${getTimeColor(warehouse.timeInSeconds)}`}>
                        {warehouse.formattedTime}
                      </td>
                      <td className="px-3 py-2 text-sm text-right text-gray-700">
                        {warehouse.creditsPerHour.toFixed(1)}x
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3 text-xs">
              <div className="flex items-center"><span className="w-3 h-3 bg-green-50 mr-1 inline-block border border-green-100"></span> &lt; 1 minute</div>
              <div className="flex items-center"><span className="w-3 h-3 bg-blue-50 mr-1 inline-block border border-blue-100"></span> &lt; 1 hour</div>
              <div className="flex items-center"><span className="w-3 h-3 bg-yellow-50 mr-1 inline-block border border-yellow-100"></span> &lt; 1 day</div>
              <div className="flex items-center"><span className="w-3 h-3 bg-red-50 mr-1 inline-block border border-red-100"></span> &gt;= 1 day</div>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Historical Metrics:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Credits per Query by Month</h4>
              <div className="h-48 overflow-y-auto border border-gray-200 rounded">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credits/Query</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {historicalData.map((item, index) => (
                      <tr key={index} className={item.creditsPerQuery > averageCreditsPerQuery ? "bg-red-50" : ""}>
                        <td className="px-3 py-2 text-sm text-gray-500">{item.month}</td>
                        <td className="px-3 py-2 text-sm text-right font-medium">
                          {item.creditsPerQuery.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Credits and Queries by Month</h4>
              <div className="h-48 overflow-y-auto border border-gray-200 rounded">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Queries</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {historicalData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-sm text-gray-500">{item.month}</td>
                        <td className="px-3 py-2 text-sm text-right text-gray-700">{item.totalQueries}</td>
                        <td className="px-3 py-2 text-sm text-right text-gray-700">{item.totalCreditsConsumed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section 2: Historical Analysis */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">Monthly Historical Analysis</h2>
        
        <div className="mb-6">
          <label className="block mb-2 font-medium">Select a month to analyze:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {historicalData.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMonthSelect(item.month)}
                className={`py-2 px-3 text-sm border rounded-md transition-colors 
                  ${selectedMonth === item.month 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                {item.month}
              </button>
            ))}
          </div>
        </div>
        
        {selectedMonth && (
          <div className="bg-gray-50 p-4 rounded-lg">
            {historicalData.map((item, index) => {
              if (item.month === selectedMonth) {
                return (
                  <div key={index}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Month</div>
                        <div className="text-lg font-bold">{item.month}</div>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Total Queries</div>
                        <div className="text-lg font-bold">{item.totalQueries}</div>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-sm text-gray-500">Total Credits</div>
                        <div className="text-lg font-bold">{item.totalCreditsConsumed}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Execution Times for {item.month} by Warehouse Size:</h3>
                      <div className="overflow-x-auto rounded border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse Size</th>
                              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credits/Hour</th>
                              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credits/Second</th>
                              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Run Time</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {monthWarehouseTimes.map((warehouse, idx) => (
                              <tr key={idx}>
                                <td className="px-3 py-2 text-sm text-gray-700 font-medium">{warehouse.size}</td>
                                <td className="px-3 py-2 text-sm text-right text-gray-700">{warehouse.creditsPerHour}</td>
                                <td className="px-3 py-2 text-sm text-right text-gray-700">{warehouse.creditsPerSecond.toFixed(4)}</td>
                                <td className={`px-3 py-2 text-sm text-right font-medium ${getTimeColor(warehouse.timeInSeconds)}`}>
                                  {warehouse.formattedTime}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3 text-xs">
                        <div className="flex items-center"><span className="w-3 h-3 bg-green-50 mr-1 inline-block border border-green-100"></span> &lt; 1 minute</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-blue-50 mr-1 inline-block border border-blue-100"></span> &lt; 1 hour</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-yellow-50 mr-1 inline-block border border-yellow-100"></span> &lt; 1 day</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-red-50 mr-1 inline-block border border-red-100"></span> &gt;= 1 day</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                      <div className="font-medium mb-1">Analysis:</div>
                      <p>In {item.month}, you ran {item.totalQueries} queries consuming {item.totalCreditsConsumed} credits.</p>
                      <p className="mt-1">Average credit consumption was {item.creditsPerQuery.toFixed(2)} credits per query 
                        ({item.creditsPerQuery > averageCreditsPerQuery ? 'above' : 'below'} the overall average of {averageCreditsPerQuery.toFixed(2)}).</p>
                      <p className="mt-1">At an X-Small warehouse, these queries would have taken approximately {monthWarehouseTimes[0]?.formattedTime}.</p>
                      <p className="mt-1">At a 4X-Large warehouse, the same workload would have completed in approximately {monthWarehouseTimes[7]?.formattedTime}.</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
        <h3 className="font-medium mb-1">Notes:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>These estimates are based on your historical data and Snowflake warehouse credit consumption rates.</li>
          <li>Actual execution times may vary depending on query complexity, data volume, concurrency, and other factors.</li>
          <li>Larger warehouses process queries faster but consume credits at a proportionally higher rate.</li>
          <li>The historical analysis shows how long each month's actual workload would take at different warehouse sizes.</li>
        </ul>
      </div>
    </div>
  );
};

export default SnowflakeQueryEstimator;