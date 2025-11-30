4: fortImg,
    5: pirateShipImg,
        6: divingImg,
            7: parasailingImg,
                8: horseRidingImg
        };
return imageMap[activity.id];
    };

if (loading) {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
        </div>
    );
}

if (!activity) {
    return (
        <div className="error-container">
            <h2>Activity not found</h2>
            <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
    );
}

const activityImage = getActivityImage(activity);

return (
    <div className="activity-details-page">
        {/* Immersive Hero Section */}
        <div className="hero-wrapper">
            <div
                className="hero-background"
                style={{ backgroundImage: `url(${activityImage})` }}
            ></div>
            <div className="hero-overlay-gradient"></div>

            <div className="hero-content container">
                <button className="back-nav-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                    <span>{t('back') || 'Back'}</span>
                </button>

                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="activity-tag">{t('activity') || 'Activity'}</span>
                    <h1>{activity.name}</h1>
                    <div className="hero-meta">
                        <div className="meta-item">
                            <MapPin size={18} />
                            <span>Djerba, Tunisia</span>
                        </div>
                        <div className="meta-item">
                            <Clock size={18} />
                            <span>{activity.duration}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Main Content Area with Overlap */}
        <div className="content-wrapper container">
            <div className="content-layout">

                {/* Left Column: Description & Details */}
                <motion.div
                    className="details-column"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="section-block description-block">
                        <h2>{t('experience') || 'The Experience'}</h2>
                        <p className="lead-text">
                            {activity.description[i18n.language] || activity.description['fr'] || activity.description['en']}
                        </p>
                    </div>

                    <div className="section-block highlights-block">
                        <h3>{t('highlights') || 'Highlights'}</h3>
                        <div className="highlights-grid">
                            <div className="highlight-card">
                                <div className="icon-box"><CheckCircle size={24} /></div>
                                <div>
                                    <h4>{t('instant_confirmation') || 'Instant Confirmation'}</h4>
                                    <p>{t('book_peace_mind') || 'Book with peace of mind'}</p>
                                </div>
                            </div>
                            <div className="highlight-card">
                                <div className="icon-box"><Calendar size={24} /></div>
                                <div>
                                    <h4>{t('available_daily') || 'Available Daily'}</h4>
                                    <p>{t('flexible_schedule') || 'Flexible schedule options'}</p>
                                </div>
                            </div>
                            <div className="highlight-card">
                                <div className="icon-box"><MapPin size={24} /></div>
                                <div>
                                    <h4>{t('expert_guides') || 'Expert Guides'}</h4>
                                    <p>{t('local_knowledge') || 'Deep local knowledge'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Reviews
                        activityId={activity.id}
                        reviews={activity.reviews}
                        onReviewAdded={(newReview) => {
                            const updatedActivity = { ...activity };
                            if (!updatedActivity.reviews) updatedActivity.reviews = [];
                            updatedActivity.reviews.unshift(newReview);
                            setActivity(updatedActivity);
                        }}
                    />
                </motion.div>

                {/* Right Column: Sticky Booking Card */}
                <motion.div
                    className="booking-column"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="booking-card-premium">
                        <div className="card-header">
                            <span className="price-label">{t('starting_from') || 'Starting from'}</span>
                            <div className="price-display">
                                <span className="currency-symbol">
                                    {currentCurrency === 'USD' ? '$' : currentCurrency === 'EUR' ? '€' : ''}
                                </span>
                                <span className="amount">
                                    {formatPrice(
                                        convertPrice(activity.price, currentCurrency, rates),
                                        currentCurrency
                                    ).replace(/[^0-9.,]/g, '')}
                                </span>
                                <span className="currency-code">{currentCurrency}</span>
                            </div>
                            <span className="per-person">/{t('person') || 'person'}</span>
                        </div>

                        <div className="card-body">
                            <div className="info-row">
                                <Clock size={18} />
                                <span>{t('duration') || 'Duration'}: <strong>{activity.duration}</strong></span>
                            </div>
                            <div className="info-row">
                                <CheckCircle size={18} />
                                <span>{t('free_cancellation') || 'Free Cancellation'}</span>
                            </div>

                            <button
                                className="book-btn-premium"
                                onClick={() => setIsModalOpen(true)}
                            >
                                {t('book_now') || 'Book Now'}
                            </button>

                            <p className="secure-text">
                                <CheckCircle size={12} /> {t('secure_booking') || 'Secure booking'}
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>

        <ReservationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            activity={activity}
            currentCurrency={currentCurrency}
            rates={rates}
        />
    </div>
);
};

export default ActivityDetails;
