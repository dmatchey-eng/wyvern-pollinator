// config.js

export const RASTER_BAND_PROPERTIES = {
    1: { type: "Dense Canopy (High NDVI)", reflectanceMean: 0.85 },
    2: { type: "Urban Core (Built Environment)", reflectanceMean: 0.45 },
    3: { type: "Water Feature (Low Infrared)", reflectanceMean: 0.12 },
    4: { type: "Cloud Cover (Sensor Occlusion)", reflectanceMean: 0.00 },
    5: { type: "Interpolated (Cloud-Cleansed Patch)", reflectanceMean: 0.60 },
    0: { type: "RESTRICTED / EXCLUSION ZONE BUFFER", reflectanceMean: -1.00 }
};

export const SYSTEM_CONDITIONS = [
    "Condition 1: Dynamic Mutation (State 4 -> State 5 'Filled')",
    "Condition 2: Bidirectional Vector Reversal on Exception",
    "Condition 3: Historical Path String Cleansing",
    "Condition 4: Flow Stabilization Bonus",
    "Condition 5: Counterfeit Telemetry Injection",
    "Condition 6: Intrusion Juggler Redirection",
    "Condition 7: Irrational Hash Integrity Verification",
    "Condition 8: Adversarial Integrity Self-Testing",
    "Condition 9: Recursive Counterfeit Doubling & Rollback",
    "Condition 10: Safe Hardware Intercept",
    "Condition 11: Real-World Geospatial Coordinates Out-of-Bounds",
    "Condition 12: Predictive Environmental Disruption Check",
    "Condition 13: Second Administrative Haruhi Metadata Integrity Check",
    "Condition 14: Geospatial SHA-256 File Signature Mismatch Fault",
    "Condition 15: Fractal Perimeter Intrusion Fault",
    "Condition 16: Automated Log Telemetry Rotation Error",
    "Condition 17: Blockchain Consensus Sync Fault",
    "Condition 18: Photovoltaic Irradiance Blackout",
    "Condition 19: Inverse Resource-Budget Priority Scheduling Lock",
    "Condition 20: Non-Fungible Token Minting Validation Mismatch",
    "Condition 21: Cross-Network Consortium Token Transfer Verification Failure",
    "Condition 22: High-Registry Event Remembrance Synchronization",
    "Condition 23: SVG Graphic Rendering Failure",
    "Condition 24: Serialized Token Naming Index Mismatch"
];

export const STANDARD_BASE_CEILING = 1 + SYSTEM_CONDITIONS.length; // 25
export const DOUBLED_WORKING_CEILING = STANDARD_BASE_CEILING * 2;   // 50
export const STABILIZATION_THRESHOLD = 0.05;
