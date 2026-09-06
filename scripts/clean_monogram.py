from PIL import Image, ImageFilter
import numpy as np

im = Image.open('public/images/monogram_na_gold.png').convert('RGBA')
arr = np.array(im, dtype=np.float32)

r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Pixels with significant white/light-gray content
is_white_halo = (r > 205) & (g > 195) & (b > 185) & (a > 10)

# Erode alpha slightly or replace RGB with rich gold
# Pure gold color: R=218, G=175, B=95
# Replace white halo color with warm gold/bronze tone
arr[is_white_halo, 0] = 215.0
arr[is_white_halo, 1] = 170.0
arr[is_white_halo, 2] = 85.0
# And reduce its alpha if it's outer fringe
arr[is_white_halo, 3] = np.clip(arr[is_white_halo, 3] * 0.7, 0, 255)

# Tighten alpha
new_im = Image.fromarray(arr.astype(np.uint8), mode='RGBA')
new_im.save('public/images/monogram_na_gold.png', 'PNG')
print('Cleaned monogram_na_gold.png')
