import { useState } from 'react'
import { Search, BookOpen, Brush, Info, Sparkles, Play, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { HanziAnalyzer } from './lib/hanziAnalyzer.js'
import { SimpleHanziAnimation, HanziAnimationWithControls } from './components/HanziAnimation.jsx'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [analyzedChars, setAnalyzedChars] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleAnalyze = async () => {
    if (!inputText.trim()) return
    
    setIsLoading(true)
    try {
      const results = HanziAnalyzer.analyzeText(inputText)
      setAnalyzedChars(results)
    } catch (error) {
      console.error('分析汉字时出错:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAnalyze()
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 头部 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  汉字学习助手
                </h1>
                <p className="text-sm text-gray-600">探索汉字的奥秘，学习中华文化</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              <Sparkles className="w-3 h-3 mr-1" />
              智能分析
            </Badge>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        {/* 输入区域 */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-800">输入汉字进行分析</CardTitle>
              <CardDescription>
                支持输入单个或多个汉字，获取详细的学习信息
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="请输入要学习的汉字..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // 阻止默认的表单提交行为
                      handleAnalyze();
                    }
                  }}
                  className="text-lg h-12 border-2 border-gray-200 focus:border-blue-400 transition-colors"
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={isLoading || !inputText.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      分析
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 结果展示区域 */}
        {analyzedChars.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">分析结果</h2>
              <p className="text-gray-600">共分析了 {analyzedChars.length} 个汉字</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {analyzedChars.map((charData, index) => (
                <CharCard key={index} charData={charData} />
              ))}
            </div>
          </div>
        )}

        {/* 空状态 */}
        {analyzedChars.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">开始学习汉字</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              在上方输入框中输入汉字，点击分析按钮，即可获取详细的汉字学习信息，包括拼音、笔画、部首等内容。
            </p>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">汉字学习助手 - 传承中华文化，学习汉字知识</p>
            <p className="text-sm">支持拼音、笔画、部首、结构、组词等多维度学习</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 汉字卡片组件
function CharCard({ charData }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
      <CardHeader className="text-center pb-4">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl font-bold text-white">{charData.char}</span>
        </div>
        <CardTitle className="text-lg">{charData.char}</CardTitle>
        <CardDescription className="text-base font-medium text-blue-600">
          {charData.pinyin}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="text-xs">基础</TabsTrigger>
            <TabsTrigger value="stroke" className="text-xs">笔画</TabsTrigger>
            <TabsTrigger value="extend" className="text-xs">扩展</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-3 mt-4">
            {/* 笔画动画展示 */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">笔画动画</span>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      // 触发动画的逻辑将在组件内部处理
                    }}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    播放
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <SimpleHanziAnimation char={charData.char} size={80} />
              </div>
            </div>
            
            <InfoItem label="拼音" value={charData.pinyin} />
            <InfoItem label="笔画数" value={`${charData.stroke}画`} />
            <InfoItem label="部首" value={charData.radical} />
            <InfoItem label="结构" value={charData.structure} />
            <InfoItem label="繁体" value={charData.traditional} />
            <InfoItem label="五笔" value={charData.wubi || '暂无'} />
            <InfoItem label="五行" value={charData.wuxing} />
          </TabsContent>
          
          <TabsContent value="stroke" className="space-y-3 mt-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Brush className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">笔画顺序</span>
              </div>
              
              {/* 详细的笔画动画控制 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <HanziAnimationWithControls char={charData.char} width={180} height={180} />
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{charData.stroke}</div>
                  <div className="text-sm text-gray-600">总笔画数</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">笔画分解：</div>
                <div className="grid grid-cols-4 gap-2">
                  {charData.strokeOrder?.map((stroke, index) => (
                    <div key={index} className="bg-white p-2 rounded border text-center">
                      <div className="text-xs text-gray-500">第{index + 1}笔</div>
                      <div className="text-lg font-bold text-blue-600">{stroke}</div>
                      <div className="text-xs text-gray-600">{getStrokeName(stroke)}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-2">笔画规则：</div>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• 先横后竖，先撇后捺</li>
                  <li>• 从上到下，从左到右</li>
                  <li>• 先外后内，先中间后两边</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="extend" className="space-y-3 mt-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-sm">含义</span>
                </div>
                <p className="text-sm text-gray-700 bg-green-50 p-2 rounded">
                  {charData.meaning}
                </p>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-sm">组词</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {charData.words.slice(0, 4).map((word, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="font-medium text-sm">例句</span>
                </div>
                <div className="space-y-1">
                  {charData.sentences.slice(0, 2).map((sentence, idx) => (
                    <p key={idx} className="text-xs text-gray-600 bg-purple-50 p-2 rounded">
                      {sentence}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// 获取笔画名称的辅助函数
function getStrokeName(stroke) {
  const strokeNames = {
    '一': '横',
    '丨': '竖',
    '丿': '撇',
    '丶': '点',
    '乙': '折',
    '亅': '竖钩',
    '丷': '八字头',
    '冫': '两点水',
    '冖': '秃宝盖',
    '十': '十字',
    '厂': '厂字头',
    '匚': '三匡',
    '刂': '立刀旁',
    '卜': '卜字旁',
    '占': '占字头',
    '厶': '私字旁',
    '又': '又字旁',
    '㇀': '提',
    '㇁': '横钩',
    '㇂': '竖钩',
    '㇃': '横折',
    '㇄': '横撇',
    '㇅': '横折钩',
    '㇆': '横折提',
    '㇇': '横撇弯钩',
    '㇈': '横折折撇',
    '㇉': '横折折折钩',
    '㇊': '竖提',
    '㇋': '竖弯',
    '㇌': '竖弯钩',
    '㇍': '竖折',
    '㇎': '竖折折钩',
    '㇏': '捺'
  };
  return strokeNames[stroke] || '其他';
}

// 信息项组件
function InfoItem({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-gray-600">{label}:</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  )
}

export default App

