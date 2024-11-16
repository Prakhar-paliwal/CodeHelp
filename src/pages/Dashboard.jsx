import React from 'react';
import { CalendarDays, Activity, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, Kaitlyn!</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SummaryCard
          title="Today's tasks"
          description="You have 3 tasks due today"
          icon={<CalendarDays className="w-6 h-6 text-emerald-500" />}
        />
        <SummaryCard
          title="Recent activity"
          description="You have 2 uncompleted tasks"
          icon={<Activity className="w-6 h-6 text-blue-500" />}
        />
        <SummaryCard
          title="Your progress"
          description="You have completed 5% of your tasks this week"
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-[#1E1E1E] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              title="Completed Algorithm Visualization"
              time="2 hours ago"
              type="success"
            />
            <ActivityItem
              title="Added new task: Learn React Hooks"
              time="5 hours ago"
              type="info"
            />
            <ActivityItem
              title="Watched Python Tutorial"
              time="1 day ago"
              type="success"
            />
          </div>
        </section>

        <section className="bg-[#1E1E1E] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
          <div className="space-y-4">
            <ProgressBar title="React" progress={75} />
            <ProgressBar title="Python" progress={60} />
            <ProgressBar title="Algorithms" progress={40} />
          </div>
        </section>
      </div>
    </div>
  );
};

// SummaryCard component without TypeScript types
const SummaryCard = ({ title, description, icon }) => (
  <div className="bg-[#1E1E1E] rounded-lg p-6">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 mt-1">{description}</p>
      </div>
      {icon}
    </div>
  </div>
);

// ActivityItem component without TypeScript types
const ActivityItem = ({ title, time, type }) => (
  <div className="flex items-center space-x-3">
    <div className={`w-2 h-2 rounded-full ${
      type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
    }`} />
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-400">{time}</p>
    </div>
  </div>
);

// ProgressBar component without TypeScript types
const ProgressBar = ({ title, progress }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{title}</span>
      <span className="text-sm text-gray-400">{progress}%</span>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div
        className="bg-emerald-500 rounded-full h-2 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default Dashboard;