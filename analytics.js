// analytics.js
import fs from 'node:fs';
import path from 'node:path';

export class DynamicNFTGraphicEngine {
    constructor() {
        this.seasonalPalettes = {
            "SPRING": { bg1: "#a8ff78", bg2: "#78ffd6", accent: "#2ebd59", code: "SPRG" },
            "SUMMER": { bg1: "#fce38a", bg2: "#f38181", accent: "#e74c3c", code: "SMMR" },
            "AUTUMN": { bg1: "#f39c12", bg2: "#d35400", accent: "#e67e22", code: "ATMN" },
            "WINTER": { bg1: "#2c3e50", bg2: "#3498db", accent: "#ecf0f1", code: "WNTR" }
        };
        
        // Expanded 12-team biological and mythological creature symbols
        this.teamEmblems = {
            "ALPHA_WYVERN": "🐉", "BETA_APIS": "🐝", "GAMMA_GRYPHON": "🦅", "DELTA_AQUILA": "🦅",
            "EPSILON_VESPA": "🐝", "ZETA_PHOENIX": "🔥", "ETA_FORMICA": "🐜", "THETA_ANZU": "🌀",
            "IOTA_PANTHERA": "🐆", "KAPPA_KRAKEN": "🦑", "LAMBDA_MANTIS": "🦗", "MU_PEGASUS": "🐎"
        };

        // Standardized 3-letter log tracking index headers for clean tracking
        this.logIndices = {
            "ALPHA_WYVERN": "WYV", "BETA_APIS": "APS", "GAMMA_GRYPHON": "GRY", "DELTA_AQUILA": "AQL",
            "EPSILON_VESPA": "VSP", "ZETA_PHOENIX": "PHX", "ETA_FORMICA": "FRM", "THETA_ANZU": "ANZ",
            "IOTA_PANTHERA": "PTH", "KAPPA_KRAKEN": "KRK", "LAMBDA_MANTIS": "MNT", "MU_PEGASUS": "PGS"
        };
    }

    generateSerializedUid(season, eventStatus, teamKey, index) {
        const sTarget = season.toUpperCase();
        const seasonCode = this.seasonalPalettes[sTarget] ? this.seasonalPalettes[sTarget].code : "UNKN";
        const teamCode = this.logIndices[teamKey.toUpperCase()] || "DRN";
        const eventCode = eventStatus.includes("ECLIPSE") ? "ECLP" : (eventStatus.includes("WEATHER") ? "VRTX" : "NOMN");
        
        // Output trace format: [TEAM]-[SEASON]-[EVENT]-[INDEX]
        return `${teamCode}-${seasonCode}-${eventCode}-${String(index).padStart(3, '0')}`;
    }

    renderTokenGraphic(serialUid, team, season, eventStatus, priority) {
        const sTarget = season.toUpperCase();
        const palette = this.seasonalPalettes[sTarget] || { bg1: "#111", bg2: "#444", accent: "#fff" };
        const emblem = this.teamEmblems[team.toUpperCase()] || "⚙️";
        let bg1 = palette.bg1;
        let bg2 = palette.bg2;
        let sealLayer = "";

        if (!serialUid.includes("NOMN")) {
            sealLayer = '<circle cx="150" cy="150" r="130" stroke="#f1c40f" stroke-width="4" stroke-dasharray="6,4" fill="none" opacity="0.7"/>';
            if (serialUid.includes("ECLP")) {
                bg1 = "#050505";
                bg2 = "#1c2833";
            }
        }

        const svgRaw = `<svg xmlns="http://w3.org" viewBox="0 0 300 300" width="100%" height="100%">
            <defs><linearGradient id="g_${serialUid}"><stop offset="0%" stop-color="${bg1}"/><stop offset="100%" stop-color="${bg2}"/></linearGradient></defs>
            <rect width="300" height="300" fill="url(#g_${serialUid})" rx="15"/>
            <text x="150" y="165" font-size="75" text-anchor="middle">${emblem}</text>
            <text x="150" y="45" font-family="monospace" font-size="13" fill="${palette.accent}" font-weight="bold" text-anchor="middle">${team}</text>
            <text x="150" y="220" font-family="monospace" font-size="13" fill="white" font-weight="bold" text-anchor="middle">${serialUid}</text>
            <text x="150" y="235" font-family="monospace" font-size="10" fill="white" opacity="0.7" text-anchor="middle">PRIORITY SCORE: ${priority.toFixed(2)}</text>
            ${sealLayer}
        </svg>`;

        return `data:image/svg+xml;base64,${Buffer.from(svgRaw).toString('base64')}`;
    }
}

export class LocalHTMLGalleryExporter {
    static exportChainToGallery(blockchainObj, filename = "wyvern_nft_gallery.html") {
        let htmlCards = "";
        blockchainObj.chain.forEach(block => {
            if (block.index > 0 && block.nft) {
                const nft = block.nft;
                htmlCards += `
                <div style="background:#1e293b;padding:15px;border-radius:8px;border:1px solid #334155;text-align:center;box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5);">
                    <img src="${nft.graphicUri}" style="width:100%;border-radius:6px;"/>
                    <p style="color:#38bdf8;font-weight:bold;margin:10px 0 5px 0;font-size:14px;">${nft.tokenId}</p>
                    <p style="font-size:12px;color:#e2e8f0;margin:0;font-weight:bold;">${nft.ownerTeam}</p>
                    <div style="font-size:10px;color:#64748b;text-align:left;background:#0f172a;padding:6px;border-radius:4px;margin-top:8px;">
                        <strong>Node Pin:</strong> ${nft.attributes.geospatialNode}<br>
                        <strong>P_solar:</strong> ${nft.attributes.priorityCoefficient}<br>
                        <strong>Charge:</strong> ${nft.attributes.stateOfChargePct}%
                    </div>
                </div>`;
            }
        });

        const htmlFull = `<!DOCTYPE html><html>
        <head><title>Wyvern Swarm Portfolio</title></head>
        <body style="background:#0f172a;color:#fff;font-family:monospace;padding:30px;">
            <h2 style="text-align:center;color:#38bdf8;border-bottom:2px solid #334155;padding-bottom:12px;">🛰️ WYVERN CONSORTIUM: 12-TEAM LEDGER NFT ARCHIVE</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;margin-top:30px;">
                ${htmlCards}
            </div>
        </body></html>`;

        fs.writeFileSync(filename, htmlFull, 'utf-8');
        console.log(`\n[🎉 HTML GALLERY GENERATED] Output path: ${path.resolve(filename)}`);
    }
}

export class HaruhiDataOutputMonitor {
    constructor() {
        this.observedHistory = "";
        this.expectedPerms = new Set(["123", "132", "213", "231", "312", "321"]);
        this.capturedPerms = new Set();
    }
    updateAndCheckCoverage(kernelSlice) {
        const flatChars = kernelSlice.flat().filter(p => ['1', '2', '3'].includes(String(p)));
        this.observedHistory += flatChars.join("");
        if (this.observedHistory.length > 50) this.observedHistory = this.observedHistory.slice(-50);
        for (let i = 0; i < this.observedHistory.length - 2; i++) {
            const windowStr = this.observedHistory.slice(i, i + 3);
            if (this.expectedPerms.has(windowStr)) this.capturedPerms.add(windowStr);
        }
        return `📊 DATA: ${((this.capturedPerms.size / this.expectedPerms.size) * 100).toFixed(0)}%`;
    }
}
