export type GalleryVisibility = 'Public' | 'Private' | 'Client Review' | 'Draft';

export type GalleryType = 'Wedding' | 'Portfolio' | 'Event' | 'Corporate' | 'Personal';

export interface CreateGalleryPayload {
  name: string;
  description: string;
  type: GalleryType;
  visibility: GalleryVisibility;
  tags: string[];
}

export interface CreatedGalleryRow {
  id: number;
  name: string;
  type: GalleryVisibility;
  photos: number;
  views: number;
  status: 'Draft' | 'Active' | 'Published';
  lastUpdated: string;
}

export interface CreateGalleryResult {
  success: boolean;
  gallery?: CreatedGalleryRow;
  error?: string;
}

export const GALLERY_TYPE_OPTIONS: GalleryType[] = [
  'Wedding',
  'Portfolio',
  'Event',
  'Corporate',
  'Personal',
];

export const GALLERY_VISIBILITY_OPTIONS: GalleryVisibility[] = [
  'Public',
  'Private',
  'Client Review',
  'Draft',
];

export const DEFAULT_CREATE_GALLERY_FORM: CreateGalleryPayload = {
  name: 'Gallery from the reception and ceremony',
  description: 'This is a wedding gallery from Adeola Feracho',
  type: 'Wedding',
  visibility: 'Public',
  tags: ['wedding', 'reception', 'ceremony'],
};

function getStatusFromVisibility(visibility: GalleryVisibility): CreatedGalleryRow['status'] {
  if (visibility === 'Draft') {
    return 'Draft';
  }

  if (visibility === 'Public') {
    return 'Published';
  }

  return 'Active';
}

export async function createGallery(payload: CreateGalleryPayload): Promise<CreateGalleryResult> {
  const trimmedName = payload.name.trim();

  if (!trimmedName) {
    return {
      success: false,
      error: 'Gallery name is required.',
    };
  }

  // Simulate request latency while keeping the API surface backend-ready.
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    gallery: {
      id: Date.now(),
      name: trimmedName,
      type: payload.visibility,
      photos: 0,
      views: 0,
      status: getStatusFromVisibility(payload.visibility),
      lastUpdated: 'Just now',
    },
  };
}
