import data from './listing-summaries.json';
import type {NormalizedListing} from './listings';
export const SUMMARY_LISTINGS=data as NormalizedListing[];
export function getActiveListings(type?:'sale'|'rent'){return SUMMARY_LISTINGS.filter(l=>['active','under-offer'].includes(l.status)&&(!type||l.transactionType===type));}
export function getSoldListings(){return SUMMARY_LISTINGS.filter(l=>['sold','leased'].includes(l.status));}
