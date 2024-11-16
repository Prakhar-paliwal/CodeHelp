import React from 'react';
import { User, Mail, Bell, Moon } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>

      <div className="bg-[#1E1E1E] rounded-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gray-700 rounded-full mb-4 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">Jane Smith</h2>
          <p className="text-gray-400">jane.smith@example.com</p>
          <button className="mt-4 text-blue-500 hover:text-blue-400 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Account Settings */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#121212] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#121212] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="Smith"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-[#121212] border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="jane.smith@example.com"
              />
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-gray-400">Receive our weekly newsletter</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">New Feature Announcements</p>
                  <p className="text-sm text-gray-400">Stay updated with new features</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Theme Selection */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Theme Selection</h3>
          <div className="flex space-x-4">
            <button className="flex-1 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Light
            </button>
            <button className="flex-1 bg-[#121212] text-white px-4 py-2 rounded-md border border-gray-800">
              Dark
            </button>
            <button className="flex-1 bg-[#121212] text-white px-4 py-2 rounded-md border border-gray-800">
              System Default
            </button>
          </div>
        </section>

        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;