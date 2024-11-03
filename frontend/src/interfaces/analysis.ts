/**
 * Interface for the analysis result
 */
export interface Analysis {
  /**
   * Date of the analysis
   */
  analysis_date: string;

  /**
   * Unique identifier for the analysis
   */
  analysis_id: string;

  /**
   * Name of the company being analyzed
   */
  company_name: string;

  /**
   * Overall risk assessment of the company
   */
  overall_risk_assessment: string;

  /**
   * Unique identifier for the patent being analyzed
   */
  patent_id: string;

  /**
   * Name of the patent being analyzed
   */
  top_infringing_products: {
    /**
     * Explanation of the infringement
     */
    explanation: string;

    /**
     * Likelihood of infringement
     */
    infringement_likelihood: string;

    /**
     * Name of the product that infringes
     */
    product_name: string;

    /**
     * Severity of the infringement
     */
    relevant_claims: string[];

    /**
     * Severity of the infringement
     */
    specific_features: string[];
  }[];
}
