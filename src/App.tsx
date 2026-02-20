/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Bell, 
  TrendingUp, 
  Calendar, 
  MoreHorizontal,
  ChevronRight,
  Filter,
  Activity,
  UserPlus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MOCK_STAFF, MOCK_ANNOUNCEMENTS, ATTENDANCE_DATA } from './constants';
import { StaffStatus, StaffMember } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const filteredStaff = useMemo(() => {
    return MOCK_STAFF.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           member.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = filterDept === 'All' || member.department === filterDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, filterDept]);

  const departments = ['All', ...new Set(MOCK_STAFF.map(s => s.department))];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-black flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-lg tracking-tighter uppercase">Nexus Staff OS</h1>
            <p className="text-[10px] opacity-50 font-mono">v2.4.0 // SYSTEM_STABLE</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="SEARCH_PERSONNEL..."
              className="bg-black/5 border border-black/10 rounded-none py-2 pl-10 pr-4 font-mono text-xs focus:outline-none focus:border-black w-64 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="relative p-2 hover:bg-black/5 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-black/10">
            <div className="text-right">
              <p className="text-xs font-bold">ADMIN_ROOT</p>
              <p className="text-[10px] opacity-50 font-mono">ID: 0x7F2A</p>
            </div>
            <div className="w-8 h-8 bg-black/10 rounded-full border border-black/20"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-12 gap-6">
        {/* Left Column: Stats & Charts */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              label="TOTAL_STAFF" 
              value={MOCK_STAFF.length.toString()} 
              icon={<Users className="w-4 h-4" />} 
              trend="+2 this month"
            />
            <StatCard 
              label="ACTIVE_NOW" 
              value={MOCK_STAFF.filter(s => s.status === StaffStatus.ACTIVE).length.toString()} 
              icon={<Activity className="w-4 h-4 text-emerald-500" />} 
              trend="84% capacity"
            />
          </div>

          {/* Attendance Chart */}
          <div className="bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-mono text-xs font-bold uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Attendance_Metrics
              </h3>
              <select className="text-[10px] font-mono bg-transparent border-none focus:ring-0 cursor-pointer uppercase">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ATTENDANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontFamily: 'var(--font-mono)' }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#141414', 
                      border: 'none', 
                      borderRadius: '0px',
                      color: '#E4E3E0',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px'
                    }}
                    itemStyle={{ color: '#E4E3E0' }}
                  />
                  <Bar dataKey="present" fill="#141414" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="away" fill="#999" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-mono text-xs font-bold uppercase mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              System_Broadcasts
            </h3>
            <div className="space-y-4">
              {MOCK_ANNOUNCEMENTS.map(announcement => (
                <div key={announcement.id} className="border-l-2 border-black pl-4 py-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "text-[9px] font-mono px-1.5 py-0.5 uppercase",
                      announcement.priority === 'high' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {announcement.priority}
                    </span>
                    <span className="text-[9px] font-mono opacity-40">{announcement.date}</span>
                  </div>
                  <h4 className="text-xs font-bold mb-1">{announcement.title}</h4>
                  <p className="text-[11px] opacity-60 leading-relaxed">{announcement.content}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-black text-[10px] font-mono uppercase hover:bg-black hover:text-white transition-colors">
              View All Broadcasts
            </button>
          </div>
        </div>

        {/* Right Column: Staff List */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
            <div className="p-6 border-b border-black flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-mono text-sm font-bold uppercase">Personnel_Registry</h2>
                <div className="flex gap-1">
                  {departments.map(dept => (
                    <button 
                      key={dept}
                      onClick={() => setFilterDept(dept)}
                      className={cn(
                        "text-[10px] font-mono px-2 py-1 border transition-colors",
                        filterDept === dept ? "bg-black text-white border-black" : "border-black/10 hover:border-black"
                      )}
                    >
                      {dept.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-mono uppercase hover:bg-black/80 transition-colors">
                <UserPlus className="w-4 h-4" />
                Add_Staff
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="data-grid-header">
                    <th className="px-6 py-3 font-normal">Name & Role</th>
                    <th className="px-6 py-3 font-normal">Department</th>
                    <th className="px-6 py-3 font-normal">Status</th>
                    <th className="px-6 py-3 font-normal">Performance</th>
                    <th className="px-6 py-3 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredStaff.map(member => (
                    <tr key={member.id} className="data-row group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center font-mono text-xs border border-black/10 group-hover:border-white/20">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold leading-none mb-1">{member.name}</p>
                            <p className="text-[10px] opacity-50 font-mono">{member.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-mono uppercase bg-black/5 px-2 py-1 rounded-sm group-hover:bg-white/10">
                          {member.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "status-indicator",
                            member.status === StaffStatus.ACTIVE && "status-active",
                            member.status === StaffStatus.AWAY && "status-away",
                            member.status === StaffStatus.ON_LEAVE && "status-leave",
                            member.status === StaffStatus.OFFLINE && "status-offline",
                          )} />
                          <span className="text-[10px] font-mono uppercase">{member.status}</span>
                        </div>
                        <p className="text-[9px] opacity-40 font-mono ml-4">{member.lastActive}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden w-24 group-hover:bg-white/10">
                            <div 
                              className="h-full bg-black group-hover:bg-white transition-all duration-500" 
                              style={{ width: `${member.performance}%` }}
                            />
                          </div>
                          <span className="data-value text-xs font-bold">{member.performance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 hover:bg-black/10 rounded-sm transition-colors group-hover:hover:bg-white/20">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-black/10 flex items-center justify-between bg-black/5">
              <p className="text-[10px] font-mono opacity-50">Showing {filteredStaff.length} of {MOCK_STAFF.length} entries</p>
              <div className="flex gap-2">
                <button className="p-1 border border-black/10 hover:border-black transition-colors"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                <button className="p-1 border border-black/10 hover:border-black transition-colors"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-black flex items-center justify-between text-[10px] font-mono opacity-40">
        <div className="flex gap-6">
          <span>SYSTEM_TIME: {new Date().toISOString()}</span>
          <span>LATENCY: 12ms</span>
          <span>UPTIME: 99.98%</span>
        </div>
        <div>
          © 2026 NEXUS_TECHNOLOGIES // ALL_RIGHTS_RESERVED
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: { label: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white border border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] font-bold uppercase opacity-50">{label}</span>
        {icon}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-mono font-bold tracking-tighter">{value}</span>
        <span className="text-[9px] font-mono text-emerald-600">{trend}</span>
      </div>
    </div>
  );
}
