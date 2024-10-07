//botun main dosyası 

const discord = require("discord.js");
const client = new discord.Client({ intents: Object.values(discord.Intents.FLAGS).reduce((x, y) => x + y, 0) });
const { token } = require("./src/base/settings.json");
require("./src/base/app.js")(client)

client.login(token);
//////////////////////////////////////////////////////////
const { Intents } = require('discord.js');

client.on('guildMemberRemove', async (member) => {
  const cikanSunucuID = 'ana_sunucu';
  
  
  if (member.guild.id === cikanSunucuID) {
    
    const atilacakSunucuID = 'yan_sunucu';
    
    
    const atilacakGuild = client.guilds.cache.get(atilacakSunucuID);
    
    if (atilacakGuild) {
      
      try {
        const atilacakKullanici = await atilacakGuild.members.fetch(member.id);
        await atilacakKullanici.kick('Başka sunucudan ayrıldığı için banlandı.');
        console.log(`Kullanıcı ${atilacakKullanici.user.tag}, ${atilacakGuild.name} sunucusundan atıldı.`);
      } catch (error) {
        console.error('Kullanıcı atılırken bir hata oluştu:', error);
      }
    } else {
      console.error('Sunucu bulunamadı.');
    }
  }
});
////////////////////////////////////////////////////