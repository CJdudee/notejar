/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose", 
        serverComponentsExternalPackages: ['mongoose'],

        // serverActions: true,
        //server Actions is used so we can pass a server function into a client components 

    },


}



module.exports = nextConfig
