import { TableProps } from 'src/components/Table/types';

export type UserTypes<S = string, T = S | SectionTypes, N = S | number, B = boolean> = {
    _id: S;
    name: S;
    section: T;
    level: N;
    logged: B;
    password?: S;
};

export type ProfileTypes<S = string> = {
    pg: S;
    password: S;
    current: S;
    confirm: S;
};

export type ProcessTypes<S = string, N = S | number, B = boolean> = {
    _id: S;
    user: S;
    receiver: S;
    section_receiver: S;
    nup: N;
    done: B;
    origin: S | SectionTypes;
    title: S;
    category: S;
    aggregate: S;
    description: S;
    processstates: ProcessStateTypes[];
    sort: S;
    date: S;
    year: S;
};

export type ProcessStateTypes<S = string, U = string | UserTypes> = {
    _id: S;
    process: S;
    user: U;
    state: S;
    anotation: S;
    date: S;
    sort: S;
};

export type SectionTypes<S = string, N = S | number> = {
    _id: S;
    name: S;
    level: N;
};

export type AcquisitionWayTypes<S = string> = {
    _id: S;
    name: S;
};

export type MessageTypes<S = string, N = S | number, B = boolean> = {
    _id: S;
    sender: S | UserTypes;
    receiver: S | UserTypes;
    section_receiver: S | SectionTypes;
    process: S | ProcessTypes;
    message: S;
    title: S;
    process_title: S;
    content: S;
    date: S;
    visualized: B;
    sort: S;
    limit: N;
    page: N;
};

export type YearTypes<S = string, N = S | number> = {
    _id: S;
    year: N;
    sort: S;
    limit: N;
    page: N;
};

export type FileTypes<
    S = string,
    N = S | number,
    F = {
        name: string;
        length: number;
        type: string;
        data: number[];
    }
> = {
    _id: S;
    file?: F;
    filename: S;
    extension: S;
    originalName: S;
    process: S;
    message: S;
    sort: S;
    select: S;
    limit: N;
    page: N;
};

export type TableTypes = TableProps;

export type FilterTypes = Partial<UserTypes> & Partial<MessageTypes> & Partial<ProcessTypes> & Partial<FileTypes> & Partial<AcquisitionWayTypes> & Partial<YearTypes>;

export type SiscopApiForm = Partial<UserTypes> | Partial<MessageTypes> | Partial<ProcessTypes> | Partial<FileTypes> | Partial<AcquisitionWayTypes> | Partial<YearTypes>;

export type SiscopApiIndex = UserTypes[] | ProcessTypes[] | MessageTypes[] | YearTypes[] | SectionTypes[] | FileTypes[] | ProcessStateTypes[] | AcquisitionWayTypes[] | null;

export type SiscopApiShow = UserTypes | ProcessTypes | MessageTypes | YearTypes | SectionTypes | FileTypes | ProcessStateTypes | AcquisitionWayTypes;
