// blockchain.js
import crypto from 'node:crypto';

export class NonFungiblePriorityToken {
    constructor(tokenId, ownerTeam, attributes, graphicUri) {
        this.tokenId = tokenId;
        this.ownerTeam = ownerTeam;
        this.timestamp = Date.now();
        this.attributes = attributes;
        this.graphicUri = graphicUri;
        this.signature = this.mintSignatureHash();
    }

    mintSignatureHash() {
        const content = JSON.stringify({
            id: this.tokenId, owner: this.ownerTeam, uri: this.graphicUri, attr: this.attributes
        });
        return crypto.createHash('sha256').update(content).digest('hex');
    }
}

export class Block {
    constructor(index, previousHash, timestamp, data, nftToken = null) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.nft = nftToken;
        this.hash = this.computeHash();
    }

    computeHash() {
        const nftSig = this.nft ? this.nft.signature : "NO_NFT";
        const content = JSON.stringify({
            idx: this.index, prev: this.previousHash, payload: this.data, nft: nftSig
        });
        return crypto.createHash('sha256').update(content).digest('hex');
    }
}

export class WyvernNFTBlockchainBackbone {
    constructor() {
        this.chain = [];
        this.nftRegistry = new Map();
        this.createGenesisBlock();
    }

    createGenesisBlock() {
        this.chain.push(new Block(0, "0".repeat(64), Date.now(), { meta: "WYVERN BACKBONE ROOT UNIFIED" }));
    }

    mintPriorityNft(step, coordinates, priorityScore, battery, ownerTeam, graphicUri) {
        const tokenId = `TOKEN-${this.nftRegistry.size + 1}`;
        const attributes = {
            stepIndex: step, geospatialNode: coordinates,
            priorityCoefficient: Number(priorityScore.toFixed(4)), stateOfChargePct: Number(battery.toFixed(2))
        };
        const nft = new NonFungiblePriorityToken(tokenId, ownerTeam, attributes, graphicUri);
        this.nftRegistry.set(tokenId, nft);
        return nft;
    }

    appendSecureBlock(step, coordinates, matrixSlice, metadata, nftToken) {
        const prevBlock = this.chain[this.chain.length - 1];
        const newBlock = new Block(
            this.chain.length, prevBlock.hash, Date.now(),
            { step, gps: coordinates, matrix: matrixSlice, telemetry: metadata }, nftToken
        );
        this.chain.push(newBlock);
        return newBlock.hash.slice(0, 8).toUpperCase();
    }

    verifyLedgerIntegrity() {
        const seenSigs = new Set();
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];

            if (current.hash !== current.computeHash()) return false;
            if (current.previousHash !== previous.hash) return false;

            if (current.nft) {
                if (seenSigs.has(current.nft.signature)) return false;
                seenSigs.add(current.nft.signature);
            }
        }
        return true;
    }
}
