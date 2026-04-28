const WA_NUMBER = '919148422940'

type WhatsAppOptions = {
  route?: string
  lead?: string
  prompt?: string
  programLabel?: string
  ageRange?: string
  details?: Array<string | null | undefined>
}

function getRouteDefaults(route: string) {
  if (route.includes('little-explorers')) {
    return {
      lead: 'Hi LookFar Outdoors! We just found the Outdoor Education Camp - 3D2N page and it looks fantastic.',
      prompt: 'Could you share the next available dates, pricing, and what the kids will experience?',
    }
  }

  if (route.includes('junior-adventurers')) {
    return {
      lead: 'Hi LookFar Outdoors! The Outdoor Education Camp - 5D4N sounds like a wonderful fit for our child.',
      prompt: 'Could you share the next available dates, pricing, and what a typical day looks like?',
    }
  }

  if (route.includes('guides')) {
    return {
      lead: 'Hi LookFar Outdoors! Your guides look brilliant and we would love to learn more about the team.',
      prompt: 'Could you tell us more about the guides and who would lead our booking?',
    }
  }

  if (route.includes('contact')) {
    return {
      lead: 'Hi LookFar Outdoors! We are ready to plan an outdoor adventure and would love a quick recommendation.',
      prompt: 'Could you help us choose the right program and share the next available spots?',
    }
  }

  return {
    lead: 'Hi LookFar Outdoors! We are exploring your outdoor education programs and would love a quick recommendation.',
    prompt: 'Could you share the current program options, dates, and booking details?',
  }
}

export function buildWhatsAppMessage(options: WhatsAppOptions = {}) {
  const route = options.route ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const defaults = getRouteDefaults(route)
  const programDescriptor = options.programLabel
    ? `${options.programLabel}${options.ageRange ? ` (${options.ageRange})` : ''}`
    : ''

  const lead = options.lead ?? defaults.lead
  const intro = programDescriptor && !lead.includes(programDescriptor)
    ? `${lead} We're especially interested in ${programDescriptor}.`
    : lead
  const prompt = options.prompt ?? defaults.prompt

  return [
    intro,
    '',
    prompt,
    ...((options.details ?? []).filter(Boolean) as string[]),
  ].join('\n')
}

export function buildWhatsAppLink(options: WhatsAppOptions = {}) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(options))}`
}
