const $F = [
    ()=>{if(Math.round(Math.random()) === 1) {return Math.random()} else {return Math.random() * -1}},
    ()=>{if(Math.round(Math.random()) === 1) {return Math.random() * player.width} else {return (Math.random() * player.width)* -1}},
    ()=>{if(Math.round(Math.random()) === 1) {return (Math.random() * 10)} else {return (Math.random() * 10) * -1}},
],

$Ô = [
    (a, key, prop) => { for (let i in a) { if (a[i][key] === prop) { return i } } }, // Match property of an object in an array
    (a, key, prop) => { for (let i in a) { if (a[i][key] === prop) { a.splice(i, 1) } } }, // Match property of an object in an array & remove
],

$Â = [
    (a, c) => { for (let i in c) { a.push(c[i]) } }, // Add multiple
    (a, i) => { let n = a.indexOf(i); if (n > -1) { a.splice(n, 1) } }, // Find & Remove
    (a, i) => { for (let d in i) { let n = a.indexOf(i[d]); if (n > -1) { a.splice(n, 1) } } }, // Find & Remove Many
],

$D = [
    (t) => { return document.createElement(t) }, // 0 // Do NOT use this in most if not all cases. Use Node.innerHTML += Instead. It's way simpler and smaller. Notably slower, but the Browser is fast enough that you won't realize it.
    (id) => { return document.getElementById(id) }, // 1
    (s, nmb) => { return document.querySelectorAll(s)[nmb] }, // 2
    (t, nmb) => { return document.getElementsByTagName(t)[nmb] }, // 3
    (c, nmb) => { return document.getElementsByClassName(c)[nmb] }, // 4
    (c, i) => { const s = $D[0]('style'); s.id = i; s.innerHTML = c; Í[0].appendChild(s) }, // 5 ~ add CSS
    (i) => { $D[0](i).innerHTML }, // 6 ~ change CSS
    (c) => { return document.getElementsByClassName(c) }, // 7
],

id = {
    count: 0,
    new: ()=>{id.count++;return id.count;},
    reduce: ()=>{id.count--},
},

valid = (nmb, func)=>{
    if(nmb == null || isNaN(nmb) || nmb == Infinity) {
        let definition;
        if(nmb == null) {
            definition = "null or undefined";
        } else if (isNaN(nmb)) {
            definition = "Not a Number (NaN)";
        } else if (nmb == Infinity) {
            definition = "Infinity";
        }
        console.error("[Debug]: Value of "+nmb+" is equal to "+definition+" on "+func+". Happened at "+new Date()+".");
    } else if (nmb != 0) {
        return true;
    }
};

let maxBossLevel = parseInt(localStorage.bossLevel);
let theLastBossLevel = false;