import description from './description.json';

interface Params {
    [keys: string]: any;
}

function handler(styleGroup: Params) {
    if (Object.prototype.toString.call(styleGroup) !== '[object Object]')
        return '';
    const descriptionKeys = Object.keys(description);
    for (let index = 0; index < descriptionKeys.length; index++) {
        const descriptionKey = descriptionKeys[index];
        console.log('descriptionKey', descriptionKey);
        if (!styleGroup[descriptionKey]) continue;

        switch (descriptionKey) {
            case 'display':
                break;
            case 'backgroundGradient':
                break;
            case 'backgroundCommon':
                break;
            case 'border':
                break;
            case 'boxShadow':
                break;
            case 'textShadow':
                break;
            case 'font':
                break;

            default:
                break;
        }
    }

    console.log('params', styleGroup);
    return '';
}

export default handler;
