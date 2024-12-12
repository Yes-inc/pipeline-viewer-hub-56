import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';

export type PipelineRow = {
  id: string;
  name: string;
  company: string;
  linkedinUrl: string;
  value: string;
  status: string;
  advisor: string;
  profilePicUrl: string;
  lastContactedDate: string;
  initiatedContactDate: string;
};

export const fetchSheetData = async (credentials: any, sheetId: string): Promise<PipelineRow[]> => {
  const doc = new GoogleSpreadsheet(sheetId, credentials);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows() as GoogleSpreadsheetRow[];
  
  return rows.map((row) => ({
    id: row.get('id') || '',
    name: row.get('name') || '',
    company: row.get('company') || '',
    linkedinUrl: row.get('linkedinUrl') || '',
    value: row.get('value') || '',
    status: row.get('status') || '',
    advisor: row.get('advisor') || '',
    profilePicUrl: row.get('profilePicUrl') || '',
    lastContactedDate: row.get('lastContactedDate') || new Date().toLocaleDateString(),
    initiatedContactDate: row.get('initiatedContactDate') || new Date().toLocaleDateString(),
  }));
};
