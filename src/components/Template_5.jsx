import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Users, Settings, Bell, Calendar, Mail, Star, 
  Bookmark, Heart, Zap, Menu, Layout, Grid, Award, Home,
  ChevronDown, ChevronUp, Plus, Minus, X, Eye, Target
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
  { id: 'cards', title: 'Animated Cards', icon: Grid },
  { id: 'dashboard', title: 'Interactive Dashboard', icon: Layout },
  { id: 'stats', title: 'Statistics', icon: Award },
];

const AnimatedCard = ({ children, delay = 0, direction = 'bottom' }) => {
  const cardRef = useRef(null);
  const isVisible = useOnScreen(cardRef, '-50px');
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible]);

  const getInitialStyles = () => {
    switch (direction) {
      case 'left':
        return 'translate-x-[-100%] opacity-0';
      case 'right':
        return 'translate-x-[100%] opacity-0';
      case 'bottom':
        return 'translate-y-[50px] opacity-0';
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`
        transform transition-all duration-700 ease-out
        ${hasAnimated ? 'translate-x-0 translate-y-0 opacity-100' : getInitialStyles()}
        ${isExpanded ? 'md:col-span-2 lg:col-span-2' : ''}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const cardRef = useRef(null);
  const isVisible = useOnScreen(cardRef);
  
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
      ref={cardRef}
      className={`rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 bg-${color}-50`}
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

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('auto');

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight + 'px' : '0');
    }
  }, [isOpen]);

  return (
    <div className="rounded-lg bg-white shadow-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      <div
        ref={contentRef}
        style={{ height: contentHeight }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div className="p-6">
          {children}
        </div>
      </div>
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
            <AnimatedCard direction="bottom">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Interactive Layout Showcase</h1>
                <p className="text-lg text-gray-600">
                  Explore our collection of animated and interactive components.
                  Hover, click, and scroll to see various animations in action.
                </p>
              </div>
            </AnimatedCard>
          </section>

          {/* Animated Cards Section */}
          <section id="cards" className="mb-16 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Animated Cards</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { direction: 'left', delay: 0, title: 'Slide from Left' },
                { direction: 'bottom', delay: 200, title: 'Slide from Bottom' },
                { direction: 'right', delay: 400, title: 'Slide from Right' },
              ].map(({ direction, delay, title }, index) => (
                <AnimatedCard key={index} direction={direction} delay={delay}>
                  <h3 className="text-xl font-semibold mb-4">{title}</h3>
                  <p className="text-gray-600">
                    This card animates in from the {direction}. Click the plus icon
                    to expand this card and see more content.
                  </p>
                  <div className="mt-4 space-y-2 overflow-hidden transition-all duration-300">
                    <p className="text-gray-500">Additional content that appears when expanded...</p>
                    <p className="text-gray-500">Try hovering and clicking different elements!</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </section>

          {/* Interactive Dashboard Section */}
          <section id="dashboard" className="mb-16 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Interactive Dashboard</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CollapsibleSection title="Recent Activity">
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <AnimatedCard key={item} delay={item * 200}>
                        <div className="flex items-center space-x-4">
                          <div className="rounded-full bg-blue-100 p-3">
                            <Mail className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">New Message {item}</h4>
                            <p className="text-sm text-gray-500">
                              This is an interactive message card that slides in
                            </p>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>
              <div>
                <CollapsibleSection title="Quick Stats">
                  <div className="space-y-4">
                    {[
                      { label: 'Total Views', value: '1234', icon: Eye, color: 'blue' },
                      { label: 'Conversions', value: '56%', icon: Target, color: 'green' },
                      { label: 'Active Users', value: '789', icon: Users, color: 'purple' }
                    ].map((stat, index) => (
                      <AnimatedCard key={index} delay={index * 200}>
                        <StatCard {...stat} />
                      </AnimatedCard>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>
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
                <AnimatedCard key={index} delay={index * 100}>
                  <StatCard {...stat} />
                </AnimatedCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LayoutShowcase;