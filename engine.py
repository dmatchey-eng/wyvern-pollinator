import numpy as np
import time
from config import SYSTEM_CONDITIONS, RASTER_BAND_PROPERTIES, STANDARD_BASE_CEILING, DOUBLED_WORKING_CEILING
from security import GeospatialFileAuditor, SatelliteCryptoValidator
from blockchain import WyvernNFTBlockchainBackbone
from subsystems import FractalTopographyAnalyzer, InverseSolarScheduler, DroneHardwareController
from analytics import DynamicNFTGraphicEngine, LocalHTMLGalleryExporter, HaruhiDataOutputMonitor

class WyvernSerializedEngine:
    def __init__(self):
        self.file_auditor = GeospatialFileAuditor()
        self.ledger_backbone = WyvernNFTBlockchainBackbone()
        self.inverse_scheduler = InverseSolarScheduler()
        self.graphic_renderer = DynamicNFTGraphicEngine()
        self.hardware = DroneHardwareController()

    def process_serialized_simulation(self, raster_image: np.ndarray, target_lat: float, target_lon: float, 
                                      season: str, current_budget: int = None, drone_battery: float = 100.0, self_test: bool = False):
        rows, cols = raster_image.shape
        kernel_size = 3; step_count = 1
        data_monitor = HaruhiDataOutputMonitor()
        teams_pool = ["ALPHA_WYVERN", "BETA_APIS", "GAMMA_GRYPHON", "DELTA_AQUILA"]
        
        if current_budget is None: 
            current_budget = DOUBLED_WORKING_CEILING
            
        print(f"\n[*] Activating Serialized Pipeline. Active Budget: {current_budget}")
        print("-" * 180)

        for r in range(rows - kernel_size + 1):
            for c in range(cols - kernel_size + 1):
                kernel_slice = raster_image[r:r+kernel_size, c:c+kernel_size]
                offset_lat = target_lat + (r * 0.0005)
                offset_lon = target_lon + (c * 0.0005)
                coord_display = f"{offset_lat:.4f}, {offset_lon:.4f}"
                
                # Check anomalies
                event_status = "🌑 ECLIPSE ANOMALY ACTIVE" if (r == 1 and c == 2) else "Nominal"
                solar_irradiance = self.inverse_scheduler.calculate_solar_irradiance(r, c)
                if "ECLIPSE" in event_status: 
                    solar_irradiance = 25.0
                    
                if FractalTopographyAnalyzer.verify_exclusion_proximity(kernel_slice): 
                    return False

                live_file_signature = self.file_auditor.compute_location_salted_signature(offset_lat, offset_lon)
                data_diagnostic_log = data_monitor.update_and_check_coverage(kernel_slice)

                active_team = teams_pool[step_count % len(teams_pool)]
                drone_battery, priority_score, power_log = self.inverse_scheduler.evaluate_inverse_priority_dynamics(
                    drone_battery, solar_irradiance, current_budget, 1.0, event_status
                )

                serial_token_uid = self.graphic_renderer.generate_serialized_uid(season, event_status, step_count)
                token_graphic_uri = self.graphic_renderer.render_token_graphic(
                    serial_token_uid, active_team, season, event_status, priority_score
                )
                
                minted_nft = self.ledger_backbone.mint_priority_nft(step_count, coord_display, priority_score, drone_battery, active_team, token_graphic_uri)
                self.ledger_backbone.append_secure_block(step_count, coord_display, kernel_slice.flatten().tolist(), {"team": active_team}, nft_token=minted_nft)

                if 4 in kernel_slice:
                    cleansed_raster = np.copy(raster_image)
                    cleansed_raster[cleansed_raster == 4] = 5
                    return self.process_serialized_simulation(cleansed_raster, target_lat, target_lon, season, current_budget=STANDARD_BASE_CEILING, drone_battery=drone_battery, self_test=self_test)

                print(f"[{step_count}] Coords: ({coord_display}) | Solar: {solar_irradiance:.1f} W/m² | Batt: {drone_battery:.1f}% | UID: {serial_token_uid}")
                
                current_budget -= 1
                step_count += 1
                time.sleep(0.01)
                
        print("\n[🎉 RUN COMPLETE] System state finalized.")
        LocalHTMLGalleryExporter.export_chain_to_gallery(self.ledger_backbone)
        return True

if __name__ == "__main__":
    SIMULATED_LANDSCAPE = np.array([,
 ,
 ,
 ,
        [1, 2, 3, 1, 2]
    ])
    engine = WyvernSerializedEngine()
    engine.process_serialized_simulation(SIMULATED_LANDSCAPE, 29.4241, -98.4936, season="WINTER")
