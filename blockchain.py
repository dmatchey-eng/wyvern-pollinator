import json
import hashlib
import time

class NonFungiblePriorityToken:
    """Represents a unique, serialized asset tracking an operational priority claim."""
    def __init__(self, token_id: str, owner_team: str, attributes: dict, graphic_uri: str):
        self.token_id = token_id
        self.owner_team = owner_team
        self.timestamp = time.time()
        self.attributes = attributes
        self.graphic_uri = graphic_uri
        self.signature = self.mint_signature_hash()

    def mint_signature_hash(self) -> str:
        token_content = json.dumps({
            "id": self.token_id, "owner": self.owner_team, 
            "uri": self.graphic_uri, "attr": self.attributes
        }, sort_keys=True)
        return hashlib.sha256(token_content.encode('utf-8')).hexdigest()

class Block:
    """Represents a secure container block appended to the blockchain ledger."""
    def __init__(self, index: int, previous_hash: str, timestamp: float, data: dict, nft_token=None):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.nft = nft_token
        self.hash = self.compute_hash()

    def compute_hash(self) -> str:
        nft_sig = self.nft.signature if self.nft else "NO_NFT"
        block_content = json.dumps({
            "idx": self.index, "prev": self.previous_hash, 
            "payload": self.data, "nft": nft_sig
        }, sort_keys=True)
        return hashlib.sha256(block_content.encode('utf-8')).hexdigest()

class WyvernNFTBlockchainBackbone:
    """Manages secure blocks and enforces ledger consensus rules."""
    def __init__(self):
        self.chain = []
        self.nft_registry = {}
        self.create_genesis_block()

    def create_genesis_block(self):
        self.chain.append(Block(0, "0"*64, time.time(), {"meta": "WYVERN BACKBONE ROOT UNIFIED"}))

    def mint_priority_nft(self, step: int, coordinates: str, priority_score: float, 
                          battery: float, owner_team: str, graphic_uri: str) -> NonFungiblePriorityToken:
        token_id = f"TOKEN-{len(self.nft_registry) + 1}"
        attributes = {
            "step": step, "gps": coordinates, 
            "priority_coeff": round(priority_score, 4), "soc_pct": round(battery, 2)
        }
        nft = NonFungiblePriorityToken(token_id, owner_team, attributes, graphic_uri)
        self.nft_registry[token_id] = nft
        return nft

    def append_secure_block(self, step: int, coordinates: str, matrix_slice: list, 
                            metadata: dict, nft_token: NonFungiblePriorityToken) -> str:
        prev_block = self.chain[-1]
        new_block = Block(
            len(self.chain), prev_block.hash, time.time(), 
            {"step": step, "gps": coordinates, "telemetry": metadata}, nft_token=nft_token
        )
        self.chain.append(new_block)
        return new_block.hash[:8].upper()
