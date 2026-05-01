import type { Program } from './programs'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lookfar Outdoors',
    url: 'https://lookfaroutdoors.in',
    logo: 'https://lookfaroutdoors.in/assets/lookfar-white-logo.png',
    description: 'Outdoor education experiences for children in Bangalore — where nature is the teacher.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-91484-22940',
      contactType: 'customer service',
      email: 'hello@lookfaroutdoors.in',
    },
    sameAs: [
      'https://instagram.com/lookfaroutdoors',
      'https://facebook.com/lookfaroutdoors',
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
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'INR',
    },
    audience: {
      '@type': 'Audience',
      suggestedGender: 'unisex',
      suggestedMaxAge: parseInt(program.ageFilter.split('-')[1] || '12'),
      suggestedMinAge: parseInt(program.ageFilter.split('-')[0] || '7'),
    },
    location: program.location,
    duration: program.duration,
  }
}