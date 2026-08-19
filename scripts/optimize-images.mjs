import fs from "fs";
import path from "path";
import sharp from "sharp";

const assetsDir = path.join(process.cwd(), "src", "assets");

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  let totalSaved = 0;

  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const inputPath = path.join(assetsDir, file);
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      const outputPath = path.join(assetsDir, `${basename}.webp`);

      const inputStats = fs.statSync(inputPath);
      const originalSize = inputStats.size;

      try {
        await sharp(inputPath).webp({ quality: 85, effort: 6 }).toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const newSize = outputStats.size;

        const saved = originalSize - newSize;
        totalSaved += saved;

        console.log(
          `Optimized ${file}: ${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB (Saved ${(saved / 1024).toFixed(1)}KB)`,
        );

        // Remove original to save space and force updating imports
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }

  console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
