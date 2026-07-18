export type Service = {
  slug: string;
  name: string;
  category: string;
  estimatedPrice?: number;
  preparation: string;
  active: boolean;
};

export type Faq = { question: string; answer: string };

export type NavigationItem = { href: string; label: string };
