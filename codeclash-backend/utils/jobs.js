const syncToGoogleSheet = async (participant) => {
    try {
        console.log(`[Job] Syncing participant ${participant.email} to Google Sheet...`);

        // Utilize the existing Google Apps Script endpoint used previously on the frontend
        const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

        const res = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(participant),
        });

        if (!res.ok) {
            throw new Error(`Google Apps Script API responded with status ${res.status}`);
        }

        console.log(`[Job] Successfully synced ${participant.email} to Google Sheet.`);
    } catch (error) {
        console.error(`[Job] Failed to sync ${participant.email} to Google Sheet:`, error);
    }
};



const runBackgroundJobs = (participant) => {
    // Fire and forget, don't await
    syncToGoogleSheet(participant).catch((err) => console.error("Unhandled error in sheet job:", err));
};

module.exports = {
    syncToGoogleSheet,
    runBackgroundJobs,
};
