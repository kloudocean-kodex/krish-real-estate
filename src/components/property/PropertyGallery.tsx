'use client';
import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import styles from './PropertyGallery.module.css';
type Photo={url:string;alt:string;type:string};
export function PropertyGallery({media}:{media:Photo[]}){
 const [index,setIndex]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const open=index!==null;
 useEffect(()=>{
  const el=dialog.current;
  if(!open||!el)return;
  el.showModal();
  const overflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const key=(event:KeyboardEvent)=>{
   if(event.key==='ArrowRight'){event.preventDefault();setIndex(i=>((i??0)+1)%media.length);}
   if(event.key==='ArrowLeft'){event.preventDefault();setIndex(i=>((i??0)-1+media.length)%media.length);}
  };
  el.addEventListener('keydown',key);
  return()=>{el.close();document.body.style.overflow=overflow;el.removeEventListener('keydown',key);};
 },[open,media.length]);
 if(!media.length)return null;
 const photos=media.filter(m=>m.type!=='floorplan').slice(0,2);
 const photo=media[index??0];
 return <section className={styles.gallery} aria-label="Property gallery">
  <div className={styles.spread}>{photos.map((m,i)=><button key={m.url} className={styles.photo} onClick={()=>setIndex(media.indexOf(m))} aria-label={`Open property photograph ${i+1}`}><Image src={m.url} alt={m.alt} fill priority={i===0} sizes={i===0?'(max-width:1024px) 100vw, 65vw':'35vw'} /></button>)}</div>
  <button className={styles.viewAll} onClick={()=>setIndex(0)}>View all {media.length} photos &amp; plans <span aria-hidden="true">↗</span></button>
  <dialog ref={dialog} className={styles.dialog} aria-label="Property photographs and floor plans" onCancel={()=>setIndex(null)} onClose={()=>setIndex(null)}>
   <div className={styles.toolbar}><span aria-live="polite">{(index??0)+1} / {media.length} · {photo.type==='floorplan'?'Floor plan':'Property photograph'}</span><button onClick={()=>setIndex(null)} autoFocus>Close ✕</button></div>
   <div className={styles.viewer}><Image src={photo.url} alt={photo.alt} fill sizes="100vw" className={styles.fullPhoto}/></div>
   <div className={styles.controls}><button onClick={()=>setIndex(i=>((i??0)-1+media.length)%media.length)} aria-label="Previous photograph">← Previous</button><a href={photo.url} target="_blank" rel="noopener noreferrer">Open original ↗</a><button onClick={()=>setIndex(i=>((i??0)+1)%media.length)} aria-label="Next photograph">Next →</button></div>
  </dialog>
 </section>;
}
