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
        this.teamEmblems = {
            "ALPHA_WYVERN": "🐉", "BETA_APIS": "🐝", "GAMMA_GRYPHON": "🦅", "DELTA_AQUILA": "🦅"
        };
    }

    generateSerializedUid(season, eventStatus, index) {
        const sTarget = season.toUpperCase();
        const seasonCode = this.seasonalPalettes[sTarget] ? this.seasonalPalettes[sTarget].code : "UNKN";
        const eventCode = eventStatus.includes("ECLIPSE") ? "ECLP" : (eventStatus.includes("WEATHER") ? "VRTX" : "NOMN");
        return `WYV-${seasonCode}-${eventCode}-${String(index).padStart(3, '0')}`;
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
            ${sealLayer}
        </svg>`;

        const b64 = Buffer.from(svgRaw).toString('base64');
        return `data:image/svg+xml;base64,${b64}`;
    }
}

export class LocalHTMLGalleryExporter {
    static exportChainToGallery(blockchainObj, filename = "wyvern_nft_gallery.html") {
        let htmlCards = "";
        blockchainObj.chain.forEach(block => {
            if (block.index > 0 && block.nft) {
                const nft = block.nft;
                htmlCards += `
                <div style="background:#1e293b;padding:15px;border-radius:8px;border:1px solid #334155;text-align:center;">
                    <img src="${nft.graphicUri}" style="width:100%;border-radius:6px;"/>
                    <p style="color:#38bdf8;font-weight:bold;margin:10px 0 5px 0;">${nft.tokenId}</p>
                    <p style="font-size:11px;color:#94a3b8;margin:0;">Team: ${nft.ownerTeam}</p>
                    <p style="font-size:10px;color:#64748b;margin:2px 0 0 0;">GPS: ${nft.attributes.geospatialNode}</p>
                </div>`;
            }
        });

        const htmlFull = `<!DOCTYPE html><html>
        <head><title>Wyvern Swarm Portfolio</title></head>
        <body style="background:#0f172a;color:#fff;font-family:monospace;padding:30px;">
            <h2 style="text-align:center;color:#38bdf8;">🛰️ WYVERN CONSORTIUM: IMMUTABLE NODE GALLERY</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;margin-top:30px;">
                ${htmlCards}
            </div>
        </body></html>`;

        fs.writeFileSync(filename, htmlFull, 'utf-8');
        console.log(`\n[🎉 HTML GALLERY EXPORTED] Output compiled safely to: ${path.resolve(filename)}`);
    }
}

export class HaruhiDataOutputMonitor {
    constructor() {
        this.observedHistory = "";
        this.capturedPerms = new Set();
        // Base targets collection sequence
        this.expectedPerms = new Set(["123", "132", "213", "231", "312", "321"]);
    }

    updateAndCheckCoverage(kernelSlice) {
        const flatChars = kernelSlice.flat().filter(p => ['1', '2', '3'].includes(String(p)));
        this.observedHistory += flatChars.join("");

        if (this.observedHistory.length > 50) {
            this.observedHistory = this.observedHistory.slice(-50);
        }

        for (let i = 0; i < this.observedHistory.length - 2; i++) {
            const windowStr = this.observedHistory.slice(i, i + 3);
            if (this.expectedPerms.has(windowStr)) {
                this.capturedPerms.add(windowStr);
            }
        }
        const pct = (this.capturedPerms.size / this.expectedPerms.size) * 100;
        return `📊 DATA: ${pct.toFixed(0)}%`;
    }
}
