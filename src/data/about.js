// Single source of truth for the About page. PortfolioAbout renders the bio as
// prose, the background rows as a description list, and each skill group as a
// labelled rule followed by its items; edit the copy here, not in the component.
//
// bio          array of paragraph strings, rendered in order. Plain text only —
//              the closing line carries a <router-link> and stays in the template.
// background   rows of { id, label, value }; label is the mono term, value the copy.
// skillGroups  { id, label, items } — items render as one `·`-separated line.
//              These are capability areas, not employers: the Work page owns the
//              employment history, and About should not repeat it.

export const bio = [
    'Most problems worth solving arrive as a mess — unclear constraints, a question nobody has phrased precisely yet, a pile of assumptions that only look sound. The work is getting from there to something a person can actually reason about.',
    'Data is where that resolution lives or dies. A decision is only as good as what it was made from, and the hard part is rarely the decision itself. It sits upstream, in whether the numbers mean what everyone assumes they mean. Making an answer trustworthy is quiet, unglamorous work with outsized leverage: get it right, and everyone downstream gets to think clearly.',
    'That thread runs through most of my career — pipelines, platforms, and the products sitting on top of them. Data that isn\'t consumed changes nothing, so I\'ve stayed close to the product end as well as the platform end: where a number comes from, and what it looks like when someone finally has to act on it.',
    'My side projects are where curiosity picks the problem. Usually something small I wanted to exist, built as much for the pleasure of building it as anything else. The best ones turn out to be something someone else needed too.',
]

export const background = [
    { id: 'education', label: 'Education', value: 'Degree in Computer Science, Math, and Operations Research' },
    { id: 'experience', label: 'Experience', value: '10 years building systems and working with data' },
]

export const skillGroups = [
    {
        id: 'data',
        label: 'Data',
        items: ['Pipeline design', 'Warehousing & modeling', 'Streaming', 'Quality & lineage'],
    },
    {
        id: 'systems',
        label: 'Systems',
        items: ['Distributed services', 'APIs', 'Reliability', 'Performance'],
    },
    {
        id: 'product',
        label: 'Product',
        items: ['Full-stack delivery', 'Prototyping'],
    },
    {
        id: 'working',
        label: 'Ways of working',
        items: ['Design docs', 'Code review', 'Mentoring', 'Prompt Engineering'],
    },
]
