import os
import re

files = [
    'public/market.html', 'public/dashboard.html', 'public/analysis.html', 
    'public/weather.html', 'public/history.html', 'public/disease.html', 
    'public/login.html', 'public/register.html'
]

css_block = """
        body { font-family: 'Outfit', sans-serif; background-color: #f9fafb; }
        .glassmorphism { background: white; border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .glass-header { background: white; border-bottom: 1px solid #f3f4f6; }
        .glass-card-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); border-color: #86efac; transition: all 0.3s ease; }
        .nav-item { color: #4b5563; transition: all 0.2s ease; }
        .nav-item:hover { background-color: #f3f4f6; color: #111827; }
        .nav-item.active { background-color: #dcfce7; color: #166534; font-weight: 600; border-right: 4px solid #16a34a; }
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f3f4f6; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
"""

for file in files:
    filepath = os.path.join(r'C:\Users\rajpu\Downloads\dket\DKTE-CODEKSHESTRA\krishimitra-ml', file)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <style> block completely up to </style>
    content = re.sub(r'<style>.*?</style>', f'<style>\n{css_block}\n    </style>', content, flags=re.DOTALL)
    
    # Remove dark utility classes
    replacements = {
        'bg-gray-50': 'bg-gray-50',
        'bg-slate-800/40': 'bg-gray-50',
        'bg-slate-800/50': 'bg-gray-50',
        'bg-slate-800/30': 'bg-gray-50',
        'bg-slate-700/50': 'bg-white',
        'bg-slate-700': 'bg-gray-200',
        'bg-slate-800': 'bg-white',
        'bg-dark-800': 'bg-white',
        
        'border-white/5': 'border-gray-200',
        'border-white/10': 'border-gray-200',
        'border-slate-700/50': 'border-gray-200',
        'border-slate-600': 'border-gray-200',
        
        'text-slate-200': 'text-gray-800',
        'text-slate-300': 'text-gray-600',
        'text-slate-400': 'text-gray-500',
        'text-emerald-400': 'text-emerald-600',
        
        'text-white': 'text-gray-900',
        'text-gray-200': 'text-gray-700',
        
        'divide-slate-700/50': 'divide-gray-200',
        'divide-white/10': 'divide-gray-200',
        
        'shadow-emerald-500/20': 'shadow-emerald-500/10'
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f'Processed {file}')
