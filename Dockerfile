# Node version
FROM node:18-alpine as build

RUN apk update
RUN apk --no-cache --virtual build-dependencies add \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    python3 \
    make \
    g++


# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . /app
COPY .env.deploy .

# Install all the dependencies
RUN npm install --frozen-lockfile

# Generate the build of the application
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/next.config.js ./
COPY --from=build /app/next-i18next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
#COPY entrypoint.sh /entrypoint.sh

USER root

EXPOSE 3000

# ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["npm", "run", "start"]
