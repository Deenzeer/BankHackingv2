/**
 * Generates a complete svg image from a PuzzleData object
 * 
 * @param {PuzzleData} puzzleData 
 */
export function getPuzzleSvg(puzzleData){
    
    const textSize = 19
    const textWeigth = 'normal'
    const textColor = puzzleData.colors['text']

    const shapeSVG = createShape(puzzleData.shape, puzzleData.colors['shape'])
    const topText = createText(puzzleData.text[0].toUpperCase(), textColor, textSize, textWeigth, 28)
    const bottomText = createText(puzzleData.text[1].toUpperCase(), textColor, textSize, textWeigth, 70)
    const numberText = createText(puzzleData.number, puzzleData.colors['number'], 45, 100, 50, 'Arial, Helvetica')

    return createSVG([shapeSVG, topText, bottomText, numberText])
}

// Takes multiple SVG strings and combines them to a svg
const createSVG = (elements) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"> ${elements.join("\n")} </svg>`

const createShape = (shape, color) => SHAPE_SVG[shape](color)

const SHAPE_SVG = {
    "kwadrat" : (c) => `<rect fill=${c} stroke="gray" stroke-width="2" width="150" height="150"/>`,
    "trojkat": (c) => `<polygon  fill=${c}  stroke="gray" stroke-width="2" points="0 150 75 0 150 150 0 150"/>`,
    "prostokat" : (c) =>`<rect y="30" fill=${c}  stroke="gray" stroke-width="2" class="shape" width="150" height="90"/>`,
    "kolo" : (c) => `<circle fill=${c}  stroke="gray" stroke-width="2" cx="75" cy="75" r="75"/>`,
}

const createText = (text, color, size, weight, y, font) => `
    <text 
        stroke="gray"
        fill="${color}"
        stroke-width="1"
        style="font-size:${size}px;" 
        font-weight="${weight}" 
        font-family="${font || 'Archivo Black'}, sans-serif";
        x="50%" 
        y="${y}%" 
        dominant-baseline="middle" 
        text-anchor="middle"
    >
        ${text}
    </text> `
