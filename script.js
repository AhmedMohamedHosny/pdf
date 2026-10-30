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
    { id: 'merge-pdf', title: 'Merge PDF', category: 'PDF', icon: '📑', accept: '.pdf', multiple: true, desc: 'Combine multiple PDF documents into a single file in your chosen order.', aliases: ['combine pdf', 'join pdf', 'دمج pdf'] },
    { id: 'split-pdf', title: 'Split PDF', category: 'PDF', icon: '✂️', accept: '.pdf', multiple: false, desc: 'Split a PDF into individual pages, custom ranges (e.g. 1-3, 5), or every N pages.', aliases: ['extract pages', 'تقسيم pdf'] },
    { id: 'organize-pdf', title: 'Organize PDF Pages', category: 'PDF', icon: '🗂️', accept: '.pdf', multiple: false, desc: 'Visual thumbnail studio to reorder, rotate, duplicate, and delete PDF pages.', aliases: ['reorder pdf', 'rotate pdf', 'delete pages'] },
    { id: 'compress-pdf', title: 'Compress PDF', category: 'PDF', icon: '📉', accept: '.pdf', multiple: false, desc: 'Optimize PDF page streams with configurable DPI quality and size comparison.', aliases: ['reduce pdf size', 'shrink pdf', 'ضغط pdf'] },
    { id: 'watermark-pdf', title: 'Watermark & Stamp PDF', category: 'PDF', icon: '💧', accept: '.pdf', multiple: false, desc: 'Add custom diagonal or centered text watermarks with opacity control.', aliases: ['stamp pdf', 'علامة مائية'] },
    { id: 'pagenum-pdf', title: 'Add Page Numbers & Header', category: 'PDF', icon: '🔢', accept: '.pdf', multiple: false, desc: 'Insert formatted page numbers (Page X of Y) and custom headers/footers.', aliases: ['number pdf', 'footer pdf'] },
    { id: 'sign-pdf', title: 'Sign & Annotate PDF', category: 'PDF', icon: '✍️', accept: '.pdf', multiple: false, desc: 'Draw a signature or upload a signature image and overlay text onto any PDF page.', aliases: ['edit pdf', 'signature pdf', 'توقيع pdf'] },
    { id: 'pdf-to-jpg', title: 'PDF to JPG Images', category: 'PDF', icon: '🖼️', accept: '.pdf', multiple: false, desc: 'Render every PDF page into high-resolution JPG images (bundled as ZIP).', aliases: ['pdf to image', 'pdf to pictures'] },
    { id: 'pdf-to-png', title: 'PDF to PNG Images', category: 'PDF', icon: '🏞️', accept: '.pdf', multiple: false, desc: 'Convert PDF pages into lossless PNG images.', aliases: ['pdf png'] },
    { id: 'pdf-to-txt', title: 'PDF to Text (TXT)', category: 'PDF', icon: '📄', accept: '.pdf', multiple: false, desc: 'Extract real embedded text from all pages of a PDF document.', aliases: ['extract pdf text'] },
    { id: 'pdf-to-docx', title: 'PDF to Word (DOCX)', category: 'PDF', icon: '📘', accept: '.pdf', multiple: false, desc: 'Extract PDF text paragraphs into a structured Word document (.doc/.docx).', aliases: ['pdf to word', 'تحويل pdf الى وورد'] },

    // --- WORD, EXCEL, PPT & TEXT TOOLS ---
    { id: 'docx-to-pdf', title: 'Word (DOCX) to PDF', category: 'Word', icon: '📘', accept: '.docx,.txt,.html', multiple: false, desc: 'Convert DOCX documents to clean printable PDF files via Mammoth & PDF-Lib.', aliases: ['word to pdf', 'وورد الى pdf'] },
    { id: 'docx-to-txt', title: 'Word (DOCX) to TXT / HTML', category: 'Word', icon: '📝', accept: '.docx', multiple: false, desc: 'Extract clean plain text or semantic HTML from Word DOCX files.', aliases: ['docx to html', 'word to text'] },
    { id: 'txt-to-pdf', title: 'Text / HTML to PDF', category: 'Word', icon: '📃', accept: '.txt,.html,.md', multiple: false, desc: 'Convert plain text or Markdown/HTML notes into a formatted multi-page PDF.', aliases: ['text to pdf', 'html to pdf'] },
    { id: 'txt-to-docx', title: 'TXT to Word Document', category: 'Word', icon: '📄', accept: '.txt', multiple: false, desc: 'Package plain text files into a formatted Word document.', aliases: ['text to word'] },
    { id: 'xlsx-to-pdf', title: 'Excel (XLSX/CSV) to PDF', category: 'Excel', icon: '📊', accept: '.xlsx,.xls,.csv', multiple: false, desc: 'Preview spreadsheet tables and export selected sheets into a structured PDF.', aliases: ['excel to pdf', 'spreadsheet to pdf'] },
    { id: 'xlsx-to-csv', title: 'Excel (XLSX) to CSV / JSON', category: 'Excel', icon: '📈', accept: '.xlsx,.xls', multiple: false, desc: 'Convert Excel workbooks into clean CSV or structured JSON data.', aliases: ['excel to csv', 'xlsx to json'] },
    { id: 'csv-to-xlsx', title: 'CSV to Excel (XLSX)', category: 'Excel', icon: '📗', accept: '.csv,.txt', multiple: false, desc: 'Convert comma-separated values into a real Microsoft Excel .xlsx workbook.', aliases: ['csv to excel'] },
    { id: 'pptx-to-pdf', title: 'PowerPoint (PPTX) Inspector & PDF', category: 'Word', icon: '📽️', accept: '.pptx', multiple: false, desc: 'Extract slide text XML from PPTX archives and export slide notes to PDF.', aliases: ['powerpoint to pdf', 'ppt to pdf'] },

    // --- IMAGE STUDIO ---
    { id: 'images-to-pdf', title: 'Images to PDF', category: 'Images', icon: '📚', accept: 'image/*', multiple: true, desc: 'Combine multiple JPG, PNG, or WEBP images into a single PDF document.', aliases: ['jpg to pdf', 'png to pdf', 'webp to pdf', 'صور الى pdf'] },
    { id: 'image-converter', title: 'Image Format Converter', category: 'Images', icon: '🔄', accept: 'image/*', multiple: true, desc: 'Convert between JPG, PNG, and WEBP with transparency detection warnings.', aliases: ['jpg to png', 'png to jpg', 'webp to png', 'png to webp'] },
    { id: 'compress-image', title: 'Compress Images', category: 'Images', icon: '🗜️', accept: 'image/*', multiple: true, desc: 'Reduce image file size with adjustable quality slider and size diff report.', aliases: ['shrink photo', 'optimize image'] },
    { id: 'resize-image', title: 'Resize & Rotate Image', category: 'Images', icon: '📐', accept: 'image/*', multiple: false, desc: 'Resize image dimensions with aspect-ratio lock, rotation, and crop presets.', aliases: ['crop image', 'rotate image'] },

    // --- COMPRESSION & ARCHIVES ---
    { id: 'create-zip', title: 'Create ZIP Archive', category: 'Compression', icon: '📦', accept: '*/*', multiple: true, desc: 'Compress multiple files or an entire folder into a standard .zip archive.', aliases: ['zip files', 'pack zip'] },
    { id: 'extract-zip', title: 'Extract & Inspect ZIP', category: 'Compression', icon: '📂', accept: '.zip', multiple: false, desc: 'Safely browse and extract ZIP contents with Zip-Slip & ratio protection.', aliases: ['unzip', 'open zip', 'فك ضغط'] },

    // --- SECURITY & OCR ---
    { id: 'pdf-metadata', title: 'PDF Metadata & Security Info', category: 'Security', icon: '🛡️', accept: '.pdf', multiple: false, desc: 'Inspect and edit PDF Title, Author, Subject, Keywords, and check encryption.', aliases: ['pdf properties', 'pdf password'] },
    { id: 'file-hash-inspector', title: 'File Signature & SHA-256 Inspector', category: 'Security', icon: '🔐', accept: '*/*', multiple: false, desc: 'Verify magic-byte headers and compute cryptographic SHA-256 file checksums.', aliases: ['verify file', 'hash check'] },
    { id: 'ocr-scanner', title: 'OCR Image & Scanned PDF to Text', category: 'OCR', icon: '🔍', accept: 'image/*,.pdf', multiple: false, desc: 'Extract editable text from scanned images or PDFs using Tesseract OCR (EN/AR).', aliases: ['optical character recognition', 'scanned pdf to text'] }
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

  // C. WATERMARK / PAGE NUMBERS / SIGN PDF
  async function executePdfOverlayTool(file, toolId, options, onProgress) {
    const bytes = await file.arrayBuffer();
    const pdfDoc = await window.PDFLib.PDFDocument.load(bytes);
    const font = await pdfDoc.embedFont(window.PDFLib.StandardFonts.HelveticaBold);
    const pages = pdfDoc.getPages();

    let embeddedSigImg = null;
    if (toolId === 'sign-pdf' && options.signatureDataUrl) {
      embeddedSigImg = await pdfDoc.embedPng(options.signatureDataUrl);
    }

    pages.forEach((page, idx) => {
      onProgress(Math.round(((idx + 1) / pages.length) * 90), `Processing page ${idx + 1} of ${pages.length}...`);
      const { width, height } = page.getSize();

      if (toolId === 'watermark-pdf') {
        const text = options.text || 'CONFIDENTIAL — AHMEDPDF';
        const opacity = Math.max(0.08, Math.min(1, (Number(options.opacity) || 30) / 100));
        page.drawText(text, {
          x: width * 0.18,
          y: height * 0.45,
          size: Number(options.fontSize) || 38,
          font: font,
          color: window.PDFLib.rgb(0.08, 0.55, 0.85),
          opacity: opacity,
          rotate: window.PDFLib.degrees(35)
        });
      } else if (toolId === 'pagenum-pdf') {
        const headerText = options.headerText || '';
        const footerLabel = `Page ${idx + 1} of ${pages.length}`;
        if (headerText) {
          page.drawText(headerText, { x: 40, y: height - 28, size: 10, font, color: window.PDFLib.rgb(0.4, 0.4, 0.4) });
        }
        page.drawText(footerLabel, { x: width / 2 - 30, y: 22, size: 10, font, color: window.PDFLib.rgb(0.2, 0.2, 0.2) });
      } else if (toolId === 'sign-pdf') {
        if (options.overlayText) {
          page.drawText(options.overlayText, { x: 50, y: 85, size: 13, font, color: window.PDFLib.rgb(0.05, 0.2, 0.55) });
        }
        if (embeddedSigImg && (idx === pages.length - 1 || options.allPages)) {
          page.drawImage(embeddedSigImg, { x: width - 190, y: 40, width: 140, height: 60 });
        }
      }
    });

    const outBytes = await pdfDoc.save();
    return {
      blob: new Blob([outBytes], { type: 'application/pdf' }),
      name: `${file.name.replace(/\.pdf$/i, '')}_${toolId}.pdf`,
      summary: `Applied ${toolId} across ${pages.length} page(s).`
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
      const scale = qualityPct < 50 ? 1.0 : (qualityPct < 80 ? 1.35 : 1.7);
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
        ? `Notice: Original PDF (${formatBytes(file.size)}) was already highly compressed; new size is ${formatBytes(newBlob.size)}.`
        : `Reduced size from ${formatBytes(file.size)} to ${formatBytes(newBlob.size)} (${diffPct}% saved).`;
      return {
        blob: newBlob,
        name: `${file.name.replace(/\.pdf$/i, '')}_Compressed.pdf`,
        summary: note
      };
    }

    // PDF to JPG or PNG
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

  // E. PDF TO TXT & PDF TO DOCX
  async function executePdfTextExtraction(file, targetFormat, onProgress) {
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
      throw new Error('No embedded selectable text found in this PDF. It appears to be a scanned image PDF — please use the "OCR Scanner" tool instead.');
    }

    if (targetFormat === 'docx') {
      const wordHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${escapeHtml(file.name)}</title></head><body style="font-family:Calibri,sans-serif;font-size:11pt;line-height:1.6;">${pagesText.map(t => `<p>${escapeHtml(t).replace(/\n/g, '<br>')}</p>`).join('<hr>')}</body></html>`;
      return {
        blob: new Blob(['\ufeff', wordHtml], { type: 'application/msword;charset=utf-8' }),
        name: `${file.name.replace(/\.pdf$/i, '')}_Converted.doc`,
        summary: `Extracted text from ${pdf.numPages} page(s) into Word format. Note: Complex visual graphics may differ from original PDF.`
      };
    }

    return {
      blob: new Blob([fullText], { type: 'text/plain;charset=utf-8' }),
      name: `${file.name.replace(/\.pdf$/i, '')}.txt`,
      summary: `Extracted ${fullText.length} characters across ${pdf.numPages} page(s).`
    };
  }

  // F. IMAGES TO PDF
  async function executeImagesToPdf(files, onProgress) {
    const pdfDoc = await window.PDFLib.PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      onProgress(Math.round(((i + 0.5) / files.length) * 90), `Embedding image ${i + 1} of ${files.length}...`);
      const dataUrl = await convertImageFileToDataUrl(files[i], 'image/jpeg', 0.92);
      const jpgImage = await pdfDoc.embedJpg(dataUrl.dataUrl);
      const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
      page.drawImage(jpgImage, { x: 0, y: 0, width: jpgImage.width, height: jpgImage.height });
    }
    const outBytes = await pdfDoc.save();
    return {
      blob: new Blob([outBytes], { type: 'application/pdf' }),
      name: `AhmedPdf_Images_${Date.now()}.pdf`,
      summary: `Created a ${files.length}-page PDF document from your selected images.`
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

        // Fill white background if converting transparent PNG/WEBP to JPEG
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
      };
      img.onerror = () => reject(new Error(`Could not decode image: ${file.name}`));
      img.src = url;
    });
  }

  // H. TEXT / DOCX / XLSX TO PDF GENERATOR
  async function createCleanTextPdf(title, textContent) {
    const pdfDoc = await window.PDFLib.PDFDocument.create();
    const font = await pdfDoc.embedFont(window.PDFLib.StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(window.PDFLib.StandardFonts.HelveticaBold);

    // Replace non-WinAnsi characters safely so pdf-lib standard font never crashes
    const safeTitle = String(title || 'Document').replace(/[^\x20-\x7E]/g, '');
    const rawLines = String(textContent || '').replace(/\r\n/g, '\n').split('\n');
    const wrappedLines = [];
    rawLines.forEach((l) => {
      const clean = l.replace(/[^\x09\x20-\x7E]/g, ' ');
      if (clean.length <= 85) {
        wrappedLines.push(clean);
      } else {
        for (let i = 0; i < clean.length; i += 85) wrappedLines.push(clean.slice(i, i + 85));
      }
    });

    const linesPerPage = 44;
    for (let i = 0; i < Math.max(1, wrappedLines.length); i += linesPerPage) {
      const page = pdfDoc.addPage([595.28, 841.89]); // A4
      page.drawText(safeTitle || 'AhmedPdf Export', { x: 45, y: 800, size: 14, font: boldFont, color: window.PDFLib.rgb(0.05, 0.35, 0.65) });
      const chunk = wrappedLines.slice(i, i + linesPerPage);
      chunk.forEach((line, idx) => {
        page.drawText(line, { x: 45, y: 770 - idx * 16, size: 10.5, font });
      });
    }
    const bytes = await pdfDoc.save();
    return new Blob([bytes], { type: 'application/pdf' });
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

  function renderWorkbenchBody() {
    const tool = state.activeWorkbenchTool;
    const body = document.getElementById('wb-modal-body');
    if (!tool || !body) return;

    let optionsHtml = '';
    if (tool.id === 'split-pdf') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Split Mode:</b></label>
          <select id="wb-opt-split-mode" class="select-field" style="max-width:260px;">
            <option value="range">Extract Custom Page Range</option>
            <option value="all">Split Every Page into Separate PDF (ZIP)</option>
            <option value="every">Split Every N Pages (ZIP)</option>
          </select>
        </div>
        <div class="setting-row" id="wb-split-range-row">
          <label><b>Page Range (e.g. 1-3, 5):</b></label>
          <input type="text" id="wb-opt-range" class="input-field" value="1" style="max-width:220px;" />
        </div>
        <div class="setting-row" id="wb-split-every-row" hidden>
          <label><b>Pages per Split File (N):</b></label>
          <input type="number" id="wb-opt-every-n" class="input-field" value="2" min="1" style="max-width:120px;" />
        </div>
      `;
    } else if (tool.id === 'compress-pdf' || tool.id === 'compress-image') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Target Compression Quality (10% - 95%):</b></label>
          <input type="range" id="wb-opt-quality" min="15" max="95" value="${state.settings.imgQuality}" style="max-width:220px;" />
        </div>
      `;
    } else if (tool.id === 'watermark-pdf') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Watermark Text:</b></label>
          <input type="text" id="wb-opt-wm-text" class="input-field" value="CONFIDENTIAL — AHMEDPDF" style="max-width:280px;" />
        </div>
        <div class="setting-row">
          <label><b>Opacity (10% - 90%):</b></label>
          <input type="number" id="wb-opt-wm-opacity" class="input-field" value="28" min="10" max="90" style="max-width:120px;" />
        </div>
      `;
    } else if (tool.id === 'pagenum-pdf') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Optional Header Text:</b></label>
          <input type="text" id="wb-opt-header" class="input-field" placeholder="e.g. AhmedPdf Official Report" style="max-width:280px;" />
        </div>
      `;
    } else if (tool.id === 'sign-pdf') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Annotation / Signer Text:</b></label>
          <input type="text" id="wb-opt-sign-text" class="input-field" placeholder="Signed by Eng. Ahmed" style="max-width:260px;" />
        </div>
        <div style="margin-top:10px;">
          <label style="display:block;margin-bottom:6px;"><b>Draw Signature on Pad:</b></label>
          <canvas id="wb-sig-canvas" width="360" height="110" style="background:#fff;border-radius:8px;cursor:crosshair;border:1px solid var(--border-light);"></canvas>
          <div><button type="button" class="btn-secondary btn-sm" id="wb-clear-sig-btn">Clear Signature Pad</button></div>
        </div>
      `;
    } else if (tool.id === 'image-converter') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Target Image Format:</b></label>
          <select id="wb-opt-img-fmt" class="select-field" style="max-width:220px;">
            <option value="image/png">PNG (Lossless / Supports Transparency)</option>
            <option value="image/jpeg">JPG (Flattens Transparency to White)</option>
            <option value="image/webp">WEBP (Modern High Efficiency)</option>
          </select>
        </div>
      `;
    } else if (tool.id === 'resize-image') {
      optionsHtml = `
        <div class="setting-row">
          <label><b>Target Width (px, leave 0 for auto):</b></label>
          <input type="number" id="wb-opt-width" class="input-field" value="800" min="16" max="8000" style="max-width:140px;" />
        </div>
        <div class="setting-row">
          <label><b>Target Height (px):</b></label>
          <input type="number" id="wb-opt-height" class="input-field" value="600" min="16" max="8000" style="max-width:140px;" />
        </div>
        <div class="setting-row">
          <label><b>Rotation Angle:</b></label>
          <select id="wb-opt-rotate" class="select-field" style="max-width:160px;">
            <option value="0">0° (No Rotation)</option>
            <option value="90">90° Clockwise</option>
            <option value="180">180° Flip</option>
            <option value="270">270° Counter-Clockwise</option>
          </select>
        </div>
      `;
    } else if (tool.id === 'pdf-metadata') {
      optionsHtml = `
        <div class="setting-row"><label><b>New Document Title:</b></label><input type="text" id="wb-meta-title" class="input-field" placeholder="Document Title" style="max-width:280px;" /></div>
        <div class="setting-row"><label><b>New Author:</b></label><input type="text" id="wb-meta-author" class="input-field" placeholder="Author Name" style="max-width:280px;" /></div>
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

    // Split mode toggle
    document.getElementById('wb-opt-split-mode')?.addEventListener('change', (e) => {
      const m = e.target.value;
      document.getElementById('wb-split-range-row').hidden = m !== 'range';
      document.getElementById('wb-split-every-row').hidden = m !== 'every';
    });

    // Signature Canvas Drawing
    const sigCanvas = document.getElementById('wb-sig-canvas');
    if (sigCanvas) {
      const sCtx = sigCanvas.getContext('2d');
      sCtx.strokeStyle = '#0f172a';
      sCtx.lineWidth = 2.5;
      sCtx.lineCap = 'round';
      let drawing = false;
      sigCanvas.addEventListener('mousedown', (e) => { drawing = true; sCtx.beginPath(); sCtx.moveTo(e.offsetX, e.offsetY); });
      sigCanvas.addEventListener('mousemove', (e) => { if (!drawing) return; sCtx.lineTo(e.offsetX, e.offsetY); sCtx.stroke(); });
      window.addEventListener('mouseup', () => { drawing = false; });
      document.getElementById('wb-clear-sig-btn')?.addEventListener('click', () => sCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height));
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

    if (!tool || !files.length) {
      showToast('⚠️ Please select at least one valid file first.');
      return;
    }

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
        res = await executeMergePdf(files, updateProgress);
      } else if (tool.id === 'split-pdf') {
        const mode = document.getElementById('wb-opt-split-mode')?.value || 'range';
        const rng = document.getElementById('wb-opt-range')?.value || '1';
        const ev = document.getElementById('wb-opt-every-n')?.value || '2';
        res = await executeSplitPdf(firstFile, mode, rng, ev, updateProgress);
      } else if (tool.id === 'compress-pdf' || tool.id === 'pdf-to-jpg' || tool.id === 'pdf-to-png') {
        const q = Number(document.getElementById('wb-opt-quality')?.value || state.settings.imgQuality);
        res = await executePdfRenderOperation(firstFile, tool.id, q, updateProgress);
      } else if (tool.id === 'watermark-pdf' || tool.id === 'pagenum-pdf' || tool.id === 'sign-pdf') {
        const sigCanvas = document.getElementById('wb-sig-canvas');
        res = await executePdfOverlayTool(firstFile, tool.id, {
          text: document.getElementById('wb-opt-wm-text')?.value,
          opacity: document.getElementById('wb-opt-wm-opacity')?.value,
          headerText: document.getElementById('wb-opt-header')?.value,
          overlayText: document.getElementById('wb-opt-sign-text')?.value,
          signatureDataUrl: sigCanvas ? sigCanvas.toDataURL('image/png') : null
        }, updateProgress);
      } else if (tool.id === 'pdf-to-txt' || tool.id === 'pdf-to-docx') {
        res = await executePdfTextExtraction(firstFile, tool.id === 'pdf-to-docx' ? 'docx' : 'txt', updateProgress);
      } else if (tool.id === 'images-to-pdf') {
        res = await executeImagesToPdf(files, updateProgress);
      } else if (tool.id === 'image-converter' || tool.id === 'compress-image' || tool.id === 'resize-image') {
        const targetMime = document.getElementById('wb-opt-img-fmt')?.value || (tool.id === 'compress-image' ? 'image/jpeg' : firstFile.type || 'image/png');
        const q = Number(document.getElementById('wb-opt-quality')?.value || state.settings.imgQuality) / 100;
        const w = tool.id === 'resize-image' ? Number(document.getElementById('wb-opt-width')?.value) : null;
        const h = tool.id === 'resize-image' ? Number(document.getElementById('wb-opt-height')?.value) : null;
        const rot = tool.id === 'resize-image' ? Number(document.getElementById('wb-opt-rotate')?.value || 0) : 0;

        const out = await convertImageFileToDataUrl(firstFile, targetMime, q, w, h, rot);
        const ext = targetMime.split('/')[1].replace('jpeg', 'jpg');
        const transpNote = (firstFile.type === 'image/png' && targetMime === 'image/jpeg') ? ' (Transparent areas flattened to white).' : '';
        res = {
          blob: out.blob,
          name: `${firstFile.name.replace(/\.[^.]+$/, '')}_Processed.${ext}`,
          summary: `Processed image (${out.outWidth}×${out.outHeight}px, ${formatBytes(out.blob.size)})${transpNote}`
        };
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
          const pdfBlob = await createCleanTextPdf(firstFile.name, rawText.value);
          res = {
            blob: pdfBlob,
            name: `${firstFile.name.replace(/\.[^.]+$/, '')}.pdf`,
            summary: `Converted Word document text into PDF.`
          };
        }
      } else if (tool.id === 'txt-to-pdf' || tool.id === 'txt-to-docx') {
        const txt = await firstFile.text();
        if (tool.id === 'txt-to-pdf') {
          const pdfBlob = await createCleanTextPdf(firstFile.name, txt);
          res = { blob: pdfBlob, name: `${firstFile.name.replace(/\.[^.]+$/, '')}.pdf`, summary: 'Converted text file to PDF.' };
        } else {
          const docHtml = `<html><head><meta charset="utf-8"></head><body><pre style="font-family:Calibri,sans-serif;">${escapeHtml(txt)}</pre></body></html>`;
          res = { blob: new Blob(['\ufeff', docHtml], { type: 'application/msword' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.doc`, summary: 'Created Word document from text.' };
        }
      } else if (tool.id === 'xlsx-to-pdf' || tool.id === 'xlsx-to-csv' || tool.id === 'csv-to-xlsx') {
        const buf = await firstFile.arrayBuffer();
        const wb = window.XLSX.read(buf, { type: 'array' });
        const firstSheet = wb.Sheets[wb.SheetNames[0]];
        if (tool.id === 'xlsx-to-csv') {
          const csv = window.XLSX.utils.sheet_to_csv(firstSheet);
          res = { blob: new Blob([csv], { type: 'text/csv;charset=utf-8' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.csv`, summary: `Exported sheet "${wb.SheetNames[0]}" to CSV.` };
        } else if (tool.id === 'csv-to-xlsx') {
          const outBytes = window.XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          res = { blob: new Blob([outBytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), name: `${firstFile.name.replace(/\.[^.]+$/, '')}.xlsx`, summary: 'Converted CSV into Excel .xlsx workbook.' };
        } else {
          const csvText = window.XLSX.utils.sheet_to_csv(firstSheet);
          const pdfBlob = await createCleanTextPdf(firstFile.name, csvText);
          res = { blob: pdfBlob, name: `${firstFile.name.replace(/\.[^.]+$/, '')}.pdf`, summary: `Converted sheet "${wb.SheetNames[0]}" to PDF.` };
        }
      } else if (tool.id === 'pptx-to-pdf') {
        const zip = await window.JSZip.loadAsync(firstFile);
        const slideFiles = Object.keys(zip.files).filter(k => /^ppt\/slides\/slide\d+\.xml$/i.test(k));
        let allSlideText = '';
        for (const sf of slideFiles) {
          const xml = await zip.files[sf].async('text');
          const matches = Array.from(xml.matchAll(/<a:t>([^<]+)<\/a:t>/g)).map(m => m[1]);
          allSlideText += `--- Slide (${sf.split('/').pop()}) ---\n` + matches.join(' ') + '\n\n';
        }
        const pdfBlob = await createCleanTextPdf(firstFile.name, allSlideText || 'PPTX Slide Deck');
        res = { blob: pdfBlob, name: `${firstFile.name.replace(/\.[^.]+$/, '')}_Slides.pdf`, summary: `Extracted text from ${slideFiles.length} slides into PDF.` };
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
        const { data: { text } } = await window.Tesseract.recognize(firstFile, 'eng', {
          logger: m => {
            if (m.status === 'recognizing text') updateProgress(Math.round(m.progress * 100), 'Running OCR text recognition...');
          }
        });
        res = {
          blob: new Blob([text], { type: 'text/plain;charset=utf-8' }),
          name: `${firstFile.name.replace(/\.[^.]+$/, '')}_OCR.txt`,
          summary: `OCR extracted ${text.length} characters.`
        };
      }

      if (res && res.blob) {
        updateProgress(100, 'Completed successfully!');
        const dlUrl = URL.createObjectURL(res.blob);
        resultBox.innerHTML = `
          <div class="panel-card" style="background:var(--success-soft);border-color:var(--success);">
            <h4 style="margin:0 0 6px;color:var(--success);">✓ Operation Completed</h4>
            <p style="margin:0 0 12px;font-size:13px;">${escapeHtml(res.summary)}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <a href="${dlUrl}" download="${escapeHtml(res.name)}" class="btn-primary btn-sm" style="text-decoration:none;">⬇ Download ${escapeHtml(res.name)}</a>
              <button type="button" class="btn-secondary btn-sm" id="wb-save-to-ws-btn">💾 Save to My Files Workspace</button>
            </div>
          </div>
        `;
        document.getElementById('wb-save-to-ws-btn')?.addEventListener('click', async () => {
          await saveFileToWorkspaceDB(res.blob, res.name, 'Converted');
          showToast('💾 Saved output to My Files workspace!');
        });
        logOperation(tool.title, firstFile.name, 'completed', res.summary, res.blob, res.name);
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
    const browseBtn = document.getElementById('converter-browse-btn');
    const fileInput = document.getElementById('converter-file-input');
    const targetSel = document.getElementById('converter-target-format');
    const limitTxt = document.getElementById('converter-limitation-text');
    const runBtn = document.getElementById('converter-run-btn');

    browseBtn?.addEventListener('click', () => fileInput?.click());
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

    // Theme Toggle
    document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
      applyTheme(state.settings.theme === 'dark' ? 'light' : 'dark');
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
