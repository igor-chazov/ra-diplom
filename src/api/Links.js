const url = new URL(window.location.href);

if (url.hostname === 'localhost') {
  url.port = '7070';
}

if (url.hostname === 'igor-chazov.github.io') {
  url.hostname = 'ra-diplom-backend5.herokuapp.com';
  url.protocol = 'https';
}

const root = url;
root.pathname = '';

const links = {
  root: root.origin,
  api: new URL('api', url.href).href,
};

export default links;
