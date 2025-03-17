import React from 'react';
import { FileText, Users, Settings, Bell, Calendar, Mail, Star, Bookmark, Heart, Zap } from 'lucide-react';

const LayoutShowcase = () => {
  return (
    <div className="space-y-16 p-6">
      {/* Section 1: Hero with Three Cards
          - Full-width hero section
          - Three equal-width cards below
          - Stacks vertically on mobile */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">1. Hero with Three Cards</h2>
        <div className="rounded-lg bg-white p-8 shadow">
          <h3 className="mb-4 text-2xl font-bold">Welcome to Dashboard</h3>
          <p className="max-w-3xl text-gray-600">
            This is a full-width hero section that spans the entire container. The text wraps naturally
            and the container height adjusts automatically based on content length.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Analytics", icon: Star, color: "blue" },
            { title: "Reports", icon: FileText, color: "green" },
            { title: "Settings", icon: Settings, color: "purple" },
          ].map(({ title, icon: Icon, color }, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow">
              <div className={`mb-4 inline-block rounded-full bg-${color}-100 p-3 text-${color}-600`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">
                This card adjusts its height based on content. Try adding more text to see how it affects the layout.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Two-Column Split with Nested Grid
          - Left column: 2/3 width
          - Right column: 1/3 width
          - Nested grid in left column
          - Stacks vertically on mobile */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">2. Two-Column Split with Nested Grid</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold">Main Content Area</h3>
              <p className="text-gray-600">
                This section takes up 2/3 of the width on large screens. Below this text is a nested grid.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-lg bg-white p-4 shadow">
                  <h4 className="mb-2 font-medium">Nested Item {item}</h4>
                  <p className="text-sm text-gray-600">
                    These items form a nested grid within the main left column.
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold">Sidebar</h3>
              <div className="space-y-4">
                {['Updates', 'Messages', 'Tasks'].map((item) => (
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

      {/* Section 3: Four-Column Grid with Varying Heights
          - Four equal columns on large screens
          - Two columns on medium screens
          - Single column on mobile
          - Cards with different content lengths */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">3. Four-Column Grid with Varying Heights</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Mail, title: "Messages", content: "Short content." },
            { icon: Calendar, title: "Calendar", content: "Medium length content that takes up a bit more space in the card." },
            { icon: Bell, title: "Notifications", content: "Very long content that will definitely make this card taller than the others. This demonstrates how cards in the same row can have different heights while maintaining proper alignment." },
            { icon: Users, title: "Team", content: "Another medium length piece of content." }
          ].map(({ icon: Icon, title, content }, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow">
              <Icon className="mb-4 h-6 w-6 text-gray-400" />
              <h3 className="mb-2 font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Masonry-style Layout
          - Three columns on large screens
          - Two columns on medium screens
          - Single column on mobile
          - Cards with significantly varying heights */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">4. Masonry-style Layout</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Short Card", content: "Minimal content here." },
            { title: "Medium Card", content: "This card has a moderate amount of content that takes up more vertical space than the first card." },
            { title: "Long Card", content: "This card has significantly more content to demonstrate varying heights. It contains multiple paragraphs of text to show how the layout handles large differences in content length. The grid maintains proper spacing and alignment despite these differences." },
            { title: "Another Short Card", content: "Brief content." },
            { title: "Very Long Card", content: "This card contains a lot of content to really push the height differences. It includes multiple paragraphs to show how the layout handles extreme variations in content length. The grid system ensures proper spacing and alignment regardless of content size. This helps demonstrate the flexibility of the layout system." },
            { title: "Medium Card", content: "This card has enough content to be taller than the short cards but shorter than the long cards." }
          ].map(({ title, content }, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-semibold">{title}</h3>
              <p className="text-gray-600">{content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Complex Dashboard Layout
          - Main content area with sidebar
          - Multiple nested grids
          - Mixed content types */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">5. Complex Dashboard Layout</h2>
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Stats Row */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Total Users", value: "1,234", icon: Users },
                { label: "Revenue", value: "$12,345", icon: Zap },
                { label: "Active Projects", value: "42", icon: Star }
              ].map(({ label, value, icon: Icon }, index) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow">
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

            {/* Main Card */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
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

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
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

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold">Recent Files</h3>
              <div className="space-y-3">
                {['Document.pdf', 'Image.png', 'Report.doc'].map((file) => (
                  <div key={file} className="flex items-center justify-between">
                    <span className="text-sm">{file}</span>
                    <button className="text-blue-600 hover:text-blue-700">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Featured Content Layout
          - Large feature card
          - Supporting content in grid
          - Responsive column counts */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">6. Featured Content Layout</h2>
        <div className="space-y-6">
          {/* Featured Card */}
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white shadow">
            <h3 className="mb-4 text-2xl font-bold">Featured Content</h3>
            <p className="mb-6 max-w-2xl">
              This is a prominent featured section with a gradient background. It spans the full width
              and uses different styling to stand out from other content cards.
            </p>
            <button className="rounded-lg bg-white px-6 py-2 text-blue-600 shadow-sm hover:bg-gray-50">
              Learn More
            </button>
          </div>

          {/* Supporting Content Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Heart, title: "Engagement", metric: "92%" },
              { icon: Users, title: "Team Size", metric: "14" },
              { icon: Bookmark, title: "Saved Items", metric: "238" }
            ].map(({ icon: Icon, title, metric }, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow">
                <Icon className="mb-4 h-6 w-6 text-gray-400" />
                <h3 className="mb-2 font-semibold">{title}</h3>
                <p className="text-2xl font-bold text-gray-800">{metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LayoutShowcase;