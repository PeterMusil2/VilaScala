import type { ImageMetadata } from 'astro';

import { withBase } from '../i18n';

import unit1Living from '../assets/images/unit-1-living.jpg';
import unit1Preview from '../assets/images/unit-1-preview-all-lights.jpeg';
import unit2Living from '../assets/images/unit-2-living.jpg';
import unit2Preview from '../assets/images/unit-2-day-02.webp';
import unit3Living from '../assets/images/unit-3-living.jpg';
import unit3Preview from '../assets/images/unit-3-preview-lit.jpeg';
import unit4Living from '../assets/images/unit-4-living.webp';
import unit5Entry from '../assets/images/unit-5-entry.jpg';

import plan1 from '../assets/floorplans/unit-1.webp';
import plan2 from '../assets/floorplans/unit-2.webp';
import plan3 from '../assets/floorplans/unit-3.webp';
import plan4 from '../assets/floorplans/unit-4.jpg';
import plan5 from '../assets/floorplans/unit-5.jpg';

import kitchen from '../assets/images/interior-kitchen.jpg';
import livingDark from '../assets/images/interior-living-dark.jpg';
import atticLiving from '../assets/images/interior-attic-living.jpg';
import atticBath from '../assets/images/interior-attic-bath.jpg';
import terrace1 from '../assets/images/terrace-1.jpg';
import terrace2 from '../assets/images/terrace-2.jpg';
import viewSvratka from '../assets/images/view-svratka.jpg';
import cortenPlanters from '../assets/images/corten-planters.jpg';
import rockGarden from '../assets/images/rock-garden.jpg';
import wine1 from '../assets/images/wine-cellar-1.jpg';

export type UnitStatus = 'available' | 'soon' | 'sold';

export interface Unit {
  /** URL slug, identical in both locales — an unambiguous unit number. */
  slug: string;
  /** Unit number as printed in the land registry. */
  number: string;
  layout: string;
  /** 1 = ground floor (1.NP), matching Czech convention. */
  floor: number;
  floorLabel: { cs: string; en: string };
  attic: boolean;
  areas: {
    floor: number;
    usable: number;
    totalUsable: number;
  };
  /** Outdoor spaces, m². Rendered from i18n labels. */
  outdoor: { key: string; area: number }[];
  outdoorTotal: number;
  status: UnitStatus;
  /** CZK, only when publicly listed. */
  price?: number;
  /** Interior design studio credited for the visualisations. */
  studio?: string;
  studioUrl?: string;
  hero: ImageMetadata;
  plan: ImageMetadata;
  gallery: ImageMetadata[];
  pdf: string;
  /** Matterport tour for this specific unit. */
  virtualTourUrl?: string;
}

export const units: Unit[] = [
  {
    slug: '1039-1',
    number: '1039/1',
    layout: '2+kk',
    floor: 1,
    floorLabel: { cs: '1. NP', en: 'Ground floor' },
    attic: false,
    areas: { floor: 60, usable: 56.7, totalUsable: 104.1 },
    outdoor: [
      { key: 'terrace1', area: 34.6 },
      { key: 'terrace2', area: 12.8 },
    ],
    outdoorTotal: 47.4,
    status: 'available',
    price: 9_400_000,
    studio: 'ATAK Design',
    studioUrl: 'https://www.designatak.cz',
    hero: unit1Preview,
    plan: plan1,
    gallery: [unit1Living, kitchen, terrace1, cortenPlanters, viewSvratka, wine1],
    pdf: withBase('/docs/vila-scala-jednotka-1039-1.pdf'),
    virtualTourUrl: 'https://my.matterport.com/show/?m=wshBMwZgJWX',
  },
  {
    slug: '1039-2',
    number: '1039/2',
    layout: '2+kk',
    floor: 1,
    floorLabel: { cs: '1. NP', en: 'Ground floor' },
    attic: false,
    areas: { floor: 61, usable: 57.9, totalUsable: 106.1 },
    outdoor: [
      { key: 'terrace1', area: 33.6 },
      { key: 'terrace2', area: 14.5 },
    ],
    outdoorTotal: 48.1,
    status: 'available',
    price: 9_550_000,
    studio: 'Studio E arch&interiors',
    hero: unit2Preview,
    plan: plan2,
    gallery: [unit2Living, terrace2, rockGarden, cortenPlanters, wine1],
    pdf: withBase('/docs/vila-scala-jednotka-1039-2.pdf'),
    virtualTourUrl: 'https://my.matterport.com/show/?m=aoyxHcrqaw6',
  },
  {
    slug: '1039-3',
    number: '1039/3',
    layout: '4+kk',
    floor: 2,
    floorLabel: { cs: '2. NP', en: 'First floor' },
    attic: false,
    areas: { floor: 111, usable: 103.8, totalUsable: 137.6 },
    outdoor: [
      { key: 'terrace', area: 13.8 },
      { key: 'balcony', area: 20 },
    ],
    outdoorTotal: 33.8,
    status: 'available',
    price: 15_900_000,
    studio: 'OOOOX (Vila Vanguard) / ATAK Design',
    studioUrl: 'https://www.oooox.com',
    hero: unit3Preview,
    plan: plan3,
    gallery: [unit3Living, livingDark, kitchen, viewSvratka, wine1],
    pdf: withBase('/docs/vila-scala-jednotka-1039-3.pdf'),
    virtualTourUrl: 'https://my.matterport.com/show/?m=SEqfAMtKMNL',
  },
  {
    slug: '1039-4',
    number: '1039/4',
    layout: '4+kk',
    floor: 3,
    floorLabel: { cs: '3. NP', en: 'Second floor' },
    attic: true,
    areas: { floor: 108.3, usable: 102.4, totalUsable: 118.5 },
    outdoor: [
      { key: 'balcony1', area: 13.1 },
      { key: 'balcony2', area: 3 },
    ],
    outdoorTotal: 16.1,
    status: 'sold',
    hero: unit4Living,
    plan: plan4,
    gallery: [unit4Living, atticLiving, atticBath, viewSvratka],
    pdf: withBase('/docs/vila-scala-jednotka-1039-4.pdf'),
  },
  {
    slug: '1039-5',
    number: '1039/5',
    layout: '2+kk',
    floor: 4,
    floorLabel: { cs: '4. NP', en: 'Third floor' },
    attic: true,
    areas: { floor: 64.3, usable: 55.6, totalUsable: 71.3 },
    outdoor: [{ key: 'terraceWalkway', area: 15.7 }],
    outdoorTotal: 15.7,
    status: 'sold',
    hero: unit5Entry,
    plan: plan5,
    gallery: [unit5Entry, atticLiving, atticBath, rockGarden, viewSvratka],
    pdf: withBase('/docs/vila-scala-jednotka-1039-5.pdf'),
  },
];

export const getUnit = (slug: string) => units.find((u) => u.slug === slug);

/** Only units a buyer can actually act on, most affordable first. */
export const availableUnits = () => units.filter((u) => u.status === 'available');
