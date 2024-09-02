export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "USP - PORTAL DE DEMANDAS",
  description: "Portal de demandas da USP",
  secretaryItems: [
    {
      label: "Home",
      href: "/orders",
    },
    {
      label: "Demandas",
      href: "/orders/demands",
    },
    {
      label: "Deslogar",
      href: "/",
    },
  ],
  reviewerItems: [
    {
      label: "Home",
      href: "/orders",
    },
    {
      label: "Pareceres",
      href: "/orders/judgment",
    },
    {
      label: "Deslogar",
      href: "/",
    },
  ],
  coordenatorItems: [
    {
      label: "Home",
      href: "/orders",
    },
    {
      label: "Pareceres para aprovar",
      href: "/orders/aproval",
    },
    {
      label: "Deslogar",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/orders",
    },
    {
      label: "Demandas",
      href: "/orders/demands",
    },
    {
      label: "Avaliações",
      href: "/orders/jugment"
    },
    {
      label: "Encaminhar",
      href: "/orders/forward"
    },
    {
      label: "Logout",
      href: "/",
    },
  ],
};
