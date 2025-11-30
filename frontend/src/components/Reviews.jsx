setRating(5);
        } catch (error) {
    console.error('Error submitting review:', error);
} finally {
    setIsSubmitting(false);
}
    };

return (
    <div className="reviews-section">
        <h3>Reviews & Ratings</h3>

        {/* Reviews List */}
        <div className="reviews-list">
            {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <div className="reviewer-info">
                                {review.avatar ? (
                                    <img src={review.avatar} alt={review.user} className="reviewer-avatar" />
                                ) : (
                                    <div className="reviewer-avatar-placeholder">
                                        <User size={20} />
                                    </div>
                                )}
                                <div>
                                    <span className="reviewer-name">{review.user}</span>
                                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="review-rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < review.rating ? "#f1c40f" : "none"}
                                        color={i < review.rating ? "#f1c40f" : "#ddd"}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="review-text">{review.comment}</p>
                    </div>
                ))
            ) : (
                <p className="no-reviews">No reviews yet. Be the first to share your experience!</p>
            )}
        </div>

        {/* Write Review Section */}
        <div className="write-review">
            <h4>Write a Review</h4>

            {!user ? (
                <div className="login-prompt">
                    <p>Please sign in to leave a review.</p>

                    {/* Simulated Google Login Button */}
                    <button onClick={handleDemoLogin} className="google-sim-btn">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                        <span>Sign in with Google (Simulation)</span>
                    </button>

                    <p className="note-text">
                        <small>* Real Google Auth requires a configured Client ID.</small>
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="user-badge">
                        {user.picture ? (
                            <img src={user.picture} alt={user.name} className="user-avatar-small" />
                        ) : (
                            <User size={16} />
                        )}
                        <span>Posting as <strong>{user.name}</strong></span>
                        <button type="button" onClick={() => setUser(null)} className="sign-out-link">Sign out</button>
                    </div>

                    <div className="rating-input">
                        <label>Rating:</label>
                        <div className="stars-selector">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`star-btn ${star <= rating ? 'active' : ''}`}
                                >
                                    <Star
                                        size={24}
                                        fill={star <= rating ? "#f1c40f" : "none"}
                                        color={star <= rating ? "#f1c40f" : "#ddd"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="comment-input">
                        <label>Your Experience:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us what you liked..."
                            required
                            rows={4}
                        />
                    </div>

                    <button type="submit" className="submit-review-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Posting...' : 'Post Review'}
                    </button>
                </form>
            )}
        </div>
    </div>
);
};

export default Reviews;
