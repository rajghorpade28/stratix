const { spawnSync } = require('child_process');

const envs = {
  ADMIN_PASSWORD: "StratixAdmin@2026!"
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
