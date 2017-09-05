'use strict';
const https = require('https');
const jsdom = require('jsdom');
const _assign = require('lodash.assign');

const text = function(td) {
  const font = td.getElementsByTagName('font');
  const b = font[0].getElementsByTagName('b');
  return b.length? b[0].textContent : font[0].textContent;
};

const request = function(path) {
  return jsdom.JSDOM.fromURL(`https://www.bodybuilding.com${path}`, {
    'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  });
};

const $ = function(id) {
  return request(`/fun/nutrientfull.php?id=${id}`).then((dom) => {
    const a = {}, b = {};
    const document = dom.window.document;
    const tables = document.getElementsByTagName('table');
    if(tables.length<3) return fres({});
    for(var tr of tables[2].getElementsByTagName('tr')) {
      var tds = tr.getElementsByTagName('td');
      if(tds.length===2) b[text(tds[0])] = text(tds[1]);
    }
    a[text(tables[1])] = b;
    return a;
  });
};
module.exports = $;

if(require.main===module) {
  const a = {}, arg = process.argv;
  const start = arg.length>2? parseInt(arg[2]) : 0;
  const stop = arg.length>3? parseInt(arg[3]) : start+1;
  const step = arg.length>4? parseInt(arg[4]) : 8;
  const inc = Math.sign(step);
  const fetch = (id) => pro.then(() => $(id)).then((ans) => _assign(a, ans));
  for(var i=start, pro = Promise.resolve(); i!==stop;) {
    for(var I=Math.min(stop, i+step), p=[]; i!==I; i+=inc)
      p.push(fetch(i));
    pro = Promise.all(p);
  }
  pro.then(() => console.log(JSON.stringify(a)));
}
