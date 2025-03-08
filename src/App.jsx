import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [ans, setAns] = useState('')

  async function genrateans() {
    setAns('Loading...')

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        method: 'post',
        data: {
          contents: [
            {
              parts: [
                {
                  text: 'work as a error detector and read the following code and give solutions for error if error exists' + prompt
                },
              ],
            },
          ],
        },
      })

      setAns(response.data.candidates[0].content.parts[0].text)
    } catch (error) {
      setAns('Error occurred while fetching the response.')
      console.error(error)
    }
  }

  return (
    <div>
      <h2 className='text-center'>AI Search</h2>
      <div>
        <input
          type='text'
          placeholder='Enter your prompt'
          size='70'
          style={{ height: '50px' }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={genrateans}>Search</button>
      </div>

      {/* Output Box */}
      <div className="output-box">
        <pre>{ans}</pre>
      </div>
    </div>
  )
}

export default App

