import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';
import { 
  TrendingUp, 
  Mail, 
  Globe, 
  Users, 
  Zap,
  BarChart3,
  Award
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { 
  mockLeadSourceDistribution, 
  mockConversionFunnel, 
  mockIndustryPerformance, 
  mockLeadScoreDistribution,
  mockCampaignPerformance
} from '../data/mockData';

const COLORS = ['#2563eb', '#64748b', '#10b981', '#f59e0b'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Executive Analytics" 
        description="Review high-level metrics on conversion funnels, channels source, email campaigns delivery, and industry vertical responses."
      />

      {/* Analytics stats banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-subtle flex items-center gap-3">
          <div className="p-3 bg-brand/10 text-brand rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Qualified Leads</span>
            <span className="text-xl font-bold text-slate-800">486</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-subtle flex items-center gap-3">
          <div className="p-3 bg-success/10 text-success-dark rounded-lg">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Avg SEO Audit Score</span>
            <span className="text-xl font-bold text-slate-800">82.4</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-subtle flex items-center gap-3">
          <div className="p-3 bg-warning/10 text-warning-dark rounded-lg">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Average Open Rate</span>
            <span className="text-xl font-bold text-slate-800">62.8%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-subtle flex items-center gap-3">
          <div className="p-3 bg-slate-900 text-white rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Conversion Rate</span>
            <span className="text-xl font-bold text-slate-800">24.8%</span>
          </div>
        </div>
      </div>

      {/* Row 1: Source Pie & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-4">Lead Source Distribution</h3>
            <div className="h-[240px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockLeadSourceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockLeadSourceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Funnel chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-4">Sales & Qualification Funnel</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="yaml" // Horizontal layout simulated by swapping keys
                data={mockConversionFunnel}
                margin={{ top: 10, right: 10, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                {/* Switch axis type for horizontal rendering */}
                <XAxis type="number" tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis dataKey="stage" type="category" tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }} />
                <Tooltip />
                <Bar dataKey="count" name="Opportunities" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Campaign Open Rate / Reply Rate Trends & Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign lines */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-4">Outreach Conversion Channels</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockCampaignPerformance}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="opened" stroke="#2563eb" name="Opens" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="replied" stroke="#10b981" name="Replies" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-4">Lead Score Distribution</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockLeadScoreDistribution}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="scoreRange" tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" name="Opportunities Count" fill="#64748b" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Industry Performance Details Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-subtle overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/75">
          <h3 className="text-sm font-bold text-slate-800">Industry Performance Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="px-6 py-3.5">Industry Segment</th>
                <th className="px-6 py-3.5">Discovered Count</th>
                <th className="px-6 py-3.5">Response Rate</th>
                <th className="px-6 py-3.5">Outreach Performance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-600">
              {mockIndustryPerformance.map((ind) => {
                const isGood = parseFloat(ind.response) >= 20;
                return (
                  <tr key={ind.industry} className="hover:bg-slate-50/20">
                    <td className="px-6 py-3.5 font-semibold text-slate-800">{ind.industry}</td>
                    <td className="px-6 py-3.5">{ind.count}</td>
                    <td className="px-6 py-3.5 font-bold text-slate-700">{ind.response}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isGood ? 'bg-success/10 text-success-dark border border-success/20' : 'bg-warning/10 text-warning-dark border border-warning/20'
                      }`}>
                        {isGood ? 'High conversion' : 'Medium response'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
