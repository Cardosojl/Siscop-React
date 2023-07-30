import { ClassAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export type User<S = string, N = S | number, B = boolean> = {
    _id: S;
    name: S;
    pg: S;
    section: S;
    level: N;
    logged: B;
    password?: S;
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

export type ProcessState<S = string> = {
    _id: S;
    process: S;
    user: S;
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

export type Message<S = string, N = S | number, B = boolean> = {
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

export type File<S = string, N = S | number, F = { type: string; data: number[] }> = {
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
    loginRedux: (newValue: User) => void;
    logoffRedux: () => void;
};

export type UserRedux = {
    user: User;
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
export type Searcher = {
    message?: string;
    process?: string;
    date?: string;
};

export type MessageReaderType = {
    user: User;
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
    user: User;
    filter: ObjFilter | null;
    dispatchUser: DispatchUser;
};

export type SearchBarType = {
    path: string;
    setFilter: CallableFunction;
};

export type RootState = {
    user: User;
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

export type ObjFilter = Partial<User> & Partial<Message> & Partial<Process> & Partial<File> & Partial<AcquisitionWay>;

export type SiscopApiIndex = User[] | Process[] | Message[] | Year[] | Section[] | File[] | ProcessState[] | AcquisitionWay[] | null;

export type SiscopApiShow = User | Process | Message | Year | Section | File | ProcessState | AcquisitionWay;

export type FilesList = {
    process: Process;
    files: File[] | null;
};

export type Listener = {
    action: string | null;
    itemId: string | null;
};

export type ElementCreatorNode = {
    type: string;
    props: ClassAttributes<HTMLElement> | InputHTMLAttributes<HTMLInputElement> | null;
    inner: ReactNode | ReactNode[] | string | null;
};
