module.exports = {
    apps: [
        {
            name: "office-listings",
            script: "npx",
            args: "serve -s -l 64047 build",
            interpreter: "none",
            watch: true,
            merge_logs: true,
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
