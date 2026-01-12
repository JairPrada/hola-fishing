/**
 * Tipos de datos para paquetes de pesca
 * Aplica el principio de Single Responsibility separando los tipos
 */

/**
 * Variantes visuales disponibles para los paquetes
 */
export type PackageVariant = 'primary' | 'secondary';

/**
 * Interface principal para paquetes de pesca
 * Aplica el principio de Interface Segregation con propiedades específicas
 */
export interface FishingPackage {
  readonly id: string;
  readonly variant: PackageVariant;
  readonly title: string;
  readonly description: string;
  readonly imgPath: string;
  readonly price?: number | string;
  readonly time?: number;
}

/**
 * Props para componentes que manejan listas de paquetes
 */
export interface PackagesProps {
  readonly packages: readonly FishingPackage[];
}
