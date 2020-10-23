const k = [false],

levels = {
    forLevels: {
        generic_enemy_nomove:(wE, hE, x) => {
            game.entities.all.push({
                x: wE - x,
                y: hE,
                color: colors.entities.enemy.normal,
                del: false,
                width: 20,
                height: 20,
                update: function () {
                    game.ctx.fillStyle = this.color;
                    game.ctx.fillRect(map.refX + this.x, map.refY + this.y, 20, 20);
                    collide(this, () => {
                        if (player.events[0].on) {
                            this.del = true; this.color = colors.entities.enemy.hit;
                        }
                    });
                }
            })
        },
        generic_enemy_nomove_with_health:(wE, hE, x) => {
            game.entities.all.push({
                x: wE - x,
                y: hE,
                color: colors.entities.enemy.normal,
                del: false,
                width: 20,
                height: 20,
                update: function () {
                    game.ctx.fillStyle = this.color;
                    game.ctx.fillRect(map.refX + this.x, map.refY + this.y, 20, 20);
                    collide(this, () => {
                        if (player.events[0].on) {
                            if(Math.floor(Math.random() * 6) === 2) {constructors.entity.bonus("health", this.x, this.y, 20, 20)}; this.del = true; this.color = colors.entities.enemy.hit;
                        }
                    });
                }
            })
        },
        generic_enemy_nomove_with_damage:(wE, hE, x, dmg) => {
            game.entities.all.push({
                x: wE - x,
                y: hE,
                color: colors.entities.enemy.normal,
                del: false,
                dmg: dmg,
                width: 20,
                height: 20,
                update: function () {
                    game.ctx.fillStyle = this.color;
                    game.ctx.fillRect(map.refX + this.x, map.refY + this.y, 20, 20);
                    collide(this, () => {
                        if (player.events[0].on) {
                            this.del = true; this.color = colors.entities.enemy.hit;
                        } else if(!player.noHit) {
                            player.onHit(this.dmg)
                        }
                    });
                }
            })
        },
    },
    autoGenerated: [
        {
            name: 1,
            contents: () => {
                const wE = 400;const hE = 390;
                const n = (x)=>{levels.forLevels.generic_enemy_nomove(wE, hE, x)};
                n(10); n(210); n(-190);
                const txt = (nmb, content) => { constructors.text("Oxanium", "15px", 30, nmb, content); };
                txt(75, "Let me introduce you to the basics:");
                txt(60, "The most important principle is: when pressing shift, you can kill enemies and go faster.");
                txt(45, "Also, you can go faster pressing Shift. Anyway, when you kill all enemies in a level, you procced to the next.");
            },
            onload: ()=>{
                player.iX = 390;player.iY = 300;
            },
            onend: [
                ()=>{
                    game.corridorsVisible = true;const wE = 1700;const hE = 390;
                    const n = (x)=>{levels.forLevels.generic_enemy_nomove_with_health(wE, hE, x)};
                    n(10); n(110); n(-90); n(210); n(-190);
                    const txt = (nmb, content) => { constructors.text("Oxanium", "15px", 30, nmb, content); };
                    game.text.all = [];
                    txt(60, "Now, be introduced to enemies dropping health. 1/5 of the time they drop health, 4/5 of the time, nope!");
                    txt(45, "Try it with those dummies. Also, an interesting note is that you can pick the bonus even with full HP.");
                    game.text.update();
                },
                ()=>{
                    game.corridorsVisible = true;const wE = 3000;const hE = 390;
                    const n = (x, dmg)=>{levels.forLevels.generic_enemy_nomove_with_damage(wE, hE, x, dmg)};
                    n(10, 2); n(160, 1); n(-150, 3);
                    const txt = (nmb, content) => { constructors.text("Oxanium", "15px", 30, nmb, content); };
                    game.text.all = [];
                    txt(60, "And now, the last concept you should be familiarized with (for now), damage!");
                    txt(45, "Enemies can do different damage. Try it with these dummies!");
                    game.text.update();
                },
                ()=>{game.stop()},
            ],
            grid: {
                width: 800, height: 800,

                corridor: [{x:800, y:375, width:500, height:50,}, {x:2100, y:375, width:500, height:50,},],

                all: [{x: 0, y: 0,}, {x: 1300, y: 0,}, {x: 2600, y: 0,},],
            },
        },
    ],
    updateMenu: ()=>{
        var DOM = $D[1]("levelSelector")
        let nT = ()=>{return 125 + Math.random() * 300}
        const n = (i) => {
            var newDOM = document.createElement("div"), random = 3 + Math.random() * 7
            let nL = 100 + i * 150
            newDOM.style = "position:absolute;left:" + nL + "px;top:" + nT() + "px;";
            newDOM.addEventListener("click", () => { game.start(i) });
            newDOM.innerHTML = '<div class="levelCircle" style="animation:upDown infinite '+random+'s">'+levels.autoGenerated[i].name+'</div>';
            DOM.appendChild(newDOM);
        }
        var l = levels.autoGenerated.length, width = l * 150 + 200, scroll = document.createElement("div")
        for(var i = 0;i < l;i++) {n(i)};
        scroll.style = 'width:'+width+'px;height:0.1px'
        DOM.appendChild(scroll)
    },
};