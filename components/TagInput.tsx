import React, { useState, useEffect, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { fetchTags, searchTags, Tag } from '../lib/api';

interface TagInputProps {
    selectedTags: Tag[];
    onChange: (tags: Tag[]) => void;
    placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ selectedTags, onChange, placeholder = "Add tags..." }) => {
    const [inputValue, setInputValue] = useState('');
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Load all tags on mount
    useEffect(() => {
        const loadTags = async () => {
            const tags = await fetchTags();
            setAvailableTags(tags);
        };
        loadTags();
    }, []);

    // Filter tags based on input
    useEffect(() => {
        if (!inputValue.trim()) {
            setFilteredTags([]);
            setShowSuggestions(false);
            return;
        }

        const searchLower = inputValue.toLowerCase();
        const filtered = availableTags.filter(tag =>
            tag.name.toLowerCase().includes(searchLower) &&
            !selectedTags.some(selected => selected.id === tag.id)
        );

        setFilteredTags(filtered);
        setShowSuggestions(filtered.length > 0);
    }, [inputValue, availableTags, selectedTags]);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectTag = (tag: Tag) => {
        if (!selectedTags.some(t => t.id === tag.id)) {
            onChange([...selectedTags, tag]);
        }
        setInputValue('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const handleRemoveTag = (tagId: number) => {
        onChange(selectedTags.filter(t => t.id !== tagId));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredTags.length > 0) {
                handleSelectTag(filteredTags[0]);
            }
        } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
            handleRemoveTag(selectedTags[selectedTags.length - 1].id);
        }
    };

    return (
        <div className="relative">
            {/* Selected Tags + Input */}
            <div className="flex flex-wrap gap-2 p-3 bg-surface border border-borderSubtle rounded-xl min-h-[48px] focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition-all">
                {selectedTags.map(tag => (
                    <span
                        key={tag.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full text-sm font-medium"
                    >
                        {tag.name}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag.id)}
                            className="hover:bg-gold/20 rounded-full p-0.5 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => inputValue && setShowSuggestions(true)}
                    placeholder={selectedTags.length === 0 ? placeholder : ''}
                    className="flex-1 min-w-[120px] bg-transparent outline-none text-ink placeholder:text-inkLight/50"
                />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredTags.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-2 bg-canvas border border-borderSubtle rounded-xl shadow-xl max-h-60 overflow-y-auto"
                >
                    {filteredTags.map(tag => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => handleSelectTag(tag)}
                            className="w-full px-4 py-2.5 text-left hover:bg-surface transition-colors flex items-center gap-2 text-ink"
                        >
                            <Plus className="w-4 h-4 text-gold" />
                            <span className="font-medium">{tag.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

