# Six Feet implementation plan

Prepared 28 October 2026 from the Six Feet Handoff and an inspection of the existing repository. The developer brief supplies additional acceptance requirements; where its earlier phases conflict with the handoff, this plan follows the handoff's latest five-step roadmap.

This is a proposed work plan, not authorization to provision services, spend money, contact providers, or launch financial products. No delivery dates are committed. Each step ends with a reviewable demonstration and recorded acceptance.

## Current position

The repository contains a Laravel 13 application with Inertia 3, React 19, TypeScript, Tailwind and existing UI components. Authentication, email verification, two-factor support, profile settings, database queue/cache migrations and a CI workflow are present. The dashboard is a placeholder. Marketplace models, vendor management, booking, payments, ledger, fundraising, repatriation and savings are not implemented in the inspected application files.

Reuse the starter. Verify its behaviour before extending it. Two-factor support exists, but mandatory enforcement for vendors and admins still needs implementation. SSR is a build target; production SSR behaviour still needs verification. The repository uses PHPUnit, while the handoff names Pest: settle the test convention before adding domain tests. Do not rewrite existing tests solely to change syntax.

## Scope and delivery order

1. Design.
2. Local marketplace and packages in Nigeria and Ireland.
3. Crowdfunding.
4. Repatriation, death notices and memorials.
5. Savings through licensed partners.

Later: comparison and funeral estimator, gifts and subscriptions, and the mobile app. Vendor growth tools, additional languages and the UK launch are outside this roadmap. Keep basic browsing filters, visible prices and country configuration in the marketplace step.

Each row in the 174-feature checklist maps to exactly one phase below, to Later, or to the undecided list. This was checked against the spreadsheet on 31 October 2026. Preserve each feature ID, acceptance criterion, dependency and decision. Resolve ambiguities such as gift features linked to notices, repatriation packages offered before Step 4, and long-term group plans that depend on savings.

## Delivery phases

Each phase ends in something that can be demonstrated and reviewed before the next begins.

| Phase | Step | Delivers                                                      | Checklist                                                       |
| ----- | ---- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| 1     | 1    | Design system extracted from the homepage                     | F005, F006, F008                                                |
| 2     | 1    | Key screens in code with sample data                          | None of its own: previews later phases                          |
| 3     | 2    | Application foundation                                        | F001–F004, F009, F011–F015                                      |
| 4     | 2    | Vendor onboarding and private documents                       | F022, F127–F129, F171                                           |
| 5     | 2    | Catalogue and discovery                                       | F019–F021, F025, F027, F028, F031, F032, F036, F039, F131, F132 |
| 6     | 2    | Bookings and orders, before payment                           | F023, F024, F035, F037, F038, F078, F130, F137, F150            |
| 7     | 2    | Money: ledger, gateways, invoices                             | F029, F030, F134, F139–F146, F148                               |
| 8     | 2    | Packages                                                      | F043–F053, F055–F057                                            |
| 9     | 2    | Family, vendor and admin operations                           | F016, F017, F133, F138, F149, F151–F157                         |
| 10    | 2    | Launch in Nigeria and Ireland                                 | F007, F018, F160–F168, F170, F172–F174                          |
| 11    | 3    | Campaigns and donations                                       | F089, F090, F094, F095, F100, F104                              |
| 12    | 3    | Trusted giving                                                | F091–F093, F096, F098, F099, F101–F103                          |
| 13    | 4    | Repatriation cases                                            | F079–F081, F085, F086                                           |
| 14    | 4    | Agent quotes and payment                                      | F054, F082–F084, F087, F088                                     |
| 15    | 4    | Death notices                                                 | F112–F121, F123                                                 |
| 16    | 4    | Memorials                                                     | F109–F111, F122, F125                                           |
| 17    | 5    | Funeral savings                                               | F106, F107                                                      |
| 18    | 5    | Using savings                                                 | F058, F105, F108                                                |
| Later | —    | Comparison and estimator, gifts and subscriptions, mobile app | F033, F040–F042, F059–F077, F097                                |

**Undecided:** reviews (F026) appear in Step 2 of this plan but under Later in the roadmap. These items are on neither the roadmap nor Later: F010, F034, F124, F126, F135, F136, F147, F158, F159, F169. None of the undecided items is a Must on the checklist.

## Family booking and navigation flow

Use the family journey diagram supplied on 28 October 2026 as the reference for booking and navigation. Its six stages describe the customer journey; the five implementation steps above describe delivery milestones. Small numbered badges in the diagram identify the implementation step that introduces each feature.

| Journey stage         | Pages and behaviour                                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 Choose your country | Nigeria or Ireland, remembered between visits, with a visible change-country control. Display prices in the vendor's local currency. Keep Call and WhatsApp help accessible throughout.                                                                                                |
| 2 Find what you need  | Entry points for Find a mortuary, Funeral shop, Vehicle hire, Ready-made packages, and Diaspora and groups. Each leads to relevant listings, details and an enquiry or booking. Bring a loved one home enters the repatriation case journey when Step 4 ships.                         |
| 3 Pay safely          | Guest checkout, disclosed fees, eligible deposits and remaining balances, followed by a receipt and invoice. Campaign funds become an option in Step 3 and savings in Step 5, only when available and eligible. Payment holding and release follow the approved provider arrangements. |
| 4 Vendor delivers     | Show acceptance, progress, messages, delivery evidence and the next action in order tracking. Make reporting a problem and contacting Six Feet easy to find.                                                                                                                           |
| 5 Vendor is paid      | Show family confirmation and completion status. Release payment only when completion and payout checks pass, including the configured no-complaint timeout where applicable. Show the fee before checkout. This is an order status, not a separate navigation destination.             |
| 6 After the funeral   | Keep orders and documents in the family space. Add verified death notices and memorials in Step 4, and optional future savings in Step 5. These are optional destinations, not mandatory booking steps; notices may be created before the funeral.                                     |

Navigation should expose service entry points, the country selector, the family space and persistent help. A booking moves from service details to dates/options, review/payment, confirmation and tracking. Adapt fields to mortuaries, products, vehicles and packages rather than forcing every service into an identical form. Repatriation uses a managed case and quote flow.

Visitors arriving directly from Google, WhatsApp or a shared link should retain their destination when selecting a country. Browsing and checkout must not require an account; offer account creation after payment and provide secure guest access to the booking. Do not force visitors through all six stages as a wizard.

The diagram's “search, compare, choose” means browsing options and prices in the initial marketplace. The dedicated side-by-side comparison tool and funeral estimator remain in Later. The diagram's “24/7, a real person” support promise needs business staffing confirmation before publishing that claim.

## Business decisions to start now

The business owns these decisions; the developer tracks them and supplies technical questions.

| Decision or input                                                                                                                  | Needed for                        |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Brand assets, supplied homepage layout, launch cities, categories and decision maker                                               | Design approval                   |
| Company registrations and business-owned Stripe and Paystack accounts                                                              | Marketplace payments              |
| Written provider confirmation of supported holding, release, refund and settlement flows                                           | Payment architecture and launch   |
| Commission, taxes, deposits, cancellation rules, completion timeout, approval thresholds and package discount funding              | Checkout and operational rules    |
| Legal review of funds handling, privacy, international data storage and country-specific terms; accountant review of tax treatment | Marketplace launch                |
| Crowdfunding permission from both providers, verification rules and fee/unused-funds wording                                       | Crowdfunding launch               |
| Repatriation partners and route-specific requirements                                                                              | Repatriation implementation       |
| Savings product definition and licensed partners for both countries                                                                | Savings implementation and launch |
| Vendor recruitment, support hours and approved WhatsApp templates                                                                  | Operational launch readiness      |

Start savings partner selection immediately because it can progress while earlier steps are built. Do not describe a payment flow as escrow or assume manual settlements are supported until the provider and legal structure are confirmed. The handoff explicitly identifies the Paystack holding approach as unconfirmed; its fallback requires separate review.

## Step 1 Design

**Outcome:** approved family, vendor and admin journeys, with a reusable visual system. The built homepage is the design system, so screens are designed in code with sample data instead of wireframes.

- Confirm the page inventory and country differences.
- Use the six-stage family flow above to map navigation, service-specific bookings, tracking and optional aftercare destinations.
- Build screens for public discovery, vendor profiles, shop, vehicle booking, packages, guest checkout and the family workspace.
- Build screens for vendor application, verification, listings, availability, order fulfilment and earnings; admin verification, disputes, refunds and payouts.
- Rough out crowdfunding, repatriation, notices, memorials and savings so shared navigation and account areas accommodate later steps.
- Define typography, colour, spacing, forms, cards, status trackers, errors, empty states and accessible mobile behaviour. Include loading and payment failure states.

**Complete when:** the business approves the design system and screens in a browser. Key journeys work at a 360px viewport, help remains easy to reach, and an enquiry takes no more than three screens. Record deferred decisions before moving on.

## Step 2 Local marketplace and packages

**Outcome:** a family can find a verified vendor, book or buy, pay, receive the service and resolve problems in either launch country.

Build this step in the following dependency order:

1. **Application foundation.** Configure countries, currencies, legal entities, city/category data, roles and policies, public ULIDs and audit events. Keep business actions independent of Inertia controllers so later API endpoints can reuse them. Establish staging, PostgreSQL with geographic search, SSR, queue/scheduler, monitoring and deployment checks.
2. **Vendor onboarding and private documents.** Build application forms, bank details, document review, expiry handling, approval and suspension. Enforce vendor/admin two-factor authentication and vendor isolation. Upload documents into quarantine; grant access only after a clean scan. Use short-lived authorized access with document-view logging.
3. **Catalogue and discovery.** Build country/city selection, mortuary listings, geographic search, vendor profiles, product catalogue, delivery options, vehicle rate cards, stock and availability. Prevent concurrent bookings from overselling stock or dates. Include enquiry-based services, verified reviews, price freshness and visible support.
4. **Orders and money foundation.** Implement the shared order state machine, integer minor-unit amounts with currency codes, effective-dated fees, double-entry ledger, deposits, balances and country-specific invoices. Keep payment status separate from fulfilment status. Include declined, cancelled, disputed, partially refunded and failed payment paths.
5. **Provider integrations.** Implement one PaymentGateway interface with vendor-country routing to Paystack or Stripe Connect. Use provider-hosted payment entry. Verify webhook signatures, deduplicate events, handle retries and out-of-order delivery, and reconcile payments against the ledger. Gate releases on completion, disputes, bank-change holds and approval rules. Prove the approved settlement approach in each country before enabling real payments.
6. **Packages.** Build curated package contents and agreed vendor rates, parent orders with vendor sub-orders, allocation of commission/discounts, availability checks and partial cancellation/refund rules. Restrict mixed-country or mixed-currency checkout until an explicit supported design exists. Define which diaspora/group packages are deliverable now; dependent repatriation or savings variants wait for their steps.
7. **Family, vendor and admin operations.** Finish tracking, delivery evidence, family access/invitations, document permissions, messaging, notifications, vendor earnings, complaints, disputes, refunds and payout controls. Integrate these screens as the underlying modules are built.
8. **Launch preparation.** Add public content, country/city pages, metadata, canonical URLs, sitemaps, structured data, consent controls and private-page indexing rules. Deploy the agreed AWS/Forge architecture, backups, mail, messaging and monitoring. Train staff and vendors; complete privacy tools, incident procedures and operational guides.

**Complete when:** representative family and vendor journeys pass in both countries; controlled production payment, refund and payout checks succeed with correct accounting; package failures and disputes behave correctly; sensitive documents remain private; accessibility and mobile performance targets pass; a backup restore is demonstrated; the external penetration test is completed and launch-blocking findings are resolved. Target at least 10 ready vendors per country, subject to business confirmation. Demonstrate SSR with usable public HTML and verify low-data performance. Make production access depend on recorded business acceptance.

## Step 3 Crowdfunding

**Outcome:** a verified organiser can raise money, use it for approved funeral services or request an allowed payout, and show donors how it was spent.

- Add campaigns, moderation, goals, deadlines, sharing links/QR codes, donor privacy, updates and fee disclosures.
- Add organiser identity checks, proof of death, review thresholds, reporting, freezes and restricted payout permissions.
- Reuse the payment adapters and ledger for donations, optional tips, refunds and reconciliation. Keep fundraising funds and available spending balances distinguishable from ordinary order payments.
- Allow campaign funds to pay a vendor or package; apply configurable fee incentives and publish an appropriate spending report. Add repatriation payments once Step 4 exists.
- Implement the approved verified-bank payout route, unused-funds rules and fraud/chargeback handling without introducing an unlicensed stored-value wallet.

**Complete when:** provider permissions and legal wording are recorded; donation, vendor spending, authorised bank payout, refund, freeze and reconciliation flows pass; concurrent spending cannot exceed the campaign's available funds; private verification material never appears publicly.

## Step 4 Repatriation death notices and memorials

**Outcome:** a family can manage an agent-supported repatriation case and publish an approved notice or memorial with privacy controls.

- Build route-configured document checklists, case-manager assignment, private uploads, document review and family notifications.
- Build itemised agent quotes, selection, deposits, milestones, final evidence and approved payment release. Use partner-supplied route, airport and airline requirements.
- Connect repatriation quotes to packages and campaign funding where applicable.
- Build consent and verification for notices, review before publication, search, reporting, claim/merge workflows and takedown operations.
- Build family visibility controls, moderated condolences and tributes, and notice-to-memorial conversion. Keep anniversary reminders opt-in. Clarify paid memorial upgrades separately from deferred gift/subscription features.

**Complete when:** signed partners validate route checklists; a representative case completes end to end with correct document access and payments; notices cannot publish without review; visibility restrictions and the requested 24-hour removal workflow work; publication wording is approved.

## Step 5 Savings

**Outcome:** a family can fund and track an approved funeral savings product supplied by a licensed partner.

- Decide whether the product is withdrawable savings or a prepaid funeral plan before designing its financial behaviour.
- Build partner onboarding, identity checks, recurring contributions, statements, progress, pause/cancel flows and reconciliation around the signed partner's API and contract.
- Support vendor or package payments and price locking only where partner and vendor agreements explicitly support them. Define refunds, failed debits and partner outages.
- Treat the partner's records as the authority for held funds; distinguish pending, available and committed amounts in the local ledger and UI.

**Complete when:** the necessary country partners and approvals are signed; contribution, failed debit, withdrawal/cancellation and vendor-payment scenarios pass; support and reconciliation procedures are accepted. Release per country only when its prerequisites are met.

## Engineering acceptance throughout

Test the behaviours most likely to cause harm or lost money: permissions across families/vendors/admins, guest access, state transitions, double bookings, duplicate webhooks, payout retries, fees/tax rounding, partial refunds, disputed orders and campaign overspending. Exercise database constraints and append-only ledger/audit protections on PostgreSQL, not only SQLite.

Extend existing CI with the chosen test convention, frontend checks, PHP static analysis, formatting, dependency audits, PostgreSQL integration coverage and SSR builds. Apply the handoff's security baseline from Step 2: encrypted sensitive fields, breached-password checks, reauthentication for sensitive actions, photo GPS stripping, restricted document access, payout safeguards, rate limits, security headers and operational access restrictions. Verify these controls rather than assuming starter-kit support satisfies them.

Each step should produce a staging demo, acceptance checklist and source/setup documentation. Update admin/vendor guides and operational procedures as features arrive. Confirm the brief's post-launch bug-fix and maintenance terms against the final agreement.

## Commercial checkpoints to confirm

The handoff proposes ₦2,500,000 total: ₦500,000 after Step 1, ₦250,000 after Step 2, ₦500,000 after Step 3 and ₦1,250,000 after Steps 4 and 5 together. Confirm the currency and final combined milestone in writing. Agree how acceptance and billing work if Step 5 waits on a partner after Step 4 is finished. Record recurring service costs and third-party review costs separately; they are not estimated here.

## First work package

1. Record the open business decisions, owners and delivery gates; start payment-provider and savings-partner confirmations through the business.
2. Phase 1: extract the design system from the homepage and add the components it lacks.
3. Phase 2: build the key family, vendor and admin screens with sample data for business review.
4. Turn the approved screens into a Step 2 backlog, ordered as above.

No infrastructure changes are needed to complete Step 1.
