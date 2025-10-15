import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bot, ArrowLeft, Save, Send, Settings, MessageSquare, Palette } from 'lucide-react'
import { toast } from 'sonner'

export default function CreateAssistantPage({ user, onLogout }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    welcomeMessage: 'مرحبًا! كيف يمكنني مساعدتك اليوم؟',
    tone: 'friendly',
    language: 'ar',
    enableHistory: true,
    maxResponseLength: 500,
    primaryColor: '#000000',
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveDraft = () => {
    setLoading(true)
    setTimeout(() => {
      toast.success('تم حفظ المسودة بنجاح!')
      setLoading(false)
    }, 1000)
  }

  const handlePublish = () => {
    if (!formData.name || !formData.description) {
      toast.error('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const assistantId = 'ast-' + Math.random().toString(36).substr(2, 9)
      toast.success('تم نشر المساعدة بنجاح!')
      navigate('/dashboard')
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">إنشاء مساعدة جديدة</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSaveDraft} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              حفظ كمسودة
            </Button>
            <Button onClick={handlePublish} disabled={loading}>
              <Send className="h-4 w-4 mr-2" />
              نشر المساعدة
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">
              <Settings className="h-4 w-4 mr-2" />
              الإعدادات الأساسية
            </TabsTrigger>
            <TabsTrigger value="behavior">
              <MessageSquare className="h-4 w-4 mr-2" />
              السلوك والردود
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              المظهر
            </TabsTrigger>
          </TabsList>

          {/* Basic Settings */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات الأساسية</CardTitle>
                <CardDescription>
                  قم بتعيين المعلومات الأساسية للمساعدة الذكية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">اسم المساعدة *</Label>
                  <Input
                    id="name"
                    placeholder="مثال: مساعد خدمة العملاء"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">الوصف *</Label>
                  <Textarea
                    id="description"
                    placeholder="وصف مختصر عن وظيفة المساعدة..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">اللغة</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Behavior Settings */}
          <TabsContent value="behavior">
            <Card>
              <CardHeader>
                <CardTitle>السلوك والردود</CardTitle>
                <CardDescription>
                  قم بتخصيص سلوك المساعدة وطريقة تفاعلها مع المستخدمين
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">رسالة الترحيب</Label>
                  <Textarea
                    id="welcomeMessage"
                    placeholder="الرسالة التي ستظهر عند بدء المحادثة..."
                    value={formData.welcomeMessage}
                    onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">نبرة المحادثة</Label>
                  <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">ودود</SelectItem>
                      <SelectItem value="professional">احترافي</SelectItem>
                      <SelectItem value="casual">عادي</SelectItem>
                      <SelectItem value="formal">رسمي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxResponseLength">الحد الأقصى لطول الرد (كلمات)</Label>
                  <Input
                    id="maxResponseLength"
                    type="number"
                    value={formData.maxResponseLength}
                    onChange={(e) => handleInputChange('maxResponseLength', parseInt(e.target.value))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>تفعيل سجل المحادثات</Label>
                    <p className="text-sm text-muted-foreground">
                      السماح للمساعدة بتذكر المحادثات السابقة
                    </p>
                  </div>
                  <Switch
                    checked={formData.enableHistory}
                    onCheckedChange={(checked) => handleInputChange('enableHistory', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>المظهر</CardTitle>
                <CardDescription>
                  قم بتخصيص مظهر واجهة المساعدة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">اللون الأساسي</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-secondary/20">
                  <h4 className="font-semibold mb-4">معاينة المساعدة</h4>
                  <div className="bg-background rounded-lg border p-4 space-y-3">
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: formData.primaryColor }}>
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 bg-secondary rounded-lg p-3">
                        <p className="text-sm">{formData.welcomeMessage}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[70%]">
                        <p className="text-sm">مرحبًا! أحتاج إلى مساعدة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

