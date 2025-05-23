FROM node:18-bullseye

RUN apt-get update && apt-get install -y \
  wget gnupg unzip curl python3 make g++ \
  fonts-liberation libappindicator3-1 libasound2 \
  libatk-bridge2.0-0 libnspr4 libnss3 libxss1 \
  libxcomposite1 libxcursor1 libxdamage1 libxi6 \
  libxtst6 xdg-utils

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && apt-get install -y google-chrome-stable

WORKDIR /app
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
