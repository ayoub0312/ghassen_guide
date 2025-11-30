/**
 * Migration Script: JSON to Firestore
 * 
 * This script migrates existing data from JSON files to Firebase Firestore
 * Run this script once after setting up Firebase credentials
 */

const { initializeFirebase, getFirestore } = require('../config/firebase-admin-config');
const fs = require('fs');
const path = require('path');

async function migrateActivities(db) {
    console.log('\n📦 Migrating Activities...');

    try {
        const activitiesPath = path.join(__dirname, '../data/activities.json');
        const activitiesData = JSON.parse(fs.readFileSync(activitiesPath, 'utf8'));
        console.log(`   Found ${activitiesData.length} activities to migrate`);

        const batch = db.batch();
        let count = 0;

        for (const activity of activitiesData) {
            const docRef = db.collection('activities').doc(activity.id.toString());
            const { id, ...activityData } = activity;

            batch.set(docRef, {
                ...activityData,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            count++;
        }

        await batch.commit();
        console.log(`   ✅ Successfully migrated ${count} activities`);
        return count;
    } catch (error) {
        console.error('   ❌ Error migrating activities:', error.message);
        throw error;
    }
}

async function migrateReservations(db) {
    console.log('\n📦 Migrating Reservations...');

    try {
        const reservationsPath = path.join(__dirname, '../data/reservations.json');
        const reservationsData = JSON.parse(fs.readFileSync(reservationsPath, 'utf8'));
        console.log(`   Found ${reservationsData.length} reservations to migrate`);

        let count = 0;

        for (const reservation of reservationsData) {
            const { id, createdAt, updatedAt, ...reservationData } = reservation;

            await db.collection('reservations').add({
                ...reservationData,
                createdAt: createdAt ? new Date(createdAt) : new Date(),
                updatedAt: updatedAt ? new Date(updatedAt) : new Date()
            });
            count++;
        }

        console.log(`   ✅ Successfully migrated ${count} reservations`);
        return count;
    } catch (error) {
        console.error('   ❌ Error migrating reservations:', error.message);
        throw error;
    }
}

async function backupJSONFiles() {
    console.log('\n💾 Creating backup of JSON files...');

    const dataDir = path.join(__dirname, '../data');
    const backupDir = path.join(__dirname, '../data/backup');

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    const files = ['activities.json', 'reservations.json'];

    for (const file of files) {
        const sourcePath = path.join(dataDir, file);
        const backupPath = path.join(backupDir, `${file}.backup-${Date.now()}`);

        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, backupPath);
            console.log(`   ✅ Backed up ${file}`);
        }
    }
}

async function main() {
    console.log('🚀 Starting Firebase Migration');
    console.log('================================\n');

    try {
        // Initialize Firebase
        console.log('🔧 Initializing Firebase...');
        initializeFirebase();
        const db = getFirestore();
        console.log('   ✅ Firebase initialized successfully\n');

        // Create backup
        await backupJSONFiles();

        // Migrate data
        const activitiesCount = await migrateActivities(db);
        const reservationsCount = await migrateReservations(db);

        // Summary
        console.log('\n================================');
        console.log('✨ Migration Complete!');
        console.log('================================');
        console.log(`📊 Summary:`);
        console.log(`   - Activities migrated: ${activitiesCount}`);
        console.log(`   - Reservations migrated: ${reservationsCount}`);
        console.log(`\n💡 Next steps:`);
        console.log(`   1. Verify data in Firebase Console`);
        console.log(`   2. Test the application`);
        console.log(`   3. Original JSON files are backed up in data/backup/`);
        console.log('\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        console.error(error.stack);
        console.error('\n💡 Make sure you have:');
        console.error('   1. Downloaded your Firebase service account key');
        console.error('   2. Placed it in backend/config/serviceAccountKey.json');
        console.error('   3. Firestore Database is enabled in Firebase Console\n');
        process.exit(1);
    }
}

// Run migration
main();
