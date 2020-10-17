/************/
/** Entity **/
/************/

const collide = (self, f)=>{
    if (player.x <= self.x + self.width && self.x <= player.x + player.width && player.y <= self.y + self.height && self.y <= player.y + player.height) {
        f()
    }
},

constructors = {
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
        enemy: function (type, hp, x, y, sX, sY, width, height, dmg, boost) {
            game.entities.all.push({
                know: [false, false],
                hp: hp,
                type: type,
                x: x,
                y: y,
                sX: sX,
                sY: sY,
                dmg: dmg,
                color: colors.entities.enemy.normal,
                del: false,
                noHit: false,
                width: width,
                height: height,
                update: function () {
                    if (this.dmg === undefined) { this.dmg = 1 }
                    switch (this.type) {
                        case "generic":
                            if (boost != undefined) {
                                this.update = function () {
                                    game.ctx.fillStyle = this.color;
                                    let x = this.x, y = this.y
                                    game.ctx.fillRect(x, y, this.width, this.height);
                                    if (x < 0) { this.sX *= -1; x = 0 } else if (x > window.innerWidth - this.width) { this.sX *= -1; x = window.innerWidth - this.width };
                                    if (y < 0) { this.sY *= -1; y = 0 } else if (y > window.innerHeight - this.height) { this.sY *= -1; y = window.innerHeight - this.height };
                                    collide(this, () => {
                                        if (player.events[0].on && !this.noHit) {
                                            this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); if (this.hp <= 0) { this.del = true }
                                        }
                                        else if (!player.noHit && !player.events[0].on) { player.onHit(this.dmg) }
                                    });
                                    this.x = x + this.sX;
                                    this.y = y + this.sY;
                                }
                            } else {
                                this.update = function () {
                                    game.ctx.fillStyle = this.color;
                                    let x = this.x, y = this.y, width = this.width, height = this.height
                                    game.ctx.fillRect(x, y, width, height);
                                    if (x < 0) { this.sX *= -1; x = 0 } else if (x > window.innerWidth - width) { this.sX *= -1; x = window.innerWidth - width };
                                    if (y < 0) { this.sY *= -1; y = 0 } else if (y > window.innerHeight - height) { this.sY *= -1; y = window.innerHeight - height };
                                    collide(this, () => {
                                        if (player.events[0].on && !this.noHit) {
                                            if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", x, y, width, height) }; this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); if (this.hp <= 0) { this.del = true }
                                        }
                                        else if (!player.noHit && !player.events[0].on) { player.onHit(this.dmg) }
                                    });
                                    this.x = x + this.sX;
                                    this.y = y + this.sY;
                                }
                            }
                            break
                        case "boss1":
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                game.ctx.fillRect(this.x, this.y, this.width, this.height);
                                
                                if (!this.know[0] && this.hp > 5) {
                                    this.know[0] = true
                                    setTimeout(() => { this.know[0] = false }, game.tick * 300)
                                    switch (Math.floor(Math.random() * 4)) {
                                        case 0:
                                            var x, y, width = this.width / 3.5, height = this.height / 3.5, rng = Math.random, summon = constructors.entity.enemy,
                                            n = (p1, p2)=>{summon("generic", 1, x, y, p1, p2, width, height, 1)},
                                            f = ()=>{x = this.x + (width / 1.75), y = this.y + (height / 1.75); n(0, -rng() * 5);n(rng() * 5, 0);n(0, rng() * 5);n(-rng() * 5, 0)};
                                            f(); setTimeout(() => { f() }, game.tick * 40);
                                            break
                                        case 1:
                                            var x, y, width = this.width / 5, height = this.height / 5, f2 = $F[2], summon = constructors.entity.projectile,
                                            n = ()=>{summon("bullet", x, y, f2(), f2(), width, height, 1)},
                                            f = () => { x = this.x + (width / 2.5), y = this.y + (height / 2.5); for(let i = 0;i < 50;i++) {n()} };
                                            f();
                                            setTimeout(() => { f(); setTimeout(() => { f() }, game.tick * 40) }, game.tick * 40);
                                            break
                                        case 2:
                                            var x,y,width = this.width/3,height = this.height/3, rng = Math.random, summon = constructors.entity.projectile,
                                            n = (p1, p2)=>{summon("missile", x, y, p1, p2, width, height, 5)},
                                            f = () => { x = this.x + width/1.5, y = this.y + height/1.5; n(0, -rng() * 5);n(rng() * 5, 0);n(0, rng() * 5);n(-rng() * 5, 0)};
                                            f();
                                            setTimeout(() => { f() }, game.tick * 40);
                                            break
                                        case 3:
                                            constructors.entity.bonusMove("slow", this.x + (this.width / 4), this.y + (this.height / 4), $F[2](), $F[2](), this.width / 2, this.height / 2);
                                    }
                                } else if (this.hp <= 5) {
                                    this.update = function () {game.ctx.fillStyle = this.color; game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                        let x, y, width = this.width / 5, height = this.height / 5, f2 = $F[2], t = game.tick,
                                        
                                        nH = ()=>{constructors.entity.bonus("health", this.x - 5 + (this.width / 2), this.y - 5 + (this.height / 2), 10, 10)},
                                        summon = constructors.entity.projectile,
                                        n = ()=>{summon("bullet", x, y, f2(), f2(), width, height, 2)},
                                        f = ()=>{x = this.x + (this.width / 2.5), y = this.y + (this.height / 2.5); for(let i = 0;i < 25;i++) {n()}},
                                        c = ()=>{this.color = colors.entities.enemy.hit; setTimeout(() => { this.color = colors.entities.enemy.normal }, t * 5)};
                                        if (this.x < 0) { this.sX *= -1; this.x = 0; c();f() } else if (this.x > window.innerWidth - this.width) { this.sX *= -1; this.x = window.innerWidth - this.width; c(); f() };
                                        if (this.y < 0) { this.sY *= -1; this.y = 0; c();f() } else if (this.y > window.innerHeight - this.height) { this.sY *= -1; this.y = window.innerHeight - this.height; c(); f() };
                                        collide(this, ()=>{
                                            c();
                                            if (player.events[0].on && !this.noHit) {nH(); this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, t * 40); if (this.hp <= 0) { this.del = true }}
                                            else if (!player.events[0].on && !player.noHit) { player.onHit(this.dmg) }
                                            if (!this.know[1] && this.hp > 0) {setTimeout(() => {
                                                x = this.x + (this.width / 2.5), y = this.y + (this.height / 2.5); for(let i = 0;i < 200;i++) {n()}; setTimeout(() => { this.know[1] = false }, t * 20) }, t * 20);this.know[1] = true};
                                        });
                                        this.x += this.sX;this.y += this.sY;
                                    }
                                }
                                var c = ()=>{this.color = colors.entities.enemy.hit; setTimeout(() => { this.color = colors.entities.enemy.normal }, game.tick * 5)}
                                if (this.x < 0) { this.sX *= -1; this.x = 0; c() } else if (this.x > window.innerWidth - this.width) { this.sX *= -1; this.x = window.innerWidth - this.width; c() }
                                if (this.y < 0) { this.sY *= -1; this.y = 0; c() } else if (this.y > window.innerHeight - this.height) { this.sY *= -1; this.y = window.innerHeight - this.height; c() }
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
                color: colors.entities.bonus.health,
                width: width,
                height: height,
                update: function () {
                    switch (this.type) {
                        case "health":
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                collide(this, ()=>{
                                    if(!player.noHit) {this.del = true; if(player.health < 10) {player.onHit(-1);}}
                                })
                            }
                            break
                    }
                }
            })
        },
        bonusMove: function (type, x, y, sX, sY, width, height) {
            game.entities.all.push({
                type: type,
                x: x,
                y: y,
                sX: sX,
                sY: sY,
                del: false,
                color: colors.entities.bonusMove.slow,
                width: width,
                height: height,
                update: function () {
                    switch (this.type) {
                        case "slow":
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                let x = this.x, y = this.y
                                game.ctx.fillRect(x, y, this.width, this.height)
                                if (x < 0) { this.sX *= -1; x = 0; } else if (x > window.innerWidth - this.width) { this.sX *= -1; x = window.innerWidth - this.width; }
                                if (y < 0) { this.sY *= -1; y = 0; } else if (y > window.innerHeight - this.height) { this.sY *= -1; y = window.innerHeight - this.height; }
                                collide(this, ()=>{
                                    this.del = true
                                    player.eventByCall[0]()
                                })
                                this.x = x + this.sX
                                this.y = y + this.sY
                            }
                            break
                    }
                }
            })
        },
        particle: function (type, x, y, sX, sY, width, height, lifespan) {
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
                    setTimeout(() => { this.del = true }, lifespan)
                    switch (this.type) {
                        case "enprisonment":
                            this.color = colors.entities.bonusMove.slow
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                let x = this.x, y = this.y
                                game.ctx.fillRect(x, y, this.width, this.height)
                                if (x < 0) { this.sX *= -1; x = 0; } else if (x > window.innerWidth - this.width) { this.sX *= -1; x = window.innerWidth - this.width }
                                if (y < 0) { this.sY *= -1; y = 0; } else if (y > window.innerHeight - this.height) { this.sY *= -1; y = window.innerHeight - this.height }
                                this.x = x + this.sX
                                this.y = y + this.sY
                            }
                            break
                        case "explosion":
                            this.color = colors.entities.projectile.missile
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                let x = this.x, y = this.y
                                game.ctx.fillRect(this.x, this.y, this.width, this.height)
                                if (x < 0) { this.sX *= -1; x = 0; } else if (x > window.innerWidth - this.width) { this.sX *= -1; x = window.innerWidth - this.width }
                                if (y < 0) { this.sY *= -1; y = 0; } else if (y > window.innerHeight - this.height) { this.sY *= -1; y = window.innerHeight - this.height }
                                collide(this, ()=>{
                                    if (!player.noHit) {
                                        player.onHit(1)
                                    }
                                })
                                this.x = x + this.sX
                                this.y = y + this.sY
                            }
                            break
                    }
                }
            })
        },
        projectile: function (type, x, y, sX, sY, width, height, dmg) {
            game.entities.all.push({
                type: type,
                x: x,
                y: y,
                dmg: dmg,
                sX: sX,
                sY: sY,
                del: false,
                color: colors.entities.projectile.bullet,
                width: width,
                height: height,
                update: function () {
                    switch (this.type) {
                        case "bullet":
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                let x = this.x, y = this.y
                                game.ctx.fillRect(x, y, this.width, this.height)
                                if (x < -this.width) { this.del = true; } else if (x > window.innerWidth) { this.del = true }
                                if (y < -this.height) { this.del = true; } else if (y > window.innerHeight) { this.del = true }
                                collide(this, ()=>{
                                    if (!player.noHit) {
                                        this.del = true
                                        player.onHit(this.dmg)
                                    }
                                })
                                this.x = x + this.sX
                                this.y = y + this.sY
                            }
                            break
                        case "missile":
                            this.color = colors.entities.projectile.missile
                            this.update = function () {
                                game.ctx.fillStyle = this.color
                                let x = this.x, y = this.y
                                game.ctx.fillRect(x, y, this.width, this.height)
                                const explode = () => {
                                    let tX = x + this.width / 2, tY = y + this.height / 2, t = game.tick, name = "explosion", f0 = $F[0], rng = Math.random, f = ()=>{constructors.entity.particle(name, tX, tY, f0() * 5, f0() * 5, 5 + f0(), 5 + f0(), rng() * 160 * t)}
                                    for (let i = 0; i < 10; i++) {f()}
                                    this.del = true
                                }
                                if (x < 0) { explode() } else if (x > window.innerWidth - this.width) { explode() }
                                if (y < 0) { explode() } else if (y > window.innerHeight - this.height) { explode() }
                                collide(this, ()=>{
                                    if (!player.noHit) {
                                        explode()
                                        this.del = true
                                        player.onHit(this.dmg)
                                    }
                                })
                                this.x = x + this.sX
                                this.y = y + this.sY
                            }
                            break
                    }
                }
            })
        },
    }
}

/************/
/** Player **/
/************/

know = [],

player = {
    health: 10,
    x:0,
    y:0,
    iX:0, /* Initial */
    iY:0,
    sX:0, /* Speed (Each tick, your character will move onto a direction this amount) */
    sY:0,
    lX:6, /* Limit */
    lY:6,
    nX:0.6, /* New (if you're moving, you will receive this amount of speed per tick to sX) */
    nY:0.6,
    lvl: 0,
    exp: 0,
    color: colors.entities.player,
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
            const n = ()=>{constructors.entity.particle("enprisonment", player.x + $F[1](), player.y + $F[1](), $F[0](), $F[0](), 5, 5, game.tick * 40)}
            const f = () => { for(let i = 0;i < 10;i++) {n()} }
            const st = (func) => { f(); setTimeout(func, game.tick * 10) }
            st(() => { st(() => { st(() => { st(() => { st(() => { player.lX *= 5; player.lY *= 5; player.nX *= 5; player.nY *= 5 }, game.tick * 25 ) }) }) }) })
        }
    ],
    update: function(){
        game.ctx.fillStyle = this.color;

        let sX = player.sX, sY = player.sY, lY = player.lY, lX = player.lX, keys = game.keys, x = player.x, y = player.y, width = player.width, height = player.height
        game.ctx.fillRect(x, y, width, height)

        if(x < 0) {sX=0;x = 0} else if (x > window.innerWidth - width) {sX=0;x = window.innerWidth - width} else {
            if (sX > lX) { sX = lX } else if (sX < lX * -1) { sX = lX * -1 } else {
                if (keys.a || keys.ArrowLeft || keys.A) { sX -= player.nX; know[0] = false } else { know[0] = true }
                if (keys.d || keys.ArrowRight || keys.D) { sX += player.nX; know[1] = false } else { know[1] = true }
                if (keys.a && keys.A) { game.keys.A = false; game.keys.a = false }
                if (keys.d && keys.D) { game.keys.D = false; game.keys.d = false }

                if (know[0] && know[1]) { if (sX > 0) { sX -= 0.1 } else if (sX < 0) { sX += 0.1 } }
            }
        }

        if(y < 0) {sY=0;y = 0}  else if (y > window.innerHeight - height) {sY=0;y = window.innerHeight - height} else {
            if (sY > lY) { sY = lY } else if (sY < lY * -1) { sY = lY * -1 } else {
                if (keys.w || keys.ArrowUp || keys.W) { sY -= player.nY; know[2] = false } else { know[2] = true }
                if (keys.s || keys.ArrowDown || keys.S) { sY += player.nY; know[3] = false } else { know[3] = true }
                if (keys.w && keys.W) { game.keys.W = false; game.keys.w = false }
                if (keys.s && keys.S) { game.keys.S = false; game.keys.s = false }

                if (know[2] && know[3]) { if (sY > 0) { sY -= 0.1 } else if (sY < 0) { sY += 0.1 } }
            }
        }

        player.sX = sX
        player.x = x + sX

        player.sY = sY
        player.y = y + sY
    }
};
