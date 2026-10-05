// Single source of truth for every product. Add a record here and the page,
// homepage tile and hub entry are generated automatically.
// Anything in [SQUARE BRACKETS] is a placeholder to be replaced with confirmed facts.

export type Category = 'spawn' | 'culture' | 'fresh';

export interface Product {
  slug: string;
  category: Category;
  name: string;
  latin?: string;
  summary: string;
  cta: string;
  packs: string[];
  packNote?: string;
  audience: string;
  characteristics: string[];
  storage: string;
  shelfLife: string;
  usage: string;
  availability: string;
  faqs: { q: string; a: string }[];
  metaDescription: string;
  related: string[];
}

export const categoryInfo: Record<Category, { id: string; title: string; blurb: string }> = {
  spawn: { id: 'spawn', title: 'Mushroom Spawn', blurb: 'Laboratory-produced spawn for commercial and small-scale growers.' },
  culture: { id: 'cultures', title: 'Pure Cultures', blurb: 'Pure mushroom cultures for growers who produce their own spawn.' },
  fresh: { id: 'fresh', title: 'Fresh Mushrooms', blurb: 'Fresh mushrooms for wholesale and retail customers.' },
};

const spawnFaqs = [
  { q: 'How much spawn do I need?', a: '[ADD SPAWN RATE PER TONNE OF COMPOST OR SUBSTRATE]' },
  { q: 'How should the spawn be stored?', a: '[ADD STORAGE CONDITIONS]' },
  { q: 'How soon should the spawn be used?', a: '[ADD SHELF LIFE]' },
  { q: 'How do I place an order?', a: 'Send us a WhatsApp message or request a quote. We confirm availability, pack sizes and delivery.' },
];
const freshFaqs = [
  { q: 'Do you supply wholesale and retail customers?', a: '[CONFIRM WHOLESALE AND RETAIL AVAILABILITY]' },
  { q: 'What is the minimum order?', a: '[ADD MINIMUM ORDER]' },
  { q: 'Where do you deliver?', a: '[ADD DELIVERY AREA AND ARRANGEMENTS]' },
  { q: 'Can I arrange regular supply?', a: '[CONFIRM STANDING-ORDER OPTIONS]' },
];

export const products: Product[] = [
  {
    slug: 'button-mushroom-spawn',
    category: 'spawn',
    name: 'Button Mushroom Spawn',
    latin: 'Agaricus bisporus',
    summary: 'Dependable spawn for compost-based button mushroom production.',
    cta: 'Request Button Spawn',
    packs: ['1 L', '2.5 L'],
    audience: '[WHO IT IS FOR, for example commercial compost-based growers and small-scale growers]',
    characteristics: ['Species: Agaricus bisporus', '[STRAIN OR CHARACTERISTIC]', '[COLONISATION OR PERFORMANCE NOTE]'],
    storage: '[STORAGE CONDITIONS]',
    shelfLife: '[SHELF LIFE]',
    usage: '[RECOMMENDED USE AND SPAWN RATE]',
    availability: '[AVAILABILITY]',
    faqs: spawnFaqs,
    metaDescription: 'Button mushroom spawn (Agaricus bisporus) from a laboratory-based producer in Kenya, for commercial and small-scale growers. Request a quote.',
    related: ['cremini-mushroom-spawn', 'oyster-mushroom-spawn', 'pure-cultures'],
  },
  {
    slug: 'cremini-mushroom-spawn',
    category: 'spawn',
    name: 'Cremini/Brown Spawn',
    latin: 'Agaricus bisporus, brown strain',
    summary: 'Brown-cap strain for growers targeting the cremini market.',
    cta: 'Request Cremini Spawn',
    packs: ['1 L', '2.5 L'],
    audience: '[WHO IT IS FOR]',
    characteristics: ['Species: Agaricus bisporus (brown strain)', '[STRAIN OR CHARACTERISTIC]', '[COLONISATION OR PERFORMANCE NOTE]'],
    storage: '[STORAGE CONDITIONS]',
    shelfLife: '[SHELF LIFE]',
    usage: '[RECOMMENDED USE AND SPAWN RATE]',
    availability: '[AVAILABILITY]',
    faqs: spawnFaqs,
    metaDescription: 'Cremini (brown) mushroom spawn from a laboratory-based producer in Kenya, for growers targeting the brown mushroom market. Request a quote.',
    related: ['button-mushroom-spawn', 'oyster-mushroom-spawn', 'fresh-cremini-mushrooms'],
  },
  {
    slug: 'oyster-mushroom-spawn',
    category: 'spawn',
    name: 'Oyster Spawn',
    latin: 'Pleurotus species',
    summary: 'Spawn for straw and agricultural-waste substrates.',
    cta: 'Request Oyster Spawn',
    packs: ['1 L', '2.5 L'],
    audience: '[WHO IT IS FOR]',
    characteristics: ['Species: Pleurotus [CONFIRM SPECIES]', '[SUITABLE SUBSTRATES]', '[COLONISATION OR PERFORMANCE NOTE]'],
    storage: '[STORAGE CONDITIONS]',
    shelfLife: '[SHELF LIFE]',
    usage: '[RECOMMENDED USE AND SPAWN RATE]',
    availability: '[AVAILABILITY]',
    faqs: spawnFaqs,
    metaDescription: 'Oyster mushroom spawn from a laboratory-based producer in Kenya, for straw and agricultural-waste substrates. Request a quote.',
    related: ['button-mushroom-spawn', 'cremini-mushroom-spawn', 'pure-cultures'],
  },
  {
    slug: 'pure-cultures',
    category: 'culture',
    name: 'Pure Mushroom Cultures',
    latin: '[SPECIES AND STRAINS]',
    summary: 'Pure cultures for growers who produce their own spawn.',
    cta: 'Request Cultures',
    packs: ['[FORMAT AND SIZES]'],
    audience: '[WHO IT IS FOR, for example growers and laboratories producing their own spawn]',
    characteristics: ['[SPECIES AVAILABLE]', '[CULTURE FORMAT, for example slants or plates]', '[HOW CULTURES ARE VERIFIED]'],
    storage: '[STORAGE CONDITIONS]',
    shelfLife: '[SHELF LIFE]',
    usage: '[RECOMMENDED USE]',
    availability: '[AVAILABILITY]',
    faqs: [
      { q: 'Which species and strains are available?', a: '[ADD SPECIES AND STRAINS]' },
      { q: 'In what format are cultures supplied?', a: '[ADD FORMAT]' },
      { q: 'How do I place an order?', a: 'Send us a WhatsApp message or request a quote. We confirm availability and delivery.' },
    ],
    metaDescription: 'Pure mushroom cultures from a laboratory-based producer in Kenya, for growers who produce their own spawn. Request a quote.',
    related: ['button-mushroom-spawn', 'oyster-mushroom-spawn'],
  },
  {
    slug: 'fresh-button-mushrooms',
    category: 'fresh',
    name: 'Fresh Button Mushrooms',
    summary: 'Fresh button mushrooms grown by the team that produces our spawn.',
    cta: 'Enquire / Order',
    packs: ['1 L', '2.5 L'],
    packNote: '[CONFIRM UNITS: fresh mushrooms are normally sold by weight (g or kg)]',
    audience: 'Wholesale buyers such as hotels, restaurants, supermarkets, grocers and distributors, and retail customers [CONFIRM]',
    characteristics: ['[GRADE OR SIZE]', '[PACKAGING]', '[FRESHNESS AND HANDLING]'],
    storage: '[STORAGE CONDITIONS]',
    shelfLife: '[SHELF LIFE]',
    usage: '[SERVING OR HANDLING NOTES]',
    availability: '[CURRENT AVAILABILITY]',
    faqs: freshFaqs,
    metaDescription: 'Fresh button mushrooms for wholesale and retail buyers in Kenya, grown by a laboratory-based mushroom producer. Request a quote.',
    related: ['fresh-cremini-mushrooms', 'button-mushroom-spawn'],
  },
  {
    slug: 'fresh-cremini-mushrooms',
    category: 'fresh',
    name: 'Fresh Cremini/Brown Mushrooms',
    summary: 'Fresh cremini (brown) mushrooms for wholesale and retail buyers.',
    cta: 'Enquire / Order',
    packs: ['1 L', '2.5 L'],
    packNote: '[CONFIRM UNITS: fresh mushrooms are normally sold by weight (g or kg)]',
    audience: 'Wholesale buyers such as hotels, restaurants, supermarkets, grocers and distributors, and retail customers [CONFIRM]',
    characteristics: ['[GRADE OR SIZE]', '[PACKAGING]', '[FRESHNESS AND HANDLING]'],
    storage: '[STORAGE CONDITIONS]',
    shelfLife: '[SHELF LIFE]',
    usage: '[SERVING OR HANDLING NOTES]',
    availability: '[CURRENT AVAILABILITY]',
    faqs: freshFaqs,
    metaDescription: 'Fresh cremini (brown) mushrooms for wholesale and retail buyers in Kenya, grown by a laboratory-based mushroom producer. Request a quote.',
    related: ['fresh-button-mushrooms', 'cremini-mushroom-spawn'],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (c: Category) => products.filter((p) => p.category === c);
