import React from 'react';
// import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
            </header>
            <main className="dashboard-content">
                <div className="card">
                    <h2>Users</h2>
                    <p>Manage all users here.</p>
                </div>
                <div className="card">
                    <h2>Reports</h2>
                    <p>View system reports and analytics.</p>
                </div>
                <div className="card">
                    <h2>Settings</h2>
                    <p>Configure system settings.</p>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;