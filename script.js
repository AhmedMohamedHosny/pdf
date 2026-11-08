/**
 * ============================================================================
 * AhmedPdf — All-in-One File Management & PDF Tools Platform
 * Complete Production Engine: PDF-Lib, PDF.js, JSZip, SheetJS, Mammoth,
 * Tesseract OCR, HTML5 Canvas Image Studio, IndexedDB Workspace & QA Suite
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
   * 1. COMPLETE 28-TOOL REGISTRY & SUPPORTED FORMAT MATRIX
   * ========================================================================== */
const TOOLS = [
    // --- PDF TOOLS ---
    { id: 'merge-pdf', title: 'Merge PDF', category: 'PDF', icon: '📑', accept: '.pdf', multiple: true, desc: 'Combine multiple PDF documents with optional separator or summary pages.', aliases: ['combine pdf', 'join pdf', 'دمج pdf'] },
    { id: 'split-pdf', title: 'Split PDF', category: 'PDF', icon: '✂️', accept: '.pdf', multiple: false, desc: 'Split a PDF into individual pages, custom ranges (e.g. 1-3, 5), or odd/even pages.', aliases: ['extract pages', 'تقسيم pdf'] },
    { id: 'organize-pdf', title: 'Organize PDF Pages', category: 'PDF', icon: '🗂️', accept: '.pdf', multiple: false, desc: 'Visual thumbnail studio to reorder, rotate, duplicate, and delete PDF pages.', aliases: ['reorder pdf', 'rotate pdf', 'delete pages'] },
    { id: 'compress-pdf', title: 'Compress PDF', category: 'PDF', icon: '📉', accept: '.pdf', multiple: false, desc: 'Optimize PDF page streams with configurable DPI presets and size comparison.', aliases: ['reduce pdf size', 'shrink pdf', 'ضغط pdf'] },
    { id: 'watermark-pdf', title: 'Watermark & Stamp PDF', category: 'PDF', icon: '💧', accept: '.pdf', multiple: false, desc: 'Add diagonal text, repeated grid watermarks, or official circular stamps (supports Arabic).', aliases: ['stamp pdf', 'علامة مائية', 'ختم'] },
    { id: 'pagenum-pdf', title: 'Add Page Numbers & Header', category: 'PDF', icon: '🔢', accept: '.pdf', multiple: false, desc: 'Insert formatted page numbers, academic ribbons, or boxed headers/footers (supports Arabic).', aliases: ['number pdf', 'footer pdf', 'ترقيم'] },
    { id: 'sign-pdf', title: 'Sign & Annotate PDF', category: 'PDF', icon: '✍️', accept: '.pdf', multiple: false, desc: 'Draw signature (mouse/touch), upload signature image, or add an official seal stamp.', aliases: ['edit pdf', 'signature pdf', 'توقيع pdf'] },
    { id: 'cover-pdf', title: 'PDF Cover Page Builder', category: 'PDF', icon: '🎓', accept: '.pdf', multiple: false, desc: 'Prepend a professional Academic, Corporate, or Engineering Cover Page to any PDF.', aliases: ['cover page', 'غلاف بحث', 'غلاف جامعي'] },
    { id: 'pdf-bg-theme', title: 'PDF Reader Theme & Color Mode', category: 'PDF', icon: '🎨', accept: '.pdf', multiple: false, desc: 'Convert PDF background to Eye-Care Sepia, Dark Night Mode, or High-Contrast Grayscale.', aliases: ['dark pdf', 'sepia pdf', 'تغيير لون الخلفية'] },
    { id: 'crop-pdf', title: 'Crop & Trim PDF Margins', category: 'PDF', icon: '📐', accept: '.pdf', multiple: false, desc: 'Trim whitespace margins equally or custom-crop all pages of a PDF document.', aliases: ['trim pdf', 'قص هوامش pdf'] },
    { id: 'redact-pdf', title: 'Redact & Mask Sensitive PDF', category: 'Security', icon: '⬛', accept: '.pdf', multiple: false, desc: 'Permanently black out confidential areas, IDs, or headers across PDF pages.', aliases: ['blackout pdf', 'طمس البيانات'] },
    { id: 'protect-pdf', title: 'Protect & Flatten PDF Security', category: 'Security', icon: '🔒', accept: '.pdf', multiple: false, desc: 'Rasterize/lock PDF pages against text copying and embed security watermarks & metadata.', aliases: ['lock pdf', 'حماية pdf'] },
    { id: 'pdf-to-jpg', title: 'PDF to JPG Images', category: 'PDF', icon: '🖼️', accept: '.pdf', multiple: false, desc: 'Render every PDF page into high-resolution JPG images (bundled as ZIP).', aliases: ['pdf to image', 'pdf to pictures'] },
    { id: 'pdf-to-png', title: 'PDF to PNG Images', category: 'PDF', icon: '🏞️', accept: '.pdf', multiple: false, desc: 'Convert PDF pages into lossless PNG images.', aliases: ['pdf png'] },
    { id: 'pdf-to-txt', title: 'PDF to Text (TXT)', category: 'PDF', icon: '📄', accept: '.pdf', multiple: false, desc: 'Extract real embedded text from all pages of a PDF document.', aliases: ['extract pdf text'] },
    { id: 'pdf-to-docx', title: 'PDF to Word (DOCX)', category: 'PDF', icon: '📘', accept: '.pdf', multiple: false, desc: 'Extract PDF text paragraphs into a styled Word document (.doc) with template choice.', aliases: ['pdf to word', 'تحويل pdf الى وورد'] },

    // --- WORD, EXCEL, PPT & TEXT TOOLS ---
    { id: 'docx-to-pdf', title: 'Word (DOCX) to PDF', category: 'Word', icon: '📘', accept: '.docx,.txt,.html', multiple: false, desc: 'Convert DOCX (Arabic & English, tables & headings) to PDF with Academic, Modern, or Dark templates.', aliases: ['word to pdf', 'وورد الى pdf'] },
    { id: 'docx-to-txt', title: 'Word (DOCX) to TXT / HTML', category: 'Word', icon: '📝', accept: '.docx', multiple: false, desc: 'Extract clean plain text or semantic HTML from Word DOCX files.', aliases: ['docx to html', 'word to text'] },
    { id: 'txt-to-pdf', title: 'Text / HTML / Markdown to PDF', category: 'Word', icon: '📃', accept: '.txt,.html,.md', multiple: false, desc: 'Convert Arabic/English text or notes into a styled multi-page PDF with 3 visual themes.', aliases: ['text to pdf', 'html to pdf'] },
    { id: 'txt-to-docx', title: 'TXT to Word Document', category: 'Word', icon: '📄', accept: '.txt', multiple: false, desc: 'Package plain text files into a formatted Word document with RTL/LTR support.', aliases: ['text to word'] },
    { id: 'xlsx-to-pdf', title: 'Excel (XLSX/CSV) to PDF', category: 'Excel', icon: '📊', accept: '.xlsx,.xls,.csv', multiple: false, desc: 'Render full spreadsheet tables (Arabic/English) into Classic, Modern, or Executive PDF tables.', aliases: ['excel to pdf', 'spreadsheet to pdf', 'اكسل الى pdf'] },
    { id: 'xlsx-to-csv', title: 'Excel (XLSX) to CSV / JSON / HTML', category: 'Excel', icon: '📈', accept: '.xlsx,.xls', multiple: false, desc: 'Convert Excel workbooks into clean CSV, JSON, or styled HTML tables.', aliases: ['excel to csv', 'xlsx to json'] },
    { id: 'csv-to-xlsx', title: 'CSV / JSON to Excel (XLSX)', category: 'Excel', icon: '📗', accept: '.csv,.txt,.json', multiple: false, desc: 'Convert CSV or JSON arrays into a real Microsoft Excel .xlsx workbook.', aliases: ['csv to excel'] },
    { id: 'pptx-to-pdf', title: 'PowerPoint (PPTX) to PDF', category: 'Word', icon: '📽️', accept: '.pptx', multiple: false, desc: 'Extract slide content from PPTX archives and export into Handout, Deck, or Notes PDF.', aliases: ['powerpoint to pdf', 'ppt to pdf'] },

    // --- IMAGE STUDIO ---
    { id: 'images-to-pdf', title: 'Images to PDF Studio', category: 'Images', icon: '📚', accept: 'image/*', multiple: true, desc: 'Combine images into PDF with Full-Bleed, Framed Card + Caption, or 2x2 Grid layouts.', aliases: ['jpg to pdf', 'png to pdf', 'صور الى pdf'] },
    { id: 'image-converter', title: 'Batch Image Format Converter', category: 'Images', icon: '🔄', accept: 'image/*', multiple: true, desc: 'Convert single or multiple images between PNG, JPG, and WEBP with background fill control.', aliases: ['jpg to png', 'png to jpg', 'webp to png'] },
    { id: 'compress-image', title: 'Batch Compress Images', category: 'Images', icon: '🗜️', accept: 'image/*', multiple: true, desc: 'Shrink multiple images at once with adjustable quality slider and ZIP export.', aliases: ['shrink photo', 'optimize image'] },
    { id: 'resize-image', title: 'Resize, Rotate & Aspect-Preset Image', category: 'Images', icon: '📐', accept: 'image/*', multiple: false, desc: 'Resize image dimensions with aspect-ratio lock, rotation, and social/print presets.', aliases: ['crop image', 'rotate image'] },
    { id: 'remove-bg', title: 'Signature & White BG Remover', category: 'Images', icon: '🪄', accept: 'image/*', multiple: false, desc: 'Automatically remove white/paper backgrounds from signatures, stamps, and logos into transparent PNG.', aliases: ['transparent signature', 'تفريغ خلفية التوقيع'] },
    { id: 'doc-scanner-filter', title: 'CamScanner Document Magic Filter', category: 'Images', icon: '📸', accept: 'image/*', multiple: true, desc: 'Turn phone photos of paper documents into crisp black-and-white or enhanced scanned PDFs/images.', aliases: ['document scanner', 'تصفية المستندات'] },
    { id: 'id-photo-maker', title: 'ID & Passport Photo Studio', category: 'Images', icon: '🪪', accept: 'image/*', multiple: false, desc: 'Format personal photos to standard 4×6 cm or 2×2 inch sizes or a printable 8-photo A4 sheet.', aliases: ['passport photo', 'صورة شخصية'] },

    // --- COMPRESSION & ARCHIVES ---
    { id: 'create-zip', title: 'Create ZIP Archive', category: 'Compression', icon: '📦', accept: '*/*', multiple: true, desc: 'Compress multiple files or an entire folder into a standard .zip archive.', aliases: ['zip files', 'pack zip'] },
    { id: 'extract-zip', title: 'Extract & Inspect ZIP', category: 'Compression', icon: '📂', accept: '.zip', multiple: false, desc: 'Safely browse and extract ZIP contents with Zip-Slip & ratio protection.', aliases: ['unzip', 'open zip', 'فك ضغط'] },

    // --- SECURITY, OCR & DEV/DATA ---
    { id: 'pdf-metadata', title: 'PDF Metadata & Security Info', category: 'Security', icon: '🛡️', accept: '.pdf', multiple: false, desc: 'Inspect and edit PDF Title, Author, Subject, Keywords, and check encryption.', aliases: ['pdf properties', 'pdf password'] },
    { id: 'file-hash-inspector', title: 'File Signature & SHA-256 Inspector', category: 'Security', icon: '🔐', accept: '*/*', multiple: false, desc: 'Verify magic-byte headers and compute cryptographic SHA-256/SHA-1 file checksums.', aliases: ['verify file', 'hash check'] },
    { id: 'ocr-scanner', title: 'OCR Arabic & English (Images + PDF)', category: 'OCR', icon: '🔍', accept: 'image/*,.pdf', multiple: false, desc: 'Extract editable Arabic & English text from scanned images OR multi-page scanned PDFs.', aliases: ['optical character recognition', 'scanned pdf to text', 'استخراج النص بالعربي'] },
    { id: 'qr-barcode-studio', title: 'QR Code & PDF Stamp Generator', category: 'Dev', icon: '📱', accept: '.pdf,image/*', multiple: false, desc: 'Generate custom colored QR codes (PNG) or stamp a live verification QR directly onto any PDF.', aliases: ['qr generator', 'باركود'] },
    { id: 'data-json-converter', title: 'Data Table Converter (JSON/CSV/MD/HTML)', category: 'Dev', icon: '⇄', accept: '.json,.csv,.xlsx,.txt', multiple: false, desc: 'Transform data between JSON, CSV, Markdown Tables, and Styled HTML Tables.', aliases: ['json to csv', 'csv to markdown'] },
    { id: 'text-diff-compare', title: 'Document & Code Diff Comparator', category: 'Dev', icon: '⚖️', accept: '.txt,.md,.json,.csv,.html,.js,.py', multiple: true, desc: 'Compare two text/code files or pasted texts side-by-side and highlight added/removed lines.', aliases: ['compare files', 'مقارنة ملفين'] }
  ];

  /* ==========================================================================
   * 2. APPLICATION STATE & SETTINGS
   * ========================================================================== */
  const state = {
    activeView: 'home',
    activeCategory: 'all',
    activeScope: 'workspace', // 'workspace' | 'session' | 'trash'
    fmViewMode: 'grid',       // 'grid' | 'list'
    stagedFiles: [],          // Files currently selected in session
    workspaceFiles: [],       // Files persisted in IndexedDB
    folders: ['General', 'University', 'Work', 'Converted'],
    favorites: JSON.parse(localStorage.getItem('ahmedpdf_fav_tools') || '["merge-pdf","images-to-pdf","split-pdf","compress-pdf"]'),
    operationsQueue: JSON.parse(localStorage.getItem('ahmedpdf_ops_history') || '[]'),
    settings: Object.assign({
      theme: 'dark',
      imgQuality: 82,
      maxFileSizeMB: 150,
      concurrency: 2,
      workerUrl: '',
      cloudUrl: ''
    }, JSON.parse(localStorage.getItem('ahmedpdf_settings') || '{}')),
    organizer: {
      file: null,
      pdfBytes: null,
      pages: [] // { originalIndex, rotation, deleted }
    },
    activeWorkbenchTool: null,
    workbenchFiles: []
  };

  let deferredPwaPrompt = null;

  /* ==========================================================================
   * 3. MAGIC-BYTE FILE SIGNATURE VALIDATOR (SECURITY REQUIREMENT)
   * ========================================================================== */
  async function verifyFileSignature(file) {
    const maxBytes = state.settings.maxFileSizeMB * 1024 * 1024;
    if (file.size === 0) {
      return { valid: false, reason: 'File is empty (0 bytes).', detectedType: 'empty' };
    }
    if (file.size > maxBytes) {
      return { valid: false, reason: `File exceeds the configured ${state.settings.maxFileSizeMB} MB limit.`, detectedType: 'oversized' };
    }

    const slice = file.slice(0, 8);
    const buf = await slice.arrayBuffer();
    const bytes = new Uint8Array(buf);
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    const ext = (file.name.split('.').pop() || '').toLowerCase();

    // Block dangerous executable magic bytes (MZ / ELF)
    if (hex.startsWith('4D5A') || hex.startsWith('7F454C46')) {
      return { valid: false, reason: 'Executable binary detected and blocked for security.', detectedType: 'executable' };
    }

    if (ext === 'pdf' && !hex.startsWith('25504446')) {
      return { valid: false, reason: 'File claims to be .pdf but lacks the %PDF- magic header.', detectedType: 'mismatch' };
    }
    if ((ext === 'zip' || ext === 'docx' || ext === 'xlsx' || ext === 'pptx') && !hex.startsWith('504B0304') && !hex.startsWith('504B0506')) {
      return { valid: false, reason: `File claims to be .${ext} but lacks a valid PK ZIP container signature.`, detectedType: 'mismatch' };
    }
    if (ext === 'png' && !hex.startsWith('89504E47')) {
      return { valid: false, reason: 'Invalid PNG header signature.', detectedType: 'mismatch' };
    }
    if ((ext === 'jpg' || ext === 'jpeg') && !hex.startsWith('FFD8FF')) {
      return { valid: false, reason: 'Invalid JPEG header signature.', detectedType: 'mismatch' };
    }

    return { valid: true, signatureHex: hex.slice(0, 12), ext: ext };
  }

  /* ==========================================================================
   * 4. INDEXEDDB LOCAL WORKSPACE ENGINE
   * ========================================================================== */
  const DB_NAME = 'AhmedPdfWorkspaceDB';
  const DB_VERSION = 1;
  let dbInstance = null;

  function openWorkspaceDB() {
    return new Promise((resolve, reject) => {
      if (dbInstance) return resolve(dbInstance);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id' });
        }
      };
      req.onsuccess = (e) => {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async function loadWorkspaceFilesFromDB() {
    try {
      const db = await openWorkspaceDB();
      return new Promise((resolve) => {
        const tx = db.transaction('files', 'readonly');
        const store = tx.objectStore('files');
        const req = store.getAll();
        req.onsuccess = () => {
          state.workspaceFiles = req.result || [];
          updateWorkspaceCounters();
          resolve(state.workspaceFiles);
        };
        req.onerror = () => resolve([]);
      });
    } catch (e) {
      return [];
    }
  }

  async function saveFileToWorkspaceDB(fileBlob, customName, folderName = 'General') {
    const db = await openWorkspaceDB();
    const fileName = customName || fileBlob.name || 'document.pdf';
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const record = {
      id: 'file_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      name: fileName,
      ext: ext,
      size: fileBlob.size || 0,
      type: fileBlob.type || 'application/octet-stream',
      folder: folderName,
      favorite: false,
      trashed: false,
      createdAt: new Date().toISOString(),
      blob: fileBlob
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction('files', 'readwrite');
      tx.objectStore('files').put(record);
      tx.oncomplete = () => {
        state.workspaceFiles.unshift(record);
        updateWorkspaceCounters();
        renderMyFilesView();
        renderHomeDashboardLists();
        resolve(record);
      };
      tx.onerror = (err) => reject(err);
    });
  }

  async function updateWorkspaceFileRecord(record) {
    const db = await openWorkspaceDB();
    return new Promise((resolve) => {
      const tx = db.transaction('files', 'readwrite');
      tx.objectStore('files').put(record);
      tx.oncomplete = () => {
        updateWorkspaceCounters();
        renderMyFilesView();
        renderFavoritesView();
        resolve();
      };
    });
  }

  async function deleteWorkspaceFilePermanently(id) {
    const db = await openWorkspaceDB();
    return new Promise((resolve) => {
      const tx = db.transaction('files', 'readwrite');
      tx.objectStore('files').delete(id);
      tx.oncomplete = () => {
        state.workspaceFiles = state.workspaceFiles.filter(f => f.id !== id);
        updateWorkspaceCounters();
        renderMyFilesView();
        renderHomeDashboardLists();
        resolve();
      };
    });
  }

  function updateWorkspaceCounters() {
    const activeFiles = state.workspaceFiles.filter(f => !f.trashed);
    const totalBytes = activeFiles.reduce((acc, f) => acc + (f.size || 0), 0);
    const usedMB = (totalBytes / (1024 * 1024)).toFixed(1);
    const pct = Math.min(100, Math.max(2, (totalBytes / (250 * 1024 * 1024)) * 100));

    const usedLbl = document.getElementById('storage-used-label');
    const barFill = document.getElementById('storage-bar-fill');
    const badge = document.getElementById('my-files-count-badge');
    const statWs = document.getElementById('stat-workspace-count');
    const statProc = document.getElementById('stat-processed-count');
    const statFav = document.getElementById('stat-fav-count');

    if (usedLbl) usedLbl.textContent = `${usedMB} MB / 250 MB`;
    if (barFill) barFill.style.width = `${pct}%`;
    if (badge) badge.textContent = String(activeFiles.length);
    if (statWs) statWs.textContent = String(activeFiles.length);
    if (statProc) statProc.textContent = String(state.operationsQueue.length);
    if (statFav) statFav.textContent = String(state.favorites.length + activeFiles.filter(f => f.favorite).length);
  }

  /* ==========================================================================
   * 5. JOB QUEUE & OPERATIONS LOGGING
   * ========================================================================== */
  function logOperation(toolTitle, inputName, status, message, outputBlob, outputName) {
    const job = {
      id: 'job_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      tool: toolTitle,
      inputName: inputName,
      status: status, // 'completed' | 'failed'
      message: message,
      outputName: outputName || '',
      timestamp: new Date().toLocaleTimeString(),
      blobUrl: outputBlob ? URL.createObjectURL(outputBlob) : null
    };
    state.operationsQueue.unshift(job);
    const serializable = state.operationsQueue.slice(0, 35).map(j => ({
      id: j.id, tool: j.tool, inputName: j.inputName, status: j.status, message: j.message, outputName: j.outputName, timestamp: j.timestamp
    }));
    localStorage.setItem('ahmedpdf_ops_history', JSON.stringify(serializable));

    const recentBadge = document.getElementById('recent-ops-badge');
    const topQueue = document.getElementById('topbar-queue-count');
    if (recentBadge) recentBadge.textContent = String(state.operationsQueue.length);
    if (topQueue) topQueue.textContent = String(state.operationsQueue.length);

    updateWorkspaceCounters();
    renderRecentOperationsView();
    renderHomeDashboardLists();
    return job;
  }

  /* ==========================================================================
   * 6. REAL DOCUMENT, PDF, OFFICE, IMAGE & ARCHIVE PROCESSING ENGINES
   * ========================================================================== */
  function configurePdfJsWorker() {
    if (window.pdfjsLib && !window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }

  // A. MERGE PDF
  async function executeMergePdf(files, onProgress) {
    if (!window.PDFLib) throw new Error('PDF-Lib engine is still loading. Please try again in a moment.');
    if (files.length < 2) throw new Error('Please select at least 2 PDF files to merge.');

    const mergedPdf = await window.PDFLib.PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      onProgress(Math.round(((i + 0.3) / files.length) * 100), `Merging ${files[i].name}...`);
      const bytes = await files[i].arrayBuffer();
      const srcDoc = await window.PDFLib.PDFDocument.load(bytes);
      const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
      copiedPages.forEach(p => mergedPdf.addPage(p));
    }
    onProgress(95, 'Finalizing merged PDF...');
    const outBytes = await mergedPdf.save();
    return {
      blob: new Blob([outBytes], { type: 'application/pdf' }),
      name: `AhmedPdf_Merged_${Date.now()}.pdf`,
      summary: `Successfully merged ${files.length} PDF files (${mergedPdf.getPageCount()} total pages).`
    };
  }

  // B. SPLIT PDF (Range / Every N / All Pages to ZIP)
  async function executeSplitPdf(file, mode, rangeInput, everyN, onProgress) {
    const bytes = await file.arrayBuffer();
    const srcDoc = await window.PDFLib.PDFDocument.load(bytes);
    const totalPages = srcDoc.getPageCount();

    if (mode === 'range') {
      const indices = parsePageRangeString(rangeInput, totalPages);
      if (!indices.length) throw new Error(`Invalid page range "${rangeInput}". Document has ${totalPages} pages.`);
      const outDoc = await window.PDFLib.PDFDocument.create();
      const copied = await outDoc.copyPages(srcDoc, indices);
      copied.forEach(p => outDoc.addPage(p));
      const outBytes = await outDoc.save();
      return {
        blob: new Blob([outBytes], { type: 'application/pdf' }),
        name: `${file.name.replace(/\.pdf$/i, '')}_Extracted.pdf`,
        summary: `Extracted ${indices.length} page(s) from ${totalPages}-page PDF.`
      };
    }

    // Split All or Every N into a ZIP Archive
    const zip = new window.JSZip();
    const step = mode === 'every' ? Math.max(1, parseInt(everyN, 10) || 1) : 1;
    let partNum = 1;
    for (let i = 0; i < totalPages; i += step) {
      onProgress(Math.round((i / totalPages) * 90), `Splitting pages ${i + 1} to ${Math.min(i + step, totalPages)}...`);
      const subDoc = await window.PDFLib.PDFDocument.create();
      const batchIndices = [];
      for (let j = i; j < Math.min(i + step, totalPages); j++) batchIndices.push(j);
      const copied = await subDoc.copyPages(srcDoc, batchIndices);
      copied.forEach(p => subDoc.addPage(p));
      const subBytes = await subDoc.save();
      zip.file(`Part_${String(partNum++).padStart(2, '0')}.pdf`, subBytes);
    }
    onProgress(95, 'Packaging split PDFs into ZIP...');
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    return {
      blob: zipBlob,
      name: `${file.name.replace(/\.pdf$/i, '')}_Split_Pages.zip`,
      summary: `Split ${totalPages} pages into ${partNum - 1} PDF files inside a ZIP archive.`
    };
  }

  function parsePageRangeString(rangeStr, maxPages) {
    const result = new Set();
    const parts = String(rangeStr || '1').split(',');
    for (const raw of parts) {
      const token = raw.trim();
      if (!token) continue;
      if (token.includes('-')) {
        const [s, e] = token.split('-').map(n => parseInt(n.trim(), 10));
        if (isNaN(s) || isNaN(e) || s < 1 || e > maxPages || s > e) {
          throw new Error(`Invalid page range "${token}". Valid pages are 1 to ${maxPages}.`);
        }
        for (let p = s; p <= e; p++) result.add(p - 1);
      } else {
        const p = parseInt(token, 10);
        if (isNaN(p) || p < 1 || p > maxPages) {
          throw new Error(`Page number "${token}" is out of bounds (1–${maxPages}).`);
        }
        result.add(p - 1);
      }
    }
    return Array.from(result);
  }

// HELPER: Detect Arabic text for automatic RTL alignment
  function containsArabic(text) {
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(String(text || ''));
  }

  // HELPER: Render Arabic/English Stamp or Text to PNG DataURL so PDF-Lib never crashes on Unicode
  function renderUnicodeOverlayToPng(drawCallback, width = 600, height = 200) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    drawCallback(ctx, width, height);
    return canvas.toDataURL('image/png');
  }

  // C. WATERMARK / PAGE NUMBERS / SIGN PDF (WITH ARABIC & MULTI-STYLE SUPPORT)
  async function executePdfOverlayTool(file, toolId, options, onProgress) {
    const bytes = await file.arrayBuffer();
    const pdfDoc = await window.PDFLib.PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();
    const styleMode = options.styleMode || 'classic';

    let embeddedSigImg = null;
    if (toolId === 'sign-pdf' && options.signatureDataUrl) {
      embeddedSigImg = await pdfDoc.embedPng(options.signatureDataUrl);
    }

    // Pre-render watermark or circular stamp PNG (supports Arabic & English)
    let wmImageEmbed = null;
    if (toolId === 'watermark-pdf') {
      const wmText = options.text || 'CONFIDENTIAL — AHMEDPDF';
      const alpha = Math.max(0.08, Math.min(0.95, (Number(options.opacity) || 30) / 100));
      const colorHex = options.color || '#0284c7';

      if (styleMode === 'stamp') {
        const stampPng = renderUnicodeOverlayToPng((ctx, w, h) => {
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = colorHex;
          ctx.fillStyle = colorHex;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 110, 0, Math.PI * 2);
          ctx.stroke();
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 98, 0, Math.PI * 2);
          ctx.stroke();
          ctx.font = '800 22px "Cairo", "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.direction = containsArabic(wmText) ? 'rtl' : 'ltr';
          ctx.fillText(wmText, w / 2, h / 2 - 8, 180);
          ctx.font = '700 13px "Cairo", "Inter", sans-serif';
          ctx.fillText(new Date().toLocaleDateString(), w / 2, h / 2 + 24);
        }, 260, 260);
        wmImageEmbed = await pdfDoc.embedPng(stampPng);
      } else {
        const diagPng = renderUnicodeOverlayToPng((ctx, w, h) => {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = colorHex;
          ctx.font = '800 44px "Cairo", "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.direction = containsArabic(wmText) ? 'rtl' : 'ltr';
          ctx.translate(w / 2, h / 2);
          ctx.rotate((-32 * Math.PI) / 180);
          ctx.fillText(wmText, 0, 0, w - 40);
        }, 700, 350);
        wmImageEmbed = await pdfDoc.embedPng(diagPng);
      }
    }

    for (let idx = 0; idx < pages.length; idx++) {
      const page = pages[idx];
      onProgress(Math.round(((idx + 1) / pages.length) * 90), `Processing page ${idx + 1} of ${pages.length}...`);
      const { width, height } = page.getSize();

      if (toolId === 'watermark-pdf' && wmImageEmbed) {
        if (styleMode === 'grid') {
          for (let gx = 30; gx < width - 100; gx += 240) {
            for (let gy = 60; gy < height - 80; gy += 180) {
              page.drawImage(wmImageEmbed, { x: gx, y: gy, width: 220, height: 110 });
            }
          }
        } else if (styleMode === 'stamp') {
          page.drawImage(wmImageEmbed, { x: width / 2 - 90, y: height / 2 - 90, width: 180, height: 180 });
        } else {
          page.drawImage(wmImageEmbed, { x: width * 0.08, y: height * 0.3, width: width * 0.84, height: height * 0.38 });
        }
      } else if (toolId === 'pagenum-pdf') {
        const headerText = options.headerText || '';
        const footerLabel = containsArabic(headerText)
          ? `صفحة ${idx + 1} من ${pages.length}`
          : `Page ${idx + 1} of ${pages.length}`;

        if (headerText) {
          const hdrPng = renderUnicodeOverlayToPng((ctx, w, h) => {
            if (styleMode === 'ribbon') {
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(0, 0, w, h);
              ctx.fillStyle = '#38bdf8';
              ctx.fillRect(0, h - 4, w, 4);
              ctx.fillStyle = '#ffffff';
            } else if (styleMode === 'boxed') {
              ctx.strokeStyle = '#0284c7';
              ctx.lineWidth = 3;
              ctx.strokeRect(10, 6, w - 20, h - 12);
              ctx.fillStyle = '#0f172a';
            } else {
              ctx.fillStyle = '#334155';
            }
            ctx.font = '700 20px "Cairo", "Inter", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.direction = containsArabic(headerText) ? 'rtl' : 'ltr';
            ctx.fillText(headerText, w / 2, h / 2, w - 40);
          }, 900, 54);
          const hdrEmbed = await pdfDoc.embedPng(hdrPng);
          page.drawImage(hdrEmbed, { x: 25, y: height - 38, width: width - 50, height: 28 });
        }

        const ftrPng = renderUnicodeOverlayToPng((ctx, w, h) => {
          if (styleMode === 'ribbon') {
            ctx.fillStyle = '#0284c7';
            ctx.beginPath();
            ctx.roundRect(w / 2 - 110, 6, 220, h - 12, 18);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
          } else if (styleMode === 'boxed') {
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(w / 2 - 100, 6, 200, h - 12);
            ctx.strokeStyle = '#64748b';
            ctx.strokeRect(w / 2 - 100, 6, 200, h - 12);
            ctx.fillStyle = '#0f172a';
          } else {
            ctx.fillStyle = '#1e293b';
          }
          ctx.font = '700 19px "Cairo", "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(footerLabel, w / 2, h / 2);
        }, 600, 48);
        const ftrEmbed = await pdfDoc.embedPng(ftrPng);
        page.drawImage(ftrEmbed, { x: width / 2 - 130, y: 12, width: 260, height: 22 });

      } else if (toolId === 'sign-pdf') {
        const shouldPlace = (idx === pages.length - 1) || options.allPages;
        if (shouldPlace) {
          if (embeddedSigImg) {
            page.drawImage(embeddedSigImg, { x: width - 195, y: 48, width: 150, height: 65 });
          }
          if (options.overlayText) {
            const sigTxtPng = renderUnicodeOverlayToPng((ctx, w, h) => {
              if (styleMode === 'seal') {
                ctx.strokeStyle = '#1d4ed8';
                ctx.lineWidth = 3;
                ctx.strokeRect(4, 4, w - 8, h - 8);
              }
              ctx.fillStyle = '#0f172a';
              ctx.font = '700 20px "Cairo", "Inter", sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.direction = containsArabic(options.overlayText) ? 'rtl' : 'ltr';
              ctx.fillText(options.overlayText, w / 2, h / 2 - 8, w - 16);
              ctx.font = '600 13px "Cairo", "Inter", sans-serif';
              ctx.fillStyle = '#475569';
              ctx.fillText(new Date().toLocaleDateString(), w / 2, h / 2 + 16);
            }, 340, 74);
            const sigTxtEmbed = await pdfDoc.embedPng(sigTxtPng);
            page.drawImage(sigTxtEmbed, { x: width - 205, y: 14, width: 170, height: 36 });
          }
        }
      }
    }

    const outBytes = await pdfDoc.save();
    return {
      blob: new Blob([outBytes], { type: 'application/pdf' }),
      name: `${file.name.replace(/\.pdf$/i, '')}_${toolId}.pdf`,
      summary: `Applied ${toolId} (${styleMode} style) across ${pages.length} page(s).`
    };
  }

  // D. PDF TO IMAGES (JPG / PNG) & PDF COMPRESSION
  async function executePdfRenderOperation(file, mode, qualityPct, onProgress) {
    configurePdfJsWorker();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const total = pdf.numPages;

    if (mode === 'compress-pdf') {
      const outPdf = await window.PDFLib.PDFDocument.create();
      const scale = qualityPct < 50 ? 1.0 : (qualityPct < 80 ? 1.35 : 1.65);
      const q = Math.max(0.25, Math.min(0.92, qualityPct / 100));

      for (let p = 1; p <= total; p++) {
        onProgress(Math.round((p / total) * 90), `Optimizing page ${p} of ${total}...`);
        const page = await pdf.getPage(p);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const jpgDataUrl = canvas.toDataURL('image/jpeg', q);
        const jpgEmbed = await outPdf.embedJpg(jpgDataUrl);
        const origVp = page.getViewport({ scale: 1.0 });
        const newPage = outPdf.addPage([origVp.width, origVp.height]);
        newPage.drawImage(jpgEmbed, { x: 0, y: 0, width: origVp.width, height: origVp.height });
      }
      const outBytes = await outPdf.save();
      const newBlob = new Blob([outBytes], { type: 'application/pdf' });
      const diffPct = Math.round(((file.size - newBlob.size) / file.size) * 100);
      const note = newBlob.size >= file.size
        ? `Original PDF (${formatBytes(file.size)}) was already compact; output size is ${formatBytes(newBlob.size)}.`
        : `Reduced size from ${formatBytes(file.size)} to ${formatBytes(newBlob.size)} (${diffPct}% saved).`;
      return {
        blob: newBlob,
        name: `${file.name.replace(/\.pdf$/i, '')}_Compressed.pdf`,
        summary: note
      };
    }

    const mime = mode === 'pdf-to-png' ? 'image/png' : 'image/jpeg';
    const ext = mode === 'pdf-to-png' ? 'png' : 'jpg';
    const zip = new window.JSZip();

    for (let p = 1; p <= total; p++) {
      onProgress(Math.round((p / total) * 90), `Rendering page ${p} of ${total} to ${ext.toUpperCase()}...`);
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      const blob = await new Promise(res => canvas.toBlob(res, mime, 0.92));
      if (total === 1) {
        return {
          blob,
          name: `${file.name.replace(/\.pdf$/i, '')}_Page1.${ext}`,
          summary: `Converted PDF page to high-resolution ${ext.toUpperCase()}.`
        };
      }
      zip.file(`Page_${String(p).padStart(2, '0')}.${ext}`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    return {
      blob: zipBlob,
      name: `${file.name.replace(/\.pdf$/i, '')}_${ext.toUpperCase()}_Pages.zip`,
      summary: `Rendered all ${total} PDF pages into ${ext.toUpperCase()} images inside a ZIP archive.`
    };
  }

  // E. PDF TO TXT & PDF TO DOCX (WITH TEMPLATE CHOICE)
  async function executePdfTextExtraction(file, targetFormat, styleMode = 'academic', onProgress) {
    configurePdfJsWorker();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pagesText = [];

    for (let p = 1; p <= pdf.numPages; p++) {
      onProgress(Math.round((p / pdf.numPages) * 90), `Extracting text from page ${p} of ${pdf.numPages}...`);
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      pagesText.push(`--- Page ${p} ---\n` + strings.join(' '));
    }

    const fullText = pagesText.join('\n\n').trim();
    if (!fullText.replace(/--- Page \d+ ---/g, '').trim()) {
      throw new Error('No selectable text found in this PDF. It appears to be a scanned PDF — use the "OCR Arabic & English" tool instead.');
    }

    const isRtl = containsArabic(fullText);
    if (targetFormat === 'docx') {
      const bg = styleMode === 'modern' ? '#f8fafc' : '#ffffff';
      const accent = styleMode === 'modern' ? 'border-left:5px solid #0284c7;padding-left:14px;' : '';
      const wordHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40" dir="${isRtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><title>${escapeHtml(file.name)}</title></head><body style="font-family:'Cairo',Calibri,sans-serif;font-size:12pt;line-height:1.7;background:${bg};direction:${isRtl ? 'rtl' : 'ltr'};">${pagesText.map(t => `<div style="${accent}margin-bottom:16px;"><p>${escapeHtml(t).replace(/\n/g, '<br>')}</p></div>`).join('<hr>')}</body></html>`;
      return {
        blob: new Blob(['\ufeff', wordHtml], { type: 'application/msword;charset=utf-8' }),
        name: `${file.name.replace(/\.pdf$/i, '')}_Converted.doc`,
        summary: `Extracted text from ${pdf.numPages} page(s) into Word (${styleMode} template).`
      };
    }

    return {
      blob: new Blob([fullText], { type: 'text/plain;charset=utf-8' }),
      name: `${file.name.replace(/\.pdf$/i, '')}.txt`,
      summary: `Extracted ${fullText.length} characters across ${pdf.numPages} page(s).`
    };
  }

  // F. IMAGES TO PDF (WITH 3 LAYOUT STYLES: FULL BLEED, FRAMED CARD, 2x2 GRID)
  async function executeImagesToPdf(files, styleMode = 'full', captionText = '', onProgress) {
    const pdfDoc = await window.PDFLib.PDFDocument.create();

    if (styleMode === 'grid') {
      // 4 Images per A4 Page (2x2 Grid)
      const pw = 595.28, ph = 841.89;
      for (let i = 0; i < files.length; i += 4) {
        onProgress(Math.round(((i + 1) / files.length) * 90), `Building grid page ${Math.floor(i / 4) + 1}...`);
        const page = pdfDoc.addPage([pw, ph]);
        const slots = [
          { x: 30, y: ph / 2 + 15, w: (pw - 80) / 2, h: ph / 2 - 45 },
          { x: pw / 2 + 10, y: ph / 2 + 15, w: (pw - 80) / 2, h: ph / 2 - 45 },
          { x: 30, y: 30, w: (pw - 80) / 2, h: ph / 2 - 45 },
          { x: pw / 2 + 10, y: 30, w: (pw - 80) / 2, h: ph / 2 - 45 }
        ];
        for (let s = 0; s < 4 && (i + s) < files.length; s++) {
          const imgData = await convertImageFileToDataUrl(files[i + s], 'image/jpeg', 0.9);
          const jpgEmbed = await pdfDoc.embedJpg(imgData.dataUrl);
          const slot = slots[s];
          const ratio = Math.min(slot.w / jpgEmbed.width, slot.h / jpgEmbed.height);
          const dw = jpgEmbed.width * ratio;
          const dh = jpgEmbed.height * ratio;
          page.drawImage(jpgEmbed, {
            x: slot.x + (slot.w - dw) / 2,
            y: slot.y + (slot.h - dh) / 2,
            width: dw,
            height: dh
          });
        }
      }
    } else if (styleMode === 'card') {
      // Framed A4 Card with Margin & Optional Caption
      const pw = 595.28, ph = 841.89;
      for (let i = 0; i < files.length; i++) {
        onProgress(Math.round(((i + 0.5) / files.length) * 90), `Framing image ${i + 1} of ${files.length}...`);
        const page = pdfDoc.addPage([pw, ph]);
        const imgData = await convertImageFileToDataUrl(files[i], 'image/jpeg', 0.92);
        const jpgEmbed = await pdfDoc.embedJpg(imgData.dataUrl);
        const boxW = pw - 90, boxH = ph - 140;
        const ratio = Math.min(boxW / jpgEmbed.width, boxH / jpgEmbed.height);
        const dw = jpgEmbed.width * ratio, dh = jpgEmbed.height * ratio;

        page.drawRectangle({
          x: 35, y: 75, width: pw - 70, height: ph - 110,
          borderColor: window.PDFLib.rgb(0.8, 0.85, 0.9), borderWidth: 1.5
        });
        page.drawImage(jpgEmbed, {
          x: 45 + (boxW - dw) / 2,
          y: 90 + (boxH - dh) / 2,
          width: dw,
          height: dh
        });

        const label = captionText ? `${captionText} (${i + 1})` : files[i].name;
        const capPng = renderUnicodeOverlayToPng((ctx, w, h) => {
          ctx.fillStyle = '#1e293b';
          ctx.font = '700 20px "Cairo", "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.direction = containsArabic(label) ? 'rtl' : 'ltr';
          ctx.fillText(label, w / 2, h / 2, w - 20);
        }, 700, 48);
        const capEmbed = await pdfDoc.embedPng(capPng);
        page.drawImage(capEmbed, { x: 60, y: 28, width: pw - 120, height: 28 });
      }
    } else {
      // Full-Bleed Native Image Dimensions
      for (let i = 0; i < files.length; i++) {
        onProgress(Math.round(((i + 0.5) / files.length) * 90), `Embedding image ${i + 1} of ${files.length}...`);
        const dataUrl = await convertImageFileToDataUrl(files[i], 'image/jpeg', 0.92);
        const jpgImage = await pdfDoc.embedJpg(dataUrl.dataUrl);
        const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
        page.drawImage(jpgImage, { x: 0, y: 0, width: jpgImage.width, height: jpgImage.height });
      }
    }

    const outBytes = await pdfDoc.save();
    return {
      blob: new Blob([outBytes], { type: 'application/pdf' }),
      name: `AhmedPdf_Images_${styleMode}_${Date.now()}.pdf`,
      summary: `Created PDF (${styleMode} layout) from ${files.length} image(s).`
    };
  }

  // G. IMAGE CONVERTER / COMPRESSOR / RESIZER
  function convertImageFileToDataUrl(file, targetMime, quality = 0.85, customW = null, customH = null, rotateDeg = 0) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let w = customW ? Number(customW) : img.naturalWidth;
        let h = customH ? Number(customH) : img.naturalHeight;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (rotateDeg === 90 || rotateDeg === 270) {
          canvas.width = h;
          canvas.height = w;
        } else {
          canvas.width = w;
          canvas.height = h;
        }

        if (targetMime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (rotateDeg) ctx.rotate((rotateDeg * Math.PI) / 180);
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();

        const dataUrl = canvas.toDataURL(targetMime, quality);
        canvas.toBlob((blob) => {
          resolve({ blob, dataUrl, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, outWidth: canvas.width, outHeight: canvas.height });
        }, targetMime, quality);
      },
      img.onerror = () => reject(new Error(`Could not decode image: ${file.name}`));
      img.src = url;
    });
  }

  // H1. ARABIC & MULTI-TEMPLATE DOCUMENT TO PDF ENGINE (ACADEMIC, MODERN, DARK)
  async function createCleanTextPdf(title, textContent, styleMode = 'academic') {
    const pdfDoc = await window.PDFLib.PDFDocument.create();
    const rawParagraphs = String(textContent || 'Empty Document').replace(/\r\n/g, '\n').split('\n');
    const isRtl = containsArabic(textContent) || containsArabic(title);

    // High-DPI A4 Canvas dimensions (1240 x 1754 px)
    const cw = 1240, ch = 1754;
    const maxLineWidth = cw - 180;

    // Word-wrap paragraphs using Canvas measureText so Arabic & English wrap accurately
    const measureCanvas = document.createElement('canvas');
    const mCtx = measureCanvas.getContext('2d');
    mCtx.font = '500 24px "Cairo", "Inter", sans-serif';

    const wrappedLines = [];
    for (const para of rawParagraphs) {
      const trimmed = para.trim();
      if (!trimmed) {
        wrappedLines.push('');
        continue;
      }
      const words = trimmed.split(/\s+/);
      let currentLine = words[0] || '';
      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        if (mCtx.measureText(testLine).width <= maxLineWidth) {
          currentLine = testLine;
        } else {
          wrappedLines.push(currentLine);
          currentLine = words[i];
        }
      }
      wrappedLines.push(currentLine);
    }

    const linesPerPage = 34;
    const totalPages = Math.max(1, Math.ceil(wrappedLines.length / linesPerPage));

    for (let p = 0; p < totalPages; p++) {
      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d');

      // Apply Visual Style Theme
      if (styleMode === 'dark') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, cw, ch);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.strokeRect(45, 45, cw - 90, ch - 90);
      } else if (styleMode === 'modern') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(isRtl ? cw - 28 : 0, 0, 28, ch);
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(0, 0, cw, 130);
      } else {
        // Academic Classic Frame
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, cw, ch);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 6;
        ctx.strokeRect(42, 42, cw - 84, ch - 84);
        ctx.lineWidth = 2;
        ctx.strokeRect(52, 52, cw - 104, ch - 104);
      }

      // Header Title
      ctx.direction = isRtl ? 'rtl' : 'ltr';
      ctx.textAlign = isRtl ? 'right' : 'left';
      ctx.font = '800 30px "Cairo", "Inter", sans-serif';
      ctx.fillStyle = styleMode === 'dark' ? '#38bdf8' : '#0284c7';
      const headerX = isRtl ? cw - 90 : 90;
      ctx.fillText(String(title || 'AhmedPdf Document'), headerX, 95, cw - 180);

      // Divider line
      ctx.strokeStyle = styleMode === 'dark' ? '#334155' : '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 125);
      ctx.lineTo(cw - 80, 125);
      ctx.stroke();

      // Body Lines
      ctx.font = '500 24px "Cairo", "Inter", sans-serif';
      ctx.fillStyle = styleMode === 'dark' ? '#f8fafc' : '#0f172a';
      const chunk = wrappedLines.slice(p * linesPerPage, (p + 1) * linesPerPage);
      chunk.forEach((line, idx) => {
        const lineRtl = containsArabic(line) || isRtl;
        ctx.direction = lineRtl ? 'rtl' : 'ltr';
        ctx.textAlign = lineRtl ? 'right' : 'left';
        const xPos = lineRtl ? cw - 90 : 90;
        ctx.fillText(line, xPos, 178 + idx * 42, maxLineWidth);
      });

      // Footer Page Number
      ctx.direction = 'ltr';
      ctx.textAlign = 'center';
      ctx.font = '700 20px "Cairo", "Inter", sans-serif';
      ctx.fillStyle = styleMode === 'dark' ? '#94a3b8' : '#64748b';
      ctx.fillText(`AhmedPdf Studio  •  Page ${p + 1} of ${totalPages}`, cw / 2, ch - 65);

      const jpgUrl = canvas.toDataURL('image/jpeg', 0.92);
      const jpgEmbed = await pdfDoc.embedJpg(jpgUrl);
      const page = pdfDoc.addPage([595.28, 841.89]);
      page.drawImage(jpgEmbed, { x: 0, y: 0, width: 595.28, height: 841.89 });
    }

    const bytes = await pdfDoc.save();
    return new Blob([bytes], { type: 'application/pdf' });
  }

  // H2. REAL EXCEL / CSV TABLE TO STYLED PDF ENGINE (SOLVES BLANK EXCEL PAGES)
  async function renderExcelSheetToPdf(file, sheetIndex = 0, styleMode = 'modern', orientation = 'landscape', onProgress) {
    const buf = await file.arrayBuffer();
    const wb = window.XLSX.read(buf, { type: 'array' });
    const sheetName = wb.SheetNames[sheetIndex] || wb.SheetNames[0];
    const sheet = wb.Sheets[sheetName];
    const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })
      .filter(r => r.some(cell => String(cell).trim() !== ''));

    if (!rows.length) {
      throw new Error(`Sheet "${sheetName}" is empty. Please choose a sheet with data.`);
    }

    const isLandscape = orientation === 'landscape';
    const cw = isLandscape ? 1754 : 1240;
    const ch = isLandscape ? 1240 : 1754;
    const pageW = isLandscape ? 841.89 : 595.28;
    const pageH = isLandscape ? 595.28 : 841.89;

    const maxCols = Math.min(14, Math.max(...rows.map(r => r.length), 1));
    const headerRow = rows[0].slice(0, maxCols);
    const dataRows = rows.slice(1);
    const rowsPerPage = isLandscape ? 18 : 26;
    const totalPages = Math.max(1, Math.ceil(dataRows.length / rowsPerPage));
    const sampleText = rows.slice(0, 5).map(r => r.join(' ')).join(' ');
    const isRtl = containsArabic(sampleText);

    const pdfDoc = await window.PDFLib.PDFDocument.create();

    for (let p = 0; p < totalPages; p++) {
      if (onProgress) onProgress(Math.round(((p + 1) / totalPages) * 90), `Rendering table page ${p + 1} of ${totalPages}...`);
      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cw, ch);

      // Top Header Banner
      let tableStartY = 140;
      if (styleMode === 'executive') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, cw, 125);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '800 30px "Cairo", "Inter", sans-serif';
        ctx.textAlign = isRtl ? 'right' : 'left';
        ctx.direction = isRtl ? 'rtl' : 'ltr';
        ctx.fillText(`${file.name} — ${sheetName}`, isRtl ? cw - 60 : 60, 58);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '600 18px "Cairo", "Inter", sans-serif';
        ctx.fillText(`Total Rows: ${dataRows.length}  |  Columns: ${maxCols}  |  Exported via AhmedPdf Studio`, isRtl ? cw - 60 : 60, 96);
        tableStartY = 155;
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 28px "Cairo", "Inter", sans-serif';
        ctx.textAlign = isRtl ? 'right' : 'left';
        ctx.direction = isRtl ? 'rtl' : 'ltr';
        ctx.fillText(`${file.name} (${sheetName})`, isRtl ? cw - 60 : 60, 80);
        tableStartY = 115;
      }

      const marginX = 55;
      const tableW = cw - marginX * 2;
      const colW = tableW / maxCols;
      const rowH = 50;

      // Draw Table Header Row
      ctx.fillStyle = styleMode === 'classic' ? '#e2e8f0' : (styleMode === 'executive' ? '#1e293b' : '#0284c7');
      ctx.fillRect(marginX, tableStartY, tableW, rowH + 6);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(marginX, tableStartY, tableW, rowH + 6);

      ctx.font = '800 20px "Cairo", "Inter", sans-serif';
      ctx.fillStyle = styleMode === 'classic' ? '#0f172a' : '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let c = 0; c < maxCols; c++) {
        const colIdx = isRtl ? (maxCols - 1 - c) : c;
        const cellX = marginX + colIdx * colW;
        const cellText = String(headerRow[c] !== undefined ? headerRow[c] : `Col ${c + 1}`);
        ctx.direction = containsArabic(cellText) ? 'rtl' : 'ltr';
        ctx.fillText(cellText.slice(0, 26), cellX + colW / 2, tableStartY + (rowH + 6) / 2, colW - 14);
        if (c > 0) {
          ctx.beginPath();
          ctx.moveTo(marginX + c * colW, tableStartY);
          ctx.lineTo(marginX + c * colW, tableStartY + rowH + 6);
          ctx.stroke();
        }
      }

      // Draw Table Data Rows
      const pageRows = dataRows.slice(p * rowsPerPage, (p + 1) * rowsPerPage);
      pageRows.forEach((r, rIdx) => {
        const y = tableStartY + rowH + 6 + rIdx * rowH;
        if (styleMode !== 'classic' && rIdx % 2 === 1) {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(marginX, y, tableW, rowH);
        }
        ctx.strokeStyle = styleMode === 'classic' ? '#0f172a' : '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(marginX, y, tableW, rowH);

        ctx.font = '600 18px "Cairo", "Inter", sans-serif';
        ctx.fillStyle = '#0f172a';
        for (let c = 0; c < maxCols; c++) {
          const colIdx = isRtl ? (maxCols - 1 - c) : c;
          const cellX = marginX + colIdx * colW;
          const val = r[c] !== undefined && r[c] !== null ? String(r[c]) : '';
          ctx.direction = containsArabic(val) ? 'rtl' : 'ltr';
          ctx.fillText(val.slice(0, 30), cellX + colW / 2, y + rowH / 2, colW - 12);
          if (c > 0) {
            ctx.beginPath();
            ctx.moveTo(marginX + c * colW, y);
            ctx.lineTo(marginX + c * colW, y + rowH);
            ctx.stroke();
          }
        }
      });

      // Footer
      ctx.direction = 'ltr';
      ctx.textAlign = 'center';
      ctx.font = '700 18px "Cairo", "Inter", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`Page ${p + 1} of ${totalPages}  •  Generated by AhmedPdf Table Engine`, cw / 2, ch - 35);

      const jpgUrl = canvas.toDataURL('image/jpeg', 0.92);
      const jpgEmbed = await pdfDoc.embedJpg(jpgUrl);
      const page = pdfDoc.addPage([pageW, pageH]);
      page.drawImage(jpgEmbed, { x: 0, y: 0, width: pageW, height: pageH });
    }

    const outBytes = await pdfDoc.save();
    return {
      blob: new Blob([outBytes], { type: 'application/pdf' }),
      name: `${file.name.replace(/\.[^.]+$/, '')}_${styleMode}.pdf`,
      summary: `Rendered ${dataRows.length} rows × ${maxCols} columns from "${sheetName}" into a ${totalPages}-page ${styleMode} PDF.`
    };
  }

  // I. SAFE ZIP EXTRACTOR WITH ZIP-SLIP & RATIO SECURITY GUARDS
  async function inspectAndExtractZip(file) {
    const zip = await window.JSZip.loadAsync(file);
    const entries = [];
    const MAX_ENTRIES = 500;
    const MAX_TOTAL_UNCOMPRESSED = 350 * 1024 * 1024; // 350 MB ceiling
    let totalUncompressed = 0;

    const names = Object.keys(zip.files);
    if (names.length > MAX_ENTRIES) {
      throw new Error(`Security Guard: Archive contains ${names.length} entries, exceeding the safe limit of ${MAX_ENTRIES}.`);
    }

    for (const rawPath of names) {
      const entry = zip.files[rawPath];
      if (entry.dir) continue;

      // Prevent Zip-Slip Path Traversal
      if (rawPath.includes('../') || rawPath.includes('..\\') || rawPath.startsWith('/')) {
        throw new Error(`Security Alert (Zip-Slip Blocked): Malicious path traversal detected in entry "${rawPath}".`);
      }

      const contentBlob = await entry.async('blob');
      totalUncompressed += contentBlob.size;
      if (totalUncompressed > MAX_TOTAL_UNCOMPRESSED) {
        throw new Error('Security Alert (Zip-Bomb Protection): Uncompressed payload exceeds 350 MB limit.');
      }

      entries.push({
        name: rawPath.split('/').pop() || rawPath,
        fullPath: rawPath,
        size: contentBlob.size,
        blob: contentBlob
      });
    }
    return entries;
  }

  /* ==========================================================================
   * 7. RENDERING VIEWS & TOOLS CARDS
   * ========================================================================== */
  function switchView(viewId) {
    state.activeView = viewId;
    document.querySelectorAll('.view-container').forEach(v => {
      v.classList.toggle('active-view', v.id === `view-${viewId}`);
    });
    document.querySelectorAll('.nav-link[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
    });

    const activeNav = document.querySelector(`.nav-link[data-view="${viewId}"] span:nth-child(2)`);
    const bc = document.getElementById('breadcrumb-current');
    if (bc && activeNav) bc.textContent = activeNav.textContent;

    document.getElementById('sidebar')?.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function createToolCardElement(tool) {
    const isFav = state.favorites.includes(tool.id);
    const card = document.createElement('article');
    card.className = 'tool-card';
    card.innerHTML = `
      <div>
        <div class="tool-card-top">
          <div class="tool-icon-box">${tool.icon}</div>
          <button type="button" class="fav-star-btn ${isFav ? 'starred' : ''}" data-fav-id="${tool.id}" title="Toggle Favorite">★</button>
        </div>
        <h3>${escapeHtml(tool.title)}</h3>
        <p>${escapeHtml(tool.desc)}</p>
      </div>
      <div class="tool-card-footer">
        <span class="tool-cat-tag">${escapeHtml(tool.category)}</span>
        <button type="button" class="link-btn" data-launch-tool="${tool.id}">Launch Tool →</button>
      </div>
    `;

    card.querySelector('[data-fav-id]').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavoriteTool(tool.id);
    });
    card.addEventListener('click', () => openToolWorkbench(tool.id));
    return card;
  }

  function renderAllToolGrids() {
    // 1. Featured Home Grid (Top 8 tools)
    const homeGrid = document.getElementById('home-featured-tools-grid');
    if (homeGrid) {
      homeGrid.innerHTML = '';
      TOOLS.slice(0, 8).forEach(t => homeGrid.appendChild(createToolCardElement(t)));
    }

    // 2. All Tools Directory Grid
    const dirGrid = document.getElementById('all-tools-grid');
    const searchQuery = (document.getElementById('directory-search-input')?.value || '').trim().toLowerCase();
    if (dirGrid) {
      dirGrid.innerHTML = '';
      const filtered = TOOLS.filter(t => {
        const catMatch = state.activeCategory === 'all' || t.category === state.activeCategory;
        const textMatch = !searchQuery || `${t.title} ${t.desc} ${t.category} ${(t.aliases || []).join(' ')}`.toLowerCase().includes(searchQuery);
        return catMatch && textMatch;
      });
      if (!filtered.length) {
        dirGrid.innerHTML = `<div class="empty-state-box"><h3>No matching tools</h3><p>Try searching for PDF, Word, Excel, Image, ZIP, or OCR.</p></div>`;
      } else {
        filtered.forEach(t => dirGrid.appendChild(createToolCardElement(t)));
      }
    }

    // 3. Dedicated Category Centers
    const pdfGrid = document.getElementById('pdf-center-tools-grid');
    if (pdfGrid) {
      pdfGrid.innerHTML = '';
      TOOLS.filter(t => t.category === 'PDF' || t.category === 'Security').forEach(t => pdfGrid.appendChild(createToolCardElement(t)));
    }

    const imgGrid = document.getElementById('image-center-tools-grid');
    if (imgGrid) {
      imgGrid.innerHTML = '';
      TOOLS.filter(t => t.category === 'Images' || t.category === 'OCR').forEach(t => imgGrid.appendChild(createToolCardElement(t)));
    }

    const zipGrid = document.getElementById('compression-center-tools-grid');
    if (zipGrid) {
      zipGrid.innerHTML = '';
      TOOLS.filter(t => t.category === 'Compression' || t.id === 'compress-pdf' || t.id === 'compress-image').forEach(t => zipGrid.appendChild(createToolCardElement(t)));
    }

    renderFavoritesView();
  }

  function toggleFavoriteTool(toolId) {
    const idx = state.favorites.indexOf(toolId);
    if (idx >= 0) state.favorites.splice(idx, 1);
    else state.favorites.push(toolId);
    localStorage.setItem('ahmedpdf_fav_tools', JSON.stringify(state.favorites));
    updateWorkspaceCounters();
    renderAllToolGrids();
    showToast(idx >= 0 ? 'Removed from favorites.' : '★ Added to favorites!');
  }

  function renderFavoritesView() {
    const favToolsGrid = document.getElementById('favorite-tools-grid');
    if (favToolsGrid) {
      favToolsGrid.innerHTML = '';
      const favTools = TOOLS.filter(t => state.favorites.includes(t.id));
      if (!favTools.length) {
        favToolsGrid.innerHTML = `<div class="empty-state-box"><p>No favorite tools pinned yet. Click the ★ icon on any tool card.</p></div>`;
      } else {
        favTools.forEach(t => favToolsGrid.appendChild(createToolCardElement(t)));
      }
    }

    const favFilesGrid = document.getElementById('favorite-files-grid');
    if (favFilesGrid) {
      favFilesGrid.innerHTML = '';
      const starredFiles = state.workspaceFiles.filter(f => f.favorite && !f.trashed);
      if (!starredFiles.length) {
        favFilesGrid.innerHTML = `<div class="empty-state-box"><p>No starred workspace files yet.</p></div>`;
      } else {
        starredFiles.forEach(f => favFilesGrid.appendChild(createFileManagerCard(f)));
      }
    }
  }

  /* ==========================================================================
   * 8. INTERACTIVE TOOL WORKBENCH MODAL (ALL 28 TOOLS)
   * ========================================================================== */
  function openToolWorkbench(toolId, preselectedFiles = null) {
    if (toolId === 'organize-pdf') {
      switchView('organizer');
      if (preselectedFiles && preselectedFiles[0]) loadPdfIntoOrganizer(preselectedFiles[0]);
      return;
    }

    const tool = TOOLS.find(t => t.id === toolId);
    if (!tool) return;

    state.activeWorkbenchTool = tool;
    state.workbenchFiles = preselectedFiles ? Array.from(preselectedFiles) : [...state.stagedFiles];

    document.getElementById('wb-tool-icon').textContent = tool.icon;
    document.getElementById('wb-tool-title').textContent = tool.title;
    document.getElementById('wb-tool-desc').textContent = tool.desc;
    document.getElementById('wb-progress-wrap').hidden = true;

    renderWorkbenchBody();
    document.getElementById('tool-workbench-modal').hidden = false;
  }

function buildStylePickerHtml(styles) {
    return `
      <div class="style-picker-section">
        <div class="style-picker-title">🎨 اختر شكل وتصميم المخرجات (Output Visual Style):</div>
        <div class="style-cards-grid">
          ${styles.map((s, idx) => `
            <label class="style-option-card ${idx === 0 ? 'active' : ''}">
              <input type="radio" name="wb-style-mode" value="${s.id}" ${idx === 0 ? 'checked' : ''} />
              <b>${s.icon} ${s.title}</b>
              <small>${s.desc}</small>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderWorkbenchBody() {
    const tool = state.activeWorkbenchTool;
    const body = document.getElementById('wb-modal-body');
    if (!tool || !body) return;

    let optionsHtml = '';

    if (tool.id === 'merge-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'direct', icon: '📑', title: 'Direct Seamless Merge', desc: 'دمج الصفحات مباشرة خلف بعضها' },
        { id: 'index', icon: '📋', title: 'With Index Cover Page', desc: 'إضافة صفحة فهرس بأسماء الملفات المدمجة في البداية' },
        { id: 'dividers', icon: '🔖', title: 'With Title Dividers', desc: 'إضافة صفحة فاصلة بعنوان كل ملف قبل بدايته' }
      ]);
    } else if (tool.id === 'split-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'range', icon: '🎯', title: 'Custom Page Range', desc: 'استخراج صفحات محددة في ملف PDF واحد' },
        { id: 'all', icon: '🗂️', title: 'Every Page to PDF (ZIP)', desc: 'فصل كل صفحة في ملف مستقل داخل ZIP' },
        { id: 'every', icon: '🔢', title: 'Every N Pages (ZIP)', desc: 'تقسيم كل عدد معين من الصفحات في ملف' },
        { id: 'odd-even', icon: '⚖️', title: 'Odd / Even Pages Only', desc: 'استخراج الصفحات الفردية أو الزوجية فقط' }
      ]) + `
        <div class="setting-row" id="wb-split-range-row">
          <label><b>Page Range (e.g. 1-3, 5) or Odd/Even:</b></label>
          <input type="text" id="wb-opt-range" class="input-field" value="1" placeholder="e.g. 1-3, 5 or odd / even" style="max-width:240px;" />
        </div>
        <div class="setting-row" id="wb-split-every-row" hidden>
          <label><b>Pages per Split File (N):</b></label>
          <input type="number" id="wb-opt-every-n" class="input-field" value="2" min="1" style="max-width:120px;" />
        </div>
      `;
    } else if (tool.id === 'compress-pdf' || tool.id === 'compress-image') {
      optionsHtml = buildStylePickerHtml([
        { id: 'balanced', icon: '⚡', title: 'Balanced Recommended', desc: 'أفضل توازن بين الحجم الصغير والجودة العالية' },
        { id: 'extreme', icon: '📉', title: 'Extreme Shrink (Web/Email)', desc: 'أقصى ضغط ممكن لتقليل المساحة لأبعد حد' },
        { id: 'hq', icon: '💎', title: 'High Print Quality', desc: 'حفاظ عالي على دقة النصوص والتفاصيل' }
      ]) + `
        <div class="setting-row">
          <label><b>Fine-Tune Compression Quality (15% - 95%):</b></label>
          <input type="range" id="wb-opt-quality" min="15" max="95" value="${state.settings.imgQuality}" style="max-width:220px;" />
        </div>
      `;
    } else if (tool.id === 'watermark-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'diagonal', icon: '↗️', title: 'Single Diagonal Banner', desc: 'علامة مائية قطرية كبيرة في منتصف الصفحة' },
        { id: 'grid', icon: '⊞', title: 'Repeated Security Grid', desc: 'شبكة علامات مائية متكررة تغطي كامل الصفحة' },
        { id: 'stamp', icon: '💮', title: 'Official Circular Stamp', desc: 'ختم دائري رسمي مزدوج الإطار بالتاريخ' }
      ]) + `
        <div class="setting-row">
          <label><b>Watermark / Stamp Text (يدعم العربي والإنجليزي):</b></label>
          <input type="text" id="wb-opt-wm-text" class="input-field" value="سري للغاية — Eng: Ahmed M Hosny" style="max-width:290px;" />
        </div>
        <div class="setting-row">
          <label><b>Color & Opacity (10% - 90%):</b></label>
          <div style="display:flex;gap:8px;align-items:center;">
            <input type="color" id="wb-opt-wm-color" value="#0284c7" style="width:42px;height:34px;border:0;background:transparent;" />
            <input type="number" id="wb-opt-wm-opacity" class="input-field" value="28" min="10" max="90" style="width:90px;" />
          </div>
        </div>
      `;
    } else if (tool.id === 'pagenum-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'classic', icon: '🔢', title: 'Minimal Classic', desc: 'ترقيم وترويسة كلاسيكية نظيفة' },
        { id: 'ribbon', icon: '🎀', title: 'Modern Navy Ribbon', desc: 'شريط علوي داكن وشارة ترقيم زرقاء أنيقة' },
        { id: 'boxed', icon: '▭', title: 'Framed Boxed Header', desc: 'ترويسة وترقيم داخل إطار رسمي محدد' }
      ]) + `
        <div class="setting-row">
          <label><b>Header Text (يدعم العربي والإنجليزي):</b></label>
          <input type="text" id="wb-opt-header" class="input-field" placeholder="مثال: جامعة مايو — كلية الهندسة" style="max-width:290px;" />
        </div>
      `;
    } else if (tool.id === 'sign-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'handwritten', icon: '✍️', title: 'Freehand Signature', desc: 'توقيع يدوي مباشر مع الاسم والتاريخ' },
        { id: 'seal', icon: '🛡️', title: 'Framed Official Box', desc: 'وضع التوقيع والاسم داخل ختم مستطيل رسمي' }
      ]) + `
        <div class="setting-row">
          <label><b>Signer Name / Title (يدعم العربي):</b></label>
          <input type="text" id="wb-opt-sign-text" class="input-field" value="Eng: Ahmed M Hosny" style="max-width:260px;" />
        </div>
        <div class="setting-row">
          <label><b>Apply Signature To:</b></label>
          <select id="wb-opt-sign-pages" class="select-field" style="max-width:220px;">
            <option value="last">Last Page Only</option>
            <option value="all">Every Page in PDF</option>
          </select>
        </div>
        <div style="margin-top:10px;">
          <label style="display:block;margin-bottom:6px;"><b>Draw Signature (Mouse or Touch) OR Upload Transparent PNG:</b></label>
          <canvas id="wb-sig-canvas" width="380" height="120" style="background:#fff;border-radius:8px;cursor:crosshair;border:2px solid var(--primary);touch-action:none;"></canvas>
          <div style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;">
            <button type="button" class="btn-secondary btn-sm" id="wb-clear-sig-btn">🗑️ Clear Pad</button>
            <input type="file" id="wb-sig-upload-input" accept="image/*" hidden />
            <button type="button" class="btn-secondary btn-sm" id="wb-upload-sig-btn">📤 Upload Signature Image</button>
          </div>
        </div>
      `;
    } else if (tool.id === 'cover-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'university', icon: '🏛️', title: 'Academic University Cover', desc: 'غلاف جامعي رسمي للأبحاث والمحاضرات والشيتات' },
        { id: 'engineering', icon: '⚙️', title: 'Engineering Technical Report', desc: 'غلاف هندسي تقني عصري بشبكة ومواصفات' },
        { id: 'executive', icon: '💼', title: 'Executive Dark Cover', desc: 'غلاف شركات فخم بخلفية كحلية داكنة' }
      ]) + `
        <div class="setting-row"><label><b>Institution / Faculty:</b></label><input type="text" id="wb-cov-inst" class="input-field" value="جامعة مايو — كلية الهندسة" style="max-width:290px;" /></div>
        <div class="setting-row"><label><b>Document / Course Title:</b></label><input type="text" id="wb-cov-title" class="input-field" value="Logic Design & Web Engineering" style="max-width:290px;" /></div>
        <div class="setting-row"><label><b>Subtitle / Section:</b></label><input type="text" id="wb-cov-sub" class="input-field" value="Official Lecture Notes & Lab Manual" style="max-width:290px;" /></div>
        <div class="setting-row"><label><b>Author / Supervised By:</b></label><input type="text" id="wb-cov-author" class="input-field" value="Eng: Ahmed M Hosny" style="max-width:290px;" /></div>
      `;
    } else if (tool.id === 'pdf-bg-theme') {
      optionsHtml = buildStylePickerHtml([
        { id: 'sepia', icon: '📜', title: 'Eye-Care Warm Sepia', desc: 'خلفية كريمي دافئة مريحة جداً للقراءة الطويلة' },
        { id: 'night', icon: '🌙', title: 'Dark Night Reader', desc: 'عكس الإضاءة لوضع ليلي مريح للعين' },
        { id: 'grayscale', icon: '🖨️', title: 'Print Grayscale (Save Ink)', desc: 'تحويل الألوان إلى تدرج رمادي واضح للطباعة' }
      ]);
    } else if (tool.id === 'crop-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'light', icon: '📏', title: 'Light Margin Trim (5%)', desc: 'قص خفيف للحواف البيضاء الزائدة' },
        { id: 'medium', icon: '✂️', title: 'Medium Crop (10%)', desc: 'تكبير محتوى الصفحة وقص الهوامش المتوسطة' },
        { id: 'tight', icon: '🔍', title: 'Tight Focus Crop (16%)', desc: 'قص عميق للتركيز على منتصف الصفحة' }
      ]);
    } else if (tool.id === 'redact-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'top-header', icon: '⬆️', title: 'Mask Top Header Strip', desc: 'طمس الشريط العلوي (الأسماء/الأرقام السرية) بكل الصفحات' },
        { id: 'bottom-footer', icon: '⬇️', title: 'Mask Bottom Footer Strip', desc: 'طمس الشريط السفلي والتوقيعات القديمة' },
        { id: 'center-id', icon: '⬛', title: 'Mask Custom Vertical Zone', desc: 'طمس منطقة مخصصة تحدد ارتفاعها بنفسك' }
      ]) + `
        <div class="setting-row">
          <label><b>Vertical Position % (from top, for Custom Zone):</b></label>
          <input type="number" id="wb-redact-y" class="input-field" value="20" min="5" max="90" style="max-width:120px;" />
        </div>
      `;
    } else if (tool.id === 'protect-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'anti-copy', icon: '🛡️', title: 'Anti-Copy Flattened PDF', desc: 'دمج الصفحات كطبقات غير قابلة لنسخ النصوص أو التعديل' },
        { id: 'stamped-lock', icon: '🔒', title: 'Protected + Security Stamp', desc: 'تشفير بصري مع ختم حماية ورقم تسلسلي' }
      ]) + `
        <div class="setting-row">
          <label><b>Owner / Security Passcode Tag:</b></label>
          <input type="password" id="wb-protect-pass" class="input-field" placeholder="Enter protection key..." style="max-width:240px;" />
        </div>
      `;
    } else if (tool.id === 'docx-to-pdf' || tool.id === 'txt-to-pdf' || tool.id === 'pdf-to-docx' || tool.id === 'pptx-to-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'academic', icon: '🏛️', title: 'Academic Framed', desc: 'إطار كلاسيكي مزدوج رسمي مع دعم كامل للعربي' },
        { id: 'modern', icon: '✨', title: 'Modern Blue Accent', desc: 'تصميم عصري بشريط جانبي ملون وترويسة أنيقة' },
        { id: 'dark', icon: '🌙', title: 'Dark Reader Theme', desc: 'خلفية كحلية داكنة ونصوص فاتحة مريحة للشاشات' }
      ]);
    } else if (tool.id === 'xlsx-to-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'modern', icon: '📊', title: 'Modern Colored Grid', desc: 'جدول بترويسة زرقاء وصفوف متبادلة واضحة' },
        { id: 'classic', icon: '📋', title: 'Official B&W Print Grid', desc: 'جدول رسمي بخطوط سوداء للطباعة والكشوف الجامعية' },
        { id: 'executive', icon: '💼', title: 'Executive Summary Report', desc: 'تقرير إداري مع بانر علوي وملخص إحصائي للجدول' }
      ]) + `
        <div class="setting-row">
          <label><b>Page Orientation (اتجاه الصفحة):</b></label>
          <select id="wb-xlsx-orient" class="select-field" style="max-width:220px;">
            <option value="landscape">Landscape (بالعرض — ممتاز للجداول العريضة)</option>
            <option value="portrait">Portrait (بالطول — للجداول الصغيرة)</option>
          </select>
        </div>
      `;
    } else if (tool.id === 'xlsx-to-csv') {
      optionsHtml = buildStylePickerHtml([
        { id: 'csv', icon: '📄', title: 'Standard CSV (.csv)', desc: 'ملف قيم مفصولة بفواصل متوافق مع الإكسل' },
        { id: 'json', icon: '🧩', title: 'Structured JSON (.json)', desc: 'مصفوفة كائنات JSON جاهزة للبرمجة وقواعد البيانات' },
        { id: 'html', icon: '🌐', title: 'Styled HTML Table (.html)', desc: 'صفحة جدول ويب منسقة جاهزة للعرض والطباعة' }
      ]);
    } else if (tool.id === 'images-to-pdf') {
      optionsHtml = buildStylePickerHtml([
        { id: 'full', icon: '🖼️', title: 'Full-Bleed Native Size', desc: 'كل صورة تملأ صفحتها بالكامل بدون هوامش' },
        { id: 'card', icon: '🎴', title: 'Framed A4 Card + Caption', desc: 'إطار أنيق وسط صفحة A4 مع عنوان أسفل كل صورة' },
        { id: 'grid', icon: '⊞', title: '2×2 Collage Grid (4 per page)', desc: 'دمج كل 4 صور في صفحة A4 واحدة منظمة' }
      ]) + `
        <div class="setting-row">
          <label><b>Optional Caption Prefix (لوضع البطاقات):</b></label>
          <input type="text" id="wb-img-caption" class="input-field" placeholder="مثال: مرفق رقم / Figure" style="max-width:260px;" />
        </div>
      `;
    } else if (tool.id === 'image-converter') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Target Image Format:</b></label>
          <select id="wb-opt-img-fmt" class="select-field" style="max-width:260px;">
            <option value="image/png">PNG (Lossless / Supports Transparency)</option>
            <option value="image/jpeg">JPG (Flattens Transparency to White)</option>
            <option value="image/webp">WEBP (Modern High Efficiency)</option>
          </select>
        </div>
      `;
    } else if (tool.id === 'resize-image') {
      optionsHtml = buildStylePickerHtml([
        { id: 'custom', icon: '📐', title: 'Custom Dimensions', desc: 'تحديد العرض والارتفاع يدوياً مع حفظ النسبة' },
        { id: 'hd', icon: '🖥️', title: 'Full HD (1920×1080)', desc: 'مقاس شاشات العرض والعروض التقديمية' },
        { id: 'square', icon: '⏹️', title: 'Square Post (1080×1080)', desc: 'مقاس مربع مثالي للبروفايل والسوشيال ميديا' },
        { id: 'a4', icon: '📄', title: 'A4 Print (1240×1754)', desc: 'مقاس ورق الطباعة القياسي' }
      ]) + `
        <div class="setting-row">
          <label><b>Width × Height (px):</b></label>
          <div style="display:flex;gap:8px;align-items:center;">
            <input type="number" id="wb-opt-width" class="input-field" value="1080" min="16" max="8000" style="width:100px;" />
            <span>×</span>
            <input type="number" id="wb-opt-height" class="input-field" value="1080" min="16" max="8000" style="width:100px;" />
          </div>
        </div>
        <div class="setting-row">
          <label><b>Rotation Angle:</b></label>
          <select id="wb-opt-rotate" class="select-field" style="max-width:180px;">
            <option value="0">0° (No Rotation)</option>
            <option value="90">90° Clockwise</option>
            <option value="180">180° Flip</option>
            <option value="270">270° Counter-Clockwise</option>
          </select>
        </div>
      `;
    } else if (tool.id === 'remove-bg') {
      optionsHtml = buildStylePickerHtml([
        { id: 'clean-transparent', icon: '🪄', title: 'Transparent PNG Signature', desc: 'إزالة الخلفية البيضاء تماماً مع الحفاظ على التوقيع' },
        { id: 'blue-ink', icon: '🖊️', title: 'Convert to Royal Blue Ink', desc: 'تفريغ الخلفية وتحويل التوقيع للون الحبر الأزرق الرسمي' }
      ]) + `
        <div class="setting-row">
          <label><b>White Threshold Sensitivity (150 - 250):</b></label>
          <input type="range" id="wb-bg-thresh" min="150" max="250" value="215" style="max-width:220px;" />
        </div>
      `;
    } else if (tool.id === 'doc-scanner-filter') {
      optionsHtml = buildStylePickerHtml([
        { id: 'bw-crisp', icon: '📄', title: 'Crisp B&W Scanner', desc: 'تبييض الورق وتغميق النص الأسود مثل ماكينة التصوير' },
        { id: 'magic-color', icon: '✨', title: 'Magic Enhanced Color', desc: 'توضيح الألوان والأختام مع إزالة ظل الإضاءة' }
      ]) + `
        <div class="setting-row">
          <label><b>Export Output As:</b></label>
          <select id="wb-scan-out-fmt" class="select-field" style="max-width:220px;">
            <option value="pdf">Combined Scanned PDF (.pdf)</option>
            <option value="jpg">High-Contrast JPG Image (.jpg)</option>
          </select>
        </div>
      `;
    } else if (tool.id === 'id-photo-maker') {
      optionsHtml = buildStylePickerHtml([
        { id: 'single-4x6', icon: '🪪', title: 'Single 4×6 cm ID Photo', desc: 'صورة شخصية مفردة بمقاس البطاقة والكارنيه الرسمي' },
        { id: 'sheet-8', icon: '🖨️', title: 'Printable 8-Photo Sheet', desc: 'تجميع 8 نسخ من الصورة في ورقة واحدة جاهزة للطباعة' }
      ]);
    } else if (tool.id === 'ocr-scanner') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Document Language (لغة النص في الصورة أو الـ PDF):</b></label>
          <select id="wb-ocr-lang" class="select-field" style="max-width:260px;">
            <option value="ara+eng">Arabic + English (عربي وإنجليزي معاً)</option>
            <option value="ara">Arabic Only (اللغة العربية)</option>
            <option value="eng">English Only (اللغة الإنجليزية)</option>
          </select>
        </div>
      `;
    } else if (tool.id === 'qr-barcode-studio') {
      optionsHtml = buildStylePickerHtml([
        { id: 'png', icon: '📱', title: 'Standalone High-Res QR (PNG)', desc: 'توليد صورة QR Code مستقلة بألوانك الخاصة' },
        { id: 'stamp-pdf', icon: '📄', title: 'Stamp QR onto Uploaded PDF', desc: 'لصق الـ QR Code تلقائياً أسفل صفحات ملف الـ PDF' }
      ]) + `
        <div class="setting-row">
          <label><b>QR Content (URL, Text, Student ID, PIN):</b></label>
          <input type="text" id="wb-qr-text" class="input-field" value="https://ahmedpdf.local/verify" style="max-width:290px;" />
        </div>
        <div class="setting-row">
          <label><b>QR Foreground Color:</b></label>
          <input type="color" id="wb-qr-color" value="#0f172a" style="width:50px;height:34px;border:0;" />
        </div>
      `;
    } else if (tool.id === 'data-json-converter') {
      optionsHtml = buildStylePickerHtml([
        { id: 'json', icon: '🧩', title: 'Export as JSON', desc: 'تحويل الجدول إلى JSON منسق' },
        { id: 'md', icon: '📝', title: 'Export as Markdown Table', desc: 'جدول Markdown جاهز للـ GitHub والتوثيق' },
        { id: 'html', icon: '🌐', title: 'Export as Styled HTML Table', desc: 'كود جدول HTML كامل بالتنسيقات' },
        { id: 'csv', icon: '📊', title: 'Export as CSV', desc: 'ملف CSV قياسي' }
      ]);
    } else if (tool.id === 'text-diff-compare') {
      optionsHtml = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px;">
          <div>
            <label style="font-size:12px;font-weight:700;">Original Text (أو ارفع ملفين بالأعلى):</label>
            <textarea id="wb-diff-a" class="input-field" rows="5" placeholder="Paste first version here..."></textarea>
          </div>
          <div>
            <label style="font-size:12px;font-weight:700;">Modified Text:</label>
            <textarea id="wb-diff-b" class="input-field" rows="5" placeholder="Paste second version here..."></textarea>
          </div>
        </div>
      `;
    } else if (tool.id === 'pdf-metadata') {
      optionsHtml = `
        <div class="setting-row"><label><b>New Document Title:</b></label><input type="text" id="wb-meta-title" class="input-field" placeholder="Document Title" style="max-width:280px;" /></div>
        <div class="setting-row"><label><b>New Author:</b></label><input type="text" id="wb-meta-author" class="input-field" value="Eng: Ahmed M Hosny" style="max-width:280px;" /></div>
        <div class="setting-row"><label><b>New Subject:</b></label><input type="text" id="wb-meta-subject" class="input-field" placeholder="Subject" style="max-width:280px;" /></div>
      `;
    }

    body.innerHTML = `
      <div class="mini-dropzone" id="wb-dropzone">
        <input type="file" id="wb-file-input" accept="${tool.accept}" ${tool.multiple ? 'multiple' : ''} hidden />
        <p>Select or drop file(s) for <b>${escapeHtml(tool.title)}</b> (${escapeHtml(tool.accept)})</p>
        <button type="button" class="btn-secondary btn-sm" id="wb-add-files-btn">＋ Choose File(s)</button>
      </div>
      <div id="wb-selected-files-list" class="staged-file-list" style="margin:14px 0;"></div>
      <div id="wb-tool-options">${optionsHtml}</div>
      <div id="wb-result-box" style="margin-top:16px;"></div>
    `;

    renderWorkbenchFileList();

    // Activate visual style radio cards
    body.querySelectorAll('.style-option-card').forEach(card => {
      card.addEventListener('click', () => {
        body.querySelectorAll('.style-option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          // Handle dynamic sub-options for split and resize
          if (tool.id === 'split-pdf') {
            document.getElementById('wb-split-range-row').hidden = (radio.value === 'all' || radio.value === 'every');
            document.getElementById('wb-split-every-row').hidden = radio.value !== 'every';
            if (radio.value === 'odd-even') document.getElementById('wb-opt-range').value = 'odd';
          } else if (tool.id === 'resize-image') {
            const presets = { hd: [1920, 1080], square: [1080, 1080], a4: [1240, 1754] };
            if (presets[radio.value]) {
              document.getElementById('wb-opt-width').value = presets[radio.value][0];
              document.getElementById('wb-opt-height').value = presets[radio.value][1];
            }
          } else if (tool.id === 'compress-pdf' || tool.id === 'compress-image') {
            const qMap = { extreme: 38, balanced: 72, hq: 90 };
            if (qMap[radio.value]) document.getElementById('wb-opt-quality').value = qMap[radio.value];
          }
        }
      });
    });

    // Workbench Drag & Drop + File Browse
    const wbDz = document.getElementById('wb-dropzone');
    wbDz?.addEventListener('dragover', (e) => { e.preventDefault(); wbDz.style.borderColor = 'var(--primary)'; });
    wbDz?.addEventListener('dragleave', () => { wbDz.style.borderColor = ''; });
    wbDz?.addEventListener('drop', async (e) => {
      e.preventDefault();
      wbDz.style.borderColor = '';
      const incoming = Array.from(e.dataTransfer?.files || []);
      for (const f of incoming) {
        const check = await verifyFileSignature(f);
        if (!check.valid) { showToast(`⛔ Rejected ${f.name}: ${check.reason}`); continue; }
        if (tool.multiple) state.workbenchFiles.push(f);
        else state.workbenchFiles = [f];
      }
      renderWorkbenchFileList();
    });

    document.getElementById('wb-add-files-btn')?.addEventListener('click', () => {
      document.getElementById('wb-file-input')?.click();
    });
    document.getElementById('wb-file-input')?.addEventListener('change', async (e) => {
      const incoming = Array.from(e.target.files || []);
      for (const f of incoming) {
        const check = await verifyFileSignature(f);
        if (!check.valid) {
          showToast(`⛔ Rejected ${f.name}: ${check.reason}`);
          continue;
        }
        if (tool.multiple) state.workbenchFiles.push(f);
        else state.workbenchFiles = [f];
      }
      renderWorkbenchFileList();
    });

    // Signature Canvas Drawing (Supports both Mouse & Mobile Touch + Image Upload)
    const sigCanvas = document.getElementById('wb-sig-canvas');
    if (sigCanvas) {
      const sCtx = sigCanvas.getContext('2d');
      sCtx.strokeStyle = '#0f172a';
      sCtx.lineWidth = 2.8;
      sCtx.lineCap = 'round';
      let drawing = false;

      const getPos = (e) => {
        const rect = sigCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: (clientX - rect.left) * (sigCanvas.width / rect.width),
          y: (clientY - rect.top) * (sigCanvas.height / rect.height)
        };
      };

      sigCanvas.addEventListener('mousedown', (e) => { drawing = true; const p = getPos(e); sCtx.beginPath(); sCtx.moveTo(p.x, p.y); });
      sigCanvas.addEventListener('mousemove', (e) => { if (!drawing) return; const p = getPos(e); sCtx.lineTo(p.x, p.y); sCtx.stroke(); });
      window.addEventListener('mouseup', () => { drawing = false; });

      sigCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); drawing = true; const p = getPos(e); sCtx.beginPath(); sCtx.moveTo(p.x, p.y); }, { passive: false });
      sigCanvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (!drawing) return; const p = getPos(e); sCtx.lineTo(p.x, p.y); sCtx.stroke(); }, { passive: false });
      sigCanvas.addEventListener('touchend', () => { drawing = false; });

      document.getElementById('wb-clear-sig-btn')?.addEventListener('click', () => sCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height));
      document.getElementById('wb-upload-sig-btn')?.addEventListener('click', () => document.getElementById('wb-sig-upload-input')?.click());
      document.getElementById('wb-sig-upload-input')?.addEventListener('change', (e) => {
        const imgFile = e.target.files?.[0];
        if (!imgFile) return;
        const img = new Image();
        img.onload = () => {
          sCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
          sCtx.drawImage(img, 10, 5, sigCanvas.width - 20, sigCanvas.height - 10);
        };
        img.src = URL.createObjectURL(imgFile);
      });
    }
  }

  function renderWorkbenchFileList() {
    const listEl = document.getElementById('wb-selected-files-list');
    if (!listEl) return;
    if (!state.workbenchFiles.length) {
      listEl.innerHTML = `<div class="muted-note" style="text-align:center;padding:8px;">No files selected yet.</div>`;
      return;
    }
    listEl.innerHTML = state.workbenchFiles.map((f, idx) => `
      <div class="staged-file-row">
        <div>
          <span class="file-badge-ext">${escapeHtml((f.name.split('.').pop() || 'FILE'))}</span>
          <b style="margin-left:8px;">${escapeHtml(f.name)}</b>
          <small style="color:var(--text-muted);margin-left:8px;">(${formatBytes(f.size)})</small>
        </div>
        <div style="display:flex;gap:4px;">
          ${state.workbenchFiles.length > 1 && idx > 0 ? `<button type="button" class="btn-secondary btn-sm" data-wb-up="${idx}">↑</button>` : ''}
          <button type="button" class="btn-danger btn-sm" data-wb-rm="${idx}">✕</button>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('[data-wb-up]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-wb-up'));
        const tmp = state.workbenchFiles[i - 1];
        state.workbenchFiles[i - 1] = state.workbenchFiles[i];
        state.workbenchFiles[i] = tmp;
        renderWorkbenchFileList();
      });
    });
    listEl.querySelectorAll('[data-wb-rm]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.workbenchFiles.splice(Number(btn.getAttribute('data-wb-rm')), 1);
        renderWorkbenchFileList();
      });
    });
  }

async function runActiveWorkbenchTool() {
    const tool = state.activeWorkbenchTool;
    const files = state.workbenchFiles;
    const resultBox = document.getElementById('wb-result-box');
    const progWrap = document.getElementById('wb-progress-wrap');
    const progStatus = document.getElementById('wb-progress-status');
    const progPct = document.getElementById('wb-progress-pct');
    const progBar = document.getElementById('wb-progress-bar');

    const allowFileless = (tool?.id === 'qr-barcode-studio' || tool?.id === 'text-diff-compare');
    if (!tool || (!files.length && !allowFileless)) {
      showToast('⚠️ Please select at least one valid file first.');
      return;
    }

    const selectedStyle = document.querySelector('input[name="wb-style-mode"]:checked')?.value || 'academic';

    function updateProgress(pct, msg) {
      if (progWrap) progWrap.hidden = false;
      if (progStatus) progStatus.textContent = msg;
      if (progPct) progPct.textContent = `${pct}%`;
      if (progBar) progBar.style.width = `${pct}%`;
    }

    try {
      updateProgress(10, `Starting ${tool.title}...`);
      let res = null;
      const firstFile = files[0];

      if (tool.id === 'merge-pdf') {
        if (selectedStyle === 'index') {
          const tocList = files.map((f, idx) => `${idx + 1}. ${f.name} (${formatBytes(f.size)})`).join('\n');
          const coverBlob = await createCleanTextPdf('Merged PDF Index — فهرس الملفات المدمجة', tocList, 'modern');
          const coverFile = new File([coverBlob], '00_Index_Cover.pdf', { type: 'application/pdf' });
          res = await executeMergePdf([coverFile, ...files], updateProgress);
        } else if (selectedStyle === 'dividers') {
          const expanded = [];
          for (let i = 0; i < files.length; i++) {
            const divBlob = await createCleanTextPdf(`Section ${i + 1}: ${files[i].name}`, `Document Title: ${files[i].name}\nSize: ${formatBytes(files[i].size)}`, 'academic');
            expanded.push(new File([divBlob], `Divider_${i + 1}.pdf`, { type: 'application/pdf' }), files[i]);
          }
          res = await executeMergePdf(expanded, updateProgress);
        } else {
          res = await executeMergePdf(files, updateProgress);
        }

      } else if (tool.id === 'split-pdf') {
        let rng = document.getElementById('wb-opt-range')?.value || '1';
        const ev = document.getElementById('wb-opt-every-n')?.value || '2';
        let mode = selectedStyle;
        if (selectedStyle === 'odd-even') {
          const bytes = await firstFile.arrayBuffer();
          const srcDoc = await window.PDFLib.PDFDocument.load(bytes);
          const total = srcDoc.getPageCount();
          const wantEven = rng.trim().toLowerCase() === 'even';
          const pagesArr = [];
          for (let p = 1; p <= total; p++) {
            if (wantEven ? (p % 2 === 0) : (p % 2 === 1)) pagesArr.push(p);
          }
          rng = pagesArr.join(',');
          mode = 'range';
        }
        res = await executeSplitPdf(firstFile, mode, rng, ev, updateProgress);

      } else if (tool.id === 'compress-pdf' || tool.id === 'pdf-to-jpg' || tool.id === 'pdf-to-png') {
        const q = Number(document.getElementById('wb-opt-quality')?.value || state.settings.imgQuality);
        res = await executePdfRenderOperation(firstFile, tool.id, q, updateProgress);

      } else if (tool.id === 'watermark-pdf' || tool.id === 'pagenum-pdf' || tool.id === 'sign-pdf') {
        const sigCanvas = document.getElementById('wb-sig-canvas');
        res = await executePdfOverlayTool(firstFile, tool.id, {
          styleMode: selectedStyle,
          text: document.getElementById('wb-opt-wm-text')?.value,
          color: document.getElementById('wb-opt-wm-color')?.value || '#0284c7',
          opacity: document.getElementById('wb-opt-wm-opacity')?.value,
          headerText: document.getElementById('wb-opt-header')?.value,
          overlayText: document.getElementById('wb-opt-sign-text')?.value,
          allPages: document.getElementById('wb-opt-sign-pages')?.value === 'all',
          signatureDataUrl: sigCanvas ? sigCanvas.toDataURL('image/png') : null
        }, updateProgress);

      } else if (tool.id === 'cover-pdf') {
        const inst = document.getElementById('wb-cov-inst')?.value || 'جامعة مايو — كلية الهندسة';
        const title = document.getElementById('wb-cov-title')?.value || firstFile.name;
        const sub = document.getElementById('wb-cov-sub')?.value || '';
        const author = document.getElementById('wb-cov-author')?.value || 'Eng: Ahmed M Hosny';

        const cw = 1240, ch = 1754;
        const canvas = document.createElement('canvas');
        canvas.width = cw;
        canvas.height = ch;
        const ctx = canvas.getContext('2d');

        if (selectedStyle === 'executive') {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, cw, ch);
          ctx.fillStyle = '#0284c7';
          ctx.fillRect(0, 0, 45, ch);
        } else if (selectedStyle === 'engineering') {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(0, 0, cw, ch);
          ctx.strokeStyle = '#cbd5e1';
          for (let x = 0; x < cw; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke(); }
          for (let y = 0; y < ch; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke(); }
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(80, 120, cw - 160, 160);
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, cw, ch);
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 10;
          ctx.strokeRect(50, 50, cw - 100, ch - 100);
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 4;
          ctx.strokeRect(68, 68, cw - 136, ch - 136);
        }

        ctx.textAlign = 'center';
        ctx.direction = containsArabic(inst) ? 'rtl' : 'ltr';
        ctx.fillStyle = selectedStyle === 'engineering' ? '#38bdf8' : (selectedStyle === 'executive' ? '#38bdf8' : '#0284c7');
        ctx.font = '800 36px "Cairo", "Inter", sans-serif';
        ctx.fillText(inst, cw / 2, 215, cw - 200);

        ctx.direction = containsArabic(title) ? 'rtl' : 'ltr';
        ctx.fillStyle = selectedStyle === 'executive' ? '#ffffff' : '#0f172a';
        ctx.font = '800 54px "Cairo", "Inter", sans-serif';
        ctx.fillText(title, cw / 2, ch / 2 - 60, cw - 200);

        ctx.direction = containsArabic(sub) ? 'rtl' : 'ltr';
        ctx.fillStyle = selectedStyle === 'executive' ? '#94a3b8' : '#475569';
        ctx.font = '600 30px "Cairo", "Inter", sans-serif';
        ctx.fillText(sub, cw / 2, ch / 2 + 25, cw - 220);

        ctx.direction = containsArabic(author) ? 'rtl' : 'ltr';
        ctx.fillStyle = selectedStyle === 'executive' ? '#38bdf8' : '#0f172a';
        ctx.font = '800 32px "Cairo", "Inter", sans-serif';
        ctx.fillText(author, cw / 2, ch - 260, cw - 200);

        ctx.direction = 'ltr';
        ctx.fillStyle = '#64748b';
        ctx.font = '600 22px "Cairo", "Inter", sans-serif';
        ctx.fillText(new Date().toLocaleDateString(), cw / 2, ch - 190);

        const covJpg = canvas.toDataURL('image/jpeg', 0.93);
        const srcDoc = await window.PDFLib.PDFDocument.load(await firstFile.arrayBuffer());
        const outDoc = await window.PDFLib.PDFDocument.create();
        const covEmbed = await outDoc.embedJpg(covJpg);
        const covPage = outDoc.addPage([595.28, 841.89]);
        covPage.drawImage(covEmbed, { x: 0, y: 0, width: 595.28, height: 841.89 });
        const copied = await outDoc.copyPages(srcDoc, srcDoc.getPageIndices());
        copied.forEach(p => outDoc.addPage(p));
        const outBytes = await outDoc.save();
        res = {
          blob: new Blob([outBytes], { type: 'application/pdf' }),
          name: `${firstFile.name.replace(/\.pdf$/i, '')}_WithCover.pdf`,
          summary: `Prepended ${selectedStyle} cover page to ${copied.length}-page PDF.`
        };

      } else if (tool.id === 'pdf-bg-theme') {
        configurePdfJsWorker();
        const pdf = await window.pdfjsLib.getDocument({ data: await firstFile.arrayBuffer() }).promise;
        const outPdf = await window.PDFLib.PDFDocument.create();
        for (let p = 1; p <= pdf.numPages; p++) {
          updateProgress(Math.round((p / pdf.numPages) * 90), `Applying ${selectedStyle} mode to page ${p}...`);
          const page = await pdf.getPage(p);
          const vp = page.getViewport({ scale: 1.6 });
          const canvas = document.createElement('canvas');
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport: vp }).promise;

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            if (selectedStyle === 'night') {
              d[i] = 255 - d[i];
              d[i + 1] = 255 - d[i + 1];
              d[i + 2] = 255 - d[i + 2];
            } else if (selectedStyle === 'sepia') {
              d[i] = Math.min(255, d[i] * 0.96);
              d[i + 1] = Math.min(255, d[i + 1] * 0.91);
              d[i + 2] = Math.min(255, d[i + 2] * 0.78);
            } else {
              const avg = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
              d[i] = d[i + 1] = d[i + 2] = avg;
            }
          }
          ctx.putImageData(imgData, 0, 0);
          const jpgEmbed = await outPdf.embedJpg(canvas.toDataURL('image/jpeg', 0.88));
          const origVp = page.getViewport({ scale: 1.0 });
          const np = outPdf.addPage([origVp.width, origVp.height]);
          np.drawImage(jpgEmbed, { x: 0, y: 0, width: origVp.width, height: origVp.height });
        }
        res = {
          blob: new Blob([await outPdf.save()], { type: 'application/pdf' }),
          name: `${firstFile.name.replace(/\.pdf$/i, '')}_${selectedStyle}.pdf`,
          summary: `Converted all ${pdf.numPages} pages to ${selectedStyle} reader mode.`
        };

      } else if (tool.id === 'crop-pdf') {
        const pdfDoc = await window.PDFLib.PDFDocument.load(await firstFile.arrayBuffer());
        const ratioMap = { light: 0.05, medium: 0.10, tight: 0.16 };
        const pct = ratioMap[selectedStyle] || 0.08;
        pdfDoc.getPages().forEach(p => {
          const { width, height } = p.getSize();
          const dx = width * pct, dy = height * pct;
          p.setCropBox(dx, dy, width - dx * 2, height - dy * 2);
          p.setMediaBox(dx, dy, width - dx * 2, height - dy * 2);
        });
        res = {
          blob: new Blob([await pdfDoc.save()], { type: 'application/pdf' }),
          name: `${firstFile.name.replace(/\.pdf$/i, '')}_Cropped.pdf`,
          summary: `Trimmed ${Math.round(pct * 100)}% margins across all pages.`
        };

      } else if (tool.id === 'redact-pdf') {
        const pdfDoc = await window.PDFLib.PDFDocument.load(await firstFile.arrayBuffer());
        const customY = Number(document.getElementById('wb-redact-y')?.value || 20) / 100;
        pdfDoc.getPages().forEach(p => {
          const { width, height } = p.getSize();
          if (selectedStyle === 'top-header') {
            p.drawRectangle({ x: 0, y: height - 65, width, height: 65, color: window.PDFLib.rgb(0, 0, 0) });
          } else if (selectedStyle === 'bottom-footer') {
            p.drawRectangle({ x: 0, y: 0, width, height: 60, color: window.PDFLib.rgb(0, 0, 0) });
          } else {
            p.drawRectangle({ x: 30, y: height * (1 - customY) - 45, width: width - 60, height: 50, color: window.PDFLib.rgb(0, 0, 0) });
          }
        });
        res = {
          blob: new Blob([await pdfDoc.save()], { type: 'application/pdf' }),
          name: `${firstFile.name.replace(/\.pdf$/i, '')}_Redacted.pdf`,
          summary: `Applied permanent black-out redaction (${selectedStyle}) across all pages.`
        };

      } else if (tool.id === 'protect-pdf') {
        configurePdfJsWorker();
        const passTag = document.getElementById('wb-protect-pass')?.value || 'AHMEDPDF-LOCKED';
        const pdf = await window.pdfjsLib.getDocument({ data: await firstFile.arrayBuffer() }).promise;
        const outPdf = await window.PDFLib.PDFDocument.create();
        outPdf.setProducer(`AhmedPdf Security Guard (Key: ${passTag.slice(0, 3)}***)`);
        for (let p = 1; p <= pdf.numPages; p++) {
          updateProgress(Math.round((p / pdf.numPages) * 90), `Locking & flattening page ${p}...`);
          const page = await pdf.getPage(p);
          const vp = page.getViewport({ scale: 1.7 });
          const canvas = document.createElement('canvas');
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport: vp }).promise;
          if (selectedStyle === 'stamped-lock') {
            ctx.fillStyle = 'rgba(220, 38, 38, 0.75)';
            ctx.font = '800 18px "Cairo", "Inter", sans-serif';
            ctx.fillText('🔒 PROTECTED DOCUMENT — DO NOT COPY', 25, 32);
          }
          const jpgEmbed = await outPdf.embedJpg(canvas.toDataURL('image/jpeg', 0.9));
          const origVp = page.getViewport({ scale: 1.0 });
          const np = outPdf.addPage([origVp.width, origVp.height]);
          np.drawImage(jpgEmbed, { x: 0, y: 0, width: origVp.width, height: origVp.height });
        }
        res = {
          blob: new Blob([await outPdf.save()], { type: 'application/pdf' }),
          name: `${firstFile.name.replace(/\.pdf$/i, '')}_Protected.pdf`,
          summary: `Flattened & locked ${pdf.numPages} page(s) against text selection and editing.`
        };

      } else if (tool.id === 'pdf-to-txt' || tool.id === 'pdf-to-docx') {
        res = await executePdfTextExtraction(firstFile, tool.id === 'pdf-to-docx' ? 'docx' : 'txt', selectedStyle, updateProgress);

      } else if (tool.id === 'images-to-pdf') {
        const cap = document.getElementById('wb-img-caption')?.value || '';
        res = await executeImagesToPdf(files, selectedStyle, cap, updateProgress);

      } else if (tool.id === 'image-converter' || tool.id === 'compress-image' || tool.id === 'resize-image') {
        const targetMime = document.getElementById('wb-opt-img-fmt')?.value || (tool.id === 'compress-image' ? 'image/jpeg' : firstFile.type || 'image/png');
        const q = Number(document.getElementById('wb-opt-quality')?.value || state.settings.imgQuality) / 100;
        const w = tool.id === 'resize-image' ? Number(document.getElementById('wb-opt-width')?.value) : null;
        const h = tool.id === 'resize-image' ? Number(document.getElementById('wb-opt-height')?.value) : null;
        const rot = tool.id === 'resize-image' ? Number(document.getElementById('wb-opt-rotate')?.value || 0) : 0;
        const ext = targetMime.split('/')[1].replace('jpeg', 'jpg');

        if (files.length === 1) {
          const out = await convertImageFileToDataUrl(firstFile, targetMime, q, w, h, rot);
          res = {
            blob: out.blob,
            name: `${firstFile.name.replace(/\.[^.]+$/, '')}_Processed.${ext}`,
            summary: `Processed image (${out.outWidth}×${out.outHeight}px, ${formatBytes(out.blob.size)}).`
          };
        } else {
          const zip = new window.JSZip();
          for (let i = 0; i < files.length; i++) {
            updateProgress(Math.round(((i + 1) / files.length) * 90), `Processing image ${i + 1} of ${files.length}...`);
            const out = await convertImageFileToDataUrl(files[i], targetMime, q, w, h, rot);
            zip.file(`${files[i].name.replace(/\.[^.]+$/, '')}_${i + 1}.${ext}`, out.blob);
          }
          const zipBlob = await zip.generateAsync({ type: 'blob' });
          res = {
            blob: zipBlob,
            name: `AhmedPdf_Batch_Images_${Date.now()}.zip`,
            summary: `Batch-processed all ${files.length} images into ${ext.toUpperCase()} archive.`
          };
        }

      } else if (tool.id === 'remove-bg') {
        const thresh = Number(document.getElementById('wb-bg-thresh')?.value || 215);
        const img = await new Promise((resolve, reject) => {
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = reject;
          im.src = URL.createObjectURL(firstFile);
        });
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          if (r > thresh && g > thresh && b > thresh) {
            d[i + 3] = 0;
          } else if (selectedStyle === 'blue-ink') {
            d[i] = 15;
            d[i + 1] = 65;
            d[i + 2] = 195;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        const pngBlob = await new Promise(r => canvas.toBlob(r, 'image/png'));
        res = {
          blob: pngBlob,
          name: `${firstFile.name.replace(/\.[^.]+$/, '')}_Transparent.png`,
          summary: `Removed white background (${selectedStyle}) into transparent PNG.`
        };

      } else if (tool.id === 'doc-scanner-filter') {
        const outFmt = document.getElementById('wb-scan-out-fmt')?.value || 'pdf';
        const processedBlobs = [];
        const pdfDoc = outFmt === 'pdf' ? await window.PDFLib.PDFDocument.create() : null;

        for (let idx = 0; idx < files.length; idx++) {
          updateProgress(Math.round(((idx + 1) / files.length) * 85), `Enhancing document photo ${idx + 1}...`);
          const img = await new Promise((resolve, reject) => {
            const im = new Image();
            im.onload = () => resolve(im);
            im.onerror = reject;
            im.src = URL.createObjectURL(files[idx]);
          });
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
            if (selectedStyle === 'bw-crisp') {
              const v = lum > 152 ? 255 : Math.max(0, (lum - 50) * 0.9);
              d[i] = d[i + 1] = d[i + 2] = v;
            } else {
              d[i] = Math.min(255, Math.max(0, (d[i] - 128) * 1.35 + 140));
              d[i + 1] = Math.min(255, Math.max(0, (d[i + 1] - 128) * 1.35 + 140));
              d[i + 2] = Math.min(255, Math.max(0, (d[i + 2] - 128) * 1.35 + 140));
            }
          }
          ctx.putImageData(imgData, 0, 0);
          if (pdfDoc) {
            const jpgEmbed = await pdfDoc.embedJpg(canvas.toDataURL('image/jpeg', 0.9));
            const p = pdfDoc.addPage([jpgEmbed.width, jpgEmbed.height]);
            p.drawImage(jpgEmbed, { x: 0, y: 0, width: jpgEmbed.width, height: jpgEmbed.height });
          } else {
            const b = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.92));
            processedBlobs.push(b);
          }
        }
        if (pdfDoc) {
          res = {
            blob: new Blob([await pdfDoc.save()], { type: 'application/pdf' }),
            name: `Scanned_Document_${Date.now()}.pdf`,
            summary: `Applied ${selectedStyle} scanner filter to ${files.length} page(s).`
          };
        } else {
          res = {
            blob: processedBlobs[0],
            name: `${firstFile.name.replace(/\.[^.]+$/, '')}_Scanned.jpg`,
            summary: `Enhanced document image with ${selectedStyle} filter.`
          };
        }

      } else if (tool.id === 'id-photo-maker') {
        const img = await new Promise((resolve, reject) => {
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = reject;
          im.src = URL.createObjectURL(firstFile);
        });
        const idW = 472, idH = 708; // 4x6 cm at 300 DPI
        const singleCanvas = document.createElement('canvas');
        singleCanvas.width = idW;
        singleCanvas.height = idH;
        const sCtx = singleCanvas.getContext('2d');
        sCtx.fillStyle = '#ffffff';
        sCtx.fillRect(0, 0, idW, idH);
        const scale = Math.max(idW / img.naturalWidth, idH / img.naturalHeight);
        const sw = img.naturalWidth * scale, sh = img.naturalHeight * scale;
        sCtx.drawImage(img, (idW - sw) / 2, (idH - sh) / 2, sw, sh);

        if (selectedStyle === 'sheet-8') {
          const sheetCanvas = document.createElement('canvas');
          sheetCanvas.width = 2100;
          sheetCanvas.height = 1600;
          const shCtx = sheetCanvas.getContext('2d');
          shCtx.fillStyle = '#ffffff';
          shCtx.fillRect(0, 0, 2100, 1600);
          for (let r = 0; r < 2; r++) {
            for (let c = 0; c < 4; c++) {
              const x = 60 + c * (idW + 30);
              const y = 60 + r * (idH + 40);
              shCtx.drawImage(singleCanvas, x, y);
              shCtx.strokeStyle = '#94a3b8';
              shCtx.lineWidth = 2;
              shCtx.strokeRect(x, y, idW, idH);
            }
          }
          const blob = await new Promise(r => sheetCanvas.toBlob(r, 'image/jpeg', 0.95));
          res = { blob, name: `ID_Photos_8Sheet_${Date.now()}.jpg`, summary: 'Generated printable 8-photo 4×6 cm sheet.' };
        } else {
          const blob = await new Promise(r => singleCanvas.toBlob(r, 'image/jpeg', 0.95));
          res = { blob, name: `ID_Photo_4x6_${Date.now()}.jpg`, summary: 'Cropped photo to standard 4×6 cm (300 DPI) ID format.' };
        }

      } else if (tool.id === 'docx-to-pdf' || tool.id === 'docx-to-txt') {
        const buf = await firstFile.arrayBuffer();
        const rawText = await window.mammoth.extractRawText({ arrayBuffer: buf });
        if (tool.id === 'docx-to-txt') {
          res = {
            blob: new Blob([rawText.value], { type: 'text/plain;charset=utf-8' }),
            name: `${firstFile.name.replace(/\.[^.]+$/, '')}.txt`,
            summary: `Extracted ${rawText.value.length} characters from DOCX.`
          };
        } else {
          const pdfBlob = await createCleanTextPdf(firstFile.name.replace(/\.[^.]+$/, ''), rawText.value, selectedStyle);
          res = {
            blob: pdfBlob,
            name: `${firstFile.name.replace(/\.[^.]+$/, '')}_${selectedStyle}.pdf`,
            summary: `Converted Word document into ${selectedStyle} PDF (with full Arabic & English support).`
          };
        }

      } else if (tool.id === 'txt-to-pdf' || tool.id === 'txt-to-docx') {
        const txt = await firstFile.text();
        if (tool.id === 'txt-to-pdf') {
          const pdfBlob = await createCleanTextPdf(firstFile.name, txt, selectedStyle);
          res = { blob: pdfBlob, name: `${firstFile.name.replace(/\.[^.]+$/, '')}_${selectedStyle}.pdf`, summary: `Converted text file to ${selectedStyle} PDF.` };
        } else {
          const isRtl = containsArabic(txt);
          const docHtml = `<html dir="${isRtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"></head><body style="font-family:'Cairo',Calibri,sans-serif;font-size:12pt;direction:${isRtl ? 'rtl' : 'ltr'};"><pre style="font-family:inherit;white-space:pre-wrap;">${escapeHtml(txt)}</pre></body></html>`;
          res = { blob: new Blob(['\ufeff', docHtml], { type: 'application/msword' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.doc`, summary: 'Created Word document from text.' };
        }

      } else if (tool.id === 'xlsx-to-pdf') {
        const orient = document.getElementById('wb-xlsx-orient')?.value || 'landscape';
        res = await renderExcelSheetToPdf(firstFile, 0, selectedStyle, orient, updateProgress);

      } else if (tool.id === 'xlsx-to-csv' || tool.id === 'csv-to-xlsx') {
        const buf = await firstFile.arrayBuffer();
        const wb = window.XLSX.read(buf, { type: 'array' });
        const firstSheet = wb.Sheets[wb.SheetNames[0]];
        if (tool.id === 'xlsx-to-csv') {
          if (selectedStyle === 'json') {
            const jsonArr = window.XLSX.utils.sheet_to_json(firstSheet);
            res = { blob: new Blob([JSON.stringify(jsonArr, null, 2)], { type: 'application/json;charset=utf-8' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.json`, summary: `Exported ${jsonArr.length} rows to JSON.` };
          } else if (selectedStyle === 'html') {
            const htmlStr = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:'Cairo',sans-serif;padding:24px;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #cbd5e1;padding:8px 12px;text-align:center;}tr:nth-child(even){background:#f8fafc;}</style></head><body><h2>${escapeHtml(firstFile.name)}</h2>${window.XLSX.utils.sheet_to_html(firstSheet)}</body></html>`;
            res = { blob: new Blob([htmlStr], { type: 'text/html;charset=utf-8' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.html`, summary: 'Exported styled HTML table.' };
          } else {
            const csv = window.XLSX.utils.sheet_to_csv(firstSheet);
            res = { blob: new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.csv`, summary: `Exported sheet "${wb.SheetNames[0]}" to UTF-8 CSV.` };
          }
        } else {
          const outBytes = window.XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          res = { blob: new Blob([outBytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.xlsx`, summary: 'Converted file into Excel .xlsx workbook.' };
        }

      } else if (tool.id === 'pptx-to-pdf') {
        const zip = await window.JSZip.loadAsync(firstFile);
        const slideFiles = Object.keys(zip.files).filter(k => /^ppt\/slides\/slide\d+\.xml$/i.test(k));
        let allSlideText = '';
        for (const sf of slideFiles) {
          const xml = await zip.files[sf].async('text');
          const matches = Array.from(xml.matchAll(/<a:t>([^<]+)<\/a:t>/g)).map(m => m[1]);
          allSlideText += `=== Slide (${sf.split('/').pop()}) ===\n` + matches.join(' ') + '\n\n';
        }
        const pdfBlob = await createCleanTextPdf(firstFile.name, allSlideText || 'PPTX Slide Deck', selectedStyle);
        res = { blob: pdfBlob, name: `${firstFile.name.replace(/\.[^.]+$/, '')}_${selectedStyle}.pdf`, summary: `Extracted ${slideFiles.length} slides into ${selectedStyle} PDF.` };

      } else if (tool.id === 'create-zip') {
        const zip = new window.JSZip();
        files.forEach(f => zip.file(f.webkitRelativePath || f.name, f));
        const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
        res = { blob: zipBlob, name: `AhmedPdf_Archive_${Date.now()}.zip`, summary: `Archived ${files.length} file(s) into ZIP (${formatBytes(zipBlob.size)}).` };

      } else if (tool.id === 'extract-zip') {
        const entries = await inspectAndExtractZip(firstFile);
        updateProgress(100, 'ZIP verified and unpacked!');
        resultBox.innerHTML = `
          <div class="panel-card" style="background:var(--bg-surface-2);">
            <h4>✅ Extracted ${entries.length} Safe Files from ${escapeHtml(firstFile.name)}</h4>
            <div class="staged-file-list">
              ${entries.map((en, i) => `
                <div class="staged-file-row">
                  <span><b>${escapeHtml(en.fullPath)}</b> (${formatBytes(en.size)})</span>
                  <button type="button" class="btn-primary btn-sm" data-dl-zip-entry="${i}">⬇ Download</button>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        resultBox.querySelectorAll('[data-dl-zip-entry]').forEach(btn => {
          btn.addEventListener('click', () => {
            const en = entries[Number(btn.getAttribute('data-dl-zip-entry'))];
            triggerBlobDownload(en.blob, en.name);
          });
        });
        logOperation(tool.title, firstFile.name, 'completed', `Inspected ${entries.length} entries safely.`);
        return;

      } else if (tool.id === 'pdf-metadata') {
        const bytes = await firstFile.arrayBuffer();
        const pdfDoc = await window.PDFLib.PDFDocument.load(bytes);
        const newTitle = document.getElementById('wb-meta-title')?.value;
        const newAuthor = document.getElementById('wb-meta-author')?.value;
        const newSubject = document.getElementById('wb-meta-subject')?.value;
        if (newTitle) pdfDoc.setTitle(newTitle);
        if (newAuthor) pdfDoc.setAuthor(newAuthor);
        if (newSubject) pdfDoc.setSubject(newSubject);
        const outBytes = await pdfDoc.save();
        res = {
          blob: new Blob([outBytes], { type: 'application/pdf' }),
          name: `${firstFile.name.replace(/\.pdf$/i, '')}_Metadata.pdf`,
          summary: `Pages: ${pdfDoc.getPageCount()} | Title: "${pdfDoc.getTitle() || 'N/A'}" | Author: "${pdfDoc.getAuthor() || 'N/A'}"`
        };

      } else if (tool.id === 'file-hash-inspector') {
        const check = await verifyFileSignature(firstFile);
        const buf = await firstFile.arrayBuffer();
        const hashBuf = await crypto.subtle.digest('SHA-256', buf);
        const sha256 = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
        updateProgress(100, 'Inspection complete.');
        resultBox.innerHTML = `
          <div class="panel-card" style="background:var(--bg-surface-2);">
            <h4>🔐 Cryptographic File Inspection Report</h4>
            <p><b>File Name:</b> ${escapeHtml(firstFile.name)} (${formatBytes(firstFile.size)})</p>
            <p><b>Magic-Byte Header (Hex):</b> <code>${check.signatureHex}</code></p>
            <p><b>SHA-256 Checksum:</b> <code style="word-break:break-all;">${sha256}</code></p>
          </div>
        `;
        logOperation(tool.title, firstFile.name, 'completed', `SHA-256 verified.`);
        return;

      } else if (tool.id === 'ocr-scanner') {
        if (!window.Tesseract) throw new Error('Tesseract OCR engine is loading. Check internet connection.');
        const lang = document.getElementById('wb-ocr-lang')?.value || 'ara+eng';
        const isPdf = firstFile.name.toLowerCase().endsWith('.pdf');
        let extractedText = '';

        if (isPdf) {
          configurePdfJsWorker();
          const pdf = await window.pdfjsLib.getDocument({ data: await firstFile.arrayBuffer() }).promise;
          for (let p = 1; p <= pdf.numPages; p++) {
            updateProgress(Math.round(((p - 0.5) / pdf.numPages) * 90), `Rendering & running OCR on PDF page ${p} of ${pdf.numPages}...`);
            const page = await pdf.getPage(p);
            const vp = page.getViewport({ scale: 2.0 });
            const canvas = document.createElement('canvas');
            canvas.width = vp.width;
            canvas.height = vp.height;
            await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
            const { data: { text } } = await window.Tesseract.recognize(canvas, lang);
            extractedText += `--- Page ${p} ---\n${text}\n\n`;
          }
        } else {
          const { data: { text } } = await window.Tesseract.recognize(firstFile, lang, {
            logger: m => {
              if (m.status === 'recognizing text') updateProgress(Math.round(m.progress * 100), `Running OCR (${lang})...`);
            }
          });
          extractedText = text;
        }

        res = {
          blob: new Blob([extractedText], { type: 'text/plain;charset=utf-8' }),
          name: `${firstFile.name.replace(/\.[^.]+$/, '')}_OCR.txt`,
          summary: `OCR (${lang}) extracted ${extractedText.length} characters.`
        };

      } else if (tool.id === 'qr-barcode-studio') {
        const qrText = document.getElementById('wb-qr-text')?.value || 'https://ahmedpdf.local';
        const qrColor = document.getElementById('wb-qr-color')?.value || '#0f172a';
        const tempDiv = document.createElement('div');
        if (window.QRCode) {
          new window.QRCode(tempDiv, { text: qrText, width: 320, height: 320, colorDark: qrColor, colorLight: '#ffffff' });
        }
        await new Promise(r => setTimeout(r, 120));
        const qrCanvas = tempDiv.querySelector('canvas');
        if (!qrCanvas) throw new Error('QR Code generator is still initializing.');

        if (selectedStyle === 'stamp-pdf' && firstFile && firstFile.name.toLowerCase().endsWith('.pdf')) {
          const pdfDoc = await window.PDFLib.PDFDocument.load(await firstFile.arrayBuffer());
          const qrEmbed = await pdfDoc.embedPng(qrCanvas.toDataURL('image/png'));
          pdfDoc.getPages().forEach(p => {
            p.drawImage(qrEmbed, { x: p.getWidth() - 95, y: 20, width: 72, height: 72 });
          });
          res = {
            blob: new Blob([await pdfDoc.save()], { type: 'application/pdf' }),
            name: `${firstFile.name.replace(/\.pdf$/i, '')}_QRStamped.pdf`,
            summary: `Stamped verification QR code onto all pages of ${firstFile.name}.`
          };
        } else {
          const blob = await new Promise(r => qrCanvas.toBlob(r, 'image/png'));
          res = { blob, name: `AhmedPdf_QRCode_${Date.now()}.png`, summary: `Generated high-resolution QR code for "${qrText.slice(0, 35)}".` };
        }

      } else if (tool.id === 'data-json-converter') {
        const buf = await firstFile.arrayBuffer();
        const wb = window.XLSX.read(buf, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
        if (selectedStyle === 'md') {
          const hdr = rows[0] || ['Col1'];
          const sep = hdr.map(() => '---');
          const bodyRows = rows.slice(1).map(r => `| ${hdr.map((_, i) => String(r[i] ?? '')).join(' | ')} |`);
          const md = `| ${hdr.join(' | ')} |\n| ${sep.join(' | ')} |\n${bodyRows.join('\n')}`;
          res = { blob: new Blob([md], { type: 'text/markdown;charset=utf-8' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.md`, summary: `Converted ${rows.length} rows into Markdown table.` };
        } else if (selectedStyle === 'html') {
          const html = window.XLSX.utils.sheet_to_html(sheet);
          res = { blob: new Blob([html], { type: 'text/html;charset=utf-8' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.html`, summary: 'Converted data into HTML table.' };
        } else if (selectedStyle === 'csv') {
          res = { blob: new Blob(['\ufeff', window.XLSX.utils.sheet_to_csv(sheet)], { type: 'text/csv;charset=utf-8' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.csv`, summary: 'Converted data into CSV.' };
        } else {
          const json = JSON.stringify(window.XLSX.utils.sheet_to_json(sheet), null, 2);
          res = { blob: new Blob([json], { type: 'application/json;charset=utf-8' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.json`, summary: 'Converted data into formatted JSON.' };
        }

      } else if (tool.id === 'text-diff-compare') {
        let textA = document.getElementById('wb-diff-a')?.value || '';
        let textB = document.getElementById('wb-diff-b')?.value || '';
        if (files.length >= 2) {
          textA = await files[0].text();
          textB = await files[1].text();
        }
        const linesA = textA.split('\n');
        const linesB = textB.split('\n');
        const maxL = Math.max(linesA.length, linesB.length);
        let diffHtml = '';
        let changes = 0;
        for (let i = 0; i < maxL; i++) {
          const a = linesA[i], b = linesB[i];
          if (a === b) {
            diffHtml += `<div style="padding:2px 8px;color:var(--text-muted);">${i + 1}: ${escapeHtml(a || '')}</div>`;
          } else {
            changes++;
            if (a !== undefined) diffHtml += `<div class="diff-line-del">- [${i + 1}] ${escapeHtml(a)}</div>`;
            if (b !== undefined) diffHtml += `<div class="diff-line-add">+ [${i + 1}] ${escapeHtml(b)}</div>`;
          }
        }
        updateProgress(100, 'Comparison complete!');
        resultBox.innerHTML = `
          <div class="panel-card" style="background:var(--bg-surface-2);">
            <h4>⚖️ Diff Report (${changes} line differences detected)</h4>
            <div style="font-family:'JetBrains Mono',monospace;font-size:12px;max-height:280px;overflow:auto;background:var(--bg-main);padding:10px;border-radius:8px;">
              ${diffHtml || 'Both texts are identical!'}
            </div>
          </div>
        `;
        return;
      }

      if (res && res.blob) {
        updateProgress(100, 'Completed successfully!');
        const dlUrl = URL.createObjectURL(res.blob);
        const isOutPdf = res.name.toLowerCase().endsWith('.pdf');
        resultBox.innerHTML = `
          <div class="panel-card" style="background:var(--success-soft);border-color:var(--success);">
            <h4 style="margin:0 0 6px;color:var(--success);">✓ Operation Completed</h4>
            <p style="margin:0 0 12px;font-size:13px;">${escapeHtml(res.summary)}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
              <a href="${dlUrl}" download="${escapeHtml(res.name)}" class="btn-primary btn-sm" style="text-decoration:none;">⬇ Download ${escapeHtml(res.name)}</a>
              <button type="button" class="btn-secondary btn-sm" id="wb-save-to-ws-btn">💾 Save to My Files</button>
              ${isOutPdf ? `
                <select id="wb-chain-next-tool" class="select-field" style="width:auto;padding:5px 10px;font-size:12px;">
                  <option value="">🔗 مرر الناتج لأداة أخرى (Smart Chain)...</option>
                  <option value="cover-pdf">🎓 Add Cover Page (إضافة غلاف)</option>
                  <option value="watermark-pdf">💧 Add Watermark / Stamp (علامة مائية/ختم)</option>
                  <option value="pagenum-pdf">🔢 Add Page Numbers (ترقيم الصفحات)</option>
                  <option value="sign-pdf">✍️ Sign PDF (توقيع الملف)</option>
                  <option value="protect-pdf">🔒 Protect PDF (حماية وقفل)</option>
                  <option value="compress-pdf">📉 Compress PDF (ضغط الحجم)</option>
                </select>
              ` : ''}
            </div>
          </div>
        `;
        document.getElementById('wb-save-to-ws-btn')?.addEventListener('click', async () => {
          await saveFileToWorkspaceDB(res.blob, res.name, 'Converted');
          showToast('💾 Saved output to My Files workspace!');
        });
        document.getElementById('wb-chain-next-tool')?.addEventListener('change', (e) => {
          const nextId = e.target.value;
          if (!nextId) return;
          const chainedFile = new File([res.blob], res.name, { type: res.blob.type });
          openToolWorkbench(nextId, [chainedFile]);
          showToast(`🔗 Passed "${res.name}" directly to next tool!`);
        });
        logOperation(tool.title, firstFile?.name || 'Input', 'completed', res.summary, res.blob, res.name);
        showToast(`✓ ${tool.title} finished!`);
      }
    } catch (err) {
      updateProgress(0, 'Operation Stopped');
      resultBox.innerHTML = `
        <div class="panel-card" style="background:var(--danger-soft);border-color:var(--danger);">
          <h4 style="margin:0 0 6px;color:var(--danger);">⛔ Operation Failed</h4>
          <p style="margin:0;font-size:13px;">${escapeHtml(err.message || String(err))}</p>
        </div>
      `;
      logOperation(tool.title, files[0]?.name || 'File', 'failed', err.message || 'Error');
    }
  }

  /* ==========================================================================
   * 9. INTERACTIVE PDF PAGE ORGANIZER (VIEW 7)
   * ========================================================================== */
  async function loadPdfIntoOrganizer(file) {
    try {
      configurePdfJsWorker();
      const check = await verifyFileSignature(file);
      if (!check.valid) return showToast(`⛔ ${check.reason}`);

      const buf = await file.arrayBuffer();
      state.organizer.file = file;
      state.organizer.pdfBytes = buf;
      const pdf = await window.pdfjsLib.getDocument({ data: buf.slice(0) }).promise;

      state.organizer.pages = [];
      for (let i = 0; i < pdf.numPages; i++) {
        state.organizer.pages.push({ originalIndex: i, rotation: 0, selected: true });
      }

      document.getElementById('organizer-toolbar').hidden = false;
      document.getElementById('organizer-export-btn').disabled = false;
      document.getElementById('organizer-file-info').textContent = `${file.name} (${pdf.numPages} pages · ${formatBytes(file.size)})`;

      await renderOrganizerThumbnails(pdf);
      showToast(`📑 Loaded ${pdf.numPages} pages into Organizer!`);
    } catch (err) {
      showToast(`⛔ Could not load PDF: ${err.message}`);
    }
  }

  async function renderOrganizerThumbnails(pdfDocInstance = null) {
    const grid = document.getElementById('organizer-pages-grid');
    if (!grid || !state.organizer.pdfBytes) return;

    const pdf = pdfDocInstance || await window.pdfjsLib.getDocument({ data: state.organizer.pdfBytes.slice(0) }).promise;
    grid.innerHTML = '';

    for (let idx = 0; idx < state.organizer.pages.length; idx++) {
      const item = state.organizer.pages[idx];
      const card = document.createElement('div');
      card.className = `pdf-page-card ${item.selected ? 'selected' : ''}`;
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:12px;">
          <label><input type="checkbox" data-org-chk="${idx}" ${item.selected ? 'checked' : ''} /> Page ${idx + 1}</label>
          <small style="color:var(--text-muted);">(Orig #${item.originalIndex + 1})</small>
        </div>
        <div class="page-thumb-wrap"><canvas id="org-canvas-${idx}"></canvas></div>
        <div class="page-card-controls">
          <button type="button" class="btn-secondary btn-sm" data-org-left="${idx}" title="Move Left">←</button>
          <button type="button" class="btn-secondary btn-sm" data-org-rot="${idx}" title="Rotate 90°">↻</button>
          <button type="button" class="btn-secondary btn-sm" data-org-dup="${idx}" title="Duplicate Page">⧉</button>
          <button type="button" class="btn-danger btn-sm" data-org-del="${idx}" title="Delete Page">🗑️</button>
          <button type="button" class="btn-secondary btn-sm" data-org-right="${idx}" title="Move Right">→</button>
        </div>
      `;
      grid.appendChild(card);

      const page = await pdf.getPage(item.originalIndex + 1);
      const vp = page.getViewport({ scale: 0.4, rotation: item.rotation });
      const canvas = card.querySelector('canvas');
      canvas.width = vp.width;
      canvas.height = vp.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    }

    grid.querySelectorAll('[data-org-chk]').forEach(chk => {
      chk.addEventListener('change', () => {
        const i = Number(chk.getAttribute('data-org-chk'));
        state.organizer.pages[i].selected = chk.checked;
        chk.closest('.pdf-page-card').classList.toggle('selected', chk.checked);
      });
    });
    grid.querySelectorAll('[data-org-rot]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-org-rot'));
        state.organizer.pages[i].rotation = (state.organizer.pages[i].rotation + 90) % 360;
        renderOrganizerThumbnails();
      });
    });
    grid.querySelectorAll('[data-org-dup]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-org-dup'));
        state.organizer.pages.splice(i + 1, 0, Object.assign({}, state.organizer.pages[i]));
        renderOrganizerThumbnails();
      });
    });
    grid.querySelectorAll('[data-org-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.organizer.pages.length <= 1) return showToast('⚠️ A PDF must have at least 1 page.');
        const i = Number(btn.getAttribute('data-org-del'));
        state.organizer.pages.splice(i, 1);
        renderOrganizerThumbnails();
      });
    });
    grid.querySelectorAll('[data-org-left]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-org-left'));
        if (i > 0) {
          const t = state.organizer.pages[i - 1];
          state.organizer.pages[i - 1] = state.organizer.pages[i];
          state.organizer.pages[i] = t;
          renderOrganizerThumbnails();
        }
      });
    });
    grid.querySelectorAll('[data-org-right]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-org-right'));
        if (i < state.organizer.pages.length - 1) {
          const t = state.organizer.pages[i + 1];
          state.organizer.pages[i + 1] = state.organizer.pages[i];
          state.organizer.pages[i] = t;
          renderOrganizerThumbnails();
        }
      });
    });
  }

  async function exportOrganizedPdf(onlySelected = false) {
    if (!state.organizer.pdfBytes) return;
    const srcDoc = await window.PDFLib.PDFDocument.load(state.organizer.pdfBytes);
    const outDoc = await window.PDFLib.PDFDocument.create();
    const targetList = onlySelected ? state.organizer.pages.filter(p => p.selected) : state.organizer.pages;

    if (!targetList.length) return showToast('⚠️ No pages selected to export.');

    for (const item of targetList) {
      const [copied] = await outDoc.copyPages(srcDoc, [item.originalIndex]);
      if (item.rotation) {
        copied.setRotation(window.PDFLib.degrees(item.rotation));
      }
      outDoc.addPage(copied);
    }
    const outBytes = await outDoc.save();
    const blob = new Blob([outBytes], { type: 'application/pdf' });
    const outName = `${state.organizer.file.name.replace(/\.pdf$/i, '')}_Organized.pdf`;
    triggerBlobDownload(blob, outName);
    logOperation('Organize PDF', state.organizer.file.name, 'completed', `Exported ${targetList.length} organized page(s).`, blob, outName);
    showToast(`✓ Exported ${outName}!`);
  }

  /* ==========================================================================
   * 10. CROSS-FORMAT CONVERTER (VIEW 4)
   * ========================================================================== */
  const CONVERSION_MAP = {
    pdf: [
      { fmt: 'jpg', label: 'JPG Images (ZIP)', toolId: 'pdf-to-jpg', limit: 'Renders each PDF page at 2x DPI into JPG images.' },
      { fmt: 'png', label: 'PNG Images (ZIP)', toolId: 'pdf-to-png', limit: 'Lossless page rendering.' },
      { fmt: 'txt', label: 'Plain Text (.txt)', toolId: 'pdf-to-txt', limit: 'Extracts selectable text streams. Use OCR for scanned PDFs.' },
      { fmt: 'docx', label: 'Word Document (.doc)', toolId: 'pdf-to-docx', limit: 'Extracts text paragraphs; complex graphic columns may differ.' }
    ],
    docx: [
      { fmt: 'pdf', label: 'PDF Document (.pdf)', toolId: 'docx-to-pdf', limit: 'Extracts document text via Mammoth into clean A4 PDF pages.' },
      { fmt: 'txt', label: 'Plain Text (.txt)', toolId: 'docx-to-txt', limit: 'Strips styling and outputs raw text.' }
    ],
    xlsx: [
      { fmt: 'pdf', label: 'PDF Document (.pdf)', toolId: 'xlsx-to-pdf', limit: 'Exports active worksheet rows into A4 PDF.' },
      { fmt: 'csv', label: 'CSV Spreadsheet (.csv)', toolId: 'xlsx-to-csv', limit: 'Exports active worksheet values separated by commas.' }
    ],
    csv: [
      { fmt: 'xlsx', label: 'Excel Workbook (.xlsx)', toolId: 'csv-to-xlsx', limit: 'Builds a native Microsoft Excel .xlsx sheet.' },
      { fmt: 'pdf', label: 'PDF Document (.pdf)', toolId: 'xlsx-to-pdf', limit: 'Renders CSV rows into PDF.' }
    ],
    txt: [
      { fmt: 'pdf', label: 'PDF Document (.pdf)', toolId: 'txt-to-pdf', limit: 'Paginates plain text into A4 PDF.' },
      { fmt: 'docx', label: 'Word Document (.doc)', toolId: 'txt-to-docx', limit: 'Wraps text into a Word-compatible file.' }
    ],
    image: [
      { fmt: 'pdf', label: 'PDF Document (.pdf)', toolId: 'images-to-pdf', limit: 'Embeds image onto a matching PDF page.' },
      { fmt: 'png', label: 'PNG Image (.png)', toolId: 'image-converter', limit: 'Lossless PNG encoding.' },
      { fmt: 'jpg', label: 'JPG Image (.jpg)', toolId: 'image-converter', limit: 'Transparent pixels will be filled with white.' },
      { fmt: 'webp', label: 'WEBP Image (.webp)', toolId: 'image-converter', limit: 'Modern web compression.' }
    ]
  };

  let converterSelectedFile = null;

function setupCrossFormatConverter() {
    const convDropzone = document.getElementById('converter-dropzone');
    const browseBtn = document.getElementById('converter-browse-btn');
    const fileInput = document.getElementById('converter-file-input');
    const targetSel = document.getElementById('converter-target-format');
    const limitTxt = document.getElementById('converter-limitation-text');
    const runBtn = document.getElementById('converter-run-btn');

    browseBtn?.addEventListener('click', () => fileInput?.click());
    convDropzone?.addEventListener('dragover', (e) => { e.preventDefault(); convDropzone.style.borderColor = 'var(--primary)'; });
    convDropzone?.addEventListener('dragleave', () => { convDropzone.style.borderColor = ''; });
    convDropzone?.addEventListener('drop', (e) => {
      e.preventDefault();
      convDropzone.style.borderColor = '';
      if (e.dataTransfer?.files?.length) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
    fileInput?.addEventListener('change', async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const check = await verifyFileSignature(f);
      if (!check.valid) return showToast(`⛔ ${check.reason}`);

      converterSelectedFile = f;
      document.getElementById('converter-file-label').textContent = `Selected: ${f.name} (${formatBytes(f.size)})`;
      const ext = check.ext;
      const key = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'].includes(ext) ? 'image' : ext;
      const options = CONVERSION_MAP[key] || [];

      targetSel.innerHTML = options.length
        ? options.map((o, i) => `<option value="${i}">${o.label}</option>`).join('')
        : `<option value="">Unsupported input format (.${ext})</option>`;
      targetSel.disabled = !options.length;
      runBtn.disabled = !options.length;

      if (options.length) {
        limitTxt.textContent = options[0].limit;
      }
      targetSel.onchange = () => {
        const chosen = options[Number(targetSel.value)];
        if (chosen) limitTxt.textContent = chosen.limit;
      };
      runBtn.onclick = () => {
        const chosen = options[Number(targetSel.value)];
        if (chosen) openToolWorkbench(chosen.toolId, [converterSelectedFile]);
      };
    });
  }

  /* ==========================================================================
   * 11. MY FILES WORKSPACE MANAGER & FILE PREVIEWER (VIEW 8)
   * ========================================================================== */
  function createFileManagerCard(record) {
    const card = document.createElement('div');
    card.className = 'fm-file-card';
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <span class="file-badge-ext">${escapeHtml(record.ext || 'FILE')}</span>
        <div style="min-width:0;flex:1;">
          <b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(record.name)}</b>
          <small style="color:var(--text-muted);">${formatBytes(record.size)} · 📁 ${escapeHtml(record.folder || 'General')}</small>
        </div>
        <button type="button" class="fav-star-btn ${record.favorite ? 'starred' : ''}" data-fm-fav="${record.id}">★</button>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;">
        <button type="button" class="btn-secondary btn-sm" data-fm-prev="${record.id}">👁 Preview</button>
        <button type="button" class="btn-secondary btn-sm" data-fm-dl="${record.id}">⬇</button>
        <button type="button" class="btn-secondary btn-sm" data-fm-ren="${record.id}">✎</button>
        <button type="button" class="btn-danger btn-sm" data-fm-del="${record.id}">${record.trashed ? '✕ Purge' : '🗑️'}</button>
        ${record.trashed ? `<button type="button" class="btn-primary btn-sm" data-fm-rest="${record.id}">↺ Restore</button>` : ''}
      </div>
    `;

    card.querySelector('[data-fm-fav]')?.addEventListener('click', () => {
      record.favorite = !record.favorite;
      updateWorkspaceFileRecord(record);
    });
    card.querySelector('[data-fm-prev]')?.addEventListener('click', () => previewWorkspaceFile(record));
    card.querySelector('[data-fm-dl]')?.addEventListener('click', () => triggerBlobDownload(record.blob, record.name));
    card.querySelector('[data-fm-ren]')?.addEventListener('click', () => {
      const newName = prompt('Rename file:', record.name);
      if (newName && newName.trim()) {
        record.name = newName.trim();
        updateWorkspaceFileRecord(record);
      }
    });
    card.querySelector('[data-fm-del]')?.addEventListener('click', () => {
      if (record.trashed) {
        deleteWorkspaceFilePermanently(record.id);
      } else {
        record.trashed = true;
        updateWorkspaceFileRecord(record);
        showToast('Moved file to Trash.');
      }
    });
    card.querySelector('[data-fm-rest]')?.addEventListener('click', () => {
      record.trashed = false;
      updateWorkspaceFileRecord(record);
      showToast('↺ Restored file to Workspace!');
    });

    return card;
  }

  function renderMyFilesView() {
    const container = document.getElementById('fm-files-container');
    const folderSel = document.getElementById('fm-folder-filter');
    if (!container) return;

    if (folderSel) {
      const currentVal = folderSel.value || 'all';
      folderSel.innerHTML = `<option value="all">📁 All Folders</option>` + state.folders.map(f => `<option value="${escapeHtml(f)}">📁 ${escapeHtml(f)}</option>`).join('');
      folderSel.value = currentVal;
    }

    container.className = state.fmViewMode === 'list' ? 'fm-list-view' : 'fm-grid-view';
    container.innerHTML = '';

    if (state.activeScope === 'session') {
      if (!state.stagedFiles.length) {
        container.innerHTML = `<div class="empty-state-box"><h3>No Temporary Device Files Selected</h3><p>Use the "+ Add Files" button to select files from your computer.</p></div>`;
        return;
      }
      state.stagedFiles.forEach(f => {
        const fakeRec = { id: 'sess', name: f.name, ext: f.name.split('.').pop(), size: f.size, folder: 'Device Session', blob: f };
        container.appendChild(createFileManagerCard(fakeRec));
      });
      return;
    }

    const q = (document.getElementById('fm-search-input')?.value || '').trim().toLowerCase();
    const typeFilter = document.getElementById('fm-type-filter')?.value || 'all';
    const folderFilter = document.getElementById('fm-folder-filter')?.value || 'all';
    const sortBy = document.getElementById('fm-sort-select')?.value || 'date-desc';

    let list = state.workspaceFiles.filter(f => state.activeScope === 'trash' ? f.trashed : !f.trashed);
    if (q) list = list.filter(f => f.name.toLowerCase().includes(q));
    if (folderFilter !== 'all') list = list.filter(f => f.folder === folderFilter);
    if (typeFilter !== 'all') {
      const map = { pdf: ['pdf'], doc: ['doc', 'docx', 'txt', 'md', 'html'], sheet: ['xlsx', 'xls', 'csv'], image: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'], archive: ['zip'] };
      list = list.filter(f => (map[typeFilter] || []).includes(f.ext));
    }

    list.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'size-desc') return b.size - a.size;
      if (sortBy === 'size-asc') return a.size - b.size;
      if (sortBy === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if (!list.length) {
      container.innerHTML = `<div class="empty-state-box"><div class="empty-ico">📁</div><h3>No Files in This View</h3><p>Upload files or save converted outputs to your local workspace.</p></div>`;
      return;
    }

    list.forEach(rec => container.appendChild(createFileManagerCard(rec)));
  }

  async function previewWorkspaceFile(record) {
    const modal = document.getElementById('file-preview-modal');
    const title = document.getElementById('preview-modal-title');
    const meta = document.getElementById('preview-modal-meta');
    const body = document.getElementById('preview-modal-body');
    const dlBtn = document.getElementById('preview-download-btn');
    if (!modal || !record.blob) return;

    title.textContent = record.name;
    meta.textContent = `${formatBytes(record.size)} · .${record.ext}`;
    dlBtn.onclick = () => triggerBlobDownload(record.blob, record.name);
    body.innerHTML = `<p>Loading preview...</p>`;
    modal.hidden = false;

    const ext = (record.ext || '').toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) {
      const url = URL.createObjectURL(record.blob);
      body.innerHTML = `<div style="text-align:center;"><img src="${url}" style="max-width:100%;max-height:65vh;border-radius:10px;" /></div>`;
    } else if (ext === 'pdf') {
      const url = URL.createObjectURL(record.blob);
      body.innerHTML = `<iframe src="${url}" style="width:100%;height:68vh;border:0;border-radius:8px;"></iframe>`;
    } else if (ext === 'docx' && window.mammoth) {
      const buf = await record.blob.arrayBuffer();
      const res = await window.mammoth.convertToHtml({ arrayBuffer: buf });
      body.innerHTML = `<div style="background:#fff;color:#111;padding:20px;border-radius:8px;max-height:65vh;overflow:auto;">${res.value}</div>`;
    } else if ((ext === 'xlsx' || ext === 'xls' || ext === 'csv') && window.XLSX) {
      const buf = await record.blob.arrayBuffer();
      const wb = window.XLSX.read(buf, { type: 'array' });
      const htmlTable = window.XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
      body.innerHTML = `<div style="overflow:auto;max-height:65vh;">${htmlTable}</div>`;
    } else {
      const txt = await record.blob.text();
      body.innerHTML = `<pre style="background:var(--bg-surface-2);padding:16px;border-radius:8px;overflow:auto;max-height:65vh;">${escapeHtml(txt.slice(0, 15000))}</pre>`;
    }
  }

  /* ==========================================================================
   * 12. RECENT OPERATIONS, HOME LISTS & AUTOMATED QA TEST SUITE
   * ========================================================================== */
  function renderRecentOperationsView() {
    const container = document.getElementById('operations-queue-list');
    if (!container) return;
    if (!state.operationsQueue.length) {
      container.innerHTML = `<div class="empty-state-box"><h3>No Operations Recorded Yet</h3><p>Run any PDF, Office, Image, or ZIP tool to see live job telemetry here.</p></div>`;
      return;
    }
    container.innerHTML = state.operationsQueue.map(j => `
      <div class="staged-file-row" style="margin-bottom:8px;">
        <div>
          <span class="status-tag" style="background:${j.status === 'completed' ? 'var(--success-soft)' : 'var(--danger-soft)'};color:${j.status === 'completed' ? 'var(--success)' : 'var(--danger)'};">${j.status.toUpperCase()}</span>
          <b style="margin-left:8px;">${escapeHtml(j.tool)}</b> — <span>${escapeHtml(j.inputName)}</span>
          <small style="display:block;color:var(--text-muted);margin-top:3px;">${escapeHtml(j.message)} · ${escapeHtml(j.timestamp)}</small>
        </div>
        ${j.blobUrl ? `<a href="${j.blobUrl}" download="${escapeHtml(j.outputName)}" class="btn-primary btn-sm" style="text-decoration:none;">⬇ Download</a>` : ''}
      </div>
    `).join('');
  }

  function renderHomeDashboardLists() {
    const opsBox = document.getElementById('home-recent-ops-list');
    if (opsBox) {
      const recentOps = state.operationsQueue.slice(0, 4);
      opsBox.innerHTML = recentOps.length
        ? recentOps.map(j => `<div class="staged-file-row"><span><b>${escapeHtml(j.tool)}</b> · ${escapeHtml(j.inputName)}</span><small style="color:var(--success);">${escapeHtml(j.status)}</small></div>`).join('')
        : `<p class="muted-note">No operations run in this session yet.</p>`;
    }

    const filesBox = document.getElementById('home-recent-files-list');
    if (filesBox) {
      const recentFiles = state.workspaceFiles.filter(f => !f.trashed).slice(0, 4);
      filesBox.innerHTML = recentFiles.length
        ? recentFiles.map(f => `<div class="staged-file-row"><span><b>${escapeHtml(f.name)}</b></span><small>${formatBytes(f.size)}</small></div>`).join('')
        : `<p class="muted-note">No files saved to Local Workspace yet.</p>`;
    }
  }

  // AUTOMATED QA SELF-TEST SUITE (SECTION 19)
  async function runAutomatedQaSuite() {
    const out = document.getElementById('qa-test-output');
    if (!out) return;
    out.innerHTML = `<p>Running real verification tests...</p>`;
    const results = [];

    // Test 1: Magic-Byte Disguised File Rejection
    const fakePdf = new File(['MZ_executable_payload'], 'malicious.pdf', { type: 'application/pdf' });
    const sigCheck = await verifyFileSignature(fakePdf);
    results.push({
      name: 'Magic-Byte Spoof Guard',
      passed: !sigCheck.valid,
      detail: !sigCheck.valid ? 'Blocked spoofed executable disguised as .pdf' : 'Failed to block spoofed file'
    });

    // Test 2: PDF-Lib Creation & Page Verification
    try {
      const pdfBlob = await createCleanTextPdf('QA Test PDF', 'Automated verification of PDF-Lib creation engine.');
      const validPdfHeader = await verifyFileSignature(new File([pdfBlob], 'test.pdf'));
      results.push({
        name: 'PDF-Lib Generation Engine',
        passed: validPdfHeader.valid && pdfBlob.size > 100,
        detail: `Generated valid PDF (${formatBytes(pdfBlob.size)}, header %PDF- verified)`
      });
    } catch (e) {
      results.push({ name: 'PDF-Lib Generation Engine', passed: false, detail: e.message });
    }

    // Test 3: JSZip Creation & Zip-Slip Guard
    try {
      const z = new window.JSZip();
      z.file('hello.txt', 'AhmedPdf QA Test');
      const zBlob = await z.generateAsync({ type: 'blob' });
      const entries = await inspectAndExtractZip(new File([zBlob], 'qa.zip'));
      results.push({
        name: 'JSZip & Archive Security',
        passed: entries.length === 1,
        detail: `Packed & safely extracted ${entries.length} archive entry`
      });
    } catch (e) {
      results.push({ name: 'JSZip & Archive Security', passed: false, detail: e.message });
    }

    // Test 4: IndexedDB Local Workspace Read/Write
    try {
      const db = await openWorkspaceDB();
      results.push({
        name: 'IndexedDB Workspace Store',
        passed: Boolean(db),
        detail: `Connected (${state.workspaceFiles.length} stored records)`
      });
    } catch (e) {
      results.push({ name: 'IndexedDB Workspace Store', passed: false, detail: e.message });
    }

    out.innerHTML = results.map(r => `
      <div class="qa-card" style="border-left:4px solid ${r.passed ? 'var(--success)' : 'var(--danger)'};">
        <b style="color:${r.passed ? 'var(--success)' : 'var(--danger)'};">${r.passed ? '✓ PASS' : '✖ FAIL'} — ${escapeHtml(r.name)}</b>
        <small style="display:block;margin-top:4px;color:var(--text-muted);">${escapeHtml(r.detail)}</small>
      </div>
    `).join('');
    showToast('✅ Automated QA Test Suite completed!');
  }

  /* ==========================================================================
   * 13. UTILITIES, THEME, PWA INSTALLER & EVENT BINDINGS
   * ========================================================================== */
  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function triggerBlobDownload(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }

  function showToast(msg) {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = 'toast-item';
    el.textContent = msg;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 3400);
  }

  function applyTheme(theme) {
    state.settings.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    const sel = document.getElementById('setting-theme-select');
    if (sel) sel.value = theme;
    localStorage.setItem('ahmedpdf_settings', JSON.stringify(state.settings));
  }

  async function handleIncomingFiles(fileList) {
    const arr = Array.from(fileList || []);
    if (!arr.length) return;
    let added = 0;
    for (const f of arr) {
      const check = await verifyFileSignature(f);
      if (!check.valid) {
        showToast(`⛔ Rejected ${f.name}: ${check.reason}`);
        continue;
      }
      state.stagedFiles.push(f);
      added++;
    }
    renderStagedFilesBar();
    if (added > 0) showToast(`✓ Validated & staged ${added} file(s).`);
  }

  function renderStagedFilesBar() {
    const panel = document.getElementById('staged-files-panel');
    const list = document.getElementById('staged-file-list');
    const countEl = document.getElementById('staged-count');
    if (!panel || !list) return;

    panel.hidden = state.stagedFiles.length === 0;
    if (countEl) countEl.textContent = String(state.stagedFiles.length);

    list.innerHTML = state.stagedFiles.map((f, i) => {
      const ext = (f.name.split('.').pop() || '').toLowerCase();
      return `
        <div class="staged-file-row">
          <div>
            <span class="file-badge-ext">${escapeHtml(ext)}</span>
            <b style="margin-left:8px;">${escapeHtml(f.name)}</b>
            <small style="color:var(--text-muted);margin-left:8px;">(${formatBytes(f.size)})</small>
          </div>
          <div style="display:flex;gap:6px;">
            <button type="button" class="btn-primary btn-sm" data-stage-open="${i}">⚡ Open in Tool</button>
            <button type="button" class="btn-danger btn-sm" data-stage-rm="${i}">✕</button>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('[data-stage-rm]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.stagedFiles.splice(Number(btn.getAttribute('data-stage-rm')), 1);
        renderStagedFilesBar();
      });
    });

    list.querySelectorAll('[data-stage-open]').forEach(btn => {
      btn.addEventListener('click', () => {
        const file = state.stagedFiles[Number(btn.getAttribute('data-stage-open'))];
        const ext = (file.name.split('.').pop() || '').toLowerCase();
        const defaultTool = ext === 'pdf' ? 'split-pdf' : (ext === 'zip' ? 'extract-zip' : (['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? 'images-to-pdf' : 'docx-to-pdf'));
        openToolWorkbench(defaultTool, [file]);
      });
    });
  }

  function bindAllEvents() {
    // Sidebar Navigation
    document.querySelectorAll('.nav-link[data-view]').forEach(btn => {
      btn.addEventListener('click', () => switchView(btn.getAttribute('data-view')));
    });
    document.querySelectorAll('[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => switchView(btn.getAttribute('data-goto')));
    });

    // Mobile Menu
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.add('open');
    });
    document.getElementById('sidebar-close-btn')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.remove('open');
    });

// Theme Toggle (Cycles through all 5 themes)
    document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
      const themesOrder = ['dark', 'vscode', 'emerald', 'purple', 'light'];
      const nextIdx = (themesOrder.indexOf(state.settings.theme) + 1) % themesOrder.length;
      applyTheme(themesOrder[nextIdx]);
      showToast(`🎨 Theme switched to: ${themesOrder[nextIdx].toUpperCase()}`);
    });

    // Universal Upload & Dropzone
    const fileInput = document.getElementById('global-file-input');
    const folderInput = document.getElementById('global-folder-input');
    document.getElementById('quick-upload-trigger-btn')?.addEventListener('click', () => fileInput?.click());
    document.getElementById('dropzone-select-files-btn')?.addEventListener('click', (e) => { e.stopPropagation(); fileInput?.click(); });
    document.getElementById('dropzone-select-folder-btn')?.addEventListener('click', (e) => { e.stopPropagation(); folderInput?.click(); });
    document.getElementById('universal-dropzone')?.addEventListener('click', () => fileInput?.click());

    fileInput?.addEventListener('change', (e) => handleIncomingFiles(e.target.files));
    folderInput?.addEventListener('change', (e) => {
      handleIncomingFiles(e.target.files);
      if (e.target.files?.length) openToolWorkbench('create-zip', e.target.files);
    });

    const dz = document.getElementById('universal-dropzone');
    if (dz) {
      dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('drag-over'); });
      dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
      dz.addEventListener('drop', (e) => {
        e.preventDefault();
        dz.classList.remove('drag-over');
        handleIncomingFiles(e.dataTransfer?.files);
      });
    }

    document.getElementById('save-staged-to-workspace-btn')?.addEventListener('click', async () => {
      for (const f of state.stagedFiles) await saveFileToWorkspaceDB(f, f.name, 'General');
      showToast(`💾 Saved ${state.stagedFiles.length} file(s) to My Files Workspace!`);
    });
    document.getElementById('zip-staged-files-btn')?.addEventListener('click', () => {
      openToolWorkbench('create-zip', state.stagedFiles);
    });
    document.getElementById('clear-staged-btn')?.addEventListener('click', () => {
      state.stagedFiles = [];
      renderStagedFilesBar();
    });

    // Category Pills & Directory Search
    document.querySelectorAll('.cat-pill[data-cat]').forEach(pill => {
      pill.addEventListener('click', () => {
        state.activeCategory = pill.getAttribute('data-cat');
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p === pill));
        renderAllToolGrids();
      });
    });
    document.getElementById('directory-search-input')?.addEventListener('input', renderAllToolGrids);

    // Topbar Instant Search Dropdown
    const topSearch = document.getElementById('global-tool-search');
    const dropdown = document.getElementById('search-dropdown');
    topSearch?.addEventListener('input', () => {
      const q = topSearch.value.trim().toLowerCase();
      if (!q) { dropdown.hidden = true; return; }
      const matches = TOOLS.filter(t => `${t.title} ${t.desc} ${(t.aliases || []).join(' ')}`.toLowerCase().includes(q)).slice(0, 8);
      dropdown.hidden = false;
      dropdown.innerHTML = matches.length
        ? matches.map(m => `<button type="button" class="search-item" data-search-pick="${m.id}"><span>${m.icon}</span><div><b>${escapeHtml(m.title)}</b><small style="display:block;color:var(--text-muted);">${escapeHtml(m.category)}</small></div></button>`).join('')
        : `<div style="padding:10px;color:var(--text-muted);">Unsupported or unknown tool. Try "Cross-Format Converter".</div>`;
      dropdown.querySelectorAll('[data-search-pick]').forEach(b => {
        b.addEventListener('click', () => {
          dropdown.hidden = true;
          openToolWorkbench(b.getAttribute('data-search-pick'));
        });
      });
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        topSearch?.focus();
      } else if (e.key === 'Escape') {
        document.getElementById('tool-workbench-modal').hidden = true;
        document.getElementById('file-preview-modal').hidden = true;
        if (dropdown) dropdown.hidden = true;
      }
    });

    // Workbench Modal Controls
    document.getElementById('wb-close-btn')?.addEventListener('click', () => { document.getElementById('tool-workbench-modal').hidden = true; });
    document.getElementById('wb-cancel-btn')?.addEventListener('click', () => { document.getElementById('tool-workbench-modal').hidden = true; });
    document.getElementById('wb-execute-btn')?.addEventListener('click', runActiveWorkbenchTool);
    document.getElementById('preview-close-btn')?.addEventListener('click', () => { document.getElementById('file-preview-modal').hidden = true; });

    // Organizer Controls
    const orgInput = document.getElementById('organizer-pdf-input');
    document.getElementById('organizer-load-btn')?.addEventListener('click', () => orgInput?.click());
    document.getElementById('organizer-empty-load-btn')?.addEventListener('click', () => orgInput?.click());
    orgInput?.addEventListener('change', (e) => { if (e.target.files?.[0]) loadPdfIntoOrganizer(e.target.files[0]); });
    document.getElementById('organizer-export-btn')?.addEventListener('click', () => exportOrganizedPdf(false));
    document.getElementById('org-extract-selected-btn')?.addEventListener('click', () => exportOrganizedPdf(true));
    document.getElementById('org-rotate-all-btn')?.addEventListener('click', () => {
      state.organizer.pages.forEach(p => { p.rotation = (p.rotation + 90) % 360; });
      renderOrganizerThumbnails();
    });
    document.getElementById('org-reverse-order-btn')?.addEventListener('click', () => {
      state.organizer.pages.reverse();
      renderOrganizerThumbnails();
    });

    // File Manager Controls
    document.querySelectorAll('.scope-tab[data-scope]').forEach(tab => {
      tab.addEventListener('click', () => {
        state.activeScope = tab.getAttribute('data-scope');
        document.querySelectorAll('.scope-tab').forEach(t => t.classList.toggle('active', t === tab));
        renderMyFilesView();
      });
    });
    document.getElementById('fm-search-input')?.addEventListener('input', renderMyFilesView);
    document.getElementById('fm-type-filter')?.addEventListener('change', renderMyFilesView);
    document.getElementById('fm-folder-filter')?.addEventListener('change', renderMyFilesView);
    document.getElementById('fm-sort-select')?.addEventListener('change', renderMyFilesView);
    document.getElementById('fm-grid-view-btn')?.addEventListener('click', () => { state.fmViewMode = 'grid'; renderMyFilesView(); });
    document.getElementById('fm-list-view-btn')?.addEventListener('click', () => { state.fmViewMode = 'list'; renderMyFilesView(); });
    document.getElementById('fm-upload-btn')?.addEventListener('click', () => fileInput?.click());
    document.getElementById('fm-new-folder-btn')?.addEventListener('click', () => {
      const name = prompt('Enter new workspace folder name:');
      if (name && name.trim() && !state.folders.includes(name.trim())) {
        state.folders.push(name.trim());
        renderMyFilesView();
        showToast(`📁 Created folder "${name.trim()}"`);
      }
    });
    document.getElementById('fm-open-local-dir-btn')?.addEventListener('click', async () => {
      if ('showDirectoryPicker' in window) {
        try {
          const dirHandle = await window.showDirectoryPicker();
          let count = 0;
          for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file') {
              const file = await entry.getFile();
              await saveFileToWorkspaceDB(file, file.name, dirHandle.name);
              count++;
            }
          }
          if (!state.folders.includes(dirHandle.name)) state.folders.push(dirHandle.name);
          renderMyFilesView();
          showToast(`🖴 Imported ${count} file(s) from local folder "${dirHandle.name}"!`);
        } catch (err) {
          showToast('ℹ️ Folder access cancelled or denied.');
        }
      } else {
        folderInput?.click();
      }
    });
    document.getElementById('fm-zip-selected-btn')?.addEventListener('click', async () => {
      const active = state.workspaceFiles.filter(f => !f.trashed).map(f => new File([f.blob], f.name, { type: f.type }));
      if (!active.length) return showToast('No workspace files to ZIP.');
      openToolWorkbench('create-zip', active);
    });

    // Queue & Settings
    document.getElementById('open-batch-queue-btn')?.addEventListener('click', () => switchView('recent'));
    document.getElementById('clear-completed-jobs-btn')?.addEventListener('click', () => {
      state.operationsQueue = [];
      localStorage.removeItem('ahmedpdf_ops_history');
      renderRecentOperationsView();
      updateWorkspaceCounters();
    });
    document.getElementById('save-settings-btn')?.addEventListener('click', () => {
      state.settings.theme = document.getElementById('setting-theme-select')?.value || 'dark';
      state.settings.imgQuality = Number(document.getElementById('setting-img-quality')?.value || 82);
      state.settings.maxFileSizeMB = Number(document.getElementById('setting-max-mb')?.value || 150);
      state.settings.concurrency = Number(document.getElementById('setting-concurrency')?.value || 2);
      applyTheme(state.settings.theme);
      showToast('✓ Preferences saved!');
    });
    document.getElementById('wipe-local-storage-btn')?.addEventListener('click', async () => {
      if (confirm('Delete all files stored in your local IndexedDB workspace?')) {
        for (const f of [...state.workspaceFiles]) await deleteWorkspaceFilePermanently(f.id);
        showToast('🗑️ Local IndexedDB workspace purged.');
      }
    });
    document.getElementById('run-qa-suite-btn')?.addEventListener('click', runAutomatedQaSuite);

    // PWA Desktop App Installation (Uses ah.png)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      });
    }
    window.addEventListener('beforeinstallprompt', (e) => {
      deferredPwaPrompt = e;
    });
    const triggerInstall = async () => {
      if (deferredPwaPrompt) {
        deferredPwaPrompt.prompt();
        await deferredPwaPrompt.userChoice;
        deferredPwaPrompt = null;
      } else {
        showToast('📲 To install AhmedPdf Desktop (ah.png): click the Install icon in your browser address bar!');
      }
    };
    document.getElementById('sidebar-install-btn')?.addEventListener('click', triggerInstall);
    document.getElementById('topbar-install-btn')?.addEventListener('click', triggerInstall);
  }

  async function initApp() {
    applyTheme(state.settings.theme || 'dark');
    bindAllEvents();
    setupCrossFormatConverter();
    renderAllToolGrids();
    await loadWorkspaceFilesFromDB();
    renderMyFilesView();
    renderRecentOperationsView();
    renderHomeDashboardLists();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
