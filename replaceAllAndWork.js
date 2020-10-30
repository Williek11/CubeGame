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
];

const id = {
    count: 0,
    new: ()=>{id.count++;return id.count;},
    reduce: ()=>{id.count--},
}

let active = JSON.parse(localStorage.active);

const colorStyle = document.getElementById("colorStyle"),

colors = {
    default: ()=>{
        const H = ()=>{return colors.HTML},
        M = ()=>{return H().menu},
        MC = ()=>{return M().container},
        LS = ()=>{return H().levelSelector},
        LSC = ()=>{return LS().circleLevel},
        BB = ()=>{return H().backButton},
        MCC = ()=>{return MC().customize}

        M().background = "#aaa"
        M().color = "#fff"
        M().textShadow = "#000"
        MC().background = "#ccc"
        MC().background_top = "#ddd"
        MC().background_bottom = "#ccc"
        MC().shadow = "#666"
        MC().borderColor = "#0009"
        MC().borderRadius = "20px"
        MC().borderThickness = "1px"

        LS().background = "#222"
        LS().text = "#fff"
        LSC().background = "#aaa"
        LSC().shadow = "#000"
        LSC().color = "#000"

        BB().background = "#111";BB().text = "#fff";BB().border = "#000";BB().borderRadius = "5px";BB().borderThickness = "1px";BB().shadow = "#000";BB().shadowOffsetY = "2px";BB().shadowOffsetX = "0";BB().shadowBlur = "5px";

        H().game.background = "#111";H().game.text = "#fff";H().game.gridLevel = "#000"

        MCC().background = "#888888";MCC().borderRadius = "5px";MCC().borderColor = "#333333";MCC().borderThickness = "2px";MCC().shadowOffsetX = "0";MCC().shadowOffsetY = "2px";MCC().shadowBlur = "2px";MCC().shadowColor = "#000"

        colors.entities.player = "#00FF00";
        colors.entities.enemy.normal = "#FF0000";
        colors.entities.enemy.hit = "#AA0000";
        colors.entities.enemy.highLight = "770000";
        colors.entities.bonus.health = "#FFFF00";
        colors.entities.bonusMove.slow = "#ffffff";
        colors.entities.projectile.bullet = "#FF00FF";
        colors.entities.projectile.missile = "#FF881C";
    },
    HTML: {
        menu: {
            background: "#aaa",
            color: "#fff",
            textShadow: "#000",
            container: {
                background: "#ccc",
                background_top: "#ddd",
                background_bottom: "#ccc",
                shadow: "#666",
                borderColor: "#000",
                borderRadius: "20px",
                borderThickness: "0",
                customize: {
                    background: "#888",
                    borderColor: "#333",
                    borderRadius: "5px",
                    borderThickness: "2px",
                    shadowColor: "#000",
                    shadowOffsetY: "2px",
                    shadowOffsetX: "0",
                    shadowBlur: "2px"
                }
            }
        },
        levelSelector: {
            background: "#222",
            text: "#fff",
            circleLevel: {
                background: "#aaa",
                shadow: "#000",
                color: "#000"
            }
        },
        backButton: {
            background: "#111",
            text: "#fff",
            border: "#000",
            borderRadius: "5px",
            borderThickness: "1px",
            shadow: "#000",
            shadowOffsetY: "2px",
            shadowOffsetX: "0",
            shadowBlur: "5px",
        },
        game: {
            background: "#111",
            gridLevel: "#000",
            text: "#fff",
        }
    },
    entities: {
        player: "#00FF00",
        enemy: {
            normal: "#FF0000",
            hit: "#AA0000",
            highLight: "#770000",
        },
        bonus: {
            health: "#FFFF00",
        },
        bonusMove: {
            slow: "#ffffff"
        },
        projectile: {
            bullet: "#FF00FF",
            missile: "#FF881C"
        }
    },
    updateHTML: function(){
        colorStyle.innerHTML = `:root {
            --menu-background:${colors.HTML.menu.background};
            --menu-color:${colors.HTML.menu.color};
            --menu-shadow:${colors.HTML.menu.textShadow};
            --menu_container-background-top:${colors.HTML.menu.container.background_top};
            --menu_container-background-bottom: ${colors.HTML.menu.container.background_bottom};
            --menu_container-shadow: ${colors.HTML.menu.container.shadow};
            --menu_container-background: ${colors.HTML.menu.container.background};
            --menu_container-borderColor: ${colors.HTML.menu.container.borderColor};
            --menu_container-borderRadius: ${colors.HTML.menu.container.borderRadius};
            --menu_container-borderThickness: ${colors.HTML.menu.container.borderThickness};

            --customize-background: ${colors.HTML.menu.container.customize.background};
            --customize-border-color: ${colors.HTML.menu.container.customize.borderColor};
            --customize-border-radius: ${colors.HTML.menu.container.customize.borderRadius};
            --customize-border-thickness: ${colors.HTML.menu.container.customize.borderThickness};
            --customize-shadow-color: ${colors.HTML.menu.container.customize.shadowColor};
            --customize-shadow-offsetY: ${colors.HTML.menu.container.customize.shadowOffsetY};
            --customize-shadow-offsetX: ${colors.HTML.menu.container.customize.shadowOffsetX};
            --customize-shadow-blur: ${colors.HTML.menu.container.customize.shadowBlur};

            --levelSelector-background: ${colors.HTML.levelSelector.background};
            --levelSelector-text: ${colors.HTML.levelSelector.text};
            --levelSelector_circleLevel-background: ${colors.HTML.levelSelector.circleLevel.background};
            --levelSelector_circleLevel-shadow: ${colors.HTML.levelSelector.circleLevel.shadow};
            --levelSelector_circleLevel-color: ${colors.HTML.levelSelector.circleLevel.color};

            --backButton-background: ${colors.HTML.backButton.background};
            --backButton-text: ${colors.HTML.backButton.text};
            --backButton-border: ${colors.HTML.backButton.border};
            --backButton-borderRadius: ${colors.HTML.backButton.borderRadius};
            --backButton-borderThickness: ${colors.HTML.backButton.borderThickness};
            --backButton-shadow: ${colors.HTML.backButton.shadow};
            --backButton-shadow-offsetY: ${colors.HTML.backButton.shadowOffsetY};
            --backButton-shadow-offsetX: ${colors.HTML.backButton.shadowOffsetX};
            --backButton-shadow-blur: ${colors.HTML.backButton.shadowBlur};

            --game-background: ${colors.HTML.game.background};
            --game-text: ${colors.HTML.game.text};
        }`
    }
},

colorsFunc = [
    () => {
        const H = () => { return colors.HTML },
        M = () => { return H().menu },
        MC = () => { return M().container },
        LS = () => { return H().levelSelector },
        MCC = () => { return MC().customize }

        active = [true, false, false]
        localStorage.active = JSON.stringify(active)

        M().background = "#1a1a1a"
        MC().background = "#000"
        MC().background_top = "#141414"
        MC().background_bottom = "#0e0e0e"
        MC().shadow = "#000"
        MC().borderThickness = "1px"
        LS().background = "#111"
        H().game.text = "#fff"

        MCC().background = "#050505"
        MCC().borderRadius = "3px"
        MCC().borderColor = "#000"
        MCC().borderThickness = "2px"
        MCC().shadowOffsetX = "0"
        MCC().shadowOffsetY = "2px"
        MCC().shadowBlur = "2px"
        MCC().shadowColor = "#000"

        colors.entities.enemy.highLight = "#770000"
        colors.entities.bonusMove.slow = "#ffffff"
    },
    () => {
        active = [false, true, false]
        localStorage.active = JSON.stringify(active)

        const H = () => { return colors.HTML },
            CE = () => { return colors.entities }

        H().game.text = "#fff"
        CE().bonus.health = "#707070"
        CE().bonusMove.slow = "#FFFFFF"
        CE().enemy.hit = "#808080"
        CE().enemy.normal = "#a3a3a3"
        CE().enemy.highLight = "#5a5a5a"
        CE().projectile.bullet = "#dfdfdf"
        CE().projectile.missile = "#4d4d4d"
        CE().player = "#FFFFFF"
    },
],

activated = ()=>{
    for (var i = 0, l = active.length; i < l; i++) {
        const parent = document.getElementsByClassName("switch")[i]
        const ball = document.getElementsByClassName("ball")[i]
        if (active[i] === true) {
            parent.style.background = "#38e861"
            ball.className = "ball active"

            colors.default()
            colors.updateHTML()

            updateLS = ()=>{
                localStorage.active = JSON.stringify(active)
            }
            switch (i) {
                case 0:
                    colorsFunc[0]()

                    colors.updateHTML()
                    break
                case 1:
                    colorsFunc[1]()
                
                    colors.updateHTML()
                    break
                case 2:
                    active = [false, false, true]
                    updateLS()
                    break
            }
        }
    }
},

themes = (DOMIndex, actionNmb) => {
    const parent = document.getElementsByClassName("switch")[DOMIndex]
    const ball = document.getElementsByClassName("ball")[DOMIndex]
    if (ball.className==="ball inactive") {
        parent.style.background = "#38e861"
        ball.className = "ball active"

        updateLS = ()=>{
            localStorage.active = JSON.stringify(active)
        }

        for(i = 0, l = document.getElementsByClassName("ball").length; i < l;i++) {
            if(document.getElementsByClassName("ball")[i].className === "ball active" && i != DOMIndex) {
                document.getElementsByClassName("switch")[i].style.background = "#666"
                document.getElementsByClassName("ball")[i].className = "ball inactive"
                break
            }
        }

        colors.default()
        colors.updateHTML()

        switch(actionNmb) {
            case 0:
                colorsFunc[0]()

                colors.updateHTML()
                break
            case 1:
                colorsFunc[1]()

                colors.updateHTML()
                break
            case 2:
                active = [false, false, true]
                updateLS()
        }
    } else {
        active[actionNmb] = false
        localStorage.active = JSON.stringify(active)

        parent.style.background = "#666"
        ball.className = "ball inactive"

        colors.default()
        colors.updateHTML()
    }
};

activated();

const menu = {
    back: {
        selectToSelector: ()=>{const back = $D[1]("back");back.removeEventListener("click",menu.back.selectToSelector);back.style="display:none";$D[1]("selector").style.display = "none";$D[1]("select").style.display = "block";},
        selectToLevel: ()=>{const back = $D[1]("back");back.removeEventListener("click",menu.back.selectToLevel);back.addEventListener("click",menu.back.selectToSelector);$D[1]("menu").style.display = "block";$D[1]("selector").style.display = "block";$D[1]("levelSelector").style = "display:none";},
        typeOfLevelToCustomizedLevels: ()=>{
            const back = $D[1]("back");
        back.removeEventListener("click",menu.back.typeOfLevelToCustomizedLevels);
        back.addEventListener("click",menu.back.selectToSelector);
        $D[1]("typeOfLevel").style="display:block";
        $D[1]("customizedLevels").style = "display:none";
        },

        selectToSettings: ()=>{const back = $D[1]("back");back.style = "display:none";back.removeEventListener("click",menu.back.selectToSettings);$D[1]("select").style.display = "block";$D[1]("settings").style.display = "none";},
        settingsToCustomize: ()=>{const back = $D[1]("back");back.addEventListener("click",menu.back.selectToSettings);back.removeEventListener("click",menu.back.settingsToCustomize);$D[1]("settings_menu").style="display:block";$D[1]("customize_menu").style = "display:none";},

        /* Unused
        customizeToCustomizeMenu: ()=>{const back = $D[1]("back");back.addEventListener("click",menu.back.settingsToCustomize);back.removeEventListener("click",menu.back.customizeToCustomizeMenu);$D[1]("customize_menu").style="display:block";$D[1]("customization").style = "display:none";},
        customizeMenuToMenuCustomization: ()=>{menu.templateRemove("customize_menu2","customizeMenuToMenuCustomization","customizeToCustomizeMenu")} */
    },
    selectToSelector: ()=>{
        const back = $D[1]("back");
        back.style = "display:block";
        back.addEventListener("click",menu.back.selectToSelector)
        $D[1]("select").style.display = "none";
        $D[1]("selector").style.display = "block";
    },
    typeOfLevelToCustomizedLevels: ()=>{
        const back = $D[1]("back");
        back.removeEventListener("click",menu.back.selectToSelector);
        back.addEventListener("click",menu.back.typeOfLevelToCustomizedLevels);
        $D[1]("typeOfLevel").style="display:none";
        $D[1]("customizedLevels").style = "display:block";
    },
    selectToLevel: ()=>{
        const back = $D[1]("back");
        back.removeEventListener("click",menu.back.selectToSelector);
        back.addEventListener("click",menu.back.selectToLevel)
        $D[1]("menu").style.display = "none";
        $D[1]("selector").style.display = "none";
        $D[1]("levelSelector").style = "display:block";
    },
    levels: ()=>{
        const levels = $D[1]("levels");
        levels.style="display:block;animation:appear 1 750ms";
    },

    selectToSettings: ()=>{
        const back = $D[1]("back");
        back.style = "display:block";
        back.addEventListener("click",menu.back.selectToSettings)
        $D[1]("select").style.display = "none";
        $D[1]("settings").style.display = "block";
    },
    settingsToCustomize: ()=>{
        const back = $D[1]("back");
        back.removeEventListener("click",menu.back.selectToSettings);
        back.addEventListener("click",menu.back.settingsToCustomize);
        $D[1]("settings_menu").style="display:none";
        $D[1]("customize_menu").style = "display:block";
    },
    customizeToCustomizeMenu: ()=>{
        const back = $D[1]("back");
        back.removeEventListener("click",menu.back.settingsToCustomize);
        back.addEventListener("click",menu.back.customizeToCustomizeMenu);
        $D[1]("customize_menu").style="display:none";
        $D[1]("customization").style = "display:block";
    },

    /* Unused 
    templateCustomize: (show, remove, add)=>{
        const back = $D[1]("back");
        back.removeEventListener("click", menu.back[remove])
        back.addEventListener("click", menu.back[add])
        $D[1](show).style = "display:block"
        $D[1]("customization").style = "display:none"
    },
    templateRemove: (hide, remove, add)=>{
        const back = $D[1]("back");
        back.removeEventListener("click", menu.back[remove])
        back.addEventListener("click", menu.back[add])
        $D[1]("customization").style = "display:block"
        $D[1](hide).style = "display:none"
    },
    customizeMenuToMenuCustomization: ()=>{
        menu.templateCustomize("customize_menu2","customizeToCustomizeMenu", "customizeMenuToMenuCustomization")
    } */
};

const knowLevel = [true],

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
                id: id.new(),
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
        generic_enemy_move_with_damage:(wE, hE, x, sX, sY, chunk, dmg) => {
            game.entities.all.push({
                id: id.new(),
                x: wE - x,
                y: hE,
                chunkNmb: chunk,
                chunk: map.all[chunk],
                color: colors.entities.enemy.normal,
                del: false,
                dmg: dmg,
                sX: sX,
                sY: sY,
                width: 20,
                height: 20,
                update: function () {
                    game.ctx.fillStyle = this.color;
                    let x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                    game.ctx.fillRect(map.refX + x, map.refY + y, 20, 20);
                    if (x < chunkX) { this.sX *= -1; x = chunkX } else if (x > chunkX + map.width - 20) { this.sX *= -1; x = chunkX + map.width - 20; };
                    if (y < chunkY) { this.sY *= -1; y = chunkY } else if (y > chunkY + map.height - 20) { this.sY *= -1; y = chunkY + map.height - 20; };
                    collide(this, () => {
                        if (player.events[0].on) {
                            this.del = true; this.color = colors.entities.enemy.hit;
                        } else if(!player.noHit) {
                            player.onHit(this.dmg)
                        }
                    });
                    this.x = x + this.sX;
                    this.y = y + this.sY;
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
                const txt = (nmb, content) => { constructors.text(30, nmb, content); };
                txt(75, "Let me introduce you to the basics:");
                txt(60, "The most important principle is: when pressing shift, you can kill enemies and go faster.");
                txt(45, "Also, you can go faster pressing Shift. Anyway, when you kill all enemies in a level, you procced to the next.");
            },
            onload: ()=>{player.iX = 390;player.iY = 300;},
            onend: [
                ()=>{
                    game.corridorsVisible = true;const wE = 1700;const hE = 390;
                    const n = (x)=>{levels.forLevels.generic_enemy_nomove_with_health(wE, hE, x)};
                    n(10); n(110); n(-90); n(210); n(-190);
                    const txt = (nmb, content) => { constructors.text(30, nmb, content); };
                    game.text.all = [];
                    txt(60, "Now, be introduced to enemies dropping health. 1/5 of the time they drop health, 4/5 of the time, nope!");
                    txt(45, "Try it with those dummies. Also, an interesting note is that you can pick the bonus even with full HP.");
                    game.text.update();
                },
                ()=>{
                    game.corridorsVisible = true;const wE = 3000;const hE = 390;const add = levels.forLevels.generic_enemy_nomove_with_damage;
                    const n = (x, dmg)=>{add(wE, hE, x, dmg)};
                    n(10, 2); n(160, 1); n(-150, 3);
                    const txt = (nmb, content) => { constructors.text(30, nmb, content); };
                    game.text.all = [];
                    txt(75, "And now, the last concept you should be familiarized with (for now), damage!");
                    txt(60, "Enemies can do different damage. Try it with these dummies!");
                    txt(45, "Also, don't be scared. You regenerate!");
                    game.text.update();
                    game.tickEvents.push(()=>{if(player.health < 10 && knowLevel[0]) {knowLevel[0] = false;setTimeout(()=>{player.onHit(-1);knowLevel[0] = true},game.tick * 40)}})
                },
                ()=>{game.stop()},
            ],
            grid: {
                width: 800, height: 800,
                corridor: [{x:800, y:375, width:500, height:50,}, {x:2100, y:375, width:500, height:50,},],
                all: [{x: 0, y: 0,}, {x: 1300, y: 0,}, {x: 2600, y: 0,},],
            },
        },
        {
            name: 2,
            contents: () => {
                const wE = 400, hE = 390; const add = levels.forLevels.generic_enemy_move_with_damage
                const n = (x)=>{add(wE, hE, x, 5, 5, 0, 2)};
                n(10); n(210); n(-190);
            },
            onload: ()=>{player.iX = 390;player.iY = 300;},
            onend: [
                ()=>{
                    game.corridorsVisible = true;let wE = 1700, hE = 360;const add = levels.forLevels.generic_enemy_move_with_damage;
                    const n = (x)=>{add(wE, hE, x, 5, 5, 1, 1)};
                    n(10); n(110); n(-90); n(210); n(-190);
                    hE = 420;
                    n(10); n(110); n(-90); n(210); n(-190);
                },
                ()=>{
                    game.corridorsVisible = true;let wE = 3000, hE = 390;
                    const rng = Math.random; const round = Math.round;
                    const random = ()=>{if(round(rng()) === 0) {return rng() * 10} else {return -rng() * 10}};
                    const n = ()=>{levels.forLevels.generic_enemy_move_with_damage(wE, hE, 10, random(), random(), 2, 1)};
                    n(); n(); n(); n(); n(); n(); n(); n(); n(); n();
                },
                ()=>{game.stop()},
            ],
            grid: {
                width: 800, height: 800,
                corridor: [{x:800, y:375, width:500, height:50,}, {x:2100, y:375, width:500, height:50,},],
                all: [{x: 0, y: 0,}, {x: 1300, y: 0,}, {x: 2600, y: 0,},],
            },
        },
        {
            name: 3,
            contents: () => {
                let wE = 400, hE = 390;
                const newB = constructors.entity.projectile;
                const n = (x)=>{newB("bullet", wE - x, hE, 1, 1, 20, 20, 1, 0)};
                n(10); n(110); n(-90);
                hE = 490;
                n(10); n(110); n(-90);
                hE = 290;
                n(10); n(110); n(-90);
            },
            onload: ()=>{player.iX = 390;player.iY = 100;},
            onend: [
                ()=>{
                    game.corridorsVisible = true;let wE = 1700, hE = 390;
                    const add = levels.forLevels.generic_enemy_move_with_damage;
                    const n = (x)=>{add(wE, hE, x, 5, 5, 1, 1)};
                    n(10); n(110); n(-90);
                    hE = 490;
                    n(10); n(110); n(-90);
                    hE = 290;
                    n(10); n(110); n(-90);
                    game.tickEvents.push(()=>{if(game.ticksPassed % 100 === 0) {
                        const newB = constructors.entity.projectile; const rng = Math.random; const round = Math.round;
                        const random = ()=>{if(round(rng()) === 1) {return rng() * 10} else {return -rng() * 10}};
                        for(var i = 0, a = game.entities.all, l = a.length;i < l;i++) {if(a[i].type === undefined){newB("bullet", a[i].x, a[i].y, random(), random(), 20, 20, 1, a[i].chunkNmb);}}
                    }})
                },
                ()=>{
                    game.corridorsVisible = true;let wE = 3000, hE = 390;
                    const round = Math.round; const rng = Math.random;
                    const random = ()=>{if(round(rng()) === 0) {return rng() * 10} else {return -rng() * 10}};
                    const add = levels.forLevels.generic_enemy_move_with_damage;
                    const n = ()=>{add(wE, hE, 10, random(), random(), 2, 1)};
                    n(); n(); n(); n(); n(); n(); n(); n(); n(); n();
                },
                ()=>{game.stop()},
            ],
            grid: {
                width: 800, height: 800,
                corridor: [{x:800, y:375, width:500, height:50,}, {x:2100, y:375, width:500, height:50,},],
                all: [{x: 0, y: 0,}, {x: 1300, y: 0,}, {x: 2600, y: 0,},],
            },
        },
        {
            name: 4,
            contents: () => {
                let wE = 400, hE = 390;
                const newM = constructors.entity.projectile;
                const n = (x)=>{newM("missile", wE - x, hE, 1, 1, 20, 20, 1, 0)};
                n(10); n(110); n(-90);
                hE = 490;
                n(10); n(110); n(-90);
                hE = 290;
                n(10); n(110); n(-90);
            },
            onload: ()=>{player.iX = 390;player.iY = 100;},
            onend: [
                ()=>{
                    game.corridorsVisible = true;let wE = 1700, hE = 390;
                    const add = levels.forLevels.generic_enemy_move_with_damage;
                    const n = (x)=>{add(wE, hE, x, 5, 5, 1, 1)};
                    n(10); n(110); n(-90);
                    hE = 490;
                    n(10); n(110); n(-90);
                    hE = 290;
                    n(10); n(110); n(-90);
                    game.tickEvents.push(()=>{if(game.ticksPassed % 250 === 0) {
                        const newM = constructors.entity.projectile; const rng = Math.random; const round = Math.round;
                        const random = ()=>{if(round(rng()) === 1) {return rng() * 10} else {return -rng() * 10}};
                        for(var i = 0, a = game.entities.all, l = a.length;i < l;i++) {if(a[i].type === undefined){newM("missile", a[i].x, a[i].y, random(), random(), 20, 20, 1, a[i].chunkNmb);}}
                    }})
                },
                ()=>{
                    game.corridorsVisible = true;let wE = 3000, hE = 390;
                    const round = Math.round; const rng = Math.random;
                    const random = ()=>{if(round(rng()) === 0) {return rng() * 10} else {return -rng() * 10}};
                    const add = levels.forLevels.generic_enemy_move_with_damage;
                    const n = ()=>{add(wE, hE, 10, random(), random(), 2, 1)};
                    n(); n(); n(); n(); n(); n(); n(); n(); n(); n();
                },
                ()=>{game.stop()},
            ],
            grid: {
                width: 800, height: 800,
                corridor: [{x:800, y:375, width:500, height:50,}, {x:2100, y:375, width:500, height:50,},],
                all: [{x: 0, y: 0,}, {x: 1300, y: 0,}, {x: 2600, y: 0,},],
            },
        },
        {
            name: 5,
            contents: () => {
                let wE = 400, hE = 390;
                const newS = constructors.entity.bonusMove;
                const n = (x)=>{newS("slow", wE - x, hE, 1, 1, 20, 20, 0, undefined)};
                n(10);
            },
            onload: ()=>{player.iX = 390;player.iY = 100;},
            onend: [
                ()=>{
                    game.corridorsVisible = true;let wE = 1700, hE = 390;
                    const add = levels.forLevels.generic_enemy_move_with_damage;
                    const n = (x)=>{add(wE, hE, x, 5, 5, 1, 1)};
                    n(10); n(110); n(-90);
                    hE = 490;
                    n(10); n(110); n(-90);
                    hE = 290;
                    n(10); n(110); n(-90);
                    game.tickEvents.push(()=>{if(game.ticksPassed % 150 === 0) {
                        const newS = constructors.entity.bonusMove; const rng = Math.random; const round = Math.round;
                        const random = ()=>{if(round(rng()) === 1) {return rng() * 10} else {return -rng() * 10}};
                        for(var i = 0, a = game.entities.all, l = a.length;i < l;i++) {if(a[i].type === undefined){a[i].color = colors.entities.enemy.highLight; newS("slow", a[i].x, a[i].y, random(), random(), 20, 20, a[i].chunkNmb, a[i].id);break}}
                    }})
                },
                ()=>{
                    game.corridorsVisible = true;let wE = 3000, hE = 390;
                    const round = Math.round; const rng = Math.random;
                    const random = ()=>{if(round(rng()) === 0) {return rng() * 10} else {return -rng() * 10}};
                    const add = levels.forLevels.generic_enemy_move_with_damage;
                    const n = ()=>{add(wE, hE, 10, random(), random(), 2, 1)};
                    n(); n(); n(); n(); n(); n(); n(); n(); n(); n();
                },
                ()=>{game.stop()},
            ],
            grid: {
                width: 800, height: 800,
                corridor: [{x:800, y:375, width:500, height:50,}, {x:2100, y:375, width:500, height:50,},],
                all: [{x: 0, y: 0,}, {x: 1300, y: 0,}, {x: 2600, y: 0,},],
            },
        },
        {
            name: "B",
            contents: () => {
                constructors.entity.enemy("boss1", 20, 725, 400, 7.5, 7.5, 50, 50, 2, 0);
            },
            onload: ()=>{player.iX = 740;player.iY = 200;},
            onend: [
                ()=>{game.stop()},
            ],
            grid: {
                width: 1500, height: 800,
                corridor: [,],
                all: [{x: 0, y: 0,},],
            },
        },
    ],
    updateMenu: ()=>{
        const DOM = $D[1]("levelSelector");
        const rng = Math.random;
        const nT = ()=>{return 125 + rng() * 300};
        const n = (i) => {
            var newDOM = document.createElement("div"), random = 3 + rng() * 7;
            let nL = 100 + i * 150;
            newDOM.style = "position:absolute;left:" + nL + "px;top:" + nT() + "px;";
            newDOM.addEventListener("click", () => { game.start(i) });
            newDOM.innerHTML = '<div class="levelCircle" style="animation:upDown infinite '+random+'s">'+levels.autoGenerated[i].name+'</div>';
            DOM.appendChild(newDOM);
        }
        var l = levels.autoGenerated.length, width = l * 150 + 200, scroll = document.createElement("div");
        for(var i = 0;i < l;i++) {n(i)};
        scroll.style = 'width:'+width+'px;height:0.1px';
        DOM.appendChild(scroll);
    },
};

/************/
/** Entity **/
/************/

const collide = (self, f)=>{
    if (player.x <= self.x + self.width && self.x <= player.x + player.width && player.y <= self.y + self.height && self.y <= player.y + player.height) {
        f()
    }
}

const map = {
    width: undefined,
    height: undefined,
    x:undefined,
    y:undefined,
    contents:undefined,
    all: undefined,
    refX: undefined,
    refY: undefined,
    update: function (i) {
        this.contents = levels.autoGenerated[i].contents
        this.width = levels.autoGenerated[i].grid.width
        this.height = levels.autoGenerated[i].grid.height
        this.all = levels.autoGenerated[i].grid.all
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
    text: (x, y, content) => {
        game.text.all.push({
            font:game.text.fontFamily,
            size:game.text.fontSize,
            x:x,
            y:y,
            content:content,
        })
    },
    entity: {
        enemy: function (type, hp, x, y, sX, sY, width, height, dmg, chunk) {
            game.entities.all.push({
                id: undefined,
                chunk: map.all[chunk],
                chunkNmb: chunk,
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
                    this.id = id.new();
                    if (this.dmg === undefined) { this.dmg = 1 }
                    switch (this.type) {
                        case "generic":
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                let x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                                game.ctx.fillRect(map.refX + x, map.refY + y, this.width, this.height);
                                if (x < chunkX) { this.sX *= -1; x = 0 } else if (x > chunkX + map.width - this.width) { this.sX *= -1; x = chunkX + map.width - this.width };
                                if (y < chunkY) { this.sY *= -1; y = 0 } else if (y > chunkY + map.height - this.height) { this.sY *= -1; y = chunkY + map.height - this.height };
                                collide(this, () => {
                                    if (player.events[0].on && !this.noHit) {
                                        if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", x, y, width, height) }; this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, game.tick * 40); if (this.hp <= 0) { this.del = true }
                                    }
                                    else if (!player.noHit && !player.events[0].on) { player.onHit(this.dmg) }
                                });
                                this.x = x + this.sX;
                                this.y = y + this.sY;
                            }
                            break
                        case "boss1":
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                game.ctx.fillRect(map.refX + this.x, map.refY + this.y, this.width, this.height);
                                
                                if (!this.know[0] && this.hp > 5) {
                                    this.know[0] = true
                                    setTimeout(() => { this.know[0] = false }, game.tick * 300)
                                    switch (Math.floor(Math.random() * 4)) {
                                        case 0:
                                            var x, y, width = this.width / 3.5, height = this.height / 3.5, rng = ()=>{return 2.5 + Math.random() * 5}, summon = constructors.entity.enemy,
                                            n = (p1, p2)=>{summon("generic", 1, x, y, p1, p2, width, height, 1, this.chunkNmb)},
                                            f = ()=>{x = this.x + (width / 1.75), y = this.y + (height / 1.75); n(0, -rng());n(rng(), 0);n(0, rng());n(-rng(), 0)};
                                            f(); setTimeout(() => { f() }, game.tick * 40);
                                            break
                                        case 1:
                                            var x, y, width = this.width / 5, height = this.height / 5, f2 = $F[2], summon = constructors.entity.projectile,
                                            n = ()=>{summon("bullet", x, y, f2(), f2(), width, height, 1, this.chunkNmb)},
                                            f = () => { x = this.x + (width / 2.5), y = this.y + (height / 2.5); for(let i = 0;i < 50;i++) {n()} };
                                            f();
                                            setTimeout(() => { f(); setTimeout(() => { f() }, game.tick * 40) }, game.tick * 40);
                                            break
                                        case 2:
                                            var x,y,width = this.width/3,height = this.height/3, rng = ()=>{return 2.5 + Math.random() * 2.5}, summon = constructors.entity.projectile,
                                            n = (p1, p2)=>{summon("missile", x, y, p1, p2, width, height, 5, this.chunkNmb)},
                                            f = () => { x = this.x + width/1.5, y = this.y + height/1.5; n(0, -rng());n(rng(), 0);n(0, rng());n(-rng(), 0)};
                                            f();
                                            setTimeout(() => { f() }, game.tick * 40);
                                            break
                                        case 3:
                                            constructors.entity.bonusMove("slow", this.x + (this.width / 4), this.y + (this.height / 4), $F[2](), $F[2](), this.width / 2, this.height / 2, this.chunkNmb, this.id);
                                    }
                                } else if (this.hp <= 5) {
                                    this.update = function () {game.ctx.fillStyle = this.color; game.ctx.fillRect(map.refX + this.x, map.refY + this.y, this.width, this.height);
                                        var x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                                        let cx, cy, cwidth = this.width / 5, cheight = this.height / 5, f2 = $F[2], t = game.tick,
                                        
                                        nH = ()=>{constructors.entity.bonus("health", this.x - 5 + (this.width / 2), this.y - 5 + (this.height / 2), 10, 10)},
                                        summon = constructors.entity.projectile,
                                        chunkNmb = this.chunkNmb,
                                        n = ()=>{summon("bullet", cx, cy, f2(), f2(), cwidth, cheight, 1, chunkNmb)},
                                        f = ()=>{cx = this.x + (this.width / 2.5), cy = this.y + (this.height / 2.5); for(let i = 0;i < 25;i++) {n()}},
                                        c = ()=>{this.color = colors.entities.enemy.hit; setTimeout(() => { this.color = colors.entities.enemy.normal }, t * 5)};
                                        if (x < chunkX) { this.sX *= -1; x = chunkX; c(); f() } else if (x > chunkX + map.width - this.width) { this.sX *= -1; x = chunkX + map.width - this.width; c(); f() };
                                        if (y < chunkY) { this.sY *= -1; y = chunkY; c(); f() } else if (y > chunkY + map.height - this.height) { this.sY *= -1; y = chunkY + map.height - this.height; c(); f() };
                                        collide(this, ()=>{
                                            c();
                                            if (player.events[0].on && !this.noHit) {nH(); this.hp--; this.noHit = true; setTimeout(() => { this.noHit = false }, t * 40); if (this.hp <= 0) { this.del = true }}
                                            else if (!player.events[0].on && !player.noHit) { player.onHit(this.dmg) }
                                            if (!this.know[1] && this.hp > 0) {setTimeout(() => {
                                                cx = this.x + (this.width / 2.5), cy = this.y + (this.height / 2.5); for(let i = 0;i < 200;i++) {n()}; setTimeout(() => { this.know[1] = false }, t * 20) }, t * 20);this.know[1] = true};
                                        });
                                        this.x = x + this.sX;this.y = y + this.sY;
                                    }
                                }
                                var x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                                var c = ()=>{this.color = colors.entities.enemy.hit; setTimeout(() => { this.color = colors.entities.enemy.normal }, game.tick * 5)}
                                if (x < chunkX) { this.sX *= -1; x = chunkX; c() } else if (x > chunkX + map.width - this.width) { this.sX *= -1; x = chunkX + map.width - this.width; c() };
                                if (y < chunkY) { this.sY *= -1; y = chunkY; c() } else if (y > chunkY + map.height - this.height) { this.sY *= -1; y = chunkY + map.height - this.height; c() };
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
        bonus: function (type, x, y, width, height, chunk) {
            game.entities.all.push({
                chunk: map.all[chunk],
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
                                game.ctx.fillStyle = this.color;
                                game.ctx.fillRect(map.refX + this.x, map.refY + this.y, this.width, this.height);
                                collide(this, ()=>{
                                    if(!player.noHit) {this.del = true; if(player.health < 10) {player.onHit(-1);}}
                                })
                            }
                            break
                    }
                }
            })
        },
        bonusMove: function (type, x, y, sX, sY, width, height, chunk, parentId) {
            game.entities.all.push({
                parentId: parentId,
                chunk: map.all[chunk],
                type: type,
                x: x,
                y: y,
                sX: sX,
                sY: sY,
                del: false,
                color: colors.entities.bonusMove.slow,
                width: width,
                height: height,
                parentCheck: function () {
                    parentAlive = false;
                    for(var i = 0, a = game.entities.all, l = a.length;i < l;i++) {
                        if(a[i].id === this.parentId) {
                            parentAlive = true;
                            break;
                        }
                    }
                    if(parentAlive === false) {
                        this.del = true;
                    }
                },
                update: function () {
                    if(this.parentId === undefined) {console.log(this);this.parentCheck = ()=>{}}
                    switch (this.type) {
                        case "slow":
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                let x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                                game.ctx.fillRect(map.refX + x, map.refY + y, this.width, this.height);
                                if (x < chunkX) { this.sX *= -1; x = chunkX } else if (x > chunkX + map.width - this.width) { this.sX *= -1; x = chunkX + map.width - this.width };
                                if (y < chunkY) { this.sY *= -1; y = chunkY } else if (y > chunkY + map.height - this.height) { this.sY *= -1; y = chunkY + map.height - this.height };
                                collide(this, ()=>{
                                    this.del = true;
                                    player.eventByCall[0]()
                                })
                                this.parentCheck();
                                this.x = x + this.sX;
                                this.y = y + this.sY;
                            }
                            break
                    }
                }
            })
        },
        particle: function (type, x, y, sX, sY, width, height, lifespan, chunk) {
            game.entities.all.push({
                chunk: map.all[chunk],
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
                            this.color = colors.entities.bonusMove.slow;
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                let x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                                game.ctx.fillRect(map.refX + x, map.refY + y, this.width, this.height);
                                if (x < chunkX) { this.sX *= -1; x = 0 } else if (x > chunkX + map.width - this.width) { this.sX *= -1; x = chunkX + map.width - this.width };
                                if (y < chunkY) { this.sY *= -1; y = 0 } else if (y > chunkY + map.height - this.height) { this.sY *= -1; y = chunkY + map.height - this.height };
                                this.x = x + this.sX;
                                this.y = y + this.sY;
                            }
                            break
                        case "explosion":
                            this.color = colors.entities.projectile.missile;
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                let x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                                game.ctx.fillRect(map.refX + this.x, map.refY + this.y, this.width, this.height)
                                if (x < chunkX) { this.sX *= -1; x = 0 } else if (x > chunkX + map.width - this.width) { this.sX *= -1; x = chunkX + map.width - this.width };
                                if (y < chunkY) { this.sY *= -1; y = 0 } else if (y > chunkY + map.height - this.height) { this.sY *= -1; y = chunkY + map.height - this.height };
                                collide(this, ()=>{
                                    if (!player.noHit) {
                                        player.onHit(1);
                                    }
                                })
                                this.x = x + this.sX;
                                this.y = y + this.sY;
                            }
                            break
                    }
                }
            })
        },
        projectile: function (type, x, y, sX, sY, width, height, dmg, chunk) {
            game.entities.all.push({
                chunk: map.all[chunk],
                chunkNmb: chunk,
                type: type,
                x: x,
                y: y,
                dmg: dmg,
                sX: sX,
                sY: sY,
                del: false,
                width: width,
                height: height,
                update: function () {
                    switch (this.type) {
                        case "bullet":
                            this.color = colors.entities.projectile.bullet;
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                let x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                                game.ctx.fillRect(map.refX + x, map.refY + y, this.width, this.height);
                                if (x < chunkX) { this.del = true } else if (x > chunkX + map.width - this.width) { this.del = true; };
                                if (y < chunkY) { this.del = true } else if (y > chunkY + map.height - this.height) { this.del = true; };
                                collide(this, ()=>{
                                    if (!player.noHit) {
                                        this.del = true;
                                        player.onHit(this.dmg);
                                    }
                                })
                                this.x = x + this.sX;
                                this.y = y + this.sY;
                            }
                            break
                        case "missile":
                            this.color = colors.entities.projectile.missile;
                            this.update = function () {
                                game.ctx.fillStyle = this.color;
                                let x = this.x, y = this.y, chunk = this.chunk, chunkX = chunk.x, chunkY = chunk.y;
                                game.ctx.fillRect(map.refX + x, map.refY + y, this.width, this.height);
                                const explode = () => {
                                    let tX = x + this.width / 2, tY = y + this.height / 2, t = game.tick, name = "explosion", f0 = $F[0], rng = Math.random, f = ()=>{constructors.entity.particle(name, tX, tY, f0() * 5, f0() * 5, 5 + f0(), 5 + f0(), rng() * 160 * t, this.chunkNmb)}
                                    for (let i = 0; i < 10; i++) {f()}
                                    this.del = true
                                }
                                if (x < chunkX) { explode() } else if (x > chunkX + map.width - this.width) { explode(); };
                                if (y < chunkY) { explode() } else if (y > chunkY + map.height - this.height) { explode(); };
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
},

/************/
/** Player **/
/************/

know = [],

player = {
    health: 10,
    currentChunkNumber: 0,
    chunk: undefined,
    x:0,
    y:0,
    iX:0, /* Initial */
    iY:0,
    sX:0, /* Speed (Each tick, your character will move onto a direction this amount) */
    sY:0,
    lX:5, /* Limit */
    lY:5,
    nX:0.5, /* New (if you're moving, you will receive this amount of speed per tick to sX) */
    nY:0.5,
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
            () => { return player.events[0].currentCooldown === 0 ? true : false },
            () => { player.noHit = true; const self = player.events[0]; self.on = true; self.currentCooldown = 1; player.lX *= 3; player.lY *= 3; player.nX *= 4; player.nY *= 4; setTimeout(() => { self.on = false; player.lX /= 3; player.lY /= 3; player.nX /= 4; player.nY /= 4; setTimeout(()=>{player.noHit = false; setTimeout(()=>{self.currentCooldown = 0 },game.tick * 40)},game.tick * 20)}, game.tick * 10) },
            () => {},
        ),
        constructors.event("Speed",
            "Shift",
            () => { return player.events[1].currentCooldown === 0 ? true : false },
            () => { const self = player.events[1]; self.on = true; self.currentCooldown = 1; player.lX *= 2; player.lY *= 2;setTimeout(() => { self.on = false; player.lX /= 2; player.lY /= 2; setTimeout(()=>{self.currentCooldown = 0 },game.tick * 160)}, game.tick * 40) },
            () => {},
        ),
    ],
    eventByCall: [
        ()=>{ /* Slow */
            player.lX /= 5; player.lY /= 5; player.nX /= 5; player.nY /= 5
            const n = ()=>{constructors.entity.particle("enprisonment", player.x + $F[1](), player.y + $F[1](), $F[0](), $F[0](), 5, 5, game.tick * 40, player.currentChunkNumber)}
            const f = () => { for(let i = 0;i < 10;i++) {n()} }
            const st = (func) => { f(); setTimeout(func, game.tick * 10) }
            st(() => { st(() => { st(() => { st(() => { st(() => { player.lX *= 5; player.lY *= 5; player.nX *= 5; player.nY *= 5 }, game.tick * 25 ) }) }) }) })
        }
    ],
    update: function(){
        game.ctx.fillStyle = this.color;

        let sX = player.sX, sY = player.sY, lY = player.lY, lX = player.lX, keys = game.keys, x = player.x, y = player.y, width = player.width, height = player.height, chunk = this.chunk, corridor = levels.autoGenerated[game.index].grid.corridor[player.currentChunkNumber], scaled = 2, margin = 55
        game.ctx.fillRect(map.x - player.width / 2, map.y - player.height / 2, width, height);
        game.ctx.fillRect(margin + (x / 8) / scaled - width, margin + (y / 8) / scaled - height, width / scaled, height / scaled);

        let playerCalculationsX = ()=>{
            if (sX > lX) { sX = lX } else if (sX < lX * -1) { sX = lX * -1 } else {
                if (keys.a || keys.ArrowLeft || keys.A) { sX -= player.nX; know[0] = false } else { know[0] = true }
                if (keys.d || keys.ArrowRight || keys.D) { sX += player.nX; know[1] = false } else { know[1] = true }
                if (keys.a && keys.A) { game.keys.A = false; game.keys.a = false }
                if (keys.d && keys.D) { game.keys.D = false; game.keys.d = false }

                if (know[0] && know[1]) { if (sX > 0) { sX -= 0.1 } else if (sX < 0) { sX += 0.1 }}
            }
        }

        let playerCalculationsY = ()=>{
            if (sY > lY) { sY = lY } else if (sY < lY * -1) { sY = lY * -1 } else {
                if (keys.w || keys.ArrowUp || keys.W) { sY -= player.nY; know[2] = false } else { know[2] = true }
                if (keys.s || keys.ArrowDown || keys.S) { sY += player.nY; know[3] = false } else { know[3] = true }
                if (keys.w && keys.W) { game.keys.W = false; game.keys.w = false }
                if (keys.s && keys.S) { game.keys.S = false; game.keys.s = false }

                if (know[2] && know[3]) { if (sY > 0) { sY -= 0.1 } else if (sY < 0) { sY += 0.1 } }
            }
        }

        /*If corridors not visible*/ if(!game.corridorsVisible) {
            if (x < chunk.x) { sX = 0; x = chunk.x; } else if (x > chunk.x + map.width - width) { sX = 0; x = chunk.x + map.width - width; } else {
                playerCalculationsX()
            }
            if (y < chunk.y) { sY = 0; y = chunk.y; } else if (y > chunk.y + map.height - height) { sY = 0; y = chunk.y + map.height - height; } else {
                playerCalculationsY()
            }
        } /*If corridors visible*/ else {
            /*If in corridor*/
            if (x <= corridor.x + corridor.width && corridor.x <= x + width && y <= corridor.y + corridor.height && corridor.y <= y + height) {                
                playerCalculationsX();

                if (y < corridor.y) { sY = 0; y = corridor.y;}
                else if (y > corridor.y + corridor.height - height) { sY = 0; y = corridor.y + corridor.height - height;}
                else {
                    playerCalculationsY()
                }
            }

            /* If in a square outside corridor */
            else if (x <= corridor.x + corridor.width + width + lX
                && corridor.x <= x + width
                && y <= corridor.y + corridor.height
                && corridor.y <= y + height) {
                game.corridorsVisible = false; player.currentChunkNumber++; player.chunk = map.all[player.currentChunkNumber];
            }
            
            /*If not on corridor*/
            else {
                if (x < chunk.x + sX) { sX = 0; x = chunk.x }
                else if (x > chunk.x + map.width - width) { sX = 0; x = chunk.x + map.width - width }
                else {
                    playerCalculationsX()
                }

                if (y < chunk.y + sY) { sY = 0; y = chunk.y }
                else if (y > chunk.y + map.height - height) { sY = 0; y = chunk.y + map.height - height; }
                else {
                    playerCalculationsY()
                }
            }
        }

        player.sX = sX;
        player.x = x + sX;

        player.sY = sY;
        player.y = y + sY;
    }
};

/**************/
/**** Game ****/
/**************/

let intervalStart
let intervalMapUpdate

const game = {
    eventsInterpretor: (i) => {
        const event = player.events[i]
        if(game.keys[event.key]) {if(event.condition() === true) {event.whenHappen()} else {event.whenNo()}}
    },
    cursor: {
        x:0,
        y:0,
    },
    corridorsVisible: false,
    onEndEvent: 0,
    ticksPassed: 0,
    sure: true,
    keys: {},
    canvas: $D[1]("canvas"),
    ctx: $D[1]("canvas").getContext("2d"),
    tick: 20,
    tickEvents: [],
    debugAccess: false,
    stop: ()=>{
        clearInterval(intervalStart)
        game.ticksPassed = 0
        const gam = $D[1]("game");
        gam.style.animation = "disappear 1 1s";
        const a = "animation:appear 1 1s;display:block"
        $D[1]("levelSelector").style = a;
        $D[1]("back").style = a
        game.text.all = []
        game.tickEvents = []
        player.sX = 0;
        player.sY = 0;
        setTimeout(() => { gam.style = "display:none"; }, 900)},
    resize:()=>{
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;
    },
    updateScreen: ()=>{
        intervalMapUpdate = setInterval(()=>{
            const ctx = game.ctx
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            ctx.fillStyle = colors.HTML.game.gridLevel

            const mapX = window.innerWidth / 2 + game.cursor.x;
            const mapY = window.innerHeight / 2 + game.cursor.y;
            map.x = mapX;
            map.y = mapY;
            const refX = mapX - player.x - player.width / 2;
            const refY = mapY - player.y - player.height / 2;
            map.refX = refX;
            map.refY = refY;
            ctx.fillRect(refX, refY, map.width, map.height);
            let containers = levels.autoGenerated[game.index].grid.all;

            for (let i = 0, l = containers.length;i < l;i++) {
                let SubI = containers[i];
                ctx.fillRect(refX + SubI.x, refY + SubI.y, map.width, map.height);
            };

            for(var i = 0,a = game.entities.all, l = a.length;i < l;i++) {
                const subject = a[i]
                ctx.fillStyle = subject.color;
                ctx.fillRect(refX + subject.x, refY + subject.y, subject.width, subject.height);
            };

            ctx.fillStyle = player.color;
            ctx.fillRect(map.x - player.width / 2, map.y - player.height / 2, player.width, player.height);
        }, game.tick)
    },
    update: ()=>{
        if (game.entities.all.length > 0) {

            if (game.ticksPassed % 5 === 0) {
                const keys = game.keys;
                if (keys["Alt"]) {
                    if(keys["F12"]) {
                        if(!game.debugAccess) {
                            game.debugAccess = true;
                        } else {
                            game.debugAccess = false;
                        }
                    }
                }
            }
            
            for (let GEA = game.entities.all, i = GEA.length - 1; i >= 0; i--) { if (GEA[i].del) { GEA.splice(i, 1) } };
            for (let i = 0, a = game.tickEvents, l = a.length;i < l; i++) { a[i]() }
            for (let i = 0, l = player.events.length; i < l; i++) { game.eventsInterpretor(i) };

            game.ticksPassed++

            const ctx = game.ctx;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            ctx.fillStyle = colors.HTML.game.gridLevel

            const mapX = window.innerWidth / 2 + game.cursor.x;
            const mapY = window.innerHeight / 2 + game.cursor.y;
            map.x = mapX;
            map.y = mapY;
            const refX = mapX - player.x - player.width / 2;
            const refY = mapY - player.y - player.height / 2;
            map.refX = refX;
            map.refY = refY;
            const containers = map.all;
            const margin = 40;
            const scaled = 16;
            
            ctx.fillStyle = colors.HTML.game.gridLevel

            let l = containers.length;

            for (let i = 0;i < l;i++) {
                const SubI = containers[i]
                ctx.fillRect(refX + SubI.x, refY + SubI.y, map.width, map.height)
            };

            ctx.fillStyle = "#444444aa"
            for(let i = 0;i < l;i++) {
                const SubI = containers[i]
                ctx.fillRect(margin + SubI.x / scaled, margin + SubI.y / scaled, map.width / scaled, map.height / scaled)
            };

            if (game.corridorsVisible) {
                let subject = levels.autoGenerated[game.index].grid.corridor[player.currentChunkNumber];
                ctx.fillStyle = colors.HTML.game.gridLevel;
                ctx.fillRect(refX + subject.x, refY + subject.y, subject.width, subject.height);
                ctx.fillStyle = "#444444aa";
                ctx.fillRect(margin + subject.x / scaled, margin + subject.y / scaled - (player.height / 4), subject.width / scaled, subject.height / (scaled / 4));
            }

            for(let i = 0, l = game.entities.all.length;i < l;i++) {game.entities.all[i].update()};
            player.update();
        } else {
            levels.autoGenerated[game.index].onend[game.onEndEvent]();
            game.onEndEvent++;
        }
    },
    entities: {
        all:[],
        add: ()=>{},
        idChoose: 0,
    },
    text: {
        all:[],
        fontFamily: "Oxanium",
        fontSize: "15px",
        update: () => {
            const additionalText = $D[1]("additionalText");
            additionalText.innerHTML = "";
            for (let i = 0, l = game.text.all.length; i < l; i++) {
                additionalText.innerHTML += `<div style="font-weight: 100 !important;color:${colors.HTML.game.text};font-size:${game.text.all[i].size};font-family:Oxanium;position:absolute;left:${game.text.all[i].x + "px"};bottom:${game.text.all[i].y + "px"}">${game.text.all[i].content}</div>`;
            };
        }
    },
    restart: ()=>{
        game.stop();
    },
    start: (i)=>{
        player.currentChunkNumber = 0;
        game.corridorsVisible = false;
        player.color = colors.entities.player;
        map.update(i);
        player.chunk = map.all[0];
        game.index = i;
        game.onEndEvent = 0;

        if(levels.autoGenerated[i].onload !== undefined) {levels.autoGenerated[i].onload()};
        if(levels.autoGenerated[i].perTick !== undefined) {game.tickEvents.push(levels.autoGenerated[i].perTick)};

        player.x = player.iX;
        player.y = player.iY;
        player.health = 10;
        $D[1]("health").innerHTML=`You have ${player.health} points of health.`;
        game.entities.all=[];
        const levelS = $D[1]("levelSelector");
        levelS.style.animation = "disappear 1 1s";
        const buttonBack = $D[1]("back");
        buttonBack.style.animation = "disappear 1 1s";
        const gam = $D[1]("game");
        gam.style = "animation:appear 1 1s;display:block";
        game.resize();
        map.contents();
        for(let i = 0, l = game.entities.all.length;i < l;i++) {game.entities.all[i].update()};
        
        const ctx = game.ctx;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        ctx.fillStyle = colors.HTML.game.gridLevel

        const mapX = window.innerWidth / 2 + game.cursor.x;
        const mapY = window.innerHeight / 2 + game.cursor.y;
        map.x = mapX;
        map.y = mapY;
        const refX = mapX - player.x - player.width / 2;
        const refY = mapY - player.y - player.height / 2;
        map.refX = refX;
        map.refY = refY;
        const containers = map.all;

        ctx.fillStyle = colors.HTML.game.gridLevel

        let l = containers.length;

        for (let i = 0; i < l; i++) {
            const SubI = containers[i]
            ctx.fillRect(refX + SubI.x, refY + SubI.y, map.width, map.height)
        };

        for (let i = 0, a = game.entities.all, l = a.length; i < l; i++) {
            e = a[i];
            ctx.fillRect(refX + e.x, refY + e.y, e.width, e.height);
        }

        ctx.fillRect(map.x - player.width / 2, map.y - player.height / 2, player.width, player.height);

        game.text.update();

        game.updateScreen();

        setTimeout(()=>{
            levelS.style = "display:none";
            buttonBack.style = "display:none";
            setTimeout(()=>{intervalStart = setInterval(game.update,game.tick);clearInterval(intervalMapUpdate)},200);
        },900)
        game.text.update();
    },
}

$D[1]("exitLevel").addEventListener("click",()=>{clearInterval(intervalStart)
    game.ticksPassed = 0
    const gam = $D[1]("game");
    gam.style.animation = "disappear 1 1s";
    const a = "animation:appear 1 1s;display:block"
    $D[1]("levelSelector").style = a;
    $D[1]("back").style = a
    game.text.all = []
    game.tickEvents = []
    setTimeout(() => { gam.style = "display:none"; }, 900)
})

levels.updateMenu();
window.addEventListener("resize", ()=>{game.resize();game.update()});
window.addEventListener("keydown", (e) => { game.keys[e.key] = true });
window.addEventListener("keyup", (e) => { game.keys[e.key] = false });
window.addEventListener("mousemove", (e) => {
    game.cursor.x = ((window.innerWidth + player.width) / 2 - e.clientX) / 7;
    game.cursor.y = ((window.innerHeight + player.height) - e.clientY) / 7;
})
