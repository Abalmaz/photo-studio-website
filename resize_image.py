import os
import sys
from PIL import Image, ImageOps


def optimize_portfolio(source_dir, output_dir, max_width=1200, quality=85):
    if not os.path.exists(source_dir):
        print(f"Error: source folder not found: {source_dir}")
        sys.exit(1)

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    processed = 0

    for filename in os.listdir(source_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            img_path = os.path.join(source_dir, filename)

            with Image.open(img_path) as img:
                # Fix orientation if the camera added EXIF rotation tags
                img = ImageOps.exif_transpose(img)

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
                processed += 1

    if processed == 0:
        print(f"No .jpg/.jpeg/.png files found in {source_dir}")
    else:
        print(f"\nDone. {processed} photo(s) converted into {output_dir}")


if __name__ == "__main__":
    VALID_CATEGORIES = ["maternity", "newborn", "cakesmash", "6months"]

    if len(sys.argv) != 2 or sys.argv[1] not in VALID_CATEGORIES:
        print("Usage: python resize_image.py <category>")
        print(f"Valid categories: {', '.join(VALID_CATEGORIES)}")
        sys.exit(1)

    category = sys.argv[1]
    SOURCE_FOLDER = f"./images/raw/{category}"
    OUTPUT_FOLDER = f"./images/{category}"

    optimize_portfolio(SOURCE_FOLDER, OUTPUT_FOLDER, max_width=1200, quality=85)