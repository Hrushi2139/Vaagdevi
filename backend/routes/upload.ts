import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import auth from '../middleware/auth';

const BUCKET = 'vaagdevi';

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  }
  return createClient(url, key);
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg|pdf|ico)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

const router = Router();

router.post('/', auth, upload.array('files', 20), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, error: 'No files uploaded' });
      return;
    }

    const urls = await Promise.all(
      files.map(async (file) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

        const sb = getSupabase();
        const { error } = await sb.storage
          .from(BUCKET)
          .upload(filename, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
          });

        if (error) throw error;

        const { data: { publicUrl } } = sb.storage
          .from(BUCKET)
          .getPublicUrl(filename);

        return publicUrl;
      })
    );

    res.json({ success: true, data: urls });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

export default router;
