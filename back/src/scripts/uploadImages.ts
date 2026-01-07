import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const directoryPath = path.join(__dirname, "../../public/FoodImages");

async function uploadFiles() {
  try {
    const files = fs.readdirSync(directoryPath);
    console.log(`${files.length} images found. Starting upload...`);

    for (const file of files) {
      const result = await cloudinary.uploader.upload(
        path.join(directoryPath, file),
        {
          folder: "FoodImages",
          use_filename: true,
          unique_filename: false,
        }
      );
      console.log(`Success : ${file} -> ${result.secure_url}`);
    }
  } catch (err) {
    console.error("Error uploading :", err);
  }
}

uploadFiles();
