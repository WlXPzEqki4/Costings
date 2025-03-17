import React, { useState } from 'react';
import {
  ChevronRight, Menu, Home, Settings, Users, FileText,
  Box, Shield, Cloud, Database, Code, Eye, 
  Bell, Terminal, Server, Cpu, Network, Lock,
  Zap, Activity, BarChart2, PieChart, Key
} from 'lucide-react';

// Navigation data
const navigationData = [
  { id: 'overview', title: 'Overview', icon: Home },
  { id: 'infrastructure', title: 'Infrastructure', icon: Server },
  { id: 'security', title: 'Security', icon: Shield },
  { id: 'monitoring', title: 'Monitoring', icon: Activity }
];

// Reusable animated icon component
const AnimatedIcon = ({ icon: Icon, size = 24, className = "" }) => (
  <div className={`
    transform transition-all duration-300 ease-in-out
    group-hover:scale-110 group-hover:rotate-[8deg]
    ${className}
  `}>
    <Icon size={size} />
  </div>
);

// Expandable list item component
const ExpandableItem = ({ title, icon: Icon, children, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          group flex w-full items-center justify-between rounded-lg p-2
          transition-all duration-200 ease-in-out
          ${level === 0 ? 'bg-white hover:bg-gray-50' : 'hover:bg-gray-50'}
        `}
        style={{ marginLeft: `${level * 1.5}rem` }}
      >
        <div className="flex items-center space-x-3">
          <AnimatedIcon icon={Icon} className="text-blue-500" />
          <span className="font-medium text-gray-700">{title}</span>
        </div>
        <ChevronRight 
          className={`
            h-5 w-5 transform transition-transform duration-200
            ${isExpanded ? 'rotate-90' : ''}
          `}
        />
      </button>
      
      <div className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        {children}
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon: Icon, trend }) => (
  <div className="group rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </p>
        )}
      </div>
      <AnimatedIcon 
        icon={Icon} 
        size={32}
        className="text-blue-500"
      />
    </div>
  </div>
);

const NestedLayout = () => {
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
              System Dashboard
            </span>
          </div>

          {navigationData.map(({ id, title, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`
                group mb-4 flex items-center rounded-lg p-2 transition-all duration-200
                ${activeSection === id ? 'bg-gray-800 scale-105' : 'hover:bg-gray-800 hover:scale-105'}
              `}
            >
              <AnimatedIcon icon={Icon} className="shrink-0 text-white" />
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard 
                title="Total Users"
                value="12,345"
                icon={Users}
                trend={8.2}
              />
              <MetricCard 
                title="Server Load"
                value="67%"
                icon={Cpu}
                trend={-2.4}
              />
              <MetricCard 
                title="Response Time"
                value="124ms"
                icon={Zap}
                trend={-12.3}
              />
              <MetricCard 
                title="Error Rate"
                value="0.08%"
                icon={Activity}
                trend={-3.8}
              />
            </div>
          </section>

          {/* Infrastructure Section */}
          <section id="infrastructure" className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold">Infrastructure</h2>
            <div className="rounded-lg bg-white shadow-lg p-6">
              <ExpandableItem title="Compute Resources" icon={Server}>
                <ExpandableItem title="Production Servers" icon={Cloud} level={1}>
                  <div className="space-y-2 pl-12 pt-2">
                    <ExpandableItem title="Load Balancers" icon={Network} level={2}>
                      <div className="pl-16 py-2 space-y-2">
                        <div className="flex items-center space-x-3">
                          <AnimatedIcon icon={Activity} size={16} className="text-green-500" />
                          <span className="text-gray-600">Primary LB - Active</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <AnimatedIcon icon={Activity} size={16} className="text-gray-400" />
                          <span className="text-gray-600">Secondary LB - Standby</span>
                        </div>
                      </div>
                    </ExpandableItem>
                    <ExpandableItem title="Application Servers" icon={Box} level={2}>
                      <div className="pl-16 py-2 space-y-2">
                        <div className="flex items-center space-x-3">
                          <AnimatedIcon icon={Cpu} size={16} className="text-green-500" />
                          <span className="text-gray-600">App Server 01 - Running</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <AnimatedIcon icon={Cpu} size={16} className="text-green-500" />
                          <span className="text-gray-600">App Server 02 - Running</span>
                        </div>
                      </div>
                    </ExpandableItem>
                  </div>
                </ExpandableItem>
                <ExpandableItem title="Database Clusters" icon={Database} level={1}>
                  <div className="pl-12 py-2 space-y-2">
                    <div className="flex items-center space-x-3">
                      <AnimatedIcon icon={Database} size={16} className="text-blue-500" />
                      <span className="text-gray-600">Primary Database</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AnimatedIcon icon={Database} size={16} className="text-gray-400" />
                      <span className="text-gray-600">Replica Database</span>
                    </div>
                  </div>
                </ExpandableItem>
              </ExpandableItem>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Security</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white shadow-lg p-6">
                <ExpandableItem title="Access Controls" icon={Lock}>
                  <div className="space-y-2 pl-8 pt-2">
                    <ExpandableItem title="User Permissions" icon={Users} level={1}>
                      <div className="pl-12 py-2 space-y-2">
                        <div className="flex items-center space-x-3">
                          <AnimatedIcon icon={Shield} size={16} className="text-green-500" />
                          <span className="text-gray-600">Admin Access</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <AnimatedIcon icon={Shield} size={16} className="text-blue-500" />
                          <span className="text-gray-600">User Access</span>
                        </div>
                      </div>
                    </ExpandableItem>
                    <ExpandableItem title="API Keys" icon={Key} level={1}>
                      <div className="pl-12 py-2 space-y-2">
                        <div className="flex items-center space-x-3">
                          <AnimatedIcon icon={Key} size={16} className="text-yellow-500" />
                          <span className="text-gray-600">Production Keys</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <AnimatedIcon icon={Key} size={16} className="text-gray-400" />
                          <span className="text-gray-600">Development Keys</span>
                        </div>
                      </div>
                    </ExpandableItem>
                  </div>
                </ExpandableItem>
              </div>

              <div className="rounded-lg bg-white shadow-lg p-6">
                <ExpandableItem title="Audit Logs" icon={FileText}>
                  <div className="space-y-2 pl-8 pt-2">
                    <div className="flex items-center space-x-3">
                      <AnimatedIcon icon={Eye} size={16} className="text-blue-500" />
                      <span className="text-gray-600">System Access Logs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AnimatedIcon icon={Bell} size={16} className="text-yellow-500" />
                      <span className="text-gray-600">Security Alerts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AnimatedIcon icon={Terminal} size={16} className="text-gray-500" />
                      <span className="text-gray-600">Command Logs</span>
                    </div>
                  </div>
                </ExpandableItem>
              </div>
            </div>
          </section>

          {/* Monitoring Section */}
          <section id="monitoring" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Monitoring</h2>
            <div className="rounded-lg bg-white shadow-lg p-6">
              <ExpandableItem title="System Metrics" icon={BarChart2}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">CPU Usage</h3>
                      <AnimatedIcon icon={Cpu} className="text-blue-500" />
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-2 w-3/4 bg-blue-500 rounded-full" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">75% Utilized</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Memory</h3>
                      <AnimatedIcon icon={Database} className="text-green-500" />
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-2 w-1/2 bg-green-500 rounded-full" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">50% Used</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Network</h3>
                      <AnimatedIcon icon={Activity} className="text-purple-500" />
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-2 w-1/4 bg-purple-500 rounded-full" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">25% Capacity</p>
                  </div>
                </div>
              </ExpandableItem>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NestedLayout;



