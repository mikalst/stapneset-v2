function processCaption(input) {
    var output = input;

    var caption = input.caption;

    var regex = /STAP;(?<area>\S+);(?<index>[\d]*);(?<tags>[\S\ ,]+)/m;
    let match = caption?.match(regex);
    if (match) {
        // Parse index
        console.debug("[DEBUG] Found match", match);
        output.index = parseInt(match.groups.index) ?? 999;

        output.area = match.groups.area.toLowerCase();

        output.tags = match.groups.tags.split(',').map(tag => tag.trim());

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
