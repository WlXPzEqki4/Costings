import React, { useState } from 'react';
import { 
  FileText, Users, Settings, Bell, Calendar, Mail, Star, 
  Bookmark, Heart, Zap, Menu, Layout, Grid, Award, Home 
} from 'lucide-react';

// Navigation data structure
const navigationData = [
  { id: 'home', title: 'Home', icon: Home },
  { id: 'split', title: 'Split Layout', icon: Grid },
  { id: 'four-col', title: 'Four Column', icon: FileText },
  { id: 'masonry', title: 'Masonry', icon: Award },
  { id: 'dashboard', title: 'Dashboard', icon: Users },
  { id: 'featured', title: 'Featured', icon: Star }
];

const LayoutShowcase = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Function to scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Hover-expandable Sidebar - Now part of the flex layout */}
      <div className="group h-screen sticky top-0 bg-gray-900 text-white transition-all duration-300 ease-in-out w-16 hover:w-64">
        <nav className="flex h-full flex-col p-4">
          <div className="mb-8 flex items-center">
            <Menu className="h-8 w-8 shrink-0" />
            <span className="ml-4 overflow-hidden whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Layout Showcase
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

      {/* Main Content Area - Will be pushed by the sidebar */}
      <div className="flex-1">
        <div className="min-h-screen p-8">
          {/* Home Section */}
          <section id="home" className="mb-16">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h1 className="mb-6 text-3xl font-bold text-gray-900">Welcome to Layout Showcase</h1>
              <p className="mb-8 text-lg text-gray-600">
                Explore various layout patterns and responsive design implementations.
                Use the navigation menu on the left to browse different sections.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Layouts", value: "6+" },
                  { label: "Components", value: "20+" },
                  { label: "Responsive", value: "100%" },
                  { label: "Customizable", value: "Yes" }
                ].map(({ label, value }, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Split Layout Section */}
          <section id="split" className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Split Layout</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-semibold">Main Content</h3>
                  <p className="text-gray-600">
                    This section demonstrates a two-thirds split layout with a sidebar.
                    The main content area can contain various elements and nested grids.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-lg bg-white p-4 shadow-lg">
                      <h4 className="mb-2 font-medium">Content Block {item}</h4>
                      <p className="text-sm text-gray-600">
                        Nested grid items with consistent spacing and responsive behavior.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-semibold">Sidebar</h3>
                  <div className="space-y-4">
                    {['Analytics', 'Reports', 'Settings'].map((item) => (
                      <div key={item} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <span>{item}</span>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">New</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Four Column Grid Section */}
          <section id="four-col" className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Four Column Grid</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Mail, title: "Messages", content: "Short content example." },
                { icon: Calendar, title: "Calendar", content: "Medium length content that takes up a bit more space in the card." },
                { icon: Bell, title: "Notifications", content: "This card has more content to demonstrate flexible height adjustment while maintaining proper grid alignment." },
                { icon: Users, title: "Team", content: "Another content block with varying length." }
              ].map(({ icon: Icon, title, content }, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                  <Icon className="mb-4 h-6 w-6 text-gray-400" />
                  <h3 className="mb-2 font-semibold">{title}</h3>
                  <p className="text-sm text-gray-600">{content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Masonry Layout Section */}
          <section id="masonry" className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Masonry Layout</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Short Card", content: "Brief content example." },
                { title: "Medium Card", content: "This card contains a moderate amount of content to show varying heights." },
                { title: "Long Card", content: "This card has significantly more content to demonstrate how the layout handles large differences in content length. The grid maintains proper spacing and alignment despite these differences." },
                { title: "Another Short", content: "Another brief content example." },
                { title: "Extended Card", content: "This card contains multiple paragraphs of text to show how the layout handles extreme variations in content length. The grid system ensures proper spacing and alignment regardless of content size." },
                { title: "Medium Plus", content: "This card has enough content to be taller than the short cards but shorter than the long cards." }
              ].map(({ title, content }, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-4 font-semibold">{title}</h3>
                  <p className="text-gray-600">{content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Dashboard Layout Section */}
          <section id="dashboard" className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Dashboard Layout</h2>
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3 space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Total Users", value: "1,234", icon: Users },
                    { label: "Revenue", value: "$12,345", icon: Zap },
                    { label: "Active Projects", value: "42", icon: Star }
                  ].map(({ label, value, icon: Icon }, index) => (
                    <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">{label}</p>
                          <p className="text-xl font-semibold">{value}</p>
                        </div>
                        <Icon className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-start border-b pb-4 last:border-0">
                        <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">New Message</p>
                          <p className="text-sm text-gray-500">You received a new message from User {item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-semibold">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { text: "Create Report", icon: FileText },
                      { text: "Invite Team", icon: Users },
                      { text: "Update Profile", icon: Settings }
                    ].map(({ text, icon: Icon }, index) => (
                      <button
                        key={index}
                        className="flex w-full items-center rounded-lg p-2 text-left hover:bg-gray-50"
                      >
                        <Icon className="mr-3 h-4 w-4 text-gray-400" />
                        <span>{text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Content Section */}
          <section id="featured" className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Featured Content</h2>
            <div className="space-y-6">
              <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white shadow-lg">
                <h3 className="mb-4 text-2xl font-bold">Featured Section</h3>
                <p className="mb-6 max-w-2xl">
                  This is a prominent featured section with a gradient background. It spans the full width
                  and uses different styling to stand out from other content cards.
                </p>
                <button className="rounded-lg bg-white px-6 py-2 text-blue-600 shadow-sm hover:bg-gray-50">
                  Learn More
                </button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Heart, title: "Engagement", metric: "92%" },
                  { icon: Users, title: "Team Size", metric: "14" },
                  { icon: Bookmark, title: "Saved Items", metric: "238" }
                ].map(({ icon: Icon, title, metric }, index) => (
                  <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                    <Icon className="mb-4 h-6 w-6 text-gray-400" />
                    <h3 className="mb-2 font-semibold">{title}</h3>
                    <p className="text-2xl font-bold text-gray-800">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LayoutShowcase;