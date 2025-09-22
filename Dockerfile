# #node block


# FROM node:alpine3.16 as nodework
# WORKDIR /subscription
# COPY package.json .
# RUN npm install --leagcy-per-deps
# COPY . .
# RUN npm run build

# # release step
# FROM nginx:1.21.5-alpine as release
# COPY --from=build /subscription/build /usr/share/nginx/html/
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]



FROM node:16.16 as build 

WORKDIR /app

COPY package*.json .

RUN npm install --legacy-peer-dep

COPY . .

RUN mkdir -p /app/build

ENTRYPOINT [ "sh","./build_script.sh"]
