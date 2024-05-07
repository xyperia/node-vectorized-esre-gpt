// ####################################################
// Package Initialization

const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
require('dotenv').config()

// ####################################################
// Variable Declarations

const TelegramToken = `${process.env.BOTTOKEN}`;
const ElasticAPIKey = `${process.env.ELKAPIKEY}`;
const ChatGPTKey = `${process.env.VTIGPTKEY}`;
const ElasticURL = `${process.env.ELKURL}`;
const ElasticUser = `${process.env.ELKUSER}`;
const ElasticPassword = `${process.env.ELKPASS}`;

// Elastic Search Application Name
const indexName = 'search-virtusindonesia-website'

// ChatGPT API URL
const gptURL = 'https://api.openai.com/v1/chat/completions';

// Telegram Bot Init
const bot = new TelegramBot(TelegramToken, { polling: true });

// Telegram Start Listening on New Message
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  // Remove all return char
  const messageText = msg.text.replace(/[^a-zA-Z ]/g, "");
  const fullQuery = `curl -s --location --request POST '${ElasticURL}/${indexName}/_search' -k -u ${ElasticUser}:${ElasticPassword} --header 'Authorization: apiKey ${ElasticAPIKey}' --header 'Content-Type: application/json' -d '{"query": { "nested": { "path": "passages", "query": { "text_expansion": { "passages.vector.predicted_value": { "model_id": ".elser_model_2_linux-x86_64", "model_text": "${messageText}" } } }, "inner_hits": { "_source": "false", "fields": [ "passages.text" ]}}}}'`;
  
  // console.log(fullQuery);
  // Send search request to Elastic App Search based on received message from Telegram
  exec(`${fullQuery}`, (error, stdout, stderr) => {

    // Prompt text for ChatGPT
    // let prompt = `
    //   You are a helpful assistant.
    //   Answer the following question: ${messageText}.
    //   by using the following text: ${JSON.parse(stdout).hits.hits[0]._source.content}.
    //   Do not search for answer outside of the given text
    // `;

    // console.log(JSON.parse(stdout).hits.hits[0]);

    console.log(stdout, error, stderr);

    let prompt = `
      You are a helpful AI assistant who answers questions using the following supplied context. If you can't answer the question using this context say "I don't know"

      Context: "${JSON.parse(stdout).hits.hits[0]._source.passages[0].text[0]}"
      Question: "${messageText}"
    `;

    // jawab menggunakan teks berikut: ${JSON.parse(stdout).hits.hits[0]._source.content}.

    // Remove all double quotes from prompt
    prompt = JSON.stringify(prompt.replace(/['"]+/g, ''));

    // Send request to ChatGPT
    exec(`curl -s ${gptURL} -H "Authorization: Bearer ${ChatGPTKey}" -H "Content-Type: application/json" -d '{ "model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": ${prompt}}]  }'`, (error2, stdout2, stderr2) => {
        
        // Convert the response to JSON object
        let gptResponse = JSON.parse(stdout2);

        // Get only the response message
        let chatReply = gptResponse.choices[0].message.content

        // Reply Telegram message with the response from ChatGPT
        bot.sendMessage(chatId, ''+chatReply);
    
      });

  });

});