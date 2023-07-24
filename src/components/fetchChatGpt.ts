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
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      };
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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`
    },
    body: JSON.stringify(params)
  });

  if(!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  console.log(message, data);
  return data as Result;
}
 


    