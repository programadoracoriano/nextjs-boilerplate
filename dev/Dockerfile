FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de configuração
COPY app/package*.json ./

# Instala as dependências (isso cria a node_modules dentro do container)
RUN npm install

# Copia o resto dos arquivos (importante para o build inicial)
COPY app/ .

EXPOSE 3000

# Comando corrigido
CMD ["npm", "run", "dev"]
