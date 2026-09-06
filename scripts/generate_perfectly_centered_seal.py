import math
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

W, H = 800, 800
cx, cy = 400.0, 400.0

# 1. Heightmap for Organic 3D Wax Seal
y, x = np.ogrid[:H, :W]
dx = x - cx
dy = y - cy
r = np.sqrt(dx**2 + dy**2)
theta = np.arctan2(dy, dx)

# Symmetrical, organic molten wax perimeter
base_outer_r = 350.0
wave = (
    14.0 * np.sin(4 * theta + 0.5) +
    9.0 * np.cos(6 * theta - 0.7) +
    5.0 * np.sin(8 * theta + 1.1)
)
outer_r = base_outer_r + wave
die_r = 248.0

mask_wax = r <= outer_r
rim_t = np.clip((r - die_r) / np.maximum(outer_r - die_r, 1.0), 0.0, 1.0)
rim_h = np.maximum(0.0, np.sin(rim_t * np.pi)) * 0.95 + 0.42

dish_h = 0.36 + 0.06 * (r / die_r)**2
groove_dist = np.abs(r - 248.0)
groove_dip = np.maximum(0.0, 1.0 - groove_dist / 5.0) * 0.35

h = np.where(r <= die_r, dish_h - groove_dip, rim_h)
edge_falloff = np.clip((outer_r - r) / 6.0, 0.0, 1.0)
h = h * edge_falloff
h[~mask_wax] = 0.0

# 2. Surface Normals & Blinn-Phong Lighting
dh_dy, dh_dx = np.gradient(h)
dh_dx *= 16.0
dh_dy *= 16.0
norm_len = np.sqrt(dh_dx**2 + dh_dy**2 + 1.0)
nx = -dh_dx / norm_len
ny = -dh_dy / norm_len
nz = 1.0 / norm_len

lx, ly, lz = -0.55, -0.65, 0.52
l_len = math.sqrt(lx**2 + ly**2 + lz**2)
lx, ly, lz = lx/l_len, ly/l_len, lz/l_len
diff = np.maximum(0.0, nx * lx + ny * ly + nz * lz)

vx, vy, vz = 0.0, 0.0, 1.0
hx, hy, hz = lx + vx, ly + vy, lz + vz
h_len = math.sqrt(hx**2 + hy**2 + hz**2)
hx, hy, hz = hx/h_len, hy/h_len, hz/h_len
spec = np.maximum(0.0, nx * hx + ny * hy + nz * hz) ** 32.0

flx, fly, flz = 0.5, 0.6, 0.3
fl_diff = np.maximum(0.0, nx * flx + ny * fly + nz * flz) * 0.28
ao = np.clip(1.0 - (1.0 - nz) * 1.4, 0.35, 1.0)

# Regal Crimson Palette
base_r = 135.0 * diff + 50.0 * fl_diff + 40.0
base_g = 22.0 * diff + 10.0 * fl_diff + 6.0
base_b = 30.0 * diff + 14.0 * fl_diff + 8.0

spec_glow = spec * 210.0
final_r = np.clip(base_r * ao + spec_glow, 0, 255)
final_g = np.clip(base_g * ao + spec_glow * 0.82, 0, 255)
final_b = np.clip(base_b * ao + spec_glow * 0.70, 0, 255)

alpha = np.clip(edge_falloff * 255.0, 0, 255).astype(np.uint8)
wax_img = Image.fromarray(np.stack([final_r, final_g, final_b, alpha], axis=-1).astype(np.uint8), mode='RGBA')

shadow_mask = Image.fromarray(alpha, mode='L')
shadow = Image.new('RGBA', (W, H), (20, 5, 8, 0))
shadow.paste(Image.new('RGBA', (W, H), (25, 6, 10, 145)), (8, 14), shadow_mask)
shadow = shadow.filter(ImageFilter.GaussianBlur(16))
combined = Image.alpha_composite(shadow, wax_img)

# Stamped concentric die rings
draw = ImageDraw.Draw(combined)
draw.ellipse([cx - 248, cy - 248, cx + 248, cy + 248], outline=(205, 165, 85, 140), width=1)
draw.ellipse([cx - 246, cy - 246, cx + 246, cy + 246], outline=(235, 205, 130, 90), width=1)
draw.ellipse([cx - 232, cy - 232, cx + 232, cy + 232], outline=(175, 135, 65, 75), width=1)

# 3. Monogram Centering (LETTER-BODY CENTER ALIGNMENT)
mono = Image.open('public/images/monogram_na_gold.png').convert('RGBA')

# Target height: 260px
target_h = 260
scale = target_h / 500.0 # original letter height is ~500
target_w = int(mono.width * scale)
mono_scaled = mono.resize((target_w, target_h), Image.Resampling.LANCZOS)

# The core of the letters 'N' and 'A' is centered at:
# x = 352 in original 598-wide image
# y = 260 in original 570-high image
letter_core_x = 352.0 * scale
letter_core_y = 260.0 * scale

paste_x = int(cx - letter_core_x)
paste_y = int(cy - letter_core_y)

print(f"Pasting monogram at ({paste_x}, {paste_y}) with core at ({cx}, {cy})")

# Contact shadow
mono_a = mono_scaled.split()[3]
emboss_shadow = Image.new('RGBA', mono_scaled.size, (35, 5, 8, 170))
emboss_shadow.putalpha(mono_a)
emboss_shadow = emboss_shadow.filter(ImageFilter.GaussianBlur(3))
combined.paste(emboss_shadow, (paste_x + 3, paste_y + 4), emboss_shadow)

# Specular gleam
emboss_spec = Image.new('RGBA', mono_scaled.size, (245, 220, 160, 110))
emboss_spec.putalpha(mono_a)
combined.paste(emboss_spec, (paste_x - 1, paste_y - 1), emboss_spec)

combined.paste(mono_scaled, (paste_x, paste_y), mono_scaled)
combined.save('public/images/seal_wax.png', 'PNG')
print("Saved public/images/seal_wax.png")

# Also generate favicon.png (192x192)
fav = combined.resize((192, 192), Image.Resampling.LANCZOS)
fav.save('public/favicon.png', 'PNG')
print("Updated public/favicon.png")
