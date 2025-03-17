import React, { useState } from 'react';
import { Home, FileText, Settings, Menu, Users } from 'lucide-react';

const navigationData = [
  { id: 'home', title: 'Home', icon: Home },
  { id: 'documents', title: 'Documents', icon: FileText },
  { id: 'users', title: 'Users', icon: Users },
  { id: 'settings', title: 'Settings', icon: Settings },
];

const App = () => {
  const [activeItem, setActiveItem] = useState('home');

  // Helper function to render the active content
  const renderContent = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Full-width welcome section */}
            <section className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600">
                This is your dashboard home page. Here's an overview of your recent activity.
                The content in this section will expand horizontally to fill the available space,
                and grow vertically based on content length.
              </p>
            </section>

            {/* Three column grid section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Revenue Metrics",
                  content: [
                    "Monthly revenue: $52,000",
                    "Year to date: $284,000",
                    "Projected Q4: $180,000",
                    "This is a longer bullet point to demonstrate how the card height adjusts automatically based on content length"
                  ]
                },
                {
                  title: "User Statistics",
                  content: [
                    "Active users: 2,841",
                    "New signups this week: 180",
                    "Churned accounts: 24"
                  ]
                },
                {
                  title: "System Status",
                  content: [
                    "Server uptime: 99.9%",
                    "Average response time: 145ms",
                    "Active background jobs: 12"
                  ]
                }
              ].map((card, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">{card.title}</h3>
                  <ul className="space-y-3 text-gray-600">
                    {card.content.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Two column section */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-4 text-lg font-medium text-gray-800">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Document Updated</p>
                        <p className="text-sm text-gray-500">Project proposal v{item} was modified</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-4 text-lg font-medium text-gray-800">Upcoming Tasks</h3>
                <div className="space-y-4">
                  {['Review team reports', 'Update documentation', 'Schedule planning meeting'].map((task, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded border border-gray-300"></div>
                        <span className="ml-3 text-gray-600">{task}</span>
                      </div>
                      <span className="text-sm text-gray-500">Tomorrow</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <section className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Documents</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((doc) => (
                  <div key={doc} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center">
                      <FileText className="mr-4 h-6 w-6 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-800">Document {doc}</h3>
                        <p className="text-sm text-gray-500">Last modified: 2 days ago</p>
                      </div>
                    </div>
                    <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <section className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[1, 2, 3].map((user) => (
                      <tr key={user}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"></div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">User {user}</div>
                              <div className="text-sm text-gray-500">user{user}@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">Member</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <section className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Settings</h2>
              <div className="space-y-4">
                {['Profile', 'Notifications', 'Security'].map((setting) => (
                  <div key={setting} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{setting}</h3>
                        <p className="text-sm text-gray-500">Manage your {setting.toLowerCase()} settings</p>
                      </div>
                      <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with hover effect */}
      <div 
        className="group relative h-full bg-gray-900 text-white transition-all duration-300 ease-in-out w-16 hover:w-64"
      >
        {/* Navigation Items */}
        <nav className="flex h-full flex-col p-4">
          <div className="mb-8 flex items-center">
            <Menu className="h-8 w-8 shrink-0" />
            <span className="ml-4 overflow-hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Dashboard
            </span>
          </div>

          {navigationData.map(({ id, title, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveItem(id)}
              className={`
                mb-4 flex items-center rounded-lg p-2 transition-colors
                ${activeItem === id ? 'bg-gray-800' : 'hover:bg-gray-800'}
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
      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 shadow">
          <h1 className="text-2xl font-semibold text-gray-800">
            {navigationData.find(item => item.id === activeItem)?.title}
          </h1>
        </header>
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;




