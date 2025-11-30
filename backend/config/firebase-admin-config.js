const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

let db = null;
let storage = null;

/**
 * Initialize Firebase Admin SDK
 */
function initializeFirebase() {
    try {
        // Check if already initialized
        if (admin.apps.length > 0) {
            console.log('Firebase Admin already initialized');
            db = admin.firestore();
            storage = admin.storage();
            return { db, storage };
        }

        // Get service account path - use absolute path resolution
        const serviceAccountPath = path.resolve(__dirname, 'serviceAccountKey.json');

        // Try to load service account
        let serviceAccount;
        try {
            serviceAccount = require(serviceAccountPath);
        } catch (error) {
            console.error('❌ Error loading service account key:', error.message);
            console.log('📝 Please download your service account key from Firebase Console:');
            console.log('   1. Go to Firebase Console > Project Settings > Service Accounts');
            console.log('   2. Click "Generate new private key"');
            console.log(`   3. Save the file as: ${serviceAccountPath}`);
            throw new Error('Service account key not found');
        }

        // Initialize Firebase Admin
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET || serviceAccount.project_id + '.appspot.com'
        });

        db = admin.firestore();
        storage = admin.storage();

        console.log('✅ Firebase Admin initialized successfully');
        console.log(`📦 Project ID: ${serviceAccount.project_id}`);

        return { db, storage };
    } catch (error) {
        console.error('❌ Failed to initialize Firebase Admin:', error.message);
        throw error;
    }
}

/**
 * Get Firestore database instance
 */
function getFirestore() {
    if (!db) {
        const { db: database } = initializeFirebase();
        return database;
    }
    return db;
}

/**
 * Get Firebase Storage instance
 */
function getStorage() {
    if (!storage) {
        const { storage: storageInstance } = initializeFirebase();
        return storageInstance;
    }
    return storage;
}

module.exports = {
    initializeFirebase,
    getFirestore,
    getStorage,
    admin
};
