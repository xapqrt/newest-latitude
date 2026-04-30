import littleOverviewImage from '../assets/lookfar-1.jpg'

// ─────────────────────────────────────────────
// Shared program data — single source of truth
// ─────────────────────────────────────────────

export interface ProgramFeature {
  icon: string
  title: string
  sub: string
}

export interface Program {
  id: string
  title: string
  label: string        // shorter display label
  age: string
  ageFilter: string
  duration: string
  location: string
  group: string
  ageColor: string
  img: string
  desc: string
  features: ProgramFeature[]
  href: string
}

export const PROGRAMS: Program[] = [
  {
    id: 'little-explorers',
    title: 'Outdoor Education Camp - 3D2N',
    label: 'Outdoor Education Camp - 3D2N',
    age: 'Ages 7–12',
    ageFilter: '7-12',
    duration: '3 Days, 2 Nights',
    location: 'Kanakapura',
    group: 'Max 18 kids',
    ageColor: '#d4880a',
    img: littleOverviewImage,
    desc: 'Blending hands-on learning with real outdoor adventure. Kids tackle active wilderness challenges to build confidence and real-world resilience.',
    features: [
      { icon: '⛰️', title: 'Active Exploration', sub: 'Rappelling, treks, and cave exploration' },
      { icon: '⛺', title: 'Collaborative Building', sub: 'Build rafts and huts in small teams' },
      { icon: '🤝', title: 'Connections & Reflections', sub: 'Campfires and circles build friendships' },
      { icon: '🌱', title: 'Sensory Immersion', sub: 'Hands-on nature play for all five senses' },
    ],
    href: '/little-explorers',
  },
  {
    id: 'junior-adventurers',
    title: 'Outdoor Education Camp - 5D4N',
    label: 'Outdoor Education Camp - 5D4N',
    age: 'Ages 7–12',
    ageFilter: '7-12',
    duration: '5D,4N',
    location: 'Kanakapura',
    group: 'Max 25 kids',
    ageColor: '#1f6b2e',
    img: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Physical challenges, team-building and outdoor skills that push boundaries and build real confidence.',
    features: [
      { icon: '⛰️', title: 'Adventure & Exploration', sub: 'Valley treks, caves, and rock rappelling' },
      { icon: '⛺', title: 'Collaborative Building', sub: 'Build rafts and shelters as a team' },
      { icon: '🎨', title: 'Creative & Tactile Play', sub: 'Pottery and mud play spark creativity' },
      { icon: '🤝', title: 'Connection & Reflection', sub: 'Campfire circles strengthen bonds' },
    ],
    href: '/junior-adventurers',
  },
  {
    id: 'outdoor-leaders',
    title: 'Outdoor Leaders',
    label: 'Outdoor Leaders (11–13)',
    age: 'Ages 7–12',
    ageFilter: '7-12',
    duration: 'Weekend (2 days)',
    location: 'Savandurga / Turahalli',
    group: 'Max 15 kids',
    ageColor: '#7a4520',
    img: 'https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'A step into real adventure. Pre-teens develop leadership skills through advanced trekking, wilderness navigation, and survival techniques.',
    features: [
      { icon: '🥾', title: 'Advanced Trekking', sub: 'Multi-terrain hikes with elevation' },
      { icon: '🗺️', title: 'Navigation', sub: 'Map reading & orienteering' },
      { icon: '🛡️', title: 'Survival Skills', sub: 'Shelter building, fire craft' },
      { icon: '🏆', title: 'Leadership', sub: 'Decision-making & teamwork' },
    ],
    href: '/outdoor-leaders',
  },
  {
    id: 'teen-expeditions',
    title: 'Teen Expeditions',
    label: 'Teen Expeditions (14–16)',
    age: 'Ages 7–12',
    ageFilter: '7-12',
    duration: '2–3 Days',
    location: 'Bheemeshwari / Kanakapura',
    group: 'Max 12 teens',
    ageColor: '#144820',
    img: 'https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Our most immersive program. Teens take on multi-day wilderness expeditions, environmental conservation projects, and wilderness first aid training.',
    features: [
      { icon: '⛺', title: 'Multi-Day Camps', sub: '2–3 day wilderness immersion' },
      { icon: '🌳', title: 'Conservation', sub: 'Environmental projects & ecology' },
      { icon: '🩺', title: 'Wilderness First Aid', sub: 'Basic emergency response' },
      { icon: '🧠', title: 'Problem Solving', sub: 'Critical thinking under pressure' },
    ],
    href: '/teen-expeditions',
  },
]

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

import { HIDDEN_PROGRAM_SLUGS } from '../config/featureFlags'

/** Programs that are currently visible on the site */
export function getVisiblePrograms(): Program[] {
  return PROGRAMS.filter((p) => !HIDDEN_PROGRAM_SLUGS.has(p.id))
}

/** Look up a program by its URL path (e.g. "/little-explorers") */
export function getProgramByHref(href: string): Program | undefined {
  return PROGRAMS.find((p) => p.href === href)
}

/** Look up a program by its id slug */
export function getProgramById(id: string): Program | undefined {
  return PROGRAMS.find((p) => p.id === id)
}