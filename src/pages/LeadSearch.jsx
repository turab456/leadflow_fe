import React, { useState } from 'react';
import { Plus, Search, Building2, Globe, Sparkles } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PageHeader from '../components/common/PageHeader';
import SearchFilters from '../components/leads/SearchFilters';
import LeadTable from '../components/leads/LeadTable';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import Modal from '../components/common/Modal';

const LeadSearch = ({ onViewLead }) => {
  const { outerLeads, addLead, globalSearch, setGlobalSearch, searchLeadsAPI } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const itemsPerPage = 5;

  React.useEffect(() => {
    if (!globalSearch?.trim()) return;

    const timer = setTimeout(() => {
      searchLeadsAPI({ q: globalSearch });
    }, 500);

    return () => clearTimeout(timer);
  }, [globalSearch]);

  // Filter Form State
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    size: '',
    scoreRange: '',
    websiteStatus: ''
  });

  // Manual Lead Input Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    industry: '',
    website: '',
    size: '11-50 employees',
    revenue: '$1M ARR',
    location: '',
    phone: '',
    email: '',
    dmName: '',
    dmRole: '',
    dmEmail: ''
  });

  const handleResetFilters = () => {
    setFilters({
      industry: '',
      location: '',
      size: '',
      scoreRange: '',
      websiteStatus: ''
    });
    setGlobalSearch('');
  };

  // Filter logic
  const filteredLeads = Array.isArray(outerLeads)
    ? outerLeads.filter((lead) => {
      const query = globalSearch?.toLowerCase().trim();

      if (!query) return true;

      return (
        lead?.name?.toLowerCase().includes(query) ||
        lead?.website?.toLowerCase().includes(query) ||
        lead?.location?.toLowerCase().includes(query) ||
        lead?.business_status?.toLowerCase().includes(query)
      );
    })
    : [];
  console.log(filteredLeads, "filteredLeads")

  // Pagination calculation
  const totalItems = filteredLeads.length;
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Form submission
  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.website || !newLeadForm.email) {
      alert("Please fill in all required fields (Name, Website, Email).");
      return;
    }

    // Call Context addLead
    const created = addLead({
      name: newLeadForm.name,
      industry: newLeadForm.industry || "SaaS & Software",
      website: newLeadForm.website,
      size: newLeadForm.size,
      revenue: newLeadForm.revenue,
      location: newLeadForm.location || "San Francisco, CA",
      phone: newLeadForm.phone || "+1 (555) 123-4567",
      email: newLeadForm.email,
      decisionMaker: {
        name: newLeadForm.dmName || "Jane Doe",
        role: newLeadForm.dmRole || "Growth Manager",
        email: newLeadForm.dmEmail || newLeadForm.email,
        linkedin: "linkedin.com/in/jane-doe"
      },
      leadScore: Math.floor(Math.random() * 40) + 55, // Random 55 - 95 score
    });

    // Reset Form & Close Modal
    setNewLeadForm({
      name: '',
      industry: '',
      website: '',
      size: '11-50 employees',
      revenue: '$1M ARR',
      location: '',
      phone: '',
      email: '',
      dmName: '',
      dmRole: '',
      dmEmail: ''
    });
    setShowAddModal(false);

    // Jump to the details of the newly created lead
    onViewLead(created.id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lead Discovery & Intelligence"
        description="Search global business databases, filter high-scoring opportunities, and run instant SEO or performance site audits."
      >
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Lead Manually
        </button>
      </PageHeader>

      {/* Filters bar */}
      {/* <SearchFilters 
        filters={filters} 
        setFilters={setFilters} 
        onReset={handleResetFilters} 
      /> */}

      {/* Results Title Section */}
      <div className="flex items-center justify-between pb-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Search Results ({totalItems} Businesses Found)        </p>
      </div>

      {/* Lead Table / Empty State */}
      {totalItems > 0 ? (
        <div className="space-y-4">
          <LeadTable leads={paginatedLeads} onLeadClick={onViewLead} />

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <EmptyState
          title="No business opportunities matched your search"
          description="Try broadening your criteria, changing locations, or searching for other industries."
          actionText="Clear All Filters"
          onAction={handleResetFilters}
        />
      )}

      {/* ADD LEAD MANUAL MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Target Business Opportunity"
        size="lg"
      >
        <form onSubmit={handleCreateLead} className="space-y-6 text-slate-800 text-xs font-medium">
          {/* Section 1: Business Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">1. Company Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Website Domain *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. acme.com"
                  value={newLeadForm.website}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, website: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Industry</label>
                <input
                  type="text"
                  placeholder="e.g. SaaS & Software"
                  value={newLeadForm.industry}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, industry: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Austin, TX"
                  value={newLeadForm.location}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, location: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Size</label>
                <select
                  value={newLeadForm.size}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, size: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-200 employees">51-200 employees</option>
                  <option value="201-500 employees">201-500 employees</option>
                  <option value="500+ employees">500+ employees</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Estimated Revenue</label>
                <input
                  type="text"
                  placeholder="e.g. $5M ARR"
                  value={newLeadForm.revenue}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, revenue: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">2. Contact & Decision Maker</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Decision Maker Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Miller"
                  value={newLeadForm.dmName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, dmName: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Role</label>
                <input
                  type="text"
                  placeholder="e.g. Operations Director"
                  value={newLeadForm.dmRole}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, dmRole: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Contact Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@acme.com"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +1 (555) 765-4321"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand text-white hover:bg-brand-dark rounded-lg shadow-sm transition-colors"
            >
              Save Opportunity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LeadSearch;
