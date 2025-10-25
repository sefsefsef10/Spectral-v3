# SPECTRAL - TECHNICAL ARCHITECTURE & BUILD GUIDE
**How to Build the Product Using Existing Tools**
*Complete Implementation Guide for Engineering Team*

Last Updated: January 2025

---

## **EXECUTIVE SUMMARY: BUILD VS BUY PHILOSOPHY**

**Core Principle:** Only build what's defensible IP. Integrate everything else.

**What We Build (20% of code, 80% of value):**
- Translation Engine (healthcare + AI compliance mapping) 🔒 **THE MOAT**
- GRC workflow orchestration (how health systems interact with platform)
- Vendor certification workflow (how vendors get verified)
- Custom UI/UX for healthcare compliance personas

**What We Integrate (80% of code, 20% of value):**
- AI monitoring (LangSmith, Arize, LangFuse)
- Infrastructure (AWS, Vercel, Supabase)
- Auth (Clerk, WorkOS)
- Analytics (PostHog, Metabase)
- Communication (SendGrid, Twilio)

**Result:** Ship faster, focus on defensible IP, capital efficient.

---

## **TECHNICAL STACK OVERVIEW**

### **Frontend**
```yaml
Framework: Next.js 14 (App Router)
Why: React ecosystem, SSR, API routes, Vercel deployment

UI Library: shadcn/ui + Tailwind CSS
Why: Accessible, customizable, professional healthcare aesthetic

State Management: React Server Components + Zustand (client state)
Why: Minimize client JS, use server when possible

Charts/Viz: Recharts + D3.js (complex visualizations)
Why: Healthcare-friendly chart library, D3 for custom compliance graphs

Forms: React Hook Form + Zod
Why: Type-safe validation, healthcare data accuracy critical

Tables: TanStack Table (React Table v8)
Why: Complex filtering/sorting for AI inventory, vendor directory
```

---

### **Backend**
```yaml
API Framework: Next.js API Routes + tRPC
Why: Type-safe APIs, co-located with frontend, easy deployment

Database: PostgreSQL (Supabase hosted)
Why: Relational data (health systems, vendors, certifications), HIPAA-eligible hosting

ORM: Drizzle ORM
Why: Type-safe, lightweight, better performance than Prisma

Authentication: Clerk (B2C) + WorkOS (B2B/SSO)
Why: Clerk for vendor portal, WorkOS for enterprise health systems (SAML/SCIM)

Background Jobs: Inngest
Why: Durable workflows for certifications, compliance checks, alerting

File Storage: AWS S3 (HIPAA-eligible bucket)
Why: Store compliance reports, audit evidence, vendor documentation

Cache: Redis (Upstash)
Why: Cache compliance mappings, rate limiting, real-time features
```

---

### **Infrastructure**
```yaml
Hosting: Vercel (frontend/API) + AWS (compliance workloads)
Why: Vercel for developer experience, AWS for HIPAA BAA

Monitoring: Sentry (errors) + PostHog (analytics) + Better Stack (uptime)
Why: Comprehensive observability without building custom

CI/CD: GitHub Actions
Why: Simple, integrated with repo, fast

Database Backups: Supabase automated + AWS S3 cross-region
Why: Healthcare data requires redundancy

Secrets Management: Vercel Environment Variables + AWS Secrets Manager
Why: Simple for most, AWS for sensitive (API keys to health systems)
```

---

### **AI Monitoring Integrations**
```yaml
LangSmith (LangChain):
- AI tracing and debugging
- Prompt engineering
- Dataset management
- Used by: OpenAI-based AI vendors

Arize AI:
- ML observability
- Model drift detection
- Bias monitoring
- Used by: Enterprise ML teams

LangFuse:
- Open-source LLM monitoring
- Cost tracking
- Latency monitoring
- Used by: Cost-conscious vendors

Weights & Biases:
- ML experiment tracking
- Model versioning
- Used by: Research-heavy AI companies

Direct Integrations:
- Epic APIs (when available)
- Vendor custom APIs
- Webhook receivers
```

---

## **SYSTEM ARCHITECTURE DIAGRAM**

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  Health System Portal          │  Vendor Portal                  │
│  (Next.js + shadcn/ui)         │  (Next.js + shadcn/ui)         │
│  - Dashboard                   │  - Certification Status         │
│  - AI Inventory                │  - Trust Page Builder          │
│  - Monitoring Alerts           │  - Analytics Dashboard         │
│  - Compliance Reports          │  - API Integration Setup       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API / ROUTING LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes + tRPC                                      │
│  - Type-safe APIs                                               │
│  - Authentication middleware (Clerk/WorkOS)                     │
│  - Rate limiting (Upstash Redis)                               │
│  - Request validation (Zod schemas)                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────────────┐   │
│  │ 🔒 TRANSLATION ENGINE│  │  Workflow Orchestration      │   │
│  │   (Core IP - Custom) │  │  (Inngest workflows)         │   │
│  │                      │  │                              │   │
│  │ • AI Telemetry Parser│  │ • Certification workflow     │   │
│  │ • Compliance Mapper  │  │ • Alert escalation          │   │
│  │ • Risk Scorer        │  │ • Report generation         │   │
│  │ • Framework Updater  │  │ • Vendor onboarding         │   │
│  └──────────────────────┘  └──────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────────────┐   │
│  │  Monitoring System   │  │  Compliance Engine           │   │
│  │  (Custom aggregator) │  │  (Custom logic + rules)      │   │
│  │                      │  │                              │   │
│  │ • Multi-source data  │  │ • HIPAA control mapping      │   │
│  │ • Alert routing      │  │ • NIST AI RMF checks         │   │
│  │ • Threshold mgmt     │  │ • FDA guidance tracker       │   │
│  └──────────────────────┘  └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA / INTEGRATION LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  PostgreSQL (Supabase)                                 │   │
│  │  - Health systems, vendors, certifications             │   │
│  │  - AI systems inventory, compliance mappings           │   │
│  │  - Audit logs, user actions, reports                   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ Redis Cache  │  │  S3 Storage  │  │  Vector DB       │    │
│  │ (Upstash)    │  │  (AWS)       │  │  (Pinecone)      │    │
│  │              │  │              │  │                  │    │
│  │ • Mappings   │  │ • Reports    │  │ • Compliance     │    │
│  │ • Sessions   │  │ • Evidence   │  │   embeddings     │    │
│  │ • Rate limit │  │ • Documents  │  │ • Semantic search│    │
│  └──────────────┘  └──────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL INTEGRATIONS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AI Monitoring:        Healthcare Systems:   Compliance:        │
│  • LangSmith          • Epic APIs            • NIST API         │
│  • Arize AI           • Cerner/Oracle       • FDA databases     │
│  • LangFuse           • Meditech            • State law feeds   │
│  • W&B                                                          │
│                                                                 │
│  Communication:        Analytics:            Auth:              │
│  • SendGrid (email)   • PostHog             • Clerk (B2C)      │
│  • Twilio (SMS)       • Metabase            • WorkOS (B2B)     │
│  • Slack webhooks     • Segment                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## **DATABASE SCHEMA (Core Tables)**

### **Health Systems & Users**
```sql
-- Health System Organizations
CREATE TABLE health_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tier TEXT CHECK (tier IN ('foundation', 'growth', 'enterprise')),
  beds INT, -- hospital size
  license_start DATE NOT NULL,
  license_end DATE NOT NULL,
  max_ai_systems INT, -- based on tier
  settings JSONB DEFAULT '{}', -- custom alert thresholds, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (CISOs, compliance officers, etc.)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  health_system_id UUID REFERENCES health_systems(id),
  vendor_id UUID REFERENCES vendors(id), -- if vendor user
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'viewer', 'analyst')),
  auth_provider TEXT DEFAULT 'clerk', -- clerk or workos
  auth_id TEXT UNIQUE NOT NULL, -- external auth system ID
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Log (required for HIPAA)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL, -- 'view', 'create', 'update', 'delete', 'export'
  resource_type TEXT NOT NULL, -- 'ai_system', 'report', 'vendor', etc.
  resource_id UUID,
  ip_address INET,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
```

---

### **AI Systems Inventory**
```sql
-- AI Systems being monitored
CREATE TABLE ai_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  health_system_id UUID REFERENCES health_systems(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id), -- who makes it
  
  -- Basic Info
  name TEXT NOT NULL,
  version TEXT,
  category TEXT, -- 'clinical_ai', 'imaging', 'documentation', 'rcm'
  clinical_use_case TEXT, -- 'radiology diagnosis', 'clinical notes', etc.
  department TEXT, -- 'radiology', 'emergency', 'all'
  
  -- Risk Assessment
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  uses_phi BOOLEAN DEFAULT TRUE,
  fda_classification TEXT, -- 'class_i', 'class_ii', 'class_iii', 'not_regulated'
  
  -- Monitoring Setup
  monitoring_enabled BOOLEAN DEFAULT TRUE,
  integration_type TEXT, -- 'langsmith', 'arize', 'custom_api', 'webhook'
  integration_config JSONB DEFAULT '{}', -- API keys, endpoints (encrypted)
  
  -- Ownership
  clinical_owner TEXT, -- Dr. Sarah Chen
  it_owner TEXT, -- Mike Peterson
  deployed_at DATE,
  
  -- Status
  status TEXT CHECK (status IN ('active', 'testing', 'paused', 'deprecated')),
  last_check_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_ai_systems_health_system ON ai_systems(health_system_id);
CREATE INDEX idx_ai_systems_status ON ai_systems(status) WHERE status = 'active';
```

---

### **Monitoring & Alerts**
```sql
-- Real-time monitoring events
CREATE TABLE monitoring_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_system_id UUID REFERENCES ai_systems(id) ON DELETE CASCADE,
  
  -- Event Details
  event_type TEXT NOT NULL, -- 'drift', 'phi_leakage', 'bias', 'latency', 'error'
  severity TEXT CHECK (severity IN ('info', 'warning', 'critical')),
  
  -- Raw Data (from integrations)
  source TEXT, -- 'langsmith', 'arize', 'custom'
  raw_data JSONB, -- original telemetry
  
  -- Translated Compliance Impact (🔒 Our IP)
  compliance_violations TEXT[], -- ['HIPAA-164.312(b)', 'NIST-MANAGE-4.1']
  required_actions TEXT[], -- ['R18-rollback', 'notify-privacy-officer']
  
  -- Resolution
  status TEXT CHECK (status IN ('open', 'investigating', 'resolved', 'false_positive')),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_monitoring_events_ai_system ON monitoring_events(ai_system_id);
CREATE INDEX idx_monitoring_events_severity ON monitoring_events(severity) WHERE status = 'open';
CREATE INDEX idx_monitoring_events_created ON monitoring_events(created_at DESC);

-- Alert notifications sent
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monitoring_event_id UUID REFERENCES monitoring_events(id),
  user_id UUID REFERENCES users(id),
  channel TEXT CHECK (channel IN ('email', 'sms', 'slack', 'dashboard')),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES users(id)
);
```

---

### **Compliance & Reporting**
```sql
-- Compliance framework mappings (🔒 Core IP)
CREATE TABLE compliance_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  framework TEXT NOT NULL, -- 'HIPAA', 'NIST_AI_RMF', 'FDA', 'ISO_42001'
  control_id TEXT NOT NULL, -- '164.312(b)', 'MANAGE-4.1'
  control_name TEXT NOT NULL,
  description TEXT,
  requirements TEXT[],
  testing_criteria JSONB, -- how to verify compliance
  evidence_requirements TEXT[], -- what docs/logs needed
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_compliance_controls_framework ON compliance_controls(framework, control_id);

-- AI System compliance status
CREATE TABLE compliance_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_system_id UUID REFERENCES ai_systems(id) ON DELETE CASCADE,
  control_id UUID REFERENCES compliance_controls(id),
  
  status TEXT CHECK (status IN ('compliant', 'non_compliant', 'not_applicable', 'in_review')),
  last_verified TIMESTAMPTZ,
  next_verification TIMESTAMPTZ,
  evidence_links TEXT[], -- S3 URLs to evidence documents
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_compliance_mappings_ai_system ON compliance_mappings(ai_system_id);

-- Generated reports
CREATE TABLE compliance_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  health_system_id UUID REFERENCES health_systems(id),
  
  report_type TEXT NOT NULL, -- 'daily', 'weekly', 'monthly', 'board', 'audit'
  frameworks TEXT[], -- ['HIPAA', 'NIST_AI_RMF']
  period_start DATE,
  period_end DATE,
  
  -- Report Contents
  summary JSONB, -- executive summary stats
  findings JSONB, -- compliance issues found
  recommendations TEXT[],
  
  -- File Storage
  file_url TEXT, -- S3 link to PDF/CSV
  generated_by UUID REFERENCES users(id),
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_compliance_reports_health_system ON compliance_reports(health_system_id);
```

---

### **Vendors & Certification**
```sql
-- AI Vendor companies
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  description TEXT,
  category TEXT, -- 'imaging', 'clinical_ai', 'documentation'
  
  -- Contact
  primary_contact_email TEXT,
  primary_contact_name TEXT,
  
  -- Business
  founded_year INT,
  funding_stage TEXT, -- 'seed', 'series_a', 'series_b', 'public'
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendor certifications (Beacon)
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendors(id),
  
  -- Product Being Certified
  product_name TEXT NOT NULL,
  product_version TEXT NOT NULL,
  clinical_use_case TEXT,
  
  -- Certification Details
  tier TEXT CHECK (tier IN ('verified', 'certified', 'trusted')),
  status TEXT CHECK (status IN ('submitted', 'testing', 'passed', 'failed', 'expired')),
  
  -- Timeline
  submitted_at TIMESTAMPTZ,
  testing_started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ, -- 90 days from completion
  
  -- Test Results (stored as JSONB for flexibility)
  test_results JSONB DEFAULT '{}',
  /*
  {
    "phi_protection": {"status": "passed", "incidents": 0},
    "clinical_accuracy": {"status": "passed", "accuracy": 0.94},
    "bias_testing": {"status": "passed", "variance": 0.03},
    "security": {"status": "passed", "vulnerabilities": []},
    "explainability": {"status": "passed", "method": "saliency_maps"},
    "drift_detection": {"status": "passed", "monitoring": "built_in"}
  }
  */
  
  -- Public Trust Page
  trust_page_slug TEXT UNIQUE, -- spectral.health/verified/{slug}
  trust_page_published BOOLEAN DEFAULT FALSE,
  
  -- Files
  compliance_report_url TEXT, -- S3 link to full report
  badge_image_url TEXT, -- "Spectral Verified" badge
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_certifications_vendor ON certifications(vendor_id);
CREATE INDEX idx_certifications_status ON certifications(status);

-- Certification test results (detailed)
CREATE TABLE certification_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_id UUID REFERENCES certifications(id) ON DELETE CASCADE,
  
  test_type TEXT NOT NULL, -- 'phi_protection', 'clinical_accuracy', etc.
  status TEXT CHECK (status IN ('pending', 'running', 'passed', 'failed')),
  
  -- Test Execution
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  test_cases_total INT,
  test_cases_passed INT,
  test_cases_failed INT,
  
  -- Results
  results JSONB DEFAULT '{}', -- detailed test output
  evidence_urls TEXT[], -- S3 links to test logs, screenshots
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## **THE TRANSLATION ENGINE (Core IP)**

### **Architecture**

This is the defensible moat. Here's how it works:

```typescript
// src/core/translation-engine/index.ts

/**
 * TRANSLATION ENGINE
 * 
 * Converts AI monitoring telemetry → Healthcare compliance controls
 * This is the core IP that takes 3+ years to replicate
 */

import { MonitoringEvent } from './types';
import { ComplianceMapping } from './compliance-mappings';
import { RiskScorer } from './risk-scorer';
import { ActionGenerator } from './action-generator';

export class TranslationEngine {
  private complianceMapper: ComplianceMapping;
  private riskScorer: RiskScorer;
  private actionGenerator: ActionGenerator;
  
  constructor() {
    this.complianceMapper = new ComplianceMapping();
    this.riskScorer = new RiskScorer();
    this.actionGenerator = new ActionGenerator();
  }
  
  /**
   * Main translation function
   * 
   * Input: Raw telemetry from LangSmith/Arize
   * Output: Healthcare compliance violations + required actions
   */
  async translate(event: MonitoringEvent): Promise<TranslatedEvent> {
    // Step 1: Parse the raw telemetry
    const parsed = this.parseRawEvent(event);
    
    // Step 2: Map to compliance frameworks (🔒 Core IP)
    const violations = await this.complianceMapper.mapToControls(parsed);
    
    // Step 3: Calculate risk score
    const risk = this.riskScorer.calculateRisk(parsed, violations);
    
    // Step 4: Generate required actions
    const actions = this.actionGenerator.generate(violations, risk);
    
    // Step 5: Determine escalation
    const escalation = this.determineEscalation(risk, violations);
    
    return {
      originalEvent: event,
      parsed,
      violations,
      risk,
      actions,
      escalation,
      timestamp: new Date()
    };
  }
  
  private parseRawEvent(event: MonitoringEvent): ParsedEvent {
    // Handle different integration sources
    switch (event.source) {
      case 'langsmith':
        return this.parseLangSmithEvent(event.rawData);
      case 'arize':
        return this.parseArizeEvent(event.rawData);
      case 'custom_api':
        return this.parseCustomEvent(event.rawData);
      default:
        throw new Error(`Unknown source: ${event.source}`);
    }
  }
}
```

---

### **Compliance Mapping (The Crown Jewels)**

```typescript
// src/core/translation-engine/compliance-mappings.ts

/**
 * COMPLIANCE MAPPING
 * 
 * This is where 3 years of healthcare + AI expertise is encoded
 * Maps AI telemetry patterns → Specific compliance controls
 */

interface ParsedEvent {
  eventType: 'drift' | 'phi_leakage' | 'bias' | 'latency' | 'error';
  severity: 'info' | 'warning' | 'critical';
  metrics: Record<string, number>;
  metadata: Record<string, any>;
  aiSystemId: string;
  timestamp: Date;
}

interface ComplianceViolation {
  framework: 'HIPAA' | 'NIST_AI_RMF' | 'FDA' | 'ISO_42001' | 'CA_SB1047';
  controlId: string;
  controlName: string;
  violationType: 'breach' | 'deviation' | 'threshold_exceeded';
  severity: 'low' | 'medium' | 'high' | 'critical';
  requiresReporting: boolean; // to regulators
  reportingDeadline?: Date; // e.g., 60 days for HIPAA breach
}

export class ComplianceMapping {
  private mappings: Map<string, ComplianceRule[]>;
  
  constructor() {
    this.loadMappings();
  }
  
  async mapToControls(event: ParsedEvent): Promise<ComplianceViolation[]> {
    const violations: ComplianceViolation[] = [];
    
    // Check each event type against compliance rules
    switch (event.eventType) {
      case 'drift':
        violations.push(...this.handleDrift(event));
        break;
      case 'phi_leakage':
        violations.push(...this.handlePHILeakage(event));
        break;
      case 'bias':
        violations.push(...this.handleBias(event));
        break;
      case 'latency':
        violations.push(...this.handleLatency(event));
        break;
      case 'error':
        violations.push(...this.handleError(event));
        break;
    }
    
    return violations;
  }
  
  private handleDrift(event: ParsedEvent): ComplianceViolation[] {
    const violations: ComplianceViolation[] = [];
    
    // Get AI system details to understand clinical context
    const aiSystem = await this.getAISystem(event.aiSystemId);
    
    // Model drift affects multiple frameworks
    
    // 1. NIST AI RMF
    if (event.metrics.accuracyDrop && event.metrics.accuracyDrop > 0.05) {
      violations.push({
        framework: 'NIST_AI_RMF',
        controlId: 'MANAGE-4.1',
        controlName: 'AI system performance is monitored',
        violationType: 'deviation',
        severity: event.metrics.accuracyDrop > 0.10 ? 'high' : 'medium',
        requiresReporting: false
      });
    }
    
    // 2. HIPAA - Service Availability
    violations.push({
      framework: 'HIPAA',
      controlId: '164.312(b)',
      controlName: 'Audit Controls - System Activity Review',
      violationType: 'threshold_exceeded',
      severity: 'medium',
      requiresReporting: false
    });
    
    // 3. FDA (if SaMD)
    if (aiSystem.fdaClassification !== 'not_regulated') {
      violations.push({
        framework: 'FDA',
        controlId: 'PCCP-ML',
        controlName: 'Predetermined Change Control Plan - Model Performance',
        violationType: 'deviation',
        severity: 'high',
        requiresReporting: true, // FDA requires notification
        reportingDeadline: this.calculateDeadline(30) // 30 days
      });
    }
    
    return violations;
  }
  
  private handlePHILeakage(event: ParsedEvent): ComplianceViolation[] {
    // PHI leakage is CRITICAL - always HIPAA breach
    
    const violations: ComplianceViolation[] = [];
    
    // 1. HIPAA Breach Notification Rule
    violations.push({
      framework: 'HIPAA',
      controlId: '164.402',
      controlName: 'Breach Notification - Unauthorized Disclosure',
      violationType: 'breach',
      severity: 'critical',
      requiresReporting: true,
      reportingDeadline: this.calculateDeadline(60) // 60 days to notify HHS
    });
    
    // 2. HIPAA Security Rule
    violations.push({
      framework: 'HIPAA',
      controlId: '164.308(a)(1)(ii)(D)',
      controlName: 'Security Management - Information System Activity Review',
      violationType: 'breach',
      severity: 'critical',
      requiresReporting: true
    });
    
    // 3. State Laws (if applicable)
    const aiSystem = await this.getAISystem(event.aiSystemId);
    if (this.isCaliforniaSubject(aiSystem)) {
      violations.push({
        framework: 'CA_SB1047',
        controlId: 'CA-BREACH',
        controlName: 'California Breach Notification',
        violationType: 'breach',
        severity: 'critical',
        requiresReporting: true,
        reportingDeadline: this.calculateDeadline(30) // CA requires faster
      });
    }
    
    return violations;
  }
  
  private handleBias(event: ParsedEvent): ComplianceViolation[] {
    const violations: ComplianceViolation[] = [];
    
    // Bias violations depend on variance and clinical context
    const variance = event.metrics.demographicVariance || 0;
    
    // 1. NIST AI RMF
    if (variance > 0.05) { // >5% variance
      violations.push({
        framework: 'NIST_AI_RMF',
        controlId: 'MEASURE-2.5',
        controlName: 'AI system performance is monitored for fairness',
        violationType: 'threshold_exceeded',
        severity: variance > 0.10 ? 'high' : 'medium',
        requiresReporting: false
      });
    }
    
    // 2. NYC Local Law 144 (if hiring/employment AI)
    const aiSystem = await this.getAISystem(event.aiSystemId);
    if (aiSystem.category === 'employment_ai' && variance > 0.04) {
      violations.push({
        framework: 'NYC_LL144',
        controlId: 'NYC-BIAS',
        controlName: 'Bias Audit Required',
        violationType: 'threshold_exceeded',
        severity: 'high',
        requiresReporting: true
      });
    }
    
    return violations;
  }
  
  private handleLatency(event: ParsedEvent): ComplianceViolation[] {
    const violations: ComplianceViolation[] = [];
    
    // Latency issues affect service availability
    const latencyIncrease = event.metrics.latencyIncreasePct || 0;
    
    if (latencyIncrease > 0.15) { // >15% increase
      violations.push({
        framework: 'HIPAA',
        controlId: '164.312(b)',
        controlName: 'Audit Controls - Service Availability',
        violationType: 'deviation',
        severity: latencyIncrease > 0.30 ? 'high' : 'medium',
        requiresReporting: false
      });
    }
    
    return violations;
  }
  
  private handleError(event: ParsedEvent): ComplianceViolation[] {
    // Error handling depends on error type and frequency
    const violations: ComplianceViolation[] = [];
    
    const errorRate = event.metrics.errorRate || 0;
    
    if (errorRate > 0.01) { // >1% error rate
      violations.push({
        framework: 'NIST_AI_RMF',
        controlId: 'MANAGE-1.1',
        controlName: 'AI risks are managed continuously',
        violationType: 'threshold_exceeded',
        severity: errorRate > 0.05 ? 'high' : 'medium',
        requiresReporting: false
      });
    }
    
    return violations;
  }
  
  // Helper functions
  private async getAISystem(id: string) {
    // Fetch from database
    return db.aiSystems.findById(id);
  }
  
  private isCaliforniaSubject(aiSystem: AISystem): boolean {
    // Check if health system is in California
    return aiSystem.healthSystem.state === 'CA';
  }
  
  private calculateDeadline(days: number): Date {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days);
    return deadline;
  }
  
  private loadMappings() {
    // Load compliance control mappings from database/cache
    // This is updated quarterly as regulations change
    this.mappings = new Map();
    
    // In production, this would load from Redis cache
    // which is updated from PostgreSQL compliance_controls table
  }
}
```

---

### **Action Generator**

```typescript
// src/core/translation-engine/action-generator.ts

/**
 * ACTION GENERATOR
 * 
 * Determines what actions are required based on violations
 * Maps violations → Specific remediation steps
 */

interface RequiredAction {
  actionType: 'rollback' | 'notify' | 'document' | 'escalate' | 'restrict';
  priority: 'immediate' | 'urgent' | 'high' | 'medium' | 'low';
  description: string;
  assignee: 'ciso' | 'compliance_officer' | 'clinical_owner' | 'it_owner';
  deadline: Date;
  automated: boolean; // can we do this automatically?
}

export class ActionGenerator {
  generate(violations: ComplianceViolation[], risk: RiskScore): RequiredAction[] {
    const actions: RequiredAction[] = [];
    
    violations.forEach(violation => {
      switch (violation.framework) {
        case 'HIPAA':
          actions.push(...this.generateHIPAAActions(violation, risk));
          break;
        case 'NIST_AI_RMF':
          actions.push(...this.generateNISTActions(violation, risk));
          break;
        case 'FDA':
          actions.push(...this.generateFDAActions(violation, risk));
          break;
        // ... other frameworks
      }
    });
    
    // Deduplicate and prioritize
    return this.prioritizeActions(actions);
  }
  
  private generateHIPAAActions(
    violation: ComplianceViolation,
    risk: RiskScore
  ): RequiredAction[] {
    const actions: RequiredAction[] = [];
    
    if (violation.controlId === '164.402') {
      // Breach notification
      actions.push({
        actionType: 'notify',
        priority: 'immediate',
        description: 'Notify Privacy Officer of potential PHI breach',
        assignee: 'compliance_officer',
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        automated: true // we send alert automatically
      });
      
      actions.push({
        actionType: 'document',
        priority: 'urgent',
        description: 'Document breach details for HHS reporting',
        assignee: 'compliance_officer',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        automated: false
      });
      
      // If critical, rollback immediately
      if (risk.level === 'critical') {
        actions.push({
          actionType: 'rollback',
          priority: 'immediate',
          description: 'Rollback AI system to last known good version',
          assignee: 'it_owner',
          deadline: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
          automated: true // can be automated with feature flag
        });
      }
    }
    
    return actions;
  }
  
  private generateNISTActions(
    violation: ComplianceViolation,
    risk: RiskScore
  ): RequiredAction[] {
    const actions: RequiredAction[] = [];
    
    if (violation.controlId === 'MANAGE-4.1') {
      // Performance monitoring
      actions.push({
        actionType: 'escalate',
        priority: 'high',
        description: 'Escalate to governance committee for performance review',
        assignee: 'ciso',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        automated: true
      });
      
      actions.push({
        actionType: 'document',
        priority: 'medium',
        description: 'Update risk assessment with performance degradation',
        assignee: 'compliance_officer',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        automated: false
      });
    }
    
    return actions;
  }
  
  private generateFDAActions(
    violation: ComplianceViolation,
    risk: RiskScore
  ): RequiredAction[] {
    const actions: RequiredAction[] = [];
    
    if (violation.controlId === 'PCCP-ML') {
      // FDA reporting required
      actions.push({
        actionType: 'notify',
        priority: 'immediate',
        description: 'Prepare FDA notification of model change',
        assignee: 'compliance_officer',
        deadline: violation.reportingDeadline,
        automated: false // requires human review
      });
      
      actions.push({
        actionType: 'restrict',
        priority: 'urgent',
        description: 'Restrict AI system use until FDA review complete',
        assignee: 'clinical_owner',
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        automated: true
      });
    }
    
    return actions;
  }
  
  private prioritizeActions(actions: RequiredAction[]): RequiredAction[] {
    // Remove duplicates
    const unique = this.deduplicateActions(actions);
    
    // Sort by priority and deadline
    return unique.sort((a, b) => {
      const priorityOrder = {
        immediate: 0,
        urgent: 1,
        high: 2,
        medium: 3,
        low: 4
      };
      
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      return a.deadline.getTime() - b.deadline.getTime();
    });
  }
  
  private deduplicateActions(actions: RequiredAction[]): RequiredAction[] {
    // If multiple actions have same type + assignee, keep highest priority
    const map = new Map<string, RequiredAction>();
    
    actions.forEach(action => {
      const key = `${action.actionType}-${action.assignee}`;
      const existing = map.get(key);
      
      if (!existing || this.isPriorityHigher(action.priority, existing.priority)) {
        map.set(key, action);
      }
    });
    
    return Array.from(map.values());
  }
  
  private isPriorityHigher(a: string, b: string): boolean {
    const priorityOrder = { immediate: 0, urgent: 1, high: 2, medium: 3, low: 4 };
    return priorityOrder[a] < priorityOrder[b];
  }
}
```

---

## **INTEGRATION LAYER**

### **LangSmith Integration**

```typescript
// src/integrations/langsmith/client.ts

import { Client } from 'langsmith';

export class LangSmithIntegration {
  private client: Client;
  
  constructor(apiKey: string) {
    this.client = new Client({ apiKey });
  }
  
  /**
   * Poll for new traces and convert to our monitoring events
   */
  async pollTraces(aiSystemId: string, since: Date): Promise<MonitoringEvent[]> {
    const runs = await this.client.listRuns({
      projectName: this.getProjectName(aiSystemId),
      startTime: since,
      isRoot: true
    });
    
    return runs.map(run => this.convertRunToEvent(run, aiSystemId));
  }
  
  private convertRunToEvent(run: any, aiSystemId: string): MonitoringEvent {
    // Check for various issues
    const events: MonitoringEvent[] = [];
    
    // Check for PHI in outputs
    if (this.detectPHI(run.outputs)) {
      return {
        aiSystemId,
        eventType: 'phi_leakage',
        severity: 'critical',
        source: 'langsmith',
        rawData: run,
        metrics: {
          phiPatterns: this.extractPHIPatterns(run.outputs)
        },
        timestamp: new Date(run.end_time)
      };
    }
    
    // Check for high latency
    const latency = run.end_time - run.start_time;
    if (latency > 10000) { // >10 seconds
      return {
        aiSystemId,
        eventType: 'latency',
        severity: 'warning',
        source: 'langsmith',
        rawData: run,
        metrics: {
          latencyMs: latency,
          expectedLatencyMs: 2000
        },
        timestamp: new Date(run.end_time)
      };
    }
    
    // Check for errors
    if (run.error) {
      return {
        aiSystemId,
        eventType: 'error',
        severity: 'warning',
        source: 'langsmith',
        rawData: run,
        metrics: {
          errorType: run.error.type,
          errorMessage: run.error.message
        },
        timestamp: new Date(run.end_time)
      };
    }
    
    // Normal execution
    return {
      aiSystemId,
      eventType: 'normal',
      severity: 'info',
      source: 'langsmith',
      rawData: run,
      metrics: {
        latencyMs: latency,
        tokensUsed: run.usage?.total_tokens || 0
      },
      timestamp: new Date(run.end_time)
    };
  }
  
  private detectPHI(output: any): boolean {
    const outputString = JSON.stringify(output);
    
    // PHI patterns (simplified - real version has 50+ patterns)
    const patterns = [
      /\d{3}-\d{2}-\d{4}/, // SSN
      /MRN[-:\s]?\d{6,10}/, // Medical Record Number
      /\b\d{10}\b/, // 10-digit phone
      /\d{5}-\d{4}/, // ZIP+4
      // ... many more patterns
    ];
    
    return patterns.some(pattern => pattern.test(outputString));
  }
  
  private extractPHIPatterns(output: any): string[] {
    // Return which patterns were detected (for compliance reporting)
    const found: string[] = [];
    const outputString = JSON.stringify(output);
    
    if (/\d{3}-\d{2}-\d{4}/.test(outputString)) found.push('SSN');
    if (/MRN/.test(outputString)) found.push('MRN');
    // ... check all patterns
    
    return found;
  }
  
  private getProjectName(aiSystemId: string): string {
    // Map our AI system ID to their project name
    // This comes from the integration_config in database
    return `spectral-${aiSystemId}`;
  }
}
```

---

### **Arize Integration**

```typescript
// src/integrations/arize/client.ts

export class ArizeIntegration {
  private apiKey: string;
  private endpoint: string;
  
  constructor(apiKey: string, endpoint: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }
  
  /**
   * Check for drift, bias, and performance issues
   */
  async checkModelHealth(modelId: string): Promise<MonitoringEvent[]> {
    const events: MonitoringEvent[] = [];
    
    // Get drift analysis
    const drift = await this.getDriftAnalysis(modelId);
    if (drift.driftDetected) {
      events.push({
        aiSystemId: this.mapModelIdToAISystem(modelId),
        eventType: 'drift',
        severity: drift.severity,
        source: 'arize',
        rawData: drift,
        metrics: {
          accuracyDrop: drift.accuracyChange,
          driftScore: drift.driftScore
        },
        timestamp: new Date()
      });
    }
    
    // Get bias metrics
    const bias = await this.getBiasMetrics(modelId);
    if (bias.biasDetected) {
      events.push({
        aiSystemId: this.mapModelIdToAISystem(modelId),
        eventType: 'bias',
        severity: bias.severity,
        source: 'arize',
        rawData: bias,
        metrics: {
          demographicVariance: bias.maxVariance,
          affectedGroups: bias.groups
        },
        timestamp: new Date()
      });
    }
    
    return events;
  }
  
  private async getDriftAnalysis(modelId: string) {
    const response = await fetch(`${this.endpoint}/models/${modelId}/drift`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    return response.json();
  }
  
  private async getBiasMetrics(modelId: string) {
    const response = await fetch(`${this.endpoint}/models/${modelId}/bias`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    return response.json();
  }
  
  private mapModelIdToAISystem(modelId: string): string {
    // Look up our AI system ID from their model ID
    // Stored in integration_config
    return db.aiSystems.findByIntegrationId('arize', modelId).id;
  }
}
```

---

## **MONITORING & ALERTING SYSTEM**

```typescript
// src/services/monitoring-service.ts

import { Inngest } from 'inngest';

/**
 * MONITORING SERVICE
 * 
 * Polls integrations, runs translation engine, triggers alerts
 * Uses Inngest for durable workflows
 */

const inngest = new Inngest({ name: 'Spectral' });

export const monitoringWorkflow = inngest.createFunction(
  { name: 'Monitor AI Systems' },
  { cron: '*/5 * * * *' }, // Every 5 minutes
  async ({ step }) => {
    // Step 1: Get all active AI systems
    const aiSystems = await step.run('fetch-active-systems', async () => {
      return db.aiSystems.findMany({
        where: { status: 'active', monitoringEnabled: true }
      });
    });
    
    // Step 2: Check each system
    for (const aiSystem of aiSystems) {
      await step.run(`check-${aiSystem.id}`, async () => {
        await checkAISystem(aiSystem);
      });
    }
    
    return { checked: aiSystems.length };
  }
);

async function checkAISystem(aiSystem: AISystem) {
  const since = new Date(Date.now() - 5 * 60 * 1000); // last 5 minutes
  
  // Poll the integration
  let events: MonitoringEvent[] = [];
  
  switch (aiSystem.integrationType) {
    case 'langsmith':
      const langsmith = new LangSmithIntegration(
        aiSystem.integrationConfig.apiKey
      );
      events = await langsmith.pollTraces(aiSystem.id, since);
      break;
      
    case 'arize':
      const arize = new ArizeIntegration(
        aiSystem.integrationConfig.apiKey,
        aiSystem.integrationConfig.endpoint
      );
      events = await arize.checkModelHealth(
        aiSystem.integrationConfig.modelId
      );
      break;
      
    // ... other integrations
  }
  
  // Process each event through translation engine
  for (const event of events) {
    await processMonitoringEvent(event);
  }
}

async function processMonitoringEvent(event: MonitoringEvent) {
  // Run through translation engine
  const translationEngine = new TranslationEngine();
  const translated = await translationEngine.translate(event);
  
  // Save to database
  const savedEvent = await db.monitoringEvents.create({
    data: {
      aiSystemId: event.aiSystemId,
      eventType: event.eventType,
      severity: translated.risk.level,
      source: event.source,
      rawData: event.rawData,
      complianceViolations: translated.violations.map(v => v.controlId),
      requiredActions: translated.actions.map(a => a.description),
      status: 'open'
    }
  });
  
  // Send alerts if needed
  if (translated.escalation.shouldAlert) {
    await sendAlerts(savedEvent, translated);
  }
  
  // Execute automated actions
  for (const action of translated.actions) {
    if (action.automated) {
      await executeAutomatedAction(action, savedEvent);
    }
  }
}

async function sendAlerts(
  event: MonitoringEvent,
  translated: TranslatedEvent
) {
  const aiSystem = await db.aiSystems.findById(event.aiSystemId);
  const healthSystem = await db.healthSystems.findById(aiSystem.healthSystemId);
  
  // Determine who to alert
  const recipients = [];
  
  if (translated.risk.level === 'critical') {
    // Alert CISO, compliance officer, clinical owner
    recipients.push(
      healthSystem.cisoEmail,
      healthSystem.complianceEmail,
      aiSystem.clinicalOwnerEmail
    );
  } else if (translated.risk.level === 'high') {
    // Alert compliance officer, IT owner
    recipients.push(
      healthSystem.complianceEmail,
      aiSystem.itOwnerEmail
    );
  } else {
    // Just log to dashboard
    recipients.push(aiSystem.itOwnerEmail);
  }
  
  // Send via multiple channels
  for (const recipient of recipients) {
    // Email
    await sendEmail({
      to: recipient,
      subject: `[Spectral Alert] ${event.eventType} detected in ${aiSystem.name}`,
      body: formatAlertEmail(event, translated)
    });
    
    // Dashboard notification
    await db.alerts.create({
      data: {
        monitoringEventId: event.id,
        userId: await getUserIdByEmail(recipient),
        channel: 'dashboard',
        sentAt: new Date()
      }
    });
    
    // SMS for critical alerts
    if (translated.risk.level === 'critical') {
      await sendSMS({
        to: await getPhoneByEmail(recipient),
        body: `CRITICAL: ${event.eventType} in ${aiSystem.name}. Check Spectral dashboard.`
      });
    }
  }
}

async function executeAutomatedAction(
  action: RequiredAction,
  event: MonitoringEvent
) {
  switch (action.actionType) {
    case 'rollback':
      await rollbackAISystem(event.aiSystemId);
      break;
      
    case 'notify':
      // Already handled in sendAlerts
      break;
      
    case 'restrict':
      await restrictAISystemAccess(event.aiSystemId);
      break;
      
    // document and escalate are manual
  }
}

async function rollbackAISystem(aiSystemId: string) {
  // This would integrate with the AI system's deployment
  // For now, just flag it in our system
  await db.aiSystems.update({
    where: { id: aiSystemId },
    data: {
      status: 'paused',
      statusReason: 'Automated rollback due to compliance violation'
    }
  });
  
  // Could also call vendor API to actually pause the model
  // await vendorAPI.pauseModel(aiSystem.vendorModelId);
}
```

---

## **COMPLIANCE REPORTING ENGINE**

```typescript
// src/services/reporting-service.ts

/**
 * COMPLIANCE REPORTING
 * 
 * Generates audit-ready reports for various frameworks
 */

export class ReportingService {
  async generateBoardReport(
    healthSystemId: string,
    periodStart: Date,
    periodEnd: Date
  ): Promise<string> {
    // Gather data
    const aiSystems = await db.aiSystems.findMany({
      where: { healthSystemId, status: 'active' }
    });
    
    const events = await db.monitoringEvents.findMany({
      where: {
        aiSystemId: { in: aiSystems.map(s => s.id) },
        createdAt: { gte: periodStart, lte: periodEnd }
      }
    });
    
    // Generate PDF using react-pdf
    const doc = (
      <BoardReport
        healthSystemId={healthSystemId}
        period={{ start: periodStart, end: periodEnd }}
        summary={{
          totalSystems: aiSystems.length,
          systemsCompliant: aiSystems.filter(s => s.complianceStatus === 'compliant').length,
          criticalAlerts: events.filter(e => e.severity === 'critical').length,
          breaches: events.filter(e => e.eventType === 'phi_leakage').length
        }}
        aiSystems={aiSystems}
        events={events}
      />
    );
    
    const pdfBytes = await renderToBuffer(doc);
    
    // Upload to S3
    const fileUrl = await uploadToS3({
      bucket: 'spectral-reports',
      key: `board-reports/${healthSystemId}/${Date.now()}.pdf`,
      body: pdfBytes,
      contentType: 'application/pdf'
    });
    
    // Save record
    await db.complianceReports.create({
      data: {
        healthSystemId,
        reportType: 'board',
        frameworks: ['HIPAA', 'NIST_AI_RMF'],
        periodStart,
        periodEnd,
        fileUrl,
        generatedAt: new Date()
      }
    });
    
    return fileUrl;
  }
  
  async generateAuditPackage(
    healthSystemId: string,
    framework: 'HIPAA' | 'NIST_AI_RMF' | 'FDA'
  ): Promise<string> {
    // Gather all evidence for the framework
    const evidence = await this.gatherEvidence(healthSystemId, framework);
    
    // Create ZIP file with all documents
    const zip = new JSZip();
    
    // Add summary document
    zip.file('00-summary.pdf', await this.generateSummaryPDF(evidence));
    
    // Add risk assessments
    zip.file('01-risk-assessments/', null, { dir: true });
    for (const assessment of evidence.riskAssessments) {
      zip.file(`01-risk-assessments/${assessment.filename}`, assessment.content);
    }
    
    // Add activity logs
    zip.file('02-activity-logs/', null, { dir: true });
    for (const log of evidence.activityLogs) {
      zip.file(`02-activity-logs/${log.filename}`, log.content);
    }
    
    // Add compliance evidence
    zip.file('03-compliance-evidence/', null, { dir: true });
    for (const doc of evidence.complianceDocuments) {
      zip.file(`03-compliance-evidence/${doc.filename}`, doc.content);
    }
    
    // Generate ZIP
    const zipBytes = await zip.generateAsync({ type: 'nodebuffer' });
    
    // Upload to S3
    const fileUrl = await uploadToS3({
      bucket: 'spectral-reports',
      key: `audit-packages/${healthSystemId}/${framework}-${Date.now()}.zip`,
      body: zipBytes,
      contentType: 'application/zip'
    });
    
    return fileUrl;
  }
  
  private async gatherEvidence(healthSystemId: string, framework: string) {
    // This queries database for all required evidence
    const aiSystems = await db.aiSystems.findMany({
      where: { healthSystemId }
    });
    
    const riskAssessments = await db.complianceMappings.findMany({
      where: {
        aiSystemId: { in: aiSystems.map(s => s.id) },
        control: { framework }
      },
      include: { evidenceLinks: true }
    });
    
    const activityLogs = await db.auditLogs.findMany({
      where: {
        healthSystemId,
        createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } // last year
      }
    });
    
    return {
      riskAssessments: await this.downloadEvidenceFiles(riskAssessments),
      activityLogs: await this.formatActivityLogs(activityLogs),
      complianceDocuments: await this.getComplianceDocuments(healthSystemId, framework)
    };
  }
}
```

---

## **VENDOR CERTIFICATION WORKFLOW**

```typescript
// src/services/certification-service.ts

/**
 * CERTIFICATION WORKFLOW (Beacon)
 * 
 * Manages vendor certification process using Inngest workflows
 */

export const certificationWorkflow = inngest.createFunction(
  { name: 'Vendor Certification' },
  { event: 'certification/submitted' },
  async ({ event, step }) => {
    const { certificationId } = event.data;
    
    // Step 1: Validate submission
    await step.run('validate-submission', async () => {
      const cert = await db.certifications.findById(certificationId);
      await validateCertificationSubmission(cert);
      
      await db.certifications.update({
        where: { id: certificationId },
        data: { status: 'testing', testingStartedAt: new Date() }
      });
    });
    
    // Step 2: Run automated tests (parallel)
    const testResults = await step.run('run-tests', async () => {
      return await Promise.all([
        testPHIProtection(certificationId),
        testClinicalAccuracy(certificationId),
        testBias(certificationId),
        testSecurity(certificationId),
        testExplainability(certificationId),
        testDriftDetection(certificationId)
      ]);
    });
    
    // Step 3: Expert validation (if Certified or Trusted tier)
    const cert = await db.certifications.findById(certificationId);
    if (cert.tier === 'certified' || cert.tier === 'trusted') {
      await step.run('expert-review', async () => {
        // Create task for expert reviewer
        await db.reviewTasks.create({
          data: {
            certificationId,
            assignedTo: await getNextAvailableReviewer(),
            type: 'certification_review',
            status: 'pending'
          }
        });
        
        // Wait for expert to complete review
        await step.waitForEvent('certification/review-complete', {
          match: 'data.certificationId',
          timeout: '14d' // 2 weeks
        });
      });
    }
    
    // Step 4: Generate results
    await step.run('generate-results', async () => {
      const allPassed = testResults.every(r => r.status === 'passed');
      
      if (allPassed) {
        // Pass
        await db.certifications.update({
          where: { id: certificationId },
          data: {
            status: 'passed',
            completedAt: new Date(),
            expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
            testResults: testResults,
            trustPagePublished: true
          }
        });
        
        // Generate Trust Page
        await generateTrustPage(certificationId);
        
        // Generate badge
        await generateBadge(certificationId);
        
        // Generate compliance report
        await generateComplianceReport(certificationId);
        
        // Notify vendor
        await sendEmail({
          to: cert.vendor.primaryContactEmail,
          subject: 'Spectral Verification Complete - Congratulations!',
          template: 'certification-passed',
          data: { certificationId }
        });
      } else {
        // Fail
        await db.certifications.update({
          where: { id: certificationId },
          data: {
            status: 'failed',
            completedAt: new Date(),
            testResults: testResults
          }
        });
        
        // Generate gap report
        await generateGapReport(certificationId, testResults);
        
        // Notify vendor
        await sendEmail({
          to: cert.vendor.primaryContactEmail,
          subject: 'Spectral Verification Results - Action Required',
          template: 'certification-failed',
          data: { certificationId, gaps: testResults.filter(r => r.status === 'failed') }
        });
      }
    });
  }
);

async function testPHIProtection(certificationId: string) {
  const cert = await db.certifications.findById(certificationId);
  
  // Run 1000 test cases with synthetic PHI
  const testCases = await generatePHITestCases(1000);
  
  let incidents = 0;
  for (const testCase of testCases) {
    const output = await callVendorAPI(cert, testCase.input);
    
    if (detectPHI(output)) {
      incidents++;
    }
  }
  
  return {
    test: 'phi_protection',
    status: incidents === 0 ? 'passed' : 'failed',
    incidents,
    totalCases: testCases.length
  };
}

async function testClinicalAccuracy(certificationId: string) {
  const cert = await db.certifications.findById(certificationId);
  
  // Use curated test dataset
  const testDataset = await loadTestDataset(cert.productCategory);
  
  let correct = 0;
  for (const example of testDataset) {
    const output = await callVendorAPI(cert, example.input);
    
    if (compareOutputs(output, example.expectedOutput)) {
      correct++;
    }
  }
  
  const accuracy = correct / testDataset.length;
  
  return {
    test: 'clinical_accuracy',
    status: accuracy >= 0.90 ? 'passed' : 'failed', // 90% threshold
    accuracy,
    correct,
    total: testDataset.length
  };
}

async function testBias(certificationId: string) {
  const cert = await db.certifications.findById(certificationId);
  
  // Test across demographic groups
  const demographics = ['age', 'gender', 'race', 'ethnicity'];
  const results = {};
  
  for (const demo of demographics) {
    const groups = await getDemographicGroups(demo);
    const accuracies = [];
    
    for (const group of groups) {
      const testData = await loadDemographicTestData(demo, group);
      let correct = 0;
      
      for (const example of testData) {
        const output = await callVendorAPI(cert, example.input);
        if (compareOutputs(output, example.expectedOutput)) correct++;
      }
      
      accuracies.push({ group, accuracy: correct / testData.length });
    }
    
    // Calculate variance
    const maxAccuracy = Math.max(...accuracies.map(a => a.accuracy));
    const minAccuracy = Math.min(...accuracies.map(a => a.accuracy));
    const variance = maxAccuracy - minAccuracy;
    
    results[demo] = {
      variance,
      passed: variance < 0.05 // <5% variance threshold
    };
  }
  
  const allPassed = Object.values(results).every(r => r.passed);
  const maxVariance = Math.max(...Object.values(results).map(r => r.variance));
  
  return {
    test: 'bias',
    status: allPassed ? 'passed' : 'failed',
    maxVariance,
    details: results
  };
}

// ... other test functions (security, explainability, drift)
```

---

## **MVP TO PRODUCTION ROADMAP**

### **Phase 1: MVP (Months 1-3) - $500K budget**

**Goal:** Prove the translation engine works with 3 pilot customers

**Build:**
```
✓ Basic UI (Next.js + shadcn/ui)
✓ PostgreSQL database (core tables)
✓ Translation Engine (MVP version - HIPAA + NIST only)
✓ LangSmith integration (single integration to prove concept)
✓ Manual certification workflow (no automation yet)
✓ Basic alerting (email only)
```

**Team:**
- 2 full-stack engineers
- 1 compliance expert (part-time)
- Founder/CEO (product + sales)

**Outcome:**
- 3 health systems using it
- 10 AI systems monitored
- Prove translation engine adds value

---

### **Phase 2: Product (Months 4-9) - $1.5M budget**

**Goal:** Automate everything, add more integrations, scale to 20 customers

**Build:**
```
✓ Arize + LangFuse integrations
✓ Automated certification workflow (Inngest)
✓ Advanced translation engine (add FDA, state laws)
✓ Vendor portal + Trust Pages
✓ Board reporting + audit packages
✓ Real-time dashboard + advanced charts
✓ WorkOS SSO for enterprise customers
✓ Mobile-responsive UI
```

**Team:**
- 4 full-stack engineers
- 1 compliance expert (full-time)
- 1 designer
- 2 sales reps
- Founder/CEO

**Outcome:**
- 20 health systems
- 100 AI systems monitored
- 30 vendors certified
- $3M ARR

---

### **Phase 3: Scale (Months 10-18) - $2.5M budget**

**Goal:** Become the standard, network effects kick in, prepare for acquisition

**Build:**
```
✓ Epic API integration (direct EHR access)
✓ Advanced ML for PHI detection
✓ Predictive compliance (AI predicts violations before they happen)
✓ Self-service vendor onboarding
✓ White-label option for large health systems
✓ API for partners to build on Spectral
✓ Advanced analytics (Metabase dashboards)
✓ Compliance marketplace (buy/sell compliance templates)
```

**Team:**
- 8 engineers
- 2 compliance experts
- 2 designers
- 5 sales reps
- 2 customer success managers
- Founder/CEO + CTO

**Outcome:**
- 50 health systems
- 300 AI systems monitored
- 200 vendors certified
- $10M ARR
- Acquisition conversations active

---

## **INFRASTRUCTURE COSTS**

### **MVP (3 customers, 10 AI systems)**
```
Vercel Pro:                $20/month
Supabase Pro:              $25/month
Upstash Redis:             $10/month
Clerk:                     $25/month
SendGrid:                  $15/month
AWS S3:                    $10/month
Sentry:                    $26/month
PostHog:                   $0 (free tier)
─────────────────────────────────
Total:                     $131/month = $1,572/year
```

### **Production (50 customers, 300 AI systems)**
```
Vercel Enterprise:         $150/month
Supabase Pro:              $599/month (larger DB)
Upstash Redis Pro:         $80/month
WorkOS:                    $200/month (SSO for enterprise)
Clerk:                     $99/month
SendGrid:                  $90/month
AWS S3 + CloudFront:       $200/month (reports, evidence)
Sentry Business:           $99/month
PostHog Growth:            $450/month
Better Stack:              $50/month
Inngest:                   $150/month
─────────────────────────────────
Total:                     $2,167/month = $26,004/year
```

**Note:** This is INCREDIBLY capital efficient compared to $15M+ to build from scratch.

---

## **SECURITY & HIPAA COMPLIANCE**

### **HIPAA Requirements**

```typescript
// Security measures built into the platform

// 1. Encryption at rest (Supabase)
✓ Database encrypted with AES-256
✓ Backups encrypted
✓ S3 buckets encrypted (SSE-S3)

// 2. Encryption in transit
✓ TLS 1.3 everywhere
✓ HTTPS only (HSTS enabled)
✓ Certificate pinning for APIs

// 3. Access controls
✓ Role-based access (admin/viewer/analyst)
✓ WorkOS SSO for enterprise
✓ MFA required for sensitive actions
✓ Session management (Redis)

// 4. Audit logging
✓ Every action logged (audit_logs table)
✓ IP address tracking
✓ Immutable logs (append-only)
✓ 7-year retention

// 5. Data minimization
✓ Don't store PHI unless absolutely necessary
✓ Anonymize data where possible
✓ Automatic data retention policies

// 6. Business Associate Agreements
✓ Signed BAA with Supabase
✓ Signed BAA with AWS
✓ Vendor contracts include BAA requirements
```

### **Penetration Testing**

Before launch, run:
- Automated: OWASP ZAP, Burp Suite
- Manual: Hire penetration testing firm
- Bug bounty: HackerOne program

---

## **SUMMARY: WHAT TO BUILD VS BUY**

### **BUILD (Custom Code - 20% of effort, 80% of value):**

1. **Translation Engine** 🔒 - THE MOAT
   - Compliance mapping logic
   - Risk scoring algorithms
   - Action generation rules
   - Framework maintenance system

2. **Workflow Orchestration**
   - How health systems interact with platform
   - How vendors get certified
   - Alert routing and escalation

3. **Custom UI/UX**
   - Dashboard designs
   - Inventory management
   - Reporting interfaces
   - Vendor portal

---

### **INTEGRATE (Existing Tools - 80% of effort, 20% of value):**

1. **Infrastructure**
   - Vercel (hosting)
   - Supabase (database)
   - AWS S3 (storage)

2. **Auth & Identity**
   - Clerk (B2C)
   - WorkOS (B2B/SSO)

3. **AI Monitoring**
   - LangSmith
   - Arize
   - LangFuse

4. **Workflow Automation**
   - Inngest (background jobs)

5. **Communication**
   - SendGrid (email)
   - Twilio (SMS)

6. **Analytics & Monitoring**
   - PostHog (product analytics)
   - Sentry (error tracking)
   - Better Stack (uptime)

---

## **CRITICAL SUCCESS FACTORS**

1. **Translation Engine Quality**
   - Must be accurate (false positives kill trust)
   - Must be comprehensive (cover all major frameworks)
   - Must be maintained (regulations change quarterly)

2. **Integration Reliability**
   - Must not miss events (PHI leakage = critical)
   - Must handle scale (300 AI systems = lots of telemetry)
   - Must be fault-tolerant (retries, dead letter queues)

3. **Security & Compliance**
   - Must be HIPAA compliant (BAAs, encryption, audit logs)
   - Must handle PHI properly (minimal storage, anonymization)
   - Must pass security audits (pen tests, SOC 2)

4. **User Experience**
   - Must be simple for busy CISOs (one-glance dashboard)
   - Must surface critical issues immediately (alerts that matter)
   - Must generate reports effortlessly (one-click audit packages)

---

**This is the complete technical blueprint for building Spectral.**

**Next steps:**
1. Set up infrastructure (Vercel + Supabase + basic schema)
2. Build MVP translation engine (HIPAA + NIST only)
3. Build one integration (LangSmith)
4. Build basic UI (dashboard + inventory)
5. Ship to first pilot customer

**Timeline: 12 weeks to MVP with 2 engineers.**

Ready to build? 🚀
