function processCaption(input) {
    var output = input;

    var caption = input.caption;

    // Parse index
    var indexRegex = /\[(?<index>[\d]*)\]/m;
    let indexMatch = caption?.match(indexRegex);
    if (indexMatch) {
        console.debug("[DEBUG] Found index", indexMatch);
        output.index = parseInt(indexMatch.groups.index) ?? 999;
        caption = 
            caption?.substring(0, indexMatch.index) + 
            caption?.substring(indexMatch.index + indexMatch[0].length, caption.length);
    }

    // Parse area
    var tagRegex = /#(?<area>\S+)/m;
    let match = caption?.match(tagRegex);
    if (match) {
        console.debug("[DEBUG] Found area", match);
        output.area = match.groups.area.toLowerCase();
        caption = 
            caption?.substring(0, match.index) + 
            caption?.substring(match.index + match[0].length, caption.length);
    }

    // Parse paragraphs
    output.paragraphs = caption.split("\n");

    console.debug("[DEBUG] Processed input", output);

    return output;
}

module.exports = processCaption;
