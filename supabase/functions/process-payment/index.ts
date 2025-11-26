import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      amount,
      paymentMethod,
      customer,
      address,
      card,
      items,
      installments,
    } = await req.json();

    const publicKey = Deno.env.get('MEDUSA_PUBLIC_KEY') || 'pk_nKWIwSX_T2EpZUnBoq_huCxktI6A5zx4VDHE4jdtQZrlCBD3';
    const secretKey = Deno.env.get('MEDUSA_SECRET_KEY');

    if (!secretKey) {
      throw new Error('MEDUSA_SECRET_KEY não configurada');
    }

    const auth = 'Basic ' + btoa(publicKey + ':' + secretKey);

    const payload: any = {
      amount,
      paymentMethod,
      customer: {
        name: customer.name,
        email: customer.email,
        document: {
          type: customer.document.length === 14 ? 'cpf' : 'cnpj',
          number: customer.document.replace(/\D/g, ''), // Remove formatação
        },
        phoneNumber: customer.phoneNumber.replace(/\D/g, ''),
      },
      address: {
        zipCode: address.zipCode.replace(/\D/g, ''),
        street: address.street,
        number: address.number,
        city: address.city,
        state: address.state,
        country: address.country,
      },
      items: (items || []).map((item: any) => ({
        title: item.description || item.title,
        unitPrice: item.amount || item.unitPrice,
        quantity: item.quantity || 1,
        tangible: true, // Produtos físicos
      })),
    };

    // Se for cartão de crédito, enviar dados do cartão
    if (paymentMethod === 'credit_card' && card) {
      const cardNumber = card.number.replace(/\D/g, ''); // Remove tudo que não é número
      const cardExpMonth = String(card.expMonth).padStart(2, '0'); // Garante 2 dígitos
      const cardExpYear = String(card.expYear);
      
      // Validação básica
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        throw new Error('Número do cartão inválido');
      }
      if (parseInt(cardExpMonth) < 1 || parseInt(cardExpMonth) > 12) {
        throw new Error('Mês de expiração inválido');
      }
      if (cardExpYear.length !== 4) {
        throw new Error('Ano de expiração deve ter 4 dígitos');
      }
      
      payload.card = {
        number: cardNumber,
        holderName: card.holderName.toUpperCase().trim(),
        expirationMonth: parseInt(cardExpMonth),
        expirationYear: parseInt(cardExpYear),
        cvv: card.cvv.replace(/\D/g, ''),
      };
      
      console.log('Dados do cartão formatados:', {
        numberLength: cardNumber.length,
        holderName: payload.card.holderName,
        expMonth: payload.card.expirationMonth,
        expYear: payload.card.expirationYear,
        cvvLength: payload.card.cvv.length,
      });
      
      // Adicionar parcelamento se especificado
      if (installments) {
        payload.installments = installments;
      }
    }

    console.log('Processando pagamento:', { paymentMethod, amount });

    const response = await fetch('https://api.ecossistemamedusa.com.br/v1/transactions', {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log('Resposta do Medusa Bank:', data);

    if (!response.ok) {
      console.error('Erro da API Medusa:', data);
      return new Response(
        JSON.stringify({
          success: false,
          error: data.message || 'Erro ao processar pagamento na API do Medusa Bank',
          details: data,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status,
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: data.id,
        status: data.status,
        pixQrCode: data.pix?.qrcode || data.pixQrCode,
        pixQrCodeUrl: data.pix?.qrcodeUrl || data.pixQrCodeUrl,
        message: 'Pagamento processado com sucesso',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Erro no processamento do pagamento:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'Erro interno no servidor',
        stack: error?.stack,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
