import { NextRequest, NextResponse } from 'next/server'

// Endpoint para receber notificações de pagamento da Cakto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar a chave de API da Cakto
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== process.env.CAKTO_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Processar o webhook da Cakto
    const { event, data } = body

    // Verificar se é um evento de pagamento aprovado
    if (event === 'payment.approved' || data?.status === 'approved') {
      const { customer_email, product_id, transaction_id } = data

      // Determinar o plano baseado no product_id ou outros dados
      const plan = data.plan || (product_id?.includes('annual') ? 'annual' : 'monthly')

      // Aqui você pode salvar no banco de dados Supabase
      // Por enquanto, retornamos sucesso para a Cakto
      
      console.log('Pagamento aprovado:', {
        email: customer_email,
        plan,
        transaction_id
      })

      return NextResponse.json({
        success: true,
        message: 'Webhook processado com sucesso'
      })
    }

    // Outros eventos podem ser tratados aqui
    return NextResponse.json({
      success: true,
      message: 'Evento recebido'
    })

  } catch (error) {
    console.error('Erro ao processar webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Endpoint GET para verificar status
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Webhook endpoint da Cakto está funcionando'
  })
}
