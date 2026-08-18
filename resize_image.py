import os
from PIL import Image


def optimize_portfolio(source_dir, output_dir, max_width=1200, quality=80):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(source_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            img_path = os.path.join(source_dir, filename)

            with Image.open(img_path) as img:
                # Fix orientation if the camera added EXIF rotation tags
                img = Image.ops.exif_transpose(img) if hasattr(Image, 'ops') else img

                # Check dimensions and scale down if it's a massive raw export
                width, height = img.size
                if width > max_width:
                    scale_ratio = max_width / float(width)
                    new_height = int(float(height) * float(scale_ratio))
                    # Use Resampling.LANCZOS for high-quality portfolio downscaling
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

                # Generate the new .webp filename
                base_name = os.path.splitext(filename)[0]
                output_path = os.path.join(output_dir, f"{base_name}.webp")

                # Save as WebP with optimized lossy compression
                img.save(output_path, "WEBP", quality=quality, optimize=True)
                print(f"Optimized: {filename} -> {base_name}.webp")


if __name__ == "__main__":
    # Adjust these paths to match your folder structure
    SOURCE_FOLDER = "./images/raw/cakesmash"
    OUTPUT_FOLDER = "./images/cakesmash"

    optimize_portfolio(SOURCE_FOLDER, OUTPUT_FOLDER, max_width=1200, quality=85)