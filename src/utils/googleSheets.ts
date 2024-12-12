import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';

export type PipelineRow = {
  id: string;
  client: string;
  value: string;
  status: string;
  lastUpdated: string;
};

export const fetchSheetData = async (credentials: any, sheetId: string): Promise<PipelineRow[]> => {
  const doc = new GoogleSpreadsheet(sheetId, credentials);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows() as GoogleSpreadsheetRow[];
  
  return rows.map((row) => ({
    id: row.get('id') || '',
    client: row.get('client') || '',
    value: row.get('value') || '',
    status: row.get('status') || '',
    lastUpdated: row.get('lastUpdated') || new Date().toLocaleDateString(),
  }));
};