interface AIResponse {
  content: string;
  isComplete: boolean;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // Using OpenRouter API - replace with your actual API key
    // this.apiKey = process.env.REACT_APP_OPENROUTER_API_KEY || 'your-api-key-here';
    this.apiKey ='your-api-key-here';
    this.baseUrl = 'https://openrouter.ai/api/v1';
  }

  async *streamResponse(messages: AIMessage[]): AsyncGenerator<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Wele Learning Platform'
        },
        body: JSON.stringify({
          model: 'microsoft/wizardlm-2-8x22b',
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              yield { content: '', isComplete: true };
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                yield { content, isComplete: false };
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback to mock response for demo
      const mockResponse = "I'm here to help you with your learning journey! This is a demo response since the AI service is not configured with a valid API key.";
      for (const char of mockResponse) {
        await new Promise(resolve => setTimeout(resolve, 30));
        yield { content: char, isComplete: false };
      }
      yield { content: '', isComplete: true };
    }
  }

  async generateSummary(videoTitle: string, duration: number): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: `Generate a concise summary for a video lesson titled "${videoTitle}" that is ${Math.floor(duration / 60)} minutes long. Include key learning points and takeaways.`
      }
    ];

    let summary = '';
    for await (const chunk of this.streamResponse(messages)) {
      if (!chunk.isComplete) {
        summary += chunk.content;
      }
    }
    return summary || 'Summary generation failed. Please try again.';
  }
}

export const aiService = new AIService();
export type { AIMessage, AIResponse };