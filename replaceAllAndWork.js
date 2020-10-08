document.getElementsByTagName("head")[0].innerHTML = `<style>
@import url('https://fonts.googleapis.com/css?family=Oxanium');

body, html {margin:0;padding:0;text-align:center;font-family:Oxanium;overflow:hidden}

#selector, #game, #levelSelector {display:none}
#menu, canvas, #game {position: absolute;left: 0;top: 0;width:100%;height:100%;}

#menu {background:#aaa;width:100%;height:100%;color:#fff;text-shadow:0 1px 2px #000,0 1px 2px #000,0 1px 2px #000,0 1px 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000;font-weight:900}

.menu_container {background:#ddd;height:350px;width:300px;position: absolute;left:calc(50% - 150px);top:100px;border-radius:20px;box-shadow:0 5px 10px #666}
.selector_option {width:100%;height:175px}
.textMiddle {width:100%;height:50px;line-height:0;top:calc(50% - 10px);position:relative;font-size:20px}
#levelSelector {background:#222;color:#fff;width:100%;height:100%;left:0;top:0;position:absolute;}

.levelCircle {position:relative;width:50px;height:50px;background:#aaa;border-radius:50%;box-shadow: 0 2px 5px #000;line-height:50px;color:#000;}

@media only screen and (max-height:550px) {
    .menu_container {top:calc(50% - 175px)}
}

@media only screen and (max-height:350px) {
    .menu_container {
        width:600px;
        height:175px;
        top:calc(50% - 87.5px);
        left:calc(50% - 300px);
        display:flex;
    }
    .selector_option {height:100%;width:50%}
    .selector_option:nth-child(2) {border-radius: 0 10px 10px 0 !important}
}

@media only screen and (max-height:175px){
    .menu_container {
        width:100%;
        height:100%;
        top:0;
        left:0;
        display:flex;
        border-radius: 0;
    }
    .selector_option {height:100%}
    .selector_option:nth-child(2) {border-radius: 0 !important}
}

/**************/
/* Animations */
/**************/

@keyframes disappear {from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(2)}}
@keyframes appear {from{opacity:0;transform:scale(2)} to{opacity:1;transform:scale(1)}}

@keyframes opDisappear {from{opacity:1;} to{opacity:0}}
@keyframes opAppear {from{opacity:0} to{opacity:1}}

@keyframes upDown {
    0% {top:10px}
    50% {top:-10px}
    100% {top:10px}
}
</style>`
document.getElementsByTagName("body")[0].innerHTML = `
    <div id="menu">
        <div id="select">
            <h2 style="margin-top:75px">Cube Game</h2>
            <p onclick="menu.selectToSelector()">Start</p>
            <p>Start</p>
        </div>
        <div id="selector">
            <div class="menu_container">
                <div onclick="menu.selectToLevel()" id="levels" class="selector_option"><span class="textMiddle">Levels</span></div>
                <div id="customLevels" class="selector_option" style="background:#ccc;border-radius:0 0 10px 10px"><span class="textMiddle">Custom Levels</span></div>
            </div>
        </div>
    </div>
    <div id="levelSelector">
        <h2>Levels yikes</h2>
    </div>
    <div id="game">
        <p id="health">You have 10 points of health</p>
        <p id="entities" hidden="">entities</p>
        <div id="additionalText"></div>
        <canvas id="canvas"></canvas>
        <div style="display:none">
            <script src="index.js"></script>
        </div>
    </div>`

/*************/
/** Objects **/
/*************/

const $F = [
    ()=>{if(Math.round(Math.random()) === 1) {return Math.random()} else {return Math.random() * -1}},
    ()=>{if(Math.round(Math.random()) === 1) {return Math.random() * player.width} else {return (Math.random() * player.width)* -1}},
    ()=>{if(Math.round(Math.random()) === 1) {return (Math.random() * 10)} else {return (Math.random() * 10) * -1}},
]

const $Ô = [
    (a, key, prop) => { for (let i in a) { if (a[i][key] === prop) { return i } } }, // Match property of an object in an array
    (a, key, prop) => { for (let i in a) { if (a[i][key] === prop) { a.splice(i, 1) } } }, // Match property of an object in an array & remove
]

const $Â = [
    (a, c) => { for (let i in c) { a.push(c[i]) } }, // Add multiple
    (a, i) => { let n = a.indexOf(i); if (n > -1) { a.splice(n, 1) } }, // Find & Remove
    (a, i) => { for (let d in i) { let n = a.indexOf(i[d]); if (n > -1) { a.splice(n, 1) } } }, // Find & Remove Many
]

const $D = [
    (t) => { return document.createElement(t) }, // 0 // Do NOT use this in most if not all cases. Use Node.innerHTML += Instead. It's way simpler and smaller. Notably slower, but the Browser is fast enough that you won't realize it.
    (id) => { return document.getElementById(id) }, // 1
    (s, nmb) => { return document.querySelectorAll(s)[nmb] }, // 2
    (t, nmb) => { return document.getElementsByTagName(t)[nmb] }, // 3
    (c, nmb) => { return document.getElementsByClassName(c)[nmb] }, // 4
    (c, i) => { const s = $D[0]('style'); s.id = i; s.innerHTML = c; Í[0].appendChild(s) }, // 5 ~ add CSS
    (i) => { $D[0](i).innerHTML }, // 6 ~ change CSS
    (c) => { return document.getElementsByClassName(c) }, // 7
]

/**************/
/*** Levels ***/
/**************/

const levels = {
    autoGenerated: [
        {
            name: 1,
            contents: ()=>{
                const wE = game.canvas.width / 2
                const hE = game.canvas.height / 2 - 10
                let n = (x)=>{constructors.entity.enemy("generic", 1, x, hE, 0, 0, 20, 20, 0, "")}
                n(wE - 10);n(wE - 210);n(wE + 190)
                constructors.text("Oxanium", "15px", 30, game.canvas.height - 75, "Let me introduce you to the basics:")
                constructors.text("Oxanium", "15px", 30, game.canvas.height - 60, "The most important principle is: when pressing shift, you can kill enemies and go faster. Try it with those dummies!")
                constructors.text("Oxanium", "15px", 30, game.canvas.height - 45, "Also, you can go faster pressing Shift.")
            }
        },
        {
            name: 2,
            contents: ()=>{
                const wE = game.canvas.width / 2
                const hE = game.canvas.height / 2 - 10
                let n = (x, dmg)=>{constructors.entity.enemy("generic", 1, x, hE, 0, 0, 20, 20, dmg, "")}
                n(wE - 10, 2);n(wE - 210, 1);n(wE + 190, 3)
                constructors.text("Oxanium", "15px", 30, game.canvas.height - 90, "Another concept you shuld be familiar with: damage.")
                constructors.text("Oxanium", "15px", 30, game.canvas.height - 75, "If you touch certain things, you will lose health according to its amount of damage.")
                constructors.text("Oxanium", "15px", 30, game.canvas.height - 60, "Try it with those dummies: the first one does 1 of damage, the second one does 2, and the third, 3.")
                constructors.text("Oxanium", "15px", 30, game.canvas.height - 45, `Also, don't worry, you'll regenerate your life back (you wont really, because I haven't made it a feature :c)`)
            }
        },
        {
            name: 3,
            contents: ()=>{
                constructors.entity.enemy("boss1", 15, game.canvas.width / 2 - 10, game.canvas.height / 2 - 10, 5, 5, 50, 50, 3)
                
            }
        },
    ],
    updateMenu: ()=>{
        var DOM = $D[1]("levelSelector")
        let nT = ()=>{return 100 + Math.random() * (window.innerHeight - 219.81)}
        const n = (i) => {
            var newDOM = document.createElement("div"), random = 3 + Math.random() * 7
            let nL = 50 + i * 100
            newDOM.style = "position:absolute;left:" + nL + "px;top:" + nT() + "px;";
            newDOM.addEventListener("click", () => { game.start(i) });
            newDOM.innerHTML = '<div class="levelCircle" style="animation:upDown infinite '+random+'s">'+levels.autoGenerated[i].name+'</div>';
            DOM.appendChild(newDOM);
        }
        for(var i = 0, l = levels.autoGenerated.length;i < l;i++) {n(i)};
    },
};

/**************/
/**** Menu ****/
/**************/

const menu = {
    selectToSelector: ()=>{
        $D[1]("select").style.display = "none";
        $D[1]("selector").style.display = "block";
    },
    selectToLevel: ()=>{
        $D[1]("menu").style.display = "none";
        $D[1]("selector").style.display = "none";
        $D[1]("levelSelector").style.display = "block";
    },
    levels: ()=>{
        const levels = $D[1]("levels");
        levels.style="display:block;animation:appear 1 750ms";
    },
    start: ()=>{
        const menu = $D[1]("menu");
        menu.style.animation="disappear 1 1s";
        const gam = $D[1]("game");
        gam.style="display:block;animation:appear 1 1s";
        game.update()
        setTimeout(()=>{menu.style.display = "none";game.start()},1000)
    }
}

/**************/
/**** Game ****/
/**************/

const collide = (self, f)=>{
    if (player.x <= self.x + self.width && self.x <= player.x + player.width && player.y <= self.y + self.height && self.y <= player.y + player.height) {
        f()
    }
}

const constructors = {
    event: (name, key, condition, whenHappen, whenNo) => {
        return {
            name: name,
            currentCooldown: 0,
            condition: condition,
            key: key,
            whenHappen: whenHappen,
            whenNo: whenNo,
            on: false,
        }
    },
    event1: (name, whenHappen) => {
        return {
            name: name,
            whenHappen: whenHappen,
            on: false,
        }
    },
    text: (font, size, x, y, content) => {
        game.text.all.push({
            font:font,
            size:size,
            x:x,
            y:y,
            content:content,
        })
    },
    entity: {
        enemy: function (type, hp, x, y, sX, sY, width, height, dmg, health) {
            game.entities.all.push({
                know: [false, false],
                hp: hp,
                type: type,
                x: x,
                y: y,
                sX: sX,
                sY: sY,
                dmg: dmg,
                color: "#FF0000",
                del: false,
                noHit: false,
                width: width,
                height: height,
                update: function () {
                    if (this.dmg === undefined) { this.dmg = 1 }
                    switch (this.type) {
                        case "generic":
                            if (health != undefined) {
                                this.update = function () {
                                    game.ctx.fillStyle = this.color;
                                    game.ctx.fillRect(this.x, this.y, this.width, this.height);
                                    if (this.x < 0) { this.sX *= -1; this.x = 0 } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width };
                                    if (this.y < 0) { this.sY *= -1; this.y = 0 } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height };
                                    collide(this, () => {
                                        if (player.events[0].on && !this.noHit) {
                                            this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); if (this.hp <= 0) { this.del = true }
                                        }
                                        else if (!player.noHit && !player.events[0].on) { player.onHit(this.dmg) }
                                    });
                                    this.x += this.sX;
                                    this.y += this.sY;
                                }
                            } else {
                                this.update = function () {
                                    game.ctx.fillStyle = this.color;
                                    game.ctx.fillRect(this.x, this.y, this.width, this.height);
                                    if (this.x < 0) { this.sX *= -1; this.x = 0 } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width };
                                    if (this.y < 0) { this.sY *= -1; this.y = 0 } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height };
                                    collide(this, () => {
                                        if (player.events[0].on && !this.noHit) {
                                            if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", this.x, this.y, this.width, this.height) }; this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); if (this.hp <= 0) { this.del = true }
                                        }
                                        else if (!player.noHit && !player.events[0].on) { player.onHit(this.dmg) }
                                    });
                                    this.x += this.sX;
                                    this.y += this.sY;
                                }
                            }
                            break
                        case "boss1":
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                game.ctx.fillRect(this.x, this.y, this.width, this.height);
                                
                                if (!this.know[0] && this.hp > 5) {
                                    this.know[0] = true
                                    setTimeout(() => { this.know[0] = false }, game.tick * 200)
                                    switch (Math.floor(Math.random() * 4)) {
                                        case 0:
                                            var x, y, width = this.width / 3.5, height = this.height / 3.5;
                                            var n = (p1, p2)=>{constructors.entity.enemy("generic", 1, x, y, p1, p2, width, height, 1)};
                                            var f = ()=>{x = this.x + (this.width / 1.75), y = this.y + (this.height / 1.75); n(0, -Math.random() * 5);n(Math.random() * 5, 0);n(0, Math.random() * 5);n(-Math.random() * 5, 0)};
                                            f(); setTimeout(() => { f() }, game.tick * 40);
                                            break
                                        case 1:
                                            var x, y, width = this.width / 5, height = this.height / 5;
                                            var n = ()=>{constructors.entity.projectile("bullet", x, y, $F[2](), $F[2](), width, height, "#FF00FF", 1)};
                                            var f = () => { x = this.x + (this.width / 2.5), y = this.y + (this.height / 2.5); for(let i = 0;i < 50;i++) {n()} };
                                            f();
                                            setTimeout(() => { f(); setTimeout(() => { f() }, game.tick * 40) }, game.tick * 40);
                                            break
                                        case 2:
                                            var x,y,width = this.width/3,height = this.height/3;
                                            var n = (p1, p2)=>{constructors.entity.projectile("missile", x, y, p1, p2, width, height, "#000000", 5)};
                                            var f = () => { x = this.x + this.width/1.5, y = this.y + this.height/1.5; n(0, -Math.random() * 5);n(Math.random() * 5, 0);n(0, Math.random() * 5);n(-Math.random() * 5, 0)};
                                            f();
                                            setTimeout(() => { f() }, game.tick * 40);
                                            break
                                        case 3:
                                            constructors.entity.bonusNoMove("slow", this.x + (this.width / 4), this.y + (this.height / 4), $F[2](), $F[2](), this.width / 2, this.height / 2);
                                    }
                                } else if (this.hp <= 5) {
                                    this.update = function () {game.ctx.fillStyle = this.color; game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                        var x, y, width = this.width / 5, height = this.height / 5
                                        var nH = ()=>{constructors.entity.bonus("health", this.x - 5 + (this.width / 2), this.y - 5 + (this.height / 2), 10, 10)};
                                        var n = ()=>{constructors.entity.projectile("bullet", x, y, $F[2](), $F[2](), width, height, "#FF00FF", 2)};
                                        var f = ()=>{x = this.x + (this.width / 2.5), y = this.y + (this.height / 2.5); for(let i = 0;i < 25;i++) {n()}};
                                        var c = ()=>{this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5)};
                                        if (this.x < 0) { this.sX *= -1; this.x = 0; c();f() } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width; c(); f() };
                                        if (this.y < 0) { this.sY *= -1; this.y = 0; c();f() } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height; c(); f() };
                                        collide(this, ()=>{
                                            if (player.events[0].on && !this.noHit) {nH(); c(); this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); if (this.hp <= 0) { this.del = true }}
                                            else if (!player.events[0].on) { c(); player.onHit(this.dmg) }
                                            if (!this.know[1] && this.hp > 0) {setTimeout(() => {
                                                x = this.x + (this.width / 2.5), y = this.y + (this.height / 2.5); for (let i = 0; i < 200; i++) {n()};setTimeout(() => { this.know[1] = false }, game.tick * 20) }, game.tick * 20);this.know[1] = true};
                                        });
                                        this.x += this.sX;this.y += this.sY;
                                    }
                                }
                                var c = ()=>{this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5)}
                                if (this.x < 0) { this.sX *= -1; this.x = 0; c() } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width; c() }
                                if (this.y < 0) { this.sY *= -1; this.y = 0; c() } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height; c() }
                                collide(this, ()=>{
                                    var nH = ()=>{constructors.entity.bonus("health", this.x - 5 + (this.width / 2), this.y - 5 + (this.height / 2), 10, 10)}
                                    if (player.events[0].on && !this.noHit) { nH(); c(); this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); if (this.hp <= 0) { this.del = true } }
                                    else if (!player.events[0].on && !player.noHit) { c(); player.onHit(this.dmg) }
                                })

                                this.x += this.sX
                                this.y += this.sY
                            }
                            break
                    }
                }
            })
        },
        bonus: function (type, x, y, width, height) {
            game.entities.all.push({
                type: type,
                x: x,
                y: y,
                del: false,
                width: width,
                height: height,
                update: function () {
                    switch (this.type) {
                        case "health":
                            this.update = function () {
                                game.ctx.fillStyle = "#FFFF00"
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                collide(this, ()=>{
                                    if (player.health < 10) { player.onHit(-1);this.del = true }
                                })
                                setTimeout(()=>{this.del = true},game.tick * 400)
                            }
                            break
                        case "slow":
                            this.update = function () {
                                game.ctx.fillStyle = "#000000"
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                collide(this, ()=>{
                                    this.del = true
                                    player.eventByCall[0]()
                                })
                            }
                            break
                    }
                }
            })
        },
        bonusNoMove: function (type, x, y, sX, sY, width, height) {
            game.entities.all.push({
                type: type,
                x: x,
                y: y,
                sX: sX,
                sY: sY,
                del: false,
                width: width,
                height: height,
                update: function () {
                    switch (this.type) {
                        case "slow":
                            this.update = function () {
                                if (this.x < 0) { this.sX *= -1; this.x = 0; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) }
                                if (this.y < 0) { this.sY *= -1; this.y = 0; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) }
                                game.ctx.fillStyle = "#000000"
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                collide(this, ()=>{
                                    this.del = true
                                    player.eventByCall[0]()
                                })
                                this.x += this.sX
                                this.y += this.sY
                            }
                            break
                    }
                }
            })
        },
        particle: function (type, x, y, sX, sY, width, height, color, lifespan) {
            game.entities.all.push({
                type: type,
                x: x,
                y: y,
                sX: sX,
                sY: sY,
                del: false,
                width: width,
                height: height,
                color: color,
                update: function () {
                    setTimeout(() => { this.del = true }, lifespan)
                    switch (this.type) {
                        case "enprisonment":
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                if (this.x < 0) { this.sX *= -1; this.x = 0; } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width }
                                if (this.y < 0) { this.sY *= -1; this.y = 0; } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height }
                                this.x += this.sX
                                this.y += this.sY
                            }
                            break
                        case "explosion":
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                if (this.x < 0) { this.sX *= -1; this.x = 0; } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width }
                                if (this.y < 0) { this.sY *= -1; this.y = 0; } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height }
                                collide(this, ()=>{
                                    if (!player.noHit) {
                                        player.onHit(1)
                                    }
                                })
                                this.x += this.sX
                                this.y += this.sY
                            }
                            break
                    }
                }
            })
        },
        projectile: function (type, x, y, sX, sY, width, height, color, dmg) {
            game.entities.all.push({
                type: type,
                x: x,
                y: y,
                dmg: dmg,
                sX: sX,
                sY: sY,
                del: false,
                width: width,
                height: height,
                color: color,
                update: function () {
                    switch (this.type) {
                        case "bullet":
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                if (this.x < 0) { this.del = true; } else if (this.x > game.canvas.width - this.width) { this.del = true }
                                if (this.y < 0) { this.del = true; } else if (this.y > game.canvas.height - this.height) { this.del = true }
                                collide(this, ()=>{
                                    if (!player.noHit) {
                                        this.del = true
                                        player.onHit(this.dmg)
                                    }
                                })
                                this.x += this.sX
                                this.y += this.sY
                            }
                            break
                        case "missile":
                            this.update = function () {
                                game.ctx.fillStyle = "#FF881C"
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                const explode = () => {
                                    for (let i = 0; i < 10; i++) {
                                        constructors.entity.particle("explosion", this.x + this.width / 2, this.y + this.height / 2, $F[0]() * 5, $F[0]() * 5, 5 + $F[0](), 5 + $F[0](), "#FF881C", game.tick * (Math.random() * 160))
                                    }
                                    this.del = true
                                }
                                if (this.x < 0) { explode() } else if (this.x > game.canvas.width - this.width) { explode() }
                                if (this.y < 0) { explode() } else if (this.y > game.canvas.height - this.height) { explode() }
                                collide(this, ()=>{
                                    if (!player.noHit) {
                                        explode()
                                        this.del = true
                                        player.onHit(this.dmg)
                                    }
                                })
                                this.x += this.sX
                                this.y += this.sY
                            }
                            break
                    }
                }
            })
        },
    }
}

const know = []

const player = {
    health: 10,
    x:0,
    y:0,
    iX:0,
    iY:0,
    sX:0,
    sY:0,
    lX:5,
    lY:5,
    nX:0.5,
    nY:0.5,
    lvl: 0,
    exp: 0,
    width:20,
    height:20,
    onHit:(dmg) => {
        player.health-=dmg
        $D[1]("health").innerHTML = `You have ${player.health} points of health`
        player.noHit = true
        setTimeout(()=>{player.noHit=false},game.tick * 40)
        if(player.health <= 0) {
            game.restart()
        }
    },
    noHit:false,
    events: [
        constructors.event("Dash",
            " ",
            () => { if (player.events[0].currentCooldown === 0) { return true } else { return false } },
            () => { player.noHit = true; const self = player.events[0]; self.on = true; self.currentCooldown = 1; player.lX *= 3; player.lY *= 3; player.nX *= 4; player.nY *= 4; setTimeout(() => { self.on = false; player.lX /= 3; player.lY /= 3; player.nX /= 4; player.nY /= 4; setTimeout(()=>{player.noHit = false; setTimeout(()=>{self.currentCooldown = 0 },game.tick * 40)},game.tick * 20)}, game.tick * 10) },
            () => {},
        ),
        constructors.event("Speed",
            "Shift",
            () => { if (player.events[1].currentCooldown === 0) { return true } else { return false } },
            () => { const self = player.events[1]; self.on = true; self.currentCooldown = 1; player.lX *= 2; player.lY *= 2;setTimeout(() => { self.on = false; player.lX /= 2; player.lY /= 2; setTimeout(()=>{self.currentCooldown = 0 },game.tick * 160)}, game.tick * 40) },
            () => {},
        ),
    ],
    eventByCall: [
        ()=>{ /* Slow */
            player.lX /= 5; player.lY /= 5; player.nX /= 5; player.nY /= 5
            const n = ()=>{constructors.entity.particle("enprisonment", player.x + $F[1](), player.y + $F[1](), $F[0](), $F[0](), 5, 5, "#000000", game.tick * 40)}
            const f = () => { for(let i = 0;i < 10;i++) {n()} }
            const st = (func) => { f(); setTimeout(func, game.tick * 10) }
            st(() => { st(() => { st(() => { st(() => { st(() => { player.lX *= 5; player.lY *= 5; player.nX *= 5; player.nY *= 5 }, game.tick * 25 ) }) }) }) })
        }
    ],
    update: ()=>{
        if(player.x < 0) {player.sX=0;player.x = 0} else if (player.x > game.canvas.width - player.width) {player.sX=0;player.x = game.canvas.width - player.width} else {
            if(game.keys.a || game.keys.ArrowLeft) {player.sX-=player.nX;know[0] = false} else {know[0] = true}
            if(game.keys.d || game.keys.ArrowRight) {player.sX+=player.nX;know[1] = false} else {know[1] = true}
            if(know[0] && know[1]) {if(player.sX>0) {player.sX-=0.1} else if (player.sX<0) {player.sX+= 0.1}}
            player.x += player.sX
        }
        if(player.y < 0) {player.sY=0;player.y = 0}  else if (player.y > game.canvas.height - player.height) {player.sY=0;player.y = game.canvas.height - player.height} else {
            if(game.keys.w || game.keys.ArrowUp) {player.sY-=player.nY;know[2] = false} else {know[2] = true}
            if(game.keys.s || game.keys.ArrowDown) {player.sY+=player.nY;know[3] = false} else {know[3] = true}
            if(know[2] && know[3]) {if(player.sY>0) {player.sY-=0.1} else if (player.sY<0) {player.sY+= 0.1}}
            player.y += player.sY
        }

        if(player.sX > player.lX) {player.sX = player.lX} else if(player.sX < player.lX * -1) {player.sX = player.lX * -1}
        if(player.sY > player.lY) {player.sY = player.lY} else if(player.sY < player.lY * -1) {player.sY = player.lY * -1}

        game.ctx.fillStyle = "#00FF00"
        game.ctx.fillRect(player.x, player.y, player.width, player.height)
    }
}

let intervalStart

const game = {
    eventsInterpretor: (i) => {
        const event = player.events[i]
        if(game.keys[event.key]) {if(event.condition() === true) {event.whenHappen()} else {event.whenNo()}}
    },
    sure: true,
    keys: {},
    canvas: $D[1]("canvas"),
    ctx: $D[1]("canvas").getContext("2d"),
    tick: 25,
    resize:()=>{
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;
    },
    update: ()=>{
        if (game.entities.all.length > 0) {
            game.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            player.update();
            game.entities.update();
            game.text.update();

            $D[1]("entities").innerHTML = game.entities.all.length;
            for (let i = 0, a = game.entities.all; i < game.entities.all.length; i++) { if (a[i]["del"]) { a.splice(i, 1) } };

            for (let i = 0, l = player.events.length; i < l; i++) { game.eventsInterpretor(i) };
        } else {
            const gam = $D[1]("game");
            gam.style.animation = "disappear 1 1s";
            const levelS = $D[1]("levelSelector");
            levelS.style = "animation:appear 1 1s;display:block";
            game.text.all = []
            setTimeout(() => { gam.style = "display:none"; }, 900)
            clearInterval(intervalStart)
        }
    },
    entities: {
        all:[],
        idChoose: 0,
        update: ()=>{const l = game.entities.all.length;for(let i = 0;i < l;i++) {game.entities.all[i].update()}},
    },
    text: {
        all:[],
        update: () => {
            const additionalText = $D[1]("additionalText")
            additionalText.innerHTML = ""
            for (let i = 0, l = game.text.all.length; i < l; i++) {
                additionalText.innerHTML += `<div style="color:#000;font-size:${game.text.all[i].size};font-family:Oxanium;position:absolute;left:${game.text.all[i].x + "px"};top:${game.text.all[i].y + "px"}">${game.text.all[i].content}</div>`
            }
        }
    },
    restart: ()=>{
        clearInterval(intervalStart)
        intervalStart = setInterval(game.update,game.tick);
        player.x = player.iX;
        player.y = player.iY;
        player.health = 10;$D[1]("health").innerHTML=`You have ${player.health} points of health.`;
        game.entities.all=[];
    },
    start: (index)=>{
        player.x = player.iX;
        player.y = player.iY;
        player.sX = 0;
        player.sX = 0;
        player.health = 10;$D[1]("health").innerHTML=`You have ${player.health} points of health.`;
        game.entities.all=[];
        game.index = index
        const levelS = $D[1]("levelSelector");
        levelS.style.animation = "disappear 1 1s";
        const gam = $D[1]("game");
        gam.style = "animation:appear 1 1s;display:block";
        game.resize()
        levels.autoGenerated[index].contents();
        game.update()
        setTimeout(()=>{
            levelS.style = "display:none";
            setTimeout(()=>{intervalStart = setInterval(game.update,game.tick)},200);
        },900)
        if (game.sure) {
            window.addEventListener("resize", ()=>{game.resize();game.update()});
            window.addEventListener("keydown", (e) => { game.keys[e.key] = true });
            window.addEventListener("keyup", (e) => { game.keys[e.key] = false });
            game.sure = false
        }
        game.text.update()
    },
}

levels.updateMenu()
