import { storeApiClient } from '@/shared/api';

export interface IGalleryImage {
  name: string;
  data: string;
  blurDataUrl: string;
}

export const galleryApi = {
  getAllImages: async (): Promise<IGalleryImage[]> => {
    const response = await storeApiClient.get('/service/image');
    return response.data;
  },
};
