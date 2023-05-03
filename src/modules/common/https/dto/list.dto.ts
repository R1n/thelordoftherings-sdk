export type SortingParams = {
    sort?: string;
};

export type PaginationParams = {
    limit?: string;
    page?: string;
    offset?: string;
};

export interface ListDto {
    params?:
        | SortingParams
        | PaginationParams;
}
