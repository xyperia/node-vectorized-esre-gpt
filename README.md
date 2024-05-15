## Telegram ChatBot with ElasticSearch and ChatGPT Integration

![image](https://github.com/xyperia/node-vectorized-esre-gpt/assets/37976747/7d799ddf-697d-40f2-9c6a-95fefcddde54)

This Node.js application integrates a Telegram chatbot with ElasticSearch for search functionalities and utilizes ChatGPT for generating conversational responses. It fetches search results from ElasticSearch based on user queries received via Telegram, then prompts ChatGPT with contextual information to generate relevant responses.

### Setup Instructions

1. **Install Dependencies**
   - Ensure you have Node.js installed on your system.
   - Run `npm install` to install the required dependencies specified in `package.json`.

2. **Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
     ```
     BOTTOKEN=YOUR_TELEGRAM_BOT_TOKEN
     ELKAPIKEY=YOUR_ELASTICSEARCH_API_KEY
     VTIGPTKEY=YOUR_CHATGPT_API_KEY
     ELKURL=YOUR_ELASTICSEARCH_URL
     ELKUSER=YOUR_ELASTICSEARCH_USERNAME
     ELKPASS=YOUR_ELASTICSEARCH_PASSWORD
     ```
   - Replace `YOUR_TELEGRAM_BOT_TOKEN`, `YOUR_ELASTICSEARCH_API_KEY`, `YOUR_CHATGPT_API_KEY`, `YOUR_ELASTICSEARCH_URL`, `YOUR_ELASTICSEARCH_USERNAME`, and `YOUR_ELASTICSEARCH_PASSWORD` with your respective API keys and Elasticsearch credentials.

3. **Telegram Bot Initialization**
   - Create a new Telegram bot using [BotFather](https://core.telegram.org/bots#6-botfather).
   - Obtain the bot token and replace `YOUR_TELEGRAM_BOT_TOKEN` with it in the `.env` file.

4. **ElasticSearch Setup**
   - Set up an instance of ElasticSearch and obtain the necessary credentials.
   - Replace `YOUR_ELASTICSEARCH_API_KEY`, `YOUR_ELASTICSEARCH_URL`, `YOUR_ELASTICSEARCH_USERNAME`, and `YOUR_ELASTICSEARCH_PASSWORD` with your ElasticSearch configuration.

5. **ChatGPT Setup**
   - Obtain an API key for ChatGPT from the OpenAI platform.
   - Replace `YOUR_CHATGPT_API_KEY` with your ChatGPT API key in the `.env` file.

6. **Running the Application**
   - Execute `node index.js` to start the application.
   - Your Telegram bot is now active and ready to respond to messages.

### Usage

- Send messages to your Telegram bot to trigger responses.
- The bot will search for relevant content in ElasticSearch based on the received message and generate responses using ChatGPT.

### Additional Notes

- Ensure your ElasticSearch instance is configured correctly and contains the necessary data for search functionality.
- Monitor API usage and manage rate limits for both ElasticSearch and ChatGPT to avoid exceeding quotas.

### License

This project is licensed under the [MIT License](LICENSE).
