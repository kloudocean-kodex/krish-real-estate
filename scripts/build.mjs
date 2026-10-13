import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const config=JSON.parse(readFileSync('wrangler.jsonc','utf8'));
process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||= config.vars.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
for(const script of ['scripts/refresh-listings.mjs','node_modules/next/dist/bin/next']){
 const result=spawnSync(process.execPath,[script,...(script.includes('/next/')?['build']:[])],{stdio:'inherit',env:process.env});
 if(result.status!==0)process.exit(result.status||1);
}
