# cmd-bodybuilding-nutrientfull

[![NPM](https://nodei.co/npm/bodybuilding-nutrientfull.png)](https://nodei.co/npm/bodybuilding-nutrientfull/)

Get JSON Nutrient Data from Bodybuilding.com.

```bash
# using as command line application
node index <start> <stop> <step>

# get nutrient info of food id 1001
node index 1001

# get nutrient info of food id 1001 to 2000 (excluding)
node index 1001 2000

# get nutrient info of food id 1001 to 2002, 20 parallel connections
node index 1001 2000 20
```
```javascript
// using as a javascript module
var nutrientfull = require('bodybuilding-nutrientfull');
// nutrientfull(<id>)

nutrientfull(1001).then((ans) => console.log(ans));
// {"Butter, with salt - 100 Grams":{ ... }}
```
