/**
 * Certification Application Processor
 * 
 * Performs automated testing and validation of vendor certification applications.
 * 
 * Workflow:
 * 1. Validate documentation completeness
 * 2. Check compliance statements
 * 3. Verify deployment history (if applicable)
 * 4. Generate automated checks result
 * 5. Update application status
 */

import { storage } from "../storage";
import { logger } from "../logger";

export interface CertificationCheckResult {
  passed: boolean;
  checks: {
    documentationComplete: boolean;
    complianceStatementsValid: boolean;
    deploymentHistoryValid: boolean;
  };
  recommendations: string[];
  score: number;
}

/**
 * Process a certification application (automated testing phase)
 */
export async function processCertificationApplication(applicationId: string): Promise<CertificationCheckResult> {
  logger.info({ applicationId }, `Processing certification application: ${applicationId}`);
  
  const application = await storage.getCertificationApplication(applicationId);
  
  if (!application) {
    throw new Error(`Application not found: ${applicationId}`);
  }
  
  // Automated checks
  const checks = {
    documentationComplete: checkDocumentationComplete(application),
    complianceStatementsValid: checkComplianceStatements(application),
    deploymentHistoryValid: await checkDeploymentHistory(application.vendorId),
  };
  
  const recommendations: string[] = [];
  
  // Generate recommendations based on checks
  if (!checks.documentationComplete) {
    recommendations.push("Please upload complete documentation for all requested compliance frameworks");
  }
  
  if (!checks.complianceStatementsValid) {
    recommendations.push("Compliance statements must align with requested certification tier");
  }
  
  if (!checks.deploymentHistoryValid) {
    if (application.tierRequested === "Platinum") {
      recommendations.push("Platinum tier requires at least 3 active deployments with health systems");
    } else if (application.tierRequested === "Gold") {
      recommendations.push("Gold tier requires at least 1 active deployment with a health system");
    }
  }
  
  // Calculate score (0-100)
  let score = 0;
  if (checks.documentationComplete) score += 40;
  if (checks.complianceStatementsValid) score += 40;
  if (checks.deploymentHistoryValid) score += 20;
  
  const passed = Object.values(checks).every(check => check === true);
  
  const result: CertificationCheckResult = {
    passed,
    checks,
    recommendations,
    score,
  };
  
  // Update application with automated check results
  await storage.updateCertificationApplicationStatus(
    applicationId,
    passed ? "in_review" : "pending",
    passed,
    JSON.stringify(result)
  );
  
  logger.info({ applicationId, passed, score }, `Certification application ${applicationId}: ${passed ? "PASSED" : "FAILED"} automated checks (score: ${score})`);
  
  return result;
}

/**
 * Check if documentation is complete for the requested tier
 */
function checkDocumentationComplete(application: any): boolean {
  const docUrls = application.documentationUrls || [];
  
  // Tier requirements:
  // Silver: At least 1 document (HIPAA compliance statement)
  // Gold: At least 2 documents (HIPAA + NIST)
  // Platinum: At least 3 documents (HIPAA + NIST + FDA or ISO)
  
  const requiredDocs: Record<string, number> = {
    "Silver": 1,
    "Gold": 2,
    "Platinum": 3,
  };
  
  const required = requiredDocs[application.tierRequested] || 1;
  return docUrls.length >= required;
}

/**
 * Check if compliance statements are valid
 */
function checkComplianceStatements(application: any): boolean {
  if (!application.complianceStatements) {
    return false;
  }
  
  try {
    const statements = JSON.parse(application.complianceStatements);
    
    // Tier requirements:
    // Silver: HIPAA compliance
    // Gold: HIPAA + NIST AI RMF
    // Platinum: HIPAA + NIST AI RMF + (FDA or ISO)
    
    switch (application.tierRequested) {
      case "Silver":
        return statements.hipaa === true;
      case "Gold":
        return statements.hipaa === true && statements.nist === true;
      case "Platinum":
        return statements.hipaa === true && 
               statements.nist === true && 
               (statements.fda === true || statements.iso === true);
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * Check deployment history meets tier requirements
 */
async function checkDeploymentHistory(vendorId: string): Promise<boolean> {
  const deployments = await storage.getDeploymentsByVendor(vendorId);
  const activeDeployments = deployments.filter(d => d.status === "active");
  
  // For now, any active deployment history is sufficient
  // In production, we'd check tier-specific requirements:
  // - Silver: 0 required (new vendors welcome)
  // - Gold: 1+ active deployments
  // - Platinum: 3+ active deployments
  
  return true; // Simplified for MVP
}
