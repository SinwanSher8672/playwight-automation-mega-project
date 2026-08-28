import { test, expect } from '@playwright/test';
import { UploadDownloadPage } from './pages/UploadDownloadPage';
import path from 'path';
import fs from 'fs';

test.describe('File Upload Tests', () => {
  let uploadPage: UploadDownloadPage;

  test.beforeEach(async ({ page }) => {
    uploadPage = new UploadDownloadPage(page);
    await uploadPage.gotoUploadPage();
  });

  test('can upload a file and see correct filename', async () => {
    const filePath = path.join(__dirname, '../test-data/sample-upload.txt');
    await uploadPage.uploadFile(filePath);

    const uploadedName = await uploadPage.getUploadedFileName();
    expect(uploadedName).toBe('sample-upload.txt');
  });
});

test.describe('File Download Tests', () => {
  let downloadPage: UploadDownloadPage;

  test.beforeEach(async ({ page }) => {
    downloadPage = new UploadDownloadPage(page);
  });

  test('can upload then download the same file and verify it exists', async () => {
    // Step 1: pehle upload karo (taake humein pata ho file server pe maujood hai)
    await downloadPage.gotoUploadPage();
    const filePath = path.join(__dirname, '../test-data/sample-upload.txt');
    await downloadPage.uploadFile(filePath);

    // Step 2: ab download page pe jao aur usi file ko download karo
    await downloadPage.gotoDownloadPage();
    const download = await downloadPage.downloadFileByName('sample-upload.txt');

    const downloadPath = await download.path();
    expect(downloadPath).not.toBeNull();

    if (downloadPath) {
      expect(fs.existsSync(downloadPath)).toBeTruthy();
      const stats = fs.statSync(downloadPath);
      expect(stats.size).toBeGreaterThan(0);
    }
  });

  test('downloaded file has correct suggested filename', async () => {
    await downloadPage.gotoUploadPage();
    const filePath = path.join(__dirname, '../test-data/sample-upload.txt');
    await downloadPage.uploadFile(filePath);

    await downloadPage.gotoDownloadPage();
    const download = await downloadPage.downloadFileByName('sample-upload.txt');

    expect(download.suggestedFilename()).toBe('sample-upload.txt');
  });
});