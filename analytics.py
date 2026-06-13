import base64
import os
import itertools
import numpy as np

class DynamicNFTGraphicEngine:
    """Generates Base64 embedded SVG string paths dynamically matching seasons and events."""
    def __init__(self):
        self.seasonal_palettes = {
            "SPRING": {"bg1": "#a8ff78", "bg2": "#78ffd6", "accent": "#2ebd59", "code": "SPRG"},
            "SUMMER": {"bg1": "#fce38a", "bg2": "#f38181", "accent": "#e74c3c", "code": "SMMR"},
            "AUTUMN": {"bg1": "#f39c12", "bg2": "#d35400", "accent": "#e67e22", "code": "ATMN"},
            "WINTER": {"bg1": "#2c3e50", "bg2": "#3498db", "accent": "#ecf0f1", "code": "WNTR"}
        }
        self.team_emblems = {
            "ALPHA_WYVERN": "🐉", "BETA_APIS": "🐝", "GAMMA_GRYPHON": "🦅", "DELTA_AQUILA": "🦅"
        }

    def generate_serialized_uid(self, season: str, event_status: str, index: int) -> str:
        season_code = self.seasonal_palettes.get(season.upper(), {"code": "UNKN"})["code"]
        event_code = "ECLP" if "ECLIPSE" in event_status.upper() else ("VRTX" if "WEATHER" in event_status.upper() else "NOMN")
        return f"WYV-{season_code}-{event_code}-{index:03d}"

    def render_token_graphic(self, serial_uid: str, team: str, season: str, event_status: str, priority: float) -> str:
        palette = self.seasonal_palettes.get(season.upper(), {"bg1": "#111", "bg2": "#444", "accent": "#fff"})
        emblem = self.team_emblems.get(team.upper(), "⚙️")
        seal_layer = ""
        bg1, bg2 = palette["bg1"], palette["bg2"]
        
        if "NOMN" not in serial_uid:
            seal_layer = '<circle cx="150" cy="150" r="130" stroke="#f1c40f" stroke-width="4" stroke-dasharray="6,4" fill="none" opacity="0.7"/>'
            if "ECLP" in serial_uid:
                bg1, bg2 = "#050505", "#1c2833"

        svg_raw = f"""<svg xmlns="http://w3.org" viewBox="0 0 300 300" width="100%" height="100%">
            <defs><linearGradient id="g_{serial_uid}"><stop offset="0%" stop-color="{bg1}"/><stop offset="100%" stop-color="{bg2}"/></linearGradient></defs>
            <rect width="300" height="300" fill="url(#g_{serial_uid})" rx="15"/>
            <text x="150" y="165" font-size="75" text-anchor="middle">{emblem}</text>
            <text x="150" y="45" font-family="monospace" font-size="13" fill="{palette['accent']}" font-weight="bold" text-anchor="middle">{team}</text>
            <text x="150" y="220" font-family="monospace" font-size="13" fill="white" font-weight="bold" text-anchor="middle">{serial_uid}</text>
            {seal_layer}
        </svg>"""
        return f"data:image/svg+xml;base64,{base64.b64encode(svg_raw.encode('utf-8')).decode('utf-8')}"

class LocalHTMLGalleryExporter:
    """Assembles tracking output metrics into an interactive browser grid panel file."""
    @staticmethod
    def export_chain_to_gallery(blockchain_obj, filename: str = "wyvern_nft_gallery.html"):
        html_str = "<html><body style='background:#0f172a;color:#fff;font-family:sans-serif;'><h2>Ledger NFT Grid</h2><div style='display:flex;gap:20px;'>"
        for block in blockchain_obj.chain:
            if block.index > 0 and block.nft:
                html_str += f"<div style='background:#1e293b;padding:15px;border-radius:8px;'><img src='{block.nft.graphic_uri}' width='200'/><p>{block.nft.token_id}</p></div>"
        html_str += "</div></body></html>"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html_str)

class HaruhiDataOutputMonitor:
    def __init__(self):
        self.observed_history = ""
        self.expected_perms = set("".join(p) for p in itertools.permutations(['1', '2', '3']))
        self.captured_perms = set()

    def update_and_check_coverage(self, slice_arr: np.ndarray) -> str:
        self.observed_history += "".join([str(p) for p in slice_arr.flatten() if str(p) in ['1', '2', '3']])
        for i in range(len(self.observed_history) - 2):
            if (window := self.observed_history[i:i+3]) in self.expected_perms:
                self.captured_perms.add(window)
        return f"📊 DATA: {(len(self.captured_perms) / len(self.expected_perms)) * 100.0:.0f}%"
