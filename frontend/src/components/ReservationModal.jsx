console.error('Error submitting reservation:', error);
alert('Error submitting reservation. Please try again.');
        } finally {
    setLoading(false);
}
    };

if (!isOpen || !activity) return null;

const pricePerPerson = convertPrice(activity.price, currentCurrency, rates);
const totalPrice = (pricePerPerson * formData.participants).toFixed(2);

return (
    <AnimatePresence>
        {isOpen && (
            <div className="modal-overlay">
                <motion.div
                    className="modal-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>

                    {success ? (
                        <div className="success-message">
                            <div className="success-icon">✓</div>
                            <h3>{t('success_message')}</h3>
                        </div>
                    ) : (
                        <>
                            <div className="modal-header">
                                <h2>{t('reservation_title')}</h2>
                                <p>{activity.name}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="reservation-form">
                                <div className="form-group">
                                    <label><User size={16} /> {t('name')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><Mail size={16} /> {t('email')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><Phone size={16} /> {t('phone')}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label><Calendar size={16} /> {t('date')}</label>
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label><User size={16} /> {t('participants')}</label>
                                        <input
                                            type="number"
                                            name="participants"
                                            min="1"
                                            required
                                            value={formData.participants}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="price-summary">
                                    <div className="price-row">
                                        <span>{t('price')} / pers:</span>
                                        <span>{formatPrice(pricePerPerson, currentCurrency)}</span>
                                    </div>
                                    <div className="price-row total">
                                        <span>{t('total')}:</span>
                                        <span>{formatPrice(totalPrice, currentCurrency)}</span>
                                    </div>
                                </div>

                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? t('loading') : t('submit')}
                                </button>
                            </form>
                        </>
                    )}
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);
};

export default ReservationModal;
