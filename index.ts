import figlet from 'figlet';

const server = Bun.serve({
  port: 8000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/') {
      const body = figlet.textSync('I am learning bun !!!');
      return new Response(body);
    }

    if (url.pathname === '/about') {
      return new Response('About me');
    }

    if (url.pathname === '/contact') {
      return new Response('Contact us');
    }

    if (url.pathname === '/feed') {
      throw new Error('Unstructured Page');
    }

    if (url.pathname === '/greet') {
      return new Response(Bun.file('./greet.txt'));
    }

    return new Response('404');
  },
  error(error) {
    return new Response(`<pre>${error}\n ${error.stack}</pre>`, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
});

console.log(`Server running on port http://localhost${server.port}`);
