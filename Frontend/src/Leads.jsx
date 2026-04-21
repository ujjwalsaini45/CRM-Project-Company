
// src/pages/Leads.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

const AGENTS = ["Priya Sharma", "Rohan Mehta", "Aisha Khan", "Dev Patel", "Neha Gupta"];
const SOURCES = ["Website", "Ads", "Call", "Referral"];
const STATUSES = ["New", "Contacted", "Qualified", "Closed", "Lost"];
const PREFS = ["2BHK", "3BHK", "Villa", "Commercial", "Plot"];

const STATUS_STYLE = {
  New:       { background: "#DBEAFE", color: "#1E40AF" },
  Contacted: { background: "#EDE9FE", color: "#5B21B6" },
  Qualified: { background: "#DCFCE7", color: "#166534" },
  Closed:    { background: "#CCFBF1", color: "#0F5347" },
  Lost:      { background: "#FEE2E2", color: "#991B1B" },
};

const AGENT_COLORS = [
  { background: "#DBEAFE", color: "#1E40AF" },
  { background: "#EDE9FE", color: "#5B21B6" },
  { background: "#DCFCE7", color: "#166534" },
  { background: "#FEF3C7", color: "#92400E" },
  { background: "#CCFBF1", color: "#0F5347" },
];

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function getFollowLabel(date) {
  const diff = Math.round((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: "Overdue", style: { background: "#FEE2E2", color: "#991B1B" } };
  if (diff === 0) return { label: "Today",   style: { background: "#FEF3C7", color: "#92400E" } };
  return { label: date, style: { background: "#F3F4F6", color: "#6B7280" } };
}

function makeDate(offset = 1) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

const EMPTY_LEAD = {
  name: "", phone: "", email: "", budget: "",
  source: "Website", pref: "2BHK",
  status: "New", agent: AGENTS[0],
  followUp: makeDate(1), notes: "",
};

// ── styles ────────────────────────────────────────────────────────────────────
const s = {
  page:        { padding: "24px 32px", fontFamily: "system-ui, sans-serif", background: "#fff", minHeight: "100vh" },
  header:      { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 },
  h1:          { fontSize: 24, fontWeight: 600, color: "#111827", margin: 0 },
  sub:         { fontSize: 13, color: "#6B7280", marginTop: 2 },
  btnAdd:      { padding: "8px 18px", background: "#111827", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" },
  metrics:     { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 },
  metricCard:  { background: "#F9FAFB", borderRadius: 10, padding: "14px 16px", border: "1px solid #E5E7EB" },
  metricLabel: { fontSize: 12, color: "#6B7280", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 },
  metricVal:   { fontSize: 24, fontWeight: 600, color: "#111827" },
  dot:         (bg) => ({ width: 8, height: 8, borderRadius: "50%", background: bg, display: "inline-block" }),
  filters:     { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" },
  input:       { flex: 1, minWidth: 200, fontSize: 13, padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: 8, outline: "none", color: "#111827" },
  select:      { fontSize: 13, padding: "8px 10px", border: "1px solid #D1D5DB", borderRadius: 8, background: "#fff", color: "#111827", cursor: "pointer" },
  tableWrap:   { border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" },
  table:       { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  thead:       { background: "#F9FAFB" },
  th:          { padding: "10px 14px", textAlign: "left", fontWeight: 500, fontSize: 12, color: "#6B7280", borderBottom: "1px solid #E5E7EB" },
  td:          { padding: "10px 14px", borderBottom: "1px solid #F3F4F6", verticalAlign: "middle", color: "#111827" },
  tdLast:      { padding: "10px 14px", verticalAlign: "middle" },
  badge:       (style) => ({ display: "inline-block", fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, ...style }),
  sourceBadge: { fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB", display: "inline-block" },
  avatar:      (style) => ({ width: 28, height: 28, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, marginRight: 6, ...style }),
  nameMain:    { fontWeight: 500, color: "#111827" },
  nameSub:     { fontSize: 11, color: "#9CA3AF", marginTop: 1 },
  iconBtn:     { background: "none", border: "1px solid #E5E7EB", borderRadius: 6, padding: "3px 9px", fontSize: 12, color: "#6B7280", cursor: "pointer", marginRight: 4 },
  emptyRow:    { textAlign: "center", padding: "40px 0", color: "#9CA3AF" },
  // modal
  overlay:     { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
  modal:       { background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", padding: 28, width: 500, maxWidth: "95vw" },
  modalTitle:  { fontSize: 16, fontWeight: 600, marginBottom: 18, color: "#111827" },
  formGrid:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  formRow:     { marginBottom: 0 },
  label:       { display: "block", fontSize: 12, color: "#6B7280", marginBottom: 4 },
  formInput:   { width: "100%", fontSize: 13, padding: "8px 10px", border: "1px solid #D1D5DB", borderRadius: 8, boxSizing: "border-box", color: "#111827" },
  formFull:    { marginTop: 12 },
  modalFoot:   { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 },
  btnCancel:   { padding: "8px 18px", background: "none", border: "1px solid #D1D5DB", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#374151" },
  btnSave:     { padding: "8px 18px", background: "#111827", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" },
};

export default function Leads() {
  const [leads, setLeads]               = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSource, setFilterSource] = useState("All");
  const [search, setSearch]             = useState("");
  const [showModal, setShowModal]       = useState(false);
  const [form, setForm]                 = useState(EMPTY_LEAD);
  const [editId, setEditId]             = useState(null);
  const [hoverRow, setHoverRow]         = useState(null);

  useEffect(() => {
    api.get("/leads")
      .then((res) => setLeads(res.data))
      .catch(() => setLeads([]));
  }, []);

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s).length;
    return acc;
  }, {});

  const filtered = leads.filter((l) => {
    if (filterStatus !== "All" && l.status !== filterStatus) return false;
    if (filterSource !== "All" && l.source !== filterSource) return false;
    if (
      search &&
      !l.name.toLowerCase().includes(search.toLowerCase()) &&
      !l.email?.toLowerCase().includes(search.toLowerCase())
    ) return false;
    return true;
  });

  function openAdd() {
    setForm(EMPTY_LEAD);
    setEditId(null);
    setShowModal(true);
  }

  function openEdit(lead) {
    setForm({ ...lead });
    setEditId(lead._id);
    setShowModal(true);
  }

  function saveLead() {
    if (!form.name.trim()) return;
    if (editId) {
      api.put(`/leads/${editId}`, form).then((res) => {
        setLeads((prev) => prev.map((l) => (l._id === editId ? res.data : l)));
      });
    } else {
      api.post("/leads", form).then((res) => {
        setLeads((prev) => [res.data, ...prev]);
      });
    }
    setShowModal(false);
  }

  function deleteLead(id) {
    if (!window.confirm("Delete this lead?")) return;
    api.delete(`/leads/${id}`).then(() => {
      setLeads((prev) => prev.filter((l) => l._id !== id));
    });
  }

  const field = (key, e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>Leads</h1>
          <p style={s.sub}>
            {leads.length} total &mdash; {counts.New || 0} new
          </p>
        </div>
        <button style={s.btnAdd} onClick={openAdd}>+ Add lead</button>
      </div>

      {/* Metrics */}
      <div style={s.metrics}>
        {[
          { label: "Total",     val: leads.length,        dot: "#9CA3AF" },
          { label: "New",       val: counts.New || 0,     dot: "#3B82F6" },
          { label: "Contacted", val: counts.Contacted||0, dot: "#8B5CF6" },
          { label: "Qualified", val: counts.Qualified||0, dot: "#22C55E" },
          { label: "Lost",      val: counts.Lost || 0,    dot: "#EF4444" },
        ].map((m) => (
          <div key={m.label} style={s.metricCard}>
            <div style={s.metricLabel}>
              <span style={s.dot(m.dot)} />
              {m.label}
            </div>
            <div style={s.metricVal}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={s.filters}>
        <input
          style={s.input}
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select style={s.select} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All statuses</option>
          {STATUSES.map((st) => <option key={st}>{st}</option>)}
        </select>
        <select style={s.select} value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
          <option value="All">All sources</option>
          {SOURCES.map((src) => <option key={src}>{src}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead style={s.thead}>
            <tr>
              {["Lead", "Source", "Status", "Budget", "Agent", "Follow-up", "Actions"].map((h) => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={s.emptyRow}>No leads match your filters</td>
              </tr>
            )}
            {filtered.map((l) => {
              const fl  = getFollowLabel(l.followUp);
              const ai  = AGENTS.indexOf(l.agent) % AGENT_COLORS.length;
              const bg  = hoverRow === l._id ? { background: "#F9FAFB" } : {};
              return (
                <tr
                  key={l._id}
                  onMouseEnter={() => setHoverRow(l._id)}
                  onMouseLeave={() => setHoverRow(null)}
                >
                  <td style={{ ...s.td, ...bg }}>
                    <div style={s.nameMain}>{l.name}</div>
                    <div style={s.nameSub}>{l.phone}</div>
                    <div style={s.nameSub}>{l.email}</div>
                  </td>
                  <td style={{ ...s.td, ...bg }}>
                    <span style={s.sourceBadge}>{l.source}</span>
                  </td>
                  <td style={{ ...s.td, ...bg }}>
                    <span style={s.badge(STATUS_STYLE[l.status])}>{l.status}</span>
                  </td>
                  <td style={{ ...s.td, ...bg }}>
                    <div style={{ fontWeight: 500 }}>{l.budget}</div>
                    <div style={s.nameSub}>{l.pref}</div>
                  </td>
                  <td style={{ ...s.td, ...bg }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={s.avatar(AGENT_COLORS[ai])}>{initials(l.agent)}</span>
                      <span style={{ fontSize: 12 }}>{l.agent.split(" ")[0]}</span>
                    </div>
                  </td>
                  <td style={{ ...s.td, ...bg }}>
                    <span style={s.badge(fl.style)}>{fl.label}</span>
                  </td>
                  <td style={{ ...s.tdLast, ...bg }}>
                    <button style={s.iconBtn} onClick={() => openEdit(l)}>Edit</button>
                    <button
                      style={{ ...s.iconBtn, color: "#EF4444" }}
                      onClick={() => deleteLead(l._id)}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={s.overlay} onClick={() => setShowModal(false)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalTitle}>{editId ? "Edit lead" : "Add new lead"}</div>
            <div style={s.formGrid}>
              {[
                { label: "Full name",  key: "name",   type: "text",  ph: "Full name" },
                { label: "Phone",      key: "phone",  type: "text",  ph: "+91 XXXXX XXXXX" },
                { label: "Email",      key: "email",  type: "email", ph: "email@domain.com" },
                { label: "Budget",     key: "budget", type: "text",  ph: "e.g. 50L, 1.2Cr" },
              ].map(({ label, key, type, ph }) => (
                <div key={key} style={s.formRow}>
                  <label style={s.label}>{label}</label>
                  <input
                    style={s.formInput}
                    type={type}
                    value={form[key]}
                    placeholder={ph}
                    onChange={(e) => field(key, e)}
                  />
                </div>
              ))}
              {[
                { label: "Source",     key: "source", opts: SOURCES },
                { label: "Preference", key: "pref",   opts: PREFS },
                { label: "Status",     key: "status", opts: STATUSES },
                { label: "Agent",      key: "agent",  opts: AGENTS },
              ].map(({ label, key, opts }) => (
                <div key={key} style={s.formRow}>
                  <label style={s.label}>{label}</label>
                  <select style={s.formInput} value={form[key]} onChange={(e) => field(key, e)}>
                    {opts.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={s.formFull}>
              <label style={s.label}>Follow-up date</label>
              <input
                style={s.formInput}
                type="date"
                value={form.followUp}
                onChange={(e) => field("followUp", e)}
              />
            </div>
            <div style={{ ...s.formFull, marginTop: 10 }}>
              <label style={s.label}>Notes</label>
              <input
                style={s.formInput}
                type="text"
                value={form.notes}
                placeholder="Any notes..."
                onChange={(e) => field("notes", e)}
              />
            </div>
            <div style={s.modalFoot}>
              <button style={s.btnCancel} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={s.btnSave} onClick={saveLead}>Save lead</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
