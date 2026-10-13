import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const file='src/data/listings.json';
const before=existsSync(file)?JSON.parse(readFileSync(file,'utf8')):null;
for(const script of ['scripts/sync-listings.mjs','scripts/optimise-listings.mjs','scripts/prepare-site.mjs']){
 const run=spawnSync(process.execPath,[script],{stdio:'inherit',env:process.env});
 if(run.status!==0)process.exit(run.status||1);
}
const after=JSON.parse(readFileSync(file,'utf8'));
if(before&&JSON.stringify(before.listings)===JSON.stringify(after.listings)){
 after.syncedAt=before.syncedAt;
 writeFileSync(file,JSON.stringify(after,null,2)+'\n');
 console.log('Public catalogue unchanged; no publication needed.');
}
