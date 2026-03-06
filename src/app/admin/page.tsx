"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Users, Plus, Settings, X } from "lucide-react";
import Link from "next/link";
import {
  Hero,
  SectionContainer,
  SectionTitle,
  FeatureCard,
  StatsGrid,
  RecentGalleriesTable,
  CreateGalleryForm,
} from "@/components/ui";
import { dashboardStats, recentGalleries } from "@/lib/mock-admin-data";
import { createGallery, CreateGalleryPayload } from "@/lib/gallery-create-contract";

export default function AdminPage() {
  const [galleries, setGalleries] = useState(recentGalleries);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCreateGallery = async (payload: CreateGalleryPayload) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await createGallery(payload);

    if (!result.success || !result.gallery) {
      setSubmitError(result.error ?? "Unable to create gallery right now.");
      setIsSubmitting(false);
      return;
    }

    setGalleries((prev) => [result.gallery, ...prev]);
    setIsSubmitting(false);
    setIsCreateOpen(false);
  };

  return (
    <div className="page-gradient">
      <Hero
        title="Admin Dashboard"
        description="Manage your galleries, clients, and portfolio"
      />
      
      <SectionContainer>
        <div className="flex justify-end mb-6">
          <Dialog.Root open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <Dialog.Trigger asChild>
              <button className="btn-primary flex items-center gap-2" type="button">
                <Plus className="h-4 w-4" />
                New Gallery
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-3xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-white dark:bg-slate-900 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-2xl font-bold text-slate-900 dark:text-white">
                    Create New Gallery
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button type="button" className="btn-icon" aria-label="Close create gallery modal">
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {submitError && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3" role="alert">
                    {submitError}
                  </div>
                )}

                <CreateGalleryForm
                  isSubmitting={isSubmitting}
                  onSubmit={handleCreateGallery}
                  onCancel={() => setIsCreateOpen(false)}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Stats Grid */}
        <SectionTitle title="Stats Overview" className="mb-6" />
        <StatsGrid stats={dashboardStats} />

        {/* Quick Actions */}
        <SectionTitle title="Quick Actions" />
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/upload" className="block">
            <FeatureCard 
              icon={Plus}
              title="Upload Photos"
              description="Add new photos to your galleries with automatic optimization"
              iconColor="text-blue-600"
            />
          </Link>

          <FeatureCard 
            icon={Users}
            title="Manage Clients"
            description="Add clients and manage access to private galleries"
            iconColor="text-green-600"
          />

          <FeatureCard 
            icon={Settings}
            title="Settings"
            description="Configure your portfolio, branding, and preferences"
            iconColor="text-purple-600"
          />
        </div>

        {/* Galleries Table */}
        <SectionTitle title="Recent Galleries" viewAllLink="/admin/galleries" />
        <RecentGalleriesTable galleries={galleries} />
      </SectionContainer>
    </div>
  );
}
