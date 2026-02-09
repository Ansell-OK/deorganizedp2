// Fetch all tags
export const fetchTags = async (): Promise<Tag[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/tags/`);
        if (!response.ok) throw new Error('Failed to fetch tags');
        const data = await response.json();
        return data.results || data; // Handle paginated or non-paginated response
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
};

export interface Tag {
    id: number;
    name: string;
    slug: string;
}
