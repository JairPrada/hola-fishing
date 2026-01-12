import type { FishingPackage } from '@/shared/types/fishing-packages';

/**
 * Repositorio de datos para paquetes de pesca
 * Aplica el patrón Repository para separar la lógica de datos
 */

/**
 * Lista inmutable de paquetes de pesca disponibles
 * Utiliza readonly para garantizar inmutabilidad
 */
export const FISHING_PACKAGES: readonly FishingPackage[] = [
  {
    id: 'sunset-booze-cruise',
    variant: 'primary',
    title: 'SUNSET / BOOZE CRUISE',
    description:
      'Spend an evening cruising through the shallow water mangrove estuaries looking for dolphins, manatees, stingrays, sea birds, and other wildlife. (No fishing, just relaxing.) we supply soft drinks and water. BYOB and wine!',
    imgPath: '/landing/05.jpg',
    price: 400,
    time: 2,
  },
  {
    id: 'reef-snorkeling-tour',
    variant: 'secondary',
    title: 'REEF SNORKELING TOUR',
    description:
      'Imagine slipping beneath the waves where vibrant coral reefs come alive with color, teeming with tropical fish darting in and out of their homes. This snorkeling charter offers an intimate glimpse into an underwater world that feels like a dream.',
    imgPath: '/landing/06.jpg',
    price: 600,
    time: 3,
  },
  {
    id: 'nearshore-reef-fishing',
    variant: 'primary',
    title: 'NEARSHORE REEF FISHING',
    description:
      'Experience the thrill of a near shore fishing charter, where you can cast your line in the clear waters teeming with target species like grouper, snapper, and kingfish. With the chance to spot dolphins, turtles, and sometimes whales! Perfect for families and friends looking to create unforgettable memories on the water!',
    imgPath: '/landing/07.png',
    price: 800,
    time: 4,
  },
  {
    id: 'nearshore-offshore-fishing',
    variant: 'secondary',
    title: 'NEARSHORE / OFFSHORE FISHING',
    description:
      'Embark on a thrilling fishing adventure where the deep blue waters open up endless possibilities. Head offshore to target big game species or choose to stay closer to shore for more time reef fishing and snorkeling! This package promises an exhilarating experience for anglers seeking both challenge and excitement in the Caribbean Sea.',
    imgPath: '/landing/08.jpg',
    price: '1,200',
    time: 6,
  },
  {
    id: 'full-day-offshore-fishing',
    variant: 'primary',
    title: 'FULL-DAY OFFSHORE FISHING',
    description:
      'Journey deeper in search of the fish that become the stuff of legends and rewrite the record books. Whether you\'re a seasoned angler or a novice, the breathtaking scenery and the excitement of the catch leaves a lasting impression on everyone. Don\'t worry, we\'ve got all day.',
    imgPath: '/landing/09.JPG',
    price: '1,600',
    time: 8,
  },
] as const;

/**
 * Función para obtener todos los paquetes
 * Aplica el patrón Factory Method para encapsular la creación
 */
export function getAllPackages(): readonly FishingPackage[] {
  return FISHING_PACKAGES;
}

/**
 * Función para obtener un paquete por ID
 */
export function getPackageById(id: string): FishingPackage | undefined {
  return FISHING_PACKAGES.find(pkg => pkg.id === id);
}
