import { storeApiClient } from '@/shared/api';

export interface IGalleryImage {
  name: string;
  data: string;
}

export const galleryApi = {
  getAllImages: (): Promise<IGalleryImage[]> => storeApiClient.get('/service/image'),
};
