export type TableNames = 
  | "organizations"
  | "Mitigram_Active_Leads"
  | "Mitigram_Advisors"
  | "Mitigram_Comments"
  | "Mitigram_Established_Connections"
  | "Mitigram_Leads"
  | "Mitigram_Uncertain_Leads"
  | "ToExceed_Comments"
  | "ToExceed_Active_Leads"
  | "ToExceed_Advisors"
  | "ToExceed_Established_Connections"
  | "ToExceed_Leads"
  | "ToExceed_Uncertian_Leads"
  | "Gimi_Active_Leads"
  | "Gimi_Advisors"
  | "Gimi_Established_Connections"
  | "Gimi_Leads"
  | "Gimi_Uncertain_Leads";

export type AdvisorTableNames = "Mitigram_Advisors" | "ToExceed_Advisors" | "Gimi_Advisors";

export type CompanyPrefix = "Mitigram" | "ToExceed" | "Gimi";

export const getCommentsTable = (companyPrefix: CompanyPrefix) => {
  return `${companyPrefix}_Comments` as const;
};