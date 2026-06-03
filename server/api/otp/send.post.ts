import twilio from 'twilio';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { phone, countryCode } = body;

    if (!phone || !countryCode) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Teléfono y código de país son requeridos',
      });
    }

    const fullPhone = `${countryCode}${phone}`;

    const config = useRuntimeConfig();
    const accountSid = config.twilioAccountSid;
    const authToken = config.twilioAuthToken;
    const verifySid = config.twilioVerifySid;

    if (!accountSid || !authToken || !verifySid) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuración de Twilio incompleta',
      });
    }

    const client = twilio(accountSid, authToken);

    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: fullPhone, channel: 'sms' });

    return { success: true, message: 'Código enviado', sid: verification.sid };
  } catch (error: any) {
    console.error('Error enviando OTP:', error);
    throw createError({
      statusCode: 400,
      statusMessage: error?.message || 'Error al enviar código',
    });
  }
});
