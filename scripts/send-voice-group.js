#!/usr/bin/env node
/**
 * Helper to send voice notes to WhatsApp groups using base64 buffer
 * Works around sandbox restrictions by reading file and sending as base64
 */

const fs = require('fs');
const path = require('path');

async function sendVoiceToGroup(mediaPath, groupId) {
  try {
    // Read the file as base64
    const buffer = fs.readFileSync(mediaPath);
    const base64Data = buffer.toString('base64');
    
    // Detect MIME type
    const ext = path.extname(mediaPath).toLowerCase();
    const mimeType = ext === '.mp3' ? 'audio/mpeg' : 
                     ext === '.ogg' ? 'audio/ogg' : 
                     ext === '.opus' ? 'audio/opus' : 'audio/mpeg';
    
    console.log(`File: ${mediaPath}`);
    console.log(`Size: ${(buffer.length / 1024).toFixed(2)} KB`);
    console.log(`MIME: ${mimeType}`);
    console.log(`Base64 length: ${base64Data.length} chars`);
    
    // Return the data for message tool
    return {
      buffer: base64Data,
      mimeType: mimeType
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// If called directly with args
if (require.main === module) {
  const mediaPath = process.argv[2];
  const groupId = process.argv[3] || 'Da8FTyRQ7VHG0IyGUW56T3@g.us';
  
  if (!mediaPath) {
    console.log('Usage: node send-voice-group.js <media-path> [group-id]');
    process.exit(1);
  }
  
  sendVoiceToGroup(mediaPath, groupId).then(result => {
    console.log('\nReady to send. Use this data with message tool:');
    console.log('buffer:', result.buffer.substring(0, 100) + '...');
    console.log('mimeType:', result.mimeType);
  });
}

module.exports = { sendVoiceToGroup };