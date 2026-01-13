# Prescription Reminder Automation (Zapier)

## Overview
This Zapier automation allows you to take a photo of a prescription and automatically:
- Extract medicine, dosage, and schedule using OCR + Claude AI
- Generate events in Google Calendar for each medicine dose
- Add follow-up events for doctor visits

## Steps
1. **Trigger:** New file in Google Drive folder
2. **OCR:** Use Productify to extract text from prescription
3. **Claude AI:** Extract JSON of medications and schedule
4. **Code by Zapier:** Convert JSON to event objects
5. **Looping:** Iterate over each medication dose
6. **Google Calendar:** Create event series per dose

## Notes
- Timezone is set to Europe/Berlin
- Recurrence is based on `duration_days` from Claude


## Template 
https://zapier.com/shared/625990f7f0a3fbe5b57f08649d4807528c3585d2