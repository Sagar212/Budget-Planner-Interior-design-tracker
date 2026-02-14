const fs = require('fs');
const file = 'index.html';
try {
    const content = fs.readFileSync(file, 'utf8');
    // Split by crlf or lf to handle windows
    let lines = content.split(/\r?\n/);

    // Check if the lines match what we expect
    if (lines[3325].trim().includes('USER & PROJECT MANAGEMENT') && lines[3546].trim().includes('USER & PROJECT MANAGEMENT')) {
        console.log('Found duplicate block markers.');
        // Remove lines from 3325 (inclusive) to 3546 (exclusive in splice logic? no, count)
        // splice(start, deleteCount)
        // start index 3325.
        // deleteCount = 3546 - 3325 = 221 lines?
        // Let's check:
        // Index 3325 is line 3326.
        // Index 3546 is line 3547 (start of second block).
        // We want to remove up to line 3546.
        // So indices 3325 to 3545.
        // Count = 3545 - 3325 + 1 = 221?
        // 3546 - 3325 = 221.
        // So splice(3325, 221).

        lines.splice(3325, 221);
        fs.writeFileSync(file, lines.join('\n')); // Use \n, browsers handle it fine
        console.log('Successfully removed lines.');
    } else {
        console.log('Markers not found at expected lines. Aborting.');
        console.log('Line 3326:', lines[3325]);
        console.log('Line 3547:', lines[3546]);
    }
} catch (e) {
    console.error(e);
}
