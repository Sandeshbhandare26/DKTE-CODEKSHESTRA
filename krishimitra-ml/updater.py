import os
import re

directory = r"c:\Users\rajpu\Downloads\dket\DKTE-CODEKSHESTRA\krishimitra-ml\public"
css_link = '    <link rel="stylesheet" href="styles.css">\n'
js_script = '    <script src="shared.js"></script>\n'

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()
            
        updated = False
        
        if "styles.css" not in content:
            # Insert after </title> or <title...>...</title>
            content = re.sub(r'(</title>)', r'\1\n' + css_link, content, count=1, flags=re.IGNORECASE)
            updated = True
            
        if "shared.js" not in content:
            # Insert before </body>
            content = re.sub(r'(</body>)', js_script + r'\1', content, count=1, flags=re.IGNORECASE)
            updated = True
            
        if updated:
            with open(filepath, "w", encoding="utf-8") as file:
                file.write(content)
            print(f"Updated {filename}")
