// Single source of truth for outbound contact links.
// PortfolioContact renders all of them as rows; PortfolioFooter renders the
// `social` subset as icons. Add a channel here and both pick it up.

export const contactLinks = [
    { id: 'email', label: 'Email', value: 'eelnomad@gmail.com', href: 'mailto:eelnomad@gmail.com', social: false },
    { id: 'github', label: 'GitHub', value: 'github.com/eelnomad', href: 'https://github.com/eelnomad', social: true },
    { id: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/eelnomad', href: 'https://www.linkedin.com/in/eelnomad', social: true },
]

// The channels that get an icon in the footer. `id` doubles as the SocialIcon name.
export const socialLinks = contactLinks.filter((link) => link.social)

// mailto: links must not open in a new tab.
export const isExternal = (href) => !href.startsWith('mailto:')
