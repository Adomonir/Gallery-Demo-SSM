'use client';

import { motion } from 'framer-motion';
import { Eye, Edit, Trash2 } from 'lucide-react';

/**
 * Shape for a single gallery row in the recent galleries table.
 */
export interface RecentGalleryRow {
  id: number | string;
  name: string;
  type: string;
  photos: number;
  views: number;
  status: string;
  lastUpdated: string;
}

/**
 * Props for RecentGalleriesTable.
 */
export interface RecentGalleriesTableProps {
  galleries: RecentGalleryRow[];
  className?: string;
  emptyMessage?: string;
  showActions?: boolean;
}

function getTypeBadgeClass(type: string): string {
  if (type === 'Client Review') return 'status-private';
  if (type === 'Public') return 'status-active';
  if (type === 'Portfolio') return 'status-private';
  return 'status-draft';
}

function getStatusBadgeClass(status: string): string {
  return status === 'Active' || status === 'Published' ? 'status-active' : 'status-draft';
}

/**
 * Reusable table for displaying recent galleries in dashboard-style views.
 *
 * @example
 * ```tsx
 * <SectionTitle title="Recent Galleries" viewAllLink="/admin/galleries" />
 * <RecentGalleriesTable galleries={recentGalleries} />
 * ```
 */
export function RecentGalleriesTable({
  galleries,
  className = '',
  emptyMessage = 'No galleries found.',
  showActions = true,
}: RecentGalleriesTableProps) {
  return (
    <div className={`card-base overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Gallery Name</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Type</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Photos</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Views</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Status</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Last Updated</th>
              {showActions && (
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {galleries.length === 0 && (
              <tr className="table-row">
                <td
                  colSpan={showActions ? 7 : 6}
                  className="py-8 px-6 text-center text-slate-600 dark:text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {galleries.map((gallery, index) => (
              <motion.tr
                key={gallery.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className="table-row"
              >
                <td className="py-4 px-6">
                  <div className="font-medium text-slate-900 dark:text-white">{gallery.name}</div>
                </td>
                <td className="py-4 px-6">
                  <span className={`status-badge ${getTypeBadgeClass(gallery.type)}`}>{gallery.type}</span>
                </td>
                <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{gallery.photos}</td>
                <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                  {gallery.views.toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <span className={`status-badge ${getStatusBadgeClass(gallery.status)}`}>{gallery.status}</span>
                </td>
                <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{gallery.lastUpdated}</td>
                {showActions && (
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="btn-icon" aria-label={`View ${gallery.name}`}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="btn-icon btn-icon-success" aria-label={`Edit ${gallery.name}`}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="btn-icon btn-icon-danger" aria-label={`Delete ${gallery.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
