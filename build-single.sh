#!/usr/bin/env bash
# Bundle Suspension Lab into one self-contained HTML file: dist/suspension-lab.html
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
python3 - <<'PY'
import re
html = open('index.html', encoding='utf-8').read()
html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', lambda m: '<style>\n' + open(m.group(1), encoding='utf-8').read() + '\n</style>', html)
html = re.sub(r'<script src="(js/[^"]+)"></script>', lambda m: '<script>\n' + open(m.group(1), encoding='utf-8').read().replace('</script', '<\\/script') + '\n</script>', html)
open('dist/suspension-lab.html', 'w', encoding='utf-8').write(html)
PY
echo "Built dist/suspension-lab.html"
