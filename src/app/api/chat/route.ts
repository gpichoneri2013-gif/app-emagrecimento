import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um Personal Trainer IA especializado em fitness, nutrição e saúde. 

Seu papel é:
- Responder dúvidas sobre treinos, exercícios e técnicas
- Dar orientações sobre nutrição, dietas e alimentação saudável
- Ajudar com dicas de motivação e bem-estar
- Explicar conceitos de forma clara e acessível
- Ser sempre positivo, encorajador e profissional

IMPORTANTE:
- Mantenha respostas concisas e diretas (máximo 3-4 parágrafos)
- Use linguagem simples e amigável
- Sempre incentive hábitos saudáveis
- Se a pergunta for sobre condições médicas sérias, recomende consultar um profissional
- Foque em fitness, treino e nutrição - evite tópicos não relacionados`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (!response.ok) {
      throw new Error('Erro na API da OpenAI')
    }

    const data = await response.json()
    const assistantMessage = data.choices[0].message.content

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Erro no chat:', error)
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}
