"""Read-only HTTP audit of a running production server; no browser automation."""
import concurrent.futures, gzip, html.parser, json, os, re, urllib.request, urllib.error
from pathlib import Path
from urllib.parse import urlparse

site=json.loads(Path('content/config/site.json').read_text())
origin=site['origin']; base=os.environ.get('AUDIT_ORIGIN','http://127.0.0.1:3000')
paths=[urlparse(url).path for url in re.findall(r'<loc>(.*?)</loc>',Path('public/sitemap.xml').read_text())]
class Page(html.parser.HTMLParser):
 def __init__(self):
  super().__init__();self.lang='';self.head=False;self.title='';self.in_title=False;self.h1=0;self.links=[];self.meta={};self.canon=[];self.alts={};self.scripts=[];self.current=None;self.jsonld=[];self.data=None;self.errors=[];self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='html':self.lang=a.get('lang','')
  if tag=='head':self.head=True
  if tag=='title':self.in_title=True
  if tag=='h1':self.h1+=1
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='link' and a.get('rel')=='canonical':self.canon.append(a.get('href'))
  if tag=='link' and a.get('rel')=='alternate':self.alts[a.get('hreflang')]=a.get('href')
  if tag=='script':
   if a.get('src'):self.scripts.append(a['src'])
   if a.get('type')=='application/ld+json':
    if not self.head:self.errors.append('JSON-LD outside head')
    self.current='jsonld'
   elif a.get('id')=='__NEXT_DATA__':self.current='data'
  if tag=='img':
   self.images.append(a)
   if 'alt' not in a:self.errors.append('Missing image alt')
 def handle_endtag(self,tag):
  if tag=='head':self.head=False
  if tag=='title':self.in_title=False
  if tag=='script':self.current=None
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.current=='jsonld':self.jsonld.append(json.loads(data))
  if self.current=='data':self.data=json.loads(data)
def request(path):
 try:
  r=urllib.request.urlopen(base+path);return r.status,r.read()
 except urllib.error.HTTPError as e:return e.code,e.read()
def inspect(path):
 status,body=request(path);p=Page();p.feed(body.decode());errs=p.errors
 locale='en' if path=='/en' or path.startswith('/en/') else 'tr'
 if status!=200:errs.append(f'HTTP {status}')
 if p.lang!=locale:errs.append(f'lang={p.lang}')
 if p.h1!=1:errs.append(f'h1 count {p.h1}')
 if p.canon!=[origin+('/' if path=='' else path)]:errs.append(f'canonical {p.canon}')
 if set(p.alts)!={'tr','en','x-default'}:errs.append('Missing alternates')
 if not p.meta.get('description') or not p.title:errs.append('Missing metadata')
 if not p.jsonld:errs.append('Missing schema')
 payload=json.dumps([p.data,p.jsonld])
 if re.search(r'"(?:price|offers|priceCurrency|aggregateRating|review|priceRange)"\s*:',payload,re.I):errs.append('Commerce payload')
 if not site['isIndexable'] and 'noindex' not in p.meta.get('robots',''):errs.append('Missing preview noindex')
 valid=set(paths)|{'/','/en'}
 for link in p.links:
  u=urlparse(link)
  if not u.scheme and u.path and u.path not in valid:errs.append('Broken internal link '+link)
 return path,p,errs,len(body)
results=list(concurrent.futures.ThreadPoolExecutor(max_workers=6).map(inspect,paths))
errors=[];titles=[]
by_path={path:p for path,p,_,_ in results}
for path,p,errs,size in results:
 for lang,target in p.alts.items():
  target_path=urlparse(target).path
  if target_path not in by_path:errs.append('Alternate absent from sitemap '+target)
  elif by_path[target_path].alts.get(p.lang)!=p.canon[0]:errs.append('Nonreciprocal alternate '+target)
 errors.extend(f'{path}: {error}' for error in errs);titles.append(p.title)
if len(set(titles))!=len(titles):errors.append('Duplicate page titles')
descriptions=[p.meta.get('description') for _,p,_,_ in results]
if len(set(descriptions))!=len(descriptions):errors.append('Duplicate page descriptions')
statuses={path:request(path)[0] for path in ['/does-not-exist','/en/does-not-exist','/products/missing','/500','/en/500']}
for path,status in statuses.items():
 if status!=(500 if path.endswith('/500') else 404):errors.append(f'{path}: unexpected status {status}')
representatives=['/','/us/contact','/products','/products/klem-uclu-koltuk','/collections','/us/neden-normod','/blog']
bundles={}
for path in representatives:
 p=by_path[path];chunks=[]
 for url in set(p.scripts):
  if url.startswith('/_next/'):
   file=Path('.next')/url.removeprefix('/_next/')
   data=file.read_bytes();chunks.append((url,len(gzip.compress(data))))
 bundles[path]={'gzipJsKB':round(sum(n for _,n in chunks)/1024,1),'initialHtmlKB':round(next(size for r,_,_,size in results if r==path)/1024,1)}
report={'routes':len(results),'errors':errors,'errorStatuses':statuses,'bundles':bundles}
Path('reports').mkdir(exist_ok=True);Path('reports/production-audit.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
raise SystemExit(bool(errors))
