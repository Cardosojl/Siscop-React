import { ProcessStateTypes } from 'src/apis/types';

export type StatusBlockStyleProps = {
    $small?: boolean;
};

export type StatusBlockProps = {
    $small?: boolean;
    processState: ProcessStateTypes;
};
