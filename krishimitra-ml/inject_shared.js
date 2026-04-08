const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        
        if (!content.includes('<script src="shared.js"></script>')) {
            // Find closing body tag
            content = content.replace('</body>', '    <script src="shared.js"></script>\n</body>');
            fs.writeFileSync(p, content, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`Skipped ${file}`);
        }
    }
});
