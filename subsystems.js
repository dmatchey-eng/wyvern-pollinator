// subsystems.js

export class FractalTopographyAnalyzer {
    static calculateFractalDimension(kernelSlice) {
        let transitions = 0;
        const rows = kernelSlice.length;
        const cols = kernelSlice[0].length;

        // Trace horizontal array step gaps
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols - 1; c++) {
                if (kernelSlice[r][c] !== kernelSlice[r][c + 1]) transitions++;
            }
        }
        // Trace vertical array step gaps
        for (let r = 0; r < rows - 1; r++) {
            for (let c = 0; c < cols; c++) {
                if (kernelSlice[r][c] !== kernelSlice[r + 1][c]) transitions++;
            }
        }

        if (transitions === 0) return 1.0000;
        const flatSize = rows * cols;
        return 1.0 + (Math.log(transitions + 1) / Math.log(flatSize));
    }

    static verifyExclusionProximity(kernelSlice) {
        return kernelSlice.some(row => row.includes(0));
    }
}

export class InverseSolarScheduler {
    calculateSolarIrradiance(r, c) {
        const baseSolar = 800.0;
        const spatialAttenuation = Math.cos(r * 0.1) * Math.sin(c * 0.1);
        const intensity = baseSolar + (spatialAttenuation * 150.0);
        return Math.max(100.0, Math.min(1000.0, intensity));
    }

    evaluateInversePriorityDynamics(currentSoc, irradiance, currentBudget, drainMult, statusNote) {
        const safeBudget = Math.max(1, currentBudget);
        const solarPriorityCoeff = 100.0 / safeBudget;
        let baseDrain = 1.2 * drainMult;

        if (statusNote.includes("ATTACK") || statusNote.includes("PRIORITY")) {
            baseDrain = 2.5 * drainMult;
        }

        if (currentSoc < 25.0 || solarPriorityCoeff > 15.0) {
            const chargeGain = (irradiance * 0.05) * 0.1;
            const newSoc = Math.max(0.0, Math.min(100.0, currentSoc + chargeGain));
            const log = currentSoc >= 25.0 ? `🔋 CHARGE (P_sol: ${solarPriorityCoeff.toFixed(1)})` : `🔋 LOW CHARGE (P_sol: ${solarPriorityCoeff.toFixed(1)})`;
            return [newSoc, solarPriorityCoeff, log];
        }

        const newSoc = Math.max(0.0, Math.min(100.0, currentSoc - baseDrain));
        return [newSoc, solarPriorityCoeff, `⚡ FLIGHT (P_sol: {${solarPriorityCoeff.toFixed(1)}})`];
    }
}

export class DroneHardwareController {
    evaluateLaserAlignment(r, c, selfTest, currentWind, weatherOverride) {
        if (currentWind > 28.0 || weatherOverride) {
            return [false, "🚨 TARGET LOSS: Anomaly Triggered Overrides"];
        }
        return [true, "🟢 LASER LOCK"];
    }

    readHydrationIndex(kernelSlice) {
        let score = 0;
        let activeElements = 0;

        kernelSlice.forEach(row => {
            row.forEach(pixel => {
                if (pixel > 0) {
                    activeElements++;
                    if (pixel === 3) score += 30.0;
                    if (pixel === 1) score += 10.0;
                }
            });
        });

        const pct = activeElements === 0 ? 5.0 : (score / activeElements);
        return [Math.max(5.0, Math.min(95.0, pct)), "🟢 MOISTURE OK"];
    }
}
