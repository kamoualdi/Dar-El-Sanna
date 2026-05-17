import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Merci pour votre inscription à la Conciergerie Dar El Sanna.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
