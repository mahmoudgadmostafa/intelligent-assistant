import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Sparkles, Link2, Shield, Zap, Users } from 'lucide-react'

export default function LandingPage({ user }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">منصة المساعدات الذكية</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button>لوحة التحكم</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">تسجيل الدخول</Button>
                </Link>
                <Link to="/register">
                  <Button>ابدأ الآن</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>منصة متقدمة لإنشاء المساعدات الذكية</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            أنشئ مساعدات ذكية مخصصة
            <span className="text-primary"> بسهولة وأمان</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            منصة شاملة تتيح لك إنشاء وإدارة ونشر مساعدات ذكية مخصصة مع روابط فريدة لكل مساعدة، مع التركيز على تجربة المستخدم وسهولة الوصول
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                ابدأ مجانًا
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              شاهد العرض التوضيحي
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ميزات قوية ومتقدمة</h2>
          <p className="text-lg text-muted-foreground">كل ما تحتاجه لإنشاء وإدارة مساعدات ذكية احترافية</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>إنشاء سهل ومرن</CardTitle>
              <CardDescription>
                واجهة بديهية لإنشاء المساعدات الذكية مع قوالب جاهزة ومحرر متقدم لتخصيص السلوك والردود
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>روابط فريدة وآمنة</CardTitle>
              <CardDescription>
                توليد تلقائي لروابط فريدة لكل مساعدة مع ضمان الأمان والوصول السلس للمستخدمين
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>أمان متقدم</CardTitle>
              <CardDescription>
                حماية شاملة لبيانات المستخدمين والمساعدات مع نظام صلاحيات متطور ومصادقة آمنة
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>أداء عالي</CardTitle>
              <CardDescription>
                استجابة سريعة وأداء محسّن لضمان تجربة مستخدم سلسة حتى مع عدد كبير من المساعدات
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>إدارة شاملة</CardTitle>
              <CardDescription>
                لوحة تحكم متكاملة لإدارة جميع المساعدات مع إمكانية البحث والتصفية والتحليلات
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>تجربة مستخدم متميزة</CardTitle>
              <CardDescription>
                تصميم متجاوب وعصري يدعم جميع الأجهزة مع الالتزام بمعايير سهولة الوصول
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">جاهز للبدء؟</h2>
            <p className="text-lg mb-8 opacity-90">
              انضم إلى آلاف المستخدمين الذين يستخدمون منصتنا لإنشاء مساعدات ذكية مخصصة
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                ابدأ مجانًا الآن
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 منصة المساعدات الذكية. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}

