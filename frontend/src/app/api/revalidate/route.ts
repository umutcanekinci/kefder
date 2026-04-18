import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    // 1. Sanity paketinden ham metni (raw text) almamız lazım
    const body = await req.text(); 
    
    // 2. Sanity'nin gönderdiği kriptografik imzayı oku
    const signature = req.headers.get(SIGNATURE_HEADER_NAME) || '';
    const secret = process.env.SANITY_WEBHOOK_SECRET || '';

    // 3. GÜVENLİK KONTROLÜ: İmza eşleşiyor mu?
    if (!isValidSignature(body, signature, secret)) {
      console.warn('[Webhook] Geçersiz imza! Yetkisiz erişim.');
      return NextResponse.json({ message: 'Geçersiz imza!' }, { status: 401 });
    }

    // 4. İmza doğruysa, ham metni JSON'a çevir
    const parsedBody = JSON.parse(body);
    const type = parsedBody._type; 
    
    if (type) {
      console.log(`[Webhook] Sanity tetikledi. Önbellek temizleniyor: ${type}`);
      revalidateTag(type);
      
      return NextResponse.json({ 
        revalidated: true, 
        tag: type, 
        message: `${type} başarıyla güncellendi`,
      });
    }

    return NextResponse.json({ message: 'Geçersiz webhook verisi' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ message: 'Hata oluştu', error: err.message }, { status: 500 });
  }
}