// api/report.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { car_id, car_name, game } = req.body;

    // Базовая валидация
    if (!car_id || !car_name || !game) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    if (car_name.length > 60) {
        return res.status(400).json({ error: 'Name too long' });
    }

    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `New report for **${game}**:\n\`"${car_id}": "${car_name}",\``
            })
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: "Webhook error" });
    }
}
