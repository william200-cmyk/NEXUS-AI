




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05JSUlHdWwyT3Rra25iUTkzK3VJTXZqU0FUNU1tUUxYSlNpNnRmMUdYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZEdMNUhtQmtXY25RMjgyakY3eUxabVFXbnBFM0lBUDVZZUttU20rNXJYYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRWwvRDBjUVRIa0ZZNTIrV2V2QlFTaStQYTQyd28zTzlLVzFXWHRMYTM0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEeHBicnFGMkxnaTNHUUwwSklZVlRyQTV0N3pPNHJVRVd1R2lHNzF4dWxnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9CYTZVTERNOFpvczFJUVNSN3ljb0l3WTNlNHl3NTdnUXZZeFlNcStHMXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik52em1zWU1reTN3Y0trc1B3blN6QmRJb203VzZKS1VpbHRxaXBaVk5kVk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0lGSFN3emRiaGptY0hobXB5U1BRRVcxelZ5Y3UwU09tanRwTkxkSENFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVlc0QWIyWHVibDVFS0lKQVBNN2t2WXQvZXR5aTNGNzlKeEdzU2R2eVpSdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdRMU1NZ0pJNzB4a2JQS1d4Q3JEcG1DdlBvUkFKZ2VQUXk5OWd3dExVc3ROSnAxQmdIc21UY2hFaXlMN2hObVRtaVlsck9rZ3R6NHdOY0xGWTkxVEFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE0LCJhZHZTZWNyZXRLZXkiOiJGQzJHUGVoTzhkTVR1Vm1EeXNqWjhHUi9pTUp1U0x2ZDB4R050ekQ0NnFRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNzY5ODExMzk3M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTY2NDJFQkE2QjE5OTAxNkU4MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyMjI4NjgwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzc2OTgxMTM5NzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E4MjJFQjIzODFBNTkzODM5NEYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjIyODY4M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3Njk4MTEzOTczQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQ0IxMDQ4MDFDN0MxQzg4MkVCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIyMjg2OTF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjZKSEJUMzg2IiwibWUiOnsiaWQiOiIyMzc2OTgxMTM5NzM6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJDYXRoeSDhj6bhjqrhjqHhjqoiLCJsaWQiOiIyNTI5MDk3MzY0ODQ5Mzg6MkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kzRGk1UUpFTGZHdzhNR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImFhZ0VjNmlkNDEwQ1I5S2ZBR0pPeFB0d0lhL3Jsai9rcDR1SzNUQmZld1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlYrNEFIc1h1VkhXTWZMbjRqQ1lXYXVjdTRzSG1xK25KYndER1JyVjkvaWpSWWdyRUhBRC92aGRuSzgwZkF1V2wxZFd1L25NK3djYVZSRkI0ZmJGNUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOY1lCTFFGWkRSc0xIM2JVYzJWRFdEbkhSSFk2aFBZN1RqMVlMUXVIK0crTjJNRTBRSWw0VlFiSitSNkNySEhqR2pzRVJiTjlQUUhmOThtNXoyVmhCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY5ODExMzk3MzoyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldtb0JIT29uZU5kQWtmU253QmlUc1Q3Y0NHdjY1WS81S2VMaXQwd1gzc0cifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MjIyODY3NywibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU0yWiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254799056874",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Pkdriller01",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
