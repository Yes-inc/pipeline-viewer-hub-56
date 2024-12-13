import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { GoogleSpreadsheet } from 'npm:google-spreadsheet'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const credentials = {
      client_email: Deno.env.get('GOOGLE_CLIENT_EMAIL'),
      private_key: Deno.env.get('GOOGLE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
    }
    const sheetId = Deno.env.get('GOOGLE_SHEET_ID')

    if (!credentials.client_email || !credentials.private_key || !sheetId) {
      throw new Error('Missing Google Sheets configuration')
    }

    const doc = new GoogleSpreadsheet(sheetId, credentials)
    await doc.loadInfo()
    
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()
    
    const data = rows.map((row) => ({
      id: row.get('id') || String(Math.random()),
      name: row.get('name') || '',
      company: row.get('company') || '',
      linkedinUrl: row.get('linkedinUrl') || '',
      value: row.get('value') || '',
      status: row.get('status') || '',
      advisor: row.get('advisor') || '',
      profilePicUrl: row.get('profilePicUrl') || '',
      lastContactedDate: row.get('lastContactedDate') || new Date().toLocaleDateString(),
      initiatedContactDate: row.get('initiatedContactDate') || new Date().toLocaleDateString(),
      jobTitle: row.get('jobTitle') || '',
    }))

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})