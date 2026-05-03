import json
import os
import urllib.request
import urllib.error

API_KEY    = '4zbcbwxse5pe84q2x2efevj5'
BASE_URL   = 'http://developer.tmsimg.com/'
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MOVIES_JSON = os.path.join(SCRIPT_DIR, '..', 'src', 'data', 'movies.json')
POSTERS_DIR = os.path.join(SCRIPT_DIR, '..', 'public', 'posters')

os.makedirs(POSTERS_DIR, exist_ok=True)

with open(MOVIES_JSON, encoding='utf-8') as f:
    movies = json.load(f)

downloaded = skipped = failed = 0

for movie in movies:
    img = movie.get('preferredImage', {})
    raw_uri = img.get('uri', '') if img else ''
    if not raw_uri:
        skipped += 1
        continue

    uri_path = raw_uri.split('?')[0]          # assets/p31207784_v_v11_ad.jpg
    filename = uri_path.split('/')[-1]         # p31207784_v_v11_ad.jpg
    dest     = os.path.join(POSTERS_DIR, filename)

    if os.path.exists(dest):
        print(f'  skip  {filename}', flush=True)
        skipped += 1
        continue

    url = f'{BASE_URL}{raw_uri}&api_key={API_KEY}'

    try:
        req = urllib.request.Request(url, headers={'Referer': ''})
        with urllib.request.urlopen(req, timeout=15) as resp, open(dest, 'wb') as out:
            out.write(resp.read())
        print(f'  OK    {filename}')
        downloaded += 1
    except Exception as e:
        print(f'  FAIL  {filename} -- {e}')
        failed += 1

print(f'\nDone — downloaded: {downloaded}  skipped: {skipped}  failed: {failed}')
