import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, Upload } from 'lucide-react';
import { Show, updateShow, CreateShowPayload, UpdateShowPayload, Tag } from '../lib/api';
import { useAuth } from '../lib/AuthContext';
import { TagInput } from './TagInput';

interface EditShowModalProps {
    show: Show;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const DAYS_OF_WEEK = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
];

export const EditShowModal: React.FC<EditShowModalProps> = ({ show, isOpen, onClose, onSuccess }) => {
    const { accessToken } = useAuth();
    const [formData, setFormData] = useState({
        title: show.title,
        description: show.description,
        thumbnail: null as File | null,
        is_recurring: show.is_recurring,
        recurrence_type: show.recurrence_type || undefined,
        day_of_week: show.day_of_week ?? undefined,
        scheduled_time: show.scheduled_time || '',
        status: show.status as 'draft' | 'published' | 'archived',
        tags: show.tags || [] as Tag[],
        external_link: show.external_link || '',
        link_platform: show.link_platform || ''
    });

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(show.thumbnail);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset form when show changes
    useEffect(() => {
        setFormData({
            title: show.title,
            description: show.description,
            thumbnail: null,
            is_recurring: show.is_recurring,
            recurrence_type: show.recurrence_type || undefined,
            day_of_week: show.day_of_week ?? undefined,
            scheduled_time: show.scheduled_time || '',
            status: show.status as 'draft' | 'published' | 'archived',
            tags: show.tags || [],
            external_link: show.external_link || '',
            link_platform: show.link_platform || ''
        });
        setThumbnailPreview(show.thumbnail);
        setError(null);
    }, [show]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, thumbnail: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!accessToken) return;

        // Validation
        if (!formData.title.trim() || formData.title.length < 3) {
            setError('Title must be at least 3 characters');
            return;
        }

        if (!formData.description.trim() || formData.description.length < 10) {
            setError('Description must be at least 10 characters');
            return;
        }

        if (formData.is_recurring) {
            if (!formData.recurrence_type) {
                setError('Please select a recurrence pattern');
                return;
            }
            if (formData.recurrence_type === 'SPECIFIC_DAY' && formData.day_of_week === undefined) {
                setError('Please select a day of the week for specific day recurrence');
                return;
            }
            if (!formData.scheduled_time) {
                setError('Please select a time for recurring shows');
                return;
            }
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const payload: UpdateShowPayload = {
                title: formData.title,
                description: formData.description,
                is_recurring: formData.is_recurring,
                status: formData.status,
                tag_ids: formData.tags.map(t => t.id),
                external_link: formData.external_link,
                link_platform: formData.link_platform as any
            };

            if (formData.thumbnail) {
                payload.thumbnail = formData.thumbnail;
            }
            if (formData.is_recurring) {
                payload.recurrence_type = formData.recurrence_type;
                if (formData.recurrence_type === 'SPECIFIC_DAY') {
                    payload.day_of_week = formData.day_of_week;
                }
                payload.scheduled_time = formData.scheduled_time;
            }

            await updateShow(show.slug, payload, accessToken);
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to update show');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-canvas rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-canvas border-b border-borderSubtle px-8 py-6 flex items-center justify-between rounded-t-3xl z-10">
                    <h2 className="text-2xl font-bold text-ink">Edit Show</h2>
                    <button
                        onClick={onClose}
                        className="text-inkLight hover:text-ink transition-colors"
                        disabled={isSubmitting}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">
                            Show Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Bitcoin Deep Dive"
                            className="w-full px-4 py-3 bg-surface border border-borderSubtle rounded-xl text-ink placeholder:text-inkLight/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            placeholder="Describe your show..."
                            className="w-full px-4 py-3 bg-surface border border-borderSubtle rounded-xl text-ink placeholder:text-inkLight/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">Thumbnail</label>
                        <div className="flex items-center gap-4">
                            {thumbnailPreview && (
                                <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-borderSubtle">
                                    <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <label className="flex-1 flex items-center gap-3 px-4 py-3 bg-surface border border-borderSubtle rounded-xl cursor-pointer hover:bg-surface-hover transition-colors">
                                <Upload className="w-5 h-5 text-inkLight" />
                                <span className="text-sm text-inkLight">
                                    {formData.thumbnail ? formData.thumbnail.name : 'Upload new thumbnail (optional)'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">Tags</label>
                        <TagInput
                            selectedTags={formData.tags}
                            onChange={(tags) => setFormData({ ...formData, tags })}
                            placeholder="Add tags (Bitcoin, Stacks, etc.)"
                        />
                    </div>

                    {/* External Link (Watch Now) */}
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">
                            Watch Now Link <span className="text-inkLight/50 font-normal">(Optional)</span>
                        </label>
                        <div className="space-y-3">
                            <select
                                value={formData.link_platform}
                                onChange={(e) => setFormData({ ...formData, link_platform: e.target.value as any })}
                                className="w-full bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-gold transition-colors text-ink"
                            >
                                <option value="">Select Platform</option>
                                <option value="youtube">YouTube</option>
                                <option value="twitter">Twitter/X</option>
                                <option value="twitch">Twitch</option>
                                <option value="rumble">Rumble</option>
                                <option value="kick">Kick</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="url"
                                value={formData.external_link}
                                onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-gold transition-colors text-ink"
                            />
                        </div>
                    </div>

                    {/* Recurring Show */}
                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="checkbox"
                            checked={formData.is_recurring}
                            onChange={(e) => setFormData({ ...formData, is_recurring: e.target.checked })}
                            className="w-5 h-5 rounded border-borderSubtle text-gold focus:ring-2 focus:ring-gold/20"
                        />
                        <label className="text-sm font-bold text-ink">This is a recurring show</label>
                    </div>

                    {/* Recurring Details */}
                    {formData.is_recurring && (
                        <div className="space-y-4 pl-8 border-l-2 border-gold/20">
                            {/* Recurrence Pattern */}
                            <div>
                                <label className="block text-sm font-bold text-ink mb-2">Recurrence Pattern</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, recurrence_type: 'DAILY', day_of_week: undefined })}
                                        className={`py-2 px-3 rounded-lg text-sm font-bold transition-colors ${formData.recurrence_type === 'DAILY'
                                            ? 'bg-gold text-white'
                                            : 'bg-surface border border-borderSubtle text-inkLight hover:border-gold'
                                            }`}
                                    >
                                        Daily
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, recurrence_type: 'WEEKDAYS', day_of_week: undefined })}
                                        className={`py-2 px-3 rounded-lg text-sm font-bold transition-colors ${formData.recurrence_type === 'WEEKDAYS'
                                            ? 'bg-gold text-white'
                                            : 'bg-surface border border-borderSubtle text-inkLight hover:border-gold'
                                            }`}
                                    >
                                        Weekdays
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, recurrence_type: 'WEEKENDS', day_of_week: undefined })}
                                        className={`py-2 px-3 rounded-lg text-sm font-bold transition-colors ${formData.recurrence_type === 'WEEKENDS'
                                            ? 'bg-gold text-white'
                                            : 'bg-surface border border-borderSubtle text-inkLight hover:border-gold'
                                            }`}
                                    >
                                        Weekends
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, recurrence_type: 'SPECIFIC_DAY' })}
                                        className={`py-2 px-3 rounded-lg text-sm font-bold transition-colors ${formData.recurrence_type === 'SPECIFIC_DAY'
                                            ? 'bg-gold text-white'
                                            : 'bg-surface border border-borderSubtle text-inkLight hover:border-gold'
                                            }`}
                                    >
                                        Specific Day
                                    </button>
                                </div>
                            </div>

                            {/* Day of Week - Only if Specific Day */}
                            {formData.recurrence_type === 'SPECIFIC_DAY' && (
                                <div>
                                    <label className="block text-sm font-bold text-ink mb-2">Day of Week</label>
                                    <select
                                        value={formData.day_of_week ?? ''}
                                        onChange={(e) => setFormData({ ...formData, day_of_week: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 bg-surface border border-borderSubtle rounded-xl text-ink focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                                        required
                                    >
                                        <option value="">Select day</option>
                                        {DAYS_OF_WEEK.map(day => (
                                            <option key={day.value} value={day.value}>{day.label}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Time */}
                            <div>
                                <label className="block text-sm font-bold text-ink mb-2">Time</label>
                                <input
                                    type="time"
                                    value={formData.scheduled_time}
                                    onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface border border-borderSubtle rounded-xl text-ink focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-bold text-ink mb-2">Status</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="draft"
                                    checked={formData.status === 'draft'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                    className="w-4 h-4 text-gold focus:ring-gold"
                                />
                                <span className="text-sm font-medium text-ink">Draft</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="published"
                                    checked={formData.status === 'published'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                    className="w-4 h-4 text-gold focus:ring-gold"
                                />
                                <span className="text-sm font-medium text-ink">Published</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="archived"
                                    checked={formData.status === 'archived'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
                                    className="w-4 h-4 text-gold focus:ring-gold"
                                />
                                <span className="text-sm font-medium text-ink">Archived</span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 bg-surface text-ink font-bold py-3 rounded-xl border border-borderSubtle hover:bg-surface-hover transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-gold-gradient text-white font-bold py-3 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


