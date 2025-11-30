alert('Failed to update status');
        }
    };

const filteredReservations = reservations.filter(res => {
    const matchesStatus = filterStatus === 'all' || res.status === filterStatus;
    const matchesSearch =
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.activityName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
});

if (loading) return <div className="loading-spinner">Loading reservations...</div>;

return (
    <div className="reservations-manager">
        <div className="manager-header">
            <h1>Reservations</h1>
            <button className="add-btn" style={{ background: '#10b981' }}>
                <Download size={20} />
                Export CSV
            </button>
        </div>

        <div className="filters-bar">
            <div style={{ position: 'relative', flex: 1 }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
                <input
                    type="text"
                    placeholder="Search by name, email or activity..."
                    className="search-input"
                    style={{ paddingLeft: '40px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
            >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
            </select>
        </div>

        <div className="reservations-table-container">
            <table className="reservations-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Activity</th>
                        <th>Date</th>
                        <th>Participants</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map(res => (
                        <tr key={res.id}>
                            <td>#{res.id.toString().slice(-6)}</td>
                            <td className="customer-info">
                                <div>{res.name}</div>
                                <div>{res.email}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{res.phone}</div>
                            </td>
                            <td>{res.activityName}</td>
                            <td>{new Date(res.date).toLocaleDateString()}</td>
                            <td>{res.participants}</td>
                            <td style={{ fontWeight: 600 }}>{res.totalPrice} {res.currency}</td>
                            <td>
                                <select
                                    className={`status-select ${res.status || 'pending'}`}
                                    value={res.status || 'pending'}
                                    onChange={(e) => handleStatusChange(res.id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    {filteredReservations.length === 0 && (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                                No reservations found matching your filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);
};

export default ReservationsManager;
