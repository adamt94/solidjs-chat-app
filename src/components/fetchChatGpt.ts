type Result = {
    choices: {
      message: { content: string, role: string};
      index: number;
      finish_reason: string;
    }[];
    created: number;
    model: string;
  }



export const fetchChatGpt = async (message: string) => {

    const params = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. respond with markdown format",
        },
        {
          role: "user",
          content: message,
        },
      ],
    };
      
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
    },
    body: JSON.stringify(params)
  })
  if(!response.ok) {
    return { choices: [{ message: { content: "Sorry, something went wrong", role: "bot" }, index: 0, finish_reason: "error" }], created: 0, model: "" };
  }

  const data = await response.json();
  return data as Result;
}
 


    