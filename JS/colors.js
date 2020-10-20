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