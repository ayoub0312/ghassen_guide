    }, []);

const handleActivityClick = (activityId) => {
    navigate(`/activity/${activityId}`);
};

const getActivityImage = (activity) => {
    // If activity has a direct URL or uploaded image path
    if (activity.image && (activity.image.startsWith('http') || activity.image.includes('uploads/'))) {
        return activity.image.startsWith('http') ? activity.image : `http://localhost:3001/uploads/${activity.image}`;
    }

    // Map activity IDs to images or themed backgrounds for initial data
    const imageMap = {
        1: quadImg, // Quad biking - real photo
        2: jetSkiImg, // Jet Ski - real photo
        3: camelImg, // Camel - real photo
        4: fortImg, // Fort - real photo
        5: pirateShipImg, // Pirate ship - real photo
        6: divingImg,  // Diving - real photo
        7: parasailingImg, // Parasailing - real photo
        8: horseRidingImg // Horse riding - real photo
    };

    return imageMap[activity.id];
};

const getActivityTheme = (activityId) => {
    // Define color themes for each activity
    const themes = {
        1: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)', // Quad - orange/desert
        2: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)', // Jet Ski - blue/water
        3: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', // Camel - red/sunset
        4: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)', // Fort - gray/stone
        5: 'linear-gradient(135deg, #16a085 0%, #1abc9c 100%)', // Pirate - teal/sea
        6: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', // Diving - dark blue/deep sea
        7: 'linear-gradient(135deg, #00d4ff 0%, #87ceeb 100%)', // Parasailing - sky blue/light blue
        8: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)'  // Horse riding - brown/saddle brown
    };

    return themes[activityId] || 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)';
};

return (
    <section className="activities-section" id="activities">
        <div className="container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {t('top_activities') || "Top Activities"}
            </motion.h2>

            <div className="activities-grid">
                {activities.map((activity, index) => {
                    const activityImage = getActivityImage(activity);
                    const hasImage = activityImage !== null;

                    return (
                        <motion.div
                            key={activity.id}
                            className="activity-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => handleActivityClick(activity.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-image">
                                {hasImage ? (
                                    <img src={activityImage} alt={activity.name} />
                                ) : (
                                    <div
                                        className="card-image-placeholder"
                                        style={{ background: getActivityTheme(activity.id) }}
                                    >
                                        <h3 className="placeholder-title">{activity.name}</h3>
                                    </div>
                                )}
                                <div className="card-overlay">
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleActivityClick(activity.id);
                                    }}>
                                        {t('view_details') || "View Details"}
                                    </button>
                                </div>
                            </div>

                            <div className="card-content">
                                <h3>{activity.name}</h3>
                                <p className="description">
                                    {activity.description[i18n.language] || activity.description['fr'] || activity.description['en']}
                                </p>

                                <div className="card-details">
                                    <div className="detail-item">
                                        <Clock size={16} />
                                        <span>{activity.duration}</span>
                                    </div>
                                    <div className="detail-item price">
                                        <DollarSign size={16} />
                                        <span>
                                            {formatPrice(
                                                convertPrice(activity.price, currentCurrency, rates),
                                                currentCurrency
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
);
};

export default Activities;
