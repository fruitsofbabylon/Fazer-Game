export const levels = [
    {
        actions: [
          { color: 'cyan', icon: 'actions/dough' },
          { color: 'magenta', icon: 'actions/oven' },
          { color: 'blue', icon: 'actions/cut' },
          { color: 'green', icon: 'actions/sauce' },
          { color: 'red', icon: 'actions/topping' }   
        ],
        actionsOrder: [
            'actions/dough',
            'actions/sauce',
            'actions/topping',
            'actions/oven',
            'actions/cut'
        ]
    }
]

export const currentLevel = 0

export const modes = ['1', '2']