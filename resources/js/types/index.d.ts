export interface Audit {
    id: number;
    event: string;
    old_values: any;
    new_values: any;
    user: User;
    created_at: string;
}
export interface Option {
    value: string;
    label: string;
}

export interface Departement {
    id: string;
    name: string;
    start_at: string;
    end_at: string;
    actived: boolean;
    permissions: Option[];
}

export interface User {
    id: string;
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
