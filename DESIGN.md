---
name: AdPredict AI Visual Language
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#b090ff'
  on-tertiary-container: '#4600a7'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin: 32px
  container-padding: 24px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for a high-performance SaaS environment, prioritizing data density and predictive clarity. It evokes a sense of "intelligence under the hood" through a sophisticated, high-tech aesthetic that balances professional reliability with cutting-edge innovation.

The visual style is a fusion of **Corporate Modern** and **Glassmorphism**. It utilizes depth through translucent layers and precision-engineered borders to create a workspace that feels like a premium command center. The interface is intentionally dark to reduce eye strain during long analytical sessions, using high-contrast accents to draw focus to critical performance metrics and AI-driven insights.

The emotional response should be one of "command and control"—empowering users with the feeling that they are navigating complex data with a sharp, precise instrument.

## Colors

This design system utilizes a deep, monochromatic base layered with high-vibrancy functional accents.

*   **Background:** The foundational canvas is a deep slate (#0F172A), providing a low-light environment where data visualizations can pop.
*   **Surfaces:** Containers use a glassmorphic approach (#1E293B at 60% opacity) to create a sense of physical layering and depth without clutter.
*   **Primary Accent:** Neon Emerald (#10B981) is reserved for growth metrics, success states, and primary calls to action. It signifies "Go" and "Profit."
*   **Gradients:** Use a "Growth Gradient" (Primary Emerald to a secondary Teal/Blue) for high-impact CTAs and AI-generated insights to differentiate them from standard system actions.
*   **Typography Colors:** Headings must be crisp White (#FFFFFF) for maximum legibility. Body text and labels use a muted Silver/Gray (#94A3B8) to maintain visual hierarchy and focus.

## Typography

The typography strategy leverages two distinct sans-serif families to balance character with utility.

*   **Headlines (Outfit):** Used for titles, page headers, and large metric numbers. Its geometric construction feels modern and technical. Tighten letter-spacing slightly on larger sizes to maintain a "high-end" editorial feel.
*   **Body & UI (Inter):** Used for all functional text, descriptions, and data tables. Inter's tall x-height ensures clarity at small sizes within dense dashboards.
*   **Labels:** Always use Inter with a semi-bold weight and increased letter-spacing for category headers and small metadata, often in all-caps to distinguish them from interactive body text.

## Layout & Spacing

The layout is built on a **12-column fluid grid** for desktop, collapsing to a single column for mobile. 

*   **Rhythm:** A strict 8px base unit governs all dimensions.
*   **Grid Logic:** Use 24px gutters to allow the glassmorphic card borders enough "breathing room" to be visible against the deep background.
*   **Card Framework:** Analytics components should be grouped into cards. Large charts typically span 8 or 12 columns, while secondary metrics (KPIs) span 3 or 4 columns.
*   **Safe Areas:** Maintain a generous 32px outer margin on desktop to frame the dashboard, creating a "contained" application feel rather than an edge-to-edge website.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and subtle "Light Leaks" rather than traditional heavy shadows.

*   **Surface Layers:** The primary surface is the #0F172A background. Overlays (cards, modals) use a semi-transparent fill (#1E293B at 60% opacity) with a `backdrop-filter: blur(12px)`.
*   **Precision Borders:** Every container must have a 1px solid border (#334155). This defines the shape in a dark environment where shadows might be lost.
*   **Active Elevation:** When an element is hovered or active, increase the border brightness to #475569 and add a subtle outer glow using the Primary Emerald color with a very high blur (20px+) and low opacity (10%).
*   **Z-Index Logic:** Modals and dropdowns should have a higher blur (20px) and a slightly lighter background tint to visually lift them above the main dashboard cards.

## Shapes

The shape language is consistently "Soft-Tech." 

*   **Containers:** Use a standard 16px (1rem) radius for all dashboard cards and primary containers to soften the technical data and make the interface feel more approachable.
*   **Interactive Elements:** Buttons and input fields follow the 8px (0.5rem) standard to appear more precise and "tool-like."
*   **Badges:** Status indicators and tags should use a fully pill-shaped (9999px) radius to distinguish them from clickable buttons or structural containers.

## Components

*   **Buttons:** Primary buttons use the Neon Emerald fill with dark slate text. Secondary buttons use the glass background with the 1px border. Use a "Glow" effect on hover.
*   **Cards:** The fundamental building block. Must include the 12px backdrop blur, 16px corner radius, and 1px #334155 border. Internal padding should be a consistent 24px.
*   **Pill Badges:** Used for "AI Confidence" scores or status (e.g., "Active"). These should have a low-opacity background of the status color (e.g., Emerald at 10%) and high-vibrancy text.
*   **Inputs & Sliders:** Text inputs should be dark with a subtle bottom border or a full 1px border that glows emerald on focus. Sliders should have a thick track and a prominent emerald thumb.
*   **Data Visualization:** Line charts should use vibrant gradients for the stroke and a soft glow effect. Grid lines in charts should be kept to a minimum using #1E293B.
*   **AI Insights:** A special "Insight Card" component should feature a subtle gradient border (Emerald to Purple) to denote that the content was generated by AdPredict AI.