# **Website Feedback & Strategic Restructuring: LucidComputing.ai**

Date: January 13, 2026  
Objective: Restructure the website to effectively serve two distinct personas (CxO/Business vs. Developer) and integrate new market positioning.

## **1\. Core Architecture Strategy: The "Split" Approach**

The primary feedback is that the current single-page flow mixes messaging for two very different audiences, diluting the impact for both.

### **The "Sandwich" Model Structure**

* **Primary Landing (index.html):** Dedicated exclusively to the **Business/Compliance Persona (CxO, CRO, GC)**. This page answers "Why do I need this?" (Risk, Liability, Insurance).  
* **Secondary Portal (/developers):** Dedicated to the **Technical Persona**. This page answers "How do I implement this?" (SDKs, APIs, Containers).  
* **Navigation:** The Top Menu on the main page must feature a prominent, distinct link: **"For Developers"**.

## **2\. Main Page Feedback (Target: CxO / Business)**

### **Navigation & Layout**

* **Top Menu Visibility:** Currently not visible in split-screen or lower resolutions. Needs a responsive fix immediately.  
* **Incoherent CTAs:** Links like "Live Preview," "Sovereign Chat," and "Quick Access" feel disconnected.  
  * *Recommendation:* Consolidate into a single primary CTA: **"Book a Platform Demo"** or **"See the Safety Receipt"**.  
* **"Phase" Terminology:** The term "Phases" sounds like a long, arduous consulting project.  
  * *Recommendation:* Rename to **"Steps"** or **"Flow"** to imply seamless automation.

### **Hero Section & Problem Statement**

* **Animation:** The figure is looking like an ellipsoid rather than a sphere  
* **Placement:** The "Problem Statement" is currently too low. It needs to be **"Above the Fold"** or immediately following the Hero.  
* **Content Upgrade (The "Hair on Fire" Narrative):** Move away from generic "trust" language. Use the more urgent/dramatic pain points from the research:  
  * **Algorithmic Disgorgement:** "The FTC isn't just fining companies; they are forcing the deletion of entire models."  
  * **Uninsurable Liability:** "Cyber insurers are refusing coverage for black-box AI."  
  * **The Trust Gap:** "You are responsible for AI behaviors you cannot see or control."

### **Visuals: The "Radar Plot" Correction**

* **Issue:** The current radar plot showing multiple auditors with conflicting scores (e.g., Auditor A says "Good," Auditor B says "Bad") is confusing and creates doubt rather than trust.  
* **Solution:**  
  * **Unified Envelope:** Instead of conflicting dots, show a "Certified Safety Envelope." If one auditor fails, the whole envelope is breached.  
  * **Stackable Blocks:** Visualize auditors as "Lego blocks" of compliance (e.g., "Add GDPR Block" \+ "Add Fair Lending Block") rather than abstract radar dimensions.

### **Copy & Messaging Refinements**

* **"Accelerated" vs. "Automated":** Replace "Accelerated Compliance" with **"Automated Compliance."** Speed is nice; *automation* implies the removal of operational burden (audits without the auditors).  
* **Certificates/Passports:** Clarify their purpose. They are not just badges; they are **"Audit Automation Tools"**—digital artifacts you can hand to a regulator (or an API) to instantly prove compliance.  
* **Remove Jargon:** On this page, remove references to "OCI Containers," "Sidecars," and specific model version numbers (e.g., "llama-3-70b"). Use "AI Agent" or "Model" generically.

## **3\. Developer Portal Feedback (Target: Builders)**

* **Location:** Create a dedicated destination linked from the main nav.  
* **Key Content to Move Here:**  
  * **"Publish Your Own Auditor in Minutes":** This is a killer feature for devs but confusing for CxOs.  
  * **The sovereignty\_auditor.py Script:** This is excellent proof of "Simplicity" and "Infrastructure as Code." Highlight it here.  
* **Technical Definitions:** This is the place to explain that an "Auditor" is simply a standard **OCI Container**.  
* **Messaging:** Focus on **"Compliance as Code."**  
  * *Pitch:* "Don't let legal slow you down. One line of code generates your AI-BOM and audit trail automatically."

## **4\. Marketplace & Auditors: Merging the Use-Cases**

The Marketplace is a strong concept but needs to feel "ready." We should organize the 50+ identified use cases into categories that signal breadth and depth without overwhelming the user.

**Strategy:** Seed the marketplace with the "Core 5" (essential for everyone) and then categorize the "Niche" auditors to show vertical expertise.

### **Recommended Category Structure (for the UI)**

#### **1\. Regulatory Heavyweights (The "Must-Haves")**

* *Context:* Essential for avoiding fines.  
* **EU AI Act (High-Risk):** Automated conformity assessment.  
* **NYC Local Law 144:** Bias audits for hiring AI.  
* **GDPR / Right to be Forgotten:** Verifying data minimization.  
* **NIST AI RMF:** Federal government alignment.

#### **2\. Vertical Specialists (The "Hair on Fire" Solvers)**

* **Finance:**  
  * *Fair Lending (Reg B):* Detect disparate impact in loan decisions.  
  * *Islamic Finance Auditor:* Verify non-interest-bearing product recommendations.  
* **Healthcare:**  
  * *HIPAA Privacy:* Ensure no PHI leakage in model outputs.  
  * *SaMD (Medical Device):* FDA pre-market software validation.  
* **Gov/Defense:**  
  * *Sovereign Cloud Verifier:* Proof of physical hardware location.  
  * *ITAR Compliance:* Ensure data doesn't cross export-controlled borders.

#### **3\. Safety & Integrity (The "Technical" Checks)**

* **Hallucination Detector:** Real-time fact-checking against trusted corpora.  
* **Jailbreak Resistance:** Testing against "DAN" (Do Anything Now) prompts.  
* **Code Injection Scanner:** For coding assistants.

## **5\. "Red Team" FAQ (To Address in Content)**

The following questions raised during feedback should be addressed either in a simplified FAQ section or within the "How it Works" technical documentation:

1. **"Does this rely entirely on TEE (Trusted Execution Environment) security?"** (Be transparent about hardware dependencies).  
2. **"Can I use this if I'm on Google Cloud / AWS?"** (Clarify multi-cloud support vs. on-prem).  
3. **"Who is the actual customer?"** (Clarify that while the *Dev* installs it, the *Compliance Officer* buys it).