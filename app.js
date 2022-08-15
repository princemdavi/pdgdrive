import {Telegraf} from 'telegraf';
import express from "express"
import { uploadFile } from "./utils/gdrive.js"

const app = express()

const bot = new Telegraf('5492573091:AAHEjE6xOI6qrjDyKGhjLZ4zmn40tZVn2hQ');

bot.on('message', async (ctx) => {
  const file_id = ctx.update.message.photo?.at(-1).file_id
  
  if(file_id){
    const file_url = await ctx.telegram.getFileLink(file_id)
    await uploadFile(file_url.href)
    ctx.deleteMessage()
  }
})

bot.launch()

app.listen(process.env.PORT || 4900, console.log("app started..."))