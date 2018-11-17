import * as PIXI from 'pixi.js'
import anime from 'animejs'

export const outputAnimations = {
    'actions/dough': doughAnimation,
    'actions/sauce': sauceAnimation,
    'actions/topping': toppingAnimation
}

function doughAnimation(duration) {
    const dough = new PIXI.Graphics()
    dough.beginFill(0xeddbc5)
        .drawCircle(50, 50, 50)
        .endFill()

    const animation = anime({
        targets: dough.scale,
        duration: duration,
        x: 4,
        y: 4,
        easing: 'easeInOutBack'
    })
    dough.on('added', () => animation.restart())
    dough.pivot = new PIXI.Point(50, 50)

    return dough
}

function sauceAnimation(duration) {
    const sauce = new PIXI.Graphics()
    sauce.beginFill(0xCC0000)
        .drawCircle(45, 45, 45)
        .endFill()

    const animation = anime({
        targets: sauce.scale,
        duration: duration,
        x: 4,
        y: 4,
        easing: 'easeInOutBack'
    })
    sauce.on('added', () => animation.restart())
    sauce.pivot = new PIXI.Point(45, 45)

    return sauce
}

function toppingAnimation(duration) {
    const cheese = new PIXI.Graphics()
    const meat = new PIXI.Graphics()

    cheese.beginFill(0xffa600)
        .drawCircle(43, 43, 43)
        .endFill()
    meat.beginFill(0xa53535)
        .drawCircle(5, 5, 5)
        .endFill()

    const cheeseAnimation = anime({
        targets: cheese.scale,
        duration: duration,
        x: 4,
        y: 4,
        easing: 'linear'
    })
    const meatAnimation = anime({
        targets: meat.scale,
        duration: duration,
        x: 4,
        y: 4,
        easing: 'linear'
    })

    cheese.on('added', () => cheeseAnimation.restart())
    cheese.pivot = new PIXI.Point(43, 43)
    meat.on('added', () => meatAnimation.restart())
    meat.pivot = new PIXI.Point(5, 5)

    return [cheese, meat]
}
