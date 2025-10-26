export default async function handler(req, res) {
  const targetUrl = 'https://proclubs.ea.com/api/fc/clubs/matches?matchType=friendlyMatch&platform=common-gen5&clubIds=90182';
  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.ea.com/',
        'Origin': 'https://www.ea.com',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Chromium";v="126", "Not.A/Brand";v="24"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
      },
    });

    const body = await response.text();

    // Si EA responde con HTML (error), lo filtramos:
    if (!body.startsWith('{') && !body.startsWith('[')) {
      res.status(502).json({ error: 'Blocked by EA (Access Denied)' });
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).send(body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
