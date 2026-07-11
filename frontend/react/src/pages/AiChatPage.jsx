import { useState } from 'react'
import api from '../api/axios'

function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your Explore India travel assistant. Ask me anything about travelling in India!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    api.post('/ai-chat/', { message: input })
      .then((response) => {
        const aiMessage = { role: 'assistant', content: response.data.reply }
        setMessages((prev) => [...prev, aiMessage])
        setLoading(false)
      })
      .catch(() => {
        const errorMessage = { role: 'assistant', content: 'Sorry something went wrong. Please try again!' }
        setMessages((prev) => [...prev, errorMessage])
        setLoading(false)
      })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Travel Assistant</h1>
      <p className="text-gray-500 mb-6">Ask me anything about travelling in India!</p>

      {/* Chat Messages */}
      <div className="border rounded-xl p-4 mb-4 h-96 overflow-y-auto flex flex-col gap-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-orange-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl rounded-bl-none text-sm">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about places, food, festivals..."
          className="flex-1 border rounded-lg px-4 py-3 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>

      {/* Quick Questions */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Quick questions —</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Best places in Kerala?",
            "Food to try in Rajasthan?",
            "Best time to visit Goa?",
            "Hidden gems in India?"
          ].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="text-sm border border-orange-300 text-orange-500 px-3 py-1 rounded-full hover:bg-orange-50 transition"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIChatPage