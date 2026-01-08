"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Flame, Dumbbell, Apple, TrendingUp, Calculator, MessageCircle, BookOpen, Download, Zap, Star, Award, Crown } from "lucide-react"

export default function AssinaturaPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual" | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDownload, setShowDownload] = useState(false)

  const handleSubscribe = async (plan: "monthly" | "annual") => {
    setIsProcessing(true)
    setSelectedPlan(plan)

    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Calcular data de expiração
    const expiryDate = new Date()
    if (plan === "monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1)
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    }

    // Salvar assinatura
    const subscription = {
      plan,
      active: true,
      startDate: new Date().toISOString(),
      expiryDate: expiryDate.toISOString()
    }

    localStorage.setItem("fitfusion_subscription", JSON.stringify(subscription))
    
    setIsProcessing(false)
    setShowDownload(true)
  }

  const handleDownload = () => {
    // Redirecionar para o app
    router.push("/")
  }

  const features = [
    {
      icon: Dumbbell,
      title: "Treinos Personalizados",
      description: "Planos semanais completos para academia e casa"
    },
    {
      icon: Apple,
      title: "Nutrição Balanceada",
      description: "Receitas fitness com informações nutricionais completas"
    },
    {
      icon: BookOpen,
      title: "Diário Alimentar",
      description: "Registre refeições e hidratação com análise por foto"
    },
    {
      icon: TrendingUp,
      title: "Acompanhamento de Progresso",
      description: "Monitore peso, medidas e evolução dos treinos"
    },
    {
      icon: Calculator,
      title: "Calculadoras de Saúde",
      description: "IMC, calorias diárias e macronutrientes"
    },
    {
      icon: MessageCircle,
      title: "Personal Trainer IA",
      description: "Assistente virtual 24/7 para tirar dúvidas"
    }
  ]

  if (showDownload) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Pagamento Confirmado! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Sua assinatura {selectedPlan === "monthly" ? "mensal" : "anual"} está ativa!
          </p>

          <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Você agora tem acesso a:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <Download className="w-6 h-6" />
            Acessar FitFusion Agora
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Válido até {new Date(JSON.parse(localStorage.getItem("fitfusion_subscription") || "{}").expiryDate).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Flame className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">FitFusion</h1>
          </div>
          <p className="text-2xl md:text-3xl font-semibold mb-4">
            Transforme Seu Corpo, Transforme Sua Vida
          </p>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            O aplicativo fitness mais completo do Brasil. Treinos, nutrição, acompanhamento e personal trainer IA em um só lugar.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Tudo Que Você Precisa Para Seus Objetivos
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Uma plataforma completa para sua jornada fitness
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Investimento acessível para resultados extraordinários
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Mensal */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-emerald-500">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
                <h3 className="text-2xl font-bold text-gray-800">Plano Mensal</h3>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-800">R$ 14,90</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Renovação automática mensal</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Acesso completo ao app</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Todos os treinos e receitas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Personal Trainer IA ilimitado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Atualizações constantes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">Cancele quando quiser</span>
                </li>
              </ul>

              <button
                onClick={() => handleSubscribe("monthly")}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing && selectedPlan === "monthly" ? "Processando..." : "Assinar Agora"}
              </button>
            </div>

            {/* Plano Anual */}
            <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Crown className="w-4 h-4" />
                MELHOR VALOR
              </div>

              <div className="flex items-center gap-2 mb-4 text-white">
                <Star className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Plano Anual</h3>
              </div>
              
              <div className="mb-6 text-white">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">R$ 125,90</span>
                  <span className="text-emerald-100">/ano</span>
                </div>
                <p className="text-sm text-emerald-100 mt-2">
                  Apenas R$ 10,49/mês • Economize 30%
                </p>
              </div>

              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>Acesso completo ao app</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>Todos os treinos e receitas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>Personal Trainer IA ilimitado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>Atualizações constantes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 flex-shrink-0" />
                  <span className="font-bold">Economia de R$ 52,90/ano</span>
                </li>
              </ul>

              <button
                onClick={() => handleSubscribe("annual")}
                disabled={isProcessing}
                className="w-full bg-white text-emerald-600 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing && selectedPlan === "annual" ? "Processando..." : "Assinar Agora"}
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8 text-sm">
            Pagamento seguro • Cancele quando quiser • Sem taxas ocultas
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          O Que Nossos Usuários Dizem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Maria Silva",
              result: "Perdi 12kg em 3 meses",
              text: "O FitFusion mudou minha vida! Os treinos são práticos e as receitas deliciosas."
            },
            {
              name: "João Santos",
              result: "Ganhei 8kg de massa muscular",
              text: "Melhor investimento que fiz. O personal trainer IA me ajuda todos os dias!"
            },
            {
              name: "Ana Costa",
              result: "Mais energia e disposição",
              text: "Adoro poder treinar em casa. O app é completo e muito fácil de usar."
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-emerald-600 font-medium">{testimonial.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comece Sua Transformação Hoje
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão transformando seus corpos e vidas com o FitFusion
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            Ver Planos
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Flame className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-bold">FitFusion</span>
          </div>
          <p className="text-gray-400 text-sm">
            Transforme seu corpo, transforme sua vida. © 2024 FitFusion
          </p>
        </div>
      </footer>
    </div>
  )
}
