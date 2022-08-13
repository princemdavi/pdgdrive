const {Telegraf} = require('telegraf');
const ytdl = require('ytdl-core');

const bot = new Telegraf('5419597160:AAGF6pJzji-cCEA6A6X-B9ooipl7jmFpaAE');

bot.command('start', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Enter youtube video url: ', {
    })
})

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}

bot.on('text', (ctx) => {
    const url = ctx.update.message.text
    const isValidUrl = matchYoutubeUrl(url)
    if(!isValidUrl) return
    
    let audioStream = ytdl(url, { filter: 'audioonly'});
   
   ctx.replyWithAudio({
     source: audioStream
   })
})

bot.launch()