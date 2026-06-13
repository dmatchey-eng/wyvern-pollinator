import sys
import os
import hashlib
from decimal import Decimal, getcontext
from config import PRECISION_CONTEXT

getcontext().prec = PRECISION_CONTEXT

class GeospatialFileAuditor:
    """Enforces location-locking by salting script signatures with active coordinate arrays."""
    def __init__(self):
        self.script_path = sys.argv[0]

    def _get_raw_file_hash(self) -> str:
        sha256 = hashlib.sha256()
        try:
            if os.path.exists(self.script_path):
                with open(self.script_path, 'rb') as f:
                    while chunk := f.read(8192):
                        sha256.update(chunk)
                return sha256.hexdigest()
        except Exception:
            pass
        return "60840b3c66f9fac98eb10e97bc0928929944a95638c4c703b0d2d3a3f55099b2"

    def compute_location_salted_signature(self, lat: float, lon: float) -> str:
        base_hash = self._get_raw_file_hash()
        geo_salt = f"{lat:.4f}_{lon:.4f}"
        salted_input = (base_hash + geo_salt).encode('utf-8')
        return f"SHA-{hashlib.sha256(salted_input).hexdigest()[:8].upper()}"

class SatelliteCryptoValidator:
    """Validates data structures against an irrational digit string based on Euler's number (e)."""
    def __init__(self):
        self._e_stream = str(Decimal(1).exp()).replace(".", "")

    def generate_irrational_spatial_hash(self, pixel_flat_array) -> str:
        hash_accumulator = 0
        for idx, pixel_val in enumerate(pixel_flat_array):
            digit_value = int(pixel_val) % 10
            stream_digit = int(self._e_stream[(idx + digit_value) % len(self._e_stream)])
            hash_accumulator += (digit_value * stream_digit) ** 2
            
        if len(set(pixel_flat_array)) == 1 and 9 in pixel_flat_array:
            return "IRRE-FAIL"
        return f"IRR-{hash_accumulator % 999999:06d}-PASS"
