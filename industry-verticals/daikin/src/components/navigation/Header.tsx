import React, { JSX, useState } from "react"
import Link from "next/link"
import { ComponentProps } from 'lib/component-props';
import { withDatasourceCheck } from "@sitecore-content-sdk/nextjs"
import PreviewSearch from "../search/PreviewSearch"
import { PREVIEW_WIDGET_ID } from "@/_data/customizations";
import { Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export type HeaderProps = ComponentProps & {
  fields: {
    items: [{
      displayName: string;
      fields: {
        Link: {
          value: {
            anchor: string;
            href: string;
            linktype: string;
            target: string;
            text: string;
          };
        };
      };
    }];
  };
};

const productLinks = [
  { label: "Rooftop Systems", href: "/products/rooftop-systems" },
  { label: "Air Handlers", href: "#" },
  { label: "Chillers", href: "#" },
  { label: "Fan Coils", href: "#" },
  { label: "Condensing Units", href: "#" },
  { label: "Self-Contained Systems", href: "#" },
  { label: "Water Source Heat Pumps", href: "#" },
  { label: "Modular Solutions", href: "#" },
  { label: "VAV Terminal Units", href: "#" },
  { label: "Unit Ventilators", href: "#" },
  { label: "Coils", href: "#" },
  { label: "Daikin Air Purifiers", href: "#" },
  { label: "Daikin Applied BMS", href: "#" },
  { label: "Rental Solutions", href: "#" },
];

const industrySolutionsLinks = [
  { label: "Data Center Solutions", href: "#" },
  { label: "Healthcare", href: "#" },
  { label: "K-12 Education", href: "#" },
  { label: "Higher Education", href: "#" },
  { label: "Office", href: "#" },
  { label: "Retail", href: "#" },
  { label: "Sports & Entertainment", href: "#" },
  { label: "Hospitality", href: "#" },
];

const resourceLinks = [
  { label: "All Solutions Catalog", href: "#" },
  { label: "Product Catalogs", href: "#" },
  { label: "IOM Manuals", href: "#" },
  { label: "Brochures", href: "#" },
  { label: "Case Studies", href: "/resources/case-study" },
  { label: "Controls Integration", href: "#" },
  { label: "Photo Library", href: "#" },
  { label: "Video Library", href: "#" },
  { label: "Design Software Tools", href: "#" },
];

const utilityLinks = [
  { label: "Rentals", href: "#" },
  { label: "Training", href: "#" },
  { label: "Careers", href: "#" },
  { label: "News", href: "/news" },
  { label: "About Us", href: "#" },
];

type MegaMenu = "products" | "industry" | "resources" | null;

export const Header = (props: HeaderProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaMenu>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MegaMenu>(null);

  return (
    <header className={`sticky top-0 z-50 bg-background border-b border-border ${sxaStyles}`}>
      {/* Utility bar */}
      <div className="bg-primary text-background">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8 text-xs">
          <div className="flex items-center gap-4">
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-daikin-light/80 transition-colors hidden sm:inline-block"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/daikin-locators/rep-locator"
            className="font-semibold hover:text-daikin-light/80 transition-colors"
          >
            Find My Rep
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex-shrink-0" aria-label="Daikin Applied home">
          <img src="https://www.daikinapplied.com/App_Themes/SiteTheme/Global/assets/img/daikin-logo.png" alt="Daikin logo" id="logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {(
            [
              { key: "products" as const, label: "Products" },
              { key: "industry" as const, label: "Industry Solutions" },
              { key: "resources" as const, label: "Resources" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md ${activeMenu === key
                ? "text-primary bg-secondary"
                : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
              onMouseEnter={() => setActiveMenu(key)}
              onClick={() => setActiveMenu(activeMenu === key ? null : key)}
            >
              {label}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          ))}
          <Link
            href="/daikin-locators/rep-locator"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-colors rounded-md"
          >
            Find My Rep
          </Link>
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center gap-2">
                  <PreviewSearch rfkId={PREVIEW_WIDGET_ID} isOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      {activeMenu && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-background border-b border-border shadow-lg z-40"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            {activeMenu === "products" && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Products</h3>
                <div className="grid grid-cols-4 gap-3">
                  {productLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activeMenu === "industry" && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Industry Solutions</h3>
                <div className="grid grid-cols-4 gap-3">
                  {industrySolutionsLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activeMenu === "resources" && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Resources</h3>
                <div className="grid grid-cols-4 gap-3">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border shadow-lg">
          <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {(
              [
                { key: "products" as const, label: "Products", links: productLinks },
                { key: "industry" as const, label: "Industry Solutions", links: industrySolutionsLinks },
                { key: "resources" as const, label: "Resources", links: resourceLinks },
              ] as const
            ).map(({ key, label, links }) => (
              <div key={key}>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-3 text-sm font-medium text-foreground"
                  onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                >
                  {label}
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${mobileExpanded === key ? "rotate-90" : ""
                      }`}
                  />
                </button>
                {mobileExpanded === key && (
                  <div className="pl-4 pb-2 space-y-1">
                    {links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 text-sm font-medium text-foreground hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export const Default = withDatasourceCheck()<HeaderProps>(Header);