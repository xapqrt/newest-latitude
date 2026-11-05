// Real parent reviews only. To add more, paste a new entry here and it appears on the home page.
export interface Review {
  name: string
  detail: string
  text: string
}

export const REVIEWS: Review[] = [
  {
    name: 'Garima S.',
    detail: 'Mum of Arya, 9',
    text: 'Arya came home absolutely buzzing with excitement. She could not stop talking about the rappelling wall and rafting challenge. Lookfar Outdoors has really helped her come out of her shell.',
  },
  {
    name: 'Bishwadeep',
    detail: 'Dad of Kiran, 8',
    text: 'As a first outdoor camp experience for my son, I was a bit nervous. But the guides were warm, structured, and highly attentive. The 1:3 ratio meant Kiran always had the support he needed.',
  },
]
