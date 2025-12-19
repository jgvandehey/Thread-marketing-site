# Setting Up Notion Integration for Email Submissions

## Option 1: Using Formspree (Recommended - Easiest)

1. Go to https://formspree.io/
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)
5. Replace `YOUR_FORM_ID` in `index.html` with your actual form ID
6. Done! Submissions will be sent to your email and stored in Formspree dashboard

**Benefits:**
- No backend code needed
- Free tier: 50 submissions/month
- Email notifications
- Spam protection built-in
- Can export data as CSV

## Option 2: Using Notion API (More Control)

### Step 1: Create Notion Database

1. Create a new database in Notion
2. Add these properties:
   - **Email** (Title or Text)
   - **Date** (Created time)
   - **Source** (Text) - e.g., "Hero Form"

### Step 2: Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it "Thread Email Collector"
4. Copy the "Internal Integration Token"
5. Share your database with this integration (click "..." on database → "Connections" → Add your integration)

### Step 3: Set Up Serverless Function

You'll need a serverless function to handle the API call (Notion API requires server-side calls for security).

#### Using Vercel (Recommended):

1. Create `api/submit-email.js`:
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  try {
    const response = await fetch(`https://api.notion.com/v1/pages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          'Email': {
            title: [
              {
                text: {
                  content: email,
                },
              },
            ],
          },
          'Source': {
            rich_text: [
              {
                text: {
                  content: 'Hero Form',
                },
              },
            ],
          },
        },
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error('Notion API error');
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to submit' });
  }
}
```

2. Add environment variables in Vercel:
   - `NOTION_TOKEN` = Your integration token
   - `NOTION_DATABASE_ID` = Your database ID (from database URL)

3. Update `index.html` form:
```html
<form class="email-form" id="hero-email-form" action="/api/submit-email" method="POST">
```

#### Using Netlify Functions:

1. Create `netlify/functions/submit-email.js` (similar code as above)
2. Add environment variables in Netlify dashboard
3. Update form action to `/api/submit-email`

## Option 3: Using Make.com (Zapier Alternative)

1. Sign up at https://www.make.com/
2. Create a scenario:
   - Trigger: Webhook
   - Action: Create Notion Database Item
3. Copy webhook URL
4. Update form action to webhook URL

## Quick Start Recommendation

**For fastest setup:** Use Formspree (Option 1)
- Takes 2 minutes
- No code changes needed (just replace form ID)
- Works immediately

**For Notion integration:** Use Make.com webhook (Option 3)
- No serverless function needed
- Visual workflow builder
- Connects directly to Notion

