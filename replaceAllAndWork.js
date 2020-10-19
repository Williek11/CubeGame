document.getElementsByTagName("html")[0].innerHTML = `
<!DOCTYPE html>
<html>

<head>
    <title>William's Playground</title>
    <script>
    if(localStorage.knowV2 === undefined) {
        localStorage.knowV1 = undefined
        localStorage.knowV2 = true
        localStorage.active = JSON.stringify([false, false, false])
        localStorage.customColors = JSON.stringify({
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
                        background: "#fff",
                        text: "#000",
                    }
                },
                entities: {
                    enemy: {
                        normal: "#FF0000",
                        hit: "#AA0000",
                    },
                    bonus: {
                        health: "#FFFF00",
                    },
                    bonusMove: {
                        slow: "#000000"
                    },
                    projectile: {
                        bullet: "#FF00FF",
                        missile: "#FF881C"
                    }
                }
            })
    }
    </script>
    <style id="colorStyle">
        :root {
            --menu-background:#aaa;
            --menu-color:#fff;
            --menu-shadow: #000;
            --menu_container-background: #ccc;
            --menu_container-background-top: #ddd;
            --menu_container-background-bottom: #ccc;
            --menu_container-shadow: #666;
            --menu_container-borderColor: #0009;
            --menu_container-borderRadius: 20px;
            --menu_container-borderThickness: 1px;

            --customize-background: #888;
            --customize-border-color: #333;
            --customize-border-radius: 5px;
            --customize-border-thickness: 2px;
            --customize-shadow-color: #000;
            --customize-shadow-offsetY: 2px;
            --customize-shadow-offsetX: 0;
            --customize-shadow-blur: 2px;

            --levelSelector-background: #222;
            --levelSelector-text: #fff;
            --levelSelector_circleLevel-background:#aaa;
            --levelSelector_circleLevel-shadow:#000;
            --levelSelector_circleLevel-color:#000;

            --backButton-background: #111;
            --backButton-text: #fff;
            --backButton-border: #000;
            --backButton-borderRadius: 5px;
            --backButton-borderThickness: 1px;
            --backButton-shadow: #000;
            --backButton-shadow-offsetY: 2px;
            --backButton-shadow-offsetX: 0;
            --backButton-shadow-blur: 5px;
            
            --game-background: #fff;
            --game-text: #000;
        }
    </style>
    
    <div style="display:none">
        <link href="index.css" rel="stylesheet">
    </div>
</head>

<body>
    <div id="menu">
        <div id="select">
            <h2 style="margin-top:75px">Cube Game</h2>
            <p onclick="menu.selectToSelector()">Start</p>
            <p onclick="menu.selectToSettings()">Settings</p>
        </div>
        <div id="settings">
            <div class="menu_container" id="settings_menu">
                <div onclick="menu.settingsToCustomize()" id="customize" class="selector_option"><span class="textMiddle">Customize</span></div>
                <div id="visuals" class="selector_option"><span class="textMiddle">Visuals</span></div>
            </div>
            <div class="menu_container" id="customize_menu">
                <div class="selector_option">
                    <h2>Customization</h2>
                    <h3>Color Themeing</h3>
                    <div class="switch" style="top: 85px;"><div class="ball inactive" onclick="themes(0, 0)"></div></div>
                    <div class="switch_name" style="top:110px">Dark Mode</div>
            
                    <div class="switch" style="top: 155px;"><div class="ball inactive" onclick="themes(1, 1)"></div></div>
                    <div class="switch_name" style="top:180px">Black and White Mode</div>
                    
                    <!-- Unused
                    <div class="switch" style="top: 225px"><div class="ball inactive" onclick="themes(2, 2)"></div></div>
                    <div class="switch_name" style="top:250px">Custom Mode</div>
                    <div id="customizeButton" onclick="menu.customizeToCustomizeMenu()">Customize</div>
                    -->
                </div>
                <div class="selector_option"></div>
            </div>

        <!-- Unused
            <div id="customization" class="menus_customization">
                <div onclick="menu.customizeMenuToMenuCustomization()" class="customization1" style="border-radius:var(--menu_container-borderRadius) 0 0 0"><span class="textMiddle">Menu</span></div>
                <div class="customization1" style="position:absolute;left:50%;top:0;border-radius:0 var(--menu_container-borderRadius) 0 0"><span class="textMiddle">Level Selector</span></div>
                <div class="customization2" style="border-radius:0 0 0 var(--menu_container-borderRadius)"><span class="textMiddle">Back button</span></div>
                <div class="customization2" style="position:absolute;left:50%;top:50%;border-radius: 0 0 var(--menu_container-borderRadius) 0"><span class="textMiddle">Game</span></div>
            </div>
            <div id="customize_menu2" class="menus_customization">
                <div class="customization1" style="border-radius:var(--menu_container-borderRadius) 0 0 0"></div>
                <div class="customization1" style="position:absolute;left:50%;top:0;border-radius:0 var(--menu_container-borderRadius) 0 0"></div>
                <div class="customization2" style="border-radius:0 0 0 var(--menu_container-borderRadius)"></div>
                <div class="customization2" style="position:absolute;left:50%;top:50%;border-radius: 0 0 var(--menu_container-borderRadius) 0"></div>
                <div class="full">
                    <h2>Menu Customization</h2>
                    <span style="left:60px;top:65px">Background Color</span>
                    <input type="text" style="left:60px;top:90px" id="menu_background-color"/>

                    <span style="left:60px;top:120px">Text Color</span>
                    <input type="text" style="left:60px;top:145px" id="menu_text-color"/>

                    <span style="left:60px;top:165px">Box-Shadow Color</span>
                    <input type="text" style="left:60px;top:190px" id="menu_shadow-color"/>

                    <h3 style="position: absolute;left: 50%;top: 65px;margin: 0;font-size: 20px;width: 50%;">Container</h3>
                    <span style="left:50%;top:90px">Background Color</span>
                    <input type="text" style="left:50%;top:115px" id="menu_background-color"/>
                </div>
            </div>
            <div id="customize_levelSelector" class="menus_customization">e</div>
            <div id="customize_backButton" class="menus_customization">c</div>
            <div id="customize_game" class="menus_customization">d</div>
        -->
        </div>
        <div id="selector">
            <div class="menu_container" id="typeOfLevel">
                <div onclick="menu.selectToLevel()" id="levels" class="selector_option"><span class="textMiddle">Levels</span></div>
                <div id="customLevels" class="selector_option"><span class="textMiddle">Custom Levels (not done)</span></div>
                <!-- onclick="menu.typeOfLevelToCustomizedLevels()" -->
            </div>
            <div class="menu_container" id="customizedLevels">
                <div id="create" class="selector_option"><span class="textMiddle">Create a Custom Level</span></div>
                <div id="enter" class="selector_option"><span class="textMiddle">Enter a Custom Level</span></div>
            </div>
        </div>
    </div>
    <div id="levelSelector">
        <h2 style="position: fixed;text-align: center;width: 100%;">Levels</h2>
    </div>
    <div id="back">Back</div>
    <div id="game">
        <div id="game_background"></div>
        <canvas id="canvas"></canvas>
        <p id="health">You have 10 points of health</p>
        <div id="additionalText"></div>
        <div id="exitLevel">Exit</div>
    </div>
    <div style="display:none">
        <script src="JS/objects.js"></script> <!-- Just makes shortcuts for DOM manipulation and other things -->
        <script src="JS/colors.js"></script> <!-- Always above entities.js and game.js -->
        <script src="JS/menu.js"></script> <!-- Must always be above game and levels -->
        <script src="JS/levels.js"></script> <!-- Must be above game and below menu -->
        <script src="JS/entities.js"></script> <!-- Entities -->
        <script src="JS/game.js"></script> <!-- Must be the lowest one for reasons -->
    </div>
`

document.getElementsByTagName("head")[0].innerHTML = `<style>
:focus {outline:none}
input {border: none;border-radius: 0;}
.full input, .full div, .full span {position:fixed}

@import url('https://fonts.googleapis.com/css?family=Oxanium');

body, html {margin:0;padding:0;text-align:center;font-family:Oxanium;overflow:hidden;background:var(--game-background)}

.ball, #back, #exitLevel, #customizeButton, .levelCircle, .menu_container {cursor:pointer}
#customize_menu {cursor:default}

#back, #selector, #game, #levelSelector, #settings, #customize_menu, #customization, #customizedLevels {display:none}
#menu, canvas, #game, #game_background, .full {position: fixed;left: 0;top: 0;width:100%;height:100%;}

#menu {background:var(--menu-background);width:100%;height:100%;color:var(--menu-color);text-shadow:0 1px 2px var(--menu-shadow),0 1px 2px VAR(--menu-shadow),0 1px 2px VAR(--menu-shadow),0 1px 2px VAR(--menu-shadow),0 0 2px VAR(--menu-shadow),0 0 2px VAR(--menu-shadow),0 0 2px VAR(--menu-shadow),0 0 2px VAR(--menu-shadow),0 0 2px VAR(--menu-shadow),0 0 2px VAR(--menu-shadow),0 0 2px VAR(--menu-shadow),0 0 2px VAR(--menu-shadow);font-weight:900}

.menu_container {background:var(--menu_container-background);height:350px;width:300px;position: fixed;left:calc(50% - calc(150px + var(--menu_container-borderThickness)));top:100px;border-radius:var(--menu_container-borderRadius);box-shadow:0 5px 10px var(--menu_container-shadow);border: var(--menu_container-borderThickness) var(--menu_container-borderColor) solid}
.menu_container h2 {width:100%;height:50px;line-height:50px;font-size:20px;margin:0;padding:0;}
.menu_container h3 {width:100%;height:10px;line-height:10px;font-size:16px;margin:0;padding:0;}
#customization {position: fixed;left:calc(50% - calc(300px + var(--menu_container-borderThickness)));top:100px;border-radius:var(--menu_container-borderRadius);box-shadow:0 5px 10px var(--menu_container-shadow);border: var(--menu_container-borderThickness) var(--menu_container-borderColor) solid;}
.menus_customization {display:none;background:var(--menu_container-background);height:350px;width:600px;position: fixed;left:calc(50% - calc(300px + var(--menu_container-borderThickness)));top:100px;border-radius:var(--menu_container-borderRadius);box-shadow:0 5px 10px var(--menu_container-shadow);border: var(--menu_container-borderThickness) var(--menu_container-borderColor) solid;}
.customization1 {width:50%;height:175px;background:var(--menu_container-background-top);border-radius:var(--menu_container-borderRadius) var(--menu_container-borderRadius) 0 0}
.customization2 {width:50%;height:175px;background:var(--menu_container-background-bottom);border-radius:0 0 var(--menu_container-borderRadius) var(--menu_container-borderRadius)}

.switch {left: 80px;width:calc(100% - 160px);height:10px;position:absolute;background:#666;border-radius:10px;box-shadow: 0 2px 2px #222;border:2px #000 solid;}
.ball {position:relative;top:-7.5px;width:20px;height:20px;border:2px #000 solid;background:#fff;box-shadow: 0 2px 2px #222;border-radius:25%}
.ball.inactive {left:-10px;background:#666;}
.ball.active {left:calc(100% - 20px);background:#38e861;}
.switch_name {width:100%;text-align:center;font-size:14px;height:20px;line-height:20px;position:absolute;left:0}

.selector_option {width:100%;height:175px}
.selector_option:first-child {background:var(--menu_container-background-top);border-radius:var(--menu_container-borderRadius) var(--menu_container-borderRadius) 0 0}
.selector_option:nth-child(2) {background:var(--menu_container-background-bottom);border-radius:0 0 var(--menu_container-borderRadius) var(--menu_container-borderRadius)}
.textMiddle {width:100%;height:50px;line-height:0;top:calc(50% - 10px);position:relative;font-size:20px}
#levelSelector {background:var(--levelSelector-background);color:var(--levelSelector-text);width:100%;height:100%;left:0;top:0;position:fixed;overflow-x:scroll}
#levelSelector::-webkit-scrollbar-thumb {background-color: #6669;box-shadow: 0 0 5px #000}
#levelSelector::-webkit-scrollbar-thumb:hover{background-color: #5559}
#levelSelector::-webkit-scrollbar-thumb:active {background-color: #4449}
#levelSelector::-webkit-scrollbar-track {background-color:transparent}
#levelSelector::-webkit-scrollbar {width:13px}

.levelCircle {position:relative;width:50px;height:50px;background:var(--levelSelector_circleLevel-background);border-radius:50%;box-shadow: 0 2px 5px var(--levelSelector_circleLevel-shadow);line-height:50px;color:var(--levelSelector_circleLevel-color);font-weight:100;}

#back, #exitLevel {position:fixed;background:var(--backButton-background);border: var(--backButton-borderThickness) var(--backButton-border) solid;border-radius: var(--backButton-borderRadius);box-shadow: var(--backButton-shadow-offsetX) var(--backButton-shadow-offsetY) var(--backButton-shadow-blur) var(--backButton-shadow);color:var(--backButton-text);width:70px;height:30px;font-size:17px;line-height:30px;text-align:center;}
#back {left:10px;bottom:10px;}
#exitLevel {right:10px;top:10px;}

#game_background {background:var(--game-background)}
#health {position:fixed;width:100%;left:0;top:0;text-align:center;color:var(--game-text);font-weight:100}
#customizeButton {
    background: var(--customize-background);
    position: fixed;
    left: calc(50% - calc(100px + var(--customize-border-thickness)));
    width: 200px;
    top: 280px;
    border: var(--customize-border-thickness) var(--customize-border-color) solid;
    height: 30px;
    line-height: 30px;
    box-shadow: var(--customize-shadow-offsetX) var(--customize-shadow-offsetY) var(--customize-shadow-blur) var(--customize-shadow-color);
    border-radius: var(--customize-border-radius);
}

#customizeButton:active {
    top:285px;
    box-shadow:none;
}

@media only screen and (max-height:550px) {
    .menu_container {top:calc(50% - calc(175px + var(--menu_container-borderThickness)))}
}

@media only screen and (max-height:350px) {
    .menu_container {
        width:600px;
        height:175px;
        top:calc(50% - calc(87.5px + var(--menu_container-borderThickness)));
        left:calc(50% - 300px);
        display:flex;
    }
    .selector_option {height:100%;width:50%}
    .selector_option:first-child {border-radius: var(--menu_container-borderRadius) 0 0 var(--menu_container-borderRadius) !important}
    .selector_option:nth-child(2) {border-radius: 0 var(--menu_container-borderRadius) var(--menu_container-borderRadius) 0 !important}
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
    .selector_option:first-child, .selector_option:nth-child(2) {border-radius: 0 !important}
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

* {font-weight:600}
</style>`

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

        H().game.background = "#fff";H().game.text = "#000";

        MCC().background = "#888888";MCC().borderRadius = "5px";MCC().borderColor = "#333333";MCC().borderThickness = "2px";MCC().shadowOffsetX = "0";MCC().shadowOffsetY = "2px";MCC().shadowBlur = "2px";MCC().shadowColor = "#000"

        colors.entities.player = "#00FF00"
        colors.entities.enemy.normal = "#FF0000"
        colors.entities.enemy.hit = "#AA0000"
        colors.entities.bonus.health = "#FFFF00"
        colors.entities.bonusMove.slow = "#000000"
        colors.entities.projectile.bullet = "#FF00FF"
        colors.entities.projectile.missile = "#FF881C"
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
            background: "#fff",
            text: "#000",
        }
    },
    entities: {
        player: "#00FF00",
        enemy: {
            normal: "#FF0000",
            hit: "#AA0000",
        },
        bonus: {
            health: "#FFFF00",
        },
        bonusMove: {
            slow: "#000000"
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

colorsFunc = [()=>{
    const H = ()=>{return colors.HTML},
    M = ()=>{return H().menu},
    MC = ()=>{return M().container},
    LS = ()=>{return H().levelSelector},
    MCC = ()=>{return MC().customize}

    active = [true, false, false]
    localStorage.active = JSON.stringify(active)

    M().background = "#1a1a1a"
    MC().background = "#000"
    MC().background_top = "#141414"
    MC().background_bottom = "#0e0e0e"
    MC().shadow = "#000"
    MC().borderThickness = "1px"
    LS().background = "#111"
    H().game.background = "#111"
    H().game.text = "#fff"

    MCC().background = "#050505"
    MCC().borderRadius = "3px"
    MCC().borderColor = "#000"
    MCC().borderThickness = "2px"
    MCC().shadowOffsetX = "0"
    MCC().shadowOffsetY = "2px"
    MCC().shadowBlur = "2px"
    MCC().shadowColor = "#000"

    colors.entities.bonusMove.slow = "#ffffff"},
    ()=>{
        active = [false, true, false]
        localStorage.active = JSON.stringify(active)

        const H = ()=>{return colors.HTML},
        CE = ()=>{return colors.entities}

        H().game.background = "#111"
        H().game.text = "#fff"
        CE().bonus.health = "#707070"
        CE().bonusMove.slow = "#FFFFFF"
        CE().enemy.hit = "#808080"
        CE().enemy.normal = "#a3a3a3"
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

const k = [false],

levels = {
    autoGenerated: [
        {
            name: 1,
            grid: {
                width: 1000,
                height: 1000,
                x: 0,
                y: 0,
            },
            contents: ()=>{
                const wE = window.innerWidth / 2;
                const hE = window.innerHeight / 2 - 10;
                let n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        color: colors.entities.enemy.normal,
                        del: false,
                        width: 20,
                        height: 20,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            game.ctx.fillRect(this.x, hE, 20, 20);
                            collide(this, () => {
                                if (player.events[0].on) {
                                    this.del = true
                                }
                            });
                        }
                    })
                }
                n(wE - 10);n(wE - 210);n(wE + 190);
                const txt = (nmb, content)=>{constructors.text("Oxanium", "15px", 30, window.innerHeight - nmb, content);}
                txt(75, "Let me introduce you to the basics:");
                txt(60, "The most important principle is: when pressing shift, you can kill enemies and go faster.");
                txt(45, "Also, you can go faster pressing Shift. Anyway, when you kill all enemies in a level, you procced to the next.");
            },
        },
        {
            name: 2,
            contents: ()=>{
                const wE = window.innerWidth / 2;
                const hE = window.innerHeight / 2 - 10;
                let n = (x, dmg) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        color: colors.entities.enemy.normal,
                        del: false,
                        width: 20,
                        height: 20,
                        dmg: dmg,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            game.ctx.fillRect(this.x, hE, 20, 20);
                            collide(this, () => {
                                if (player.events[0].on) {
                                    this.del = true
                                }
                                else if (!player.noHit && !player.events[0].on) { player.onHit(this.dmg) }
                            });
                        }
                    })
                }
                n(wE - 10, 2);n(wE - 210, 1);n(wE + 190, 3);
                const txt = (nmb, content)=>{constructors.text("Oxanium", "15px", 30, window.innerHeight - nmb, content);}
                txt(90, "Another concept you shuld be familiar with: damage.");
                txt(75, "If you touch certain things, you will lose health according to its amount of damage.")
                txt(60, "Try it with those dummies: the first one does 1 of damage, the second one does 2, and the third, 3.")
                txt(45, `Also, don't worry, you'll regenerate your life back. Feel free to experiment with it!`)
            },
            perTick: ()=>{
                if(player.health < 10 && !k[0]) {k[0]=true;setTimeout(()=>{player.onHit(-1);k[0]=false},game.tick * 40)}
            },
        },
        {
            name: 3,
            contents: ()=>{
                const wE = window.innerWidth / 2
                const hE = window.innerHeight / 2 - 10
                let n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        color: colors.entities.enemy.normal,
                        del: false,
                        width: 20,
                        height: 20,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            game.ctx.fillRect(this.x, hE, 20, 20);
                            collide(this, () => {
                                if (player.events[0].on) {
                                    this.del = true;
                                }
                            });
                        }
                    })
                }
                n(wE - 10); n(wE - 210); n(wE + 190); n(wE - 410);
                game.entities.all.push({
                    x: wE + 390,
                    y: hE,
                    color: colors.entities.enemy.normal,
                    del: false,
                    width: 20,
                    height: 20,
                    update: function () {
                        game.ctx.fillStyle = this.color;
                        game.ctx.fillRect(wE + 390, hE, 20, 20);
                        collide(this, () => {
                            if (player.events[0].on) {
                                this.del = true; constructors.entity.bonus("health", wE + 390, hE, 20, 20)
                            }
                        });
                    }
                })
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 105, "Something that is also good to know is that enemies may release a health bonus upon death.")
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 90, "Try it out here:")
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 75, "the first to fourth dummies won't release anything, but the fifth dummy will (it's rigged here btw)")
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 60, `But anyway, this is just here to represent that you have a one in five chance of having it dropped.`)
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 45, `Things to note about it: You can pick it up with max health and you can't pick it up while you can't take damage.`)
            },
        },
        {
            name: 4,
            contents: ()=>{
                const wE = window.innerWidth / 2
                let hE = window.innerHeight / 2 - 10
                let rng = ()=>{if(Math.floor(Math.random() * 2) === 0) {return Math.random() * 10} else {return -Math.random() * 10}}
                let n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        sX: rng(),
                        sY: rng(),
                        color: colors.entities.enemy.normal,
                        del: false,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            let x = this.x, y = this.y
                            game.ctx.fillRect(x, y, 20, 20);
                            if (player.x <= x + 20 && x <= player.x + player.width && player.y <= y + 20 && y <= player.y + player.height) {
                                if (player.events[0].on) {
                                    this.del = true;
                                    if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", x, y, 20, 20) };
                                } else if (!player.noHit && !player.events[0].on) { player.onHit(1) }
                            }

                            if (x < 0) { this.sX *= -1; x = 0 } else if (x > window.innerWidth - 20) { this.sX *= -1; x = window.innerWidth - 20 };
                            if (y < 0) { this.sY *= -1; y = 0 } else if (y > window.innerHeight - 20) { this.sY *= -1; y = window.innerHeight - 20 };

                            this.x = x + this.sX
                            this.y = y + this.sY
                        }
                    })
                }
                n(wE - 10); n(wE - 210); n(wE + 190);
                hE = window.innerHeight / 2 - 210;
                n(wE - 10); n(wE - 210); n(wE + 190);
                hE = window.innerHeight / 2 + 190;
                n(wE - 10); n(wE - 210); n(wE + 190);
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 45, `That's all you need to know for now. Enjoy!`)
            },
        },
        {
            name: 5,
            contents: ()=>{
                const wE = window.innerWidth / 2
                let hE = window.innerHeight / 2 - 10
                let n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        sX: 7.5,
                        sY: 7.5,
                        color: colors.entities.enemy.normal,
                        del: false,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            let x = this.x, y = this.y
                            game.ctx.fillRect(x, y, 20, 20);
                            if (player.x <= x + 20 && x <= player.x + player.width && player.y <= y + 20 && y <= player.y + player.height) {
                                if (player.events[0].on) {
                                    this.del = true;
                                    if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", x, y, 20, 20) };
                                } else if (!player.noHit && !player.events[0].on) { player.onHit(1) }
                            }

                            if (x < 0) { this.sX *= -1; x = 0 } else if (x > window.innerWidth - 20) { this.sX *= -1; x = window.innerWidth - 20 };
                            if (y < 0) { this.sY *= -1; y = 0 } else if (y > window.innerHeight - 20) { this.sY *= -1; y = window.innerHeight - 20 };

                            this.x = x + this.sX
                            this.y = y + this.sY
                        }
                    })
                }
                n(wE - 10); n(wE - 120); n(wE + 100);
                hE = window.innerHeight / 2 - 120;
                n(wE - 10); n(wE - 120); n(wE + 100);
                hE = window.innerHeight / 2 + 100;
                n(wE - 10); n(wE - 120); n(wE + 100);
            },
        },
        {
            name: 6,
            contents: ()=>{
                const wE = window.innerWidth / 2
                let hE = window.innerHeight / 2 - 10
                let n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        sX: 10,
                        sY: 10,
                        color: colors.entities.enemy.normal,
                        del: false,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            let x = this.x, y = this.y
                            game.ctx.fillRect(x, y, 20, 20);
                            if (player.x <= x + 20 && x <= player.x + player.width && player.y <= y + 20 && y <= player.y + player.height) {
                                if (player.events[0].on) {
                                    this.del = true;
                                    if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", x, y, 20, 20) };
                                } else if (!player.noHit && !player.events[0].on) { player.onHit(2) }
                            }

                            if (x < 0) { this.sX *= -1; x = 0 } else if (x > window.innerWidth - 20) { this.sX *= -1; x = window.innerWidth - 20 };
                            if (y < 0) { this.sY *= -1; y = 0 } else if (y > window.innerHeight - 20) { this.sY *= -1; y = window.innerHeight - 20 };

                            this.x = x + this.sX
                            this.y = y + this.sY
                        }
                    })
                }
                n(wE - 10); n(wE - 110); n(wE + 90);
                hE = window.innerHeight / 2 - 110;
                n(wE - 10); n(wE - 110); n(wE + 90);
                hE = window.innerHeight / 2 + 90;
                n(wE - 10); n(wE - 110); n(wE + 90);
            },
        },
        {
            name: 7,
            contents: ()=>{
                const wE = window.innerWidth / 2
                let hE = window.innerHeight / 2 - 10
                let n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        sX: 1,
                        sY: 1,
                        color: colors.entities.projectile.bullet,
                        del: false,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            let x = this.x, y = this.y
                            game.ctx.fillRect(x, y, 20, 20);
                            if (player.x <= x + 20 && x <= player.x + player.width && player.y <= y + 20 && y <= player.y + player.height) {
                                if (!player.noHit) {
                                    this.del = true;
                                    player.onHit(1)
                                }
                            }

                            if (x < -20) { this.del = true } else if (x > window.innerWidth) { this.del = true };
                            if (y < -20) { this.del = true } else if (y > window.innerHeight) { this.del = true };

                            this.x = x + this.sX
                            this.y = y + this.sY
                        }
                    })
                }
                n(wE - 10); n(wE - 110); n(wE + 90);
                hE = window.innerHeight / 2 - 110;
                n(wE - 10); n(wE - 110); n(wE + 90);
                hE = window.innerHeight / 2 + 90;
                n(wE - 10); n(wE - 110); n(wE + 90);
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 75, `Now, be introduced to a new type of entity: the bullet!`)
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 60, `It's basically the same to the other generic red one, with the exception that it dies when touching a wall or the player.`)
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 45, `Feel free to experiment with it, because you will also regenerate when you take damage.`)
            },
            perTick: ()=>{
                if(player.health < 10 && !k[0]) {k[0]=true;setTimeout(()=>{player.onHit(-1);k[0]=false},game.tick * 40)}
            },
        },
        {
            name: 8,
            contents: ()=>{
                const wE = window.innerWidth / 2
                let hE = window.innerHeight / 2 - 10
                let rng = ()=>{if(Math.floor(Math.random() * 2) === 0) {return Math.random() * 10} else {return -Math.random() * 10}}
                let n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        sX: rng(),
                        sY: rng(),
                        color: colors.entities.enemy.normal,
                        type: "generic",
                        del: false,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            let x = this.x, y = this.y
                            game.ctx.fillRect(x, y, 20, 20);

                            if (player.x <= x + 20 && x <= player.x + player.width && player.y <= y + 20 && y <= player.y + player.height) {
                                if (player.events[0].on) {
                                    this.del = true;
                                    if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", x, y, 20, 20) };
                                } else if (!player.noHit && !player.events[0].on) { player.onHit(2) }
                            }

                            if (x < 0) { this.sX *= -1; x = 0 } else if (x > window.innerWidth - 20) { this.sX *= -1; x = window.innerWidth - 20 };
                            if (y < 0) { this.sY *= -1; y = 0 } else if (y > window.innerHeight - 20) { this.sY *= -1; y = window.innerHeight - 20 };

                            this.x = x + this.sX
                            this.y = y + this.sY
                        }
                    })
                }
                n(wE - 10); n(wE - 110); n(wE + 90);
                hE = window.innerHeight / 2 - 110;
                n(wE - 10); n(wE - 110); n(wE + 90);
                hE = window.innerHeight / 2 + 90;
                n(wE - 10); n(wE - 110); n(wE + 90);
                constructors.text("Oxanium", "15px", 30, window.innerHeight - 45, `The enemies shoot bullets now!`)
            },
            perTick: ()=>{
                if(game.ticksPassed % 100 === 0) {for(var i = 0, l = game.entities.all.length;i < l;i++) {
                    if(game.entities.all[i].type === "generic")
                    {let rng = ()=>{if(Math.floor(Math.random() * 2) === 0) {return Math.random() * 10} else {return -Math.random() * 10}}
                    constructors.entity.projectile("bullet", game.entities.all[i].x, game.entities.all[i].y, rng(), rng(), 20, 20, 2)
                }}}
            },
        },
        {
            name: 9,
            contents: ()=>{
                const wE = window.innerWidth / 2;
                const canvaHeight = window.innerHeight
                let hE = canvaHeight / 2 - 10;
                const n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        sX: 7.5,
                        sY: 7.5,
                        color: colors.entities.enemy.normal,
                        type: "generic",
                        del: false,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            let x = this.x, y = this.y
                            game.ctx.fillRect(x, y, 20, 20);

                            if (player.x <= x + 20 && x <= player.x + player.width && player.y <= y + 20 && y <= player.y + player.height) {
                                if (player.events[0].on) {
                                    this.del = true;
                                    if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", x, y, 20, 20) };
                                } else if (!player.noHit && !player.events[0].on) { player.onHit(2); }
                            }

                            if (x < 0) { this.sX *= -1; x = 0 } else if (x > window.innerWidth - 20) { this.sX *= -1; x = window.innerWidth - 20 };
                            if (y < 0) { this.sY *= -1; y = 0 } else if (y > window.innerHeight - 20) { this.sY *= -1; y = window.innerHeight - 20 };

                            this.x = x + this.sX
                            this.y = y + this.sY
                        }
                    })
                }
                n(wE - 10); n(wE - 160); n(wE + 140);
                hE = window.innerHeight / 2 - 160;
                n(wE - 10); n(wE - 160); n(wE + 140);
                hE = window.innerHeight / 2 + 140;
                n(wE - 10); n(wE - 160); n(wE + 140);
            },
            perTick: ()=>{
                if(game.ticksPassed % 40 === 0) {
                    let rnd = Math.random;
                    for(let i = 0, l = game.entities.all.length;i < l;i++) {
                    let entity = game.entities.all[i];
                    if(entity.type === "generic")
                    {let rng = ()=>{if(Math.floor(rnd() * 2) === 0) {return rnd() * 10} else {return -rnd() * 10}}
                    constructors.entity.projectile("bullet", entity.x, entity.y, rng(), rng(), 20, 20, 2);
                }}}
            },
        },
        {
            name: 10,
            contents: ()=>{
                const wE = window.innerWidth / 2;
                const canvaHeight = window.innerHeight
                let hE = canvaHeight / 2 - 10;
                const n = (x) => {
                    game.entities.all.push({
                        x: x,
                        y: hE,
                        sX: 7.5,
                        sY: 7.5,
                        color: colors.entities.enemy.normal,
                        type: "generic",
                        del: false,
                        update: function () {
                            game.ctx.fillStyle = this.color;
                            let x = this.x, y = this.y
                            game.ctx.fillRect(x, y, 20, 20);

                            if (player.x <= x + 20 && x <= player.x + player.width && player.y <= y + 20 && y <= player.y + player.height) {
                                if (player.events[0].on) {
                                    this.del = true;
                                    if (Math.floor(Math.random() * 5) === 1) { constructors.entity.bonus("health", x, y, 20, 20) };
                                } else if (!player.noHit && !player.events[0].on) { player.onHit(2); }
                            }

                            if (x < 0) { this.sX *= -1; x = 0 } else if (x > window.innerWidth - 20) { this.sX *= -1; x = window.innerWidth - 20 };
                            if (y < 0) { this.sY *= -1; y = 0 } else if (y > window.innerHeight - 20) { this.sY *= -1; y = window.innerHeight - 20 };

                            this.x = x + this.sX
                            this.y = y + this.sY
                        }
                    })
                }
                n(wE - 10); n(wE - 160); n(wE + 140);
                hE = window.innerHeight / 2 - 160;
                n(wE - 10); n(wE - 160); n(wE + 140);
                hE = window.innerHeight / 2 + 140;
                n(wE - 10); n(wE - 160); n(wE + 140);
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
        enemy: function (type, hp, x, y, sX, sY, width, height, dmg, chunk, boost) {
            game.entities.all.push({
                chunk: chunk,
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
        bonus: function (type, x, y, width, height, chunk) {
            game.entities.all.push({
                chunk: chunk,
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
        bonusMove: function (type, x, y, sX, sY, width, height, chunk) {
            game.entities.all.push({
                chunk: chunk,
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
        particle: function (type, x, y, sX, sY, width, height, lifespan, chunk) {
            game.entities.all.push({
                chunk: chunk,
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
        projectile: function (type, x, y, sX, sY, width, height, dmg, chunk) {
            game.entities.all.push({
                chunk: chunk,
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
    chunk: 0,
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

/**************/
/**** Game ****/
/**************/

let intervalStart

const game = {
    eventsInterpretor: (i) => {
        const event = player.events[i]
        if(game.keys[event.key]) {if(event.condition() === true) {event.whenHappen()} else {event.whenNo()}}
    },
    ticksPassed: 0,
    sure: true,
    keys: {},
    canvas: $D[1]("canvas"),
    ctx: $D[1]("canvas").getContext("2d"),
    tick: 25,
    tickEvents: [],
    resize:()=>{
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;
    },
    update: ()=>{
        if (game.entities.all.length > 0) {
            for(let i = 0, a = game.tickEvents.length;i < a;i++) {game.tickEvents[i]()}

            game.ticksPassed++

            game.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            game.entities.update();
            player.update();
            game.text.update();

            for (let i = 0, a = game.entities.all; i < game.entities.all.length; i++) { if (a[i]["del"]) { a.splice(i, 1) } };

            for (let i = 0, l = player.events.length; i < l; i++) { game.eventsInterpretor(i) };
        } else {
            clearInterval(intervalStart)
            game.ticksPassed = 0
            const gam = $D[1]("game");
            gam.style.animation = "disappear 1 1s";
            const a = "animation:appear 1 1s;display:block"
            $D[1]("levelSelector").style = a;
            $D[1]("back").style = a
            game.text.all = []
            game.tickEvents = []
            setTimeout(() => { gam.style = "display:none"; }, 900)
        }
    },
    entities: {
        all:[],
        idChoose: 0,
        update: ()=>{for(let i = 0, l = game.entities.all.length;i < l;i++) {game.entities.all[i].update()}},
    },
    text: {
        all:[],
        update: () => {
            const additionalText = $D[1]("additionalText")
            additionalText.innerHTML = ""
            for (let i = 0, l = game.text.all.length; i < l; i++) {
                additionalText.innerHTML += `<div style="font-weight: 100 !important;color:${colors.HTML.game.text};font-size:${game.text.all[i].size};font-family:Oxanium;position:absolute;left:${game.text.all[i].x + "px"};top:${game.text.all[i].y + "px"}">${game.text.all[i].content}</div>`
            }
        }
    },
    restart: ()=>{
        player.x = player.iX;
        player.y = player.iY;
        game.entities.all=[];
    },
    start: (index)=>{
        if(levels.autoGenerated[index].perTick !== undefined) {game.tickEvents.push(levels.autoGenerated[index].perTick)}
        player.x = player.iX;
        player.y = player.iY;
        player.sX = 0;
        player.sY = 0;
        player.health = 10;
        $D[1]("health").innerHTML=`You have ${player.health} points of health.`;
        game.entities.all=[];
        game.index = index
        const levelS = $D[1]("levelSelector");
        levelS.style.animation = "disappear 1 1s";
        const buttonBack = $D[1]("back");
        buttonBack.style.animation = "disappear 1 1s";
        const gam = $D[1]("game");
        gam.style = "animation:appear 1 1s;display:block";
        game.resize();
        levels.autoGenerated[index].contents();
        game.update();
        setTimeout(()=>{
            levelS.style = "display:none";
            buttonBack.style = "display:none";
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
