// Input: Claude JSON output as text 
let raw = inputData.medications || "";

// Remove markdown if present
raw = raw.replace(/```json|```/g, "").trim();

let parsed;
try {
  parsed = JSON.parse(raw);
} catch (e) {
  return { error: "Invalid JSON from Claude", events: [] };
}

// Extract medications array
const meds = parsed.medications || [];

if (!Array.isArray(meds) || meds.length === 0) {
  return { events: [] };
}

// Output events array
const events = [];

// Base date for prescription (use current date or pass as input)
const baseDate = new Date();

// Helper function to create an event for a single dose in Germany timezone
function createEvent(med, hour, timeLabel) {
  // Create a date in Germany timezone
  const start = new Date(baseDate);
  start.setHours(hour, 0, 0, 0);

  // Use toLocaleString in Berlin timezone and convert back to ISO
  const startStr = new Date(start.toLocaleString("en-US", { timeZone: "Europe/Berlin" })).toISOString();

  const end = new Date(new Date(startStr).getTime() + 15 * 60000); // 15 min duration
  const endStr = end.toISOString();

  return {
    summary: `💊 ${med.name} - ${timeLabel} (${med.before_food ? "before food" : "after food"})`,
    description: `Take ${med.name} ${med.dosage} ${timeLabel.toLowerCase()}. ${med.before_food ? "Before food." : "After food."}`,
    start_datetime: startStr,
    end_datetime: endStr,
    duration_days: med.duration_days || 30
  };
}

// Map common times
const doseTimes = {
  morning: 8,
  lunch: 13,
  night: 20
};

// Loop through each medication
meds.forEach(med => {
  if (med.morning) {
    events.push(createEvent(med, doseTimes.morning, "Morning"));
  }
  if (med.lunch) {
    events.push(createEvent(med, doseTimes.lunch, "Lunch"));
  }
  if (med.night) {
    events.push(createEvent(med, doseTimes.night, "Night"));
  }
});

return { events };
