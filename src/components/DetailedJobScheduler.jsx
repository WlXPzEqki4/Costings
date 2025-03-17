import React, { useState, useEffect } from 'react';

const JobScheduleCalculator = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [jobSchedule, setJobSchedule] = useState([]);
  const [jobMetrics, setJobMetrics] = useState({
    totalJobs: 33,
    jobDurationHours: 14.3,
    averageJobsPerDay: 1.06,
    jobsPerDay: {}
  });
  
  // Constants
  const TOTAL_DAYS = 31;
  
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
  
  // Calculate job scheduling parameters for all warehouses
  useEffect(() => {
    if (selectedMonth) {
      const monthData = historicalData.find(m => m.month === selectedMonth);
      
      if (monthData) {
        // Calculate metrics for each warehouse
        const jobsPerDayByWarehouse = {};
        
        warehouseSizes.forEach(warehouse => {
          // Calculate total runtime based on credits and warehouse speed
          const totalCredits = monthData.totalCreditsConsumed;
          const totalSeconds = totalCredits / warehouse.creditsPerSecond;
          const totalHours = totalSeconds / 3600;
          
          // Calculate number of jobs needed to process within the month
          const requiredJobsPerDay = totalHours / (TOTAL_DAYS * 24);
          const jobsPerDay = requiredJobsPerDay * 24; // Jobs per day (not per hour)
          
          jobsPerDayByWarehouse[warehouse.size] = jobsPerDay;
        });
        
        setJobMetrics(prev => ({
          ...prev,
          jobsPerDay: jobsPerDayByWarehouse
        }));
      }
    }
  }, [selectedMonth]);
  
  // Generate job schedule when warehouse is selected
  useEffect(() => {
    if (selectedMonth && selectedWarehouse) {
      const monthData = historicalData.find(m => m.month === selectedMonth);
      const warehouseData = warehouseSizes.find(w => w.size === selectedWarehouse);
      
      if (monthData && warehouseData) {
        // Calculate total execution time in hours
        const totalCredits = monthData.totalCreditsConsumed;
        const totalSeconds = totalCredits / warehouseData.creditsPerSecond;
        const totalHours = totalSeconds / 3600;
        
        // Calculate jobs per day based on warehouse capacity
        const requiredJobsPerDay = totalHours / (TOTAL_DAYS * 24);
        const jobsPerDay = requiredJobsPerDay * 24; // Jobs per day (not per hour)
        
        // Calculate job duration (how long each job runs)
        const jobDurationHours = 14.3; // Fixed duration
        const totalJobs = Math.ceil(totalHours / jobDurationHours);
        
        // Update job metrics
        setJobMetrics({
          totalJobs: totalJobs,
          jobDurationHours: jobDurationHours,
          averageJobsPerDay: jobsPerDay,
          jobsPerDay: { ...jobMetrics.jobsPerDay }
        });
        
        // Generate job schedule with the fixed duration
        const jobs = generateJobSchedule(totalJobs, jobDurationHours);
        setJobSchedule(jobs);
      }
    }
  }, [selectedMonth, selectedWarehouse]);
  
  // Calculate execution times for each warehouse size
  const calculateExecutionTimes = (credits) => {
    return warehouseSizes.map(warehouse => {
      const seconds = credits / warehouse.creditsPerSecond;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      const days = hours / 24;
      
      // Fixed job duration
      const jobDurationHours = 14.3;
      const totalJobs = Math.ceil(hours / jobDurationHours);
      
      // Calculate jobs per day for this warehouse
      const jobsPerDay = totalJobs / TOTAL_DAYS;
      
      return {
        ...warehouse,
        seconds,
        minutes,
        hours,
        days,
        totalJobs,
        jobsPerDay,
        jobDurationHours,
        formattedTime: formatTimeString(seconds)
      };
    });
  };
  
  // Format seconds into a readable time string
  const formatTimeString = (seconds) => {
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
  
  // Format time in HH:MM format
  const formatTimeHHMM = (hours, minutes) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  // Generate evenly distributed job start times
  const generateJobSchedule = (totalJobs, jobDurationHours) => {
    const jobs = [];
    
    // Distribute job starts evenly across the month
    const interval = TOTAL_DAYS / totalJobs;
    
    for (let i = 0; i < totalJobs; i++) {
      const startDay = i * interval;
      const startDayInt = Math.floor(startDay);
      const startDayFraction = startDay - startDayInt;
      
      // Convert fraction of day to hours and minutes
      const startHour = Math.floor(startDayFraction * 24);
      const startMinute = Math.floor((startDayFraction * 24 - startHour) * 60);
      
      // Calculate end time
      const jobDurationDays = jobDurationHours / 24;
      const endDay = startDay + jobDurationDays;
      const endDayInt = Math.floor(endDay);
      const endDayFraction = endDay - endDayInt;
      const endHour = Math.floor(endDayFraction * 24);
      const endMinute = Math.floor((endDayFraction * 24 - endHour) * 60);
      
      jobs.push({
        id: i + 1,
        name: `Job ${i + 1}`,
        startDay: startDayInt + 1, // 1-indexed for display
        startHour,
        startMinute,
        endDay: endDayInt + 1, // 1-indexed for display
        endHour,
        endMinute,
        duration: jobDurationHours,
        startTime: formatTimeHHMM(startHour, startMinute),
        endTime: formatTimeHHMM(endHour, endMinute),
        startDayFraction: startDay,
        color: getJobColor(i)
      });
    }
    
    return jobs;
  };
  
  // Custom colors for jobs
  const getJobColor = (jobId) => {
    const colors = [
      'bg-green-500', 'bg-purple-500', 'bg-blue-500', 'bg-pink-500', 'bg-yellow-500'
    ];
    
    return colors[jobId % colors.length];
  };
  
  // Function to determine cell background color based on time
  const getTimeColor = (seconds) => {
    if (seconds < 60) return "bg-green-50"; // < 1 minute
    if (seconds < 3600) return "bg-blue-50"; // < 1 hour
    if (seconds < 86400) return "bg-yellow-50"; // < 1 day
    return "bg-red-50"; // >= 1 day
  };
  
  // Handle month selection
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setSelectedWarehouse(null);
    setJobSchedule([]);
  };
  
  // Handle warehouse selection
  const handleWarehouseSelect = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };
  
  // Get days of the week
  const getDayOfWeek = (day) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[day % 7];
  };
  
  // Get the currently selected month data
  const selectedMonthData = selectedMonth 
    ? historicalData.find(m => m.month === selectedMonth) 
    : null;
  
  // Calculate execution times for selected month
  const monthExecutionTimes = selectedMonthData 
    ? calculateExecutionTimes(selectedMonthData.totalCreditsConsumed)
    : [];
    
  // Get selected warehouse details
  const selectedWarehouseData = selectedWarehouse
    ? warehouseSizes.find(w => w.size === selectedWarehouse)
    : null;
    
  // Get selected warehouse execution time
  const selectedWarehouseExecution = selectedWarehouse && monthExecutionTimes.length > 0
    ? monthExecutionTimes.find(w => w.size === selectedWarehouse)
    : null;
    
  // Helper to check if job is running on a specific day/hour
  const isJobRunningAt = (job, day) => {
    if (job.startDay === day && job.endDay === day) {
      return true; // Job starts and ends on this day
    } else if (job.startDay === day) {
      return true; // Job starts on this day
    } else if (job.endDay === day) {
      return true; // Job ends on this day
    } else if (job.startDay < day && job.endDay > day) {
      return true; // Job runs through this entire day
    }
    return false;
  };
  
  // Calculate the width of a job bar on a specific day (for partial days)
  const getJobWidthOnDay = (job, day) => {
    if (job.startDay === day && job.endDay === day) {
      // Job starts and ends on same day
      const startFraction = job.startHour / 24;
      const endFraction = (job.endHour + job.endMinute / 60) / 24;
      return (endFraction - startFraction) * 100;
    } else if (job.startDay === day) {
      // Job starts on this day
      const startFraction = job.startHour / 24;
      return (1 - startFraction) * 100;
    } else if (job.endDay === day) {
      // Job ends on this day
      const endFraction = (job.endHour + job.endMinute / 60) / 24;
      return endFraction * 100;
    } else {
      // Job runs through the entire day
      return 100;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md pb-24">
      <h1 className="text-5xl font-bold mb-8 text-center">Job Schedule Calculator</h1>
      
      {/* Month Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Select a Month</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {historicalData.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMonthSelect(item.month)}
              className={`py-2 px-3 text-sm border rounded-md transition-colors ${
                selectedMonth === item.month 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {item.month}
            </button>
          ))}
        </div>
      </div>
      
      {/* Month Details */}
      {selectedMonthData && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Month Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500">Month</div>
              <div className="text-xl font-bold">{selectedMonthData.month}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500">Total Queries</div>
              <div className="text-xl font-bold">{selectedMonthData.totalQueries}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500">Total Credits</div>
              <div className="text-xl font-bold">{selectedMonthData.totalCreditsConsumed.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Execution Times by Warehouse Size</h3>
            <div className="overflow-x-auto rounded border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Warehouse Size</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Credits/Hour</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total Runtime</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Jobs Per Day</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Select</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monthExecutionTimes.map((warehouse, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-2 text-sm text-gray-700 font-medium">{warehouse.size}</td>
                      <td className="px-3 py-2 text-sm text-right text-gray-700">{warehouse.creditsPerHour}</td>
                      <td className={`px-3 py-2 text-sm text-right font-medium ${getTimeColor(warehouse.seconds)}`}>
                        {warehouse.formattedTime}
                      </td>
                      <td className="px-3 py-2 text-sm text-right text-gray-700">
                        {warehouse.jobsPerDay.toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button 
                          onClick={() => handleWarehouseSelect(warehouse.size)}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            selectedWarehouse === warehouse.size 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          Choose Schedule
                        </button>
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
        </div>
      )}
      
      {/* Job Schedule with Gantt Chart */}
      {selectedMonth && selectedWarehouse && jobSchedule.length > 0 && selectedWarehouseExecution && (
        <div id="job-schedule" className="mt-8">
          <h2 className="text-2xl font-bold mb-4">3. Job Schedule</h2>
          
          <div className="bg-white rounded-lg shadow border border-gray-200 mb-8">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold mb-3">Job Schedule Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <p><span className="font-medium">Total Jobs:</span> {jobMetrics.totalJobs}</p>
                  <p><span className="font-medium">Job Duration:</span> {jobMetrics.jobDurationHours.toFixed(1)} hours ({Math.round(jobMetrics.jobDurationHours * 60)} minutes)</p>
                  <p><span className="font-medium">Month Duration:</span> {TOTAL_DAYS} days</p>
                  <p><span className="font-medium">Average Jobs Starting Per Day:</span> {selectedWarehouseExecution.jobsPerDay.toFixed(2)}</p>
                </div>
                <div>
                  <p><span className="font-medium">Month:</span> {selectedMonth}</p>
                  <p><span className="font-medium">Warehouse Size:</span> {selectedWarehouse}</p>
                  <p><span className="font-medium">Credits:</span> {selectedMonthData?.totalCreditsConsumed.toLocaleString()}</p>
                  <p>
                    <span className="font-medium">Credit Consumption Rate:</span> {selectedWarehouseData?.creditsPerHour} credits/hour
                  </p>
                </div>
              </div>
            </div>
            
            {/* Gantt Chart */}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-4">Monthly Job Schedule (33 Jobs × {jobMetrics.jobDurationHours.toFixed(1)} Hours)</h3>
              
              <div className="overflow-x-auto border border-gray-200 rounded">
                <div className="min-w-max">
                  {/* Header with day numbers */}
                  <div className="flex border-b border-gray-200 bg-gray-50">
                    <div className="w-24 min-w-24 border-r border-gray-200 px-2 py-1 font-medium"></div>
                    {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(day => (
                      <div key={day} className="w-14 min-w-14 text-center border-r border-gray-200 px-1 py-1">
                        <div className="font-medium">{day}</div>
                        <div className="text-xs text-gray-500">{getDayOfWeek(day - 1)}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Job rows */}
                  {jobSchedule.map(job => (
                    <div key={job.id} className="flex border-b border-gray-200 hover:bg-gray-50">
                      <div className="w-24 min-w-24 border-r border-gray-200 px-2 py-2 font-medium flex items-center">
                        {job.name}
                      </div>
                      
                      {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(day => {
                        // Check if job is active on this day
                        const isActive = isJobRunningAt(job, day);
                        
                        if (!isActive) {
                          return (
                            <div key={day} className="w-14 min-w-14 border-r border-gray-200 px-0 py-2"></div>
                          );
                        }
                        
                        // Determine job cell styling
                        const isJobStart = job.startDay === day;
                        const isJobEnd = job.endDay === day;
                        const isSameDay = job.startDay === job.endDay && job.startDay === day;
                        
                        let roundedStyle = "";
                        if (isSameDay) {
                          roundedStyle = "rounded-md";
                        } else if (isJobStart) {
                          roundedStyle = "rounded-l-md";
                        } else if (isJobEnd) {
                          roundedStyle = "rounded-r-md";
                        }
                        
                        // Calculate width for partial days
                        let width = "100%";
                        if (isSameDay || isJobStart || isJobEnd) {
                          const widthPercent = getJobWidthOnDay(job, day);
                          width = `${widthPercent}%`;
                        }
                        
                        // Position for partial start days
                        let marginLeft = "0%";
                        if (isJobStart && !isSameDay) {
                          const startFraction = job.startHour / 24;
                          marginLeft = `${startFraction * 100}%`;
                        }
                        
                        return (
                          <div key={day} className="w-14 min-w-14 border-r border-gray-200 px-0 py-2 relative flex items-center">
                            <div 
                              className={`h-6 ${roundedStyle} text-white text-xs flex items-center justify-center ${job.color}`}
                              style={{ 
                                width: width,
                                marginLeft: marginLeft
                              }}
                            >
                              {isJobStart ? "Job" : ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Distribution Details */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold">Job Distribution</h3>
            </div>
            
            <div className="p-4">
              <div className="overflow-auto max-h-[700px]">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Job</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Start</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">End</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobSchedule.sort((a, b) => a.id - b.id).map(job => {
                      return (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-sm font-medium text-gray-700">{job.name}</td>
                          <td className="px-3 py-2 text-sm text-gray-600">Day {job.startDay}, {job.startTime}</td>
                          <td className="px-3 py-2 text-sm text-gray-600">Day {job.endDay}, {job.endTime}</td>
                          <td className="px-3 py-2 text-sm text-right text-gray-600">{job.duration.toFixed(1)} hours</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobScheduleCalculator;













