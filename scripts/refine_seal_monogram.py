from PIL import Image, ImageFilter
import numpy as np

# Load monogram
mono = Image.open('public/images/monogram_na_gold.png').convert('RGBA')
arr = np.array(mono, dtype=np.float32)

r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Identify the light fringe: high brightness, low saturation
brightness = (r + g + b) / 3.0
max_c = np.maximum(np.maximum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)
saturation = np.where(max_c > 0, (max_c - min_c) / (max_c + 1e-5), 0)

# Fringe pixels: bright and not deeply saturated gold
fringe = (brightness > 185) & (saturation < 0.35) & (a > 20)

# Replace fringe with warm gold tones
arr[fringe, 0] = 210.0 # Warm gold R
arr[fringe, 1] = 168.0 # Warm gold G
arr[fringe, 2] = 88.0  # Warm gold B

# Also soft fade on outer edges
arr[fringe, 3] = np.clip(arr[fringe, 3] * 0.85, 0, 255)

clean_mono = Image.fromarray(arr.astype(np.uint8), mode='RGBA')
clean_mono.save('public/images/monogram_na_gold.png', 'PNG')
print("Monogram defringed successfully.")
