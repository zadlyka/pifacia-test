export interface Option {
    value: string;
    label: string;
}

export interface Departement {
    id: number;
    name: string;
    start_at: string;
    end_at: string;
    actived: boolean;
    permissions: Option[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
