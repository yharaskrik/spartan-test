import { defineEventHandler, getQuery } from 'h3';
import { BufferMemory } from 'langchain/memory';
import { CloudflareD1MessageHistory } from 'langchain/stores/message/cloudflare_d1';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationChain } from 'langchain/chains';

export default defineEventHandler(async (event) => {
  console.log(event);
  console.log(event.context);
  console.log(getQuery(event));

  const memory = new BufferMemory({
    chatHistory: new CloudflareD1MessageHistory({
      tableName: 'stored_message',
      sessionId: 'session',
      database: globalThis.__env__.DB,
    }),
  });

  const model = new ChatOpenAI({
    openAIApiKey: globalThis.__env__.OPENAI_API_KEY,
  });
  const chain = new ConversationChain({ llm: model, memory });
  const res = await chain.call({ input: getQuery(event)['input'] });

  return {
    response: res.response,
  };
});
