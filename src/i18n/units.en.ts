import type unitsCs from './units.cs';

/** Per-unit prose and outdoor-space labels, English. */
const unitsEn: typeof unitsCs = {
  outdoor: {
    terrace: 'Terrace',
    terrace1: 'Terrace 1',
    terrace2: 'Terrace 2',
    terraceWalkway: 'Terrace with walkway',
    balcony: 'Balcony',
    balcony1: 'Balcony 1',
    balcony2: 'Balcony 2',
  },

  sharedNote: 'Every apartment includes the option to use a unique private wine cellar in the rock.',
  visualisationNote:
    'Visualisations by leading design and architecture studios come with the apartment, so you can picture your future home in a stylish and workable layout.',

  '1039-1': {
    title: 'A 2+kk apartment with two terraces',
    lead: 'A generous 2+kk apartment of 60 m² for couples and individuals looking for modern living in a quiet spot — with two terraces.',
    outdoorNotes: {
      terrace1: 'Ideal for outdoor dining or gardening.',
      terrace2:
        'The perfect place for morning coffee or fresh air straight from the bedroom — and for a hot tub screened from view.',
    },
    closing:
      'The apartment pairs a modern interior layout with generous outdoor space. Designed by the Brno studio ATAK Design, with several finishes to choose from.',
  },

  '1039-2': {
    title: 'A 2+kk apartment with two generous terraces',
    lead: 'A modern 2+kk apartment of 61 m² for anyone who loves the outdoors — two spacious terraces and plenty of room to live comfortably.',
    outdoorNotes: {
      terrace1: 'Great for barbecues, relaxing or growing plants.',
      terrace2:
        'The perfect place for morning coffee or fresh air straight from the bedroom — and for a hot tub screened from view.',
    },
    closing:
      'The apartment brings a warm interior together with generous outdoor space. Designed by the Slovak studio Studio E arch&interiors.',
  },

  '1039-3': {
    title: 'A 4+kk apartment with a terrace and balcony',
    lead: 'A spacious 4+kk apartment of 111 m² for families and discerning buyers looking for luxury living with plenty of outdoor space.',
    outdoorNotes: {
      terrace: 'Great for unwinding after a long day or sitting out with friends.',
      balcony: 'Perfect for morning coffee, relaxing or looking out over the surrounding greenery.',
    },
    closing:
      'The new owner can choose an interior design by the Prague studio OOOOX (Vila Vanguard) or by ATAK Design of Brno.',
  },

  '1039-4': {
    title: 'An attic 4+kk apartment with two balconies',
    lead: 'A spacious attic 4+kk apartment of 108.3 m² for families and discerning buyers looking for luxury living with a view.',
    outdoorNotes: {
      balcony1: 'Great for unwinding after a long day or sitting out with friends.',
      balcony2: 'Perfect for morning coffee, relaxing or looking out over the surrounding greenery.',
    },
    closing:
      'A luxury apartment offering both a spacious interior and plenty of outdoor space. The new owner can choose from designs by leading studios.',
  },

  '1039-5': {
    title: 'An attic 2+kk apartment with a private garden and pool',
    lead: 'A genuinely one-off 2+kk apartment of 64.3 m² with lift access right into the unit — for couples and the most demanding buyers.',
    outdoorNotes: {
      terraceWalkway:
        'The ideal place for morning coffee, relaxing or sitting out over the surrounding greenery.',
    },
    closing:
      'A walkway leads from the balcony to a private terrace with a glass-walled pool looking out over Brno, a hot tub, and a garden house with an outdoor kitchen, seating and a sauna. A luxury apartment with an exceptional interior and a private garden.',
  },
};

export default unitsEn;
