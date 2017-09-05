'use strict';
const https = require('https');
const JsDom = require('jsdom');
const _assign = require('lodash.assign');

const text = function(td) {
  const font = td.getElementsByTagName('font');
  const b = font[0].getElementsByTagName('b');
  return b.length? b[0].innerHTML : font[0].innerHTML;
};

const $ = function(id) {
  return new Promise((fres, frej) => {
    const req = https.request({
      'hostname': 'www.bodybuilding.com',
      'path': `/fun/nutrientfull.php?id=${id}`,
      'headers': {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    }, (res) => {
      var data = '';
      if(res.statusCode!==200) {
        res.resume();
        return frej(new Error(`Bad Response: ${res.statusCode}`));
      }
      res.setEncoding('utf8');
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const a = {}, b = {};
        const doc = new JsDom.JSDOM(data).window.document;
        const tables = doc.getElementsByTagName('table');
        if(tables.length<3) return fres({});
        for(var tr of tables[2].getElementsByTagName('tr')) {
          var tds = tr.getElementsByTagName('td');
          if(tds.length===2) b[text(tds[0])] = text(tds[1]);
        }
        a[text(tables[1])] = b;
        fres(a);
      });
    });
    req.on('error', (err) => frej(err));
    req.end();
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
