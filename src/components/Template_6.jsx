import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Users, Settings, Bell, Calendar, Mail, Star, 
  Bookmark, Heart, Zap, Menu, Layout, Grid, Award, Home,
  ChevronDown, ChevronUp, ChevronRight, ChevronLeft,
  Eye, Target, BarChart2, ArrowRight, Check, X
} from 'lucide-react';

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

// Navigation data
const navigationData = [
  { id: 'home', title: 'Home', icon: Home },
  { id: 'cards', title: 'Expandable Cards', icon: Grid },
  { id: 'dashboard', title: 'Interactive Dashboard', icon: Layout },
  { id: 'stats', title: 'Statistics', icon: BarChart2 },
];

const ExpandableCard = ({ title, icon: Icon, details, metrics, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const isVisible = useOnScreen(cardRef, '-50px');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible]);

  return (
    <div
      ref={cardRef}
      className={`
        transform transition-all duration-500 ease-out
        ${hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-[50px] opacity-0'}
      `}
    >
      <div className="rounded-lg bg-white shadow-lg overflow-hidden">
        <div 
          className={`
            p-6 cursor-pointer transition-all duration-300
            ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                {metrics && (
                  <div className="flex space-x-4 mt-2">
                    {metrics.map((metric, idx) => (
                      <div key={idx} className="text-sm text-gray-600">
                        {metric}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ChevronRight 
              className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            />
          </div>
        </div>
        
        <div
          ref={contentRef}
          style={{ 
            height: isExpanded ? contentRef.current?.scrollHeight + 'px' : '0',
            opacity: isExpanded ? 1 : 0
          }}
          className="transition-all duration-300 ease-in-out overflow-hidden bg-gray-50"
        >
          <div className="p-6 border-t">
            {details && (
              <ul className="space-y-3">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressCircle = ({ value, label, color = 'blue' }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const circleRef = useRef(null);
  const isVisible = useOnScreen(circleRef);
  
  useEffect(() => {
    if (isVisible) {
      setCurrentValue(value);
    }
  }, [isVisible, value]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentValue / 100) * circumference;

  return (
    <div ref={circleRef} className="flex flex-col items-center">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke={`var(--color-${color}-500)`}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="mt-2 text-center">
        <div className="text-2xl font-bold">{currentValue}%</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
};

const AnimatedCounter = ({ value, label, icon: Icon, color = 'blue' }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const counterRef = useRef(null);
  const isVisible = useOnScreen(counterRef);
  
  useEffect(() => {
    if (isVisible) {
      const targetValue = parseInt(value.replace(/[^0-9]/g, ''));
      const duration = 1500;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCurrentValue(targetValue);
          clearInterval(timer);
        } else {
          setCurrentValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div
      ref={counterRef}
      className={`
        rounded-lg p-6 shadow-lg transition-all duration-300 
        hover:scale-105 bg-${color}-50
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">
            {value.startsWith('$') ? '$' : ''}{currentValue}
            {value.endsWith('%') ? '%' : ''}
          </p>
        </div>
        <Icon className={`h-8 w-8 text-${color}-500`} />
      </div>
    </div>
  );
};

const StatusIndicator = ({ status }) => {
  const getColor = () => {
    switch (status.toLowerCase()) {
      case 'active': return 'green';
      case 'warning': return 'yellow';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className={`flex items-center space-x-2 text-${getColor()}-600`}>
      <div className={`h-2.5 w-2.5 rounded-full bg-${getColor()}-500 animate-pulse`} />
      <span className="text-sm font-medium">{status}</span>
    </div>
  );
};

const LayoutShowcase = () => {
  const [activeSection, setActiveSection] = useState('home');

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
              Interactive Showcase
            </span>
          </div>

          {navigationData.map(({ id, title, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`
                mb-4 flex items-center rounded-lg p-2 transition-all duration-200
                ${activeSection === id ? 'bg-gray-800 scale-105' : 'hover:bg-gray-800 hover:scale-105'}
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

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="min-h-screen p-8">
          {/* Welcome Section */}
          <section id="home" className="mb-16">
            <ExpandableCard
              title="Welcome to Interactive Layout Showcase"
              icon={Home}
              details={[
                "Explore our collection of animated and interactive components",
                "Click cards to expand and reveal more information",
                "Watch counters and progress indicators animate on scroll",
                "Interact with various elements to see different animations"
              ]}
            />
          </section>

          {/* Expandable Cards Section */}
          <section id="cards" className="mb-16 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Expandable Cards</h2>
            {[
              {
                title: "Project Overview",
                icon: Layout,
                metrics: ["Last updated: 2 days ago", "Contributors: 5"],
                details: [
                  "Project completion rate: 75%",
                  "Sprint velocity: 34 points",
                  "Active tasks: 12",
                  "Pending reviews: 3"
                ]
              },
              {
                title: "Team Performance",
                icon: Users,
                metrics: ["Team size: 8", "Avg. response time: 2h"],
                details: [
                  "Sprint goals achieved: 92%",
                  "Code review completion rate: 88%",
                  "Team velocity trend: Increasing",
                  "Knowledge sharing sessions: 4/month"
                ]
              },
              {
                title: "System Status",
                icon: Settings,
                metrics: ["Uptime: 99.9%", "Response time: 145ms"],
                details: [
                  "All systems operational",
                  "Last deployment: 6 hours ago",
                  "Active monitoring enabled",
                  "Automatic scaling configured"
                ]
              }
            ].map((card, index) => (
              <ExpandableCard key={index} {...card} />
            ))}
          </section>

          {/* Interactive Dashboard Section */}
          <section id="dashboard" className="mb-16 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Interactive Dashboard</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <ExpandableCard
                title="Performance Metrics"
                icon={BarChart2}
                metrics={["Updated live", "Real-time data"]}
              >
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <ProgressCircle value={78} label="CPU Usage" color="blue" />
                  <ProgressCircle value={92} label="Memory" color="green" />
                  <ProgressCircle value={45} label="Storage" color="yellow" />
                  <ProgressCircle value={87} label="Network" color="purple" />
                </div>
              </ExpandableCard>

              <ExpandableCard
                title="System Status"
                icon={Settings}
                metrics={["All systems operational"]}
              >
                <div className="space-y-4">
                  {[
                    { name: "API Server", status: "Active" },
                    { name: "Database", status: "Active" },
                    { name: "Storage", status: "Warning" },
                    { name: "Cache", status: "Active" }
                  ].map((system, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{system.name}</span>
                      <StatusIndicator status={system.status} />
                    </div>
                  ))}
                </div>
              </ExpandableCard>
            </div>
          </section>

          {/* Statistics Section */}
          <section id="stats" className="mb-16 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Users, label: 'Total Users', value: '12845', color: 'blue' },
                { icon: Star, label: 'Reviews', value: '4327', color: 'yellow' },
                { icon: Heart, label: 'Likes', value: '8721', color: 'red' },
                { icon: Zap, label: 'Conversion', value: '67%', color: 'green' }
              ].map((stat, index) => (
                <AnimatedCounter key={index} {...stat} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LayoutShowcase;