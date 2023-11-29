import { THEMES } from '@/stores/theme'

export const PROJECT_ROUTES = [{
        path: 'showerthoughts',
        component: () => import('@/components/smallProjects/showerThoughts/ShowerThoughts.vue'),
        name: 'Shower Thoughts',
        description: 'A Relaxing Way to Look at /r/showerthoughts',
        meta: {
            hideable: true,
        },
    },
    {
        path: 'sudoku',
        component: () => import('@/components/smallProjects/sudoku/Sudoku.vue'),
        name: 'Sudoku Solver',
        description: 'Solve it quickly (or slowly)',
        meta: {
            hideable: true,
            title: 'Melonade - Sudoku',
            metaTags: [{
                name: 'description',
                content: 'Sudoku Solver.'
            }],
            theme: THEMES.WHITE
        },
        // description: 'Looking at several methods of solving sudoku.',
    },
    {
        path: 'league',
        component: () => import('@/components/WIP.vue'),
        name: 'League Analysis',
        // description: 'A sudoku solver showcasing the power of recursion and Monte Carlo in solving sudoku.'
        description: 'Non-existant and probably never will be'
    },
]