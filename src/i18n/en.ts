import type cs from './cs';

const en: typeof cs = {
  meta: {
    locale: 'en',
    localeName: 'English',
    localeNameShort: 'EN',
    siteName: 'Vila SCALA',
    tagline: 'Apartments with a view nobody can take away',
  },

  a11y: {
    skipToContent: 'Skip to main content',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    breadcrumb: 'Breadcrumb',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    openGallery: 'View photo full screen',
    closeGallery: 'Close gallery',
    prevImage: 'Previous photo',
    nextImage: 'Next photo',
    imageCounter: 'Photo {current} of {total}',
    toggleTheme: 'Switch between light and dark mode',
    themeLight: 'Light mode',
    themeDark: 'Dark mode',
    switchLanguage: 'Change language',
    newWindow: 'opens in a new window',
    pdfFile: 'PDF file',
    homeLink: 'Vila SCALA — go to homepage',
    pauseVideo: 'Pause the background video',
    playVideo: 'Play the background video',
    scrollHint: 'Scroll down',
  },

  nav: {
    home: 'Home',
    about: 'The project',
    units: 'Apartments',
    documents: 'Documents',
    pricing: 'Prices & specification',
    contact: 'Contact',
  },

  cta: {
    viewUnits: 'Browse apartments',
    viewUnit: 'Apartment detail',
    contact: 'Get in touch',
    contactUs: 'Make an enquiry',
    virtualTour: 'Virtual tour',
    call: 'Call us',
    email: 'Send an email',
    download: 'Download',
    downloadPdf: 'Download PDF',
    backToUnits: 'Back to all apartments',
    allDocuments: 'All documents',
    priceList: 'View price list',
  },

  status: {
    available: 'For sale',
    soon: 'Coming soon',
    sold: 'Sold',
    availableShort: 'Available',
    soonShort: 'Coming soon',
    soldShort: 'Sold',
  },

  units: {
    labelUnit: 'Unit no.',
    floor: 'Floor',
    floorArea: 'Floor area',
    usableArea: 'Usable area',
    totalUsableArea: 'Total usable area',
    price: 'Price',
    layout: 'Layout',
    outdoor: 'Outdoor space',
    priceOnRequest: 'Price on request',
    floorplan: 'Floor plan',
    floorplanAlt: 'Floor plan of unit {unit}',
    designStudio: 'Interior design',
    parameters: 'Apartment specification',
    gallery: 'Visualisations',
    ofUnit: 'of unit {unit}',
  },

  home: {
    seoTitle: 'Vila SCALA — new apartments in Brno-Jundrov',
    seoDescription:
      'Five premium apartments in a new villa house built into the rock on Veslařská street, Brno-Jundrov. Terraces overlooking the Svratka river, energy class B, private wine cellar in the rock.',
    heroEyebrow: 'Veslařská 1039/144, Brno-Jundrov',
    heroTitle: 'Welcome to your new address',
    heroTitleLines: ['A view', 'nobody can', 'take away'],
    heroFacts: [
      { label: 'Location', value: 'Brno-Jundrov' },
      { label: 'Units', value: '5' },
      { label: 'Layouts', value: '2+kk – 4+kk' },
      { label: 'Energy class', value: 'B' },
    ],
    heroPosterAlt: 'The view from the terrace over the Svratka valley and the Brno skyline',
    marquee: 'A house in the rock · Wine cellar in the rock · Terraces with a view · Corten and greenery · Energy class B · Ten minutes to the centre',
    heroSubtitle:
      'Premium living surrounded by greenery, just ten easy minutes from the centre of Brno.',
    heroImageAlt: 'Evening view of the Vila SCALA villa house with its facade lit up',

    introTitle: 'Modern living in Jundrov, where the city meets nature',
    introBody: [
      'Vila SCALA is a new villa house on Veslařská street in Brno-Jundrov. As its name suggests, part of the building sits directly in the rock — and that rock gives it a character and atmosphere you will not find anywhere else in Brno.',
      'Each of the five apartments has a generous terrace or balcony and is designed to meet the highest expectations of modern, comfortable living. Visualisations by leading design and architecture studios come with every apartment, so you can picture your new home long before you move in.',
    ],
    introStudios:
      'Interiors were designed by ATAK Design of Brno, OOOOX (Vila Vanguard) and ABSOLUT Design of Prague, and Studio E arch&interiors of Slovakia.',

    statsTitle: 'The project in numbers',
    stats: [
      { value: '5', label: 'apartments', detail: 'from 2+kk to 4+kk' },
      { value: 'B', label: 'energy class', detail: 'low running costs' },
      { value: '10', label: 'minutes to the centre', detail: 'by car or public transport' },
      { value: '2026', label: 'approved for use', detail: 'ready to move in' },
    ],

    highlightsTitle: 'Why Vila SCALA',
    highlights: [
      {
        title: 'A house in the rock',
        body: 'The rock runs through the whole building as a design element — from the entrance and corridors to the unique private wine cellar available for residents to use.',
      },
      {
        title: 'Terraces and views',
        body: 'Generous ground-floor terraces and upper-floor balconies open onto greenery and the meander of the Svratka river.',
      },
      {
        title: 'Corten and greenery',
        body: 'Designer corten planters filled with greenery on every terrace and balcony, with grounds laid out by a landscape architect.',
      },
      {
        title: 'Smart running costs',
        body: 'Energy class B, underfloor heating, air-conditioning readiness and irrigation from a rainwater retention tank.',
      },
      {
        title: 'Glass lift',
        body: 'Easy access to every floor — and for the attic apartment, right into the unit itself.',
      },
      {
        title: 'Garage with EV readiness',
        body: 'Garage parking spaces are available to purchase, pre-wired for electric vehicles.',
      },
    ],

    unitsTitle: 'Find your new home',
    unitsSubtitle: 'Five units, no two alike. Compare layouts, areas and prices.',

    galleryTitle: 'Take a look inside',
    gallerySubtitle: 'Common areas, the wine cellar in the rock and the grounds.',

    ctaTitle: 'Come and see it',
    ctaBody:
      'We will arrange a viewing whenever suits you — or walk through the building right now in the virtual tour.',
  },

  about: {
    seoTitle: 'About Vila SCALA — living in Brno-Jundrov',
    seoDescription:
      'The Vila SCALA villa house on Veslařská street combines the calm of Jundrov and the nearby Wilson Forest and Svratka river with a ten-minute reach of central Brno.',
    title: 'The project',
    lead: 'Your new home in nature, minutes from the centre of Brno',
    intro:
      'This modern villa house sits in one of the most sought-after parts of Brno and brings comfortable living to the quiet district of Jundrov on Veslařská street. The location pairs immediate access to nature with excellent connections to the city centre. It is an ideal choice for families, couples and individuals who want to live surrounded by greenery without giving up any of the city.',

    pillarsTitle: 'Why choose Jundrov',
    pillars: [
      {
        title: 'Greenery and sustainability first',
        body: 'The project is built around ecology, energy efficiency and long-term sustainable living. The building meets energy class B and is prepared for air conditioning and underfloor heating. The grounds were designed by an experienced landscape architect and use automatic irrigation from a rainwater retention tank. Efficient operation keeps monthly charges low.',
      },
      {
        title: 'Close to nature',
        body: 'Jundrov is prized for how close it sits to forests, parks and recreation areas. Riverside walks, cycle paths, running and quiet time outdoors are all a few minutes from home.',
      },
      {
        title: 'Excellent connections',
        body: 'The centre of Brno is quick to reach by car or public transport. Everything you need day to day is nearby — schools, shops, medical facilities, sports grounds and restaurants.',
      },
      {
        title: 'A quiet neighbourhood',
        body: 'Jundrov is calm, safe and quiet. An ideal place for family life and for anyone looking for privacy and a break from the noise of the city.',
      },
    ],

    locationTitle: 'Living in Jundrov: nature, quiet and plenty to do',
    locationLead:
      'Jundrov lies on the western edge of Brno, right beside the Svratka river and surrounded by greenery — an setting that suits an active and a quiet lifestyle equally well.',
    locationSections: [
      {
        title: 'Nature and places to walk',
        body: 'The expansive Wilson Forest starts a few minutes from home — ideal for walking, running, nordic walking and cycling. The Svratka river flows close to Veslařská street and offers running, cycling and quiet riverside walks. If you love the water, there is rowing, paddleboarding and more.',
      },
      {
        title: 'Sport and recreation for every age',
        body: 'The area is rich in sports grounds and recreation. The nearby Sokol Brno sports centre offers tennis, football and a modern gym. Families will appreciate Lužánky park with its playgrounds and sports areas. The Brno reservoir is close by for swimming, sailing, boat trips and a full summer programme of cultural and sporting events.',
      },
      {
        title: 'Everything within reach',
        body: 'Shops, restaurants, schools and medical facilities are all within walking distance, and the centre of Brno is a few minutes away by car or public transport.',
      },
    ],
    closing:
      'Living on Veslařská street in Jundrov combines city comfort, good amenities and natural calm — the advantages of Brno in a quiet setting by the river.',
  },

  unitsPage: {
    seoTitle: 'Apartments for sale — Vila SCALA, Brno-Jundrov',
    seoDescription:
      'Five 2+kk and 4+kk apartments in the Vila SCALA villa house on Veslařská street, Brno. Floor areas from 61 to 111 m², terraces, balconies and the option to use a unique private wine cellar in the rock.',
    title: 'Apartments',
    lead: 'Exclusive living with quality and style at its core',

    introSections: [
      {
        title: 'Premium common areas',
        body: 'The common areas are lit by designer stone lighting from the Czech maker Anewstyle. A glass lift gives comfortable, stylish access to every floor. And then there is the wine cellar set directly into the rock — a luxury any wine lover will appreciate.',
      },
      {
        title: 'Design and nature in harmony',
        body: 'Every balcony and terrace is finished with designer corten planters filled with greenery. Corten and rock became the defining design elements running through the whole building, giving this modern home an unmistakable character.',
      },
    ],
    introClosing:
      'Every detail is considered to deliver maximum comfort and a genuine sense of place — inside the apartments and throughout the common areas.',

    tableTitle: 'All units at a glance',
    tableCaption: 'Overview of the five apartments in Vila SCALA including areas and prices',
    colUnit: 'Unit',
    colLayout: 'Layout',
    colFloor: 'Floor',
    colArea: 'Floor area',
    colOutdoor: 'Terraces & balconies',
    colPrice: 'Price',
    colDetail: 'Detail',

    galleryTitle: 'Photos and visualisations',
    floorplansTitle: 'Floor plans',
  },

  documents: {
    seoTitle: 'Documents to download — Vila SCALA',
    seoDescription:
      'Floor plans for each apartment and the building energy performance certificate for Vila SCALA, available as PDF downloads.',
    title: 'Documents',
    lead: 'Floor plans and the building energy performance certificate, ready to download.',
    energyTitle: 'Energy performance certificate',
    energyBody: 'The building meets energy class B.',
    energyFile: 'Energy performance certificate',
    floorplansTitle: 'Apartment floor plans',
    standardsTitle: 'Specification',
    standardsBody: 'The complete list of standards and fittings included with each apartment.',
    standardsFile: 'Specification and standards',
    basementTitle: 'Basement floor plan',
    basementAlt: 'Technical floor plan of the basement level with marked areas',
  },

  pricing: {
    seoTitle: 'Prices and specification — Vila SCALA, Brno-Jundrov',
    seoDescription:
      'Price list for the apartments and garage parking spaces at Vila SCALA. Prices include administrative and notary fees, with no commission to pay.',
    title: 'Prices & specification',
    lead: 'Prices include administrative and notary fees. No commission.',

    tableCaption: 'Price list for apartments and garage parking spaces',
    colItem: 'Item',
    colSpec: 'Specification',
    colPrice: 'Price',

    parkingTitle: 'Garage parking',
    parking: [
      { name: 'Garage space no. 1', spec: 'for one car', price: 'CZK 990,000' },
      { name: 'Garage space no. 2', spec: 'for two cars', price: 'CZK 1,690,000' },
    ],
    parkingNote:
      'Garage spaces are pre-wired for electric vehicles and can be purchased with an apartment.',

    noteTitle: 'A note on prices',
    noteBody:
      'All prices include administrative and notary fees. There is no commission to pay. Escrow and purchase contracts are handled by the law firm Krejčí, Rajf & partneři, s.r.o.',

    standardsTitle: 'Specification',
    standardsLead:
      'Each apartment is finished to a premium standard with an emphasis on modern design, material quality and comfort. Included as standard:',
    standards: [
      { name: 'Internal doors', body: 'oversized 2.10 m height, full-glass Satinato' },
      { name: 'Entrance door', body: 'security and acoustic rated' },
      { name: 'Tiling', body: 'large-format throughout' },
      { name: 'Sanitary ware and taps', body: 'branded products' },
      {
        name: 'Kitchen',
        body: 'premium fully fitted kitchen including a ceramic cooking island with concealed induction',
      },
      {
        name: 'Windows and portals',
        body: 'aluminium windows and HS portals with triple insulating glazing',
      },
      { name: 'Heating', body: 'underfloor heating' },
      { name: 'Air conditioning', body: 'pipework prepared for installation' },
      { name: 'Terraces and balconies', body: 'designer corten planters filled with greenery' },
      { name: 'Wine cellar', body: 'the option to use a unique private wine cellar in the rock' },
    ],
    standardsClosing: 'Approved for use and ready for immediate sale.',

    areasTitle: 'How the areas are measured',
    areas: [
      {
        name: 'Floor area',
        body: 'Under the Czech Civil Code (§ 1222) and Government Regulation no. 366/2013 Coll., floor area is the total area of the apartment measured within its perimeter walls, including internal partitions.',
      },
      {
        name: 'Usable area',
        body: 'Defined by European Commission Regulation (EC) no. 1503/2006. It is the sum of the square metres of habitable rooms within the outer walls that can actually be used — kitchen, bedrooms, living rooms, bathrooms, toilets and hallways. It excludes balconies, loggias and terraces, cellars, lofts and common areas, structural elements, areas housing heating or air conditioning, and circulation spaces such as stairwells and lifts.',
      },
      {
        name: 'Total usable area',
        body: 'Usable area plus the area of balconies, loggias, terraces and the cellar.',
      },
    ],
  },

  contact: {
    seoTitle: 'Contact — Vila SCALA, Veslařská 1039/144, Brno',
    seoDescription:
      'Get in touch: +420 601 221 551, info@vila-scala.cz. Vila SCALA, Veslařská 1039/144, Brno-Jundrov. A virtual tour is also available.',
    title: 'Get in touch',
    lead: 'We would be glad to show you around in person. Write or call — we will come back to you quickly.',

    addressTitle: 'Address',
    phoneTitle: 'Phone',
    emailTitle: 'Email',

    tourTitle: 'Virtual tour',
    tourBody: 'Walk through the building online, whenever suits you.',
    tourCta: 'Start the virtual tour',

    mapTitle: 'Where to find us',
    mapCta: 'Open in Google Maps',
    mapAlt: 'Map showing the location of Vila SCALA on Veslařská street in Brno-Jundrov',

    formTitle: 'Contact form',
    formIntro: 'Fill in the form and we will get back to you as soon as possible.',
    formName: 'Full name',
    formEmail: 'Email',
    formPhone: 'Phone',
    formPhoneHint: 'Optional',
    formUnit: 'Apartment you are interested in',
    formUnitAny: 'Not sure yet / general enquiry',
    formMessage: 'Message',
    formSubmit: 'Send message',
    formRequired: 'Required',
    formErrName: 'Please enter your full name.',
    formErrEmail: 'Please enter a valid email address.',
    formErrMessage: 'Please write a short message.',
    formErrPhone: 'Please enter the phone number in digits, e.g. +420 601 221 551.',
    formSuccess: 'Thank you, your message has been sent. We have emailed you a confirmation.',
    formError:
      'Your message could not be sent. Please try again, or write to us directly at info@vila-scala.cz.',
    formSending: 'Sending…',
    formClose: 'Close notification',
    formSubject: 'Enquiry from the Vila SCALA website',
  },

  notFound: {
    seoTitle: 'Page not found — Vila SCALA',
    title: 'We could not find that page',
    body: 'The link is probably out of date or contains a typo. Try one of these pages instead.',
  },

  cookies: {
    title: 'Cookies and your privacy',
    body: 'We use essential browser storage to operate the website and remember your choice. Optional cookies are enabled only with your consent.',
    necessary: 'Necessary only',
    all: 'Allow all',
    settings: 'Cookies',
  },

  footer: {
    about:
      'A new villa house with five apartments on Veslařská street in Brno-Jundrov. Approved for use and ready to move into.',
    contactTitle: 'Contact',
    navTitle: 'Pages',
    docsTitle: 'Downloads',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
};

export default en;
