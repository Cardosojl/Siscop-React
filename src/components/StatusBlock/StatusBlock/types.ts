import { ProcessState } from 'src/config/types/types';

export type StatusBlockStyleProps = {
    $small?: boolean;
};

export type StatusBlockProps = {
    $small?: boolean;
    processState: ProcessState;
};
