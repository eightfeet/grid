import { appDataListTypes } from '../../types/appData';

const appData: appDataListTypes = [
    {
        layout: {
            w: 10,
            h: 2,
            x: 1,
            y: 19,
            i: 'a',
            moved: false,
            static: false,
        },
        style: {
            basic: {
                width: '100px',
                height: '100px',
                backgroundColor: 'red',
            },
        },
        content: { text: 'a' },
        event: {},
        type: 'Conterner',
    },
    {
        layout: {
            w: 10,
            h: 8,
            x: 1,
            y: 11,
            i: 'b',
            moved: false,
            static: false,
        },
        style: {
            basic: {
                width: '100px',
                height: '100px',
                backgroundColor: 'green',
            },
        },
        content: { text: 'b' },
        event: {},
        type: 'Modal',
    },
    {
        layout: {
            w: 10,
            h: 11,
            x: 1,
            y: 0,
            i: 'c',
            moved: false,
            static: false,
        },
        style: {
            basic: {
                width: '100px',
                height: '100px',
                backgroundColor: 'yellow',
            },
        },
        content: { text: 'c' },
        event: {},
        type: 'Conterner',
    },
];

export default appData;
