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
    "Condition 4: Flow Stabilization Bonus (Std Dev < 5.0 yields +2 Budget)",
    "Condition 5: Counterfeit Telemetry Injection (Malicious Spiker Spoof)",
    "Condition 6: Intrusion Juggler Redirection (Excess budget reshapes topology)",
    "Condition 7: Irrational Hash Integrity Verification (Euler's Number Signature)",
    "Condition 8: Adversarial Integrity Self-Testing (Malicious String Injection Check)",
    "Condition 9: Recursive Counterfeit Doubling & 3-State Network Rollback",
    "Condition 10: Safe Hardware Intercept (Laser Desync / Desiccation Fallback)",
    "Condition 11: Real-World Geospatial Coordinates Out-of-Bounds Fault",
    "Condition 12: Predictive Environmental Disruption Check (Market & Weather Forecast)",
    "Condition 13: Second Administrative Haruhi Metadata Integrity Check (Condition Watchdog)",
    "Condition 14: Geospatial SHA-256 File Signature Mismatch Fault (Location Lock)",
    "Condition 15: Fractal Perimeter Intrusion Fault (Strict Boundary Containment)",
    "Condition 16: Automated Log Telemetry Rotation and Write Error (System Logging)",
    "Condition 17: Blockchain Consensus Sync and Block Validation Fault (Decentralized Ledger)",
    "Condition 18: Photovoltaic Irradiance Blackout & Battery Under-Voltage Reset (Solar Telemetry)",
    "Condition 19: Inverse Resource-Budget Priority Scheduling Lock (Urgency Control)",
    "Condition 20: Non-Fungible Token Minting & Metadata Proof Validation Mismatch (ERC-721 Layer)",
    "Condition 21: Cross-Network Consortium Token Transfer Verification Failure (P2P Sharing)",
    "Condition 22: High-Registry Event Remembrance & Anomalous State Synchronization (System Sync)",
    "Condition 23: SVG Graphic Rendering Failure and Layer Overlay Corruption (Dynamic Art Generation)",
    "Condition 24: Serialized Token Naming Index Mismatch & Metadata Corruption Fault (Traceable Timeline)"
];

// Budget Math: 1 + 24 Conditions = 25 Base Units
export const STANDARD_BASE_CEILING = 1 + SYSTEM_CONDITIONS.length;

// Working Conditions Modifier: Double the standard base (25 * 2 = 50 Units)
export const DOUBLED_WORKING_CEILING = STANDARD_BASE_CEILING * 2;
export const STABILIZATION_THRESHOLD = 0.05;
