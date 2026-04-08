import os
import re

files = [
    'public/market.html', 'public/dashboard.html', 'public/analysis.html', 
    'public/weather.html', 'public/history.html', 'public/disease.html', 
    'index.html', 'public/login.html', 'public/register.html'
]

for file in files:
    filepath = os.path.join(r'C:\Users\rajpu\Downloads\dket\DKTE-CODEKSHESTRA\krishimitra-ml', file)
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change body classes
    content = re.sub(r'<body class=\"[^\"]+\"', '<body class=\"font-inter bg-gray-50 text-gray-800 min-h-screen\"', content)
    
    # Remove gradient-bg rule entirely
    content = re.sub(r'\.gradient-bg\s*\{[^}]+\}', '', content)
    
    # Change glassmorphism to white cards
    content = re.sub(r'\.glassmorphism\s*\{[^\}]+\}', '.glassmorphism { background: white; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }', content)
    
    # Form input classes
    content = re.sub(r'\.glass-input\s*\{[^\}]+\}', '.glass-input { background: white; border: 1px solid #d1d5db; color: #1f2937; transition: all 0.3s ease; }', content)
    content = re.sub(r'\.glass-input:focus\s*\{[^\}]+\}', '.glass-input:focus { border-color: #22C55E; outline: none; box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2); }', content)
    
    # Sidebar active
    content = re.sub(r'\.sidebar-item\.active\s*\{[^\}]+\}', '.sidebar-item.active { background: #dcfce7; color: #15803d; font-weight: 600; }', content)
    content = re.sub(r'\.sidebar-item:hover\s*\{[^\}]+\}', '.sidebar-item:hover { background: #f3f4f6; color: #111827; }', content)
    
    # Tailwind classes replacement
    content = content.replace('text-gray-200', 'text-gray-600')
    content = content.replace('text-gray-300', 'text-gray-600')
    content = content.replace('text-gray-400', 'text-gray-500')
    content = content.replace('text-white', 'text-gray-900')
    content = content.replace('border-white/10', 'border-gray-200')
    content = content.replace('bg-white/5', 'bg-gray-50')
    content = content.replace('bg-dark-800', 'bg-white text-gray-900')
    content = content.replace('text-emerald-400', 'text-emerald-600')
    content = content.replace('text-primary-400', 'text-primary-600')
    content = content.replace('text-primary-500', 'text-primary-600')
    
    # Add light-mode text-gray-900 back for titles if we missed it
    content = re.sub(r'<h1([^>]+)text-gray-900', r'<h1\1text-gray-900', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {file}')
