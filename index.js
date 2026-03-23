const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Vérifie si la personne a le rôle Recruteur
  if (!message.member.roles.cache.some(role => role.name === "Recruteur")) {
    return;
  }

  // Commande unique
  if (message.content.startsWith("!recrutement")) {
    const member = message.mentions.members.first();
    if (!member) return message.reply("Mentionne la personne.");

    const roleLSPD = message.guild.roles.cache.find(r => r.name === "LSPD");
    const roleVespucci = message.guild.roles.cache.find(r => r.name === "Vespucci");

    if (!roleLSPD || !roleVespucci) {
      return message.reply("Un des rôles n'existe pas.");
    }

    await member.roles.add(roleLSPD);
    await member.roles.add(roleVespucci);

    message.reply(`✅ ${member.user.tag} est maintenant LSPD + Vespucci`);
  }
});

client.login(process.env.TOKEN);
