const { getFirestore, getStorage } = require('../config/firebase-admin-config');
const { FieldValue } = require('firebase-admin').firestore;

/**
 * Firebase Service Layer
 * Handles all Firestore and Storage operations
 */

// Collections
const COLLECTIONS = {
    ACTIVITIES: 'activities',
    RESERVATIONS: 'reservations'
};

// ============= ACTIVITIES =============

/**
 * Get all activities
 */
async function getAllActivities() {
    try {
        const db = getFirestore();
        const snapshot = await db.collection(COLLECTIONS.ACTIVITIES).get();

        const activities = [];
        snapshot.forEach(doc => {
            activities.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return activities;
    } catch (error) {
        console.error('Error getting activities:', error);
        throw error;
    }
}

/**
 * Get activity by ID
 */
async function getActivityById(id) {
    try {
        const db = getFirestore();
        const doc = await db.collection(COLLECTIONS.ACTIVITIES).doc(id.toString()).get();

        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id,
            ...doc.data()
        };
    } catch (error) {
        console.error('Error getting activity:', error);
        throw error;
    }
}

/**
 * Create new activity
 */
async function createActivity(activityData) {
    try {
        const db = getFirestore();

        // Get the highest ID to generate next one
        const snapshot = await db.collection(COLLECTIONS.ACTIVITIES).get();
        let maxId = 0;
        snapshot.forEach(doc => {
            const numericId = parseInt(doc.id);
            if (!isNaN(numericId) && numericId > maxId) {
                maxId = numericId;
            }
        });

        const newId = (maxId + 1).toString();

        const newActivity = {
            name: activityData.name,
            description: activityData.description,
            price: parseFloat(activityData.price),
            currency: activityData.currency || 'TND',
            duration: activityData.duration || '1h',
            image: activityData.image || 'default.jpg',
            reviews: [],
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };

        await db.collection(COLLECTIONS.ACTIVITIES).doc(newId).set(newActivity);

        return {
            id: newId,
            ...newActivity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error creating activity:', error);
        throw error;
    }
}

/**
 * Update activity
 */
async function updateActivity(id, updateData) {
    try {
        const db = getFirestore();
        const docRef = db.collection(COLLECTIONS.ACTIVITIES).doc(id.toString());

        const doc = await docRef.get();
        if (!doc.exists) {
            return null;
        }

        const updates = {
            ...updateData,
            updatedAt: FieldValue.serverTimestamp()
        };

        // Remove undefined values
        Object.keys(updates).forEach(key => {
            if (updates[key] === undefined) {
                delete updates[key];
            }
        });

        await docRef.update(updates);

        const updated = await docRef.get();
        return {
            id: updated.id,
            ...updated.data()
        };
    } catch (error) {
        console.error('Error updating activity:', error);
        throw error;
    }
}

/**
 * Delete activity
 */
async function deleteActivity(id) {
    try {
        const db = getFirestore();
        const docRef = db.collection(COLLECTIONS.ACTIVITIES).doc(id.toString());

        const doc = await docRef.get();
        if (!doc.exists) {
            return null;
        }

        const activityData = {
            id: doc.id,
            ...doc.data()
        };

        await docRef.delete();

        return activityData;
    } catch (error) {
        console.error('Error deleting activity:', error);
        throw error;
    }
}

/**
 * Add review to activity
 */
async function addReviewToActivity(activityId, reviewData) {
    try {
        const db = getFirestore();
        const docRef = db.collection(COLLECTIONS.ACTIVITIES).doc(activityId.toString());

        const doc = await docRef.get();
        if (!doc.exists) {
            return null;
        }

        const newReview = {
            id: Date.now(),
            user: reviewData.user,
            rating: reviewData.rating,
            comment: reviewData.comment,
            avatar: reviewData.avatar || null,
            date: new Date().toISOString()
        };

        await docRef.update({
            reviews: FieldValue.arrayUnion(newReview),
            updatedAt: FieldValue.serverTimestamp()
        });

        return newReview;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
}

// ============= RESERVATIONS =============

/**
 * Get all reservations
 */
async function getAllReservations() {
    try {
        const db = getFirestore();
        const snapshot = await db.collection(COLLECTIONS.RESERVATIONS)
            .orderBy('createdAt', 'desc')
            .get();

        const reservations = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            reservations.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
                updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt
            });
        });

        return reservations;
    } catch (error) {
        console.error('Error getting reservations:', error);
        throw error;
    }
}

/**
 * Create new reservation
 */
async function createReservation(reservationData) {
    try {
        const db = getFirestore();

        const newReservation = {
            ...reservationData,
            status: 'pending',
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };

        const docRef = await db.collection(COLLECTIONS.RESERVATIONS).add(newReservation);

        return {
            id: docRef.id,
            ...reservationData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error creating reservation:', error);
        throw error;
    }
}

/**
 * Update reservation status
 */
async function updateReservationStatus(id, status) {
    try {
        const db = getFirestore();
        const docRef = db.collection(COLLECTIONS.RESERVATIONS).doc(id);

        const doc = await docRef.get();
        if (!doc.exists) {
            return null;
        }

        await docRef.update({
            status,
            updatedAt: FieldValue.serverTimestamp()
        });

        const updated = await docRef.get();
        const data = updated.data();

        return {
            id: updated.id,
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt
        };
    } catch (error) {
        console.error('Error updating reservation status:', error);
        throw error;
    }
}

/**
 * Get reservation by ID
 */
async function getReservationById(id) {
    try {
        const db = getFirestore();
        const doc = await db.collection(COLLECTIONS.RESERVATIONS).doc(id).get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt
        };
    } catch (error) {
        console.error('Error getting reservation:', error);
        throw error;
    }
}

module.exports = {
    // Activities
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
    addReviewToActivity,

    // Reservations
    getAllReservations,
    createReservation,
    updateReservationStatus,
    getReservationById,

    // Storage
    uploadFile
};

// ============= STORAGE =============

/**
 * Upload file to Firebase Storage
 * @param {Object} file - Multer file object
 * @param {string} folder - Folder name in storage (default: 'uploads')
 */
async function uploadFile(file, folder = 'uploads') {
    try {
        const storage = getStorage();
        const bucket = storage.bucket();

        const filename = `${folder}/${Date.now()}-${file.originalname}`;
        const fileUpload = bucket.file(filename);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        return new Promise((resolve, reject) => {
            blobStream.on('error', (error) => {
                console.error('Error uploading file:', error);
                reject(error);
            });

            blobStream.on('finish', async () => {
                try {
                    // Make the file public
                    await fileUpload.makePublic();

                    // Get the public URL
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

                    resolve({
                        filename: filename,
                        url: publicUrl
                    });
                } catch (error) {
                    reject(error);
                }
            });

            blobStream.end(file.buffer);
        });
    } catch (error) {
        console.error('Error in uploadFile service:', error);
        throw error;
    }
}
