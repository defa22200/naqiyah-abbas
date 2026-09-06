import math
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageEnhance

W, H = 800, 800
cx, cy = 400.0, 400.0

# 1. Generate Organic Wax Shape (Heightmap)
y, x = np.ogrid[:H, :W]
dx = x - cx
dy = y - cy
r = np.sqrt(dx**2 + dy**2)
theta = np.arctan2(dy, dx)

# Organic perimeter waviness (natural molten wax flow)
base_outer_r = 352.0
wave = (
    18.0 * np.sin(3 * theta + 0.4) +
    12.0 * np.cos(5 * theta - 0.8) +
    7.0 * np.sin(7 * theta + 1.2) +
    4.0 * np.cos(11 * theta)
)
outer_r = base_outer_r + wave

# Die inner floor radius
die_r = 250.0

# Inside wax boundary
mask_wax = r <= outer_r

# Rim profile: peaks around r=288
rim_center = 288.0
rim_t = np.clip((r - die_r) / np.maximum(outer_r - die_r, 1.0), 0.0, 1.0)
rim_h = np.maximum(0.0, np.sin(rim_t * np.pi)) * 0.95 + 0.42

# Inner floor (r <= die_r)
dish_h = 0.36 + 0.07 * (r / die_r)**2

# Stamped circular groove at die edge (r around 246 to 252)
groove_dist = np.abs(r - 249.0)
groove_dip = np.maximum(0.0, 1.0 - groove_dist / 5.0) * 0.32

# Combine heightmap
h = np.where(r <= die_r, dish_h - groove_dip, rim_h)
edge_falloff = np.clip((outer_r - r) / 6.0, 0.0, 1.0)
h = h * edge_falloff
h[~mask_wax] = 0.0

# 2. Compute Surface Normals
dh_dy, dh_dx = np.gradient(h)
dh_dx *= 16.0
dh_dy *= 16.0

norm_len = np.sqrt(dh_dx**2 + dh_dy**2 + 1.0)
nx = -dh_dx / norm_len
ny = -dh_dy / norm_len
nz = 1.0 / norm_len

# Studio Lighting
# Key light from top-left
lx, ly, lz = -0.55, -0.65, 0.52
l_len = math.sqrt(lx**2 + ly**2 + lz**2)
lx, ly, lz = lx/l_len, ly/l_len, lz/l_len
diff = np.maximum(0.0, nx * lx + ny * ly + nz * lz)

# Specular
vx, vy, vz = 0.0, 0.0, 1.0
hx, hy, hz = lx + vx, ly + vy, lz + vz
h_len = math.sqrt(hx**2 + hy**2 + hz**2)
hx, hy, hz = hx/h_len, hy/h_len, hz/h_len
spec = np.maximum(0.0, nx * hx + ny * hy + nz * hz) ** 32.0

# Fill bounce
flx, fly, flz = 0.5, 0.6, 0.3
fl_diff = np.maximum(0.0, nx * flx + ny * fly + nz * flz) * 0.28
ao = np.clip(1.0 - (1.0 - nz) * 1.4, 0.35, 1.0)

# Base Royal Crimson Wax Palette
base_r = 135.0 * diff + 50.0 * fl_diff + 40.0
base_g = 22.0 * diff + 10.0 * fl_diff + 6.0
base_b = 30.0 * diff + 14.0 * fl_diff + 8.0

spec_glow = spec * 210.0
final_r = np.clip(base_r * ao + spec_glow, 0, 255)
final_g = np.clip(base_g * ao + spec_glow * 0.82, 0, 255)
final_b = np.clip(base_b * ao + spec_glow * 0.70, 0, 255)

alpha = np.clip(edge_falloff * 255.0, 0, 255).astype(np.uint8)
wax_img = Image.fromarray(np.stack([final_r, final_g, final_b, alpha], axis=-1).astype(np.uint8), mode='RGBA')

# 3. Drop Shadow
shadow_mask = Image.fromarray(alpha, mode='L')
shadow = Image.new('RGBA', (W, H), (20, 5, 8, 0))
shadow.paste(Image.new('RGBA', (W, H), (25, 6, 10, 145)), (10, 16), shadow_mask)
shadow = shadow.filter(ImageFilter.GaussianBlur(18))

combined = Image.alpha_composite(shadow, wax_img)

# 4. Debossed Circular Die Groove with Soft Gold Accents
draw = ImageDraw.Draw(combined)
# Outer subtle gold hairline on die ridge
draw.ellipse([cx - 248, cy - 248, cx + 248, cy + 248], outline=(205, 165, 85, 140), width=1)
draw.ellipse([cx - 247, cy - 247, cx + 247, cy + 247], outline=(235, 205, 130, 90), width=1)
draw.ellipse([cx - 232, cy - 232, cx + 232, cy + 232], outline=(175, 135, 65, 75), width=1)

# 5. Monogram Centering & 3D Stamping
mono = Image.open('public/images/monogram_na_gold.png').convert('RGBA')
bbox = mono.getbbox()
mono_cropped = mono.crop(bbox)

# Target height inside seal: 275px
target_h = 275
scale = target_h / mono_cropped.height
target_w = int(mono_cropped.width * scale)
mono_scaled = mono_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Determine the EXACT visual bounding box of the scaled monogram
# Left edge is the swan flourish tip: x = 0
# Right edge is the right serif of A: x = target_w
# The visual center of the entire monogram mark (leftmost tip to rightmost tip) is target_w / 2!
# Let's verify: target_w is the entire span from leftmost flourish to rightmost serif!
# Placing target_w / 2 exactly at cx guarantees that:
# (cx - left_tip) == (right_tip - cx) exactly!
paste_x = int(cx - (target_w / 2.0))
# Vertically, the monogram bbox is from top of N to bottom of rose gold flourish
# Placing target_h / 2 at cy centers it vertically with absolute equality:
paste_y = int(cy - (target_h / 2.0))

print(f"Monogram scaled: {target_w}x{target_h}")
print(f"Monogram pasted at ({paste_x}, {paste_y}) -> center is at ({paste_x + target_w/2}, {paste_y + target_h/2})")
print(f"Left margin to die circle (cx - 248): {paste_x - (cx - 248)}")
print(f"Right margin to die circle (cx + 248): {(cx + 248) - (paste_x + target_w)}")

# Stamped contact shadow
mono_a = mono_scaled.split()[3]
emboss_shadow = Image.new('RGBA', mono_scaled.size, (35, 5, 8, 160))
emboss_shadow.putalpha(mono_a)
emboss_shadow = emboss_shadow.filter(ImageFilter.GaussianBlur(3))
combined.paste(emboss_shadow, (paste_x + 3, paste_y + 4), emboss_shadow)

# Top-left specular gleam (soft warm gold, no white)
emboss_spec = Image.new('RGBA', mono_scaled.size, (245, 220, 160, 110))
emboss_spec.putalpha(mono_a)
combined.paste(emboss_spec, (paste_x - 1, paste_y - 1), emboss_spec)

# Paste the rich gold monogram
combined.paste(mono_scaled, (paste_x, paste_y), mono_scaled)

# 6. Save Wax Seal
combined.save('public/images/seal_wax.png', 'PNG')
print("Successfully generated public/images/seal_wax.png with absolute optical centering")

# 7. Update Crack Overlay
crack_img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
c_draw = ImageDraw.Draw(crack_img)

import random
random.seed(42)

def draw_branch(start_pt, angle, length, depth=0):
    if depth > 4 or length < 8:
        return
    x0, y0 = start_pt
    rad = math.radians(angle)
    x1 = x0 + length * math.cos(rad) + random.uniform(-4, 4)
    y1 = y0 + length * math.sin(rad) + random.uniform(-4, 4)
    
    width = max(1, 4 - depth)
    c_draw.line([(x0, y0), (x1, y1)], fill=(255, 235, 170, 240 - depth*35), width=width)
    c_draw.line([(x0+1, y0+1), (x1+1, y1+1)], fill=(212, 175, 95, 180 - depth*30), width=max(1, width-1))
    
    num_sub = random.choice([1, 2])
    for _ in range(num_sub):
        branch_angle = angle + random.uniform(-35, 35)
        branch_len = length * random.uniform(0.6, 0.8)
        draw_branch((x1, y1), branch_angle, branch_len, depth + 1)

main_angles = [25, 70, 135, 195, 255, 315]
for ang in main_angles:
    draw_branch((cx, cy), ang, random.uniform(60, 95))

c_draw.ellipse([cx - 16, cy - 16, cx + 16, cy + 16], fill=(255, 248, 220, 220))
c_draw.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=(255, 255, 255, 255))
crack_img = crack_img.filter(ImageFilter.GaussianBlur(0.8))

crack_img.save('public/images/seal_crack.png', 'PNG')
print("Successfully generated public/images/seal_crack.png")
