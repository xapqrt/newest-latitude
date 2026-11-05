import campfire from '../assets/photos/campfire.webp'
import campsiteTents from '../assets/photos/campsite-tents.webp'
import familyGroup from '../assets/photos/family-group.webp'
import hilltop from '../assets/photos/hilltop.webp'
import lakeside from '../assets/photos/lakeside.webp'
import pottery from '../assets/photos/pottery.webp'
import boulders from '../assets/photos/boulders.webp'
import oedCamp from '../assets/photos/oed-camp.webp'
import kayakKids from '../assets/photos/kayak-kids.webp'
import trekLine from '../assets/photos/trek-line.webp'
import kidsGroup from '../assets/photos/kids-group.webp'

export interface ItineraryItem {
  time: string
  title: string
  desc?: string
}

export interface ItineraryDay {
  /** Omitted for single-day programs */
  heading?: string
  items: ItineraryItem[]
}

export interface ProgramPage {
  eyebrow: string
  headlineLead: string
  headlineEm: string
  sub: string
  heroImage: string
  heroAlt: string
  facts: { label: string; value: string }[]
  overviewTitle: string
  overview: string[]
  overviewImage: string
  overviewAlt: string
  activities: { icon: string; title: string; text: string }[]
  itineraryTitle: string
  itinerary: ItineraryDay[]
  itineraryNote: string
  priceCards?: { label: string; price: string; unit?: string }[]
  priceFootnote?: string
  includes?: string[]
  bringAlong?: string[]
  safety?: { title: string; text: string }[]
  reviews?: { name: string; detail: string; text: string }[]
  gallery?: { src: string; alt: string }[]
}

const REVIEWS = [
  {
    name: "Garima S.",
    detail: "Mum of Arya, 9",
    text: "Arya came home absolutely buzzing with excitement."
  },
  {
    name: "Bishwadeep",
    detail: "Dad of Kiran, 8",
    text: "As a first outdoor camp experience for my son, I was a bit nervous."
  }
]


export const PROGRAM_PAGES: Record<string, ProgramPage> = {
  'little-explorers': {
    eyebrow: 'For kids aged 7–12',
    headlineLead: 'Outdoor Education Camp',
    headlineEm: '3 Days, 2 Nights',
    sub: "Blending hands-on learning with real outdoor adventure. Kids tackle active wilderness challenges to build confidence and real-world resilience.",
    heroImage: oedCamp,
    heroAlt: "A guide helping a child climb a rock face",
    facts: [
      {
        label: "Duration",
        value: "3 Days, 2 Nights"
      },
      {
        label: "Group size",
        value: "Max 18 kids"
      },
      {
        label: "Guide ratio",
        value: "1:3"
      },
      {
        label: "Location",
        value: "Kanakapura"
      }
    ],
    overviewTitle: "Where Curiosity Meets Nature",
    overview: [
      "This camp is designed to give kids (ages 7 to 12) the space to push their boundaries through real, hands-on adventure. From building rafts together to rappelling down rock faces and exploring valleys, the days are packed with active outdoor challenges that test their physical limits."
    ],
    overviewImage: kayakKids,
    overviewAlt: "A group of kids in life jackets holding up paddles by a lake",
    activities: [
      {
        icon: "⛰️",
        title: "Active Exploration",
        text: "Rappel down rock faces and trek through rugged valleys to explore hidden caves."
      },
      {
        icon: "⛺",
        title: "Collaborative Building",
        text: "Working in small groups, kids tackle real-world challenges like constructing lake rafts and building wilderness huts."
      },
      {
        icon: "🤝",
        title: "Connections & Reflections",
        text: "Beyond the daily action, evenings are spent sharing stories around the campfire and participating in open reflection circles."
      },
      {
        icon: "🌱",
        title: "Sensory Immersion",
        text: "Touch, smell, listen, and explore."
      }
    ],
    itineraryTitle: 'Day by day',
    itinerary: [
      {
        heading: "Day 1: Arrival & Group Cohesion",
        items: [
          {
            time: "6:00 AM",
            title: "Departure & Basecamp Arrival",
            desc: "Travel to the camp, welcome drinks, and basecamp orientation. (Breakfast at 9:00 AM)."
          },
          {
            time: "10:00 AM",
            title: "Team-Building Challenges",
            desc: "Ice-breaking games and group cohesion activities, followed by free-flowing social interaction to help the kids make friends."
          },
          {
            time: "2:00 PM",
            title: "Lake Raft-Building",
            desc: "After lunch, kids work in small teams to construct functional rafts on Hosadoddi Lake."
          },
          {
            time: "6:30 PM",
            title: "Wilderness Skills",
            desc: "Evening snacks followed by hands-on challenges like hut building, bridge construction, or mock camp planning."
          },
          {
            time: "9:00 PM",
            title: "Campfire & Storytelling",
            desc: "Dinner followed by group games and storytelling around the fire before lights out."
          }
        ]
      },
      {
        heading: "Day 2: Adventure & Skills",
        items: [
          {
            time: "6:30 AM",
            title: "Morning Movement",
            desc: "Wake up and start the day with guided yoga and movement, followed by a hearty breakfast."
          },
          {
            time: "8:30 AM",
            title: "Rock Rappelling",
            desc: "Safely navigating rock faces to push physical boundaries and build confidence."
          },
          {
            time: "2:00 PM",
            title: "Afternoon Skill Blocks",
            desc: "Post-lunch outdoor challenges like treasure hunts and tower-building."
          },
          {
            time: "6:30 PM",
            title: "Reflection Circle",
            desc: "Unstructured play and guided group reflection to process the day's experiences."
          },
          {
            time: "9:00 PM",
            title: "Campfire Chronicles",
            desc: "Dinner, evening group games, and fireside storytelling under the stars."
          }
        ]
      },
      {
        heading: "Day 3: Trek & Departure",
        items: [
          {
            time: "6:30 AM",
            title: "Morning Fitness",
            desc: "An energizing start to the final day, followed by breakfast."
          },
          {
            time: "8:30 AM",
            title: "Valley Trek & Cave Exploration",
            desc: "An 8 km guided trek through Devaragudda Valley to explore hidden caves."
          },
          {
            time: "2:00 PM",
            title: "Closing Session",
            desc: "Post-lunch group wrap-up, sharing experiences, and packing up the gear."
          },
          {
            time: "5:00 PM",
            title: "Departure",
            desc: "Camp check-out and safe travel back to the drop-off point."
          }
        ]
      }
    ],
    itineraryNote: 'Timings are indicative and can be adjusted based on group needs and locale.',
    safety: [
      {
        title: "Verified Instructors",
        text: "Every instructor undergoes thorough background checks and holds valid certifications."
      },
      {
        title: "First Aid on Site",
        text: "Full first aid kit and trained first responder present at every session."
      },
      {
        title: "1:3 Guide Ratio",
        text: "A high-support setup ensures every child gets close supervision and personal coaching."
      },
      {
        title: "Live Updates for Parents",
        text: "Photo and text updates throughout the session so you always know your child is safe and happy."
      }
    ],
    reviews: REVIEWS,
  },
  'junior-adventurers': {
    eyebrow: 'For kids aged 7–12',
    headlineLead: 'Outdoor Education Camp',
    headlineEm: '5 Days, 4 Nights',
    sub: "Physical challenges, team-building and outdoor skills that push boundaries and build real confidence.",
    heroImage: trekLine,
    heroAlt: "Kids and guides walking in a line along a forest trail",
    facts: [
      {
        label: "Duration",
        value: "5 Days, 4 Nights"
      },
      {
        label: "Group size",
        value: "Max 25 kids"
      },
      {
        label: "Guide ratio",
        value: "1:3"
      },
      {
        label: "Location",
        value: "Kanakapura"
      }
    ],
    overviewTitle: "Where Courage Meets Adventure",
    overview: [
      "This 5-day program gives kids the time and space to fully settle into the rhythm of the outdoors. The week perfectly balances thrilling physical challenges, like rock rappelling and a valley trek, with deeply tactile, joyful moments like clay pottery and high-energy mud games."
    ],
    overviewImage: kidsGroup,
    overviewAlt: "Kids and guides posing in a field with a hill behind them",
    activities: [
      {
        icon: "⛰️",
        title: "Adventure & Exploration",
        text: "Navigate rugged terrains through an 8km valley trek, explore hidden caves, and safely rappel down rock faces."
      },
      {
        icon: "⛺",
        title: "Collaborative Building",
        text: "Working together, kids tackle hands-on wilderness tasks like constructing lake rafts and building shelters from scratch."
      },
      {
        icon: "🎨",
        title: "Creative & Tactile Play",
        text: "We encourage messy, hands-on creativity."
      },
      {
        icon: "🤝",
        title: "Connection & Reflection",
        text: "Beyond the action, daily reflection circles and evening campfires provide quiet moments for kids to process their experiences, share stories, and forge deep, lasting friendships."
      }
    ],
    itineraryTitle: 'Day by day',
    itinerary: [
      {
        heading: "Day 1: Arrival & Group Cohesion",
        items: [
          {
            time: "6:00 AM",
            title: "Departure & Basecamp Arrival",
            desc: "Travel to the camp, welcome drinks, and basecamp orientation. (Breakfast at 9:00 AM)."
          },
          {
            time: "10:00 AM",
            title: "Team-Building Challenges",
            desc: "Ice-breaking games and open time to help the kids connect and make friends."
          },
          {
            time: "2:00 PM",
            title: "Lake Raft-Building",
            desc: "After lunch, kids work in small teams to construct functional rafts on Hosadoddi Lake."
          },
          {
            time: "6:30 PM",
            title: "Wilderness Skills",
            desc: "Evening snacks followed by hands-on challenges like hut building, bridge construction, or camp planning."
          },
          {
            time: "9:00 PM",
            title: "Campfire & Storytelling",
            desc: "Dinner followed by group games and storytelling around the fire before lights out."
          }
        ]
      },
      {
        heading: "Day 2: Adventure & Skills",
        items: [
          {
            time: "6:30 AM",
            title: "Morning Movement",
            desc: "Wake up and start the day with guided yoga and movement, followed by breakfast."
          },
          {
            time: "8:30 AM",
            title: "Rock Rappelling",
            desc: "Safely navigating rock faces to push physical boundaries and build confidence."
          },
          {
            time: "2:00 PM",
            title: "Afternoon Skill Blocks",
            desc: "Post-lunch outdoor challenges like treasure hunts and tower-building."
          },
          {
            time: "6:30 PM",
            title: "Reflection Circle",
            desc: "Unstructured play and guided group reflection to process the day's experiences."
          },
          {
            time: "9:00 PM",
            title: "Campfire Chronicles",
            desc: "Dinner, evening group games, and fireside storytelling under the stars."
          }
        ]
      },
      {
        heading: "Day 3: Creative Activities & Team Challenges",
        items: [
          {
            time: "6:30 AM",
            title: "Morning Movement",
            desc: "Start the day with a guided yoga or dance session, followed by breakfast."
          },
          {
            time: "8:30 AM",
            title: "Nature Immersion",
            desc: "Hands-on outdoor blocks—options include bird watching, tree tagging, obstacle courses, or lake games."
          },
          {
            time: "2:00 PM",
            title: "Pottery & Crafting",
            desc: "After lunch and quiet time, kids engage in tactile, creative expression through pottery."
          },
          {
            time: "6:00 PM",
            title: "Team-Building Activities",
            desc: "Evening snacks followed by collaborative group challenges to strengthen camp friendships."
          },
          {
            time: "8:00 PM",
            title: "Dinner & Rest",
            desc: "A hearty dinner to refuel before an early lights-out to prepare for tomorrow's trek."
          }
        ]
      },
      {
        heading: "Day 4: Trek Day",
        items: [
          {
            time: "6:30 AM",
            title: "Morning Fitness",
            desc: "An energizing start to the day, followed by breakfast."
          },
          {
            time: "8:30 AM",
            title: "Valley Trek & Cave Exploration",
            desc: "An 8 km guided trek through Devaragudda Valley to explore hidden caves."
          },
          {
            time: "2:00 PM",
            title: "Unstructured Exploration",
            desc: "Post-lunch open time for kids to relax, play, and enjoy the outdoors at their own pace."
          },
          {
            time: "7:00 PM",
            title: "Evening Wind-Down",
            desc: "Light activities and dinner, followed by a cozy campfire to share stories from the trek."
          }
        ]
      },
      {
        heading: "Day 5: Departure",
        items: [
          {
            time: "6:30 AM",
            title: "Morning Dance",
            desc: "A fun, upbeat start to the final morning, followed by breakfast."
          },
          {
            time: "8:30 AM",
            title: "Mud Games",
            desc: "High-energy, messy outdoor fun and games before washing up."
          },
          {
            time: "12:30 PM",
            title: "Closing Circle",
            desc: "Group review and shared reflection on the week's experiences."
          },
          {
            time: "2:00 PM",
            title: "Farewell Lunch & Departure",
            desc: "Final camp meal together, followed by packing up and safe travel back to the drop-off point."
          }
        ]
      }
    ],
    itineraryNote: 'Timings are indicative and can be adjusted based on group needs and locale.',
    safety: [
      {
        title: "Verified Instructors",
        text: "Every instructor undergoes thorough background checks and holds valid certifications."
      },
      {
        title: "First Aid on Site",
        text: "Full first aid kit and trained first responder present at every session."
      },
      {
        title: "1:3 Guide Ratio",
        text: "Strict supervision ratio ensures every child is seen, supported, and safe."
      },
      {
        title: "Live Updates for Parents",
        text: "Photo and text updates throughout the day so you always know your child is safe and having fun."
      },
      {
        title: "Certified Safety Equipment",
        text: "All climbing gear, harnesses, and helmets are professionally maintained and certified for safety."
      }
    ],
    reviews: REVIEWS,
  },

  'family-camp-2d1n': {
    eyebrow: 'For families with kids',
    headlineLead: 'Family Camp',
    headlineEm: '2 Days, 1 Night',
    sub: 'Unplug and reconnect as a family. Trek through the forest, gather round the campfire, and spend a night under the stars.',
    heroImage: familyGroup,
    heroAlt: 'A group of parents and children on a Lookfar family camp, with green hills behind them',
    facts: [
      { label: 'Duration', value: '2 Days, 1 Night' },
      { label: 'Who it’s for', value: 'Parents & kids' },
      { label: 'Starts from', value: '₹13,998' },
      { label: 'Under 4 years', value: 'Free' },
    ],
    overviewTitle: 'Closer through nature and adventure',
    overview: [
      'Kid-safe trails and activities the whole family can do together. Meals, camping gear and travel are all included.',
    ],
    overviewImage: campsiteTents,
    overviewAlt: 'A-frame huts and tents on a green lawn at the campsite',
    activities: [
      { icon: '🥾', title: 'Family-Friendly Trek', text: 'A jungle trek through a scenic forest trail, ending with a sunset view.' },
      { icon: '🔥', title: 'Campfire & Stargazing', text: 'An evening campfire with songs and stories, then stargazing with a telescope.' },
      { icon: '🎨', title: 'Team Building', text: 'Pottery, stone painting and a farm tour for the whole family.' },
      { icon: '🌳', title: 'Nature Time', text: 'Tree climbing, guided discovery of local plants and birds, and tree planting to close.' },
    ],
    itineraryTitle: 'Day by day',
    itinerary: [
      {
        heading: 'Day 1: Arrival & Group Cohesion',
        items: [
          { time: '7:00 AM', title: 'Departure', desc: 'Depart from the pick-up point and travel to the camp.' },
          { time: '9:00 – 9:30 AM', title: 'Arrive at camp & check in' },
          { time: '9:30 – 10:00 AM', title: 'Orientation & welcome drinks' },
          { time: '10:00 – 11:00 AM', title: 'Breakfast' },
          { time: '11:00 AM – 1:00 PM', title: 'Farm tour & tree climbing' },
          { time: '1:00 – 2:00 PM', title: 'Lunch' },
          { time: '2:00 – 3:30 PM', title: 'Free time', desc: 'Rest or join the group games.' },
          { time: '3:30 – 7:00 PM', title: 'Jungle trek & sunset viewing' },
          { time: '7:00 – 7:30 PM', title: 'Evening snacks' },
          { time: '7:30 – 8:30 PM', title: 'Free time' },
          { time: '8:30 – 9:30 PM', title: 'Dinner' },
          { time: '9:30 – 10:30 PM', title: 'Campfire & stargazing with a telescope' },
          { time: '10:30 PM', title: 'Lights out' },
        ],
      },
      {
        heading: 'Day 2: Hands-On Morning & Departure',
        items: [
          { time: '7:00 AM', title: 'Wake up & freshen up' },
          { time: '7:30 – 8:30 AM', title: 'Breakfast' },
          { time: '8:30 AM – 12:00 PM', title: 'Group cohesion block', desc: 'Pottery and stone painting.' },
          { time: '12:00 – 1:00 PM', title: 'Rest' },
          { time: '1:00 – 2:00 PM', title: 'Lunch' },
          { time: '2:00 – 4:00 PM', title: 'Closing session', desc: 'Reflections and tree planting.' },
          { time: '4:00 – 4:30 PM', title: 'Pack up & check out' },
          { time: '4:30 PM', title: 'Departure' },
        ],
      },
    ],
    itineraryNote: 'Timings are indicative and can be adjusted based on group needs and locale.',
    priceCards: [
      { label: 'Family of 2', price: '₹13,998' },
      { label: 'Family of 3', price: '₹19,890' },
      { label: 'Family of 4', price: '₹24,599' },
    ],
    priceFootnote: 'Kids under 4 years are free, with no fee required.',
    includes: ['All meals', 'Camping gear', 'Travel', 'Guided activities'],
    gallery: [
      { src: pottery, alt: 'A child and parent holding a clay pot they made' },
      { src: lakeside, alt: 'Families exploring a lakeside meadow under a cloudy sky' },
      { src: campfire, alt: 'Families gathered around a campfire at dusk' },
      { src: boulders, alt: 'Families resting among large granite boulders' },
    ],
  },

  'family-day-trip': {
    eyebrow: 'For families who love the outdoors',
    headlineLead: 'Family Camp',
    headlineEm: '1 Day',
    sub: 'A day in the outdoors, together. Farm discoveries, lakeside birds and trails to share, all home the same night.',
    heroImage: hilltop,
    heroAlt: 'Parents and children on a rocky hilltop with hills and a cloudy sky behind them',
    facts: [
      { label: 'Duration', value: '6 AM to after dinner' },
      { label: 'Adults', value: '₹4,999 each' },
      { label: 'Kids', value: '₹4,499 each' },
      { label: 'Under 4 years', value: 'Free' },
    ],
    overviewTitle: 'One full day, nothing to plan',
    overview: [
      'We pick you up, feed you and guide you through the day. Explore a working farm, spot birds by the lake, ride in a coracle, then trek through the afternoon to catch the sunset from a hilltop.',
    ],
    overviewImage: lakeside,
    overviewAlt: 'Families at the edge of a lake surrounded by palm trees',
    activities: [
      { icon: '🥾', title: 'Trekking', text: 'Head out on the trail and explore the outdoors together.' },
      { icon: '🛶', title: 'Coracle Ride', text: 'A ride out on the lake in a traditional round boat.' },
      { icon: '🐦', title: 'Birdwatching', text: 'A quiet moment spotting birds by the lake.' },
      { icon: '🌅', title: 'Sunset from a Hilltop', text: 'End the afternoon with wide views over the hills.' },
    ],
    itineraryTitle: 'Your day',
    itinerary: [
      {
        items: [
          { time: '6:00 AM', title: 'Departure', desc: 'Begin your journey to the camp.' },
          { time: '8:30 AM', title: 'Arrive & enjoy breakfast', desc: 'Settle in and ease into the day.' },
          { time: '10:00 AM – 12:00 PM', title: 'Farm tour', desc: 'Explore the farm and discover life close to the land.' },
          { time: '12:00 – 1:30 PM', title: 'Rest & unwind', desc: 'Slow down and enjoy some relaxed family time.' },
          { time: '1:30 PM', title: 'Lunch at camp', desc: 'Gather for lunch before the afternoon outdoors.' },
          { time: '2:15 – 2:45 PM', title: 'Lakeside birdwatching & coracle ride', desc: 'Spend a quiet moment spotting birds by the lake.' },
          { time: '3:00 – 6:30 PM', title: 'Afternoon trekking & nature', desc: 'Head out on the trail and explore the outdoors together.' },
          { time: '6:30 – 7:00 PM', title: 'Return & freshen up', desc: 'Take a breath and get ready for dinner.' },
          { time: '7:00 PM onwards', title: 'Dinner & departure', desc: 'Enjoy dinner at camp, then begin the journey home.' },
        ],
      },
    ],
    itineraryNote: 'Timings are indicative and may vary with travel, weather and on-ground conditions. The trek schedule may be adjusted for safe daylight conditions.',
    priceCards: [
      { label: 'Adult', price: '₹4,999', unit: 'per person' },
      { label: 'Child', price: '₹4,499', unit: 'per child' },
      { label: 'Under 4 years', price: 'Free', unit: 'no fee' },
    ],
    priceFootnote: 'Vegetarian food is provided four times a day: breakfast, lunch, evening snacks and dinner.',
    includes: ['Transport from our pickup point', 'Four vegetarian meals', 'Expert guidance during activities'],
    bringAlong: ['Trekking or sports shoes', 'Water bottle', 'Cap', 'Torch', 'Binoculars (optional, for birdwatching)'],
    gallery: [
      { src: campfire, alt: 'Families gathered around a campfire at dusk' },
      { src: familyGroup, alt: 'A group of parents and children with green hills behind them' },
      { src: pottery, alt: 'A child and parent holding a clay pot they made' },
      { src: boulders, alt: 'Families resting among large granite boulders' },
    ],
  },
}
