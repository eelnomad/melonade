// Single source of truth for the Work page. PortfolioWork renders every section
// as a labelled rule followed by its entries; add a project here, not in the
// component.
//
// Entry fields:
//   id           required  :key only
//   name         required  the serif title
//   role         required  the accent mono line under it
//   description  required  the body copy
//   meta         optional  a dim mono line between role and copy — year / stack / status
//   href         optional  external link line, opens in a new tab, arrow ↗
//   to           optional  route name or location object → <router-link>, arrow →
//   linkText     optional  link label; defaults to 'Visit' (href) / 'Read more' (to)
//
// `href` and `to` are mutually exclusive; `to` wins if both are set. An entry
// with neither renders no link line at all.

export const workSections = [
    {
        id: 'experience',
        label: 'Experience',
        entries: [
          {
              id: 'meta',
              name: 'Meta',
              role: 'Senior Engineer',
              description: 'More information available upon request.',
          },
        ],
    },
    {
        id: 'side-projects',
        label: 'Side projects',
        entries: [
            {
                id: 'calliope',
                name: 'Calliope',
                role: 'Rhythm trainer',
                description: 'Dancers often need to know how to count music. This practice tool trains timing and rhythmic accuracy through progressive, adaptive exercises.',
            },
            {
                id: 'gut-instinct',
                name: 'Gut Instinct',
                role: 'GI tracking',
                description: 'Built to help users suffering from IBD. This app helps track and correlate meals and symptoms over time to help surface likely trigger foods.',
            },
        ],
    },
]
