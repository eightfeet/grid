const targets = {
  layout: `
    {width}
    {height}
    {zIndex}
    {position}
    {left}
    {right}
    {top}
    {bottom}
  `,
  backgroundGradient: `
    background: -moz-linear-gradient({gradientDirections}, {startColor} {startTransition}, {middleColor} {middleTransition}, {endColor} {endTransition});
    background: -webkit-linear-gradient({gradientDirections}, {startColor} {startTransition}, {middleColor} {middleTransition}, {endColor} {endTransition});
    background: linear-gradient({gradientDirections}, {startColor} {startTransition}, {middleColor} {middleTransition}, {endColor} {endTransition});
    `,
  backgroundCommon: `
    background:{backgroundColor} {imageUrl} {repeat} {positionX} {positionY}; 
    {sizeX}
    {sizeY}
    `,
  border: `
    border-radius: {radiusTopLeft} {radiusTopRight} {radiusBottomLeft} {radiusBottomRight}; 
    border{borderPosition}: {borderWidth} {borderStyle} {borderColor};
    `,
  shadow: `
    -webkit-{type}:{inset} {shifRight} {shiftDown} {spread} {blur} {color};
    {type}:{inset} {shifRight} {shiftDown} {spread} {blur} {color};
    `,
  font: `
    font: {italic} {weight} {fontSize}; 
    {lineHeight} 
    {color} 
    {letterSP} 
    {wordSp} 
    {decoration}
    `,
  transform: `
    transform: {rotate} translate({translateX}, {translateY}) skew({skewX}, {skewY});
    `,
};

export default targets;
