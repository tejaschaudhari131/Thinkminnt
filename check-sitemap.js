
import fetch from 'node-fetch';

const url = 'https://thinkminnt.com/sitemap.xml';

async function checkSitemap() {
    try {
        console.log(`Checking ${url}...`);
        const response = await fetch(url);
        console.log(`Status: ${response.status} ${response.statusText}`);
        console.log(`Content-Type: ${response.headers.get('content-type')}`);

        const text = await response.text();
        console.log('First 100 characters:');
        console.log(text.substring(0, 100));

        if (text.trim().startsWith('<!doctype html>') || text.trim().startsWith('<!DOCTYPE html>')) {
            console.log('\nERROR: The server returned HTML instead of XML. This means the sitemap.xml file is missing and the React app is being served instead.');
        } else if (text.trim().startsWith('<?xml')) {
            console.log('\nSUCCESS: The server returned XML.');
        }
    } catch (error) {
        console.error('Error fetching sitemap:', error);
    }
}

checkSitemap();
