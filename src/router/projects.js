export const PROJECT_ROUTES = [{
        path: 'showerthoughts',
        // component: () => import('@/components/WIP'),
        component: () => import('@/components/smallProjects/showerThoughts/ShowerThoughts.vue'),
        // name: 'showerthoughts',
        name: 'A Relaxing Way to Look at /r/showerthoughts',
        // description: 'A simple screensaver alternative that pulls the top posts from the /r/showerthoughts sub-reddit and displays them in a breath-like manner across the page.'
        description: 'Currently broken.'
    },
    {
        path: 'sudoku',
        component: () => import('@/components/WIP.vue'),
        name: 'Sudoku Solver',
        // description: 'A sudoku solver showcasing the power of recursion and Monte Carlo in solving sudoku.'
        description: 'Currently broken.'
    },
]