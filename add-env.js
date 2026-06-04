const { spawnSync } = require('child_process');

const envs = {
  EMAIL_SERVER_USER: "rajghorpade231@gmail.com",
  EMAIL_SERVER_PASSWORD: "ozfiiiieagxhobby",
  NEXT_PUBLIC_APP_URL: "https://stratix00.vercel.app"
};

for (const [key, value] of Object.entries(envs)) {
  for (const env of ['production', 'preview', 'development']) {
    console.log(`Adding ${key} to ${env}...`);
    const result = spawnSync('npx', ['vercel', 'env', 'add', key, env], {
      input: value,
      encoding: 'utf-8',
      shell: true
    });
    console.log(result.stdout || result.stderr);
  }
}
