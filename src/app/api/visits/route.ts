import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'visits.json');
let inMemoryCount = 0;
let inMemoryBase = 12480; // Fallback temporaire si le serveur est en lecture seule

function getStats() {
  const defaultStats = { base: 12480, count: 0 };
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return {
        base: typeof data.base === 'number' ? data.base : 12480,
        count: typeof data.count === 'number' ? data.count : 0,
      };
    }
  } catch (e) {
    console.error('Error reading stats:', e);
  }
  return {
    base: inMemoryBase,
    count: inMemoryCount,
  };
}

function saveStats(base: number, count: number) {
  try {
    const publicDir = path.dirname(filePath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify({ base, count }), 'utf8');
    // Mettre à jour la mémoire également en cas de succès
    inMemoryBase = base;
    inMemoryCount = count;
    return true;
  } catch (e) {
    console.error('Error writing stats:', e);
    // En lecture seule (serveur sans persistance disque standard type Netlify Functions sans volume),
    // on met à jour la mémoire pour que la session actuelle reflète les modifs
    inMemoryBase = base;
    inMemoryCount = count;
    return false;
  }
}

export async function GET() {
  const stats = getStats();
  return NextResponse.json({ 
    base: stats.base,
    count: stats.count,
    total: stats.base + stats.count 
  });
}

export async function POST() {
  const stats = getStats();
  const newCount = stats.count + 1;
  saveStats(stats.base, newCount);
  
  return NextResponse.json({ 
    base: stats.base,
    count: newCount,
    total: stats.base + newCount 
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const stats = getStats();
    
    // On met à jour la base de départ du compteur
    const newBase = typeof body.base === 'number' ? body.base : stats.base;
    const newCount = typeof body.count === 'number' ? body.count : stats.count;
    
    saveStats(newBase, newCount);
    
    return NextResponse.json({ 
      success: true,
      base: newBase,
      count: newCount,
      total: newBase + newCount
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
