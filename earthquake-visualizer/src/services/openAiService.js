import axios from "axios";
import 'process/browser';
import 'vm-browserify';

export const generateInsights = async (earthquakes) => {
  const prompt = `Summarize the earthquake data: ${JSON.stringify(earthquakes.slice(0, 10))}`;
  
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", // Updated endpoint
      {
        model: "gpt-3.5-turbo",  // You can also use "gpt-4" if available
        messages: [
          {
            role: "system",
            content: "You are an assistant that provides earthquake data insights."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 150
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    // Returning the response text
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Error generating insights";
  }
};


// export const generateInsights = async (earthquakes) => {
//   const prompt = `Summarize the earthquake data: ${JSON.stringify(earthquakes.slice(0, 10))}`;

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo", // Or "gpt-4" if available
//         messages: [
//           {
//             role: "system",
//             content: "You are an assistant that provides earthquake data insights.",
//           },
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         max_tokens: 150,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.choices[0].message.content.trim();
//   } catch (error) {
//     console.error("Error generating insights:", error);
//     return "Error generating insights";
//   }
// };



// export const generateInsights = async (earthquakes) => {
//   const prompt = `Summarize the earthquake data: ${JSON.stringify(earthquakes.slice(0, 10))}`;
//   const MAX_RETRIES = 3; // Number of retry attempts
//   let retries = 0;

//   while (retries < MAX_RETRIES) {
//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo", // Or "gpt-4" if available
//           messages: [
//             { role: "system", content: "You are an assistant that provides earthquake data insights." },
//             { role: "user", content: prompt },
//           ],
//           max_tokens: 150,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//           },
//         }
//       );

//       // Return the successful response
//       return response.data.choices[0].message.content.trim();
//     } catch (error) {
//       if (error.response && error.response.status === 429) {
//         retries++;
//         const waitTime = Math.pow(2, retries) * 1000; // Exponential backoff
//         console.warn(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
//         await new Promise((resolve) => setTimeout(resolve, waitTime));
//       } else {
//         console.error("Error generating insights:", error);
//         return "Error generating insights";
//       }
//     }
//   }

//   return "Failed to generate insights after multiple attempts.";
// };


// export const generateInsights = async (earthquakes) => {
//   const prompt = `Summarize the top 5 earthquakes: ${JSON.stringify(earthquakes.slice(0, 5))}`;

//   const MAX_RETRIES = 5;
//   let retries = 0;

//   while (retries < MAX_RETRIES) {
//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             { role: "system", content: "You are an assistant that provides earthquake data insights." },
//             { role: "user", content: prompt },
//           ],
//           max_tokens: 150,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//           },
//         }
//       );
//       return response.data.choices[0].message.content.trim();
//     } catch (error) {
//       if (error.response && error.response.status === 429) {
//         retries++;
//         const waitTime = Math.pow(2, retries) * 1000; // Exponential backoff
//         console.warn(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
//         await new Promise((resolve) => setTimeout(resolve, waitTime));
//       } else {
//         console.error("Error generating insights:", error);
//         return "Error generating insights";
//       }
//     }
//   }
//   return "Failed to generate insights after multiple attempts.";
// };


// const requestQueue = [];
// let isProcessing = false;
// const MAX_RETRIES = 5; // Maximum number of retries for 429 errors
// const INITIAL_BACKOFF_DELAY = 1000; // 1 second initial delay

// const processQueue = async () => {
//   if (isProcessing || requestQueue.length === 0) return;

//   isProcessing = true;
//   const { resolve, reject, request, retryCount } = requestQueue.shift();

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify(request.body),
//     });

//     // Handle rate limiting (429 Too Many Requests)
//     if (response.status === 429) {
//       const retryAfter = response.headers.get("Retry-After");
//       const delay = (retryAfter ? parseInt(retryAfter, 10) : Math.pow(2, retryCount)) * 1000; // Exponential backoff
//       console.warn(`Rate limit exceeded. Retrying after ${delay} ms...`);

//       // Retry if we haven't exceeded MAX_RETRIES
//       if (retryCount < MAX_RETRIES) {
//         requestQueue.unshift({
//           resolve,
//           reject,
//           request,
//           retryCount: retryCount + 1, // Increment retry count
//         });

//         setTimeout(() => {
//           isProcessing = false;
//           processQueue();
//         }, delay);
//       } else {
//         reject(new Error("Exceeded max retries for rate limiting"));
//       }
//       return;
//     }

//     // Handle other non-OK responses
//     if (!response.ok) {
//       const errorData = await response.json();
//       const errorMessage = errorData.error?.message || `HTTP ${response.status}`;
//       throw new Error(`API Error: ${errorMessage}`);
//     }

//     // Process successful response
//     const data = await response.json();
//     resolve(data.choices[0].message.content.trim());
//   } catch (error) {
//     console.error("Error in processQueue:", error.message || error); // Log meaningful error
//     reject(new Error(error.message || JSON.stringify(error))); // Pass meaningful error to the promise
//   } finally {
//     isProcessing = false;
//     processQueue(); // Continue processing the next request in the queue
//   }
// };

// // Function to enqueue a request
// const enqueueRequest = (request) =>
//   new Promise((resolve, reject) => {
//     requestQueue.push({ resolve, reject, request, retryCount: 0 });
//     processQueue();
//   });

// // Function to generate insights
// export const generateInsights = async (earthquakes) => {
//   const prompt = `Summarize the earthquake data: ${JSON.stringify(earthquakes.slice(0, 10))}`;
//   return enqueueRequest({
//     body: {
//       model: "gpt-3.5-turbo", // Use gpt-4 if needed
//       messages: [
//         { role: "system", content: "You are an assistant that provides earthquake data insights." },
//         { role: "user", content: prompt },
//       ],
//       max_tokens: 150,
//     },
//   });
// };


