export const example = {
  analysis_id: "1",
  patent_id: "US-RE49889-E1",
  company_name: "Walmart Inc.",
  analysis_date: "2024-10-31",
  top_infringing_products: [
    {
      product_name: "Walmart Shopping App",
      infringement_likelihood: "High",
      relevant_claims: ["1", "2", "3", "20", "21"],
      explanation:
        "The Walmart Shopping App implements several key elements of the patent claims including the direct advertisement-to-list functionality, mobile application integration, and shopping list synchronization. The app's implementation of digital advertisement display and product data handling closely matches the patent's specifications.",
      specific_features: [
        "Direct advertisement-to-list functionality",
        "Mobile app integration",
        "Shopping list synchronization",
        "Digital weekly ads integration",
        "Product data payload handling",
      ],
    },
    {
      product_name: "Walmart+",
      infringement_likelihood: "Moderate",
      relevant_claims: ["1", "40", "41", "42"],
      explanation:
        "The Walmart+ membership program includes shopping list features that partially implement the patent's claims, particularly regarding list synchronization and deep linking capabilities. While not as complete an implementation as the main Shopping App, it still incorporates key patented elements in its list management functionality.",
      specific_features: [
        "Shopping list synchronization across devices",
        "Deep linking to product lists",
        "Advertisement integration in member benefits",
        "Cloud-based list storage",
      ],
    },
  ],
  overall_risk_assessment:
    "High risk of infringement due to implementation of core patent claims in multiple products, particularly the Shopping App which implements most key elements of the patent claims. Walmart+ presents additional moderate risk through its partial implementation of the patented technology.",
};
