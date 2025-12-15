import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    ChefHat, Users, Calendar, MessageSquare, 
    LogOut, Plus, Edit, Trash2, BarChart3,
    Clock, CheckCircle, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MovingBorderButton from '../../components/MovingBorderButton';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        reservations: 0,
        contacts: 0,
        dishes: 0,
        revenue: 0
    });
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    // Check authentication on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(userData));
        
        // Fetch dashboard data (mock for now)
        // In production, replace with actual API calls
        setStats({
            reservations: 24,
            contacts: 15,
            dishes: 12,
            revenue: 4850
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Mock data for demonstration
    const recentReservations = [
        { id: 1, name: 'John Doe', date: '2024-12-25', time: '19:00', guests: 4, status: 'confirmed' },
        { id: 2, name: 'Jane Smith', date: '2024-12-26', time: '20:00', guests: 2, status: 'pending' },
        { id: 3, name: 'Bob Johnson', date: '2024-12-24', time: '18:30', guests: 6, status: 'confirmed' },
    ];

    const recentContacts = [
        { id: 1, name: 'Alice Brown', email: 'alice@example.com', subject: 'Special Diet', status: 'unread' },
        { id: 2, name: 'Charlie Davis', email: 'charlie@example.com', subject: 'Private Event', status: 'replied' },
    ];

    if (!user) {
        return null; // Or loading spinner
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            {/* Header */}
            <header style={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ChefHat size={32} color="var(--color-accent)" />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Gourmet Haven Admin
                    </h1>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Welcome back,</p>
                        <p style={{ fontWeight: 'bold' }}>{user.name}</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{user.role.toUpperCase()}</p>
                    </div>
                    <MovingBorderButton
                        onClick={handleLogout}
                        borderRadius="0.5rem"
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            border: '1px solid var(--color-accent)',
                            color: 'var(--color-accent)',
                            padding: '0.5rem 1rem'
                        }}
                    >
                        <LogOut size={18} style={{ marginRight: '0.5rem' }} />
                        Logout
                    </MovingBorderButton>
                </div>
            </header>

            <div style={{ display: 'flex' }}>
                {/* Sidebar */}
                <aside style={{
                    width: '250px',
                    backgroundColor: '#fff',
                    minHeight: 'calc(100vh - 80px)',
                    borderRight: '1px solid #e0e0e0',
                    padding: '1.5rem 0'
                }}>
                    <nav>
                        {[
                            { id: 'overview', label: 'Overview', icon: BarChart3 },
                            { id: 'reservations', label: 'Reservations', icon: Calendar },
                            { id: 'menu', label: 'Menu Manager', icon: ChefHat },
                            { id: 'contacts', label: 'Contact Messages', icon: MessageSquare },
                            { id: 'staff', label: 'Staff Management', icon: Users }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.5rem',
                                    background: 'none',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    color: activeTab === item.id ? 'var(--color-accent)' : '#666',
                                    backgroundColor: activeTab === item.id ? '#fff8e1' : 'transparent',
                                    borderRight: activeTab === item.id ? '3px solid var(--color-accent)' : 'none',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1, padding: '2rem' }}>
                    {/* Stats Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        {[
                            { label: 'Total Reservations', value: stats.reservations, icon: Calendar, color: '#3b82f6' },
                            { label: 'Unread Messages', value: stats.contacts, icon: MessageSquare, color: '#10b981' },
                            { label: 'Menu Items', value: stats.dishes, icon: ChefHat, color: '#f59e0b' },
                            { label: 'Revenue (USD)', value: `$${stats.revenue}`, icon: BarChart3, color: '#8b5cf6' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 'var(--border-radius)',
                                    padding: '1.5rem',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                            {stat.label}
                                        </p>
                                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        backgroundColor: `${stat.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <stat.icon size={24} color={stat.color} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Content based on active tab */}
                    <div style={{ backgroundColor: '#fff', borderRadius: 'var(--border-radius)', padding: '2rem' }}>
                        {activeTab === 'overview' && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Recent Activity</h2>
                                    <MovingBorderButton
                                        borderRadius="0.5rem"
                                        buttonStyle={{
                                            backgroundColor: 'var(--color-primary)',
                                            color: '#fff',
                                            padding: '0.5rem 1rem'
                                        }}
                                    >
                                        <Plus size={18} style={{ marginRight: '0.5rem' }} />
                                        Add New
                                    </MovingBorderButton>
                                </div>

                                {/* Recent Reservations */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={20} />
                                        Recent Reservations
                                    </h3>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Name</th>
                                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Date & Time</th>
                                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Guests</th>
                                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Status</th>
                                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentReservations.map((res) => (
                                                    <tr key={res.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                        <td style={{ padding: '1rem' }}>{res.name}</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div>{res.date}</div>
                                                            <div style={{ fontSize: '0.875rem', color: '#666' }}>
                                                                <Clock size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                                                                {res.time}
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>{res.guests} people</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <span style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '20px',
                                                                fontSize: '0.875rem',
                                                                backgroundColor: 
                                                                    res.status === 'confirmed' ? '#10b98115' : 
                                                                    res.status === 'pending' ? '#f59e0b15' : '#ef444415',
                                                                color: 
                                                                    res.status === 'confirmed' ? '#10b981' : 
                                                                    res.status === 'pending' ? '#f59e0b' : '#ef4444'
                                                            }}>
                                                                {res.status === 'confirmed' ? <CheckCircle size={14} style={{ marginRight: '0.25rem' }} /> : 
                                                                 res.status === 'pending' ? <Clock size={14} style={{ marginRight: '0.25rem' }} /> : 
                                                                 <XCircle size={14} style={{ marginRight: '0.25rem' }} />}
                                                                {res.status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                                <button style={{
                                                                    background: 'none',
                                                                    border: '1px solid #3b82f6',
                                                                    color: '#3b82f6',
                                                                    padding: '0.25rem 0.5rem',
                                                                    borderRadius: '4px',
                                                                    cursor: 'pointer'
                                                                }}>
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button style={{
                                                                    background: 'none',
                                                                    border: '1px solid #ef4444',
                                                                    color: '#ef4444',
                                                                    padding: '0.25rem 0.5rem',
                                                                    borderRadius: '4px',
                                                                    cursor: 'pointer'
                                                                }}>
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Recent Messages */}
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <MessageSquare size={20} />
                                        Recent Messages
                                    </h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {recentContacts.map((contact) => (
                                            <div key={contact.id} style={{
                                                padding: '1rem',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: 'var(--border-radius)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <div>
                                                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{contact.name}</h4>
                                                    <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                                        {contact.email}
                                                    </p>
                                                    <p style={{ color: '#888', fontSize: '0.875rem' }}>{contact.subject}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '20px',
                                                        backgroundColor: contact.status === 'unread' ? '#3b82f615' : '#10b98115',
                                                        color: contact.status === 'unread' ? '#3b82f6' : '#10b981'
                                                    }}>
                                                        {contact.status.toUpperCase()}
                                                    </span>
                                                    <MovingBorderButton
                                                        borderRadius="0.25rem"
                                                        buttonStyle={{
                                                            backgroundColor: 'transparent',
                                                            border: '1px solid var(--color-accent)',
                                                            color: 'var(--color-accent)',
                                                            padding: '0.25rem 0.75rem',
                                                            fontSize: '0.875rem'
                                                        }}
                                                    >
                                                        Reply
                                                    </MovingBorderButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'reservations' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                    Manage Reservations
                                </h2>
                                <p>Reservations management interface will go here...</p>
                            </div>
                        )}

                        {activeTab === 'menu' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                    Menu Management
                                </h2>
                                <p>Menu management interface will go here...</p>
                            </div>
                        )}

                        {activeTab === 'contacts' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                    Contact Messages
                                </h2>
                                <p>Contact messages interface will go here...</p>
                            </div>
                        )}

                        {activeTab === 'staff' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                    Staff Management
                                </h2>
                                <p>Staff management interface will go here...</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;