import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Nenhuma imagem fornecida' },
        { status: 400 }
      )
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')
    const mimeType = image.type

    // Call OpenAI Vision API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analise esta imagem de alimento e retorne APENAS um JSON válido (sem markdown, sem explicações) no seguinte formato:
{
  "foodName": "nome do alimento em português",
  "calories": número_de_calorias_estimado,
  "protein": "Xg",
  "carbs": "Xg",
  "fat": "Xg"
}

Seja preciso nas estimativas nutricionais. Se houver múltiplos alimentos, some os valores totais.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      console.error('OpenAI API Error:', errorData)
      return NextResponse.json(
        { success: false, error: 'Erro ao analisar imagem com IA' },
        { status: 500 }
      )
    }

    const data = await openaiResponse.json()
    const content = data.choices[0].message.content.trim()
    
    // Parse JSON response
    let nutritionData
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim()
      nutritionData = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Content:', content)
      return NextResponse.json(
        { success: false, error: 'Erro ao processar resposta da IA' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      foodName: nutritionData.foodName,
      calories: nutritionData.calories,
      protein: nutritionData.protein,
      carbs: nutritionData.carbs,
      fat: nutritionData.fat
    })

  } catch (error) {
    console.error('Error analyzing food:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
