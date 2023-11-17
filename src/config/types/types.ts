import { ClassAttributes, InputHTMLAttributes, ReactNode } from 'react';

export type User<S = string, T = S | Section, N = S | number, B = boolean> = {
    _id: S;
    name: S;
    section: T;
    level: N;
    logged: B;
    password?: S;
};

export type Profile<S = string> = {
    pg: S;
    password: S;
    current: S;
    confirm: S;
};

export type Process<S = string, N = S | number, B = boolean> = {
    _id: S;
    user: S;
    receiver: S;
    section_receiver: S;
    nup: N;
    done: B;
    origin: S | Section;
    title: S;
    category: S;
    aggregate: S;
    description: S;
    processstates: ProcessState[];
    sort: S;
    date: S;
    year: S;
};

export type ProcessState<S = string, U = string | User> = {
    _id: S;
    process: S;
    user: U;
    state: S;
    anotation: S;
    date: S;
    sort: S;
};

export type Section<S = string, N = S | number> = {
    _id: S;
    name: S;
    level: N;
};

export type AcquisitionWay<S = string> = {
    _id: S;
    name: S;
};

export type MessageType<S = string, N = S | number, B = boolean> = {
    _id: S;
    sender: S | User;
    receiver: S | User;
    section_receiver: S | Section;
    process: S | Process;
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

export type Year<S = string, N = S | number> = {
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

export type DispatchUser = {
    loginRedux: (newValue: User<string, Section>) => void;
    logoffRedux: () => void;
};

export type UserRedux = {
    user: User<string, Section>;
};

export type DispatchUserRedux = {
    dispatchUser: DispatchUser;
};

export type ReduxUser = UserRedux & DispatchUserRedux;

export type SimpleView = UserRedux & DispatchUserRedux & { path?: string; title?: string };

export type TableElements = {
    content: string;
    size: string;
};

export type TableType = {
    head: ReactNode | null;
    body: ReactNode | null;
};

export type TableItem<T> = {
    element: T;
    setRefresh: CallableFunction;
    href?: string;
    path?: string;
    user: User<string, Section>;
    dispatchUser: DispatchUser;
};

export type Searcher = {
    message?: string;
    process?: string;
    date?: string;
};

export type MessageReaderType = {
    user: User<string, Section>;
    dispatchUser: DispatchUser;
    path: string;
};

export type MessageTableType = {
    path: string;
    limit: number;
    index: number;
    user: User;
    filter: ObjFilter | null;
    dispatchUser: DispatchUser;
};

export type MessageBoxType = {
    title: string;
    path: string;
};

export type WindowTitleType = {
    title: string;
    className?: string;
    children?: ReactNode;
};

export type PageSelectorType = {
    path: string;
    setChangePage: CallableFunction;
    index: number;
    limit: number;
    user: User<string, Section>;
    filter: ObjFilter | null;
    listener: boolean;
    dispatchUser: DispatchUser;
};

export type SearchBarType = {
    path: string;
    setFilter: CallableFunction;
    optionValues: string[];
    apiValues: string[];
};

export type RootState = {
    user: User<string, Section>;
};

export type LeftBarItens = {
    title: string;
    itemLevel: string | number;
    active: boolean;
    children?: ReactNode;
};

export type MessageBoxes = {
    title: string;
    path: string;
    type: string;
};

export type LeftBarSubitens = {
    title: string;
    active: boolean;
};

export type ErrorBoundaryProps = {
    children: ReactNode;
};

export type ErrorBoundaryState = {
    hasError: boolean;
    errorInfo: React.ErrorInfo | null;
    error: Error | null;
};

export type ObjFilter = Partial<User> & Partial<MessageType> & Partial<Process> & Partial<FileTypes> & Partial<AcquisitionWay> & Partial<Year>;

export type SiscopApiForm = Partial<User> | Partial<MessageType> | Partial<Process> | Partial<FileTypes> | Partial<AcquisitionWay> | Partial<Year>;

export type SiscopApiIndex = User[] | Process[] | MessageType[] | Year[] | Section[] | FileTypes[] | ProcessState[] | AcquisitionWay[] | null;

export type SiscopApiShow = User | Process | MessageType | Year | Section | FileTypes | ProcessState | AcquisitionWay;

export type FilesList = {
    process: Process;
    files: FileTypes[] | null;
};

export type ElementCreatorNode = {
    type: string;
    props: ClassAttributes<HTMLElement> | InputHTMLAttributes<HTMLInputElement> | null;
    inner: ReactNode | ReactNode[] | string | null;
};
