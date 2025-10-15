import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bot, 
  Plus, 
  Search, 
  LogOut, 
  Settings, 
  Copy, 
  ExternalLink,
  Edit,
  Trash2,
  BarChart3
} from 'lucide-react'
import { toast } from 'sonner'

export default function DashboardPage({ user, onLogout }) {
  const navigate = useNavigate()
  const [assistants, setAssistants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Simulate loading assistants from API
    const mockAssistants = [
      {
        id: 'ast-1',
        name: 'مساعد خدمة العملاء',
        description: 'مساعد ذكي للرد على استفسارات العملاء على مدار الساعة',
        status: 'published',
        url: `${window.location.origin}/assistant/ast-1`,
        views: 1234,
        createdAt: '2025-01-15',
      },
      {
        id: 'ast-2',
        name: 'مساعد الدعم التقني',
        description: 'يساعد في حل المشاكل التقنية وتقديم الإرشادات الفنية',
        status: 'draft',
        url: `${window.location.origin}/assistant/ast-2`,
        views: 0,
        createdAt: '2025-01-20',
      },
      {
        id: 'ast-3',
        name: 'مساعد المبيعات',
        description: 'يساعد في عملية البيع وتقديم معلومات عن المنتجات',
        status: 'published',
        url: `${window.location.origin}/assistant/ast-3`,
        views: 856,
        createdAt: '2025-01-18',
      },
    ]
    setAssistants(mockAssistants)
  }, [])

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url)
    toast.success('تم نسخ الرابط بنجاح!')
  }

  const handleDelete = (id) => {
    setAssistants(assistants.filter(a => a.id !== id))
    toast.success('تم حذف المساعدة بنجاح!')
  }

  const filteredAssistants = assistants.filter(assistant =>
    assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">منصة المساعدات الذكية</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">مرحبًا، {user.name}</span>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>إجمالي المساعدات</CardDescription>
              <CardTitle className="text-3xl">{assistants.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>المساعدات المنشورة</CardDescription>
              <CardTitle className="text-3xl">
                {assistants.filter(a => a.status === 'published').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>إجمالي المشاهدات</CardDescription>
              <CardTitle className="text-3xl">
                {assistants.reduce((sum, a) => sum + a.views, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن مساعدة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link to="/create">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              إنشاء مساعدة جديدة
            </Button>
          </Link>
        </div>

        {/* Assistants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssistants.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد مساعدات</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'لم يتم العثور على نتائج' : 'ابدأ بإنشاء مساعدتك الأولى'}
              </p>
              {!searchQuery && (
                <Link to="/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    إنشاء مساعدة جديدة
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            filteredAssistants.map((assistant) => (
              <Card key={assistant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={assistant.status === 'published' ? 'default' : 'secondary'}>
                      {assistant.status === 'published' ? 'منشور' : 'مسودة'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{assistant.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {assistant.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <BarChart3 className="h-4 w-4" />
                    <span>{assistant.views} مشاهدة</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleCopyLink(assistant.url)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      نسخ الرابط
                    </Button>
                    <Link to={`/assistant/${assistant.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        فتح
                      </Button>
                    </Link>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      تعديل
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(assistant.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

