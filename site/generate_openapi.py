#!/usr/bin/env python3
"""Generate OpenAPI schema from the Lucid Verifier FastAPI app."""
import json
import sys
from pathlib import Path

# Add paths for local packages
root = Path(__file__).parent.parent
sys.path.insert(0, str(root / "apps/verifier"))
sys.path.insert(0, str(root / "packages/lucid-schemas"))
sys.path.insert(0, str(root / "packages/lucid-sdk"))

from lucid_verifier.main import app

# Get the OpenAPI schema from FastAPI
openapi_schema = app.openapi()

# Write to docs directory (mkdocs will copy to site/ during build)
output_path = root / "docs/openapi.json"
with open(output_path, "w") as f:
    json.dump(openapi_schema, f, indent=2)

print(f"OpenAPI schema written to {output_path}")
