import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Send, Loader2 } from 'lucide-react'

export default function AssistantViewPage() {
  const { id } = useParams()
  const [assistant, setAssistant] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    // Simulate loading assistant data
    const mockAssistant = {
      id: id,
      name: 'مساعد خدمة العملاء',
      description: 'مساعد ذكي للرد على استفسارات العملاء على مدار الساعة',
      welcomeMessage: 'مرحبًا! أنا مساعد خدمة العملاء. كيف يمكنني مساعدتك اليوم؟',
      primaryColor: '#000000',
    }
    setAssistant(mockAssistant)
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: mockAssistant.welcomeMessage,
        timestamp: new Date(),
      }
    ])
  }, [id])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'شكرًا لتواصلك معنا! سأكون سعيدًا بمساعدتك في حل هذه المشكلة.',
        'هذا سؤال رائع! دعني أوضح لك الأمر بالتفصيل.',
        'أفهم ما تقصده. إليك ما يمكنني مساعدتك به.',
        'بالتأكيد! يمكنني مساعدتك في ذلك. إليك المعلومات التي تحتاجها.',
      ]
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  if (!assistant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <div 
              className="h-12 w-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: assistant.primaryColor }}
            >
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle>{assistant.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{assistant.description}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'assistant' && (
                    <div 
                      className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: assistant.primaryColor }}
                    >
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[75%] ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('ar-SA', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: assistant.primaryColor }}
                  >
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="اكتب رسالتك هنا..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isTyping}
                className="flex-1"
              />
              <Button type="submit" disabled={isTyping || !inputMessage.trim()}>
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

