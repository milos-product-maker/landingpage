# Navigation Menu Update Plan

## Objective
Update the navigation menu across all HTML pages to:
1. Replace current Solutions dropdown items with 6 new auditor solution pages
2. Remove the Industries dropdown menu entirely
3. Maintain consistent navigation across all pages

## New Solutions Menu Items (replacing current 6)
| Display Name | File Path |
|-------------|-----------|
| ISO 42001 Readiness | solutions/iso-42001-readiness.html |
| EU AI Act Conformity | solutions/eu-ai-act-conformity.html |
| Hiring Fairness | solutions/hiring-fairness.html |
| Clean Data & Copyright | solutions/clean-data-copyright.html |
| Clinical Validation (FDA) | solutions/clinical-validation-fda.html |
| Sovereign Shield | solutions/sovereign-shield.html |

## Files Requiring Navigation Updates

### Root Level (prefix: `solutions/` for solutions links)
- `index.html`
- `article.html`
- `insights.html`

### Solutions Folder (same folder, no prefix for solutions)
- `solutions/iso-42001-readiness.html`
- `solutions/eu-ai-act-conformity.html`
- `solutions/hiring-fairness.html`
- `solutions/clean-data-copyright.html`
- `solutions/clinical-validation-fda.html`
- `solutions/sovereign-shield.html`
- `solutions/digital-embassies.html` (old page)
- `solutions/confidential-model-audits.html` (old page)
- `solutions/legacy-to-cloud.html` (old page)
- `solutions/sovereign-ai.html` (old page)
- `solutions/datacenter-observability.html` (old page)
- `solutions/export-control.html` (old page)

### Industries Folder (prefix: `../solutions/` for solutions)
- `industries/defense.html`
- `industries/finance.html`
- `industries/healthcare.html`
- `industries/public-sector.html`
- `industries/cloud-providers.html`

### Files NOT requiring updates (different navigation structure)
- `developers/index.html` - has simplified navigation (For Business, Docs, Log In, Book a Demo)
- `docs/*.html` files - Secure Vault / different purpose
- `site/**/*.html` files - SDK documentation site

## Changes Per File

### For root-level pages (index.html, article.html, insights.html)

**Remove** the Industries dropdown block:
```html
<div class="nav-item-dropdown">
    <a href="#" class="nav-link has-dropdown">Industries</a>
    <div class="dropdown-menu">
        ...
    </div>
</div>
```

**Replace** Solutions dropdown content with:
```html
<div class="dropdown-menu">
    <a href="solutions/iso-42001-readiness.html" class="dropdown-link">ISO 42001 Readiness</a>
    <a href="solutions/eu-ai-act-conformity.html" class="dropdown-link">EU AI Act Conformity</a>
    <a href="solutions/hiring-fairness.html" class="dropdown-link">Hiring Fairness</a>
    <a href="solutions/clean-data-copyright.html" class="dropdown-link">Clean Data & Copyright</a>
    <a href="solutions/clinical-validation-fda.html" class="dropdown-link">Clinical Validation (FDA)</a>
    <a href="solutions/sovereign-shield.html" class="dropdown-link">Sovereign Shield</a>
</div>
```

### For solutions/* pages

**Remove** the Industries dropdown block

**Replace** Solutions dropdown content with (relative paths):
```html
<div class="dropdown-menu">
    <a href="iso-42001-readiness.html" class="dropdown-link">ISO 42001 Readiness</a>
    <a href="eu-ai-act-conformity.html" class="dropdown-link">EU AI Act Conformity</a>
    <a href="hiring-fairness.html" class="dropdown-link">Hiring Fairness</a>
    <a href="clean-data-copyright.html" class="dropdown-link">Clean Data & Copyright</a>
    <a href="clinical-validation-fda.html" class="dropdown-link">Clinical Validation (FDA)</a>
    <a href="sovereign-shield.html" class="dropdown-link">Sovereign Shield</a>
</div>
```

### For industries/* pages

**Remove** the Industries dropdown block

**Replace** Solutions dropdown content with (../ prefix):
```html
<div class="dropdown-menu">
    <a href="../solutions/iso-42001-readiness.html" class="dropdown-link">ISO 42001 Readiness</a>
    <a href="../solutions/eu-ai-act-conformity.html" class="dropdown-link">EU AI Act Conformity</a>
    <a href="../solutions/hiring-fairness.html" class="dropdown-link">Hiring Fairness</a>
    <a href="../solutions/clean-data-copyright.html" class="dropdown-link">Clean Data & Copyright</a>
    <a href="../solutions/clinical-validation-fda.html" class="dropdown-link">Clinical Validation (FDA)</a>
    <a href="../solutions/sovereign-shield.html" class="dropdown-link">Sovereign Shield</a>
</div>
```

## Implementation Order
1. Update `index.html` (main homepage - highest visibility)
2. Update `article.html` and `insights.html` (root level pages)
3. Update all 12 `solutions/*.html` files
4. Update all 5 `industries/*.html` files

## Verification Plan
1. **Homepage (index.html)**
   - Solutions dropdown shows 6 new auditor items
   - Industries menu is completely removed
   - All 6 solution links navigate correctly

2. **Cross-page navigation consistency**
   - Visit each solution page and verify same navigation
   - Visit industry pages and verify navigation works
   - Verify article.html and insights.html

3. **Mobile responsive testing**
   - Test hamburger menu on narrow viewport
   - Verify dropdown expands/collapses on mobile
   - Confirm all links work in mobile view

4. **Visual QA checklist**
   - No broken layouts
   - No orphaned dropdown arrows
   - Consistent styling across all pages

## Total Files to Modify: 20

| Category | Count | Files |
|----------|-------|-------|
| Root level | 3 | index.html, article.html, insights.html |
| New solutions | 6 | iso-42001-readiness.html, eu-ai-act-conformity.html, hiring-fairness.html, clean-data-copyright.html, clinical-validation-fda.html, sovereign-shield.html |
| Old solutions | 6 | digital-embassies.html, confidential-model-audits.html, legacy-to-cloud.html, sovereign-ai.html, datacenter-observability.html, export-control.html |
| Industries | 5 | defense.html, finance.html, healthcare.html, public-sector.html, cloud-providers.html |
