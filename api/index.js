export default async function handler(req, res) {
  const url = 'https://proclubs.ea.com/api/fc/clubs/matches?matchType=friendlyMatch&platform=common-gen5&clubIds=90182';
  const r = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'application/json, text/plain, */*',
      'Referer': 'https://www.ea.com/',
      'Origin': 'https://www.ea.com',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
    }
  });
  const body = await r.text();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(r.status).send(body);
}
