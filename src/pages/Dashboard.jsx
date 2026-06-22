import React from 'react';
import { 
  Users, 
  Bookmark, 
  Globe, 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  Activity, 
  Building2,
  ChevronRight,
  ExternalLink,
  Lock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useApp } from '../contexts/AppContext';
import { mockLeadGrowth, mockCampaignPerformance, mockIndustries } from '../data/mockData';
import KPICard from '../components/common/KPICard';

const Dashboard = ({ setCurrentTab }) => {
  const { kpis, activities, leads, campaigns } = useApp();

  // Get latest 3 discovered leads
  const latestLeads = leads.slice(0, 3);

  // Industry aggregations
  const getIndustryDistribution = () => {
    const counts = {};
    leads.forEach(l => {
      counts[l.industry] = (counts[l.industry] || 0) + 1;
    });
    return Object.keys(counts).map(ind => ({
      name: ind,
      count: counts[ind],
      percentage: Math.round((counts[ind] / leads.length) * 100)
    })).sort((a, b) => b.count - a.count).slice(0, 4);
  };

  const topIndustries = getIndustryDistribution();

  // Campaign statuses
  const activeCampaigns = campaigns?.filter(c => c.status === 'Running').length;
  const draftCampaigns = campaigns?.filter(c => c.status === 'Draft').length;
  const completedCampaigns = campaigns?.filter(c => c.status === 'Completed').length;

  const getActivityIcon = (type) => {
    switch (type) {
      case 'audit':
        return <Globe className="w-3.5 h-3.5 text-success-dark" />;
      case 'campaign':
        return <Mail className="w-3.5 h-3.5 text-brand" />;
      case 'lead':
        return <Users className="w-3.5 h-3.5 text-warning-dark" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getActivityBg = (type) => {
    switch (type) {
      case 'audit':
        return 'bg-success/10';
      case 'campaign':
        return 'bg-brand/10';
      case 'lead':
        return 'bg-warning/10';
      default:
        return 'bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-slate-900 rounded-2xl text-white shadow-md">
        <div>
          <h2 className="text-xl font-bold font-sans">Welcome Back, Alex Rivera!</h2>
          <p className="text-slate-400 text-xs mt-1 font-normal">Monitor your sales pipelines, website audit metrics, and email outreach campaign status.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <button 
            onClick={() => setCurrentTab('search')}
            className="px-4 py-2 text-xs font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg shadow-sm transition-colors"
          >
            Find Leads
          </button>
          <button 
            onClick={() => setCurrentTab('audits')}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            Audit Website
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div id="tour-kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard 
          title="Total Leads" 
          value={kpis.totalLeads} 
          change={12.4} 
          isPositive={true} 
          icon={Users} 
        />
        <KPICard 
          title="Saved Leads" 
          value={kpis.savedLeads} 
          change={8.2} 
          isPositive={true} 
          icon={Bookmark} 
        />
        <KPICard 
          title="Audits Completed" 
          value={kpis.auditsCompleted} 
          change={15.0} 
          isPositive={true} 
          icon={Globe} 
        />
        <KPICard 
          title="Campaigns Sent" 
          value={kpis.campaignsSent} 
          change={4.8} 
          isPositive={true} 
          icon={Mail} 
          isLocked={true}
        />
        <KPICard 
          title="Response Rate" 
          value={kpis.responseRate} 
          change={2.1} 
          isPositive={false} 
          icon={MessageSquare} 
          suffix="%"
          isLocked={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Growth Trend Chart */}
        <div className="lg:col-span-2 p-6 bg-white border border-slate-200 rounded-xl shadow-subtle flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Lead & Audit Trends</h3>
              <p className="text-slate-400 text-[11px] font-normal">Monthly lead acquisition and completed technical reports</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-success-dark">
              <TrendingUp className="w-3.5 h-3.5" />
              +24% Growth
            </span>
          </div>
          <div className="mt-6 flex-1 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockLeadGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAudits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="leads" name="Leads Found" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="audits" name="Audits Done" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAudits)" />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Summary Widget */}
        <div className="relative overflow-hidden p-6 bg-white border border-slate-200 rounded-xl shadow-subtle flex flex-col justify-between">
          {/* Lock Overlay */}
          <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 z-20">
            <div className="p-2.5 bg-slate-900 text-white rounded-xl mb-3 shadow-md">
              <Lock className="w-5 h-5 text-brand" />
            </div>
            <p className="text-xs font-bold text-slate-800">Campaigns Coming Soon</p>
            <p className="text-[10px] text-slate-400 max-w-[200px] mt-1 font-normal leading-normal">
              Activate automated outreach sequences to target your saved lists.
            </p>
            <button 
              onClick={() => setCurrentTab('campaigns')}
              className="mt-4 px-4 py-1.5 bg-brand hover:bg-brand-dark text-white font-bold text-[10px] rounded-lg shadow-sm transition-colors"
            >
              Get Beta Access
            </button>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100">Campaign Overview</h3>
            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="text-center py-4 rounded-lg bg-slate-50 border border-slate-100">
                <span className="block text-xl font-bold text-slate-800">{activeCampaigns}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Active</span>
              </div>
              <div className="text-center py-4 rounded-lg bg-slate-50 border border-slate-100">
                <span className="block text-xl font-bold text-slate-800">{draftCampaigns}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Drafts</span>
              </div>
              <div className="text-center py-4 rounded-lg bg-slate-50 border border-slate-100">
                <span className="block text-xl font-bold text-slate-800">{completedCampaigns}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Done</span>
              </div>
            </div>
            
            {/* Quick action outreach stats */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversion Stats</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Average Email Open Rate</span>
                  <span className="font-semibold text-slate-700">62.8%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-brand h-full rounded-full" style={{ width: '62.8%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Average Reply Rate</span>
                  <span className="font-semibold text-slate-700">24.8%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-success h-full rounded-full" style={{ width: '24.8%' }} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentTab('campaigns')}
            className="w-full mt-6 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            Create Outreach Campaign
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Campaign Performance Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Metrics */}
        <div className="relative overflow-hidden lg:col-span-2 p-6 bg-white border border-slate-200 rounded-xl shadow-subtle">
          {/* Lock Overlay */}
          <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 z-20">
            <div className="p-2.5 bg-slate-900 text-white rounded-xl mb-3 shadow-md">
              <Lock className="w-5 h-5 text-brand" />
            </div>
            <p className="text-sm font-bold text-slate-800">Advanced Outreach Metrics</p>
            <p className="text-xs text-slate-400 max-w-sm mt-1 font-normal leading-normal">
              Track open rates, click tracking, bounce detection, and positive response funnels in real-time once campaigns are active.
            </p>
            <button 
              onClick={() => setCurrentTab('campaigns')}
              className="mt-4 px-4 py-1.5 bg-brand hover:bg-brand-dark text-white font-bold text-[10px] rounded-lg shadow-sm transition-colors"
            >
              Learn More
            </button>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Campaign Outreach Metrics</h3>
              <p className="text-slate-400 text-[11px] font-normal">Sent, Opened and Replied breakdowns by category</p>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCampaignPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="sent" name="Emails Sent" fill="#475569" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="opened" name="Opened" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="replied" name="Replied" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Industries Widget */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-subtle">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5">Top Target Industries</h3>
          <div className="space-y-4">
            {topIndustries.map((ind, index) => (
              <div key={ind.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 flex items-center justify-center bg-slate-100 text-slate-500 rounded-md font-bold text-[10px]">
                      {index + 1}
                    </span>
                    {ind.name}
                  </span>
                  <span className="text-slate-500">{ind.count} leads ({ind.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-700 h-full rounded-full" style={{ width: `${ind.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Row: Latest Leads and Recent Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Leads Discovered */}
        <div className="lg:col-span-2 p-6 bg-white border border-slate-200 rounded-xl shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Latest Opportunities</h3>
                <p className="text-slate-400 text-[11px] font-normal">Newly identified businesses requesting outreach</p>
              </div>
              <button
                onClick={() => setCurrentTab('search')}
                className="text-xs font-bold text-brand hover:underline flex items-center gap-0.5"
              >
                View Search
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="space-y-3.5">
              {latestLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{lead.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">{lead.industry}</span>
                      <span className="text-[10px] text-slate-300">&bull;</span>
                      <span className="text-[10px] text-slate-400">{lead.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand/5 border border-brand/10 text-brand">
                        Score {lead.leadScore}
                      </span>
                    </div>
                    <a 
                      href={`https://${lead.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline Widget */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5">Activity Timeline</h3>
            <div className="relative pl-6 space-y-5 before:absolute before:left-[11px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-slate-200">
              {activities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="relative">
                  {/* Point circle */}
                  <span className={`absolute -left-8 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-white ring-4 ring-white ${getActivityBg(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </span>
                  
                  <div className="text-xs">
                    <p className="font-semibold text-slate-700 leading-snug">{activity.text}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-normal">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
