export const PROJECT_ROUTES = [
    {
        path: 'showerthoughts',
        component: () => import('@/components/smallProjects/showerThoughts/ShowerThoughts'),
        // name: 'showerthoughts',
        name: 'A Relaxing Way to Look at /r/showerthoughts',
        description: 'A simple screensaver alternative that pulls the top posts from the /r/showerthoughts sub-reddit and displays them in a breath-like manner across the page.'
    },
    {
        path: 'sudoku',
        component: () => import('@/components/smallProjects/sudoku/Sudoku'),
        name: 'Sudoku Solver',
        description: 'A sudoku solver showcasing the power of recursion and Monte Carlo in solving sudoku.'
    },
    {
        path: 'dummy1',
        component: () => import('@/components/WIP'),
        name: 'Dummy 1',
        description: 'The dream is to someday perform some analysis on top of League of Legends data. That\'s the dream...'
    },
    {
        path: 'dummy2',
        component: () => import('@/components/WIP'),
        name: 'Dummy 2',
        description: 'The dream is to someday perform some analysis on top of League of Legends data. That\'s the dream...'
    },
    {
        path: 'dummy3',
        component: () => import('@/components/WIP'),
        name: 'Dummy 3',
        description: 'The dream is to someday perform some analysis on top of League of Legends data. That\'s the dream...'
    },
    {
        path: 'dummy4',
        component: () => import('@/components/WIP'),
        name: 'Dummy 4',
        description: 'The dream is to someday perform some analysis on top of League of Legends data. That\'s the dream...'
    },
]