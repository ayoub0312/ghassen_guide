localStorage.setItem('adminAuth', JSON.stringify(response.data.admin));
navigate('/admin/dashboard');
            }
        } catch (err) {
    setError(err.response?.data?.message || 'Login failed. Please try again.');
} finally {
    setLoading(false);
}
    };

return (
    <div className="admin-login-container">
        <div className="admin-login-box">
            <div className="admin-login-header">
                <h1>🔐 Admin Login</h1>
                <p>Ghassen Travel Guide Dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="admin-login-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div className="back-home">
                <Link to="/">← Back to Home</Link>
            </div>
        </div>
    </div>
);
};

export default AdminLogin;
