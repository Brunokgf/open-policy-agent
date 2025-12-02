import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona para home após 10 segundos
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-16 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl">Compra Concluída!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-lg">
              Seu pedido foi recebido com sucesso!
            </p>
            <p className="text-muted-foreground">
              Você receberá um e-mail de confirmação em breve com todos os detalhes do seu pedido.
            </p>
            <p className="text-sm text-muted-foreground">
              Obrigado por comprar conosco!
            </p>
            <div className="pt-4">
              <Button 
                onClick={() => navigate('/')}
                size="lg"
                className="w-full"
              >
                Voltar para a Loja
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Redirecionando automaticamente em 10 segundos...
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OrderConfirmation;
