import twilio from 'twilio';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { phone, countryCode, code } = body;

    if (!phone || !countryCode || !code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Teléfono, código de país y OTP son requeridos',
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

    const check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: fullPhone, code });

    if (check.status === 'approved') {
      return { success: true };
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Código incorrecto o expirado',
      });
    }
  } catch (error: any) {
    console.error('Error verificando OTP:', error);
    throw createError({
      statusCode: 400,
      statusMessage: error?.message || 'Error al verificar código',
    });
  }
});
