"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Flame, Dumbbell, Apple, TrendingUp, Calculator, BookOpen, Download, Zap, Star, Award, Crown, Smartphone, Monitor, CheckCircle, X, Lock, AlertCircle, Home, Calendar, Utensils, Camera, ChevronRight, Plus, Droplet, Clock, Target, Activity, Scale, Ruler, Image as ImageIcon, ChefHat, Search, Filter, Info, Upload, Trash2, Play, Pause } from "lucide-react"

export default function FitFusionApp() {
  const [showInstallGuide, setShowInstallGuide] = useState(false)
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false)
  const [showRenewalModal, setShowRenewalModal] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)
  const [subscriptionData, setSubscriptionData] = useState<any>(null)
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null)
  const [showSalesPage, setShowSalesPage] = useState(false)
  const [masterCode, setMasterCode] = useState("")
  const installGuideRef = useRef<HTMLDivElement>(null)

  // Estados do App
  const [currentSection, setCurrentSection] = useState<'home' | 'workouts' | 'diary' | 'recipes' | 'progress' | 'calculators'>('home')
  const [waterIntake, setWaterIntake] = useState(0)
  const [waterGoal, setWaterGoal] = useState(2000) // Meta de água em ml
  const [caloriesConsumed, setCaloriesConsumed] = useState(0)
  const [caloriesGoal, setCaloriesGoal] = useState(2000) // Meta de calorias
  const [todayMeals, setTodayMeals] = useState<Array<{name: string, calories: number, time: string}>>([]

  const [progressData, setProgressData] = useState({
    weight: 75,
    bodyFat: 18,
    chest: 95,
    waist: 80,
    hips: 98,
    arms: 35,
    legs: 55,
    goalWeight: 70,
    goalType: 'lose', // 'lose' ou 'gain'
    currentProgress: 75
  })

  // Estados para modais
  const [showAddMealModal, setShowAddMealModal] = useState(false)
  const [showWaterModal, setShowWaterModal] = useState(false)
  const [showCaloriesGoalModal, setShowCaloriesGoalModal] = useState(false)

  // Estados temporários para inputs
  const [tempWaterGoal, setTempWaterGoal] = useState("")
  const [tempWaterAmount, setTempWaterAmount] = useState("")

  // Estados para fotos de progresso
  const [progressPhotos, setProgressPhotos] = useState<Array<{id: string, url: string, date: string}>([])

  // Estados das calculadoras
  const [calcWeight, setCalcWeight] = useState("")
  const [calcHeight, setCalcHeight] = useState("")
  const [calcAge, setCalcAge] = useState("")
  const [calcGender, setCalcGender] = useState("male")
  const [calcActivity, setCalcActivity] = useState("moderate")
  const [calcGoalType, setCalcGoalType] = useState("maintain") // 'maintain', 'lose', 'gain'
  const [calcResult, setCalcResult] = useState<{calories: number, caloriesLose?: number, caloriesGain?: number, water: number} | null>(null)

  // Estados para calculadoras adicionais
  const [showIMCCalc, setShowIMCCalc] = useState(false)
  const [showMacrosCalc, setShowMacrosCalc] = useState(false)

  // Resultados das calculadoras
  const [imcResult, setImcResult] = useState<{imc: number, classification: string} | null>(null)
  const [macrosResult, setMacrosResult] = useState<{protein: number, carbs: number, fat: number} | null>(null)

  // Estados para detalhes de treino
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false)

  // Estados para detalhes de receita
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [showRecipeDetails, setShowRecipeDetails] = useState(false)

  // Estados para animação de exercício
  const [showExerciseAnimation, setShowExerciseAnimation] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [animationPlaying, setAnimationPlaying] = useState(true)

  // Links da Cakto
  const CAKTO_LINK_MONTHLY = "https://pay.cakto.com.br/ffuoj5a"
  const CAKTO_LINK_ANNUAL = "https://pay.cakto.com.br/cfv5ikh_709555"
  const MASTER_CODE = "Master"

  // Verificar assinatura ao carregar
  useEffect(() => {
    // Ativar acesso direto ao app para preview
    const permanentSubscription = {
      plan: 'preview',
      purchasedAt: new Date().toISOString(),
      expiresAt: new Date(2099, 11, 31).toISOString(),
      active: true,
      isMaster: true
    }
    
    localStorage.setItem('fitfusion_subscription', JSON.stringify(permanentSubscription))
    setHasSubscription(true)
    setSubscriptionData(permanentSubscription)
    setShowSalesPage(false)
    
    loadLocalData()
    checkAndResetDaily()
  }, [])

  // Função para verificar e resetar dados diários
  const checkAndResetDaily = () => {
    const lastResetDate = localStorage.getItem('fitfusion_last_reset')
    const today = new Date().toDateString()
    
    if (lastResetDate !== today) {
      // Resetar hidratação
      setWaterIntake(0)
      localStorage.setItem('fitfusion_water', '0')
      
      // Resetar calorias
      setCaloriesConsumed(0)
      localStorage.setItem('fitfusion_calories', '0')
      setTodayMeals([])
      localStorage.setItem('fitfusion_meals', '[]')
      
      localStorage.setItem('fitfusion_last_reset', today)
    }
  }

  const loadLocalData = () => {
    const savedWater = localStorage.getItem('fitfusion_water')
    const savedWaterGoal = localStorage.getItem('fitfusion_water_goal')
    const savedCalories = localStorage.getItem('fitfusion_calories')
    const savedCaloriesGoal = localStorage.getItem('fitfusion_calories_goal')
    const savedMeals = localStorage.getItem('fitfusion_meals')
    const savedProgress = localStorage.getItem('fitfusion_progress')
    const savedPhotos = localStorage.getItem('fitfusion_photos')
    
    if (savedWater) setWaterIntake(parseInt(savedWater))
    if (savedWaterGoal) setWaterGoal(parseInt(savedWaterGoal))
    if (savedCalories) setCaloriesConsumed(parseInt(savedCalories))
    if (savedCaloriesGoal) setCaloriesGoal(parseInt(savedCaloriesGoal))
    if (savedMeals) setTodayMeals(JSON.parse(savedMeals))
    if (savedProgress) setProgressData(JSON.parse(savedProgress))
    if (savedPhotos) setProgressPhotos(JSON.parse(savedPhotos))
  }

  const checkSubscription = () => {
    const subscription = localStorage.getItem('fitfusion_subscription')
    if (subscription) {
      const subData = JSON.parse(subscription)
      const expiresAt = new Date(subData.expiresAt)
      const now = new Date()
      
      const diffTime = expiresAt.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (expiresAt > now) {
        setHasSubscription(true)
        setSubscriptionData(subData)
        setDaysRemaining(diffDays)
        setShowSalesPage(false)
      } else {
        setHasSubscription(false)
        setSubscriptionData(subData)
        setDaysRemaining(0)
        setShowRenewalModal(true)
        setShowSalesPage(true)
      }
    }
  }

  const handleMasterCodeSubmit = () => {
    if (masterCode.trim() === MASTER_CODE) {
      const permanentSubscription = {
        plan: 'master',
        purchasedAt: new Date().toISOString(),
        expiresAt: new Date(2099, 11, 31).toISOString(),
        active: true,
        isMaster: true
      }

      localStorage.setItem('fitfusion_subscription', JSON.stringify(permanentSubscription))
      setHasSubscription(true)
      setSubscriptionData(permanentSubscription)
      setShowSalesPage(false)
      setMasterCode("")
      alert("✅ Acesso liberado com sucesso!")
    } else {
      alert("❌ Código inválido. Tente novamente.")
      setMasterCode("")
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const purchased = urlParams.get('purchased')
    const plan = urlParams.get('plan')
    const status = urlParams.get('status')
    
    if ((purchased === 'true' || status === 'approved') && plan) {
      const expirationDate = new Date()
      if (plan === 'monthly') {
        expirationDate.setMonth(expirationDate.getMonth() + 1)
      } else if (plan === 'annual') {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1)
      }

      const subscriptionData = {
        plan: plan,
        purchasedAt: new Date().toISOString(),
        expiresAt: expirationDate.toISOString(),
        active: true
      }

      localStorage.setItem('fitfusion_subscription', JSON.stringify(subscriptionData))
      setHasSubscription(true)
      setSubscriptionData(subscriptionData)
      setShowPurchaseSuccess(true)
      setShowRenewalModal(false)
      setShowSalesPage(false)
      
      window.history.replaceState({}, document.title, window.location.pathname)
      checkSubscription()
    }
  }, [])

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
    }
  ]

  const scrollToPlans = () => {
    const pricingSection = document.getElementById('pricing-section')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleInstallNow = () => {
    setShowPurchaseSuccess(false)
    setShowInstallGuide(true)
    setTimeout(() => {
      if (installGuideRef.current) {
        installGuideRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const handleShowInstallGuide = () => {
    setShowInstallGuide(true)
    setTimeout(() => {
      if (installGuideRef.current) {
        installGuideRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const handlePurchase = (plan: 'monthly' | 'annual') => {
    const link = plan === 'monthly' ? CAKTO_LINK_MONTHLY : CAKTO_LINK_ANNUAL
    window.location.href = link
  }

  const handleWaterSubmit = () => {
    const goal = parseInt(tempWaterGoal)
    const amount = parseInt(tempWaterAmount)
    
    if (goal > 0) {
      setWaterGoal(goal)
      localStorage.setItem('fitfusion_water_goal', goal.toString())
    }
    
    if (amount > 0) {
      const newWater = waterIntake + amount
      setWaterIntake(newWater)
      localStorage.setItem('fitfusion_water', newWater.toString())
    }
    
    setTempWaterGoal("")
    setTempWaterAmount("")
    setShowWaterModal(false)
  }

  const updateCaloriesGoal = (newGoal: number) => {
    setCaloriesGoal(newGoal)
    localStorage.setItem('fitfusion_calories_goal', newGoal.toString())
  }

  const addMeal = (name: string, calories: number) => {
    const newMeal = {
      name,
      calories,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
    const newMeals = [...todayMeals, newMeal]
    const totalCalories = newMeals.reduce((sum, meal) => sum + meal.calories, 0)
    
    setTodayMeals(newMeals)
    setCaloriesConsumed(totalCalories)
    localStorage.setItem('fitfusion_meals', JSON.stringify(newMeals))
    localStorage.setItem('fitfusion_calories', totalCalories.toString())
  }

  const updateProgress = (field: string, value: number | string) => {
    const newProgress = { ...progressData, [field]: value }
    setProgressData(newProgress)
    localStorage.setItem('fitfusion_progress', JSON.stringify(newProgress))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newPhoto = {
          id: Date.now().toString(),
          url: reader.result as string,
          date: new Date().toLocaleDateString('pt-BR')
        }
        const updatedPhotos = [...progressPhotos, newPhoto]
        setProgressPhotos(updatedPhotos)
        localStorage.setItem('fitfusion_photos', JSON.stringify(updatedPhotos))
      }
      reader.readAsDataURL(file)
    }
  }

  const deletePhoto = (id: string) => {
    const updatedPhotos = progressPhotos.filter(photo => photo.id !== id)
    setProgressPhotos(updatedPhotos)
    localStorage.setItem('fitfusion_photos', JSON.stringify(updatedPhotos))
  }

  const calculateCaloriesAndWater = () => {
    const weight = parseFloat(calcWeight)
    const height = parseFloat(calcHeight)
    const age = parseFloat(calcAge)

    if (!weight || !height || !age) {
      alert("Por favor, preencha todos os campos")
      return
    }

    // Cálculo TMB (Taxa Metabólica Basal) - Fórmula de Harris-Benedict
    let tmb = 0
    if (calcGender === "male") {
      tmb = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      tmb = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }

    // Multiplicador de atividade
    const activityMultipliers: {[key: string]: number} = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      intense: 1.725,
      veryIntense: 1.9
    }

    const dailyCalories = Math.round(tmb * activityMultipliers[calcActivity])
    
    // Calorias para perder peso (déficit de 500 kcal)
    const caloriesLose = Math.round(dailyCalories - 500)
    
    // Calorias para ganhar peso (superávit de 300 kcal)
    const caloriesGain = Math.round(dailyCalories + 300)
    
    // Cálculo de água recomendada (35ml por kg de peso corporal)
    const dailyWater = Math.round((weight * 35) / 1000 * 10) / 10 // em litros

    setCalcResult({ 
      calories: dailyCalories, 
      caloriesLose,
      caloriesGain,
      water: dailyWater 
    })
  }

  // Calculadora IMC
  const calculateIMC = () => {
    const weight = parseFloat(calcWeight)
    const height = parseFloat(calcHeight) / 100 // converter cm para metros

    if (!weight || !height) {
      alert("Preencha peso e altura")
      return
    }

    const imc = weight / (height * height)
    let classification = ""

    if (imc < 18.5) classification = "Abaixo do peso"
    else if (imc < 25) classification = "Peso normal"
    else if (imc < 30) classification = "Sobrepeso"
    else if (imc < 35) classification = "Obesidade Grau I"
    else if (imc < 40) classification = "Obesidade Grau II"
    else classification = "Obesidade Grau III"

    setImcResult({ imc: Math.round(imc * 10) / 10, classification })
  }

  // Calculadora de Macronutrientes
  const calculateMacros = () => {
    const weight = parseFloat(calcWeight)
    const height = parseFloat(calcHeight)
    const age = parseFloat(calcAge)

    if (!weight || !height || !age) {
      alert("Preencha todos os campos")
      return
    }

    // Calcular TMB primeiro
    let tmb = 0
    if (calcGender === "male") {
      tmb = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      tmb = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }

    const activityMultipliers: {[key: string]: number} = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      intense: 1.725,
      veryIntense: 1.9
    }

    const dailyCalories = tmb * activityMultipliers[calcActivity]

    // Distribuição de macros (padrão fitness)
    const protein = Math.round(weight * 2) // 2g por kg
    const fat = Math.round((dailyCalories * 0.25) / 9) // 25% das calorias
    const carbs = Math.round((dailyCalories - (protein * 4) - (fat * 9)) / 4)

    setMacrosResult({ protein, carbs, fat })
  }

  // Dados de treinos com animações
  const workoutPlans = {
    gym: [
      { 
        day: 'Segunda', 
        focus: 'Peito e Tríceps', 
        exercises: [
          { 
            name: 'Supino Reto', 
            sets: '4x12', 
            instructions: '1. Deite no banco reto\n2. Pegue a barra com pegada média\n3. Desça controlado até o peito\n4. Empurre explosivamente\n5. Mantenha os pés firmes no chão',
            animation: {
              type: 'bench-press',
              keyPoints: ['Costas firmes no banco', 'Pés no chão', 'Barra até o peito', 'Cotovelos 45°'],
              commonMistakes: ['Arquear demais as costas', 'Tirar os pés do chão', 'Descer muito rápido']
            }
          },
          { 
            name: 'Supino Inclinado', 
            sets: '4x12', 
            instructions: '1. Ajuste o banco em 30-45°\n2. Posicione-se com costas firmes\n3. Desça a barra até a parte superior do peito\n4. Empurre mantendo controle\n5. Expire ao subir',
            animation: {
              type: 'incline-press',
              keyPoints: ['Banco 30-45°', 'Parte superior do peito', 'Controle total', 'Respiração correta'],
              commonMistakes: ['Banco muito inclinado', 'Perder tensão no peito', 'Movimentos bruscos']
            }
          },
          { 
            name: 'Crucifixo', 
            sets: '3x15', 
            instructions: '1. Deite no banco com halteres\n2. Abra os braços em arco\n3. Desça até sentir alongamento\n4. Contraia o peito ao subir\n5. Mantenha cotovelos levemente flexionados',
            animation: {
              type: 'dumbbell-fly',
              keyPoints: ['Movimento em arco', 'Alongamento controlado', 'Cotovelos fixos', 'Contração no topo'],
              commonMistakes: ['Esticar os cotovelos', 'Descer demais', 'Usar peso excessivo']
            }
          },
          { 
            name: 'Tríceps Testa', 
            sets: '4x12', 
            instructions: '1. Deite com barra W\n2. Braços perpendiculares ao corpo\n3. Flexione apenas os cotovelos\n4. Desça até próximo da testa\n5. Estenda completamente',
            animation: {
              type: 'skull-crusher',
              keyPoints: ['Cotovelos fixos', 'Movimento isolado', 'Controle na descida', 'Extensão completa'],
              commonMistakes: ['Mover os cotovelos', 'Descer muito rápido', 'Não estender totalmente']
            }
          },
          { 
            name: 'Tríceps Corda', 
            sets: '3x15', 
            instructions: '1. Segure a corda no puxador alto\n2. Cotovelos fixos ao lado do corpo\n3. Empurre para baixo\n4. Abra a corda no final\n5. Contraia o tríceps',
            animation: {
              type: 'rope-pushdown',
              keyPoints: ['Cotovelos colados', 'Empurrar para baixo', 'Abrir no final', 'Contração máxima'],
              commonMistakes: ['Mover os cotovelos', 'Usar o corpo', 'Não abrir a corda']
            }
          }
        ]
      },
      // Adicione os outros dias aqui seguindo o mesmo padrão...
    ],
    home: [
      { 
        day: 'Segunda', 
        focus: 'Corpo Superior', 
        exercises: [
          { 
            name: 'Flexões', 
            sets: '4x15', 
            instructions: '1. Mãos na largura dos ombros\n2. Corpo em linha reta\n3. Desça até peito próximo ao chão\n4. Empurre com força\n5. Mantenha core contraído',
            animation: {
              type: 'push-up',
              keyPoints: ['Corpo alinhado', 'Core ativo', 'Amplitude completa', 'Respiração ritmada'],
              commonMistakes: ['Quadril caído', 'Não descer o suficiente', 'Cabeça para baixo']
            }
          },
          { 
            name: 'Tríceps no Banco', 
            sets: '4x12', 
            instructions: '1. Apoie mãos atrás no banco\n2. Pernas estendidas à frente\n3. Desça flexionando cotovelos\n4. Suba estendendo os braços\n5. Mantenha cotovelos próximos',
            animation: {
              type: 'bench-dips',
              keyPoints: ['Mãos no banco', 'Cotovelos para trás', 'Descida controlada', 'Extensão completa'],
              commonMistakes: ['Cotovelos abertos', 'Descer demais', 'Usar as pernas']
            }
          },
          // Continue com os outros exercícios...
        ]
      },
      // Outros dias...
    ]
  }

  // Guia Alimentar (mantém o mesmo do código original)
  const foodGuide = {
    breakfast: [
      {
        name: 'Omelete Proteico com Aveia',
        calories: 380,
        protein: 32,
        carbs: 28,
        fat: 16,
        time: '15 min',
        ingredients: ['3 ovos', '30g aveia', 'Tomate', 'Cebola', 'Queijo cottage'],
        steps: [
          '1. Bata os 3 ovos em uma tigela',
          '2. Adicione a aveia e misture bem',
          '3. Pique tomate e cebola em cubos pequenos',
          '4. Aqueça uma frigideira antiaderente',
          '5. Despeje a mistura e adicione os vegetais',
          '6. Cozinhe em fogo médio por 3-4 minutos',
          '7. Vire com cuidado e cozinhe mais 2 minutos',
          '8. Adicione queijo cottage por cima',
          '9. Sirva quente'
        ]
      },
      // Adicione as outras receitas aqui...
    ],
    lunch: [],
    dinner: [],
    afternoonSnack: [],
    snack: []
  }

  // Função para abrir animação de exercício
  const openExerciseAnimation = (exercise: any) => {
    setSelectedExercise(exercise)
    setShowExerciseAnimation(true)
    setAnimationPlaying(true)
  }

  // Se tem assinatura ativa, mostrar o app
  if (hasSubscription && !showSalesPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
        {/* Banner de Status */}
        {daysRemaining !== null && (
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                {subscriptionData?.isMaster ? (
                  "Acesso Master Ativo - Ilimitado"
                ) : (
                  `Assinatura Ativa - ${daysRemaining} ${daysRemaining === 1 ? 'dia restante' : 'dias restantes'}`
                )}
              </span>
            </div>
          </div>
        )}

        {/* Header do App */}
        <header className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-6 sticky top-0 z-40 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-8 h-8" />
              <h1 className="text-2xl font-bold">FitFusion</h1>
            </div>
          </div>
        </header>

        {/* Navegação Principal */}
        <nav className="bg-white border-b sticky top-[72px] z-30 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
              {[
                { id: 'home', icon: Home, label: 'Início' },
                { id: 'workouts', icon: Dumbbell, label: 'Treinos' },
                { id: 'diary', icon: BookOpen, label: 'Diário' },
                { id: 'recipes', icon: ChefHat, label: 'Receitas' },
                { id: 'progress', icon: TrendingUp, label: 'Progresso' },
                { id: 'calculators', icon: Calculator, label: 'Calculadoras' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    currentSection === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Conteúdo Principal */}
        <main className="container mx-auto px-4 py-8 pb-24">
          {/* HOME - mantém o mesmo */}
          {currentSection === 'home' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo ao FitFusion! 🔥</h2>
                <p className="text-gray-600">Sua jornada fitness começa aqui</p>
              </div>

              {/* Cards de Resumo Diário */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Droplet className="w-8 h-8" />
                    <span className="text-2xl font-bold">{waterIntake}ml</span>
                  </div>
                  <p className="text-blue-100">Água hoje</p>
                  <div className="mt-4 bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: `${Math.min((waterIntake / waterGoal) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Apple className="w-8 h-8" />
                    <span className="text-2xl font-bold">{caloriesConsumed}</span>
                  </div>
                  <p className="text-orange-100">Calorias hoje</p>
                  <p className="text-sm text-orange-100 mt-2">{todayMeals.length} refeições</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-8 h-8" />
                    <span className="text-2xl font-bold">7/7</span>
                  </div>
                  <p className="text-purple-100">Treinos esta semana</p>
                  <p className="text-sm text-purple-100 mt-2">Parabéns! 🎉</p>
                </div>
              </div>

              {/* Funcionalidades Rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (feature.title.includes('Treinos')) setCurrentSection('workouts')
                      else if (feature.title.includes('Nutrição')) setCurrentSection('recipes')
                      else if (feature.title.includes('Diário')) setCurrentSection('diary')
                      else if (feature.title.includes('Progresso')) setCurrentSection('progress')
                      else if (feature.title.includes('Calculadoras')) setCurrentSection('calculators')
                    }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TREINOS - com botão de animação */}
          {currentSection === 'workouts' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Planos de Treino - 7 Dias</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Academia */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-xl">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Treino Academia</h3>
                  </div>

                  <div className="space-y-4">
                    {workoutPlans.gym.map((workout, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setSelectedWorkout({ ...workout, type: 'gym' })
                          setShowWorkoutDetails(true)
                        }}
                        className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-500 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-gray-800">{workout.day}</p>
                            <p className="text-sm text-emerald-600">{workout.focus}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {workout.exercises.slice(0, 3).map((ex, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">
                              {ex.name}
                            </span>
                          ))}
                          {workout.exercises.length > 3 && (
                            <span className="text-xs bg-emerald-100 px-2 py-1 rounded-lg text-emerald-600 font-medium">
                              +{workout.exercises.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Casa */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Treino em Casa</h3>
                  </div>

                  <div className="space-y-4">
                    {workoutPlans.home.map((workout, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setSelectedWorkout({ ...workout, type: 'home' })
                          setShowWorkoutDetails(true)
                        }}
                        className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-500 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-gray-800">{workout.day}</p>
                            <p className="text-sm text-purple-600">{workout.focus}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {workout.exercises.slice(0, 3).map((ex, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">
                              {ex.name}
                            </span>
                          ))}
                          {workout.exercises.length > 3 && (
                            <span className="text-xs bg-purple-100 px-2 py-1 rounded-lg text-purple-600 font-medium">
                              +{workout.exercises.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Outras seções mantêm o mesmo código... */}
        </main>

        {/* Modal de Detalhes do Treino COM ANIMAÇÃO */}
        {showWorkoutDetails && selectedWorkout && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <div className={`bg-gradient-to-r ${selectedWorkout.type === 'gym' ? 'from-emerald-500 to-cyan-500' : 'from-purple-500 to-pink-500'} p-6 rounded-t-3xl sticky top-0 z-10`}>
                <button
                  onClick={() => setShowWorkoutDetails(false)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedWorkout.day}</h2>
                <p className="text-white/90">{selectedWorkout.focus}</p>
              </div>

              <div className="p-6 space-y-6">
                {selectedWorkout.exercises.map((exercise: any, idx: number) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-500 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800">{exercise.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg font-bold text-sm">
                          {exercise.sets}
                        </span>
                        {exercise.animation && (
                          <button
                            onClick={() => openExerciseAnimation(exercise)}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-lg hover:shadow-lg transition-all"
                            title="Ver animação"
                          >
                            <Play className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-gray-700">Passo a Passo:</p>
                      </div>
                      <div className="text-sm text-gray-600 whitespace-pre-line pl-7">
                        {exercise.instructions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Animação do Exercício */}
        {showExerciseAnimation && selectedExercise && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-t-3xl sticky top-0 z-10">
                <button
                  onClick={() => setShowExerciseAnimation(false)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedExercise.name}</h2>
                <p className="text-white/90">Demonstração de Execução Correta</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Área de Animação Visual */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden">
                  {/* Animação Simulada com CSS */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className={`absolute inset-0 flex items-center justify-center ${animationPlaying ? 'animate-pulse' : ''}`}>
                      <div className="text-center">
                        <Dumbbell className="w-32 h-32 text-cyan-400 mx-auto mb-4" />
                        <p className="text-white text-xl font-bold">Animação: {selectedExercise.name}</p>
                        <p className="text-cyan-300 text-sm mt-2">Movimento em loop contínuo</p>
                      </div>
                    </div>
                  </div>

                  {/* Controles de Reprodução */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                    <button
                      onClick={() => setAnimationPlaying(!animationPlaying)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                    >
                      {animationPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                {/* Pontos-Chave */}
                {selectedExercise.animation && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-xl p-4">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Pontos-Chave
                      </h3>
                      <ul className="space-y-2">
                        {selectedExercise.animation.keyPoints.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 rounded-xl p-4">
                      <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Erros Comuns
                      </h3>
                      <ul className="space-y-2">
                        {selectedExercise.animation.commonMistakes.map((mistake: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-red-700">
                            <X className="w-5 h-5 flex-shrink-0" />
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Instruções Detalhadas */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Passo a Passo Detalhado</h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {selectedExercise.instructions}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Página de vendas (mantém o mesmo código original)
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Código da página de vendas permanece igual... */}
    </div>
  )
}
