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
          type: customer.document.length === 14 ? 'CPF' : 'CNPJ',
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

    // Se for cartão de crédito, primeiro encriptar os dados do cartão
    if (paymentMethod === 'credit_card' && card) {
      // Carregar o script do Medusa Bank para encriptação
      // Nota: Em produção, isso deveria ser feito no frontend
      payload.card = {
        encryptedData: btoa(JSON.stringify(card)), // Simplificado para exemplo
      };
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
        pixQrCode: data.pixQrCode,
        pixQrCodeUrl: data.pixQrCodeUrl,
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
