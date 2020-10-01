document.getElementsByTagName("head")[0].innerHTML = '<style>canvas {position: absolute;left: 0;top: 0;}</style>'
document.getElementsByTagName("body")[0].innerHTML = '<span id="health">You have 10 points of health</span><canvas id="canvas"></canvas>'

/*************/
/** Objects **/
/*************/

var $F = [
    ()=>{if(Math.round(Math.random()) === 1) {return Math.random()} else {return Math.random() * -1}},
    ()=>{if(Math.round(Math.random()) === 1) {return Math.random() * player.width} else {return (Math.random() * player.width)* -1}},
    ()=>{if(Math.round(Math.random()) === 1) {return (Math.random() * 10)} else {return (Math.random() * 10) * -1}},
]

var $Ô = [
    (a, key, prop) => { for (var i in a) { if (a[i][key] === prop) { return i } } }, // Match property of an object in an array
    (a, key, prop) => { for (var i in a) { if (a[i][key] === prop) { a.splice(i, 1) } } }, // Match property of an object in an array & remove
]

var $Â = [
    (a, c) => { for (var i in c) { a.push(c[i]) } }, // Add multiple
    (a, i) => { var n = a.indexOf(i); if (n > -1) { a.splice(n, 1) } }, // Find & Remove
    (a, i) => { for (var d in i) { var n = a.indexOf(i[d]); if (n > -1) { a.splice(n, 1) } } }, // Find & Remove Many
]

var $D = [
    (t) => { return document.createElement(t) }, // 0 // Do NOT use this in most if not all cases. Use Node.innerHTML += Instead. It's way simpler and smaller. Notably slower, but the Browser is fast enough that you won't realize it.
    (id) => { return document.getElementById(id) }, // 1
    (s, nmb) => { return document.querySelectorAll(s)[nmb] }, // 2
    (t, nmb) => { return document.getElementsByTagName(t)[nmb] }, // 3
    (c, nmb) => { return document.getElementsByClassName(c)[nmb] }, // 4
    (c, i) => { var s = $D[0]('style'); s.id = i; s.innerHTML = c; Í[0].appendChild(s) }, // 5 ~ add CSS
    (i) => { $D[0](i).innerHTML }, // 6 ~ change CSS
    (c) => { return document.getElementsByClassName(c) }, // 7
]

var collide = (self, f)=>{
    if (player.x <= self.x + self.width && self.x <= player.x + player.width && player.y <= self.y + self.height && self.y <= player.y + player.height) {
        f()
    }
}

var aP = (f)=>{game.entities.all.push(f)}
var c = (t)=>{constructors.entities[t]}

var constructors = {
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
    entity: {
        enemy: function (type, hp, x, y, sX, sY, width, height, dmg) {
            return {
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
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                if (this.x < 0) { this.sX *= -1; this.x = 0 } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width }
                                if (this.y < 0) { this.sY *= -1; this.y = 0 } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height }
                                collide(this, ()=>{
                                    if (player.events[0].on && !this.noHit) { 
                                        if(Math.floor(Math.random() * 5 ) === 1) {game.entities.all.push(constructors.entity.bonus("health", this.x, this.y, this.width, this.height))}; this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); if (this.hp <= 0) { this.del = true } }
                                    else if (!player.noHit && !player.events[0].on) { player.onHit(this.dmg) }
                                })
                                this.x += this.sX
                                this.y += this.sY
                            }
                            break
                        case "boss1":
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                
                                if (!this.know[0] && this.hp > 5) {
                                    this.know[0] = true
                                    setTimeout(() => { this.know[0] = false }, game.tick * 200)
                                    switch (Math.floor(Math.random() * 4)) {
                                        case 0:
                                            var n = (p1, p2)=>{game.entities.all.push(constructors.entity.enemy("generic", 1, this.x, this.y, p1, p2, 15, 15, 1))}
                                            var f = ()=>{n(0, -Math.random() * 5);n(Math.random() * 5, 0);n(0, Math.random() * 5);n(-Math.random() * 5, 0)}
                                            f(); setTimeout(() => { f() }, game.tick * 40)
                                            break
                                        case 1:
                                            player.lX /= 100; player.lY /= 100; player.nX /= 100; player.nY /= 100
                                            var n = ()=>{game.entities.all.push(constructors.entity.particle("enprisonment", player.x + $F[1](), player.y + $F[1](), $F[0](), $F[0](), 5, 5, "#000000", game.tick * 40))}
                                            var f = () => { for(var i = 0;i < 10;i++) {n()} }
                                            var st = (func) => { f(); setTimeout(func, game.tick * 10) }
                                            st(() => { st(() => { st(() => { st(() => { st(() => { setTimeout(() => { player.lX *= 100; player.lY *= 100; player.nX *= 100; player.nY *= 100 }, game.tick * 50) }) }) }) }) })
                                            break
                                        case 2:
                                            var n = ()=>{game.entities.all.push(constructors.entity.projectile("bullet", this.x + this.width / 2 + $F[1](), this.y + this.height / 2 + $F[1](), $F[2](), $F[2](), 10, 10, "#FF00FF", 2))}
                                            var f = () => { for(var i = 0;i < 50;i++) {n()} }
                                            f()
                                            setTimeout(() => { f(); setTimeout(() => { f() }, game.tick * 40) }, game.tick * 40)
                                            break
                                        case 3:
                                            var n = (p1, p2)=>{game.entities.all.push(constructors.entity.projectile("missile", this.x, this.y, p1, p2, 15, 15, "#000000", 5))}
                                            var f = () => { n(0, -Math.random() * 5);n(Math.random() * 5, 0);n(0, Math.random() * 5);n(-Math.random() * 5, 0)}
                                            f()
                                            setTimeout(() => { f() }, game.tick * 40)
                                    }
                                } else if (this.hp <= 5) {
                                    this.update = function () {game.ctx.fillStyle = this.color; game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                        var n = ()=>{game.entities.all.push(constructors.entity.projectile("bullet", this.x + this.width / 2 + $F[1](), this.y + this.height / 2 + $F[1](), $F[2](), $F[2](), 10, 10, "#FF00FF", 2))};
                                        var f = ()=>{for(var i = 0;i < 25;i++) {n()}}
                                        if (this.x < 0) { this.sX *= -1; this.x = 0; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5);f() } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width; this.color = "#AA0000"; f(); setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) }
                                        if (this.y < 0) { this.sY *= -1; this.y = 0; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5);f() } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height; this.color = "#AA0000"; f(); setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) }
                                        collide(this, ()=>{
                                            if (player.events[0].on && !this.noHit) {game.entities.all.push(constructors.entity.bonus("health", this.x - 5 + (this.width / 2), this.y - 5 + (this.height / 2), 10, 10)); this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5); this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); constructors.entity.projectile("missile"); if (this.hp <= 0) { this.del = true }}
                                            else if (player.noHit) { }
                                            else if (!player.events[0].on) { this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5); player.onHit(this.dmg) }
                                            if (!this.know[1] && this.hp > 0) {setTimeout(() => {
                                                for (var i = 0; i < 200; i++) {game.entities.all.push(constructors.entity.projectile("bullet", this.x + this.width / 2 + $F[1](), this.y + this.height / 2 + $F[1](), $F[2](), $F[2](), 10, 10, "#FF00FF", 2))};setTimeout(() => { this.know[1] = false }, game.tick * 20) }, game.tick * 20);this.know[1] = true}
                                        })
                                        this.x += this.sX;this.y += this.sY
                                    }
                                }
                                if (this.x < 0) { this.sX *= -1; this.x = 0; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) } else if (this.x > game.canvas.width - this.width) { this.sX *= -1; this.x = game.canvas.width - this.width; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) }
                                if (this.y < 0) { this.sY *= -1; this.y = 0; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) } else if (this.y > game.canvas.height - this.height) { this.sY *= -1; this.y = game.canvas.height - this.height; this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5) }
                                collide(this, ()=>{
                                    if (player.events[0].on && !this.noHit) { game.entities.all.push(constructors.entity.bonus("health", this.x - 5 + (this.width / 2), this.y - 5 + (this.height / 2), 10, 10)); this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5); this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); constructors.entity.projectile("missile"); if (this.hp <= 0) { this.del = true } }
                                    else if (player.noHit) { }
                                    else if (!player.events[0].on) { this.color = "#AA0000"; setTimeout(() => { this.color = "#FF0000" }, game.tick * 5); player.onHit(this.dmg) }
                                })

                                this.x += this.sX
                                this.y += this.sY
                            }
                            break
                    }
                }
            }
        },
        bonus: function (type, x, y, width, height) {
            return {
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
                                    if (player.health < 10) { player.health++; this.del = true; $D[1]("health").innerHTML = `You have ${player.health} points of health.` }
                                })
                            }
                            break
                    }
                }
            }
        },
        particle: function (type, x, y, sX, sY, width, height, color, lifespan) {
            return {
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
            }
        },
        projectile: function (type, x, y, sX, sY, width, height, color, dmg) {
            return {
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
                                var explode = () => {
                                    for (var i = 0; i < 10; i++) {
                                        game.entities.all.push(constructors.entity.particle("explosion", this.x + this.width / 2, this.y + this.height / 2, $F[0]() * 5, $F[0]() * 5, 5 + $F[0](), 5 + $F[0](), "#FF881C", game.tick * (Math.random() * 160)))
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
            }
        },
    }
}

var know = []

var player = {
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
            () => { player.noHit = true; var self = player.events[0]; self.on = true; self.currentCooldown = 1; player.lX *= 3; player.lY *= 3; player.nX *= 4; player.nY *= 4; setTimeout(() => { self.on = false; player.lX /= 3; player.lY /= 3; player.nX /= 4; player.nY /= 4; setTimeout(()=>{player.noHit = false; setTimeout(()=>{self.currentCooldown = 0 },1250)},1000)}, 250) },
            () => {  },
        ),
        constructors.event("Speed",
            "Shift",
            () => { if (player.events[1].currentCooldown === 0) { return true } else { return false } },
            () => { var self = player.events[1]; self.on = true; self.currentCooldown = 1; player.lX *= 2; player.lY *= 2;setTimeout(() => { self.on = false; player.lX /= 2; player.lY /= 2; setTimeout(()=>{self.currentCooldown = 0 },game.tick * 160)}, game.tick * 40) },
            () => {  },
        ),
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

var game = {
    eventsInterpretor: (i) => {
        var event = player.events[i]
        if(game.keys[event.key]) {if(event.condition() === true) {event.whenHappen()} else {event.whenNo()}}
    },
    keys: {},
    canvas: $D[1]("canvas"),
    ctx: $D[1]("canvas").getContext("2d"),
    tick: 25,
    start: ()=>{
        setInterval(game.update,game.tick)
        game.resize()
        window.addEventListener("resize",()=>{game.resize()})
        window.addEventListener("keydown",(e)=>{game.keys[e.key]=true})
        window.addEventListener("keyup",(e)=>{game.keys[e.key]=false})
    },
    update: ()=>{
        game.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        player.update()
        game.entities.update()
        $Ô[1](game.entities.all, "del", true)

        var l = player.events.length

        for(var i = 0;i < l;i++) {game.eventsInterpretor(i)}
    },
    resize: ()=>{
        game.canvas.width = window.innerWidth
        game.canvas.height = window.innerHeight
        game.update()
    },
    entities: {
        all:[],
        idChoose: 0,
        new:(hp, type, x, y, sX, sY, lX, lY, nX, nY, width, height) => {game.entities.all.push(constructors.entity(hp, type, x, y, sX, sY, lX, lY, nX, nY, width, height))},
        update: ()=>{var l = game.entities.all.length;for(var i = 0;i < l;i++) {game.entities.all[i].update()}},
    },
    restart: ()=>{
        player.x = player.iX
        player.y = player.iY
        player.health = 10;$D[1]("health").innerHTML=`You have ${player.health} points of health.`;
        game.entities.all=[];
        game.entities.all.push(constructors.entity.enemy("boss1", 15, (canvas.width - 25) / 2, (canvas.height - 25) / 2, 5, 5, 50, 50, 3))
    },
}

game.start()

game.entities.all.push(constructors.entity.enemy("boss1", 15, (canvas.width - 25) / 2, (canvas.height - 25) / 2, 5, 5, 50, 50, 3))
