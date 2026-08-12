export interface HeroData {
  name: string;
  fullName: string;
  tagline: string;
  subtitle: string;
  location: string;
  slogan: string;
  telegram: string;
  instagram: string;
  avatar?: string;
  localPhoto?: string;
}

export interface BrandData {
  name: string;
  image?: string;
}

export interface AboutData {
  title: string;
  text: string;
  roles: string[];
}

export interface ProfileCard {
  icon: string;
  title: string;
  desc: string;
}

export interface ProfileData {
  title: string;
  cards: ProfileCard[];
}

export interface ActivityItem {
  title: string;
  desc: string;
}

export interface ActivityData {
  title: string;
  items: ActivityItem[];
}

export interface MissionData {
  title: string;
  text: string;
  values: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  desc: string;
}

export interface TeamData {
  title: string;
  desc: string;
  members: TeamMember[];
}

export interface CertificateItem {
  /** Путь к файлу в public, например /data/certificates/derma-2024.jpg */
  image: string;
  /** За что выдан */
  title: string;
  /** Кто выдал */
  issuer?: string;
  /** Когда: год или «Март 2024» */
  date?: string;
}

export interface CertificatesData {
  title: string;
  subtitle?: string;
  items: CertificateItem[];
}

export interface StoreData {
  badge: string;
  desc: string;
  address: string;
  cta: string;
}

export interface SocialItem {
  platform: string;
  handle: string;
  url: string;
  icon: string;
}

export interface ContactData {
  title: string;
  telegram: string;
  instagram: string;
  address: string;
  whatsapp?: string;
}

export interface FooterData {
  name: string;
  brand: string;
  location: string;
}

export interface Labels {
  about: string;
  profile: string;
  activity: string;
  mission: string;
  social: string;
  contact: string;
  socialTitle: string;
  openLink: string;
  team: string;
  certificates?: string;
}

export interface NavLabels {
  about: string;
  profile: string;
  activity: string;
  certificates?: string;
  team: string;
  social: string;
  contact: string;
}

export interface PortfolioData {
  hero: HeroData;
  brand: BrandData;
  about: AboutData;
  profile: ProfileData;
  activity: ActivityData;
  team: TeamData;
  certificates?: CertificatesData;
  mission: MissionData;
  store: StoreData;
  social: SocialItem[];
  contact: ContactData;
  footer: FooterData;
  labels: Labels;
  nav: NavLabels;
}

export type Lang = 'ru' | 'en' | 'kg';
