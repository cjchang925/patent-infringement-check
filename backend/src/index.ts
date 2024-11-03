import express, { Request, Response } from "express";
import cors from "cors";
import { patents } from "./patents";
import { companyProducts } from "./company_products";
import { example } from "./example";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * Users might have typo in the patentId, so we need to find the most probable patent.
 * @param patentId Original patentId.
 * @returns The most probable patentId.
 */
const getMostProbablePatentId = (patentId: string): string => {
  // Get the patentIds from the patents array.
  const patentIds = patents.map((patent) => patent.publication_number);

  // Remove hyphens and convert to lowercase.
  const patentIdWithoutHyphen = patentId.replace(/-/g, "").toLowerCase();

  // Compute the overlap between the patentId and the patentIds.
  const overlap = patentIds.map((id) => {
    const idWithoutHyphen = id.replace(/-/g, "").toLowerCase();
    const common = new Set(
      [...patentIdWithoutHyphen].filter((x) => idWithoutHyphen.includes(x))
    );
    return { id, common: common.size };
  });

  // Sort the overlap in descending order.
  overlap.sort((a, b) => b.common - a.common);

  // Return the most probable patentId.
  return overlap[0].id;
};

/**
 * Users might have typo in the companyName, so we need to find the most probable company name.
 * @param companyName Original company name.
 * @returns The most probable company name.
 */
const getMostProbableCompanyName = (companyName: string): string => {
  // Get the company names from the companyProducts array.
  const companyNames = companyProducts.map(
    (companyProduct) => companyProduct.name
  );

  // Convert to lowercase.
  const companyNameLowercase = companyName.toLowerCase();

  // Compute the overlap between the companyName and the companyNames.
  const overlap = companyNames.map((name) => {
    const nameLowercase = name.toLowerCase();
    const common = new Set(
      [...companyNameLowercase].filter((x) => nameLowercase.includes(x))
    );
    return { name, common: common.size };
  });

  // Sort the overlap in descending order.
  overlap.sort((a, b) => b.common - a.common);

  // Return the most probable company name.
  return overlap[0].name;
};

app.get("/search", async (req: Request, res: Response) => {
  /**
   * The index of patent which might be infringed.
   */
  const patentId: string = decodeURIComponent(req.query.patentId as string);

  /**
   * The name of the company which might be infringing the patent.
   */
  const companyName: string = decodeURIComponent(
    req.query.companyName as string
  );

  const mostProbablePatentId = getMostProbablePatentId(patentId);

  /**
   * The patent object which might be infringed.
   */
  const patent = patents.find(
    (patent) => patent.publication_number === mostProbablePatentId
  );

  const mostProbableCompanyName = getMostProbableCompanyName(companyName);

  /**
   * The company object which might be infringing the patent.
   */
  const companyProduct = companyProducts.find(
    (companyProduct) => companyProduct.name === mostProbableCompanyName
  );

  /**
   * The prompt to generate the response.
   */
  const prompt = `
    Given the following Company and Patent JSON objects, please return top two patent-infringing products in the company.\n\n
    Company JSON:\n${JSON.stringify(companyProduct)}\n\n
    Patent JSON:\n${JSON.stringify(patent)}\n\n
    Please respond in JSON format as the following example:\n${JSON.stringify(
      example
    )}
  `;

  const apiKey = process.env.API_KEY || "";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  const json = response.slice(
    response.indexOf("{"),
    response.lastIndexOf("}") + 1
  );

  res.send(json);
});
