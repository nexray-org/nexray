import { PrismTheme } from 'prism-react-renderer';

const style: PrismTheme = {
    plain: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    styles: [
        {
            types: ['prolog', 'constant', 'builtin'],
            style: {
                color: '#8a63d2',
            },
        },
        {
            types: ['inserted', 'function'],
            style: {
                color: '#50e3c2',
            },
        },
        {
            types: ['deleted'],
            style: {
                color: '#f81ce5',
            },
        },
        {
            types: ['changed'],
            style: {
                color: '#f7b955',
            },
        },
        {
            types: ['punctuation', 'symbol'],
            style: {
                color: '#fafafa',
            },
        },
        {
            types: ['string', 'char', 'tag', 'selector'],
            style: {
                color: '#eb367f',
            },
        },
        {
            types: ['keyword', 'variable'],
            style: {
                color: '#ff0080',
                fontStyle: 'italic',
            },
        },
        {
            types: ['comment'],
            style: {
                color: '#e3d7fc)',
            },
        },
        {
            types: ['attr-name'],
            style: {
                color: '#0070f3',
            },
        },
    ],
};

export default style;
