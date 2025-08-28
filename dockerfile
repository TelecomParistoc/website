# === Stage 1: Build ===
FROM node:24-bullseye AS builder

# Crée le dossier de travail
WORKDIR /app

# Copie package.json + package-lock.json pour installer les deps
COPY package*.json ./

# Installe les dépendances
RUN npm ci --legacy-peer-deps


# Copie tout le projet
COPY . .

# Build du projet Next.js
RUN npm run build

# === Stage 2: Run ===
FROM node:24-bullseye AS runner

WORKDIR /app

# Copie seulement les fichiers nécessaires depuis le build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.js ./

# Installe uniquement les deps de prod
ENV NODE_ENV=production
RUN npm ci --omit=dev

# Expose le port
EXPOSE 3000

# Commande pour démarrer le serveur Next.js
CMD ["npm", "start"]
