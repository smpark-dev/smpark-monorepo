import fs from 'fs/promises';

import createError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import path, { dirname } from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import env from '@configs/env';
import ClientsRepository from '@repository/UserRepository';

interface ImageData {
  name: string;
  data: string;
  blurDataUrl: string;
}

const verifyToken = <T>(token: string, jwtSecretKey: string): T => {
  try {
    return jwt.verify(token, jwtSecretKey) as T;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw createError(401, 'Token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw createError(401, 'Invalid token');
    }
    throw error;
  }
};

const generateBlurDataUrl = async (imageBuffer: Buffer): Promise<string> => {
  const blurredImage = await sharp(imageBuffer)
    .resize(10, 10, { fit: 'inside' })
    .blur(5)
    .toBuffer();

  return `data:image/jpeg;base64,${blurredImage.toString('base64')}`;
};

const getMimeType = (ext: string): string => {
  switch (ext.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    default:
      return 'image/jpeg';
  }
};

export const getImages = async (
  token: string,
  secretKey: string,
  client: ClientsRepository,
): Promise<ImageData[]> => {
  try {
    const decoded = verifyToken<JwtPayload>(token, secretKey);

    if (!decoded.sub) {
      throw createError(401, 'Invalid token: sub claim missing');
    }

    const result = await client.findById(decoded.sub);
    if (!result) {
      throw createError(404, 'User not found');
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const imagesDir = path.join(
      __dirname,
      env.nodeEnv === 'development' ? '../assets/images' : 'src/assets/images',
    );

    try {
      await fs.access(imagesDir);
    } catch {
      throw createError(500, 'Images directory not found');
    }

    const files = await fs.readdir(imagesDir);

    if (!files.length) {
      return [];
    }

    const images = await Promise.all(
      files
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        })
        .map(async (file) => {
          try {
            const imageBuffer = await fs.readFile(path.join(imagesDir, file));
            const ext = path.extname(file);
            const blurDataUrl = await generateBlurDataUrl(imageBuffer);

            return {
              name: file,
              data: `data:${getMimeType(ext)};base64,${imageBuffer.toString('base64')}`,
              blurDataUrl,
            };
          } catch (error) {
            console.error(`Failed to read image ${file}:`, error);
            return null;
          }
        }),
    );

    return images.filter((image): image is ImageData => image !== null);
  } catch (error) {
    if (createError.isHttpError(error)) throw error;
    throw createError(500, 'Internal server error');
  }
};
