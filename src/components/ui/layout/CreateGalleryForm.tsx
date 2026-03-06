'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreateGalleryPayload,
  DEFAULT_CREATE_GALLERY_FORM,
  GALLERY_TYPE_OPTIONS,
  GALLERY_VISIBILITY_OPTIONS,
} from '@/lib/gallery-create-contract';

interface FormErrors {
  name?: string;
  description?: string;
  tags?: string;
}

/**
 * Props for the reusable CreateGalleryForm component.
 */
export interface CreateGalleryFormProps {
  initialValues?: Partial<CreateGalleryPayload>;
  isSubmitting?: boolean;
  onSubmit: (values: CreateGalleryPayload) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  className?: string;
}

function normalizeTags(input: string): string[] {
  return input
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 15);
}

/**
 * Reusable form for creating a new gallery.
 *
 * @example
 * ```tsx
 * <CreateGalleryForm
 *   onSubmit={async (payload) => {
 *     await createGallery(payload);
 *   }}
 * />
 * ```
 */
export function CreateGalleryForm({
  initialValues,
  isSubmitting = false,
  onSubmit,
  onCancel,
  submitLabel = 'Create Gallery',
  cancelLabel = 'Cancel',
  showCancel = true,
  className = '',
}: CreateGalleryFormProps) {
  const mergedInitialValues = useMemo<CreateGalleryPayload>(
    () => ({
      ...DEFAULT_CREATE_GALLERY_FORM,
      ...initialValues,
      tags: initialValues?.tags ?? DEFAULT_CREATE_GALLERY_FORM.tags,
    }),
    [initialValues],
  );

  const [name, setName] = useState(mergedInitialValues.name);
  const [description, setDescription] = useState(mergedInitialValues.description);
  const [type, setType] = useState(mergedInitialValues.type);
  const [visibility, setVisibility] = useState(mergedInitialValues.visibility);
  const [tagsInput, setTagsInput] = useState(mergedInitialValues.tags.join(', '));
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const parsedTags = normalizeTags(tagsInput);

    if (!name.trim()) {
      nextErrors.name = 'Gallery name is required.';
    } else if (name.trim().length < 3) {
      nextErrors.name = 'Gallery name must be at least 3 characters.';
    }

    if (description.trim().length > 500) {
      nextErrors.description = 'Description must be 500 characters or fewer.';
    }

    if (parsedTags.length === 0) {
      nextErrors.tags = 'Add at least one tag.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit({
      name: name.trim(),
      description: description.trim(),
      type,
      visibility,
      tags: normalizeTags(tagsInput),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`card-base p-6 ${className}`} noValidate>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <label htmlFor="gallery-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Gallery Name
          </label>
          <input
            id="gallery-name"
            type="text"
            className="form-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'gallery-name-error' : undefined}
            placeholder="Wedding - Adeola & Feracho"
          />
          {errors.name && (
            <p id="gallery-name-error" className="text-sm text-red-600 mt-2">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="gallery-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Gallery Type
          </label>
          <select
            id="gallery-type"
            className="form-select"
            value={type}
            onChange={(event) => setType(event.target.value as CreateGalleryPayload['type'])}
          >
            {GALLERY_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gallery-visibility" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Visibility
          </label>
          <select
            id="gallery-visibility"
            className="form-select"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as CreateGalleryPayload['visibility'])}
          >
            {GALLERY_VISIBILITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="gallery-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Description
          </label>
          <textarea
            id="gallery-description"
            className="form-input min-h-28"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'gallery-description-error' : undefined}
            placeholder="Short summary for clients and collaborators"
            maxLength={500}
          />
          {errors.description && (
            <p id="gallery-description-error" className="text-sm text-red-600 mt-2">
              {errors.description}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="gallery-tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tags (comma-separated)
          </label>
          <input
            id="gallery-tags"
            type="text"
            className="form-input"
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
            aria-invalid={Boolean(errors.tags)}
            aria-describedby={errors.tags ? 'gallery-tags-error' : undefined}
            placeholder="wedding, reception, ceremony"
          />
          {errors.tags && (
            <p id="gallery-tags-error" className="text-sm text-red-600 mt-2">
              {errors.tags}
            </p>
          )}
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button type="submit" disabled={isSubmitting} className="btn-primary sm:flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Creating...' : submitLabel}
        </button>
        {showCancel && onCancel && (
          <button type="button" disabled={isSubmitting} onClick={onCancel} className="btn-secondary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
            {cancelLabel}
          </button>
        )}
      </div>
    </form>
  );
}
