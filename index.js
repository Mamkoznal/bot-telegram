const TelegramApi = require('node-telegram-bot-api')

const {gameOption, againOption}= require('.option.js')

const token ='6336416280:AAHdKApe5gGm4OzktMZM0oV4sD-ob9akGTw'


const bot = new TelegramApi(token, {polling: true})
const chats={}


const StartGame=async (chstId)=>{
    await bot.sendMessage(chstId, 'Сейчас загадаю число от 0 до 9, а ты должен отгадать!')
            const randomNamber= Math.floor(Math.random()*10)
            chats[chstId]=randomNamber;
            await bot.sendMessage(chstId, 'Начинаем отгадивать', gameOption)
}

const start = () => {
    bot.setMyCommands([
        {command:'/start', description:'Начальное Приветствие'},
        {command:'/info', description:'Ваше имя'},
        {command:'/game', description:'let`s play!'}
    ])
    
    bot.on('message', async msg =>{
        const text =msg.text;
        const chstId = msg.chat.id;
        if(text==='/start'){
            await bot.sendSticker(chstId, 'https://tlgrm.ru/_/stickers/8eb/10f/8eb10f4b-8f4f-4958-aa48-80e7af90470a/1.webp')
            return bot.sendMessage(chstId, "Добро пожаловать!")
        }
        if(text==='/info'){
            return bot.sendMessage(chstId, `Тебя зовут ${msg.from.first_name} `)
        }
        if(text==='/game'){
            return StartGame(chstId);
        }
        return bot.sendMessage(chstId, 'Я тебя не understend , попробуй еще!')
        
        
    })
    bot.on('callback_query', msg=>{
            const data= msg.data;
            const ChatId = msg.message.chat.id;
            bot.sendMessage(ChatId , `Ты выбобрал цифру ${data}`);
            if (data ==='/again'){
                StartGame(ChatId)
            }
            if(data=== chats[ChatId]){
                return bot.sendMessage(ChatId, `Поздровляю ты отгадал цифру ${chats[ChatId]}`, againOption)
            }else{
                return bot.sendMessage(ChatId, `К сожелению ты не угадал , бот выбрал цифру ${chats[ChatId]} `,againOption)
            }
            
            
        })
}
start()