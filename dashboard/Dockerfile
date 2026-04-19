# --- Build React frontend ---
FROM node:22 AS client-build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# --- Backend server ---
FROM node:22

WORKDIR /app

# install server deps
COPY server/package*.json ./server/
RUN cd server && npm install

# copy server + built frontend
COPY server ./server
COPY --from=client-build /app/client/dist ./public

# serve frontend statically
RUN npm install -g serve

EXPOSE 4000 5000

CMD sh -c "node server/index.js & serve -s public -l 5000"