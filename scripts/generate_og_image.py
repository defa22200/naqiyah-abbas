import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

W, H = 1200, 630

# Base canvas
canvas = Image.new('RGB', (W, H), '#FDFBF7')
draw = ImageDraw.Draw(canvas)

# 1. Subtle radial gradient / vignette
vignette = Image.new('RGBA', (W, H), (0, 0, 0, 0))
v_draw = ImageDraw.Draw(vignette)
cx, cy = W / 2, H / 2
max_dist = math.sqrt(cx*cx + cy*cy)

# Subtle warm wash
for y in range(0, H, 2):
    for x in range(0, W, 2):
        dist = math.sqrt((x - cx)**2 + (y - cy)**2) / max_dist
        alpha = int(dist * 35)
        v_draw.point((x, y), fill=(215, 195, 170, alpha))
        v_draw.point((x+1, y), fill=(215, 195, 170, alpha))
        v_draw.point((x, y+1), fill=(215, 195, 170, alpha))
        v_draw.point((x+1, y+1), fill=(215, 195, 170, alpha))

canvas.paste(Image.alpha_composite(canvas.convert('RGBA'), vignette).convert('RGB'))

# 2. Add soft floral corners
try:
    fc = Image.open('public/images/floral_corner_trans.png').convert('RGBA')
    fc_w = int(fc.width * 0.45)
    fc_h = int(fc.height * 0.45)
    fc_scaled = fc.resize((fc_w, fc_h), Image.Resampling.LANCZOS)
    
    r, g, b, a = fc_scaled.split()
    a = a.point(lambda p: int(p * 0.35))
    fc_faded = Image.merge('RGBA', (r, g, b, a))
    
    # Paste top-left
    canvas.paste(fc_faded, (10, 10), fc_faded)
    
    # Paste top-right (horizontal flip)
    fc_tr = fc_faded.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    canvas.paste(fc_tr, (W - fc_w - 10, 10), fc_tr)
    
    # Paste bottom-left (vertical flip)
    fc_bl = fc_faded.transpose(Image.Transpose.FLIP_TOP_BOTTOM)
    canvas.paste(fc_bl, (10, H - fc_h - 10), fc_bl)
    
    # Paste bottom-right (both flip)
    fc_br = fc_tr.transpose(Image.Transpose.FLIP_TOP_BOTTOM)
    canvas.paste(fc_br, (W - fc_w - 10, H - fc_h - 10), fc_br)
except Exception as e:
    print("Corner florals note:", e)

# 3. Gold ornate border
draw = ImageDraw.Draw(canvas)
gold_primary = (197, 160, 89)   # #C5A059
gold_soft = (222, 195, 138)     # #DEC38A
gold_deep = (168, 130, 60)

# Outer hairline
draw.rectangle([32, 32, W - 32, H - 32], outline=gold_soft, width=1)
# Inner line
draw.rectangle([38, 38, W - 38, H - 38], outline=gold_primary, width=2)
# Second inner hairline
draw.rectangle([44, 44, W - 44, H - 44], outline=gold_soft, width=1)

# Corner diamond accents
corner_pts = [
    (38, 38), (W - 38, 38), (38, H - 38), (W - 38, H - 38)
]
for cpx, cpy in corner_pts:
    d_size = 7
    diamond = [
        (cpx, cpy - d_size),
        (cpx + d_size, cpy),
        (cpx, cpy + d_size),
        (cpx - d_size, cpy)
    ]
    draw.polygon(diamond, fill=gold_deep, outline=gold_primary)

# 4. Monogram
try:
    mono = Image.open('public/images/monogram_na_gold.png').convert('RGBA')
    mono_h = 100
    mono_w = int(mono.width * (mono_h / mono.height))
    mono_resized = mono.resize((mono_w, mono_h), Image.Resampling.LANCZOS)
    mono_x = (W - mono_w) // 2
    mono_y = 65
    canvas.paste(mono_resized, (mono_x, mono_y), mono_resized)
except Exception as e:
    print("Monogram note:", e)

# 5. Fonts
font_sub_caps = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 13)
font_names = ImageFont.truetype('/tmp/Allura-Regular.ttf', 92)
font_dates = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 20)
font_hijri = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Italic.ttf', 16)
font_tagline = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 13)

# Text 1: Header tracked
header_text = "T H E   W E D D I N G   C E L E B R A T I O N S   O F"
bbox = draw.textbbox((0, 0), header_text, font=font_sub_caps)
tw = bbox[2] - bbox[0]
draw.text(((W - tw) // 2, 182), header_text, fill=(158, 130, 95), font=font_sub_caps)

# Text 2: Couple Names in Calligraphy
names_text = "Naqiyah & Abbas"
bbox_names = draw.textbbox((0, 0), names_text, font=font_names)
nw = bbox_names[2] - bbox_names[0]
nx = (W - nw) // 2
ny = 208

# Soft warm shadow
draw.text((nx + 2, ny + 2), names_text, fill=(215, 195, 175), font=font_names)
draw.text((nx, ny), names_text, fill=(42, 14, 26), font=font_names)  # deep royal ink-plum

# 6. Flourish Divider
try:
    flourish = Image.open('public/images/divider_flourish.png').convert('RGBA')
    fl_w = 340
    fl_h = int(flourish.height * (fl_w / flourish.width))
    fl_resized = flourish.resize((fl_w, fl_h), Image.Resampling.LANCZOS)
    fl_x = (W - fl_w) // 2
    fl_y = 352
    canvas.paste(fl_resized, (fl_x, fl_y), fl_resized)
except Exception as e:
    print("Flourish note:", e)

# Text 3: Dates & City
dates_text = "1 8  –  1 9   D E C E M B E R   2 0 2 6   ·   N A G P U R"
bbox_dates = draw.textbbox((0, 0), dates_text, font=font_dates)
dw = bbox_dates[2] - bbox_dates[0]
draw.text(((W - dw) // 2, 404), dates_text, fill=(90, 45, 62), font=font_dates)

# Text 4: Hijri Date
hijri_text = "10–11 Shehre Rajab al-Asab 1448 H"
bbox_hijri = draw.textbbox((0, 0), hijri_text, font=font_hijri)
hw = bbox_hijri[2] - bbox_hijri[0]
draw.text(((W - hw) // 2, 448), hijri_text, fill=(140, 115, 85), font=font_hijri)

# Text 5: Events summary
events_text = "Nikah  ·  Celebration of Love  ·  Reception"
bbox_ev = draw.textbbox((0, 0), events_text, font=font_tagline)
ew = bbox_ev[2] - bbox_ev[0]
draw.text(((W - ew) // 2, 492), events_text, fill=(160, 135, 100), font=font_tagline)

# Text 6: Subtle family blessing tagline at bottom
tagline_text = "Two Families  ·  Two Hearts  ·  One Beautiful Beginning"
bbox_tag = draw.textbbox((0, 0), tagline_text, font=font_sub_caps)
tag_w = bbox_tag[2] - bbox_tag[0]
draw.text(((W - tag_w) // 2, 545), tagline_text, fill=(185, 160, 130), font=font_sub_caps)

canvas.save('public/og/og_image.jpg', quality=95, optimize=True)
print("Successfully generated public/og/og_image.jpg (1200x630)")
