import { GoogleSpreadsheet } from 'google-spreadsheet';

export type PipelineRow = {
  id: string;
  client: string;
  value: string;
  status: string;
  lastUpdated: string;
};

export const fetchSheetData = async (credentials: any, sheetId: string): Promise<PipelineRow[]> => {
  const doc = new GoogleSpreadsheet(sheetId);
  
  await doc.useServiceAccountAuth(credentials);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  
  return rows.map((row: any) => ({
    id: row.id || '',
    client: row.client || '',
    value: row.value || '',
    status: row.status || '',
    lastUpdated: row.lastUpdated || new Date().toLocaleDateString(),
  }));
};