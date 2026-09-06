import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1440, 2560
cx, cy = W / 2.0, H / 2.0

# Silky Smooth Luxurious Golden Parchment
canvas = Image.new('RGB', (W, H), '#FBF4E4')
draw = ImageDraw.Draw(canvas)

# 1. Multi-layered Smooth Radial Washes
# Base warm ivory/gold gradient
y, x = np.ogrid[:H, :W]
dx = (x - cx) / (W / 2.0)
dy = (y - cy) / (H / 2.0)
r = np.sqrt(dx**2 + dy**2)

# Central radiant glow (soft white-gold core to rich honey-gold border)
t = np.clip(r / 1.25, 0.0, 1.0)
t = t * t * (3 - 2 * t) # smoothstep

# Palette:
# Center: #FFFDF5 (255, 253, 245)
# Mid: #F6E2B3 (246, 226, 179)
# Outer: #DEBA78 (222, 186, 120)
# Corner: #C89C4C (200, 156, 76)
r_chan = (255 * (1 - t) + 210 * t).astype(np.uint8)
g_chan = (253 * (1 - t) + 172 * t).astype(np.uint8)
b_chan = (245 * (1 - t) + 98 * t).astype(np.uint8)

base_img = Image.fromarray(np.stack([r_chan, g_chan, b_chan], axis=-1), mode='RGB')

# 2. Add fine parchment texture (subtle gaussian paper fiber)
paper_noise = np.random.normal(0, 3, (H, W)).astype(np.float32)
paper_noise_img = Image.fromarray(np.clip(paper_noise + 128, 0, 255).astype(np.uint8), mode='L')
paper_noise_img = paper_noise_img.filter(ImageFilter.GaussianBlur(1.5))
p_arr = (np.array(paper_noise_img).astype(np.float32) - 128.0) * 0.03

base_arr = np.array(base_img).astype(np.float32)
for c in range(3):
    base_arr[:, :, c] = np.clip(base_arr[:, :, c] + p_arr * 180, 0, 255)

canvas = Image.fromarray(base_arr.astype(np.uint8), mode='RGB')

# 3. Architectural Golden Mihrab Contour
overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

arch_top = 440
arch_bottom = 2160
arch_w = 540

def get_mihrab_pts(offset_x=0, offset_y=0):
    pts = []
    pts.append((cx - arch_w + offset_x, arch_bottom + offset_y))
    pillar_top_y = arch_top + 480
    pts.append((cx - arch_w + offset_x, pillar_top_y + offset_y))
    
    for i in range(60):
        frac = i / 59.0
        theta = frac * (math.pi / 2.0)
        px = cx - arch_w + offset_x + (arch_w * (1.0 - math.cos(theta)) * 0.92)
        py = pillar_top_y + offset_y - (math.sin(theta) * (pillar_top_y - arch_top))
        pts.append((px, py))
        
    pts.append((cx + offset_x, arch_top + offset_y))
    
    for i in range(60):
        frac = i / 59.0
        theta = (1.0 - frac) * (math.pi / 2.0)
        px = cx + offset_x + (arch_w * math.cos(theta) * 0.92)
        py = pillar_top_y + offset_y - (math.sin(theta) * (pillar_top_y - arch_top))
        pts.append((px, py))
        
    pts.append((cx + arch_w + offset_x, pillar_top_y + offset_y))
    pts.append((cx + arch_w + offset_x, arch_bottom + offset_y))
    return pts

# Triple hairline gold arches
draw.line(get_mihrab_pts(0, 0), fill=(185, 140, 55, 175), width=2)
draw.line(get_mihrab_pts(0, 14), fill=(235, 205, 125, 140), width=1)
draw.line(get_mihrab_pts(0, 22), fill=(195, 150, 65, 80), width=1)

# Apex 8-point geometric star
def draw_star(sx, sy, r_outer, r_inner, fill_color, outline_color):
    star_pts = []
    for i in range(16):
        r_curr = r_outer if i % 2 == 0 else r_inner
        ang = i * (2 * math.pi / 16) - math.pi / 2
        star_pts.append((sx + r_curr * math.cos(ang), sy + r_curr * math.sin(ang)))
    draw.polygon(star_pts, fill=fill_color, outline=outline_color)

draw_star(cx, arch_top - 42, 32, 16, (245, 215, 130, 210), (180, 135, 50, 230))
draw_star(cx, arch_top - 42, 14, 7, (255, 248, 215, 240), (195, 150, 60, 240))

# Soft glowing stardust motes
import random
random.seed(1448)
for _ in range(120):
    mx = random.uniform(100, W - 100)
    my = random.uniform(150, H - 150)
    m_rad = random.uniform(2, 5)
    m_alpha = random.randint(50, 160)
    draw.ellipse([mx - m_rad*2, my - m_rad*2, mx + m_rad*2, my + m_rad*2], fill=(255, 240, 185, m_alpha // 3))
    draw.ellipse([mx - m_rad, my - m_rad, mx + m_rad, my + m_rad], fill=(255, 252, 230, m_alpha))

overlay_smooth = overlay.filter(ImageFilter.GaussianBlur(0.5))
canvas = Image.alpha_composite(canvas.convert('RGBA'), overlay_smooth).convert('RGB')

# Golden floral corners
try:
    fc = Image.open('public/images/floral_corner_trans.png').convert('RGBA')
    fc_arr = np.array(fc, dtype=np.float32)
    # Warm golden/bronze duotone
    lum = (fc_arr[:, :, 0] * 0.299 + fc_arr[:, :, 1] * 0.587 + fc_arr[:, :, 2] * 0.114)
    # Map luminance to warm gold: (215, 175, 95)
    fc_arr[:, :, 0] = np.clip(lum * (215.0 / 255.0) + 35, 0, 255)
    fc_arr[:, :, 1] = np.clip(lum * (175.0 / 255.0) + 20, 0, 255)
    fc_arr[:, :, 2] = np.clip(lum * (95.0 / 255.0) + 10, 0, 255)
    fc_arr[:, :, 3] = fc_arr[:, :, 3] * 0.38
    fc_gold = Image.fromarray(fc_arr.astype(np.uint8), mode='RGBA')
    
    fc_w = int(W * 0.46)
    fc_h = int(fc.height * (fc_w / fc.width))
    fc_scaled = fc_gold.resize((fc_w, fc_h), Image.Resampling.LANCZOS)
    
    canvas.paste(fc_scaled, (0, 0), fc_scaled)
    canvas.paste(fc_scaled.transpose(Image.Transpose.FLIP_LEFT_RIGHT), (W - fc_w, 0), fc_scaled.transpose(Image.Transpose.FLIP_LEFT_RIGHT))
    canvas.paste(fc_scaled.transpose(Image.Transpose.FLIP_TOP_BOTTOM), (0, H - fc_h), fc_scaled.transpose(Image.Transpose.FLIP_TOP_BOTTOM))
    canvas.paste(fc_scaled.transpose(Image.Transpose.FLIP_LEFT_RIGHT).transpose(Image.Transpose.FLIP_TOP_BOTTOM), (W - fc_w, H - fc_h), fc_scaled.transpose(Image.Transpose.FLIP_LEFT_RIGHT).transpose(Image.Transpose.FLIP_TOP_BOTTOM))
except Exception as e:
    print("Floral note:", e)

canvas.save('public/images/bg_phase_verse.jpg', quality=96, optimize=True)
print("Successfully generated silky golden bg_phase_verse.jpg")
