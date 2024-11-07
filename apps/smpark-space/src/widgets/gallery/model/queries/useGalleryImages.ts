import { useQuery } from '@/shared/lib/react-query/queryClients';
import { IGalleryImage, galleryApi } from '@/widgets/gallery/api/galleryApi';

export const useGalleryImages = (enabled: boolean) => {
  return useQuery<IGalleryImage[]>({
    queryKey: ['gallery'],
    queryFn: galleryApi.getAllImages,
    enabled,
  });
};
