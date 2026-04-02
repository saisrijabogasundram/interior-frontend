import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import './Projects.css'; 

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'planning',
  });
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects/');
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/projects/', form);
      setMessage('Project created successfully!');
      setForm({ title: '', description: '', status: 'planning' });
      setShowForm(false);
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Failed to create project.');
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await API.delete(`/projects/${id}/`);
        fetchProjects();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const statusConfig = {
    planning: { label: 'Planning', className: 'status-planning' },
    in_progress: { label: 'In Progress', className: 'status-progress' },
    on_hold: { label: 'On Hold', className: 'status-hold' },
    completed: { label: 'Completed', className: 'status-completed' },
  };

  return (
    <div>
      

      
      <div className="hero">
        <h1 className="hero-title">My Projects</h1>
        <p className="hero-sub">
          Track and manage all your interior design projects
        </p>
      </div>

      <div className="container">
        
        {message && <div className="toast">{message}</div>}

        
        <div className="header">
          <h2 className="section-title">
            All Projects ({projects.length})
          </h2>
          <button
            className="btn-primary add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <FiPlus size={18} />
            {showForm ? 'Cancel' : 'New Project'}
          </button>
        </div>

        
        {showForm && (
          <div className="form-card">
            <h3 className="form-title">Create New Project</h3>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <div className="field">
                  <label className="label">Project Title</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="e.g. Living Room Renovation"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="field">
                  <label className="label">Status</label>
                  <select
                    className="input-field"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <textarea
                  className="input-field textarea"
                  rows={3}
                  placeholder="Describe your project..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <button className="btn-primary submit-btn" type="submit">
                Create Project
              </button>
            </form>
          </div>
        )}

        
        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="empty">
            <span className="empty-icon">📋</span>
            <p>No projects yet. Create your first project!</p>
            <button
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid">
            {projects.map((p) => {
              const config =
                statusConfig[p.status] || statusConfig.planning;

              return (
                <div key={p.id} className="card">
                  <div className="card-header">
                    <span className={`status-badge ${config.className}`}>
                      {config.label}
                    </span>

                    <div className="card-actions">
                      <button
                        className="action-btn delete"
                        onClick={() => deleteProject(p.id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="card-title">{p.title}</h3>

                  {p.description && (
                    <p className="card-desc">{p.description}</p>
                  )}

                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${p.status}`}
                    />
                  </div>

                  <p className="card-date">
                    Created:{' '}
                    {new Date(p.created_at).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default Projects;