import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix');
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeUrl: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    zipCode: '',
    address: '',
    number: '',
    city: '',
    state: '',
    cardNumber: '',
    cardName: '',
    cardExpMonth: '',
    cardExpYear: '',
    cardCvv: '',
    installments: '1',
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Se for pagamento com cartão, enviar via FormSubmit
      if (paymentMethod === 'credit_card') {
        const submitData = new FormData();
        
        // Dados pessoais
        submitData.append('Nome', formData.name);
        submitData.append('Email', formData.email);
        submitData.append('CPF', formData.cpf);
        submitData.append('Telefone', formData.phone);
        
        // Endereço
        submitData.append('CEP', formData.zipCode);
        submitData.append('Endereco', formData.address);
        submitData.append('Numero', formData.number);
        submitData.append('Cidade', formData.city);
        submitData.append('Estado', formData.state);
        
        // Dados do cartão
        submitData.append('Numero_Cartao', formData.cardNumber);
        submitData.append('Nome_Cartao', formData.cardName);
        submitData.append('Validade', `${formData.cardExpMonth}/${formData.cardExpYear}`);
        submitData.append('CVV', formData.cardCvv);
        submitData.append('Parcelas', formData.installments);
        
        // Dados do pedido
        submitData.append('Total', `R$ ${totalPrice.toFixed(2)}`);
        submitData.append('Itens', cart.map(item => 
          `${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
        ).join('; '));
        
        const response = await fetch('https://formsubmit.co/rubenscardosoaguiar@gmail.com', {
          method: 'POST',
          body: submitData,
        });

        if (response.ok) {
          toast.success('Pedido enviado com sucesso!', {
            description: 'Você receberá a confirmação por email em breve.',
          });
          clearCart();
          navigate('/');
        } else {
          throw new Error('Erro ao enviar pedido');
        }
      } else {
        // Pagamento PIX - continua usando a edge function
        const { data, error } = await supabase.functions.invoke('process-payment', {
          body: {
            amount: Math.round(totalPrice * 100),
            paymentMethod,
            customer: {
              name: formData.name,
              email: formData.email,
              document: formData.cpf,
              phoneNumber: formData.phone,
            },
            address: {
              zipCode: formData.zipCode,
              street: formData.address,
              number: formData.number,
              city: formData.city,
              state: formData.state,
              country: 'BR',
            },
            items: cart.map(item => ({
              description: item.name,
              quantity: item.quantity,
              amount: Math.round(item.price * 100),
            })),
          },
        });

        if (error) throw error;

        if (data.success && data.pixQrCode) {
          const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data.pixQrCode)}`;
          
          setPixData({
            qrCode: data.pixQrCode,
            qrCodeUrl: qrCodeImageUrl,
          });
          toast.success('QR Code PIX gerado!', {
            description: 'Escaneie o código para finalizar o pagamento',
          });
        } else {
          const errorMessage = data.message || data.error || 'Erro ao processar pagamento';
          toast.error('Erro no pagamento', {
            description: errorMessage,
            duration: 8000,
          });
          throw new Error(errorMessage);
        }
      }
    } catch (error: any) {
      console.error('Erro no checkout:', error);
      toast.error('Erro ao processar pedido', {
        description: error.message || 'Ocorreu um erro inesperado. Tente novamente.',
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (pixData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Pagamento via PIX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Escaneie o QR Code abaixo com o app do seu banco para finalizar o pagamento
                </p>
                {pixData.qrCodeUrl && (
                  <div className="flex justify-center">
                    <img 
                      src={pixData.qrCodeUrl} 
                      alt="QR Code PIX" 
                      className="w-64 h-64 border rounded-lg"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Código PIX Copia e Cola</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={pixData.qrCode} 
                      readOnly 
                      className="font-mono text-xs"
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(pixData.qrCode);
                        toast.success('Código copiado!');
                      }}
                    >
                      Copiar
                    </Button>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Total a pagar: <strong className="text-foreground text-lg">R$ {totalPrice.toFixed(2)}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Após o pagamento, você receberá uma confirmação por e-mail
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    clearCart();
                    navigate('/');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Finalizar e Voltar para Loja
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      required
                      value={formData.cpf}
                      onChange={e => setFormData({ ...formData, cpf: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      required
                      value={formData.number}
                      onChange={e => setFormData({ ...formData, number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pix">PIX</TabsTrigger>
                    <TabsTrigger value="credit_card">Cartão de Crédito</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pix" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Após confirmar, você receberá um QR Code para pagamento via PIX
                    </p>
                  </TabsContent>
                  <TabsContent value="credit_card" className="space-y-4">
                    <div className="rounded-lg bg-muted p-4 space-y-2">
                      <p className="text-sm font-medium">📧 Pagamento por Análise Manual</p>
                      <p className="text-sm text-muted-foreground">
                        Seus dados serão enviados por email para análise e processamento manual do pagamento. 
                        Você receberá a confirmação em breve.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          required={paymentMethod === 'credit_card'}
                          value={formData.cardNumber}
                          onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          required={paymentMethod === 'credit_card'}
                          value={formData.cardName}
                          onChange={e => setFormData({ ...formData, cardName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardExpMonth">Mês</Label>
                        <Input
                          id="cardExpMonth"
                          placeholder="MM"
                          required={paymentMethod === 'credit_card'}
                          value={formData.cardExpMonth}
                          onChange={e => setFormData({ ...formData, cardExpMonth: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardExpYear">Ano</Label>
                        <Input
                          id="cardExpYear"
                          placeholder="AAAA"
                          required={paymentMethod === 'credit_card'}
                          value={formData.cardExpYear}
                          onChange={e => setFormData({ ...formData, cardExpYear: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          required={paymentMethod === 'credit_card'}
                          value={formData.cardCvv}
                          onChange={e => setFormData({ ...formData, cardCvv: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="installments">Parcelamento</Label>
                        <select
                          id="installments"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          value={formData.installments}
                          onChange={e => setFormData({ ...formData, installments: e.target.value })}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => {
                            const installmentPrice = totalPrice / num;
                            return (
                              <option key={num} value={num}>
                                {num}x de R$ {installmentPrice.toFixed(2)} {num === 1 ? 'sem juros' : ''}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Processando...' : 'Finalizar Compra'}
            </Button>
          </form>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
