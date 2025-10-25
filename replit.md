# Spectral Healthcare AI Governance Platform

## Overview
Spectral is a B2B SaaS platform designed to help healthcare organizations govern, monitor, and ensure compliance of AI systems. It serves both healthcare systems (hospitals, health systems) for AI oversight and compliance, and AI vendors seeking third-party verification to accelerate sales. The platform addresses the challenge of rapid AI deployment outpacing governance in healthcare, mitigating compliance risks and operational blind spots, and streamlining the procurement process for AI vendors. The project's ambition is to become the leading platform for AI governance in healthcare, offering a robust solution for compliance, risk management, and vendor validation.

## Development Status
**Phase 4 (Enterprise Platform Features) - COMPLETE** ✅
All enterprise-grade management features have been implemented and architect-approved, bringing the platform to production-ready status for healthcare AI governance.

**Pre-Pilot Infrastructure Enhancements - COMPLETE** ✅
Redis caching, S3 storage, and enhanced email templates added to optimize performance and scalability for pilot customers.

**Production Readiness - COMPLETE** ✅
All 6 production blockers resolved:
- ✅ PostgreSQL session store (connect-pg-simple) implemented for production-grade session persistence
- ✅ Compliance report S3 persistence with encryption and automated archival
- ✅ Background job orchestration system for async certification workflows and scheduled compliance checks
- ✅ CSRF protection middleware integrated across all state-mutating endpoints
- ✅ Database indexes deployed via runtime initialization (ai_systems.health_system_id, monitoring_alerts, compliance_mappings.control_id, audit_logs.created_at, ai_telemetry_events)
- ✅ Structured logging with Pino (JSON output in production, pretty-print in dev) - migrated 70+ console statements across all critical runtime paths (background-jobs, cache, middleware, routes, services, translation-engine). Request correlation via pino-http middleware with proper error serialization.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
The frontend is built with **React 18+ and TypeScript**, utilizing **Vite** for tooling and **Wouter** for routing. **Shadcn/ui** (based on Radix UI) provides the UI component system with a custom design system and **Tailwind CSS** for styling. **TanStack Query** manages server state, while React hooks handle local component state. The design prioritizes executive-grade professionalism and clear information delivery.

### Backend
The backend is an **Express.js** application with **TypeScript**, featuring a **RESTful API**. It uses session-based authentication with `express-session` and a PostgreSQL store, implementing a zero-trust multi-tenant architecture with role-based access control. Tenant IDs are strictly derived from authenticated sessions to prevent cross-tenant data access.

### Data Storage
The platform uses a **PostgreSQL** database managed by **Drizzle ORM** for type-safe interactions, with **Zod** for runtime validation. Key entities include `users`, `user_invitations`, `audit_logs`, `health_systems`, `vendors`, `ai_systems`, `deployments`, `monitoring_alerts`, `compliance_certifications`, `compliance_controls`, `compliance_mappings`, `compliance_reports`, `ai_telemetry_events`, and `compliance_templates`. **Neon serverless PostgreSQL driver** is used for database connections. Security features include hashed invitation tokens (bcrypt), JSONB audit logs for compliance queries, and unique email constraints for identity management.

### Application Structure
The project is structured as a monorepo with `/client` (React), `/server` (Express), `/shared` (shared types/schemas), and `/migrations`. It offers a marketing homepage and a dashboard with distinct views for health systems and AI vendors.

### Core Features
- **Executive Reporting (Constellation)**: Board-ready summaries of AI portfolios, risk distribution, and compliance.
- **Alert Management (Sentinel)**: Monitoring dashboard with severity filtering and resolution functionality.
- **Compliance Dashboard (Watchtower)**: Framework coverage (HIPAA, NIST AI RMF, FDA SaMD) and portfolio compliance metrics.
- **Vendor Certification Workflow (Beacon)**: End-to-end certification application system with automated testing, manual review, and approval.
- **Vendor Trust Page**: Public-facing page showcasing vendor certifications and compliance, accessible via a shareable URL.
- **Authentication System**: Zero-trust multi-tenant session-based authentication with user-organization association.
- **Background Job System**: Custom async job processor for certification workflows, scheduled compliance checks, and report generation.
- **Translation Engine (CORE IP)**: Maps AI telemetry into healthcare compliance violations and generates automated remediation actions with regulatory deadline calculations. Integrates with LangSmith webhooks.
- **AI Monitoring Integration**: LangSmith webhook receiver for real-time telemetry capture, alert creation, and Translation Engine processing.
- **Automated Risk Scoring**: Algorithm calculates risk scores from telemetry, updating AI system risk levels.
- **Email Notifications**: SendGrid integration for critical compliance alert emails to health system administrators.
- **PDF Report Generator**: PDFKit-based generator for professional, board-ready compliance reports.
- **Predictive Compliance Alerts (Phase 3)**: ML-powered forecasting of compliance violations using trend analysis on telemetry data.
- **Partner API (Phase 3)**: RESTful API for AI vendors to programmatically interact with certification workflows using API key-based authentication.
- **📊 Advanced Analytics (Phase 3)**: Executive-grade insights dashboard providing portfolio health scoring (A-F grading), department performance comparisons, alert trend analysis, compliance/risk trends with 6-month historical visualizations using recharts, and CSV export capabilities for board presentations. Accessible at /analytics route with protected health system access.
- **📚 Compliance Template Library (Phase 3)**: Comprehensive library of pre-built compliance templates for healthcare AI governance, including 7 seeded templates covering HIPAA Security Rule, HIPAA Privacy Rule, NIST AI RMF (Governance/MAP and MEASURE functions), FDA SaMD Clinical Validation, ISO 27001 ISMS, and AI Model Card documentation. Features include full-text search, multi-dimensional filtering (framework, category, tags), interactive tag-based discovery with clickable chips, template preview modal, and markdown download capability. Accessible at /templates route with protected authentication.
- **👥 User Management Dashboard (Phase 4)**: Enterprise user management system with role-based access control (admin, user, viewer), secure invitation workflow with hashed tokens and bcrypt validation, user roster display with permission management, pending invitations tracking, and comprehensive audit logging for compliance. Accessible at /users route with admin-only access. First user for each organization automatically receives admin privileges. Complete invitation acceptance flow with automatic session creation.
- **📋 Audit Logging System (Phase 4)**: Comprehensive audit log viewer with admin-only access, filtering by action type and resource type, JSONB metadata/changes fields for compliance investigations, and integration across all critical application actions. Accessible at /audit-logs route. Provides compliance-grade activity tracking for healthcare AI governance.
- **⚙️ Organization Settings (Phase 4)**: Organization profile management page allowing admins to update organization name, description, website (vendors), and logo (vendors). Features proper validation to prevent accidental clearing of required fields, audit logging for all changes, and tenant-scoped updates. Accessible at /settings route with admin-only update permissions.
- **🏥 System Health Monitoring (Phase 4)**: Real-time platform health dashboard displaying user counts, AI systems (health systems), unresolved alerts, recent audit activity, and pending background jobs. Includes calculated health score (0-100%), auto-refresh every 30 seconds, error handling with retry functionality, and admin-only access. Accessible at /system-health route.

## External Dependencies

### UI and Component Libraries
- Radix UI
- Shadcn/ui
- Lucide React
- Tailwind CSS
- class-variance-authority
- cmdk
- embla-carousel-react
- react-day-picker
- vaul
- input-otp
- recharts

### Data Management and Forms
- TanStack Query (React Query)
- React Hook Form
- @hookform/resolvers
- Zod
- Drizzle-Zod

### Database and Backend
- Neon Serverless (PostgreSQL client)
- Drizzle ORM
- connect-pg-simple
- Express

### Development Tools
- Vite
- TypeScript
- ESBuild
- tsx

### Date and Utility Libraries
- date-fns
- clsx
- tailwind-merge
- nanoid

### Fonts
- Google Fonts (Inter, DM Sans, Geist Mono, Architects Daughter, Fira Code)

### Integrations
- SendGrid (Email notifications with professional HTML templates)
- LangSmith (AI Monitoring via webhooks)
- Upstash Redis (Performance caching for compliance data)
- AWS S3 (Compliance report storage with encryption)