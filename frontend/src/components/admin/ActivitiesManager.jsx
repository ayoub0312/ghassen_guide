import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import './ActivitiesManager.css';

const ActivitiesManager = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        currency: 'TND',
        duration: '',
        image: '',
        description: {
            fr: '',
            en: '',
            ar: '',
            it: '',
            pl: '',
            de: '',
            es: ''
        }
    });

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/activities');
            setActivities(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching activities:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('desc_')) {
            const lang = name.split('_')[1];
            setFormData(prev => ({
                ...prev,
                description: {
                    ...prev.description,
                    [lang]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3001/api/upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Set the image URL in the form data
            setFormData(prev => ({
                ...prev,
                image: response.data.imageUrl
            }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    const handleEdit = (activity) => {
        setEditingActivity(activity);
        setFormData({
            name: activity.name,
            price: activity.price,
            currency: activity.currency,
            duration: activity.duration,
            image: activity.image,
            description: activity.description
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            try {
                await axios.delete(`http://localhost:3001/api/activities/${id}`);
                fetchActivities();
            } catch (error) {
                console.error('Error deleting activity:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingActivity) {
                await axios.put(`http://localhost:3001/api/activities/${editingActivity.id}`, formData);
            } else {
                await axios.post('http://localhost:3001/api/activities', formData);
            }
            setShowModal(false);
            setEditingActivity(null);
            fetchActivities();
            resetForm();
        } catch (error) {
            console.error('Error saving activity:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            currency: 'TND',
            duration: '',
            image: '',
            description: {
                fr: '',
                en: '',
                ar: '',
                it: '',
                pl: '',
                de: '',
                es: ''
            }
        });
    };

    const openNewModal = () => {
        setEditingActivity(null);
        resetForm();
        setShowModal(true);
    };

    if (loading) return <div className="loading-spinner">Loading activities...</div>;

    return (
        <div className="activities-manager">
            <div className="manager-header">
                <h1>Activities Management</h1>
                <button onClick={openNewModal} className="add-btn">
                    <Plus size={20} />
                    Add New Activity
                </button>
            </div>

            <div className="activities-grid">
                {activities.map(activity => (
                    <div key={activity.id} className="activity-card">
                        <div className="activity-image-container">
                            {/* In a real app, use proper image paths */}
                            <div className="activity-image-placeholder" style={{
                                height: '200px',
                                background: '#e0e0e0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ImageIcon size={40} color="#999" />
                            </div>
                        </div>
                        <div className="activity-content">
                            <div className="activity-header">
                                <h3 className="activity-title">{activity.name}</h3>
                                <span className="activity-price">{activity.price} {activity.currency}</span>
                            </div>
                            <p className="activity-description">
                                {activity.description.en || activity.description.fr}
                            </p>
                            <div className="activity-actions">
                                <button onClick={() => handleEdit(activity)} className="action-btn edit-btn">
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button onClick={() => handleDelete(activity.id)} className="action-btn delete-btn">
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingActivity ? 'Edit Activity' : 'New Activity'}</h2>
                            <button onClick={() => setShowModal(false)} className="close-btn">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Activity Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Currency</label>
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                    >
                                        <option value="TND">TND</option>
                                        <option value="EUR">EUR</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 2h"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Activity Image</label>
                                    <div className="image-upload-container">
                                        <input
                                            type="file"
                                            id="image-upload"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="image-upload" className="image-upload-label">
                                            {formData.image ? (
                                                <div className="image-preview">
                                                    <img
                                                        src={formData.image.startsWith('http') ? formData.image : `http://localhost:3001/uploads/${formData.image}`}
                                                        alt="Preview"
                                                        onError={(e) => {
                                                            // Fallback for existing hardcoded images or broken links
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                        }}
                                                    />
                                                    <span>Change Image</span>
                                                </div>
                                            ) : (
                                                <div className="upload-placeholder">
                                                    <ImageIcon size={24} />
                                                    <span>Click to upload image</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className="full-width">
                                    <h3>Descriptions</h3>
                                </div>

                                <div className="form-group full-width">
                                    <label>French Description</label>
                                    <textarea
                                        name="desc_fr"
                                        value={formData.description.fr}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>English Description</label>
                                    <textarea
                                        name="desc_en"
                                        value={formData.description.en}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Arabic Description</label>
                                    <textarea
                                        name="desc_ar"
                                        value={formData.description.ar}
                                        onChange={handleInputChange}
                                        rows="3"
                                        dir="rtl"
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                                    Cancel
                                </button>
                                <button type="submit" className="save-btn">
                                    <Save size={18} style={{ marginRight: '8px' }} />
                                    Save Activity
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivitiesManager;
