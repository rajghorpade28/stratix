const { spawnSync } = require('child_process');

const envs = {
  DATABASE_URL: "postgresql://postgres.vbshawsdzbtjucfpapeg:WelcomeThankyou%4026dgsd@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
  DIRECT_URL: "postgresql://postgres.vbshawsdzbtjucfpapeg:WelcomeThankyou%4026dgsd@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
  RESEND_API_KEY: "re_RhaGYQE3_377NVXahCrp2aXwouuPC4jbM",
  AUTH_SECRET: "f2bd3f6b4e9f5e1837a1c8b32d66d71b3e8a4d7d100d0e51b14a229a43a01a35",
  NEXT_PUBLIC_APP_URL: "https://stratix.agency"
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
