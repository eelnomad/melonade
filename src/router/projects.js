export const PROJECT_ROUTES = [{
        path: 'showerthoughts',
        component: () => import('@/components/smallProjects/showerThoughts/ShowerThoughts.vue'),
        name: 'Shower Thoughts',
        description: 'A Relaxing Way to Look at /r/showerthoughts',
        tags: ['visualization', 'relaxing'],
        meta: {
            hideable: true,
            title: 'Melonade - Shower Thoughts',
            metaTags: [{
                name: 'description',
                content: 'r/showerthoughts Visualized.'
            }],
        },
    },
    {
        path: 'sudoku',
        component: () => import('@/components/smallProjects/sudoku/Sudoku.vue'),
        name: 'Sudoku Solver',
        description: 'Solve it quickly (or slowly)',
        tags: ['algorithm', 'puzzle'],
        meta: {
            hideable: true,
            title: 'Melonade - Sudoku',
            metaTags: [{
                name: 'description',
                content: 'Sudoku Solver.'
            }],
            navOnDark: false,
        },
    },
    {
        path: 'league',
        component: () => import('@/components/WIP.vue'),
        name: 'League Analysis',
        description: 'Non-existant and probably never will be',
        tags: [],
        meta: {
            hidden: true,
        },
    },
]