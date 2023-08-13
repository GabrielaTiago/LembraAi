import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.ENV}` });

const config = {
    port: Number(process.env.PORT) || 5555,
};

export default config;
