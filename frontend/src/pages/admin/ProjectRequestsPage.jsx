import React, { useState, useEffect } from 'react';
import { getProjectRequests, deleteProjectRequest, updateProjectRequestStatus } from '../../api/index.js';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';

const STATUSES = ['Pending', 'Accepted', 'Initiated', 'Processing', 'Completed', 'Declined'];

const STATUS_COLORS = {
  Pending: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  Accepted: 'text-teal border-teal/30 bg-teal/10',
  Initiated: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  Processing: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  Completed: 'text-green-400 border-green-400/30 bg-green-400/10',
  Declined: 'text-red-400 border-red-400/30 bg-red-400/10',
};

const ProjectRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectRequests()
      .then(({ data }) => setRequests(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await updateProjectRequestStatus(id, status);
      setRequests((prev) => prev.map((r) => (r._id === id ? data : r)));
    } catch {}
  };

  const del = async (id) => {
    if (!window.confirm('Delete this request?')) return;
    try {
      await deleteProjectRequest(id);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch {}
  };

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold mb-1">Project Requests</h1>
        <p className="text-light/40 text-sm">Inquiries submitted through the Let's Talk form.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-medium animate-pulse h-28 border border-light/5" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-24 text-light/30">
          <div className="text-5xl mb-4 font-thin">--</div>
          <p>No project requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r._id} className="bg-medium border border-light/5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="font-bold text-lg">{r.name}</h3>
                    <span className="text-xs bg-teal/10 text-teal px-3 py-1 font-bold uppercase tracking-widest">
                      {r.projectType === 'only-documentation' ? 'Only Documentation' : 'Project with Documentation'}
                    </span>
                    <select
                      value={r.status || 'Pending'}
                      onChange={(e) => updateStatus(r._id, e.target.value)}
                      className={`text-xs font-bold uppercase tracking-widest px-3 py-1 border appearance-none cursor-pointer outline-none ${STATUS_COLORS[r.status] || STATUS_COLORS.Pending}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-medium">{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="text-light/60">
                      <span className="text-light/30">College:</span> {r.college}
                    </div>
                    <div className="text-light/60">
                      <span className="text-light/30">Course:</span> {r.course}
                    </div>
                    <div className="text-light/60 flex items-center gap-1.5">
                      <Mail size={13} className="text-light/20" /> {r.email}
                    </div>
                    <div className="text-light/60 flex items-center gap-1.5">
                      <Phone size={13} className="text-light/20" /> {r.mobile}
                    </div>
                  </div>

                  {(r.chooseProject || r.ownProjectTopic) && (
                    <div className="mt-3 text-sm">
                      {r.chooseProject && (
                        <div className="text-light/60">
                          <span className="text-light/30">Chosen Project:</span> {r.chooseProject}
                        </div>
                      )}
                      {r.ownProjectTopic && (
                        <div className="text-light/60">
                          <span className="text-light/30">Own Topic:</span> {r.ownProjectTopic}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="mt-3 text-light/50 text-sm bg-dark/50 p-3 border border-light/5 whitespace-pre-line">
                    {r.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-light/20">
                    <Calendar size={12} />
                    {new Date(r.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <button
                  onClick={() => del(r._id)}
                  className="p-2 text-light/30 hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectRequestsPage;
