'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hero, SectionContainer, SectionTitle, CreateGalleryForm } from '@/components/ui';
import { createGallery, CreateGalleryPayload } from '@/lib/gallery-create-contract';

export default function NewGalleryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (payload: CreateGalleryPayload) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await createGallery(payload);

    if (!result.success) {
      setSubmitError(result.error ?? 'Unable to create gallery right now.');
      setIsSubmitting(false);
      return;
    }

    router.push('/admin');
  };

  return (
    <div className="page-gradient">
      <Hero
        title="Create New Gallery"
        description="Set up a new gallery and configure its visibility before you upload photos."
      />

      <SectionContainer>
        <SectionTitle title="Gallery Details" />
        {submitError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3" role="alert">
            {submitError}
          </div>
        )}
        <CreateGalleryForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin')}
        />
      </SectionContainer>
    </div>
  );
}
