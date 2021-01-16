interface CompileRules {

}

const rules: CompileRules = {
    display: {
        width: ""
    },
//     `
//     {width}
//     {height}
//     {zIndex}
//     {position}
//     {left}
//     {right}
//     {top}
//     {bottom}
//   `,
    backgroundGradient: `
    background: -moz-linear-gradient({gradientDirections}, {startColor} {startTransition}, {middleColor} {middleTransition}, {endColor} {endTransition});
    background: -webkit-linear-gradient({gradientDirections}, {startColor} {startTransition}, {middleColor} {middleTransition}, {endColor} {endTransition});
    background: linear-gradient({gradientDirections}, {startColor} {startTransition}, {middleColor} {middleTransition}, {endColor} {endTransition});
    `,
    backgroundCommon: `
    background:{backgroundColor} {imageUrl} {repeat} {positionX} {positionY}; 
    background-size:{sizeX} {sizeY};
    `,
    border: `
    border-radius: {radiusTopLeft} {radiusTopRight} {radiusBottomLeft} {radiusBottomRight}; 
    border{borderPosition}: {borderWidth} {borderStyle} {borderColor};
    `,
    boxShadow: `
    -webkit-box-shadow:{inset} {shifRight} {shiftDown} {spread} {blur} {color};
    {type}:{inset} {shifRight} {shiftDown} {spread} {blur} {color};
    `,
    textShadow: `
    -webkit-text-shadow:{shifRight} {shiftDown} {blur} {color};
    text-shadow:{shifRight} {shiftDown} {blur} {color};
    `,
    font: `
    {fontStyle}
    {fontWeight}
    {fontSize}
    {lineHeight} 
    {color} 
    {letterSP} 
    {wordSp} 
    {decoration}
    {align}
    `,
    transform: `
    -moz-transform: {scale} {rotate} translate({translateX}, {translateY}) skew({skewX}, {skewY});
    -webkit-transform: {scale} {rotate} translate({translateX}, {translateY}) skew({skewX}, {skewY});
    transform: {scale} {rotate} translate({translateX}, {translateY}) skew({skewX}, {skewY});
    `,
}

export default rules;