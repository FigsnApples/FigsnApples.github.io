const draftKey='omeed-music-draft-v2';
const form=document.querySelector('#music-form'),fields=document.querySelector('#song-fields'),status=document.querySelector('#editor-status');
let config=window.MUSIC_CONFIG||{description:'',artistUrl:'',songs:[]};
try{const draft=JSON.parse(localStorage.getItem(draftKey));if(draft&&Array.isArray(draft.songs))config=draft;}catch{}
function addSong(song={}){
if(fields.children.length>=12){status.textContent='You can feature up to 12 songs.';return;}
const row=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent='Featured track';row.append(legend);
[['Title (optional)','title','text'],['Spotify track link','url','url'],['Personal note (optional)','note','text']].forEach(([label,key,type])=>{const l=document.createElement('label');l.textContent=label;const input=document.createElement('input');input.type=type;input.dataset.key=key;input.value=typeof song[key]==='string'?song[key]:'';input.maxLength=key==='url'?500:300;input.required=key==='url';if(key==='url')input.placeholder='https://open.spotify.com/track/…';l.append(input);row.append(l)});
const remove=document.createElement('button');remove.type='button';remove.className='button';remove.textContent='Remove track';remove.addEventListener('click',()=>row.remove());row.append(remove);fields.append(row);
}
const artistFields=document.querySelector('#artist-fields');
function addArtist(artist={}){
if(artistFields.children.length>=12){status.textContent='You can add up to 12 artist pages.';return;}
const row=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent='Artist page';row.append(legend);
[['Artist name','name','text'],['Spotify artist link','url','url']].forEach(([label,key,type])=>{const l=document.createElement('label');l.textContent=label;const input=document.createElement('input');input.type=type;input.dataset.key=key;input.value=typeof artist[key]==='string'?artist[key]:'';input.maxLength=key==='url'?500:100;input.required=true;if(key==='url')input.placeholder='https://open.spotify.com/artist/…';l.append(input);row.append(l)});
const remove=document.createElement('button');remove.type='button';remove.className='button';remove.textContent='Remove artist';remove.addEventListener('click',()=>row.remove());row.append(remove);artistFields.append(row);
}
document.querySelector('#add-artist').addEventListener('click',()=>addArtist());
function populate(c){document.querySelector('#description').value=c.description||'';artistFields.replaceChildren();(c.artists||(c.artistUrl?[{name:'Artist',url:c.artistUrl}]:[])).slice(0,12).forEach(addArtist);fields.replaceChildren();(c.songs||[]).slice(0,12).forEach(addSong);window.renderMusic(c);}
function collect(){if(!form.reportValidity())return null;const artists=[];for(const row of artistFields.children){const artist={};row.querySelectorAll('input').forEach(i=>artist[i.dataset.key]=i.value.trim());if(!window.validSpotify(artist.url,'artist')){status.textContent='Each artist needs a valid Spotify artist page URL.';return null;}artist.url=window.validSpotify(artist.url,'artist');artists.push(artist);}
const songs=[];for(const row of fields.children){const song={};row.querySelectorAll('input').forEach(i=>song[i.dataset.key]=i.value.trim());if(!window.validSpotify(song.url,'track')){status.textContent='Each song needs a valid Spotify track URL. Albums, playlists, and shortened links are not supported.';return null;}song.url=window.validSpotify(song.url,'track');songs.push(song);}
return {description:document.querySelector('#description').value.trim(),artists,songs};}
function save(c){window.renderMusic(c);try{localStorage.setItem(draftKey,JSON.stringify(c));status.textContent='Draft saved in this browser. Download the configuration to publish it on GitHub.';}catch{status.textContent='Preview updated. Browser storage is unavailable; download your configuration to keep it.';}}
form.addEventListener('submit',e=>{e.preventDefault();const c=collect();if(c)save(c)});
document.querySelector('#add-song').addEventListener('click',()=>addSong());
document.querySelector('#download').addEventListener('click',()=>{const c=collect();if(!c)return;save(c);const blob=new Blob(['window.MUSIC_CONFIG = '+JSON.stringify(c,null,2)+';\n'],{type:'text/javascript'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='music-config.js';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Configuration downloaded. Replace music-config.js in the GitHub repository to update the public site.';});
document.querySelector('#reset').addEventListener('click',()=>{if(!confirm('Discard your local draft and restore the published music settings?'))return;try{localStorage.removeItem(draftKey)}catch{}populate(window.MUSIC_CONFIG||{});status.textContent='Restored published settings. No changes were made to the public site.';});
populate(config);
