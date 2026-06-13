// engine.js
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { STANDARD_BASE_CEILING, DOUBLED_WORKING_CEILING } from './config.js';
import { GeospatialFileAuditor, SatelliteCryptoValidator } from './security.js';
import { WyvernNFTBlockchainBackbone } from './blockchain.js';
import { FractalTopographyAnalyzer, InverseSolarScheduler, DroneHardwareController } from './subsystems.js';
import { DynamicNFTGraphicEngine, LocalHTMLGalleryExporter, HaruhiDataOutputMonitor } from './analytics.js';

export class WyvernSerializedEngine {
    constructor() {
        this.fileAuditor = new GeospatialFileAuditor();
        this.ledgerBackbone = new WyvernNFTBlockchainBackbone();
        this.inverseScheduler = new InverseSolarScheduler();
        this.graphicRenderer = new DynamicNFTGraphicEngine();
        this.hardware = new DroneHardwareController();
    }

    processSerializedSimulation(rasterImage, targetLat, targetLon, season, currentBudget = null, droneBattery = 100.0) {
        // Hard perimeter array checks to prevent undefined array crashes
        if (!rasterImage || !rasterImage.length || !rasterImage[0]) {
            console.error("🚨 MATRIX REJECTION: Received invalid or undefined raster input.");
            return false;
        }

        const rows = rasterImage.length;
        const cols = rasterImage[0].length;
        const kernelSize = 3;
        let stepCount = 1;
        
        const dataMonitor = new HaruhiDataOutputMonitor();
        
        const teamsPool = [
            "ALPHA_WYVERN", "BETA_APIS", "GAMMA_GRYPHON", "DELTA_AQUILA",
            "EPSILON_VESPA", "ZETA_PHOENIX", "ETA_FORMICA", "THETA_ANZU",
            "IOTA_PANTHERA", "KAPPA_KRAKEN", "LAMBDA_MANTIS", "MU_PEGASUS"
        ];
        
        if (currentBudget === null) {
            currentBudget = DOUBLED_WORKING_CEILING; // 52 units
        }
        
        console.log(`\n[*] Activating Node.js 24 12-Team Sequential Pipeline. Active Budget: ${currentBudget} Units`);
        console.log("-".repeat(120));

        for (let r = 0; r <= rows - kernelSize; r++) {
            for (let c = 0; c <= cols - kernelSize; c++) {
                
                const kernelSlice = rasterImage.slice(r, r + kernelSize).map(row => row.slice(c, c + kernelSize));
                const offsetLat = targetLat + (r * 0.0005);
                const offsetLon = targetLon + (c * 0.0005);
                const coordDisplay = `${offsetLat.toFixed(4)}, ${offsetLon.toFixed(4)}`;
                
                const eventStatus = (r === 1 && c === 2) ? "🌑 ECLIPSE ANOMALY ACTIVE" : "Nominal";
                let solarIrradiance = this.inverseScheduler.calculateSolarIrradiance(r, c);
                if (eventStatus.includes("ECLIPSE")) solarIrradiance = 25.0;
                
                if (FractalTopographyAnalyzer.verifyExclusionProximity(kernelSlice)) return false;

                const liveFileSignature = this.fileAuditor.computeLocationSaltedSignature(offsetLat, offsetLon);
                const dataDiagnosticLog = dataMonitor.updateAndCheckCoverage(kernelSlice);
                
                const activeTeam = teamsPool[stepCount % teamsPool.length];
                
                const [newBattery, priorityScore, powerLog] = this.inverseScheduler.evaluateInversePriorityDynamics(
                    droneBattery, solarIrradiance, currentBudget, 1.0, eventStatus
                );
                droneBattery = newBattery;

                const serialTokenUid = this.graphicRenderer.generateSerializedUid(season, eventStatus, activeTeam, stepCount);
                const tokenGraphicUri = this.graphicRenderer.renderTokenGraphic(
                    serialTokenUid, activeTeam, season, eventStatus, priorityScore
                );

                const mintedNft = this.ledgerBackbone.mintPriorityNft(stepCount, coordDisplay, priorityScore, droneBattery, activeTeam, tokenGraphicUri);
                this.ledgerBackbone.appendSecureBlock(stepCount, coordDisplay, kernelSlice.flat(), { team: activeTeam }, mintedNft);

                if (kernelSlice.some(row => row.includes(4))) {
                    console.log(`\n[!] SENSOR INTERCEPT: Cloud canopy layer at (${coordDisplay}). Cleansing raster...`);
                    const cleansedRaster = rasterImage.map(row => row.map(pixel => pixel === 4 ? 5 : pixel));
                    return this.processSerializedSimulation(cleansedRaster, targetLat, targetLon, season, STANDARD_BASE_CEILING, droneBattery);
                }

                console.log(`Step [${String(stepCount).padStart(2, '0')}] Node: (${coordDisplay}) | Solar: ${solarIrradiance.toFixed(1)} W/m² | Batt: ${droneBattery.toFixed(1)}% | Serial UID: ${serialTokenUid}`);
                
                currentBudget--;
                stepCount++;
            }
        }
        
        console.log(`\n[🎉 12-TEAM TRAJECTORY SECURED] Distributed ledger blocks sealed successfully.`);
        LocalHTMLGalleryExporter.exportChainToGallery(this.ledgerBackbone);
        return true;
    }
}

// Robust, cross-platform entry point execution verification for Node JS 24 ES Modules
const currentScriptPath = fileURLToPath(import.meta.url);
const executedScriptPath = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (currentScriptPath === executedScriptPath || executedScriptPath.endsWith('engine.js')) {
    // Solid 5x5 data matrix structure
    const SIMULATED_LANDSCAPE = [,
 ,
 ,
 ,
        [1, 2, 1, 2, 3]
    ];
    
    const engine = new WyvernSerializedEngine();
    engine.processSerializedSimulation(SIMULATED_LANDSCAPE, 29.4241, -98.4936, "WINTER");
}
