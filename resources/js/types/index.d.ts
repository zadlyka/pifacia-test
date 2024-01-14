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

export interface Role {
    id: string;
    name: string;
    permissions: Option[];
}

export interface Departement {
    id: string;
    name: string;
    start_at: string;
    end_at: string;
    actived: boolean;
    permissions: Option[];
}

export interface Division {
    id: string;
    departement_id: string;
    name: string;
    start_at: string;
    end_at: string;
    actived: boolean;
    permissions: Option[];
    departement: Departement;
}

export interface Employee {
    id: string;
    division_id: string;
    name: string;
    start_at: string;
    end_at: string;
    actived: boolean;
    permissions: Option[];
    division: Division;
}

export interface User {
    id: string;
    role_id: string;
    name: string;
    email: string;
    email_verified_at: string;
    role?: Role;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
