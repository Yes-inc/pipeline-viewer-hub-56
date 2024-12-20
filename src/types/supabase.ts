export type TableNames = 
  | "organizations"
  | "Mitigram_Active_Leads"
  | "Mitigram_Advisors"
  | "Mitigram_Comments"
  | "Mitigram_Established_Connections"
  | "Mitigram_Leads"
  | "Mitigram_Uncertain_Leads"
  | "toexceed_comments"
  | "ToExceed_Active_Leads"
  | "ToExceed_Advisors"
  | "ToExceed_Established_Connections"
  | "ToExceed_Leads"
  | "ToExceed_Uncertian_Leads";

export const getCommentsTable = (companyPrefix: "Mitigram" | "ToExceed") => {
  return companyPrefix === "Mitigram" ? "Mitigram_Comments" : "toexceed_comments";
};