/** Escape HTML special chars to prevent XSS in email templates */
function htmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const TYPE_LABELS: Record<string, string> = {
  call: 'Appel',
  email: 'Email',
  sms: 'SMS',
  other: 'Autre',
}

/** Email reminder for an upcoming followup */
export function getFollowupReminderEmail(data: {
  adminName: string
  followupType: string
  scheduledAt: string
  note: string | null
  leadService: string
  leadCity: string
  leadClient: string
  leadPhone: string
  dashboardUrl: string
}) {
  const {
    adminName, followupType, scheduledAt, note,
    leadService, leadCity, leadClient, leadPhone, dashboardUrl,
  } = data

  const typeLabel = TYPE_LABELS[followupType] || followupType
  const dateStr = new Date(scheduledAt).toLocaleString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })

  return {
    subject: `Rappel : ${typeLabel} prévu — ${leadService} à ${leadCity || 'ville inconnue'}`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h1 style="color: #2563eb; font-size: 20px; margin: 0;">Assurance Pro</h1>
  </div>

  <h2 style="font-size: 20px; margin-bottom: 16px;">Relance programmee</h2>

  <p style="color: #555; line-height: 1.6;">
    Bonjour ${htmlEscape(adminName)},<br><br>
    Vous avez une relance prevue :
  </p>

  <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 6px 0; color: #888; width: 120px;">Type :</td><td style="font-weight: 600;">${htmlEscape(typeLabel)}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">Horaire :</td><td style="font-weight: 600;">${htmlEscape(dateStr)}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">Service :</td><td>${htmlEscape(leadService)}</td></tr>
      ${leadCity ? `<tr><td style="padding: 6px 0; color: #888;">Ville :</td><td>${htmlEscape(leadCity)}</td></tr>` : ''}
      <tr><td style="padding: 6px 0; color: #888;">Client :</td><td>${htmlEscape(leadClient)}</td></tr>
      ${leadPhone ? `<tr><td style="padding: 6px 0; color: #888;">Tel :</td><td><a href="tel:${htmlEscape(leadPhone.replace(/[\s.\-()]/g, ''))}" style="color: #2563eb;">${htmlEscape(leadPhone)}</a></td></tr>` : ''}
      ${note ? `<tr><td style="padding: 6px 0; color: #888; vertical-align: top;">Note :</td><td>${htmlEscape(note)}</td></tr>` : ''}
    </table>
  </div>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${htmlEscape(dashboardUrl)}"
       style="background: #2563eb; color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block;">
      Voir le lead
    </a>
  </div>

  <p style="color: #999; font-size: 12px; text-align: center; margin-top: 40px;">
    Rappel automatique — Assurance Pro CRM
  </p>
</body>
</html>`,
  }
}
