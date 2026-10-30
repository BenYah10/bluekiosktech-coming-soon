/**
 * BlueKioskTech.ca — EmailJS (clés PUBLIQUES uniquement).
 * Étape 1.8.1 : test LOCAL de la notification + accusé de réception.
 * Le site en production reste désactivé même si ces fichiers y sont copiés.
 * Les 2 templates EmailJS restent inchangés : Contact Us + Participant Confirmation.
 * ATTENTION : les clés publiques navigateur ne constituent pas une protection anti-spam.
 */
export const emailjsContactConfig = {
  serviceId: 'service_uez93g9',
  templateId: 'template_ytd4pg8',
  publicKey: 'jnT9c-PBRcviLFLwY',
  enabled: true,
  allowLocalTesting: true,
  allowProductionSending: false,
  /** Modèle "Participant Confirmation" partagé avec bluekiosk.tech — aucun changement dashboard. */
  acknowledgmentTemplateId: 'template_fsuoelr',
  acknowledgmentEnabled: true,
} as const;
