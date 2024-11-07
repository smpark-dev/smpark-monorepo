import fs from 'fs/promises';

import createError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import ClientsRepository from '@repository/UserRepository';

interface ImageData {
  name: string;
  data: string;
}

const verifyToken = <T>(token: string, jwtSecretKey: string): T => {
  return jwt.verify(token, jwtSecretKey) as T;
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
    const imagesDir = path.join(__dirname, '../../public/images');

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
            const image = await fs.readFile(path.join(imagesDir, file));
            const ext = path.extname(file);
            return {
              name: file,
              data: `data:${getMimeType(ext)};base64,${image.toString('base64')}`,
            };
          } catch (error) {
            console.error(`Failed to read image ${file}:`, error);
            return null;
          }
        }),
    );

    return images.filter((image): image is { name: string; data: string } => image !== null);
  } catch (error) {
    if (createError.isHttpError(error)) throw error;
    throw createError(500, 'Internal server error');
  }
};
