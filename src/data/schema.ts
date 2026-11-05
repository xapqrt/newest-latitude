import type { Program } from './programs'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lookfar Outdoors',
    url: 'https://lookfaroutdoors.com',
        description: 'Outdoor education camps for kids and family camps near Bangalore.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-91484-22940',
      contactType: 'customer service',
      email: 'hello@lookfaroutdoors.com',
    },
    sameAs: [
      'https://www.instagram.com/lookfaroutdoors/',
      'https://www.facebook.com/profile.php?id=61572123391126',
    ],
  }
}

export function programSchema(program: Program) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: program.title,
    description: program.desc,
    image: program.img,
    location: program.location,
    duration: program.duration,
  }
}