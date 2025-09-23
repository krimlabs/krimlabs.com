---
publishedOn: 2025-09-23T14:32:00.000+05:30
title: Turning WhatsApp Into Your Document Pipeline
subTitle: null
canonicalUrl: null
featured: false
heroImg: /img/content/posts/whatsapp-doc-classifier.png
slug: whatsapp-doc-classification-pipeline
tags:
  - ai
relatedSlugs:
  - card-ui-resources-list
  - impeccable-communications-framework
author: shivekkhurana
---

## The Problem: Document Chaos in a Physical Commodities Trading Shop

Picture this: a steel trading business where suppliers, customers, and logistics partners are constantly sharing documents through WhatsApp. Invoices arrive as PDFs, delivery challans as images, e-way bills as screenshots. Each document tells a story about the business, but they're scattered across message threads, buried in chat history, and impossible to search or organize.

On one hand, WhatsApp is perfect for quick document sharing—everyone's already there, it's instant, and it works on any device. On the other hand, it's a terrible filing system. Documents get lost in the noise, there's no metadata, and good luck finding that invoice from three months ago.

I observed my father's team spending hours every week manually downloading, renaming, and organizing these documents for audit purposes. They had dedicated team members physically spending time on this repetitive task. The friction was real: download from WhatsApp, rename with proper dates, figure out what type of document it was, upload to Dropbox, organize by month. Rinse and repeat.

## Crossing the Threshold: The Automation Mindset

The turning point came when I realized the team was essentially building a document processing pipeline by hand. Every week, they were doing the same sequence of operations:

1. Sync messages from WhatsApp
2. Extract media files
3. Convert PDFs to searchable text
4. Classify document types
5. Upload to organized cloud storage

Why were they doing this manually when I could teach a computer to do it?

The architecture started to crystallize in my mind. They needed a system that could:

* Automatically sync WhatsApp messages (including media)
* Process documents with OCR and AI classification
* Organize files with proper naming and folder structure
* Handle the entire pipeline without human intervention

## Trials & Building: The Chakki Architecture

I called it Chakki—Hindi for "mill" or "grinder"—because that's exactly what it does: it grinds through your document chaos and produces something organized and useful.

### The Pipeline Architecture

Chakki is built around a simple but powerful pipeline architecture. Think of it like plumbing—each component has a single responsibility, and data flows through them in sequence:

```
WhatsApp → SQLite → OCR → AI Classification → Dropbox
```

Let me walk you through each component:

**Message Sync (`syncMessages.ts`)**
The foundation is a WhatsApp Web client that connects to your group and syncs messages. I'm using `whatsapp-web.js` with Puppeteer for browser automation. The tricky part here is handling the QR code authentication and ensuring the client stays connected long enough to sync messages.

```typescript
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});
```

The sync process downloads media files and stores everything in SQLite. I'm storing rich metadata: sender info, timestamps, media types, even forwarded message context. This metadata becomes crucial later for organizing and understanding the documents.

**Document Processing (`convertToMarkdown.ts`)**
PDFs get converted to Markdown using `markitdown`—a Python tool that does surprisingly good OCR. I'm only processing PDFs here because image OCR accuracy is still hit-or-miss. For images, I pass them directly to the vision model.

**AI Classification (`classifyDocuments.ts`)**
This is where the magic happens. I'm using OpenRouter to access multiple AI models:

* Vision model (`llama-3.2-11b-vision`) for image classification
* Text model (`llama-3.1-nemotron-ultra-253b`) for markdown content analysis

The classification prompt is carefully crafted for steel trading documents:

```typescript
const prompt = generatePrompt({
  role: "Document Classifier",
  objective: `Classify into: "Invoice", "Bill", "DeliveryChallan", "EWayBill", "Uncategorized"`,
  background: "Steel trading company RR Steels",
  instructions: [
    "Invoice if it contains IRN number and seller is RR Steels",
    "Bill if billed to RR Steels and contains TAX INVOICE",
    "DeliveryChallan if contains 'delivery challan' or 'delivery note'",
    "EWayBill if contains 'e-way bill'",
  ],
});
```

**Cloud Storage (`uploadToDropbox.ts`)**
Files get uploaded to Dropbox with intelligent naming: `15-January-2024--2-30PM--[invoice-body].pdf`. The folder structure is organized by year-month, and each file includes timestamp, message ID, and document body for easy searching.

### The Database Schema

The heart of Chakki is a simple but effective SQLite schema:

```sql
-- Messages table stores all WhatsApp data
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  body TEXT NOT NULL,
  from_name TEXT NOT NULL,
  has_media BOOLEAN NOT NULL,
  media_filepath TEXT,
  -- ... other fields
);

-- Message extracts tracks processing status
CREATE TABLE message_extracts (
  id TEXT PRIMARY KEY,
  message_id TEXT REFERENCES messages(id),
  classification TEXT,
  is_uploaded_to_dropbox BOOLEAN DEFAULT FALSE,
  classification_error TEXT,
  file_upload_error TEXT
);
```

This separation allows me to track processing status independently of the raw message data. If classification fails, I can retry without losing the original message.

### Automation with macOS LaunchAgent

The real beauty is in the automation. Chakki runs as a macOS LaunchAgent every 30 minutes during business hours (8 AM to 8 PM). The plist file orchestrates the entire pipeline:

```xml
<string>
  export PATH=/usr/local/bin:/Users/shivekkhurana/.nvm/versions/node/v23.11.0/bin:$PATH && \
  cd /Users/shivekkhurana/Wip/chakki && \
  yarn run task:sync && \
  yarn run task:ocr && \
  yarn run task:upload
</string>
```

Each task runs independently, and the pipeline is resilient to failures. If OCR fails, the next run will pick up where it left off.

## What I Learned In The Process ?

Building Chakki taught me several important lessons about automation and document processing:

**1. Start with the data model**
The SQLite schema became the foundation for everything else. Getting the message structure right upfront made all subsequent processing much cleaner. I'm still figuring out the best way to handle edge cases like forwarded messages and group mentions, but the core structure is solid.

**2. AI classification is unreliable** 
I was skeptical about using free models for document classification, but the results are impressive. For printed pdfs, the vision model correctly identifies document types 90%+ of the time, and the text model handles markdown content even better.
\
But for screenshots and hand written notes, even the SOTA models fail. The key is crafting domain-specific prompts with clear examples.

**3. Error handling is everything**
Document processing pipelines fail in interesting ways. Network timeouts, corrupted files, API rate limits—each failure mode needs graceful handling. Chakki logs everything and continues processing even when individual documents fail.

**4. Metadata is gold**
The WhatsApp metadata (sender, timestamp, forwarded context) becomes incredibly valuable for organizing documents. A delivery challan from "Logistics Partner A" at 2 PM on Tuesday tells a different story than the same document forwarded by a customer.

**5. Automation changes everything**
Running Chakki for a few weeks, the team has processed hundreds of documents without thinking about it. The system just works in the background, turning chaos into order. It's like having a personal assistant who never sleeps.


## What's Next?

Chakki is working well for RR Steels. If you have a tiring manual process that you'd like AI robots to do, feel free to contact me.
