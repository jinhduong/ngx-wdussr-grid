export interface GridFilter {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc',
    search?: { [k: string]: string; }
}