# Project-defined experimental settings. Tuned in week 5, never inside agent code.

# Agent 2 · Vision: below this confidence the incident gets "Needs review" (FR-11)
CONFIDENCE_THRESHOLD = 0.45

# Agent 3 · Duplicate: starting thresholds from the plan
DUPLICATE_MAX_DISTANCE_M = 100
DUPLICATE_MAX_HOURS = 72
DUPLICATE_IMAGE_SIMILARITY = 0.90
DUPLICATE_TEXT_SIMILARITY = 0.80

# Agent 4 · Priority bands: High >= 0.70, Medium 0.40-0.69, Low < 0.40
PRIORITY_HIGH = 0.70
PRIORITY_MEDIUM = 0.40
