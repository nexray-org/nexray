import { ChildProps, DeepType } from '@nexray/types';

export type FlatChildrenWithInitData = {
    type: string | DeepType;
    id: string;
    depth: number;
    hasChildren: boolean;
    is: 'component' | 'string';
    path: string[];
    propsWithoutChildren: Omit<ChildProps, 'children'> | undefined;
};
