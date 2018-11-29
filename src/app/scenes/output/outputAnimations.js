import * as PIXI from 'pixi.js'
import anime from 'animejs'

const resources = PIXI.loader.resources

export const outputAnimations = {
    'actions/dough': doughAnimation,
    'actions/sauce': sauceAnimation,
    'actions/topping': toppingAnimation,
    'actions/oven': ovenAnimation
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
    dough.pivot = new PIXI.Point(dough.width / 2, dough.height / 2)

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
    sauce.pivot = new PIXI.Point(sauce.width / 2, sauce.height / 2)

    return sauce
}

function toppingAnimation(duration) {
    const cheese = new PIXI.Graphics()
    cheese.beginFill(0xffa600)
        .drawCircle(43, 43, 43)
        .endFill()
    cheese.pivot = new PIXI.Point(cheese.width / 2, cheese.height / 2)
    const cheeseAnimation = anime({
        targets: [cheese.scale],
        duration: duration,
        x: 4,
        y: 4,
        easing: 'linear',
    })

    // Meat coords relative to the center of fully grown cheese
    const radius = cheese.width * 2 // * 4 / 2
    const radiusWithPadding = radius - 40
    const radius45deg = radiusWithPadding * 0.7 // Approximation from sqrt(2) / 2

    // TODO: for random use: (Math.random() * radiusWithPadding * 2 - radiusWithPadding) for any coordingate
    const meatCoords = [
        new PIXI.Point(-radiusWithPadding, 0), // Left
        new PIXI.Point(radiusWithPadding, 0), // Right
        new PIXI.Point(0, -radiusWithPadding),  // Top
        new PIXI.Point(0, radiusWithPadding),  // Bottom
        new PIXI.Point(radius45deg, radius45deg),  // Bottom-right
        new PIXI.Point(-radius45deg, radius45deg),  // Bottom-left
        new PIXI.Point(-radius45deg, -radius45deg),  // Top-left
        new PIXI.Point(radius45deg, -radius45deg),  // Top-right
        new PIXI.Point(0, 0),  // Center
    ]
    const meatPieces = meatCoords.map(coords => createMeat(coords.x, coords.y))
    const meatAnimation = anime({
        targets: meatPieces.map(it => it.scale),
        delay: duration,
        duration: duration,
        x: 1,
        y: 1,
        easing: 'linear'
    })

    const container = new PIXI.Container()
    container.addChild(cheese, ...meatPieces)
    container.on('added', () => {
        cheeseAnimation.restart()
        meatAnimation.restart()
    })
    return container
}

function createMeat(x, y) {
    const meat = new PIXI.Sprite(resources['output/salami'].texture)
    meat.width = 48
    meat.height = 48
    meat.pivot = new PIXI.Point(meat.width / 2, meat.height / 2)
    meat.position = new PIXI.Point(x, y)
    meat.scale = new PIXI.Point(0, 0)
    return meat
}

function ovenAnimation(duration) {
    const oven = new PIXI.Sprite(resources['output/oven'].texture)
    oven.width = 75
    oven.height = 75
    oven.pivot = new PIXI.Point(oven.width / 2, oven.height / 2)

    const animation = anime({
        targets: alpha,
        duration: duration,
        x: 4,
        y: 4,
        easing: 'easeInOutBack'
    })

    oven.on('added', () => animation.restart())
    oven.scale = new PIXI.Point(0, 0)
    return oven
}