## Urgify app

  ### How to start

  1. ```npm install```

  2. create files `.env.development`, `.env.production`

  3. In the `.env` files need to be:  
    `REACT_APP_API_URL`  
    `REACT_APP_PUBLIC_SERVER_ENV`   
    `REACT_APP_GOOGLE_CLIENT_ID`  

  4.  Api Urls for stage/production in the ```src/constants/backend.ts```

  5. ```npm start```

  ### Constants description:
  `REACT_APP_API_URL` - url to backend api(more needed for development, for production or build at server must be empty)  (P.S.Maybe remove it)

  `REACT_APP_PUBLIC_SERVER_ENV` - dev(local), stage(testing on server), production(real server)
  
  `REACT_APP_GOOGLE_CLIENT_ID`  